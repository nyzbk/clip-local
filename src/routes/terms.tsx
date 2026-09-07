import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { jsonLdScript } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    ...pageHead("/terms"),
    scripts: [
      jsonLdScript(websiteJsonLd()),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Clip", path: "/" },
          { name: "Terms", path: "/terms" },
        ]),
      ),
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <ArticleLayout kicker="Terms" h1="Not a studio. Check the preview.">
      <ul>
        <li>
          Not a studio. No guarantee a messenger or mailbox will keep our
          bitrate.
        </li>
        <li>User checks the preview before sending.</li>
        <li>
          Forbidden use: offering this origin as a watermark-removal service;
          using it as a YouTube/TikTok downloader; uploading other people’s
          copyrighted films into sample folders.
        </li>
        <li>
          Video engine credit: Mediabunny (MPL-2.0). FFmpeg wasm (wrapper MIT;
          FFmpeg LGPL/GPL mix in the official ST core we self-host).
        </li>
        <li>
          Limitation of liability: in-tab hobby tool, English UI, as-is.
        </li>
      </ul>
    </ArticleLayout>
  );
}
