"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

// swatch — a friendly circle character 🎨

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
  waving:      { y: [0, -8, 0],         transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
  sitting:     { y: [0, -4, 0],         transition: { repeat: Infinity, duration: 3.0, ease: "easeInOut" } },
  lying:       { rotate: [-8, 8, -8],   transition: { repeat: Infinity, duration: 4.0, ease: "easeInOut" } },
  walking:     { x: [0, 5, 0, -5, 0],  transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" } },
  peeking:     { x: [0, 5, 0],         transition: { repeat: Infinity, duration: 2.0, ease: "easeInOut" } },
  bouncing:    { y: [0, -18, 0], scaleX: [1, 1.08, 1], scaleY: [1, 0.92, 1], transition: { repeat: Infinity, duration: 0.55, ease: "easeInOut" } },
  celebrating: { rotate: [-6, 6, -6], y: [0, -12, 0], transition: { repeat: Infinity, duration: 0.65, ease: "easeInOut" } },
};

const rightArmWave: TargetAndTransition = {
  rotate: [-25, 20, -25],
  transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
};

export function Mascot({ pose = "waving", size = 100, className }: MascotProps) {
  const isWaving = pose === "waving" || pose === "celebrating";

  return (
    <motion.div
      className={cn("relative inline-block select-none", className)}
      style={{ width: size, height: size * 1.2 }}
      animate={bodyAnimations[pose]}
    >
      <svg
        viewBox="0 0 200 240"
        width={size}
        height={size * 1.2}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* shadow */}
        <ellipse cx="100" cy="233" rx="38" ry="9" fill="rgba(0,0,0,0.08)" />

        {/* left arm — static, slightly outward */}
        <line x1="38" y1="115" x2="10" y2="132" stroke="#8B7EC8" strokeWidth="5.5" strokeLinecap="round" />
        {/* left hand — 3 prongs */}
        <line x1="10" y1="132" x2="2"  y2="124" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
        <line x1="10" y1="132" x2="4"  y2="134" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
        <line x1="10" y1="132" x2="8"  y2="142" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />

        {/* right arm — animated when waving */}
        {isWaving ? (
          <motion.g animate={rightArmWave} style={{ originX: "162px", originY: "115px" }}>
            <line x1="162" y1="115" x2="190" y2="100" stroke="#8B7EC8" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="190" y1="100" x2="198" y2="92"  stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
            <line x1="190" y1="100" x2="196" y2="102" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
            <line x1="190" y1="100" x2="192" y2="110" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
          </motion.g>
        ) : (
          <g>
            <line x1="162" y1="115" x2="190" y2="132" stroke="#8B7EC8" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="190" y1="132" x2="198" y2="124" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
            <line x1="190" y1="132" x2="196" y2="134" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
            <line x1="190" y1="132" x2="192" y2="142" stroke="#8B7EC8" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* left leg */}
        <line x1="82"  y1="178" x2="76"  y2="218" stroke="#8B7EC8" strokeWidth="5.5" strokeLinecap="round" />
        {/* left foot */}
        <line x1="76"  y1="218" x2="60"  y2="220" stroke="#8B7EC8" strokeWidth="5"   strokeLinecap="round" />

        {/* right leg */}
        <line x1="118" y1="178" x2="124" y2="218" stroke="#8B7EC8" strokeWidth="5.5" strokeLinecap="round" />
        {/* right foot */}
        <line x1="124" y1="218" x2="140" y2="220" stroke="#8B7EC8" strokeWidth="5"   strokeLinecap="round" />

        {/* body — large soft circle */}
        <circle cx="100" cy="100" r="78" fill="#C8B4E8" />

        {/* cheeks */}
        <circle cx="52"  cy="115" r="14" fill="#F4A0C0" opacity="0.75" />
        <circle cx="148" cy="115" r="14" fill="#F4A0C0" opacity="0.75" />

        {/* nose */}
        <circle cx="100" cy="92" r="12" fill="#F5E06A" />

        {/* eyes */}
        <circle cx="72"  cy="90" r="5.5" fill="#3A2D7A" />
        <circle cx="128" cy="90" r="5.5" fill="#3A2D7A" />

        {/* smile */}
        <path
          d="M 78 116 Q 100 132 122 116"
          fill="none"
          stroke="#3A2D7A"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
