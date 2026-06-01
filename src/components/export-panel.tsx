"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { PaletteExport } from "@/lib/types";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";

interface ExportPanelProps {
  exportData: PaletteExport;
}

type Tab = "hex" | "css" | "tailwind" | "json" | "figma";

const tabs: { id: Tab; label: string }[] = [
  { id: "hex", label: "hex codes" },
  { id: "css", label: "css variables" },
  { id: "tailwind", label: "tailwind" },
  { id: "json", label: "json" },
  { id: "figma", label: "figma tokens" },
];

export function ExportPanel({ exportData }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("hex");
  const [copied, setCopied] = useState(false);

  const content: Record<Tab, string> = {
    hex: exportData.hexCodes,
    css: exportData.cssVariables,
    tailwind: exportData.tailwindConfig,
    json: exportData.json,
    figma: exportData.figmaTokens,
  };

  const handleCopy = async () => {
    await copyToClipboard(content[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 overflow-hidden">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-white/60 bg-white/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2.5 text-xs lowercase whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "text-stone-700 border-b-2 border-stone-400 -mb-[1px] font-medium"
                : "text-stone-400 hover:text-stone-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 relative">
        <pre className="text-xs text-stone-600 font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
          {content[activeTab]}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-white/60 backdrop-blur-sm rounded-lg p-1.5 hover:bg-white/80 transition-colors text-stone-500 hover:text-stone-700"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}
