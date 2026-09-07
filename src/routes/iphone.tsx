import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { jsonLdScript } from "@/components/JsonLd";
import { iphoneFaq } from "@/lib/clip/faq";
import { breadcrumbJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/iphone")({
  head: () => ({
    ...pageHead("/iphone"),
    scripts: [
      jsonLdScript(websiteJsonLd()),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Clip", path: "/" },
          { name: "iPhone", path: "/iphone" },
        ]),
      ),
    ],
  }),
  component: IphonePage,
});

function IphonePage() {
  return (
    <ArticleLayout
      kicker="iPhone"
      h1="The compressed MP4 lives in Files. Photos is a camera roll that may recode it."
      faq={iphoneFaq}
      faqTitle="iPhone questions"
    >
      <p>
        Clip writes an MP4: H.264 + AAC, faststart when the FFmpeg path ran, a
        BufferTarget blob when WebCodecs ran. That object exists in this tab.
        iPhone then decides where it goes. That decision is the entire page.
        This is not PNG alpha. This is not a QR module. This is not HEIC stills
        (Camera Roll photos are not this compressor; convert those elsewhere,
        then come back with a video). This page is an MP4 on iOS after Download.
      </p>
      <h2>Safari does not have Chrome’s Downloads list</h2>
      <p>
        On a desktop Chrome, Download drops a file into a folder you can open.
        On iPhone Safari the download attribute is a suggestion. You may see a
        share sheet. You may see the file in Files. You may see nothing obvious
        and assume Clip failed. Clip did not fail if the in-tab preview played.
        The hop failed.
      </p>
      <p>If a share sheet appears, Save to Files and Save Video are not synonyms.</p>
      <ul>
        <li>
          <strong>Save to Files</strong> puts a file in a directory you pick: On
          My iPhone, iCloud Drive, a folder you made. That is the object Clip
          encoded, or as close as Safari will hand over.
        </li>
        <li>
          <strong>Save Video</strong> (or Save to Photos) lands in the camera
          roll. Photos is allowed to transcode for iCloud, for “Optimise iPhone
          Storage,” for a format the roll prefers. You may later attach a
          derivative that is large again, or HEVC a Windows machine cannot play.
        </li>
      </ul>
      <p>
        Recents in Photos is a mixed view: screenshots, camera clips, screen
        recordings, the occasional real download. Recents is not a Downloads
        folder. Looking for clip-story.mp4 in Recents and finding IMG_3488.MOV
        means you saved the recode, not Clip’s object.
      </p>
      <h2>The preview in the tab is not the saved file</h2>
      <p>
        The result card plays an object URL. That URL dies when you reset or
        close the tab. A screenshot of the preview is a picture of a player, not
        an MP4. If you need the file to survive, you must complete a save into
        Files and open it there. Play it in Files. If Files plays it, you still
        have a file. If you AirDrop from Photos and the other person gets a
        .MOV they cannot play in their Windows player, you handed them the
        roll’s object.
      </p>
      <h2>iCloud Optimise is a second encoder you did not ask for</h2>
      <p>
        “Optimise iPhone Storage” can replace a video with a smaller derivative
        and keep the original in iCloud. That is Apple’s disk policy, not Clip.
        If you need the master, keep it in Files even if you also drop a preview
        on the roll. Do not assume the bubble you later send from Photos is the
        file you compressed.
      </p>
      <h2>How to actually keep Clip’s MP4</h2>
      <ol>
        <li>
          Compress on the <Link to="/">homepage</Link>. Wait for before → after.
          Play the preview.
        </li>
        <li>
          Tap Download. If Safari offers a share sheet, pick Save to Files. Pick
          a folder you can find again.
        </li>
        <li>
          Leave Safari. Open Files. Find clip-*.mp4. Play it. Duration should
          match.
        </li>
        <li>
          Hand that Files object on. AirDrop the file. Attach as a document.
          Mail as an attachment from Files, not from Recents.
        </li>
        <li>
          If the next hop is WhatsApp, read <Link to="/whatsapp">WhatsApp</Link>
          — a video-send from Photos is their encoder. If the next hop is Gmail,
          read <Link to="/email">Email</Link>.
        </li>
      </ol>
      <h2>Phones struggle, and that is in the UI on purpose</h2>
      <p>
        Clip’s mobile cap is 40 MB input. That is RAM. A 4K clip from the Camera
        app is often larger. Export a shorter cut, or run Clip on a computer (80
        MB). If Compress dies with oom or the tab reloads, you hit the device,
        not a quota.
      </p>
      <p>
        iOS Safari without WebCodecs encode will try FFmpeg from /ffmpeg/ (~30
        MB wasm, first time, Wi-Fi). If that cannot load, Clip says this browser
        cannot compress video on-device. That is the honest fail. It is not a
        spinner forever. It is not an upload as a fallback.
      </p>
      <h2>Desktop vs iPhone in the same product</h2>
      <p>
        Clip is one origin. The homepage does not become a different app on a
        phone. What changes is the save hop. Desktop Chrome writes a file you
        can find. iPhone Safari often does not. The 40 MB cap on a phone is the
        same honesty. A 70 MB clip that compressed fine on a laptop will be
        refused on iPhone before Compress runs. That is not a broken build.
        There is no /android synonym page.
      </p>
      <h2>Filenames you can recognise later</h2>
      <p>
        Clip names the file clip-{"{basename}"}.mp4. If the share sheet lets you
        rename, keep clip- in the stem so Files search finds it. If Photos
        renamed it to IMG_3488, you are no longer holding Clip’s object.
      </p>
      <h2>What this page refuses to claim</h2>
      <ul>
        <li>Photos stores your MP4 bit-exact. It might. It also might not.</li>
        <li>Safari always honors download. It does not.</li>
        <li>Clip patched iOS. Clip cannot patch Safari.</li>
        <li>This is a HEIC converter. It is not.</li>
      </ul>
      <p>
        People compress a 40 MB story, tap Save Video, later attach “the small
        video” to mail. Mail gets a Photos recode that is large again. They
        blame Clip. Clip’s after-bytes were small. The bucket recoded. That is
        why this URL exists.
      </p>
      <p>
        How to run the compressor: <Link to="/how-to">How to</Link>. Caps:{" "}
        <Link to="/limits">Limits</Link>. Updated 7 September 2026.
      </p>
    </ArticleLayout>
  );
}
