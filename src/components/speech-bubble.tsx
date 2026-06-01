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
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn("relative max-w-xs", className)}
      >
        {/* Bubble */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 px-4 py-3 shadow-soft">
          <p className="text-sm text-stone-600 leading-relaxed lowercase">{text}</p>
        </div>

        {/* Tail */}
        <div
          className={cn(
            "absolute bottom-[-10px] w-4 h-4 overflow-hidden",
            side === "left" ? "left-6" : "right-6"
          )}
        >
          <div className="w-4 h-4 bg-white/70 backdrop-blur-md border-b border-r border-white/80 rotate-45 -translate-y-2 shadow-soft" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
