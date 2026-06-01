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
    const trimmed = colourInput.trim();
    if (trimmed && !colours.includes(trimmed)) {
      setColours([...colours, trimmed]);
      setColourInput("");
    }
  };

  const removeColour = (c: string) => {
    setColours(colours.filter((x) => x !== c));
  };

  const handleHaveColours = () => {
    if (colours.length === 0 && colourInput.trim()) {
      const parts = colourInput.split(",").map((s) => s.trim()).filter(Boolean);
      setWizardState({ selectedColours: parts });
    } else {
      setWizardState({ selectedColours: colours });
    }
    router.push("/preferences");
  };

  const handleHelpChoose = () => {
    setWizardState({ selectedColours: [] });
    router.push("/select-colours");
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors text-xs lowercase">
          <ArrowLeft size={14} />
          back
        </Link>
        <span className="text-xs text-stone-300">step 1 of 4</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Mascot */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpeechBubble
              text="you can type colours you love, or i can help you browse."
              className="mb-3"
            />
            <Mascot pose="sitting" size={90} />
          </motion.div>

          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="text-xl font-light text-stone-700 lowercase mb-2">
              do you already have colours in mind?
            </h2>
            <p className="text-sm text-stone-400 lowercase mb-6">
              add hex codes, colour names, or a mix — or let me help you choose.
            </p>

            {/* Option A: I have colours */}
            <div className="mb-6">
              <label className="text-xs font-medium text-stone-500 lowercase block mb-2">
                yes, i have colours
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={colourInput}
                  onChange={(e) => setColourInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addColour()}
                  placeholder="sage green, #f4c2c2, baby pink..."
                  className="flex-1 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl px-3 py-2 text-sm text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors lowercase"
                />
                <button
                  onClick={addColour}
                  className="bg-stone-100 hover:bg-stone-200 transition-colors rounded-xl px-3 py-2 text-stone-500"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Added colours */}
              {colours.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {colours.map((c) => (
                    <motion.div
                      key={c}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 bg-white/70 border border-white/80 rounded-full px-3 py-1 text-xs text-stone-600"
                    >
                      {c.startsWith("#") && (
                        <div
                          className="w-3 h-3 rounded-full border border-stone-200"
                          style={{ backgroundColor: c }}
                        />
                      )}
                      {c}
                      <button
                        onClick={() => removeColour(c)}
                        className="text-stone-300 hover:text-stone-500 transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.button
                onClick={handleHaveColours}
                className="btn-primary w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                continue with these colours
                <ArrowRight size={14} />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-stone-200/60" />
              <span className="text-xs text-stone-300 lowercase">or</span>
              <div className="flex-1 h-px bg-stone-200/60" />
            </div>

            {/* Option B: Help choose */}
            <motion.button
              onClick={handleHelpChoose}
              className="btn-outline w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              no, help me choose
              <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
