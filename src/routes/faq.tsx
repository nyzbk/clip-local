import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Faq } from "@/components/Faq";
import { AdUnit } from "@/components/AdUnit";
import { jsonLdScript } from "@/components/JsonLd";
import { faqPageItems } from "@/lib/clip/faq";
import { faqJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageHead("/faq"),
    scripts: [
      jsonLdScript(websiteJsonLd()),
      jsonLdScript(faqJsonLd(faqPageItems)),
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteShell>
      <p className="text-muted text-sm">
        <Link to="/" className="text-accent">
          Clip
        </Link>{" "}
        / FAQ
      </p>
      <h1 className="font-display mt-3 text-4xl">FAQ</h1>
      <p className="text-muted mt-3 max-w-2xl">
        Upload, engines, iPhone Files, WhatsApp pipes, Gmail’s 25 MB letter.
        Ads, if ever Ready, do not see your frames.
      </p>
      <Faq items={faqPageItems} title="Everything we get asked" />
      <AdUnit slot="footer" />
    </SiteShell>
  );
}
