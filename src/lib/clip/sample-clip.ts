export async function loadSampleClip(): Promise<File> {
  const res = await fetch("/sample/clip-sample.mp4", { cache: "force-cache" });
  if (!res.ok) {
    throw new Error("Sample clip missing.");
  }
  const blob = await res.blob();
  return new File([blob], "clip-sample.mp4", { type: "video/mp4" });
}
