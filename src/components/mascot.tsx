"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

// pip — a simple cute potato oval 🥔

type MascotPose =
  | "waving"
  | "sitting"
  | "lying"
  | "walking"
  | "peeking"
  | "bouncing"
  | "celebrating";

interface MascotProps {
  pose?: MascotPose;
  size?: number;
  className?: string;
}

const bodyAnimations: Record<MascotPose, TargetAndTransition> = {
  waving:      { y: [0, -8, 0],        transition: { repeat: Infinity, duration: 2.4, ease: "easeInOut" } },
  sitting:     { y: [0, -4, 0],        transition: { repeat: Infinity, duration: 3.0, ease: "easeInOut" } },
  lying:       { rotate: [0, 2, 0],    transition: { repeat: Infinity, duration: 4.0, ease: "easeInOut" } },
  walking:     { x: [0, 5, 0, -5, 0], transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } },
  peeking:     { x: [0, 4, 0],        transition: { repeat: Infinity, duration: 2.0, ease: "easeInOut" } },
  bouncing:    { y: [0, -18, 0],       transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } },
  celebrating: { rotate: [-5, 5, -5], y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" } },
};

const wavingArmAnim: TargetAndTransition = {
  rotate: [-20, 35, -20],
  transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
};

const celebArmAnim: TargetAndTransition = {
  rotate: [-40, 40, -40],
  transition: { repeat: Infinity, duration: 0.38, ease: "easeInOut" },
};

export function Mascot({ pose = "waving", size = 100, className }: MascotProps) {
  return (
    <motion.div
      className={cn("relative inline-block select-none", className)}
      style={{ width: size, height: size }}
      animate={bodyAnimations[pose]}
    >
      <svg viewBox="0 0 100 110" width={size} height={size} xmlns="http://www.w3.org/2000/svg">

        {/* shadow */}
        <ellipse cx="50" cy="107" rx="22" ry="5" fill="rgba(0,0,0,0.09)" />

        {/* potato body — simple tall oval */}
        <ellipse
          cx="50" cy="52"
          rx="30" ry="40"
          fill="#F2E06A"
          stroke="#1a1a1a"
          strokeWidth="3.5"
        />

        {/* blush */}
        <ellipse cx="34" cy="58" rx="7" ry="5" fill="#F4A0A0" opacity="0.55" />
        <ellipse cx="66" cy="58" rx="7" ry="5" fill="#F4A0A0" opacity="0.55" />

        {/* eyes */}
        <circle cx="43" cy="48" r="3.2" fill="#1a1a1a" />
        <circle cx="57" cy="48" r="3.2" fill="#1a1a1a" />
        {/* shine */}
        <circle cx="44.5" cy="46.5" r="1.1" fill="white" />
        <circle cx="58.5" cy="46.5" r="1.1" fill="white" />

        {/* smile */}
        <path d="M41 62 Q50 71 59 62" fill="none" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round" />

        {/* right arm (waving / celebrating) */}
        {pose === "waving" ? (
          <motion.g animate={wavingArmAnim} style={{ originX: "79px", originY: "50px" }}>
            <line x1="79" y1="50" x2="94" y2="36" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="94" cy="35" r="5" fill="#F2E06A" stroke="#1a1a1a" strokeWidth="3" />
          </motion.g>
        ) : pose === "celebrating" ? (
          <motion.g animate={celebArmAnim} style={{ originX: "79px", originY: "50px" }}>
            <line x1="79" y1="50" x2="93" y2="30" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="93" cy="28" r="5" fill="#F2E06A" stroke="#1a1a1a" strokeWidth="3" />
          </motion.g>
        ) : (
          <>
            <line x1="79" y1="56" x2="93" y2="68" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="93" cy="69" r="5" fill="#F2E06A" stroke="#1a1a1a" strokeWidth="3" />
          </>
        )}

        {/* left arm */}
        {pose === "celebrating" ? (
          <motion.g animate={celebArmAnim} style={{ originX: "21px", originY: "50px" }}>
            <line x1="21" y1="50" x2="7" y2="30" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="7" cy="28" r="5" fill="#F2E06A" stroke="#1a1a1a" strokeWidth="3" />
          </motion.g>
        ) : (
          <>
            <line x1="21" y1="56" x2="7" y2="68" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="7" cy="69" r="5" fill="#F2E06A" stroke="#1a1a1a" strokeWidth="3" />
          </>
        )}

        {/* tiny legs */}
        <line x1="43" y1="91" x2="40" y2="103" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="39" cy="104" r="4" fill="#F2E06A" stroke="#1a1a1a" strokeWidth="3" />

        <line x1="57" y1="91" x2="60" y2="103" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="61" cy="104" r="4" fill="#F2E06A" stroke="#1a1a1a" strokeWidth="3" />

      </svg>
    </motion.div>
  );
}
