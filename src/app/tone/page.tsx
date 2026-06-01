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

const tones = [
  { name: "light", desc: "bright and airy", preview: ["#FFF4EA", "#FFE8E8", "#E8F4FF"] },
  { name: "dark", desc: "deep and moody", preview: ["#2C2438", "#1E2D40", "#1A2E1A"] },
  { name: "pastel", desc: "soft and dreamy", preview: ["#FFD6E0", "#D4E8FF", "#D4F0D4"] },
  { name: "bold", desc: "vibrant and strong", preview: ["#FF4D6D", "#4361EE", "#06D6A0"] },
  { name: "muted", desc: "calm and desaturated", preview: ["#C4A882", "#8EA8B8", "#A8B88E"] },
  { name: "soft", desc: "gentle and warm", preview: ["#F4DDD0", "#DDD4F4", "#D4F4DD"] },
  { name: "high contrast", desc: "sharp and punchy", preview: ["#000000", "#FFFFFF", "#FF3300"] },
  { name: "mixed", desc: "light and dark together", preview: ["#FFF4EA", "#5C4033", "#A0C4FF"] },
];

export default function TonePage() {
  const router = useRouter();
  const [tone, setTone] = useState(() => getWizardState().tone || "soft");

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-14 py-6">
        <Link href="/palette-size" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors small-text">
          <ArrowLeft size={16} />
          back
        </Link>
        <span className="small-text">step 4 of 7</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SpeechBubble text="what kind of brightness and energy should the palette have?" className="mb-4" />
            <Mascot pose="sitting" size={120} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="page-title mb-2">tone & brightness</h2>
            <p className="body-text mb-8">pick the overall mood of the colours.</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {tones.map((t) => (
                <motion.button
                  key={t.name}
                  onClick={() => setTone(t.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "rounded-2xl p-4 text-left border-2 transition-all",
                    tone === t.name
                      ? "border-stone-500 bg-white/70 shadow-md"
                      : "border-transparent bg-white/40 hover:bg-white/60"
                  )}
                >
                  <div className="flex gap-1.5 mb-2.5">
                    {t.preview.map((hex, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-white/60 shadow-sm" style={{ backgroundColor: hex }} />
                    ))}
                  </div>
                  <p className="text-base font-medium text-stone-700 lowercase">{t.name}</p>
                  <p className="text-sm text-stone-400 lowercase">{t.desc}</p>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => {
                setWizardState({ tone });
                router.push("/vibe");
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
