import type { ProbeInfo } from "./types";

const PROBE_TIMEOUT_MS = 8_000;

export function probeFile(file: File): Promise<ProbeInfo> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    let settled = false;

    const finish = (info: ProbeInfo) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      URL.revokeObjectURL(url);
      video.removeAttribute("src");
      video.load();
      resolve(info);
    };

    const timer = window.setTimeout(() => {
      finish({
        name: file.name,
        sizeBytes: file.size,
        duration: 0,
        width: 0,
        height: 0,
        hasVideo: true,
        hasAudio: true,
      });
    }, PROBE_TIMEOUT_MS);

    video.onloadedmetadata = () => {
      const width = video.videoWidth || 0;
      const height = video.videoHeight || 0;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      finish({
        name: file.name,
        sizeBytes: file.size,
        duration,
        width,
        height,
        hasVideo: width > 0 && height > 0,
        hasAudio: true,
      });
    };

    video.onerror = () => {
      finish({
        name: file.name,
        sizeBytes: file.size,
        duration: 0,
        width: 0,
        height: 0,
        hasVideo: true,
        hasAudio: true,
      });
    };

    video.src = url;
  });
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatDuration(s: number) {
  if (!s || !Number.isFinite(s)) return "—";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
