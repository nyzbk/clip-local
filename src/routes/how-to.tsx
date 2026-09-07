import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { jsonLdScript } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/how-to")({
  head: () => ({
    ...pageHead("/how-to"),
    scripts: [
      jsonLdScript(websiteJsonLd()),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Clip", path: "/" },
          { name: "How to", path: "/how-to" },
        ]),
      ),
    ],
  }),
  component: HowToPage,
});

function HowToPage() {
  return (
    <ArticleLayout
      kicker="How to"
      h1="Compress a video without sending it anywhere."
    >
      <p>
        Clip is a compressor that stays in the tab you already have open. You
        are not joining a queue on someone else’s GPU. You are not creating an
        account so a SaaS can keep a copy “for processing.” You drop one file.
        Clip probes duration and size here. You pick Chat, Email, 720p or 1080p.
        Compress runs either WebCodecs through Mediabunny or a local FFmpeg core
        that this same origin hosts. You download an MP4. Closing the tab drops
        the bytes.
      </p>
      <p>
        That is the whole job. The rest of this page is the sequence, the two
        engines, and the traps that make people think the tool “didn’t work”
        when the next app recoded the file.
      </p>
      <h2>Drop one real file</h2>
      <p>
        Pick a video you actually own: a story, a screen recording, a camera
        clip you exported. MP4, MOV, WebM, MKV, M4V. Under <strong>80 MB on a
        computer</strong>, <strong>40 MB on a phone</strong>. Those caps are
        memory, not a paywall and not a “free tier.” Clip keeps the whole decode
        in RAM (Mediabunny’s BufferTarget holds the output; FFmpeg’s MEMFS holds
        a copy). A two-hour 4K holiday file will kill the tab. Export a shorter
        cut from the camera app first. If the file is larger than the cap, Clip
        refuses with an honest sentence. It does not upload “just this once.”
      </p>
      <p>
        The drop zone accepts video files plus those extensions. One file in
        focus. Reset is a button, not a second uploader.
      </p>
      <h2>Read the card before you press Compress</h2>
      <p>
        After the drop, the card should show name, bytes, duration, width ×
        height. Codec name is a bonus. Compress is not blocked because a
        container hid the FourCC. If duration is missing, the probe fell back to
        a video element — still fine. If the card says this is audio-only, stop:
        Clip compresses video.
      </p>
      <p>
        If you are on a phone, read the banner: 40 MB max here. That is not Clip
        being rude. iOS Safari will discard a tab that decodes 200 MB of 4K in
        the foreground.
      </p>
      <h2>First visit is engine code, not your video leaving</h2>
      <p>
        The first visit may download Mediabunny (small, tree-shaken) or, only on
        fallback, the FFmpeg core (~25–35 MB) from this site at
        /ffmpeg/ffmpeg-core.wasm. That request is same-origin. It is not your
        video POSTed to a farm. Cache keeps the core. Do the first load on Wi-Fi
        if you are on a phone. Primary path must not fetch 30 MB wasm. If
        DevTools Network shows jsDelivr or unpkg for FFmpeg, the build is
        broken.
      </p>
      <h2>Pick a preset that matches the next hop</h2>
      <ul>
        <li>
          <strong>Chat / WhatsApp</strong> — 640 on the long side, low quality.
          Built for a bubble. The chat will recode anyway.
        </li>
        <li>
          <strong>Email (smaller)</strong> — 720, medium. A starting point for a
          mailbox, not a promise the letter is under 25 MB. Read{" "}
          <Link to="/email">Email</Link>.
        </li>
        <li>
          <strong>720p</strong> — default. 1280 long side, medium. Most desktop
          shares.
        </li>
        <li>
          <strong>1080p</strong> — only if the source is at least that. Clip
          will not upscale a 480p clip. The chip goes grey with a hint.
        </li>
        <li>
          <strong>Custom</strong> — a slider and a max edge, not a studio.
        </li>
      </ul>
      <p>
        Do not pick 1080 because it “sounds better.” Pick the hop: chat,
        mailbox, or a file you will keep in Files.
      </p>
      <h2>Compress, watch the badge, cancel is real</h2>
      <p>
        Press Compress video. The badge says WebCodecs (this device) or FFmpeg
        (local). Progress should move. If it sits silent for eight seconds, the
        UI still says it is working. A spinner with no copy is a bug.
      </p>
      <p>
        Cancel is not a cosmetic X. On the Mediabunny path it calls
        conversion.cancel() and aborts pauseSignal. On FFmpeg it stops waiting
        on the 180 s timeout and unlinks MEMFS. A late result from a cancelled
        job is ignored.
      </p>
      <p>
        WebCodecs first: VideoEncoder in window, then Conversion with tracks
        primary, codec avc (H.264), audio aac, fit contain, quality that forces
        transcode, tags empty so GPS and titles strip. If conversion is invalid,
        fall through to FFmpeg. If there is no VideoEncoder, skip straight to
        FFmpeg. If FFmpeg cannot load from /ffmpeg/, the page says this browser
        cannot compress video on-device.
      </p>
      <p>
        Progress at 1 is not done. Wait until execute resolves, then read the
        output buffer.
      </p>
      <h2>Read before → after. Do not ship a lie</h2>
      <p>
        The result card shows old bytes → new bytes and a percent. If after is
        not smaller, Clip says it couldn’t get smaller. You can still download.
        A 5 MB screen recording that is already Chat-sized will not magically
        become 400 KB. Do not put the word “compressed” on a file that grew.
      </p>
      <p>
        Preview is a video player on an object URL. That is not the saved file.
        Play it. If it is black, do not download as if it worked. Download is
        clip-{"{basename}"}.mp4. No watermark. No “made with Clip” frame.
      </p>
      <h2>What happens after Download</h2>
      <p>Clip’s job ends when the MP4 exists. The next app’s job starts when you attach it.</p>
      <ul>
        <li>
          iPhone: save to <Link to="/iphone">Files</Link>, not Photos.
        </li>
        <li>
          Chat: video-send is their encoder; document can carry this file.{" "}
          <Link to="/whatsapp">WhatsApp</Link>.
        </li>
        <li>
          Mailbox: Gmail’s 25 MB is the letter. <Link to="/email">Email</Link>.
        </li>
        <li>
          Memory, 4K, duration: <Link to="/limits">Limits</Link>.
        </li>
      </ul>
      <h2>What Clip will not do</h2>
      <p>
        No timeline editor. No subtitle burn-in. No batch of 40 files. No
        YouTube / TikTok / Instagram URL. No torrent. No watermark-remover. No
        cloud transcode. No account. No daily credits. If you need a studio,
        this is the wrong tab.
      </p>
      <h2>Privacy in one paragraph</h2>
      <p>
        The file is a Blob in this tab. Mediabunny reads it with BlobSource.
        FFmpeg writes it into MEMFS in this process. Nothing is fetched with the
        file as body. Ads, if this origin is ever Ready, measure page views, not
        frames. Closing the tab drops the object URLs. We do not log filenames.
      </p>
      <p>
        Open the <Link to="/">compressor</Link>. Updated 7 September 2026.
      </p>
    </ArticleLayout>
  );
}
