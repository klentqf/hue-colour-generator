"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SpeechBubble } from "@/components/speech-bubble";
import { setWizardState, getWizardState } from "@/lib/palette-store";
import { cn } from "@/lib/utils";

const tones = ["light", "dark", "mixed", "pastel", "bold", "muted", "high contrast", "soft"];
const vibes = [
  "clean girl", "soft pastel", "luxury brand", "minimal tech", "y2k",
  "cyberpunk", "dark academia", "coffee shop", "k-pop inspired",
  "corporate but not boring", "elegant", "playful", "futuristic", "calm and wellness-focused",
];
const useCases = [
  "website design", "mobile app ui", "branding", "logo design",
  "social media post", "presentation slides", "poster",
  "product packaging", "personal project",
];
const paletteSizes = [3, 4, 5, 6];

export default function PreferencesPage() {
  const router = useRouter();
  const saved = getWizardState();

  const [paletteSize, setPaletteSize] = useState(saved.paletteSize || 5);
  const [tone, setTone] = useState(saved.tone || "soft");
  const [vibe, setVibe] = useState(saved.vibe || "soft pastel");
  const [useCase, setUseCase] = useState(saved.useCase || "website design");
  const [customPrompt, setCustomPrompt] = useState(saved.customPrompt || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setWizardState({ paletteSize, tone, vibe, useCase, customPrompt });
    router.push("/results");
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/select-colours" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors text-xs lowercase">
          <ArrowLeft size={14} />
          back
        </Link>
        <span className="text-xs text-stone-300">step 3 of 4</span>
      </nav>

      <div className="flex-1 flex flex-col px-6 md:px-12 py-6 max-w-2xl mx-auto w-full">
        {/* Mascot */}
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <SpeechBubble
            text="now tell me what your palette is for, so i can make it actually useful."
            className="mb-3"
          />
          <Mascot pose="sitting" size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 space-y-6"
        >
          <h2 className="text-xl font-light text-stone-700 lowercase">
            customise your palette
          </h2>

          {/* Palette size */}
          <div>
            <label className="text-xs font-medium text-stone-500 lowercase block mb-2">
              palette size
            </label>
            <div className="flex gap-2">
              {paletteSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setPaletteSize(size)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-sm transition-all",
                    paletteSize === size
                      ? "bg-stone-700 text-white shadow-sm"
                      : "bg-white/60 text-stone-500 border border-white/80 hover:bg-white/80"
                  )}
                >
                  {size}
                </button>
              ))}
              <input
                type="number"
                min={2}
                max={10}
                placeholder="custom"
                value={paletteSizes.includes(paletteSize) ? "" : paletteSize}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 2 && val <= 10) setPaletteSize(val);
                }}
                className="w-20 h-10 rounded-xl bg-white/60 border border-white/80 text-sm text-stone-600 text-center placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors"
              />
            </div>
          </div>

          {/* Tone */}
          <div>
            <label className="text-xs font-medium text-stone-500 lowercase block mb-2">
              tone / brightness
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs lowercase transition-all",
                    tone === t
                      ? "bg-stone-700 text-white shadow-sm"
                      : "bg-white/60 text-stone-500 border border-white/80 hover:bg-white/80"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Vibe */}
          <div>
            <label className="text-xs font-medium text-stone-500 lowercase block mb-2">
              vibe / aesthetic
            </label>
            <div className="flex flex-wrap gap-2">
              {vibes.map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs lowercase transition-all",
                    vibe === v
                      ? "bg-stone-700 text-white shadow-sm"
                      : "bg-white/60 text-stone-500 border border-white/80 hover:bg-white/80"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Use case */}
          <div>
            <label className="text-xs font-medium text-stone-500 lowercase block mb-2">
              use case
            </label>
            <div className="flex flex-wrap gap-2">
              {useCases.map((uc) => (
                <button
                  key={uc}
                  onClick={() => setUseCase(uc)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs lowercase transition-all",
                    useCase === uc
                      ? "bg-stone-700 text-white shadow-sm"
                      : "bg-white/60 text-stone-500 border border-white/80 hover:bg-white/80"
                  )}
                >
                  {uc}
                </button>
              ))}
            </div>
          </div>

          {/* Custom prompt */}
          <div>
            <label className="text-xs font-medium text-stone-500 lowercase block mb-2">
              anything else to tell me? <span className="text-stone-300">(optional)</span>
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="i want a soft but professional colour scheme for a skincare brand website..."
              rows={2}
              className="w-full bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl px-3 py-2.5 text-sm text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors resize-none lowercase"
            />
          </div>

          {/* Generate button */}
          <motion.button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={14} />
            generate palette
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
