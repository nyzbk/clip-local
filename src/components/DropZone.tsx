import { useCallback, useState, type DragEvent, type ChangeEvent } from "react";
import { ACCEPT } from "@/lib/clip/presets";

export function DropZone({
  disabled,
  onFile,
}: {
  disabled?: boolean;
  onFile: (file: File) => void;
}) {
  const [over, setOver] = useState(false);

  const take = useCallback(
    (file?: File | null) => {
      if (!file || disabled) return;
      if (!file.type.startsWith("video/") && !/\.(mp4|mov|webm|mkv|m4v)$/i.test(file.name)) {
        return;
      }
      onFile(file);
    },
    [disabled, onFile],
  );

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    take(e.dataTransfer.files?.[0]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    take(e.target.files?.[0]);
    e.target.value = "";
  };

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      className={`border-accent/50 bg-surface flex min-h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition ${
        over ? "bg-surface-2 border-accent" : ""
      } ${disabled ? "pointer-events-none opacity-50" : ""}`}
    >
      <input
        type="file"
        accept={ACCEPT}
        className="sr-only"
        disabled={disabled}
        onChange={onChange}
      />
      <span className="font-display text-ink text-lg">Drop an MP4 or MOV here, or browse.</span>
      <span className="text-muted text-sm">
        MP4, MOV, WebM, MKV, M4V · stays in this tab
      </span>
    </label>
  );
}
