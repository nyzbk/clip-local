import fileSaver from "file-saver";

const saveAs =
  typeof fileSaver === "function"
    ? fileSaver
    : (fileSaver as { saveAs: typeof fileSaver }).saveAs;

export function sanitizeStem(name: string) {
  const base = name.replace(/\.[^.]+$/, "");
  return (
    base.replace(/[^\w.-]+/g, "-").replace(/-+/g, "-").slice(0, 80) || "clip"
  );
}

export function downloadMp4(blob: Blob, originalName: string) {
  const filename = `clip-${sanitizeStem(originalName)}.mp4`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  try {
    saveAs(blob, filename);
  } catch {
    /* iOS Safari often ignores download; share sheet still fired from <a> */
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  return filename;
}
