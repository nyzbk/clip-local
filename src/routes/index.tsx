import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { ClipApp } from "@/components/ClipApp";
import { Faq } from "@/components/Faq";
import { AdUnit } from "@/components/AdUnit";
import { homeFaq } from "@/lib/clip/faq";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead("/", {
      faqs: homeFaq,
      includeApp: true,
    }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase">
        Clip
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
        Compress a video in your browser. The file never leaves this device.
      </h1>
      <ul className="text-muted mt-4 flex flex-wrap gap-2 text-sm">
        {["No upload", "No account", "Stays on this device"].map((chip) => (
          <li
            key={chip}
            className="border-line bg-surface rounded-full border px-3 py-1"
          >
            {chip}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ClipApp />
      </div>
      <AdUnit slot="mid" />
      <section className="prose-clip mt-12 max-w-3xl">
        <h2>What Clip is</h2>
        <p>
          Clip shrinks one video you already have — an MP4, MOV, WebM, MKV or
          M4V — into a smaller playable MP4. WebCodecs through Mediabunny runs
          first. If this browser cannot encode, a local FFmpeg core from{" "}
          <code className="font-mono text-accent">/ffmpeg/</code> on this origin
          takes over. There is no account, no watermark, no daily credit, and no
          POST of the file.
        </p>
        <p>
          After Download, the next app may recode what you send. Save to{" "}
          <Link to="/iphone">Files on iPhone</Link>, not Photos. A WhatsApp
          video-send is <Link to="/whatsapp">their encoder</Link>. Gmail’s 25 MB
          is the <Link to="/email">letter</Link>, not Clip. Memory caps live on{" "}
          <Link to="/limits">Limits</Link>. The full sequence is in{" "}
          <Link to="/how-to">How to</Link>.
        </p>
      </section>
      <Faq items={homeFaq} title="Quick answers" />
      <AdUnit slot="footer" />
    </SiteShell>
  );
}
