import type { CompressPreset, PresetId, QualityLevel } from "./types";

export const PRESETS: Record<Exclude<PresetId, "custom">, CompressPreset> = {
  chat: {
    id: "chat",
    label: "Chat / WhatsApp",
    maxLong: 640,
    q: "low",
    aq: "low",
  },
  email: {
    id: "email",
    label: "Email (smaller)",
    maxLong: 720,
    q: "medium",
    aq: "medium",
  },
  "720": {
    id: "720",
    label: "720p",
    maxLong: 1280,
    q: "medium",
    aq: "medium",
  },
  "1080": {
    id: "1080",
    label: "1080p",
    maxLong: 1920,
    q: "high",
    aq: "medium",
  },
};

export const CRF: Record<QualityLevel, number> = {
  "very-low": 32,
  low: 30,
  medium: 26,
  high: 23,
  "very-high": 20,
};

export const DESKTOP_MAX_BYTES = 80 * 1024 * 1024;
export const MOBILE_MAX_BYTES = 40 * 1024 * 1024;
export const DESKTOP_DURATION_WARN = 5 * 60;
export const DESKTOP_DURATION_HARD = 8 * 60;
export const MOBILE_DURATION_WARN = 2 * 60;

export function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function inputCapBytes() {
  return isMobileDevice() ? MOBILE_MAX_BYTES : DESKTOP_MAX_BYTES;
}

export function even(n: number) {
  const v = Math.max(2, Math.round(n));
  return v % 2 === 0 ? v : v - 1;
}

export function containSize(
  srcW: number,
  srcH: number,
  maxLong: number,
): { w: number; h: number } {
  if (!srcW || !srcH) return { w: even(maxLong), h: even((maxLong * 9) / 16) };
  const long = Math.max(srcW, srcH);
  const cap = Math.min(long, maxLong);
  const scale = cap / long;
  return { w: even(srcW * scale), h: even(srcH * scale) };
}

export function customPreset(maxLong: number, q: QualityLevel): CompressPreset {
  return {
    id: "custom",
    label: "Custom",
    maxLong,
    q,
    aq: "medium",
  };
}

export const ACCEPT =
  "video/mp4,video/quicktime,video/webm,video/x-matroska,video/x-m4v,.mp4,.mov,.webm,.mkv,.m4v";
