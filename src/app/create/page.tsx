"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SpeechBubble } from "@/components/speech-bubble";
import { setWizardState } from "@/lib/palette-store";

export default function CreatePage() {
  const router = useRouter();
  const [colourInput, setColourInput] = useState("");
  const [colours, setColours] = useState<string[]>([]);

  const addColour = () => {
    const parts = colourInput.split(",").map((s) => s.trim()).filter(Boolean);
    const newColours = parts.filter((p) => !colours.includes(p));
    if (newColours.length) { setColours([...colours, ...newColours]); setColourInput(""); }
  };

  const removeColour = (c: string) => setColours(colours.filter((x) => x !== c));

  const handleHaveColours = () => {
    setWizardState({ selectedColours: colours.length ? colours : colourInput.split(",").map(s => s.trim()).filter(Boolean) });
    router.push("/palette-size");
  };

  const handleHelpChoose = () => {
    setWizardState({ selectedColours: [] });
    router.push("/select-colours");
  };

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-14 py-6">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors small-text">
          <ArrowLeft size={16} />
          back
        </Link>
        <span className="small-text">step 1 of 7</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SpeechBubble text="you can type colours you love, or i can help you browse 🌈" className="mb-4" />
            <Mascot pose="sitting" size={130} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="page-title mb-2">do you have colours in mind?</h2>
            <p className="body-text mb-8">type a colour name, hex code, or a mix — or let me help you browse.</p>

            {/* Option A */}
            <div className="mb-7">
              <label className="section-label block mb-3">yes, i have colours</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={colourInput}
                  onChange={(e) => setColourInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addColour()}
                  placeholder="sage green, #f4c2c2, baby pink..."
                  className="flex-1 bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-base text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors"
                />
                <button onClick={addColour} className="bg-stone-100 hover:bg-stone-200 transition-colors rounded-xl px-4 py-3 text-stone-500">
                  <Plus size={18} />
                </button>
              </div>

              {colours.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {colours.map((c) => (
                    <motion.div key={c} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 bg-white/70 border border-white/80 rounded-full px-4 py-1.5 text-sm text-stone-600"
                    >
                      {c.startsWith("#") && <div className="w-3.5 h-3.5 rounded-full border border-stone-200" style={{ backgroundColor: c }} />}
                      {c}
                      <button onClick={() => removeColour(c)} className="text-stone-300 hover:text-stone-500 transition-colors"><X size={12} /></button>
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.button onClick={handleHaveColours} className="btn-primary w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                continue with these colours <ArrowRight size={16} />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-stone-200/60" />
              <span className="small-text">or</span>
              <div className="flex-1 h-px bg-stone-200/60" />
            </div>

            {/* Option B */}
            <motion.button onClick={handleHelpChoose} className="btn-outline w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              no, help me choose <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
