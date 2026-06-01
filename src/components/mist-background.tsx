"use client";

import { motion } from "framer-motion";

export function MistBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Warm cream base */}
      <div className="absolute inset-0 bg-[#FDF6F0]" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Large pink bloom — top left */}
      <motion.div
        className="absolute"
        style={{
          top: "-15%", left: "-10%",
          width: "65vw", height: "65vw",
          background: "radial-gradient(ellipse, rgba(248,196,196,0.75) 0%, rgba(248,196,196,0.3) 40%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{ x: [0, 35, 0], y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      />

      {/* Powder blue — top right */}
      <motion.div
        className="absolute"
        style={{
          top: "-5%", right: "-15%",
          width: "55vw", height: "55vw",
          background: "radial-gradient(ellipse, rgba(190,218,240,0.65) 0%, rgba(190,218,240,0.25) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 35, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />

      {/* Lavender — centre */}
      <motion.div
        className="absolute"
        style={{
          top: "30%", left: "25%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(ellipse, rgba(220,200,240,0.55) 0%, rgba(220,200,240,0.2) 50%, transparent 70%)",
          filter: "blur(65px)",
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      {/* Butter yellow — bottom left */}
      <motion.div
        className="absolute"
        style={{
          bottom: "0%", left: "5%",
          width: "45vw", height: "45vw",
          background: "radial-gradient(ellipse, rgba(248,232,170,0.6) 0%, rgba(248,232,170,0.2) 50%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{ x: [0, 25, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />

      {/* Sage green — bottom right */}
      <motion.div
        className="absolute"
        style={{
          bottom: "-10%", right: "0%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(ellipse, rgba(185,210,180,0.55) 0%, rgba(185,210,180,0.2) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -20, 0], y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
      />

      {/* Peach accent — mid right */}
      <motion.div
        className="absolute"
        style={{
          top: "45%", right: "5%",
          width: "35vw", height: "35vw",
          background: "radial-gradient(ellipse, rgba(245,185,160,0.5) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* Soft white veil on top for mist effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 80%)",
        }}
      />
    </div>
  );
}
