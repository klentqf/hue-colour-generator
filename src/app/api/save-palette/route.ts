import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, useCase, vibe, tone, colours, scores, explanation, accessibilityNotes, customPrompt } = body;

    const palette = await prisma.palette.create({
      data: {
        name,
        useCase,
        vibe,
        tone,
        colours,
        scores: scores || undefined,
        explanation: explanation || undefined,
        accessibilityNotes: accessibilityNotes || undefined,
        customPrompt: customPrompt || undefined,
      },
    });

    return NextResponse.json(palette);
  } catch (error) {
    console.error("save palette error:", error);
    return NextResponse.json({ error: "failed to save palette" }, { status: 500 });
  }
}
