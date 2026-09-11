export const SITE_ORIGIN = "https://clip-local.vercel.app";
export const SITE_NAME = "Clip";
export const CONTACT_EMAIL = "ultaultimatum@gmail.com";
export const ADSENSE_CLIENT = "ca-pub-7636435144500691";

export const SITEMAP_PATHS = [
  "/",
  "/how-to",
  "/whatsapp",
  "/email",
  "/iphone",
  "/limits",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export const SITEMAP_LASTMOD = "2026-09-07";

export const PAGE_SEO: Record<
  (typeof SITEMAP_PATHS)[number],
  { title: string; description: string }
> = {
  "/": {
    title: "Compress Video Online — Free, No Upload | Clip",
    description:
      "Compress MP4 and MOV in your browser. The file never leaves this device. No signup, no watermark, no daily limit.",
  },
  "/how-to": {
    title: "How to Compress a Video in Your Browser — No Upload | Clip",
    description:
      "Drop an MP4 or MOV, pick a preset, download a smaller file. Clip runs in this tab.",
  },
  "/whatsapp": {
    title: "Compress Video for WhatsApp — Video-Send vs Document | Clip",
    description:
      "A WhatsApp video-send is their encoder. A document can carry Clip’s MP4.",
  },
  "/email": {
    title: "Compress Video for Email — Gmail 25 MB Is the Letter | Clip",
    description:
      "Gmail’s 25 MB cap is the message, including MIME. Clip only shrinks the attachment.",
  },
  "/iphone": {
    title: "Save a Compressed MP4 on iPhone — Files vs Photos | Clip",
    description:
      "Safari Download is not Chrome’s list. Photos may recode. Files holds Clip’s MP4.",
  },
  "/limits": {
    title: "Video Size Limits — 80 MB / 40 MB Memory Caps | Clip",
    description:
      "Clip never uploads. The cap is your browser’s memory.",
  },
  "/faq": {
    title: "Clip FAQ — Upload, WhatsApp, Gmail, iPhone",
    description:
      "Answers: no upload, no watermark, Files vs Photos, video-send vs document, 25 MB letter.",
  },
  "/about": {
    title: "About Clip — In-Browser Video Compressor",
    description:
      "Private compressor. Mediabunny + self-hosted FFmpeg. Built by Ultimatum.",
  },
  "/contact": {
    title: "Contact Clip",
    description: "ultaultimatum@gmail.com — do not email video files.",
  },
  "/privacy": {
    title: "Privacy — Clip",
    description: "Video stays in this tab. No upload. Ads do not get frames.",
  },
  "/terms": {
    title: "Terms — Clip",
    description: "Not a studio, not a downloader, not a watermark-remover.",
  },
};

export function canonical(path: string) {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_ORIGIN,
        description: PAGE_SEO["/"].description,
      },
      {
        "@type": "WebApplication",
        name: "Clip — Compress Video in Your Browser",
        url: SITE_ORIGIN,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        browserRequirements: "Requires HTML5 and a modern browser.",
      },
      {
        "@type": "Organization",
        name: "Ultimatum",
        email: CONTACT_EMAIL,
        url: SITE_ORIGIN,
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function pageHead(
  path: (typeof SITEMAP_PATHS)[number],
  extraScripts: { type: string; children: string }[] = [],
) {
  const seo = PAGE_SEO[path];
  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "google-adsense-account", content: ADSENSE_CLIENT },
      { name: "theme-color", content: "#0E1110" },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:url", content: canonical(path) },
      { property: "og:image", content: `${SITE_ORIGIN}/og.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_ORIGIN}/og.jpg` },
    ],
    links: [{ rel: "canonical", href: canonical(path) }],
    scripts: extraScripts,
  };
}
