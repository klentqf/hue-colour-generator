"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  text: string;
  className?: string;
  side?: "left" | "right";
}

export function SpeechBubble({ text, className, side = "left" }: SpeechBubbleProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn("relative max-w-sm", className)}
      >
        <div className="rounded-2xl bg-white/75 backdrop-blur-md border border-white/85 px-5 py-4 shadow-soft">
          <p className="text-base text-stone-600 leading-relaxed lowercase">{text}</p>
        </div>
        <div className={cn("absolute bottom-[-11px] w-5 h-5 overflow-hidden", side === "left" ? "left-7" : "right-7")}>
          <div className="w-5 h-5 bg-white/75 backdrop-blur-md border-b border-r border-white/85 rotate-45 -translate-y-2.5 shadow-soft" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
