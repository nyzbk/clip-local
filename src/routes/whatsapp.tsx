import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/ArticleLayout";
import { jsonLdScript } from "@/components/JsonLd";
import { whatsappFaq } from "@/lib/clip/faq";
import { breadcrumbJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    ...pageHead("/whatsapp"),
    scripts: [
      jsonLdScript(websiteJsonLd()),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Clip", path: "/" },
          { name: "WhatsApp", path: "/whatsapp" },
        ]),
      ),
    ],
  }),
  component: WhatsappPage,
});

function WhatsappPage() {
  return (
    <ArticleLayout
      kicker="WhatsApp"
      h1="A video-send is their encoder. A document can carry Clip’s MP4."
      faq={whatsappFaq}
      faqTitle="WhatsApp questions"
    >
      <p>
        Clip’s job ends when an MP4 exists in this tab. WhatsApp’s job starts
        when you attach something. Those are two encoders. Mixing them is how a
        “compressed” file becomes a 12 MB bubble the other phone still waits on
        — or a crisp file that never plays inline because you sent a document
        and expected a player.
      </p>
      <p>
        This page is video in a chat. It is not PNG alpha flatten. It is not QR
        modules. It is not AVIF-as-photo. Do not paste those articles here with
        the noun swapped.
      </p>
      <h2>Two attach pipes, two outcomes</h2>
      <p>
        <strong>Video-send</strong> (Photos & Videos, gallery, the paperclip
        media picker, drag a movie onto the compose box as media): WhatsApp runs
        their pipeline. They resize. They pick a bitrate. They often run a
        second H.264 pass. Official help (faq.whatsapp.com/823886715479103,
        07.09.2026) says the maximum for videos sent or forwarded is 64 MB on
        all platforms. Faster connections default to 100 MB and 720p. Slower
        connections default to 64 MB and 480p. HD, if the toggle shows, is still
        their encode. It is not Clip’s 720p file with a sticker on it.
      </p>
      <p>
        <strong>Document-send</strong> (Document in the attach sheet, then pick
        the MP4 from Files): WhatsApp treats it as a file. Official help: you
        can choose Document and select a photo or video; document maximum is 2
        GB. The other person downloads a file. There is often no inline player.
        That is the cost of keeping Clip’s bytes.
      </p>
      <p>
        Clip cannot disable WhatsApp video compression. Clip cannot force a
        video-send to keep our bitrate. Success for “I needed them to have this
        file” is: you sent a document, they saved it, that file still plays as
        the MP4 you downloaded. Success for “I needed them to watch in the
        bubble” is: you sent a video of the Chat preset, and you accepted their
        recode.
      </p>
      <h2>Status is not an archive</h2>
      <p>
        Status video maximum duration is 90 seconds. HD media is not currently
        available for status. Treat Status as a preview. Keep the MP4 in Files
        as the master. View once is not an archive. Forwarding a bubble forwards
        their recode, not Clip’s canvas.
      </p>
      <p>
        Supported formats they list: 3GP, AVI, FLV, MKV, MOV, MP4. Clip’s output
        is MP4. Do not send MKV as a video-send and expect their player to be
        kind.
      </p>
      <h2>Usual failure</h2>
      <p>
        Someone compresses to Chat preset, then attaches from Photos. Photos may
        already have recoded (see <Link to="/iphone">iPhone</Link>). WhatsApp
        then recodes again. The other phone waits on a 12 MB bubble because the
        source they actually attached was a high-bitrate roll item, not the
        Files object. Or they send 1080p “because it looks nicer” and the chat
        crushes it to 480p on a slow link anyway.
      </p>
      <h2>What to do, in order</h2>
      <ol>
        <li>
          On Clip, pick Chat / WhatsApp (640 long side, low). Compress. Read
          after-bytes. If after is still 50 MB, go Custom lower. Clip’s own
          input cap (40 MB phone / 80 MB desktop) is RAM, not WhatsApp’s 64/100
          MB send cap — do not mix the numbers as if they were one product.
        </li>
        <li>
          Save to Files on iPhone. On desktop, keep the downloaded MP4.
        </li>
        <li>
          In WhatsApp: if they only need to watch, attach as video. Expect
          recode. If they must keep the file, attach as Document, pick the MP4,
          caption it so they know to save.
        </li>
        <li>
          Ask them to save the file if they need it outside the bubble. The
          bubble is their encode.
        </li>
      </ol>
      <h2>Chat preset is for the bubble, not a master</h2>
      <p>
        The Chat / WhatsApp preset exists so the video-send has less to recode.
        It is 640 on the long side and low quality on purpose. Using 1080p “so
        WhatsApp has something nice to start from” is backwards: you spend RAM
        encoding pixels the chat will throw away.
      </p>
      <p>
        On Web, Document is a distinct item in the attach menu (help
        453914586839706). On iPhone, Document is behind the plus / paperclip. If
        you pick from the gallery, you picked video-send even if the file
        started in Files. The pipe is the picker, not the folder you remember.
      </p>
      <h2>Groups, forwards, and “HD”</h2>
      <p>
        Forwarding a video you received forwards their recode of their recode.
        Clip never sees that object. If you need the small file you made, send
        your Files MP4 as a document, do not forward the bubble you tested with.
      </p>
      <p>
        HD media, when the client shows a toggle, is still WhatsApp’s encode. Do
        not write that HD equals Clip 1080p. Those are different knobs. Group
        chats have the same two pipes.
      </p>
      <h2>Numbers we will not invent</h2>
      <p>
        We will not invent “WhatsApp always compresses to 16 MB.” Help on
        07.09.2026 states 64 MB send/forward maximum, 100 MB / 720p on a fast
        link, 64 MB / 480p on a slow link, 2 GB documents, 90 s Status. If
        WhatsApp changes those numbers, this page’s ceiling does not change:
        video-send is their encoder; document can carry our MP4.
      </p>
      <p>
        A reviewer who opens /whatsapp on Clip and /whatsapp on a PNG tool
        should not see the same skeleton. Clip’s is about a second video encoder
        in a chat.
      </p>
      <p>
        <Link to="/how-to">How to</Link> is the generator.{" "}
        <Link to="/email">Email</Link> is the 25 MB letter.{" "}
        <Link to="/limits">Limits</Link> is Clip’s memory. Homepage:{" "}
        <Link to="/">Compress</Link>. Updated 7 September 2026. Caps cited from
        WhatsApp help 823886715479103 and 453914586839706.
      </p>
    </ArticleLayout>
  );
}
