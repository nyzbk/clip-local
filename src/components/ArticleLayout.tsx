import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteShell } from "./SiteShell";
import { Prose } from "./Prose";
import { Faq } from "./Faq";
import { AdUnit } from "./AdUnit";
import type { FaqItem } from "@/lib/clip/faq";

export function ArticleLayout({
  kicker,
  h1,
  children,
  faq,
  faqTitle,
}: {
  kicker: string;
  h1: string;
  children: ReactNode;
  faq?: FaqItem[];
  faqTitle?: string;
}) {
  return (
    <SiteShell>
      <p className="text-muted text-sm">
        <Link to="/" className="text-accent">
          Clip
        </Link>{" "}
        / {kicker}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-3xl leading-tight sm:text-4xl">
        {h1}
      </h1>
      <div className="mt-8">
        <Prose>{children}</Prose>
      </div>
      {faq && faqTitle ? <Faq items={faq} title={faqTitle} /> : null}
      <AdUnit slot="footer" />
    </SiteShell>
  );
}
