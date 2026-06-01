"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

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

const poseAnimations: Record<MascotPose, TargetAndTransition> = {
  waving: {
    y: [0, -8, 0],
    transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
  },
  sitting: {
    y: [0, -4, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
  lying: {
    x: [0, 3, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
  walking: {
    x: [0, 5, 0, -5, 0],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  peeking: {
    x: [0, 3, 0],
    transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
  },
  bouncing: {
    y: [0, -14, 0],
    transition: { repeat: Infinity, duration: 0.65, ease: "easeInOut" },
  },
  celebrating: {
    rotate: [-4, 4, -4],
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 0.75, ease: "easeInOut" },
  },
};

const wavingArm: TargetAndTransition = {
  rotate: [-20, 25, -20],
  transition: { repeat: Infinity, duration: 0.55, ease: "easeInOut" },
};

const celebratingArms: TargetAndTransition = {
  rotate: [-35, 35, -35],
  transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" },
};

export function Mascot({ pose = "waving", size = 100, className }: MascotProps) {
  const bodyAnim = poseAnimations[pose];

  return (
    <motion.div
      className={cn("relative inline-block select-none", className)}
      style={{ width: size, height: size }}
      animate={bodyAnim}
    >
      <svg
        viewBox="0 0 120 130"
        width={size}
        height={size * 1.08}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="60" cy="124" rx="22" ry="6" fill="rgba(0,0,0,0.10)" />

        {/* Body - chunky rounded shape */}
        <path
          d="M60 38 C38 38 28 52 28 68 C28 88 38 104 60 106 C82 104 92 88 92 68 C92 52 82 38 60 38 Z"
          fill="#F5E87A"
          stroke="#1a1a1a"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Head - large round */}
        <circle
          cx="60"
          cy="36"
          r="26"
          fill="#F5E87A"
          stroke="#1a1a1a"
          strokeWidth="4"
        />

        {/* Blush cheeks */}
        <ellipse cx="44" cy="42" rx="7" ry="5" fill="#F4A0A0" opacity="0.65" />
        <ellipse cx="76" cy="42" rx="7" ry="5" fill="#F4A0A0" opacity="0.65" />

        {/* Eyes */}
        <circle cx="53" cy="33" r="2.8" fill="#1a1a1a" />
        <circle cx="67" cy="33" r="2.8" fill="#1a1a1a" />

        {/* Smile */}
        <path
          d="M52 43 Q60 51 68 43"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Left arm */}
        {pose === "waving" ? (
          <motion.g animate={wavingArm} style={{ originX: "88px", originY: "65px" }}>
            <path
              d="M88 65 Q100 55 108 44 Q112 38 110 32"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="110" cy="31" r="5" fill="#F5E87A" stroke="#1a1a1a" strokeWidth="3.5" />
          </motion.g>
        ) : pose === "celebrating" ? (
          <motion.g animate={celebratingArms} style={{ originX: "88px", originY: "65px" }}>
            <path
              d="M88 65 Q100 50 108 36"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="109" cy="34" r="5" fill="#F5E87A" stroke="#1a1a1a" strokeWidth="3.5" />
          </motion.g>
        ) : (
          <g>
            <path
              d="M88 68 Q100 72 106 80"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="107" cy="82" r="5" fill="#F5E87A" stroke="#1a1a1a" strokeWidth="3.5" />
          </g>
        )}

        {/* Right arm */}
        {pose === "celebrating" ? (
          <motion.g animate={celebratingArms} style={{ originX: "32px", originY: "65px" }}>
            <path
              d="M32 65 Q20 50 12 36"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="11" cy="34" r="5" fill="#F5E87A" stroke="#1a1a1a" strokeWidth="3.5" />
          </motion.g>
        ) : (
          <g>
            <path
              d="M32 68 Q20 72 14 80"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="13" cy="82" r="5" fill="#F5E87A" stroke="#1a1a1a" strokeWidth="3.5" />
          </g>
        )}

        {/* Legs */}
        <path
          d="M48 104 Q44 114 40 120"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="39" cy="121" r="5" fill="#F5E87A" stroke="#1a1a1a" strokeWidth="3.5" />

        <path
          d="M72 104 Q76 114 80 120"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="81" cy="121" r="5" fill="#F5E87A" stroke="#1a1a1a" strokeWidth="3.5" />
      </svg>
    </motion.div>
  );
}
