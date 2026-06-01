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

const vibes = [
  { name: "clean girl", emoji: "✨" },
  { name: "soft pastel", emoji: "🌸" },
  { name: "luxury brand", emoji: "🖤" },
  { name: "minimal tech", emoji: "⬜" },
  { name: "y2k", emoji: "💿" },
  { name: "cyberpunk", emoji: "🟣" },
  { name: "dark academia", emoji: "📚" },
  { name: "coffee shop", emoji: "☕" },
  { name: "k-pop inspired", emoji: "🌟" },
  { name: "corporate but not boring", emoji: "💼" },
  { name: "elegant", emoji: "🕊️" },
  { name: "playful", emoji: "🎨" },
  { name: "futuristic", emoji: "🚀" },
  { name: "calm and wellness", emoji: "🌿" },
  { name: "cottagecore", emoji: "🌼" },
  { name: "editorial", emoji: "📰" },
  { name: "retro vintage", emoji: "🎞️" },
  { name: "beachy", emoji: "🌊" },
];

export default function VibePage() {
  const router = useRouter();
  const [vibe, setVibe] = useState(() => getWizardState().vibe || "soft pastel");

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-14 py-6">
        <Link href="/tone" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors small-text">
          <ArrowLeft size={16} />
          back
        </Link>
        <span className="small-text">step 5 of 7</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SpeechBubble text="what aesthetic or vibe are you going for?" className="mb-4" />
            <Mascot pose="waving" size={120} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="page-title mb-2">vibe & aesthetic</h2>
            <p className="body-text mb-8">pick the feeling you want your palette to give off.</p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {vibes.map((v) => (
                <motion.button
                  key={v.name}
                  onClick={() => setVibe(v.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "chip flex items-center gap-2",
                    vibe === v.name ? "chip-active" : "chip-inactive"
                  )}
                >
                  <span>{v.emoji}</span>
                  {v.name}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => {
                setWizardState({ vibe });
                router.push("/use-case");
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
