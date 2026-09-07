import type { CompressRequest } from "./types";
import { ClipError } from "./types";

type HwAccel = "prefer-hardware" | "prefer-software" | "no-preference";

export async function compressWithMediabunny(
  req: CompressRequest,
  dims: { w: number; h: number },
): Promise<Blob> {
  const {
    ALL_FORMATS,
    BlobSource,
    BufferTarget,
    Conversion,
    Input,
    Mp4OutputFormat,
    Output,
    Quality,
  } = await import("mediabunny");

  const tryInit = async (hw: HwAccel) => {
    const input = new Input({
      source: new BlobSource(req.file),
      formats: ALL_FORMATS,
    });
    const output = new Output({
      format: new Mp4OutputFormat(),
      target: new BufferTarget(),
    });
    const conversion = await Conversion.init({
      input,
      output,
      tracks: "primary",
      video: {
        width: dims.w,
        height: dims.h,
        fit: "contain",
        codec: "avc",
        quality: new Quality(req.preset.q),
        hardwareAcceleration: hw,
      },
      audio: {
        codec: "aac",
        quality: new Quality(req.preset.aq),
      },
      tags: {},
      showWarnings: false,
    });
    return { conversion, output };
  };

  let pair: Awaited<ReturnType<typeof tryInit>> | null = null;
  const modes: HwAccel[] = [
    "prefer-hardware",
    "prefer-software",
    "no-preference",
  ];
  let lastErr: unknown = null;
  for (const hw of modes) {
    try {
      pair = await tryInit(hw);
      if (pair.conversion.isValid) break;
      pair = null;
    } catch (err) {
      lastErr = err;
      pair = null;
    }
  }

  if (!pair || !pair.conversion.isValid) {
    throw lastErr instanceof ClipError
      ? lastErr
      : new ClipError(
          "invalid-conversion",
          "Couldn’t decode this file. Export MP4 from the camera app.",
        );
  }

  const { conversion, output } = pair;

  conversion.onProgress = (p: number) => {
    req.onProgress(Math.max(0, Math.min(0.99, p)));
  };

  const onAbort = () => {
    void conversion.cancel();
  };
  req.signal.addEventListener("abort", onAbort, { once: true });

  try {
    await conversion.execute({ pauseSignal: req.signal });
  } catch (err) {
    if (req.signal.aborted) {
      throw new ClipError("cancelled", "Compression cancelled.");
    }
    throw err;
  } finally {
    req.signal.removeEventListener("abort", onAbort);
  }

  const buffer = output.target.buffer;
  if (!buffer || buffer.byteLength === 0) {
    throw new ClipError("empty-output", "Nothing was written. Try 720p.");
  }
  req.onProgress(1);
  return new Blob([buffer], { type: "video/mp4" });
}
