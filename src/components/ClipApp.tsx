import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { DropZone } from "./DropZone";
import { PresetBar } from "./PresetBar";
import { ResultCard } from "./ResultCard";
import { AdUnit } from "./AdUnit";
import { compressVideo, prefetchMediabunny } from "@/lib/clip/compress";
import { loadSampleClip } from "@/lib/clip/sample-clip";
import { downloadMp4 } from "@/lib/clip/download";
import { formatBytes, formatDuration, probeFile } from "@/lib/clip/probe";
import { FAIL_COPY } from "@/lib/clip/errors";
import { PRESETS, isMobileDevice, DESKTOP_DURATION_WARN, MOBILE_DURATION_WARN } from "@/lib/clip/presets";
import { ClipError, type CompressPreset, type CompressResult, type ProbeInfo, type QualityLevel } from "@/lib/clip/types";

export function ClipApp() {
  const [file, setFile] = useState<File | null>(null);
  const [probe, setProbe] = useState<ProbeInfo | null>(null);
  const [preset, setPreset] = useState<CompressPreset>(PRESETS["720"]);
  const [customLong, setCustomLong] = useState(720);
  const [customQ, setCustomQ] = useState<QualityLevel>("medium");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [engine, setEngine] = useState<"webcodecs" | "ffmpeg" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const jobRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    void prefetchMediabunny();
    setMobile(isMobileDevice());
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    jobRef.current += 1;
    setFile(null);
    setProbe(null);
    setBusy(false);
    setProgress(0);
    setEngine(null);
    setError(null);
    setResult(null);
    setPreviewUrl((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
  }, []);

  const onFile = useCallback(async (next: File) => {
    reset();
    setFile(next);
    const info = await probeFile(next);
    setProbe(info);
    if (!info.hasVideo && info.duration > 0) {
      setError(FAIL_COPY["audio-only"]);
    }
  }, [reset]);

  const run = useCallback(async () => {
    if (!file) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const jobId = ++jobRef.current;
    setBusy(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setEngine(typeof VideoEncoder === "function" ? "webcodecs" : "ffmpeg");
    try {
      const out = await compressVideo({
        file,
        preset,
        jobId,
        signal: ac.signal,
        onProgress: (p) => {
          if (jobRef.current === jobId) setProgress(p);
        },
      });
      if (jobRef.current !== jobId) return;
      setEngine(out.engine);
      setResult(out);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(out.blob);
      });
    } catch (err) {
      if (jobRef.current !== jobId) return;
      if (err instanceof ClipError) {
        if (err.code !== "cancelled") setError(FAIL_COPY[err.code] ?? err.message);
      } else {
        setError(FAIL_COPY["invalid-conversion"]);
      }
    } finally {
      if (jobRef.current === jobId) setBusy(false);
    }
  }, [file, preset]);

  const sourceLong = probe ? Math.max(probe.width, probe.height) : 0;

  return (
    <section className="space-y-6">
      {mobile ? (
        <p className="border-accent/40 bg-surface-2 text-ink rounded-md border px-4 py-3 text-sm">
          Phones struggle with large videos — 40 MB max here.
        </p>
      ) : null}

      {!file ? <DropZone disabled={busy} onFile={(f) => void onFile(f)} /> : null}

      {file ? (
        <div className="border-line bg-surface flex flex-wrap items-start justify-between gap-4 rounded-lg border p-4">
          <div>
            <p className="text-ink font-medium">{probe?.name ?? file.name}</p>
            <p className="text-muted font-mono mt-1 text-sm tabular-nums">
              {probe
                ? `${formatBytes(probe.sizeBytes)} · ${formatDuration(probe.duration)} · ${probe.width}×${probe.height}`
                : `${formatBytes(file.size)} · reading…`}
            </p>
          </div>
          <button
            type="button"
            className="text-muted hover:text-ink min-h-11 text-sm"
            onClick={reset}
          >
            Remove
          </button>
        </div>
      ) : null}

      {file && probe && probe.duration > (mobile ? MOBILE_DURATION_WARN : DESKTOP_DURATION_WARN) ? (
        <p className="text-muted text-sm">
          Long clips fight RAM. Clip may time out — cut it shorter in the camera
          app first.
        </p>
      ) : null}

      {file ? (
        <PresetBar
          value={preset}
          sourceLong={sourceLong}
          onChange={setPreset}
          customLong={customLong}
          customQ={customQ}
          onCustomLong={setCustomLong}
          onCustomQ={setCustomQ}
        />
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!file || busy || Boolean(error && !file)}
          onClick={() => void run()}
          className="bg-accent text-bg min-h-11 rounded-md px-6 py-2.5 font-medium disabled:opacity-40"
        >
          Compress video
        </button>
      {!file ? (
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            void loadSampleClip()
              .then(onFile)
              .catch(() => setError("Sample clip missing."))
          }
          className="border-line text-ink min-h-11 rounded-md border px-5 py-2.5"
        >
          Try a sample clip
        </button>
      ) : null}
        {busy ? (
          <button
            type="button"
            onClick={() => abortRef.current?.abort()}
            className="text-danger min-h-11 px-3"
          >
            Cancel
          </button>
        ) : null}
      </div>

      {busy ? (
        <div className="space-y-2">
          <div className="bg-line h-1 overflow-hidden rounded-full">
            <div
              className="bg-accent h-full transition-[width] duration-200"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="text-muted font-mono text-xs">
            {engine === "ffmpeg"
              ? "Compressing with local FFmpeg (from this site, not a CDN)"
              : "Compressing with WebCodecs (this device)"}
            {progress > 0 ? ` · ${Math.round(progress * 100)}%` : " · working…"}
          </p>
        </div>
      ) : null}

      {error ? <p className="text-danger text-sm">{error}</p> : null}

      {result && previewUrl ? (
        <>
          <ResultCard
            result={result}
            previewUrl={previewUrl}
            onDownload={() => downloadMp4(result.blob, file?.name ?? "video")}
            onReset={reset}
          />
          <AdUnit slot="after-success" />
        </>
      ) : null}

      <ol className="text-muted mt-4 grid gap-4 text-sm sm:grid-cols-3">
        <li className="bg-surface border-line rounded-md border p-4">
          <span className="text-accent font-mono text-xs">01</span>
          <p className="text-ink mt-2 font-medium">Drop a file you own</p>
          <p className="mt-1">Nothing is posted. The bytes stay in this tab.</p>
        </li>
        <li className="bg-surface border-line rounded-md border p-4">
          <span className="text-accent font-mono text-xs">02</span>
          <p className="text-ink mt-2 font-medium">Pick Chat, Email or 720p</p>
          <p className="mt-1">
            Chat is for a bubble. Email is a starting point for a letter.{" "}
            <Link to="/how-to" className="text-accent">
              How it works
            </Link>
            .
          </p>
        </li>
        <li className="bg-surface border-line rounded-md border p-4">
          <span className="text-accent font-mono text-xs">03</span>
          <p className="text-ink mt-2 font-medium">Download, then save in Files</p>
          <p className="mt-1">
            On iPhone, Photos may recode.{" "}
            <Link to="/iphone" className="text-accent">
              Files vs Photos
            </Link>
            .
          </p>
        </li>
      </ol>
    </section>
  );
}
