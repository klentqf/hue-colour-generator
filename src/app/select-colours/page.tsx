"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, ChevronLeft } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SpeechBubble } from "@/components/speech-bubble";
import { colourFamilies, ColourFamily } from "@/lib/colour-data";
import { setWizardState, getWizardState } from "@/lib/palette-store";
import { cn, getTextColour } from "@/lib/utils";

export default function SelectColoursPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(() => getWizardState().selectedColours);
  const [activeFamily, setActiveFamily] = useState<ColourFamily | null>(null);

  const toggleColour = (name: string) =>
    setSelected((prev) => prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]);

  const handleContinue = () => {
    setWizardState({ selectedColours: selected });
    router.push("/palette-size");
  };

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-14 py-6">
        {activeFamily ? (
          <button onClick={() => setActiveFamily(null)} className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors small-text">
            <ChevronLeft size={16} /> colour families
          </button>
        ) : (
          <Link href="/create" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors small-text">
            <ArrowLeft size={16} /> back
          </Link>
        )}
        <span className="small-text">step 2 of 7</span>
      </nav>

      <div className="flex-1 flex flex-col px-6 md:px-14 py-6 max-w-3xl mx-auto w-full">
        {/* Mascot */}
        <motion.div className="flex items-end gap-4 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Mascot pose="lying" size={90} className="mb-1" />
          <SpeechBubble
            text={activeFamily ? `pick any ${activeFamily.name} tones you love.` : "browse by colour family and pick anything that catches your eye."}
            side="right"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!activeFamily ? (
            <motion.div key="families" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <h2 className="page-title mb-6">colour families</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {colourFamilies.map((family) => {
                  const count = selected.filter((s) => family.variations.some((v) => v.name === s)).length;
                  return (
                    <motion.button key={family.name} onClick={() => setActiveFamily(family)}
                      className="glass-card p-4 text-left group hover:shadow-md transition-all"
                      whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
                    >
                      <div className="flex h-10 rounded-xl overflow-hidden mb-3">
                        {family.preview.map((hex, i) => <div key={i} className="flex-1" style={{ backgroundColor: hex }} />)}
                      </div>
                      <p className="text-base text-stone-600 lowercase">{family.name}</p>
                      {count > 0 && <p className="text-sm text-stone-400 lowercase">{count} selected</p>}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key={activeFamily.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="page-title mb-6">{activeFamily.name} shades</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {activeFamily.variations.map((variation) => {
                  const isSelected = selected.includes(variation.name);
                  const textColor = getTextColour(variation.hex);
                  return (
                    <motion.button key={variation.name} onClick={() => toggleColour(variation.name)}
                      className={cn("rounded-2xl overflow-hidden border-2 transition-all", isSelected ? "border-stone-500 shadow-md" : "border-transparent")}
                      whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                    >
                      <div className="h-24 relative" style={{ backgroundColor: variation.hex }}>
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/40 backdrop-blur-sm text-lg" style={{ color: textColor }}>✓</div>
                          </div>
                        )}
                      </div>
                      <div className="bg-white/60 px-3 py-2.5">
                        <p className="text-sm text-stone-600 lowercase">{variation.label}</p>
                        <p className="text-xs text-stone-400 font-mono">{variation.hex}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected bar */}
        {selected.length > 0 && (
          <motion.div className="mt-8 glass-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-medium text-stone-500 lowercase">{selected.length} colour{selected.length > 1 ? "s" : ""} selected</p>
              <motion.button onClick={handleContinue} className="btn-primary flex items-center gap-2 py-2.5 px-5 text-sm"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                continue <ArrowRight size={14} />
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.map((c) => {
                const variation = colourFamilies.flatMap((f) => f.variations).find((v) => v.name === c);
                return (
                  <div key={c} className="flex items-center gap-2 bg-white/70 border border-white/80 rounded-full px-4 py-1.5 text-sm text-stone-600">
                    {variation && <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: variation.hex }} />}
                    {c}
                    <button onClick={() => toggleColour(c)} className="text-stone-300 hover:text-stone-500 transition-colors"><X size={11} /></button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="mt-6 flex justify-end">
          <motion.button onClick={handleContinue} className="btn-ghost flex items-center gap-2"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {selected.length === 0 ? "skip — surprise me" : "continue"}
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </main>
  );
}
