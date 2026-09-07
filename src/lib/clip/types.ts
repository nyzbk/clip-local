export type QualityLevel = "very-low" | "low" | "medium" | "high" | "very-high";

export type PresetId = "chat" | "email" | "720" | "1080" | "custom";

export type EngineKind = "webcodecs" | "ffmpeg";

export type ProbeInfo = {
  name: string;
  sizeBytes: number;
  duration: number;
  width: number;
  height: number;
  hasVideo: boolean;
  hasAudio: boolean;
};

export type CompressPreset = {
  id: PresetId;
  label: string;
  maxLong: number;
  q: QualityLevel;
  aq: QualityLevel;
};

export type CompressRequest = {
  file: File;
  preset: CompressPreset;
  jobId: number;
  onProgress: (p: number) => void;
  signal: AbortSignal;
};

export type CompressResult = {
  blob: Blob;
  engine: EngineKind;
  inputBytes: number;
  outputBytes: number;
  savedRatio: number;
  grew: boolean;
  width: number;
  height: number;
};

export type FailCode =
  | "unsupported-browser"
  | "invalid-conversion"
  | "drm"
  | "audio-only"
  | "empty-output"
  | "timeout"
  | "oom"
  | "assets-missing"
  | "too-large"
  | "cancelled";

export class ClipError extends Error {
  code: FailCode;
  constructor(code: FailCode, message: string) {
    super(message);
    this.name = "ClipError";
    this.code = code;
  }
}
