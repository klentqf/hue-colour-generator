"use client";

import { PaletteColour } from "@/lib/types";

interface PalettePreviewProps {
  colours: PaletteColour[];
  useCase: string;
}

function getColourByRole(colours: PaletteColour[], role: string, fallback = "#f5f5f5") {
  return colours.find((c) => c.role === role)?.hex || colours[0]?.hex || fallback;
}

function WebsitePreview({ colours }: { colours: PaletteColour[] }) {
  const bg = getColourByRole(colours, "background");
  const primary = getColourByRole(colours, "primary");
  const secondary = getColourByRole(colours, "secondary");
  const accent = getColourByRole(colours, "accent");
  const text = getColourByRole(colours, "text", "#1a1a1a");
  const surface = getColourByRole(colours, "surface", "#ffffff");

  return (
    <div
      className="rounded-xl overflow-hidden border border-white/60 shadow-sm"
      style={{ backgroundColor: bg, fontFamily: "inherit" }}
    >
      {/* Nav */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ backgroundColor: surface, borderColor: `${text}15` }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primary }} />
          <span className="text-xs font-medium lowercase" style={{ color: text }}>
            brand
          </span>
        </div>
        <div className="flex gap-3">
          {["home", "about", "work"].map((item) => (
            <span key={item} className="text-xs lowercase opacity-60" style={{ color: text }}>
              {item}
            </span>
          ))}
          <div
            className="text-xs px-2.5 py-0.5 rounded-full lowercase"
            style={{ backgroundColor: primary, color: "#fff" }}
          >
            contact
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-5 py-6">
        <div className="h-2 rounded-full w-1/3 mb-2" style={{ backgroundColor: accent }} />
        <div className="h-4 rounded-full w-4/5 mb-1.5" style={{ backgroundColor: `${text}90` }} />
        <div className="h-4 rounded-full w-2/3 mb-4" style={{ backgroundColor: `${text}60` }} />
        <div className="flex gap-2">
          <div
            className="h-7 px-3 rounded-full flex items-center text-xs lowercase text-white"
            style={{ backgroundColor: primary }}
          >
            get started
          </div>
          <div
            className="h-7 px-3 rounded-full flex items-center text-xs lowercase border"
            style={{ color: primary, borderColor: primary }}
          >
            learn more
          </div>
        </div>
      </div>

      {/* Cards row */}
      <div className="px-5 pb-5 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg p-2.5 border"
            style={{ backgroundColor: surface, borderColor: `${text}10` }}
          >
            <div
              className="h-8 rounded-md mb-2"
              style={{ backgroundColor: i === 1 ? secondary : accent, opacity: 0.7 + i * 0.1 }}
            />
            <div className="h-1.5 rounded-full w-4/5 mb-1" style={{ backgroundColor: `${text}50` }} />
            <div className="h-1.5 rounded-full w-1/2" style={{ backgroundColor: `${text}30` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandPreview({ colours }: { colours: PaletteColour[] }) {
  const primary = getColourByRole(colours, "primary");
  const secondary = getColourByRole(colours, "secondary");
  const bg = getColourByRole(colours, "background");
  const text = getColourByRole(colours, "text", "#1a1a1a");
  const accent = getColourByRole(colours, "accent");

  return (
    <div
      className="rounded-xl overflow-hidden border border-white/60 shadow-sm p-5 grid grid-cols-2 gap-3"
      style={{ backgroundColor: bg }}
    >
      {/* Logo area */}
      <div
        className="rounded-xl p-4 flex flex-col items-center justify-center gap-2 col-span-2"
        style={{ backgroundColor: primary }}
      >
        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-white/60" />
        </div>
        <div className="h-2.5 w-20 rounded-full bg-white/70" />
        <div className="h-1.5 w-14 rounded-full bg-white/40" />
      </div>

      {/* Business card */}
      <div className="rounded-xl p-3" style={{ backgroundColor: secondary }}>
        <div className="h-2 w-2/3 rounded-full mb-1.5" style={{ backgroundColor: `${text}80` }} />
        <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: `${text}50` }} />
      </div>

      {/* Accent block */}
      <div className="rounded-xl p-3" style={{ backgroundColor: accent }}>
        <div className="h-2 w-3/4 rounded-full mb-1.5" style={{ backgroundColor: "white" }} />
        <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.6)" }} />
      </div>
    </div>
  );
}

function SocialPreview({ colours }: { colours: PaletteColour[] }) {
  const bg = getColourByRole(colours, "background");
  const primary = getColourByRole(colours, "primary");
  const text = getColourByRole(colours, "text", "#1a1a1a");
  const accent = getColourByRole(colours, "accent");

  return (
    <div
      className="rounded-xl overflow-hidden border border-white/60 shadow-sm aspect-square max-w-[200px] mx-auto p-5 flex flex-col items-center justify-center gap-3"
      style={{ backgroundColor: bg }}
    >
      <div className="w-16 h-16 rounded-2xl" style={{ backgroundColor: primary }} />
      <div className="text-center">
        <div className="h-2.5 w-24 rounded-full mx-auto mb-1.5" style={{ backgroundColor: `${text}80` }} />
        <div className="h-2 w-16 rounded-full mx-auto" style={{ backgroundColor: `${text}50` }} />
      </div>
      <div
        className="h-6 px-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: accent }}
      >
        <div className="h-1.5 w-10 rounded-full bg-white/80" />
      </div>
    </div>
  );
}

function PresentationPreview({ colours }: { colours: PaletteColour[] }) {
  const bg = getColourByRole(colours, "background");
  const primary = getColourByRole(colours, "primary");
  const text = getColourByRole(colours, "text", "#1a1a1a");
  const accent = getColourByRole(colours, "accent");
  const secondary = getColourByRole(colours, "secondary");

  return (
    <div
      className="rounded-xl overflow-hidden border border-white/60 shadow-sm"
      style={{ backgroundColor: bg, aspectRatio: "16/9" }}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: primary }} />
      <div className="p-4">
        <div className="h-3 w-1/2 rounded-full mb-1.5" style={{ backgroundColor: `${text}90` }} />
        <div className="h-2 w-1/3 rounded-full mb-4" style={{ backgroundColor: `${text}50` }} />
        <div className="grid grid-cols-3 gap-2">
          {[primary, secondary, accent].map((c, i) => (
            <div key={i} className="rounded-lg p-2.5" style={{ backgroundColor: c }}>
              <div className="h-4 w-4 rounded mb-1.5 bg-white/40" />
              <div className="h-1.5 rounded-full bg-white/60 mb-1 w-4/5" />
              <div className="h-1.5 rounded-full bg-white/40 w-3/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppPreview({ colours }: { colours: PaletteColour[] }) {
  const bg = getColourByRole(colours, "background");
  const primary = getColourByRole(colours, "primary");
  const text = getColourByRole(colours, "text", "#1a1a1a");
  const accent = getColourByRole(colours, "accent");
  const surface = getColourByRole(colours, "surface", "#fff");

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/60 shadow-sm max-w-[180px] mx-auto"
      style={{ backgroundColor: bg }}
    >
      {/* Status bar */}
      <div className="h-5 px-3 flex justify-between items-center" style={{ backgroundColor: surface }}>
        <div className="text-[8px]" style={{ color: `${text}80` }}>9:41</div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: `${text}60` }} />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="px-3 py-2" style={{ backgroundColor: surface }}>
        <div className="h-2.5 w-2/3 rounded-full" style={{ backgroundColor: `${text}80` }} />
      </div>

      {/* Cards */}
      <div className="p-2.5 flex flex-col gap-2">
        <div className="rounded-xl p-2.5" style={{ backgroundColor: primary }}>
          <div className="h-2 w-3/4 rounded-full mb-1.5 bg-white/70" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/40" />
        </div>
        <div className="rounded-xl p-2.5" style={{ backgroundColor: surface }}>
          <div className="h-2 w-3/4 rounded-full mb-1.5" style={{ backgroundColor: `${text}60` }} />
          <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: `${text}30` }} />
        </div>
      </div>

      {/* Nav bar */}
      <div
        className="px-2 py-1.5 flex justify-around border-t"
        style={{ backgroundColor: surface, borderColor: `${text}10` }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: i === 0 ? accent : "transparent" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: i === 0 ? "white" : `${text}40` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const previewMap: Record<string, (colours: PaletteColour[]) => JSX.Element> = {
  "website design": (c) => <WebsitePreview colours={c} />,
  "branding": (c) => <BrandPreview colours={c} />,
  "logo design": (c) => <BrandPreview colours={c} />,
  "social media post": (c) => <SocialPreview colours={c} />,
  "presentation slides": (c) => <PresentationPreview colours={c} />,
  "mobile app ui": (c) => <AppPreview colours={c} />,
  "personal project": (c) => <WebsitePreview colours={c} />,
};

export function PalettePreview({ colours, useCase }: PalettePreviewProps) {
  const render = previewMap[useCase.toLowerCase()] || ((c) => <WebsitePreview colours={c} />);
  return (
    <div className="rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/60 p-4">
      <p className="text-xs text-stone-400 lowercase mb-3">{useCase} preview</p>
      {render(colours)}
    </div>
  );
}
