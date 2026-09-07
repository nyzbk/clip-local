import type { CompressResult } from "@/lib/clip/types";
import { formatBytes } from "@/lib/clip/probe";
import { GREW_WARNING } from "@/lib/clip/errors";

export function ResultCard({
  result,
  previewUrl,
  onDownload,
  onReset,
}: {
  result: CompressResult;
  previewUrl: string;
  onDownload: () => void;
  onReset: () => void;
}) {
  const percent = Math.round(result.savedRatio * 100);
  return (
    <div className="border-line bg-surface space-y-4 rounded-lg border p-4">
      {result.grew ? (
        <p className="text-danger text-sm">{GREW_WARNING}</p>
      ) : (
        <p className="font-mono text-ok text-sm tabular-nums">
          Saved {percent}% · {formatBytes(result.inputBytes)} → {formatBytes(result.outputBytes)}
        </p>
      )}
      <video
        className="bg-bg aspect-video w-full rounded-md"
        src={previewUrl}
        controls
        playsInline
      />
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="bg-accent text-bg min-h-11 rounded-md px-5 py-2.5 font-medium"
        >
          Download MP4
        </button>
        <button
          type="button"
          onClick={onReset}
          className="border-line text-ink min-h-11 rounded-md border px-5 py-2.5"
        >
          Compress another
        </button>
      </div>
    </div>
  );
}
