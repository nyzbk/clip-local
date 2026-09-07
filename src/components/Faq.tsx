import type { FaqItem } from "@/lib/clip/faq";

export function Faq({ items, title }: { items: FaqItem[]; title: string }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-ink text-2xl tracking-tight">{title}</h2>
      <dl className="mt-6 divide-line divide-y border-line border-t border-b">
        {items.map((item) => (
          <div key={item.q} className="py-5">
            <dt className="text-ink font-medium">{item.q}</dt>
            <dd className="text-muted mt-2 text-pretty leading-relaxed">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
