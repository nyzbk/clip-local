import { createFileRoute } from "@tanstack/react-router";

const BODY = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: Yandex
Allow: /

Sitemap: https://clip-local.vercel.app/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(BODY, {
          headers: { "content-type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
