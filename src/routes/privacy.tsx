import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("/privacy", { legal: true }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <ArticleLayout kicker="Privacy" h1="Video is processed only in this tab.">
      <ul>
        <li>Video is processed only in memory in this tab.</li>
        <li>
          No upload of File / ArrayBuffer / dataURL / FormData to Clip or a
          transcode API.
        </li>
        <li>
          Fallback FFmpeg runs in this tab from /ffmpeg/ on this same origin,
          not a third-party CDN.
        </li>
        <li>
          Ads, if ever Ready, do not receive video bytes. They measure page
          views. Until Site Ready, slots are placeholders. Auto ads stay off.
        </li>
        <li>No analytics on filenames or frames.</li>
        <li>tags: {"{}"} strips GPS / title / encoder on export.</li>
        <li>Closing the tab drops object URLs.</li>
        <li>
          We do not sell files. We do not have an account database for this
          product (Auth OFF, DB OFF).
        </li>
        <li>AdSense publisher ca-pub-7636435144500691.</li>
      </ul>
      <p>
        Contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </ArticleLayout>
  );
}
