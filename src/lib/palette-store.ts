"use client";

import { GeneratedPalette, GenerateRequest } from "./types";

const STORAGE_KEY = "palette_wizard_state";

export interface WizardState {
  selectedColours: string[];
  paletteSize: number;
  tone: string;
  vibe: string;
  useCase: string;
  customPrompt: string;
  generatedPalette: GeneratedPalette | null;
}

const defaultState: WizardState = {
  selectedColours: [],
  paletteSize: 5,
  tone: "soft",
  vibe: "soft pastel",
  useCase: "website design",
  customPrompt: "",
  generatedPalette: null,
};

export function getWizardState(): WizardState {
  if (typeof window === "undefined") return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    return defaultState;
  }
}

export function setWizardState(state: Partial<WizardState>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getWizardState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...state }));
  } catch {
    // ignore
  }
}

export function clearWizardState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function buildGenerateRequest(
  state: WizardState,
  feedback?: string
): GenerateRequest {
  const lockedColours = state.generatedPalette?.colours.filter((c) => c.locked);
  return {
    selectedColours: state.selectedColours,
    paletteSize: state.paletteSize,
    tone: state.tone,
    vibe: state.vibe,
    useCase: state.useCase,
    customPrompt: state.customPrompt || undefined,
    lockedColours: lockedColours?.length ? lockedColours : undefined,
    currentPalette: state.generatedPalette?.colours,
    feedback,
  };
}
