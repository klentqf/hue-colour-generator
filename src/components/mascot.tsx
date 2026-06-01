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

const poses: Record<MascotPose, { body: string; arm1: string; arm2: string; extra?: string }> = {
  waving: {
    body: "M50 30 Q35 28 28 42 Q20 58 28 72 Q36 86 50 88 Q64 86 72 72 Q80 58 72 42 Q65 28 50 30Z",
    arm1: "M70 50 Q80 38 88 30 Q92 26 90 22",
    arm2: "M30 52 Q22 60 18 70",
  },
  sitting: {
    body: "M50 28 Q34 26 28 40 Q22 56 28 70 Q36 84 50 86 Q64 84 72 70 Q78 56 72 40 Q66 26 50 28Z",
    arm1: "M68 55 Q76 62 80 72",
    arm2: "M32 55 Q24 62 20 72",
  },
  lying: {
    body: "M30 55 Q28 42 42 38 Q56 34 68 40 Q78 46 78 58 Q78 70 66 74 Q52 78 40 72 Q28 66 30 55Z",
    arm1: "M70 50 Q78 44 82 38",
    arm2: "M32 58 Q24 62 18 62",
  },
  walking: {
    body: "M50 28 Q34 26 28 40 Q22 56 28 70 Q36 84 50 86 Q64 84 72 70 Q78 56 72 40 Q66 26 50 28Z",
    arm1: "M70 50 Q80 44 82 36",
    arm2: "M30 52 Q20 56 18 64",
  },
  peeking: {
    body: "M50 40 Q36 38 30 50 Q24 62 30 72 Q38 82 50 84 Q62 82 70 72 Q76 62 70 50 Q64 38 50 40Z",
    arm1: "M68 58 Q76 52 80 44",
    arm2: "M32 60 Q24 54 20 48",
  },
  bouncing: {
    body: "M50 26 Q33 24 26 38 Q20 54 26 68 Q34 82 50 84 Q66 82 74 68 Q80 54 74 38 Q67 24 50 26Z",
    arm1: "M72 46 Q82 36 86 26",
    arm2: "M28 48 Q18 38 14 28",
  },
  celebrating: {
    body: "M50 30 Q34 28 28 42 Q22 58 28 72 Q36 86 50 88 Q64 86 72 72 Q78 58 72 42 Q65 28 50 30Z",
    arm1: "M70 46 Q80 32 82 18",
    arm2: "M30 48 Q18 34 16 20",
  },
};

const poseAnimations: Record<MascotPose, TargetAndTransition> = {
  waving: {
    y: [0, -6, 0],
    transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
  },
  sitting: {
    y: [0, -3, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
  lying: {
    x: [0, 3, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
  walking: {
    x: [0, 4, 0, -4, 0],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  peeking: {
    x: [0, 2, 0],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  bouncing: {
    y: [0, -12, 0],
    transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" },
  },
  celebrating: {
    rotate: [-3, 3, -3],
    y: [0, -8, 0],
    transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
  },
};

const armAnimations: Record<MascotPose, TargetAndTransition> = {
  waving: {
    rotate: [-15, 20, -15],
    transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
  },
  sitting: {},
  lying: {},
  walking: {
    rotate: [-10, 10, -10],
    transition: { repeat: Infinity, duration: 1, ease: "easeInOut" },
  },
  peeking: {},
  bouncing: {
    rotate: [-20, 20, -20],
    transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" },
  },
  celebrating: {
    rotate: [-30, 30, -30],
    transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" },
  },
};

export function Mascot({ pose = "waving", size = 100, className }: MascotProps) {
  const currentPose = poses[pose];
  const bodyAnim = poseAnimations[pose];
  const armAnim = armAnimations[pose];

  return (
    <motion.div
      className={cn("relative inline-block select-none", className)}
      style={{ width: size, height: size }}
      animate={bodyAnim}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="50" cy="94" rx="18" ry="5" fill="rgba(0,0,0,0.12)" />

        {/* Body */}
        <path
          d={currentPose.body}
          fill="#F5E87A"
          stroke="#1a1a1a"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Blush cheeks */}
        <ellipse cx="37" cy="58" rx="6" ry="4" fill="#F4A0A0" opacity="0.7" />
        <ellipse cx="63" cy="58" rx="6" ry="4" fill="#F4A0A0" opacity="0.7" />

        {/* Eyes */}
        <circle cx="42" cy="50" r="2.5" fill="#1a1a1a" />
        <circle cx="58" cy="50" r="2.5" fill="#1a1a1a" />

        {/* Smile */}
        <path
          d="M43 61 Q50 68 57 61"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Arms */}
        <motion.g
          style={{ originX: "70px", originY: "50px" }}
          animate={pose === "waving" ? armAnim : {}}
        >
          <path
            d={currentPose.arm1}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
        <motion.g
          animate={pose === "celebrating" ? armAnim : {}}
          style={{ originX: "30px", originY: "52px" }}
        >
          <path
            d={currentPose.arm2}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
