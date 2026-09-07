import { ClipError, type CompressRequest, type CompressResult } from "./types";
import { containSize, inputCapBytes } from "./presets";
import { FAIL_COPY } from "./errors";
import { probeFile } from "./probe";

export async function compressVideo(
  req: CompressRequest,
): Promise<CompressResult> {
  const cap = inputCapBytes();
  if (req.file.size > cap) {
    throw new ClipError("too-large", FAIL_COPY["too-large"]);
  }

  const probe = await probeFile(req.file);
  if (!probe.hasVideo) {
    if (probe.duration > 0) {
      throw new ClipError("audio-only", FAIL_COPY["audio-only"]);
    }
    throw new ClipError("invalid-conversion", FAIL_COPY["invalid-conversion"]);
  }

  const dims = containSize(probe.width, probe.height, req.preset.maxLong);
  const canWebCodecs = typeof VideoEncoder === "function";

  let blob: Blob | null = null;
  let engine: CompressResult["engine"] = "webcodecs";

  const runFfmpeg = async () => {
    engine = "ffmpeg";
    const { compressWithFfmpeg } = await import("./ffmpeg-engine");
    return compressWithFfmpeg(req, dims);
  };

  if (canWebCodecs) {
    try {
      const { compressWithMediabunny } = await import("./mediabunny-engine");
      blob = await compressWithMediabunny(req, dims);
      engine = "webcodecs";
    } catch (err) {
      if (err instanceof ClipError && err.code === "cancelled") throw err;
      if (req.signal.aborted) {
        throw new ClipError("cancelled", FAIL_COPY.cancelled);
      }
      try {
        blob = await runFfmpeg();
      } catch (fallbackErr) {
        if (fallbackErr instanceof ClipError) throw fallbackErr;
        throw err instanceof ClipError
          ? err
          : new ClipError("invalid-conversion", FAIL_COPY["invalid-conversion"]);
      }
    }
  } else {
    try {
      blob = await runFfmpeg();
    } catch (err) {
      if (err instanceof ClipError) throw err;
      throw new ClipError("unsupported-browser", FAIL_COPY["unsupported-browser"]);
    }
  }

  if (!blob || blob.size === 0) {
    throw new ClipError("empty-output", FAIL_COPY["empty-output"]);
  }

  const outputBytes = blob.size;
  const inputBytes = req.file.size;
  return {
    blob,
    engine,
    inputBytes,
    outputBytes,
    savedRatio: inputBytes > 0 ? 1 - outputBytes / inputBytes : 0,
    grew: outputBytes >= inputBytes,
    width: dims.w,
    height: dims.h,
  };
}

export async function prefetchMediabunny() {
  try {
    await import("mediabunny");
  } catch {
    /* prefetch is best-effort */
  }
}
