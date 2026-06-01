import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { GenerateRequest } from "@/lib/types";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PaletteColourSchema = z.object({
  name: z.string(),
  hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  role: z.string(),
  description: z.string(),
  locked: z.boolean(),
});

const PaletteResponseSchema = z.object({
  paletteName: z.string(),
  colours: z.array(PaletteColourSchema),
  explanation: z.string(),
  scores: z.object({
    visualHarmony: z.number().min(1).max(10),
    contrast: z.number().min(1).max(10),
    accessibility: z.number().min(1).max(10),
    useCaseFit: z.number().min(1).max(10),
    brandPersonality: z.number().min(1).max(10),
  }),
  accessibilityNotes: z.string(),
  export: z.object({
    hexCodes: z.string(),
    cssVariables: z.string(),
    tailwindConfig: z.string(),
    json: z.string(),
    figmaTokens: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const {
      selectedColours,
      paletteSize,
      tone,
      vibe,
      useCase,
      customPrompt,
      lockedColours,
      currentPalette,
      feedback,
    } = body;

    const lockedSection = lockedColours?.length
      ? `\n\nLOCKED COLOURS (keep these EXACTLY unchanged):\n${lockedColours.map((c) => `- ${c.name}: ${c.hex} (role: ${c.role})`).join("\n")}`
      : "";

    const currentSection = currentPalette?.length
      ? `\n\nCURRENT PALETTE (for reference):\n${currentPalette.map((c) => `- ${c.name}: ${c.hex} [${c.locked ? "LOCKED" : "unlocked"}]`).join("\n")}`
      : "";

    const feedbackSection = feedback
      ? `\n\nUSER FEEDBACK (apply this to unlocked colours only):\n"${feedback}"`
      : "";

    const seedSection = selectedColours.length
      ? `\n\nSEED COLOURS (incorporate or complement these):\n${selectedColours.join(", ")}`
      : "";

    const prompt = `You are a professional colour palette designer. Generate a beautiful, cohesive colour palette.

REQUIREMENTS:
- Palette size: ${paletteSize} colours
- Tone/brightness: ${tone}
- Vibe/aesthetic: ${vibe}
- Use case: ${useCase}
${customPrompt ? `- Custom note: ${customPrompt}` : ""}
${seedSection}${lockedSection}${currentSection}${feedbackSection}

IMPORTANT: Return ONLY valid JSON matching this exact structure. No markdown, no explanation outside JSON.

{
  "paletteName": "poetic lowercase name (2-3 words)",
  "colours": [
    {
      "name": "poetic lowercase colour name",
      "hex": "#RRGGBB",
      "role": "one of: background, primary, secondary, accent, text, surface, border",
      "description": "one sentence on when/how to use this colour",
      "locked": false
    }
  ],
  "explanation": "2-3 sentences explaining why these colours work together for the use case",
  "scores": {
    "visualHarmony": 8,
    "contrast": 7,
    "accessibility": 8,
    "useCaseFit": 9,
    "brandPersonality": 8
  },
  "accessibilityNotes": "practical accessibility tip for this palette",
  "export": {
    "hexCodes": "newline-separated hex codes",
    "cssVariables": ":root { --name: #hex; ... }",
    "tailwindConfig": "colors: { name: '#hex', ... }",
    "json": "{ 'name': '#hex', ... }",
    "figmaTokens": "{ 'color.name': { 'value': '#hex' }, ... }"
  }
}

Rules:
- All colour names and palette name must be lowercase and poetic
- Hex codes must be valid 6-digit hex with #
- ${lockedColours?.length ? `Keep locked colours EXACTLY as provided: ${lockedColours.map((c) => `${c.hex}`).join(", ")}` : ""}
- Make the palette genuinely usable for the specified use case
- Ensure sufficient contrast between text and background colours`;

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "no response from ai" }, { status: 500 });
    }

    const parsed = JSON.parse(content);

    // Restore locked status from request
    if (lockedColours?.length && parsed.colours) {
      parsed.colours = parsed.colours.map((c: { hex: string; locked: boolean }) => {
        const isLocked = lockedColours.some(
          (lc) => lc.hex.toLowerCase() === c.hex.toLowerCase()
        );
        return { ...c, locked: isLocked };
      });
    }

    const validated = PaletteResponseSchema.parse(parsed);
    return NextResponse.json(validated);
  } catch (error) {
    console.error("palette generation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ai returned invalid palette format", details: error.errors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { error: "failed to generate palette" },
      { status: 500 }
    );
  }
}
