"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Save, Lock, Unlock, Send, BookmarkCheck } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SpeechBubble } from "@/components/speech-bubble";
import { ColourSwatch } from "@/components/colour-swatch";
import { PalettePreview } from "@/components/palette-preview";
import { ExportPanel } from "@/components/export-panel";
import { ScoreCard } from "@/components/score-card";
import { LoadingScreen } from "@/components/loading-screen";
import { getWizardState, setWizardState, buildGenerateRequest } from "@/lib/palette-store";
import { GeneratedPalette, PaletteColour } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
  const router = useRouter();
  const [palette, setPalette] = useState<GeneratedPalette | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showExport, setShowExport] = useState(false);

  const generate = useCallback(async (feedbackText?: string) => {
    setLoading(true);
    setError("");
    try {
      const state = getWizardState();
      const request = buildGenerateRequest(state, feedbackText);
      const res = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "generation failed");
      }
      const data: GeneratedPalette = await res.json();
      setPalette(data);
      setWizardState({ generatedPalette: data });
      setSaved(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const state = getWizardState();
    if (state.generatedPalette) {
      setPalette(state.generatedPalette);
    } else {
      generate();
    }
  }, [generate]);

  const toggleLock = (hex: string) => {
    if (!palette) return;
    const updated: GeneratedPalette = {
      ...palette,
      colours: palette.colours.map((c) =>
        c.hex.toLowerCase() === hex.toLowerCase() ? { ...c, locked: !c.locked } : c
      ),
    };
    setPalette(updated);
    setWizardState({ generatedPalette: updated });
  };

  const handleFeedback = async () => {
    if (!feedback.trim()) return;
    const fb = feedback;
    setFeedback("");
    await generate(fb);
  };

  const handleSave = async () => {
    if (!palette) return;
    const state = getWizardState();
    try {
      const res = await fetch("/api/save-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: palette.paletteName,
          useCase: state.useCase,
          vibe: state.vibe,
          tone: state.tone,
          colours: palette.colours,
          scores: palette.scores,
          explanation: palette.explanation,
          accessibilityNotes: palette.accessibilityNotes,
          customPrompt: state.customPrompt,
        }),
      });
      if (res.ok) setSaved(true);
    } catch {
      setError("failed to save palette");
    }
  };

  const state = getWizardState();

  return (
    <>
      {loading && <LoadingScreen />}

      <main className="min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-5">
          <Link href="/preferences" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors text-xs lowercase">
            <ArrowLeft size={14} />
            back
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => generate()}
              className="btn-ghost flex items-center gap-1.5 py-1.5 px-3 text-xs"
            >
              <RefreshCw size={12} />
              regenerate
            </button>
            {!saved ? (
              <button
                onClick={handleSave}
                className="btn-primary flex items-center gap-1.5 py-1.5 px-3 text-xs"
              >
                <Save size={12} />
                save palette
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-white/60 rounded-full px-3 py-1.5 border border-white/80">
                <BookmarkCheck size={12} />
                saved!
              </div>
            )}
          </div>
        </nav>

        <div className="flex-1 px-6 md:px-12 py-4 max-w-5xl mx-auto w-full">
          {error && (
            <div className="mb-4 bg-red-50/80 border border-red-100 rounded-xl p-3 text-xs text-red-500 lowercase">
              {error} — please try again.
            </div>
          )}

          {palette && (
            <div className="space-y-6">
              {/* Mascot + header */}
              <motion.div
                className="flex items-end gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Mascot pose="celebrating" size={80} />
                <div className="flex-1">
                  <SpeechBubble
                    text="i made this palette for you. lock the colours you love, or tell me what to change."
                    side="right"
                  />
                </div>
              </motion.div>

              {/* Palette name */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-2xl font-light text-stone-700 lowercase">{palette.paletteName}</h1>
                <p className="text-sm text-stone-400 lowercase mt-1">{palette.explanation}</p>
              </motion.div>

              {/* Swatches */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {palette.colours.map((colour) => (
                  <ColourSwatch
                    key={colour.hex}
                    colour={colour}
                    onToggleLock={toggleLock}
                    size="lg"
                  />
                ))}
              </motion.div>

              {/* Lock hint */}
              <p className="text-xs text-stone-400 lowercase flex items-center gap-1.5">
                <Lock size={10} />
                hover a swatch to lock or copy its colour
              </p>

              {/* Two-column layout */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PalettePreview colours={palette.colours} useCase={state.useCase} />
                </motion.div>

                {/* Scores */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-3"
                >
                  <ScoreCard scores={palette.scores} />

                  {/* Accessibility */}
                  <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 p-4">
                    <p className="text-xs font-medium text-stone-500 lowercase mb-1.5">accessibility notes</p>
                    <p className="text-xs text-stone-500 lowercase leading-relaxed">
                      {palette.accessibilityNotes}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Feedback */}
              <motion.div
                className="glass-card p-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs font-medium text-stone-500 lowercase mb-3">
                  not quite right? tell me what to change
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFeedback()}
                    placeholder="the green is too dark... make it softer... add more contrast..."
                    className="flex-1 bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors lowercase"
                  />
                  <button
                    onClick={handleFeedback}
                    className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs"
                  >
                    <Send size={12} />
                    refine palette
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["make it softer", "add more contrast", "make it more minimal", "warmer tones", "cooler tones"].map((hint) => (
                    <button
                      key={hint}
                      onClick={() => setFeedback(hint)}
                      className="text-xs text-stone-400 bg-white/50 border border-white/60 rounded-full px-2.5 py-1 hover:bg-white/70 transition-colors lowercase"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Export */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  onClick={() => setShowExport(!showExport)}
                  className="text-xs text-stone-500 hover:text-stone-700 transition-colors lowercase flex items-center gap-1.5 mb-3"
                >
                  {showExport ? "hide" : "show"} export options
                </button>
                <AnimatePresence>
                  {showExport && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <ExportPanel exportData={palette.export} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Footer actions */}
              <div className="flex justify-between pb-8">
                <Link href="/create">
                  <button className="btn-ghost text-xs">start over</button>
                </Link>
                <Link href="/palettes">
                  <button className="btn-outline text-xs">view all palettes</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
