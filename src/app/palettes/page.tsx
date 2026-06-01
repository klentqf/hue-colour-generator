"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SpeechBubble } from "@/components/speech-bubble";
import { SavedPalette } from "@/lib/types";

export default function PalettesPage() {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/palettes")
      .then((r) => r.json())
      .then((data) => {
        setPalettes(Array.isArray(data) ? data : []);
      })
      .catch(() => setPalettes([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/palettes/${id}`, { method: "DELETE" });
    setPalettes((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors text-xs lowercase">
          <ArrowLeft size={14} />
          home
        </Link>
        <Link href="/create">
          <button className="btn-primary flex items-center gap-1.5 py-1.5 px-3 text-xs">
            <Sparkles size={12} />
            new palette
          </button>
        </Link>
      </nav>

      <div className="flex-1 px-6 md:px-12 py-6 max-w-4xl mx-auto w-full">
        {/* Mascot */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <SpeechBubble
            text="here are all the palettes you've saved. pick one to revisit!"
            className="mb-3"
          />
          <Mascot pose="waving" size={80} />
        </motion.div>

        <h1 className="text-2xl font-light text-stone-700 lowercase mb-6">saved palettes</h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-stone-300"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ) : palettes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-400 lowercase text-sm mb-6">
              no saved palettes yet. create your first one!
            </p>
            <Link href="/create">
              <button className="btn-primary">create palette</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {palettes.map((palette, i) => {
              const colours = Array.isArray(palette.colours) ? palette.colours : [];
              return (
                <motion.div
                  key={palette.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card overflow-hidden group"
                >
                  {/* Colour strip */}
                  <div className="flex h-16">
                    {colours.map((c: { hex: string }, j: number) => (
                      <div key={j} className="flex-1" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-sm font-medium text-stone-700 lowercase mb-0.5">
                      {palette.name}
                    </p>
                    <p className="text-xs text-stone-400 lowercase mb-3">
                      {palette.vibe} · {palette.useCase}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link href={`/palettes/${palette.id}`}>
                        <button className="text-xs text-stone-500 hover:text-stone-700 transition-colors lowercase flex items-center gap-1">
                          view
                          <ArrowRight size={10} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(palette.id)}
                        className="text-stone-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
