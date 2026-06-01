export interface PaletteColour {
  name: string;
  hex: string;
  role: string;
  description: string;
  locked: boolean;
}

export interface PaletteScores {
  visualHarmony: number;
  contrast: number;
  accessibility: number;
  useCaseFit: number;
  brandPersonality: number;
}

export interface PaletteExport {
  hexCodes: string;
  cssVariables: string;
  tailwindConfig: string;
  json: string;
  figmaTokens: string;
}

export interface GeneratedPalette {
  paletteName: string;
  colours: PaletteColour[];
  explanation: string;
  scores: PaletteScores;
  accessibilityNotes: string;
  export: PaletteExport;
}

export interface GenerateRequest {
  selectedColours: string[];
  paletteSize: number;
  tone: string;
  vibe: string;
  useCase: string;
  customPrompt?: string;
  lockedColours?: PaletteColour[];
  currentPalette?: PaletteColour[];
  feedback?: string;
}

export interface SavedPalette {
  id: string;
  name: string;
  useCase: string;
  vibe: string;
  tone: string;
  colours: PaletteColour[];
  scores?: PaletteScores;
  explanation?: string;
  accessibilityNotes?: string;
  createdAt: string;
  updatedAt: string;
}
