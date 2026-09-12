import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("/about"),
  component: AboutPage,
});

function AboutPage() {
  return (
    <ArticleLayout kicker="About" h1="A compressor that stays in this tab.">
      <p>
        Clip is a free, in-browser video compressor. Bytes stay in this tab. No
        account. No watermark. No daily credits. Built by Ultimatum (contact{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>) — the same
        studio as the other local tools, not a clone of Clideo / VEED / Kapwing
        (those upload).
      </p>
      <p>
        Engine: Mediabunny (MPL-2.0) on WebCodecs, FFmpeg wasm self-hosted on
        this origin as fallback. This is not a studio, not a downloader, not a
        watermark-remover.
      </p>
      <p>
        Open the <Link to="/">tool</Link>. Read <Link to="/privacy">privacy</Link>{" "}
        and <Link to="/terms">terms</Link>.
      </p>
    </ArticleLayout>
  );
}
