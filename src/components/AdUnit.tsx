import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/seo";

type SlotName = "after-success" | "mid" | "footer";

const SLOT_ENV: Record<SlotName, string | undefined> = {
  "after-success": import.meta.env.VITE_ADSENSE_SLOT_AFTER_SUCCESS,
  mid: import.meta.env.VITE_ADSENSE_SLOT_MID,
  footer: import.meta.env.VITE_ADSENSE_SLOT_FOOTER,
};

const LIVE = import.meta.env.VITE_ADSENSE_LIVE === "true";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdUnit({ slot }: { slot: SlotName }) {
  const ref = useRef<HTMLModElement>(null);
  const slotId = SLOT_ENV[slot]?.trim();
  const live = LIVE && Boolean(slotId);

  useEffect(() => {
    if (!live) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* placeholder until Ready */
    }
  }, [live]);

  if (!live) {
    return (
      <aside
        data-ad-slot={slot}
        className="border-line text-muted my-6 rounded-md border border-dashed px-4 py-6 text-center font-mono text-xs tracking-wide"
      >
        Ad placeholder · {slot}
      </aside>
    );
  }

  return (
    <aside className="my-6 overflow-hidden">
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
