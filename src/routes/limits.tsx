import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/limits")({
  head: () => pageHead("/limits"),
  component: LimitsPage,
});

function LimitsPage() {
  return (
    <ArticleLayout kicker="Limits" h1="The cap is RAM. Clip is not a free tier.">
      <p>
        Clip keeps decode and encode in this tab. Mediabunny’s BufferTarget
        holds the whole output in memory. FFmpeg’s MEMFS holds a copy of input
        and output. Two copies of a 200 MB 4K file plus decoded frames is how a
        phone tab dies.
      </p>
      <table>
        <thead>
          <tr>
            <th>Context</th>
            <th>Max input</th>
            <th>Duration warn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desktop Chromium / Firefox</td>
            <td>80 MB</td>
            <td>5 min, hard-ish 8 min</td>
          </tr>
          <tr>
            <td>iOS Safari / Android Chrome</td>
            <td>40 MB</td>
            <td>2 min</td>
          </tr>
        </tbody>
      </table>
      <blockquote>
        This file is too large for this device. Try a shorter clip (under 80 MB
        on a computer, 40 MB on a phone). Clip never uploads — the limit is your
        browser’s memory.
      </blockquote>
      <p>
        If the source is 4K, pick 720p or 1080p — Clip will not keep 4K
        “lossless.” If duration is a lecture, cut it in the camera app.
        Encrypted / DRM / HLS live = refusal. Audio-only = refusal. No batch. No
        target-size mode in v1 (a slider is quality, not “make this 8.0 MB
        exactly”).
      </p>
      <p>
        iPhone save path is <Link to="/iphone">iPhone</Link>. Chat recode is{" "}
        <Link to="/whatsapp">WhatsApp</Link>. Mailbox 25 MB is{" "}
        <Link to="/email">Email</Link>. This page does not repeat those
        ceilings. How to run Compress: <Link to="/how-to">How to</Link>.
      </p>
    </ArticleLayout>
  );
}
