export const SITE_ORIGIN = "https://clip-local.vercel.app";
export const SITE_NAME = "Clip";
export const CONTACT_EMAIL = "ultaultimatum@gmail.com";
export const ADSENSE_CLIENT = "ca-pub-7636435144500691";
export const HUB_URL = "https://ultimatum-hub.vercel.app/";
export const SITEMAP_LASTMOD = "2026-09-13";
export const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;

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

export type SitemapPath = (typeof SITEMAP_PATHS)[number];

export const PAGE_SEO: Record<SitemapPath, { title: string; description: string }> =
  {
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
      description: "Clip never uploads. The cap is your browser’s memory.",
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

const CRUMB: Record<SitemapPath, string> = {
  "/": "Clip",
  "/how-to": "How to",
  "/whatsapp": "WhatsApp",
  "/email": "Email",
  "/iphone": "iPhone",
  "/limits": "Limits",
  "/faq": "FAQ",
  "/about": "About",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

const publisher = {
  "@type": "Organization",
  name: "Ultimatum",
  email: CONTACT_EMAIL,
  url: HUB_URL,
  sameAs: [HUB_URL],
};

export function canonical(path: string) {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absUrl(path: string) {
  return canonical(path);
}

function socialMeta(title: string, description: string, url: string) {
  return [
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    description: PAGE_SEO["/"].description,
    inLanguage: "en",
    publisher,
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

function webApplicationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Clip — Compress Video in Your Browser",
    url: `${SITE_ORIGIN}/`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements:
      "Requires HTML5 and a modern browser. Video bytes stay in this tab.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
    featureList: [
      "Compress MP4 / MOV / WebM in the tab",
      "Mediabunny WebCodecs first",
      "FFmpeg wasm self-hosted at /ffmpeg/",
      "No upload",
      "No watermark",
    ],
    publisher,
    screenshot: OG_IMAGE,
  };
}

function howToJsonLd(name: string, description: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime: "PT3M",
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export const HOWTO_STEPS = [
  "Open Clip on the device that holds the video.",
  "Drop one MP4, MOV, WebM, MKV or M4V (80 MB on a computer, 40 MB on a phone).",
  "Read the card, then pick Chat, Email, 720p or 1080p.",
  "Press Compress. Mediabunny/WebCodecs runs first. FFmpeg loads from /ffmpeg/ on this origin only if this browser cannot encode.",
  "Download the MP4. On iPhone save to Files, not Photos.",
];

export const WHATSAPP_STEPS = [
  "Compress with the Chat preset in this tab. The file is not uploaded.",
  "Download the MP4.",
  "Send it as a WhatsApp document. A video-send is WhatsApp’s encoder, not Clip’s.",
];

export const EMAIL_STEPS = [
  "Compress toward well under 20 MB. Gmail’s 25 MB cap is the whole letter, including MIME.",
  "Download the MP4.",
  "Attach the Files object. Insert-from-camera-roll may recode.",
];

export const IPHONE_STEPS = [
  "Compress in Safari on the iPhone that holds the clip.",
  "When the in-tab preview plays, use Save to Files.",
  "Keep the master in Files. Photos may recode for iCloud.",
];

type PageHeadExtra = {
  faqs?: readonly { q: string; a: string }[];
  howToName?: string;
  howToSteps?: string[];
  includeApp?: boolean;
  legal?: boolean;
};

export function pageHead(path: SitemapPath, extra: PageHeadExtra = {}) {
  const seo = PAGE_SEO[path];
  const url = canonical(path);
  const scripts: { type: string; children: string }[] = [];

  if (!extra.legal) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(websiteJsonLd()),
    });
    const crumbs =
      path === "/"
        ? [{ name: "Clip", path: "/" as const }]
        : [
            { name: "Clip", path: "/" as const },
            { name: CRUMB[path], path },
          ];
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbJsonLd(crumbs)),
    });
    if (extra.includeApp) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(webApplicationJsonLd(seo.description)),
      });
    }
    if (extra.faqs?.length) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd([...extra.faqs])),
      });
    }
    if (extra.howToName && extra.howToSteps?.length) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(
          howToJsonLd(extra.howToName, seo.description, extra.howToSteps),
        ),
      });
    }
  }

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "google-adsense-account", content: ADSENSE_CLIENT },
      { name: "theme-color", content: "#0E1110" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      ...socialMeta(seo.title, seo.description, url),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts,
  };
}
