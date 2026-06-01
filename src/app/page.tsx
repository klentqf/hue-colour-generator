"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SpeechBubble } from "@/components/speech-bubble";
import { clearWizardState } from "@/lib/palette-store";

const samplePalettes = [
  {
    name: "petal morning",
    colours: ["#FFF4EA", "#F4C2C2", "#B2C8A8", "#D4C0E8", "#2C2C2C"],
  },
  {
    name: "soft bloom",
    colours: ["#FEF9F4", "#F7D9D9", "#B0D4E8", "#F5EDCA", "#706060"],
  },
  {
    name: "muted sage",
    colours: ["#EFE8F0", "#C8D8C0", "#D4A080", "#E8D8F0", "#404040"],
  },
];

export default function WelcomePage() {
  useEffect(() => {
    clearWizardState();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#D4C0E8]" />
          <span className="text-sm font-medium text-stone-600 lowercase tracking-wide">hue</span>
        </div>
        <Link
          href="/palettes"
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors lowercase"
        >
          saved palettes
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-12 text-center relative">
        {/* Mascot + speech bubble */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SpeechBubble
            text="hi there! let's make something beautiful together."
            className="mb-4"
          />
          <Mascot pose="waving" size={110} />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-light text-stone-700 lowercase leading-tight tracking-tight mb-3">
            dream in colour
          </h1>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed lowercase max-w-md mx-auto">
            create dreamy ai-generated colour palettes for websites, brands, apps, slides, and social posts.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-16"
        >
          <Link href="/create">
            <motion.button
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles size={14} />
              get started
              <ArrowRight size={14} />
            </motion.button>
          </Link>
          <Link href="/palettes">
            <button className="btn-ghost">view saved palettes</button>
          </Link>
        </motion.div>

        {/* Sample palettes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-2xl"
        >
          <p className="text-xs text-stone-400 lowercase mb-4">example palettes</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {samplePalettes.map((palette, i) => (
              <motion.div
                key={i}
                className="glass-card overflow-hidden cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex h-14">
                  {palette.colours.map((hex, j) => (
                    <div key={j} className="flex-1" style={{ backgroundColor: hex }} />
                  ))}
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs text-stone-500 lowercase">{palette.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-5 text-center">
        <p className="text-xs text-stone-300 lowercase">
          powered by ai · built with love
        </p>
      </footer>
    </main>
  );
}
