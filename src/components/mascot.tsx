"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

// pip — a soft squishy blob with chunky integrated arms and legs

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

// One continuous blob path. Right arm raised (waving), left arm slightly out.
// Arms and legs are chunky extensions of the same body — no stick limbs.
const BLOB_PATH =
  "M 68 14 " +
  "C 84 8 106 14 116 28 " +       // top-right body curve
  "C 124 38 132 26 140 16 " +     // into right raised arm
  "C 146 8 146 -2 136 2 " +       // arm tip
  "C 126 6 122 18 116 28 " +      // arm back into shoulder (reused point)
  "C 112 36 116 52 120 66 " +     // right shoulder/body
  "C 124 80 122 96 114 108 " +    // right body
  "C 110 118 112 132 106 144 " +  // right leg outer
  "C 102 152 90 156 80 150 " +    // right foot
  "C 72 144 70 132 72 122 " +     // right leg inner / crotch
  "C 74 114 70 108 66 108 " +     // bottom centre
  "C 62 108 58 114 60 122 " +     // left crotch
  "C 62 132 58 144 50 150 " +     // left foot
  "C 40 156 28 152 26 144 " +     // left foot outer
  "C 20 132 24 118 20 108 " +     // left leg outer
  "C 12 96 10 80 14 66 " +        // left body
  "C 18 52 16 38 10 28 " +        // left shoulder
  "C 4 18 -2 8 6 4 " +            // left arm tip
  "C 14 0 24 10 28 22 " +         // left arm back
  "C 32 30 34 24 40 16 " +        // left shoulder into body
  "C 50 6 60 16 68 14 Z";         // back to top

const bodyAnimations: Record<MascotPose, TargetAndTransition> = {
  waving:      { y: [0, -8, 0],         transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
  sitting:     { y: [0, -4, 0],         transition: { repeat: Infinity, duration: 3.0, ease: "easeInOut" } },
  lying:       { rotate: [0, 3, 0],     transition: { repeat: Infinity, duration: 4.0, ease: "easeInOut" } },
  walking:     { x: [0, 5, 0, -5, 0],  transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } },
  peeking:     { x: [0, 4, 0],         transition: { repeat: Infinity, duration: 2.0, ease: "easeInOut" } },
  bouncing:    {
    y: [0, -18, 0],
    scaleX: [1, 1.1, 1],
    scaleY: [1, 0.9, 1],
    transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
  },
  celebrating: {
    rotate: [-6, 6, -6],
    y: [0, -12, 0],
    transition: { repeat: Infinity, duration: 0.65, ease: "easeInOut" },
  },
};

// Little wiggle animation for the raised arm tip
const armWiggle: TargetAndTransition = {
  rotate: [-12, 18, -12],
  transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
};

export function Mascot({ pose = "waving", size = 100, className }: MascotProps) {
  // scale the fixed viewBox to requested size
  const vbWidth = 150;
  const vbHeight = 165;

  return (
    <motion.div
      className={cn("relative inline-block select-none", className)}
      style={{ width: size, height: size * (vbHeight / vbWidth) }}
      animate={bodyAnimations[pose]}
    >
      <svg
        viewBox="-5 -8 155 172"
        width={size}
        height={size * (vbHeight / vbWidth)}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* soft drop shadow */}
        <ellipse cx="67" cy="158" rx="36" ry="8" fill="rgba(0,0,0,0.09)" />

        {/* main blob — one continuous path */}
        <path
          d={BLOB_PATH}
          fill="#F5E86A"
          stroke="#1C1C1C"
          strokeWidth="4.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* subtle inner highlight to give the gummy/squishy feel */}
        <path
          d="M 62 24 C 74 18 90 24 98 36 C 84 22 68 24 62 24 Z"
          fill="rgba(255,255,255,0.35)"
          stroke="none"
        />

        {/* eyes — slightly asymmetric for personality */}
        <circle cx="52" cy="58" r="4" fill="#1C1C1C" />
        <circle cx="78" cy="55" r="4" fill="#1C1C1C" />
        {/* eye shine */}
        <circle cx="54" cy="56" r="1.4" fill="white" />
        <circle cx="80" cy="53" r="1.4" fill="white" />

        {/* smile */}
        <path
          d="M 50 72 Q 65 84 80 72"
          fill="none"
          stroke="#1C1C1C"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* little wave wiggle at the tip of the raised right arm */}
        {(pose === "waving" || pose === "celebrating") && (
          <motion.g
            animate={armWiggle}
            style={{ originX: "136px", originY: "2px" }}
          >
            {/* tiny motion lines suggesting movement */}
            <line x1="148" y1="-4" x2="154" y2="-8" stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            <line x1="152" y1="2" x2="160" y2="0" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
