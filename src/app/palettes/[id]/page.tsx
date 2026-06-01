"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ColourSwatch } from "@/components/colour-swatch";
import { PalettePreview } from "@/components/palette-preview";
import { ExportPanel } from "@/components/export-panel";
import { ScoreCard } from "@/components/score-card";
import { Mascot } from "@/components/mascot";
import { SavedPalette, PaletteColour, PaletteScores, PaletteExport } from "@/lib/types";

function buildExportData(colours: PaletteColour[]): PaletteExport {
  const hexCodes = colours.map((c) => c.hex).join("\n");
  const cssVariables = `:root {\n${colours.map((c) => `  --${c.role}: ${c.hex};`).join("\n")}\n}`;
  const tailwindConfig = `colors: {\n${colours.map((c) => `  ${c.role}: "${c.hex}",`).join("\n")}\n}`;
  const jsonObj = Object.fromEntries(colours.map((c) => [c.role, c.hex]));
  const figmaTokens = Object.fromEntries(
    colours.map((c) => [`color.${c.role}`, { value: c.hex }])
  );
  return {
    hexCodes,
    cssVariables,
    tailwindConfig,
    json: JSON.stringify(jsonObj, null, 2),
    figmaTokens: JSON.stringify(figmaTokens, null, 2),
  };
}

export default function PalettePage() {
  const { id } = useParams<{ id: string }>();
  const [palette, setPalette] = useState<SavedPalette | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    fetch(`/api/palettes/${id}`)
      .then((r) => r.json())
      .then(setPalette)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-stone-300"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            />
          ))}
        </div>
      </main>
    );
  }

  if (!palette) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-stone-400 lowercase text-sm">palette not found.</p>
        <Link href="/palettes">
          <button className="btn-ghost">back to palettes</button>
        </Link>
      </main>
    );
  }

  const colours: PaletteColour[] = Array.isArray(palette.colours) ? palette.colours : [];
  const scores = palette.scores as PaletteScores | undefined;
  const exportData = buildExportData(colours);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/palettes" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors text-xs lowercase">
          <ArrowLeft size={14} />
          back to palettes
        </Link>
        <Link href="/create">
          <button className="btn-primary flex items-center gap-1.5 py-1.5 px-3 text-xs">
            <Sparkles size={12} />
            new palette
          </button>
        </Link>
      </nav>

      <div className="flex-1 px-6 md:px-12 py-4 max-w-5xl mx-auto w-full space-y-6 pb-12">
        {/* Header */}
        <motion.div
          className="flex items-end gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Mascot pose="sitting" size={70} />
          <div>
            <h1 className="text-2xl font-light text-stone-700 lowercase">{palette.name}</h1>
            <p className="text-xs text-stone-400 lowercase mt-0.5">
              {palette.vibe} · {palette.tone} · {palette.useCase}
            </p>
          </div>
        </motion.div>

        {/* Swatches */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {colours.map((colour) => (
            <ColourSwatch key={colour.hex} colour={colour} showLock={false} size="lg" />
          ))}
        </motion.div>

        {/* Explanation */}
        {palette.explanation && (
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-xs font-medium text-stone-500 lowercase mb-2">about this palette</p>
            <p className="text-sm text-stone-500 lowercase leading-relaxed">{palette.explanation}</p>
          </motion.div>
        )}

        {/* Preview + Scores */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PalettePreview colours={colours} useCase={palette.useCase} />
          </motion.div>
          {scores && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-3"
            >
              <ScoreCard scores={scores} />
              {palette.accessibilityNotes && (
                <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 p-4">
                  <p className="text-xs font-medium text-stone-500 lowercase mb-1.5">accessibility notes</p>
                  <p className="text-xs text-stone-500 lowercase leading-relaxed">{palette.accessibilityNotes}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Export */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setShowExport(!showExport)}
            className="text-xs text-stone-500 hover:text-stone-700 transition-colors lowercase mb-3"
          >
            {showExport ? "hide" : "show"} export options
          </button>
          {showExport && <ExportPanel exportData={exportData} />}
        </motion.div>
      </div>
    </main>
  );
}
