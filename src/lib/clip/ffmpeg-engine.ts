import type { FFmpeg } from "@ffmpeg/ffmpeg";
import type { CompressRequest } from "./types";
import { ClipError } from "./types";
import { CRF } from "./presets";

let instance: FFmpeg | null = null;
let loading: Promise<FFmpeg> | null = null;

async function loadFfmpeg(): Promise<FFmpeg> {
  if (instance?.loaded) return instance;
  if (loading) return loading;

  loading = (async () => {
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");
    const ffmpeg = new FFmpeg();
    const BASE = "/ffmpeg";
    try {
      const coreJs = await fetch(`${BASE}/ffmpeg-core.js`, { method: "HEAD" });
      const coreWasm = await fetch(`${BASE}/ffmpeg-core.wasm`, { method: "HEAD" });
      if (!coreJs.ok || !coreWasm.ok) {
        throw new ClipError(
          "assets-missing",
          "Engine assets missing (dev: postinstall).",
        );
      }
      await ffmpeg.load({
        coreURL: await toBlobURL(`${BASE}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${BASE}/ffmpeg-core.wasm`, "application/wasm"),
      });
    } catch (err) {
      if (err instanceof ClipError) throw err;
      throw new ClipError(
        "unsupported-browser",
        "This browser can’t compress video on-device. Try Chrome or Edge on a computer.",
      );
    }
    if (!ffmpeg.loaded) {
      throw new ClipError(
        "unsupported-browser",
        "This browser can’t compress video on-device. Try Chrome or Edge on a computer.",
      );
    }
    instance = ffmpeg;
    return ffmpeg;
  })();

  try {
    return await loading;
  } catch (err) {
    loading = null;
    throw err;
  }
}

export async function compressWithFfmpeg(
  req: CompressRequest,
  dims: { w: number; h: number },
): Promise<Blob> {
  const ffmpeg = await loadFfmpeg();
  const { fetchFile } = await import("@ffmpeg/util");
  const inName = "input.bin";
  const outName = "output.mp4";
  const crf = CRF[req.preset.q];

  const onProgress = ({ progress }: { progress: number }) => {
    req.onProgress(Math.max(0, Math.min(0.99, progress)));
  };
  ffmpeg.on("progress", onProgress);

  try {
    await ffmpeg.writeFile(inName, await fetchFile(req.file));
    const args = [
      "-i",
      inName,
      "-map",
      "0:v:0",
      "-map",
      "0:a:0?",
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-crf",
      String(crf),
      "-vf",
      `scale=trunc(oh*a/2)*2:${dims.h}`,
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      outName,
    ];
    const code = await ffmpeg.exec(args, 180_000, { signal: req.signal });
    if (req.signal.aborted) {
      throw new ClipError("cancelled", "Compression cancelled.");
    }
    if (code === 1) {
      throw new ClipError(
        "timeout",
        "This is taking too long. Try 720p or a shorter clip.",
      );
    }
    if (code !== 0) {
      throw new ClipError(
        "invalid-conversion",
        "Couldn’t decode this file. Export MP4 from the camera app.",
      );
    }
    const data = await ffmpeg.readFile(outName);
    const raw =
      data instanceof Uint8Array ? data : new TextEncoder().encode(String(data));
    const bytes = new Uint8Array(raw.byteLength);
    bytes.set(raw);
    if (!bytes.byteLength) {
      throw new ClipError("empty-output", "Nothing was written. Try 720p.");
    }
    req.onProgress(1);
    return new Blob([bytes], { type: "video/mp4" });
  } finally {
    ffmpeg.off("progress", onProgress);
    try {
      await ffmpeg.deleteFile(inName);
    } catch {
      /* ignore */
    }
    try {
      await ffmpeg.deleteFile(outName);
    } catch {
      /* ignore */
    }
  }
}
