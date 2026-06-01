"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

// pip — a tiny cute potato 🥔

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
  waving:      { y: [0, -8, 0],           transition: { repeat: Infinity, duration: 2.4, ease: "easeInOut" } },
  sitting:     { y: [0, -4, 0],           transition: { repeat: Infinity, duration: 3.0, ease: "easeInOut" } },
  lying:       { rotate: [0, 2, 0],       transition: { repeat: Infinity, duration: 4.0, ease: "easeInOut" } },
  walking:     { x: [0, 4, 0, -4, 0],    transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } },
  peeking:     { x: [0, 3, 0],           transition: { repeat: Infinity, duration: 2.0, ease: "easeInOut" } },
  bouncing:    { y: [0, -16, 0],          transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } },
  celebrating: { rotate: [-5, 5, -5], y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" } },
};

const wavingArmAnim: TargetAndTransition = {
  rotate: [-20, 30, -20],
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
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">

        {/* shadow */}
        <ellipse cx="50" cy="96" rx="20" ry="5" fill="rgba(0,0,0,0.10)" />

        {/* potato body — lumpy irregular oval */}
        <path
          d="M50 18
             C28 16 16 28 15 44
             C14 58 18 72 30 80
             C38 86 50 88 62 84
             C76 80 86 68 86 54
             C86 36 72 20 50 18 Z"
          fill="#F0E070"
          stroke="#1a1a1a"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* little bump on top (potato eye/nub) */}
        <path
          d="M42 18 C40 10 46 8 50 10 C54 8 58 11 56 18"
          fill="#F0E070"
          stroke="#1a1a1a"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* blush */}
        <ellipse cx="35" cy="58" rx="7" ry="5" fill="#F4A0A0" opacity="0.6" />
        <ellipse cx="65" cy="58" rx="7" ry="5" fill="#F4A0A0" opacity="0.6" />

        {/* eyes */}
        <circle cx="42" cy="50" r="3" fill="#1a1a1a" />
        <circle cx="58" cy="50" r="3" fill="#1a1a1a" />
        {/* eye shine */}
        <circle cx="43.5" cy="48.5" r="1" fill="white" />
        <circle cx="59.5" cy="48.5" r="1" fill="white" />

        {/* smile */}
        <path d="M42 62 Q50 70 58 62" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />

        {/* left arm (waving or celebrating) */}
        {pose === "waving" ? (
          <motion.g animate={wavingArmAnim} style={{ originX: "82px", originY: "52px" }}>
            <path d="M80 52 Q90 40 93 30" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="93" cy="29" r="5.5" fill="#F0E070" stroke="#1a1a1a" strokeWidth="3" />
          </motion.g>
        ) : pose === "celebrating" ? (
          <motion.g animate={celebArmAnim} style={{ originX: "82px", originY: "52px" }}>
            <path d="M80 52 Q90 36 91 22" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="91" cy="21" r="5.5" fill="#F0E070" stroke="#1a1a1a" strokeWidth="3" />
          </motion.g>
        ) : (
          <>
            <path d="M80 58 Q90 64 92 72" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="92" cy="73" r="5.5" fill="#F0E070" stroke="#1a1a1a" strokeWidth="3" />
          </>
        )}

        {/* right arm */}
        {pose === "celebrating" ? (
          <motion.g animate={celebArmAnim} style={{ originX: "18px", originY: "52px" }}>
            <path d="M20 52 Q10 36 9 22" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="9" cy="21" r="5.5" fill="#F0E070" stroke="#1a1a1a" strokeWidth="3" />
          </motion.g>
        ) : (
          <>
            <path d="M20 58 Q10 64 8 72" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="8" cy="73" r="5.5" fill="#F0E070" stroke="#1a1a1a" strokeWidth="3" />
          </>
        )}

        {/* tiny legs */}
        <path d="M42 86 Q40 93 38 96" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="37" cy="97" r="4" fill="#F0E070" stroke="#1a1a1a" strokeWidth="3" />

        <path d="M58 86 Q60 93 62 96" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="63" cy="97" r="4" fill="#F0E070" stroke="#1a1a1a" strokeWidth="3" />

      </svg>
    </motion.div>
  );
}
