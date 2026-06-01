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

const useCases = [
  { name: "website design", icon: "🌐", desc: "full site or landing page" },
  { name: "mobile app ui", icon: "📱", desc: "ios or android app" },
  { name: "branding", icon: "✦", desc: "brand identity system" },
  { name: "logo design", icon: "⬡", desc: "logo and wordmark" },
  { name: "social media post", icon: "📸", desc: "instagram, tiktok, etc." },
  { name: "presentation slides", icon: "🖥️", desc: "pitch deck or slides" },
  { name: "poster", icon: "🪧", desc: "print or digital poster" },
  { name: "product packaging", icon: "📦", desc: "labels and packaging" },
  { name: "personal project", icon: "🎨", desc: "just for fun" },
  { name: "interior design", icon: "🛋️", desc: "room and space palette" },
  { name: "fashion", icon: "👗", desc: "clothing and accessories" },
  { name: "illustration", icon: "✏️", desc: "artwork and drawing" },
];

export default function UseCasePage() {
  const router = useRouter();
  const saved = getWizardState();
  const [useCase, setUseCase] = useState(saved.useCase || "website design");
  const [customPrompt, setCustomPrompt] = useState(saved.customPrompt || "");

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-14 py-6">
        <Link href="/vibe" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors small-text">
          <ArrowLeft size={16} />
          back
        </Link>
        <span className="small-text">step 6 of 7</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SpeechBubble text="what are you making this palette for? i'll make it actually useful." className="mb-4" />
            <Mascot pose="sitting" size={120} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="page-title mb-2">use case</h2>
            <p className="body-text mb-8">tell me what you're building.</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {useCases.map((uc) => (
                <motion.button
                  key={uc.name}
                  onClick={() => setUseCase(uc.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "rounded-2xl p-4 text-left border-2 transition-all",
                    useCase === uc.name
                      ? "border-stone-500 bg-white/70 shadow-md"
                      : "border-transparent bg-white/40 hover:bg-white/60"
                  )}
                >
                  <span className="text-xl mb-1.5 block">{uc.icon}</span>
                  <p className="text-base font-medium text-stone-700 lowercase">{uc.name}</p>
                  <p className="text-sm text-stone-400 lowercase">{uc.desc}</p>
                </motion.button>
              ))}
            </div>

            <div className="mb-8">
              <label className="section-label block mb-2">anything else? <span className="text-stone-300 normal-case font-normal">(optional)</span></label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. a soft skincare brand with a luxurious but approachable feel..."
                rows={3}
                className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-base text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 transition-colors resize-none"
              />
            </div>

            <motion.button
              onClick={() => {
                setWizardState({ useCase, customPrompt });
                router.push("/results");
              }}
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={16} />
              generate my palette
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
