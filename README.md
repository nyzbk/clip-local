# Clip

**Compress a video in your browser. The file never leaves this device.**

Live: [clip-local.vercel.app](https://clip-local.vercel.app)

Clip shrinks one MP4 / MOV / WebM / MKV / M4V into a smaller playable MP4. Bytes stay in this tab. No account. No watermark. No daily credits. No upload.

## Engines

1. **Primary** — [Mediabunny](https://github.com/Vanilagy/mediabunny) (MPL-2.0) Conversion API, WebCodecs, H.264 (`avc`) + AAC, `tags: {}` strips GPS/title/encoder.
2. **Fallback** — ffmpeg.wasm **self-hosted** at `/ffmpeg/` on this origin. Not unpkg. Not jsDelivr. Not `@ffmpeg/core-mt`. No COEP/COOP.

## Caps (memory, not a paywall)

| Context | Max input |
|---|---|
| Computer | 80 MB |
| Phone | 40 MB |

After Download, the next app may recode:

- iPhone — save to **Files**, not Photos
- WhatsApp — video-send is **their** encoder; document can carry this MP4
- Gmail — 25 MB is the **letter** (help 6584), including MIME

## Develop

```
npm i
npm run dev
```

`postinstall` copies the ST ffmpeg core into `public/ffmpeg/`.

AdSense stays off until Site Ready (`VITE_ADSENSE_LIVE=false`). Auto ads off.

Contact: ultaultimatum@gmail.com — do not email video files.
