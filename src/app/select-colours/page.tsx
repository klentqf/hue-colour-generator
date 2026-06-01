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
import { cn } from "@/lib/utils";
import { getTextColour } from "@/lib/utils";

export default function SelectColoursPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(() => getWizardState().selectedColours);
  const [activeFamily, setActiveFamily] = useState<ColourFamily | null>(null);

  const toggleColour = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleContinue = () => {
    setWizardState({ selectedColours: selected });
    router.push("/preferences");
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        {activeFamily ? (
          <button
            onClick={() => setActiveFamily(null)}
            className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors text-xs lowercase"
          >
            <ChevronLeft size={14} />
            colour families
          </button>
        ) : (
          <Link href="/create" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors text-xs lowercase">
            <ArrowLeft size={14} />
            back
          </Link>
        )}
        <span className="text-xs text-stone-300">step 2 of 4</span>
      </nav>

      <div className="flex-1 flex flex-col px-6 md:px-12 py-6 max-w-3xl mx-auto w-full">
        {/* Mascot */}
        <motion.div
          className="flex items-end gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Mascot pose="lying" size={70} className="mb-1" />
          <SpeechBubble
            text={activeFamily
              ? `pick any ${activeFamily.name} tones you love.`
              : "pick any colours that feel close to the mood you want."}
            side="right"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!activeFamily ? (
            /* Colour family grid */
            <motion.div
              key="families"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-light text-stone-600 lowercase mb-4">
                browse by colour family
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {colourFamilies.map((family) => {
                  const familySelected = selected.filter((s) =>
                    family.variations.some((v) => v.name === s)
                  ).length;
                  return (
                    <motion.button
                      key={family.name}
                      onClick={() => setActiveFamily(family)}
                      className="glass-card p-3 text-left group hover:shadow-md transition-all"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Preview swatches */}
                      <div className="flex h-8 rounded-lg overflow-hidden mb-2">
                        {family.preview.map((hex, i) => (
                          <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                        ))}
                      </div>
                      <p className="text-xs text-stone-500 lowercase">{family.name}</p>
                      {familySelected > 0 && (
                        <p className="text-[10px] text-stone-400 lowercase">
                          {familySelected} selected
                        </p>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Colour variation grid */
            <motion.div
              key={activeFamily.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-light text-stone-600 lowercase mb-4">
                {activeFamily.name} shades
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {activeFamily.variations.map((variation) => {
                  const isSelected = selected.includes(variation.name);
                  const textColor = getTextColour(variation.hex);
                  return (
                    <motion.button
                      key={variation.name}
                      onClick={() => toggleColour(variation.name)}
                      className={cn(
                        "rounded-2xl overflow-hidden border-2 transition-all",
                        isSelected ? "border-stone-500 shadow-md" : "border-transparent"
                      )}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div
                        className="h-20 relative"
                        style={{ backgroundColor: variation.hex }}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center bg-white/30 backdrop-blur-sm"
                              style={{ color: textColor }}
                            >
                              ✓
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="bg-white/60 px-2.5 py-2">
                        <p className="text-xs text-stone-600 lowercase">{variation.label}</p>
                        <p className="text-[10px] text-stone-400 font-mono">{variation.hex}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected colours + continue */}
        {selected.length > 0 && (
          <motion.div
            className="mt-6 glass-card p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-stone-500 lowercase">
                selected colours ({selected.length})
              </p>
              <motion.button
                onClick={handleContinue}
                className="btn-primary flex items-center gap-2 text-xs py-2 px-4"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                continue
                <ArrowRight size={12} />
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.map((c) => {
                const variation = colourFamilies
                  .flatMap((f) => f.variations)
                  .find((v) => v.name === c);
                return (
                  <div
                    key={c}
                    className="flex items-center gap-1.5 bg-white/70 border border-white/80 rounded-full px-3 py-1 text-xs text-stone-600"
                  >
                    {variation && (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: variation.hex }}
                      />
                    )}
                    {c}
                    <button
                      onClick={() => toggleColour(c)}
                      className="text-stone-300 hover:text-stone-500 transition-colors ml-0.5"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {selected.length === 0 && (
          <div className="mt-6 flex justify-end">
            <motion.button
              onClick={handleContinue}
              className="btn-ghost flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              skip — surprise me
              <ArrowRight size={14} />
            </motion.button>
          </div>
        )}
      </div>
    </main>
  );
}
