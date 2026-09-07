export type FaqItem = { q: string; a: string };

export const homeFaq: FaqItem[] = [
  {
    q: "Do you upload my video?",
    a: "No. The file stays in this tab. Clip never POSTs the bytes to a server or a GPU farm.",
  },
  {
    q: "Why is the first run slow?",
    a: "The first visit loads engine code from this site. Mediabunny is small. FFmpeg fallback is ~30 MB, only if WebCodecs cannot encode, and only from /ffmpeg/ on this origin — not a CDN. After that, cache keeps it.",
  },
  {
    q: "Do you add a watermark?",
    a: "No. There is no daily quota either. Size caps are memory: 80 MB on a computer, 40 MB on a phone.",
  },
  {
    q: "Where does the file go on iPhone?",
    a: "Save to Files, not Photos. Photos may recode. Safari Download is not Chrome’s list. Read the iPhone page.",
  },
  {
    q: "Will WhatsApp keep this quality?",
    a: "A video-send is their encoder. A document can carry Clip’s MP4. Clip cannot disable their compress. Read WhatsApp.",
  },
  {
    q: "Will Gmail take this file?",
    a: "Gmail’s 25 MB is the letter, including MIME — help 6584, not Clip. Aim well under 20 MB after Compress. Read Email.",
  },
];

export const iphoneFaq: FaqItem[] = [
  {
    q: "Safari has no Downloads list. Did Clip fail?",
    a: "No. If the in-tab preview played, Clip wrote an MP4. Use Save to Files and open that object in Files.",
  },
  {
    q: "I saved to Photos and the file is large again.",
    a: "Photos is a camera roll. It may recode for iCloud. Recents is not Downloads. Keep the master in Files.",
  },
  {
    q: "Does Optimise iPhone Storage change my MP4?",
    a: "It can replace a roll item with a derivative. Keep Clip’s file in Files even if you also drop a preview on the roll.",
  },
  {
    q: "Is this a HEIC converter?",
    a: "No. Clip compresses video. Stills are a different job.",
  },
];

export const whatsappFaq: FaqItem[] = [
  {
    q: "Video or document?",
    a: "Video-send = their recode (help: 64 MB send/forward max, 100 MB/720p on a fast link). Document = file up to 2 GB, often no inline player.",
  },
  {
    q: "Does the HD toggle keep Clip’s file?",
    a: "No. HD is still their encode. It is not our 720p preset.",
  },
  {
    q: "Can I use Status as the archive?",
    a: "No. Status video is 90 seconds. Keep the MP4 in Files.",
  },
  {
    q: "Can Clip turn off WhatsApp compression?",
    a: "No. Success for keeping bytes is document-send of the Files object.",
  },
];

export const emailFaq: FaqItem[] = [
  {
    q: "Why 25 MB?",
    a: "Google’s Gmail help (6584): personal accounts, 25 MB per message. That is the letter, not Clip’s encoder.",
  },
  {
    q: "I attached 24 MB and it bounced.",
    a: "MIME inflates. Aim well under 20 MB after Compress. If Gmail inserted a Drive link, that is Gmail’s fallback — Clip does not upload to Drive.",
  },
  {
    q: "Should I insert from the camera roll?",
    a: "Attach the Files object. Insert-from-roll may recode.",
  },
  {
    q: "Does the Email preset guarantee 25 MB?",
    a: "No. It is 720p medium — a starting point. Read the after-bytes.",
  },
];

export const faqPageItems: FaqItem[] = [
  ...homeFaq,
  {
    q: "Which formats can I drop?",
    a: "MP4, MOV, WebM, MKV, M4V. Output is always MP4 (H.264 + AAC) for the next app to play.",
  },
  {
    q: "Is FFmpeg coming from a CDN?",
    a: "No. Core loads from /ffmpeg/ on this site. unpkg and jsDelivr are release blockers.",
  },
  {
    q: "Do you keep the file?",
    a: "No. Closing the tab drops it. tags {} strips GPS and titles on export.",
  },
  {
    q: "Can I remove a watermark?",
    a: "No. Clip is not a watermark-remover. That job is not allowed here.",
  },
  {
    q: "Can I paste a YouTube link?",
    a: "No. Clip is not a downloader. Drop a file you already have.",
  },
  {
    q: "Will ads see my video?",
    a: "No. Ads, if this origin is ever Ready, measure page views. Until then the slots are placeholders. Auto ads stay off.",
  },
  {
    q: "Why did the output get bigger?",
    a: "Some files are already small. Clip warns and still lets you download. Try Chat or 720p. We will not label a larger file “compressed.”",
  },
  {
    q: "WebCodecs or FFmpeg — who decides?",
    a: "If this browser can encode with VideoEncoder, Mediabunny runs first. Otherwise FFmpeg from /ffmpeg/. The badge tells you which.",
  },
];
