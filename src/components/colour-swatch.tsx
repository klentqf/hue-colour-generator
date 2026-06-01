"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Copy, Check } from "lucide-react";
import { PaletteColour } from "@/lib/types";
import { getTextColour, copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ColourSwatchProps {
  colour: PaletteColour;
  onToggleLock?: (hex: string) => void;
  showLock?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ColourSwatch({
  colour,
  onToggleLock,
  showLock = true,
  size = "md",
}: ColourSwatchProps) {
  const [copied, setCopied] = useState(false);
  const textColor = getTextColour(colour.hex);

  const handleCopy = async () => {
    await copyToClipboard(colour.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const heights = { sm: "h-24", md: "h-36", lg: "h-48" };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-sm border border-white/60 group"
      whileHover={{ y: -3, shadow: "lg" }}
      transition={{ duration: 0.2 }}
    >
      {/* Colour area */}
      <div
        className={cn("relative w-full", heights[size])}
        style={{ backgroundColor: colour.hex }}
      >
        {colour.locked && (
          <div className="absolute top-2 left-2 bg-white/30 backdrop-blur-sm rounded-full p-1">
            <Lock size={10} style={{ color: textColor }} />
          </div>
        )}

        {/* Actions overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="bg-white/30 backdrop-blur-sm rounded-full p-2 hover:bg-white/50 transition-colors"
            title="copy hex"
          >
            {copied ? (
              <Check size={14} style={{ color: textColor }} />
            ) : (
              <Copy size={14} style={{ color: textColor }} />
            )}
          </button>
          {showLock && onToggleLock && (
            <button
              onClick={() => onToggleLock(colour.hex)}
              className="bg-white/30 backdrop-blur-sm rounded-full p-2 hover:bg-white/50 transition-colors"
              title={colour.locked ? "unlock colour" : "lock colour"}
            >
              {colour.locked ? (
                <Lock size={14} style={{ color: textColor }} />
              ) : (
                <Unlock size={14} style={{ color: textColor }} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Info area */}
      <div className="bg-white/60 backdrop-blur-sm px-3 py-2.5">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-xs font-medium text-stone-700 lowercase">{colour.name}</p>
          <button
            onClick={handleCopy}
            className="text-xs text-stone-400 hover:text-stone-600 transition-colors font-mono"
          >
            {copied ? "copied!" : colour.hex.toUpperCase()}
          </button>
        </div>
        <p className="text-xs text-stone-400 lowercase">{colour.role}</p>
        {size === "lg" && (
          <p className="text-xs text-stone-400 lowercase mt-1 leading-relaxed">
            {colour.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
