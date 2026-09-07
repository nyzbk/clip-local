import type { CompressPreset, PresetId, QualityLevel } from "@/lib/clip/types";
import { PRESETS, customPreset } from "@/lib/clip/presets";

const ORDER: Exclude<PresetId, "custom">[] = ["chat", "email", "720", "1080"];

export function PresetBar({
  value,
  sourceLong,
  onChange,
  customLong,
  customQ,
  onCustomLong,
  onCustomQ,
}: {
  value: CompressPreset;
  sourceLong: number;
  onChange: (p: CompressPreset) => void;
  customLong: number;
  customQ: QualityLevel;
  onCustomLong: (n: number) => void;
  onCustomQ: (q: QualityLevel) => void;
}) {
  const customOpen = value.id === "custom";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {ORDER.map((id) => {
          const preset = PRESETS[id];
          const tooBig = sourceLong > 0 && sourceLong < preset.maxLong && id === "1080";
          const active = value.id === id;
          return (
            <button
              key={id}
              type="button"
              disabled={tooBig}
              title={tooBig ? "Source is smaller than 1080p — Clip will not upscale." : undefined}
              onClick={() => onChange(preset)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-accent bg-accent text-bg"
                  : "border-line bg-surface text-ink hover:border-accent"
              } disabled:text-muted disabled:border-line disabled:opacity-50`}
            >
              {preset.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onChange(customPreset(customLong, customQ))}
          className={`min-h-11 rounded-full border px-4 py-2 text-sm ${
            customOpen
              ? "border-accent bg-accent text-bg"
              : "border-line bg-surface text-ink hover:border-accent"
          }`}
        >
          Custom
        </button>
      </div>
      {customOpen ? (
        <div className="border-line bg-surface-2 space-y-3 rounded-md border p-4">
          <label className="text-muted flex flex-col gap-2 text-sm">
            Max edge {customLong}px
            <input
              type="range"
              min={360}
              max={1080}
              step={2}
              value={customLong}
              onChange={(e) => {
                const n = Number(e.target.value);
                onCustomLong(n);
                onChange(customPreset(n, customQ));
              }}
            />
          </label>
          <label className="text-muted flex flex-col gap-2 text-sm">
            Quality
            <select
              className="bg-surface border-line text-ink min-h-11 rounded border px-3"
              value={customQ}
              onChange={(e) => {
                const q = e.target.value as QualityLevel;
                onCustomQ(q);
                onChange(customPreset(customLong, q));
              }}
            >
              <option value="very-low">Very low</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
      ) : null}
    </div>
  );
}
