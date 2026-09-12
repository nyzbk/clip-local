import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { emailFaq } from "@/lib/clip/faq";
import { EMAIL_STEPS, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/email")({
  head: () =>
    pageHead("/email", {
      faqs: emailFaq,
      howToName: "Attach a compressed MP4 under Gmail’s 25 MB letter",
      howToSteps: EMAIL_STEPS,
    }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <ArticleLayout
      kicker="Email"
      h1="Gmail’s 25 MB is the letter. Clip only shrinks the attachment."
      faq={emailFaq}
      faqTitle="Email questions"
    >
      <p>
        Many clients will not play a 200 MB camera file inline. They bounce it,
        they strip it, or they silently ask for Drive. That bounce is not Clip
        failing to encode. It is the mailbox refusing a letter.
      </p>
      <p>
        Google’s help for attachments — Send attachments with your Gmail
        message, answer 6584, opened 07.09.2026 — states:
      </p>
      <blockquote>
        For personal Gmail accounts, the limit is 25 MB.
      </blockquote>
      <p>
        If the total attachment size is greater than the limit, Gmail
        automatically removes the attachment and adds it as a Google Drive
        link. That is Gmail’s fallback, not a Clip feature. Clip does not upload
        to Drive. Clip does not raise Gmail’s cap. Clip does not host the file
        for you.
      </p>
      <p>
        This page is a video file in a mailbox. It is not “AVIF does not preview
        inline.” It is not a mailto payload. It is not a PNG-in-a-form.
      </p>
      <h2>The letter is larger than the file</h2>
      <p>
        25 MB is the message, not a promise that a 24.9 MB MP4 will send. MIME
        encoding inflates. Headers exist. A signature exists. A 24 MB MP4 can
        miss the slot. If the path is Gmail, aim for well under 20 MB after
        Compress. Read the after-bytes on the homepage. If after is 35 MB, pick
        Chat or Custom lower, or trim. Clip does not know Gmail’s counter. Other
        hosts have other caps. We cite Gmail because the help is public and
        numbered. We do not pretend we certified every ISP.
      </p>
      <h2>Usual failure</h2>
      <p>
        Compress to 1080p high because the clip “looks important.” Attach from
        Photos. Photos recodes (<Link to="/iphone">iPhone</Link>). MIME + recode
        puts the message over 25 MB. Bounce, or a Drive link the other person
        did not expect, or a client that thumbs the first frame and never plays.
        They reply “I can’t open it.” You blame Clip. Clip’s after-bytes were 28
        MB. The letter never had headroom.
      </p>
      <p>
        Or: you “insert a video” from the camera roll instead of attach file.
        Some clients recode on insert. Prefer attach file from Files (iPhone) or
        from the downloaded MP4 (desktop).
      </p>
      <h2>Email preset is a starting point</h2>
      <p>
        Clip’s Email (smaller) preset is 720 on the long side, medium quality.
        It is not a 25 MB guarantee. A 10-minute 720p talking-head can still be
        40 MB. A 20-second screen recording can be 4 MB. Read the result card.
        The percent saved is not the mailbox counter.
      </p>
      <p>If after is still too big:</p>
      <ul>
        <li>Chat / WhatsApp preset (640, low)</li>
        <li>Custom: lower quality, smaller max edge</li>
        <li>Cut in the camera app first, then Clip</li>
        <li>Do not ask Clip to host a public URL — that is not this product</li>
      </ul>
      <h2>Attach, then play on the other side</h2>
      <ol>
        <li>Compress with Email or Chat. Check after size.</li>
        <li>
          Save to Files on iPhone or keep the desktop download.
        </li>
        <li>
          Compose. Attach the file. Do not paste a blob from Recents.
        </li>
        <li>
          If the client still bounces, go lower. If Gmail turned it into a Drive
          link, that is Gmail help 6584, not Clip uploading.
        </li>
        <li>
          Ask them to download the attachment and play the MP4. Inline preview
          in a webmail player is a courtesy, not a right. Clip’s output is H.264
          + AAC in MP4 on purpose so Windows and Android mail apps have a
          chance.
        </li>
      </ol>
      <h2>Work vs personal, and why we still only cite 6584</h2>
      <p>
        A corporate mailbox may cap at 10 MB or 35 MB or “videos stripped by
        DLP.” Those numbers are not in Google’s consumer help. Inventing a table
        of Outlook / Yahoo / Proton from blog posts is how this page rots. Clip
        cites 6584 for Gmail personal. For anything else: read the after-bytes,
        leave headroom, attach a file, if it bounces go smaller.
      </p>
      <p>
        Work Gmail (Google Workspace) can have admin-set limits. We do not guess
        them. If a client says “it failed at 18 MB,” that is their admin, not a
        Clip bug.
      </p>
      <h2>What “Drive link” means when it appears</h2>
      <p>
        If the other person receives a Google Drive link instead of an MP4,
        Gmail already applied 6584. Clip did not upload anything. The file now
        lives in the sender’s Drive, with whatever sharing Drive defaulted to.
        That is a different privacy story than “bytes stayed in the tab.” If
        they needed the video to stay off Google’s disk, they must stay under
        the letter cap. Clip will not add a “send via Drive” button. That would
        be an upload.
      </p>
      <h2>Multiple attachments</h2>
      <p>
        Two 12 MB clips in one letter are already over 25 MB plus MIME. Compress
        each. Send two letters, or pick Chat until each after-size is small, or
        do not send video by mail. A mailbox is the wrong bus for a film.
      </p>
      <p>
        Clip cannot raise Gmail’s 25 MB. Clip cannot make Outlook preview HEVC.
        Clip cannot host the file. Success is: after-bytes you read, plus MIME
        headroom, plus the other person opened the MP4.
      </p>
      <p>
        <Link to="/how-to">How to</Link> · <Link to="/iphone">iPhone</Link> ·{" "}
        <Link to="/whatsapp">WhatsApp</Link> · <Link to="/limits">Limits</Link>{" "}
        · <Link to="/">Compress</Link>. Updated 7 September 2026.
      </p>
    </ArticleLayout>
  );
}
