"use client";

import { motion } from "framer-motion";
import { PaletteScores } from "@/lib/types";

interface ScoreCardProps {
  scores: PaletteScores;
}

const scoreLabels: { key: keyof PaletteScores; label: string }[] = [
  { key: "visualHarmony", label: "visual harmony" },
  { key: "contrast", label: "contrast" },
  { key: "accessibility", label: "accessibility" },
  { key: "useCaseFit", label: "use case fit" },
  { key: "brandPersonality", label: "brand personality" },
];

function scoreColor(score: number): string {
  if (score >= 8) return "#B8D4B8";
  if (score >= 6) return "#F5E87A";
  return "#F4C2C2";
}

export function ScoreCard({ scores }: ScoreCardProps) {
  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 p-4">
      <p className="text-xs font-medium text-stone-500 lowercase mb-3">palette scores</p>
      <div className="flex flex-col gap-2.5">
        {scoreLabels.map(({ key, label }, i) => {
          const value = scores[key];
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-stone-500 lowercase w-32 shrink-0">{label}</span>
              <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: scoreColor(value) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${value * 10}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-mono text-stone-400 w-4 text-right">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
