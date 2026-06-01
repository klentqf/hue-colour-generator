"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SpeechBubble } from "@/components/speech-bubble";
import { setWizardState, getWizardState } from "@/lib/palette-store";
import { cn } from "@/lib/utils";

const sizes = [3, 4, 5, 6, 7, 8];

export default function PaletteSizePage() {
  const router = useRouter();
  const [paletteSize, setPaletteSize] = useState(() => getWizardState().paletteSize || 5);
  const [custom, setCustom] = useState("");

  const activeSize = custom ? parseInt(custom) : paletteSize;

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-14 py-6">
        <Link href="/select-colours" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors small-text">
          <ArrowLeft size={16} />
          back
        </Link>
        <span className="small-text">step 3 of 7</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SpeechBubble text="how many colours do you want in your palette?" className="mb-4" />
            <Mascot pose="sitting" size={120} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="page-title mb-2">palette size</h2>
            <p className="body-text mb-8">choose how many colours you'd like.</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {sizes.map((s) => (
                <motion.button
                  key={s}
                  onClick={() => { setPaletteSize(s); setCustom(""); }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    "rounded-2xl py-6 text-2xl font-light transition-all",
                    !custom && paletteSize === s ? "chip-active" : "chip-inactive"
                  )}
                >
                  {s}
                </motion.button>
              ))}
            </div>

            <div className="mb-8">
              <label className="section-label block mb-2">or enter a custom number</label>
              <input
                type="number"
                min={2}
                max={12}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="e.g. 9"
                className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-lg text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors"
              />
            </div>

            {/* Visual preview */}
            <div className="flex gap-2 mb-8 justify-center">
              {Array.from({ length: Math.min(activeSize || 5, 10) }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 h-10 rounded-xl"
                  style={{
                    backgroundColor: `hsl(${(i * 360) / (activeSize || 5)}, 35%, 78%)`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => {
                const finalSize = custom ? parseInt(custom) : paletteSize;
                setWizardState({ paletteSize: finalSize });
                router.push("/tone");
              }}
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              continue
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
