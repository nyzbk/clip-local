import { CONTACT_EMAIL } from "@/lib/seo";

export function SoftAgencyCta() {
  return (
    <p className="text-muted text-sm leading-relaxed">
      Built by Ultimatum — $10k websites, brand systems, free tools.{" "}
      <a
        className="text-accent hover:text-accent-2 underline-offset-4 hover:underline"
        href={`mailto:${CONTACT_EMAIL}`}
      >
        {CONTACT_EMAIL}
      </a>
    </p>
  );
}
