"use client";

import { motion } from "framer-motion";
import { Mascot } from "./mascot";

const messages = [
  "mixing your colours...",
  "blending soft hues...",
  "dreaming up your palette...",
  "finding the perfect tones...",
  "crafting something beautiful...",
];

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FEF9F4]/80 backdrop-blur-sm">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { color: "rgba(247,217,217,0.7)", x: "20%", y: "30%", size: "300px" },
          { color: "rgba(212,228,240,0.6)", x: "65%", y: "20%", size: "250px" },
          { color: "rgba(228,216,240,0.6)", x: "40%", y: "60%", size: "280px" },
          { color: "rgba(245,237,202,0.5)", x: "70%", y: "65%", size: "220px" },
        ].map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(ellipse, ${blob.color} 0%, transparent 70%)`,
              filter: "blur(40px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <Mascot pose="bouncing" size={90} />

        <motion.div
          className="bg-white/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/80"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <motion.p
            className="text-stone-500 text-sm lowercase"
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            mixing your colours...
          </motion.p>
        </motion.div>

        {/* Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-stone-300"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
