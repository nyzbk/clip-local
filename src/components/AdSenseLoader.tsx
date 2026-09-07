import { useEffect } from "react";
import { ADSENSE_CLIENT } from "@/lib/seo";

const LIVE = import.meta.env.VITE_ADSENSE_LIVE === "true";

/**
 * AdSense JS is injected after mount and only when LIVE.
 * Putting pagead2 in SSR <head> lets adsbygoogle insert
 * <ins class="adsbygoogle-noablate"> before hydrate (Auto ads probe).
 * Day 0: ads.txt + meta google-adsense-account stay; Auto ads stay off.
 */
export function AdSenseLoader() {
  useEffect(() => {
    if (!LIVE) return;
    if (document.querySelector("script[data-clip-adsense]")) return;
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.clipAdsense = "1";
    document.head.appendChild(script);
  }, []);
  return null;
}
