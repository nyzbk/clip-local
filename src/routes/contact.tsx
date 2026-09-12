import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("/contact"),
  component: ContactPage,
});

function ContactPage() {
  return (
    <ArticleLayout kicker="Contact" h1="Email only. Do not send the video.">
      <p>
        Email:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        No ticket form. No phone. Do not send video files to this address — Clip
        never wants your bytes. Compress them in the tab, then keep the MP4 on
        your device.
      </p>
    </ArticleLayout>
  );
}
