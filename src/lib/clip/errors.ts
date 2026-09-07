import type { FailCode } from "./types";

export const FAIL_COPY: Record<FailCode, string> = {
  "unsupported-browser":
    "This browser can’t compress video on-device. Try Chrome or Edge on a computer.",
  "invalid-conversion":
    "Couldn’t decode this file. Export MP4 from the camera app.",
  drm: "This file is protected. Clip only works on regular MP4 / MOV / WebM.",
  "audio-only": "This looks like audio. Clip compresses video.",
  "empty-output": "Nothing was written. Try 720p.",
  timeout: "This is taking too long. Try 720p or a shorter clip.",
  oom: "The browser ran out of memory. Use a smaller file or a computer.",
  "assets-missing": "Engine assets missing (dev: postinstall).",
  "too-large":
    "This file is too large for this device. Try a shorter clip (under 80 MB on a computer, 40 MB on a phone). Clip never uploads — the limit is your browser’s memory.",
  cancelled: "Compression cancelled.",
};

export const GREW_WARNING =
  "Couldn’t get smaller. Try Chat or 720p. You can still download.";
