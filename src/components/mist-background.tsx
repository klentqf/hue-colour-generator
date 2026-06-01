"use client";

import { motion } from "framer-motion";

export function MistBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0 bg-[#FEF9F4]" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Colour blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(247,217,217,0.55) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(212,228,240,0.5) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-5%] left-[20%] w-[40vw] h-[40vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(228,216,240,0.45) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[50%] left-[40%] w-[35vw] h-[35vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(245,237,202,0.45) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(200,216,192,0.4) 0%, transparent 70%)",
          filter: "blur(65px)",
        }}
        animate={{ x: [0, 18, 0], y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
      />
    </div>
  );
}
