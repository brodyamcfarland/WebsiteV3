import { useEffect, useRef, type RefObject } from "react";

/**
 * Vercel Web Analytics, without the npm package (its optional Remix peer
 * conflicts with React 19). This is what @vercel/analytics does under the
 * hood: queue calls on window.va until /_vercel/insights/script.js loads.
 *
 * Page views are automatic once the script is on the page. Custom events
 * (everything below) need Web Analytics custom events enabled on the
 * Vercel project (Pro plan). Keep to <= 2 properties per event.
 */
type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    va?: (event: "event" | "beforeSend" | "pageview", data?: unknown) => void;
    vaq?: unknown[][];
  }
}

export function initAnalytics() {
  if (typeof window === "undefined" || window.va) return;
  window.va = function (...args) {
    (window.vaq = window.vaq || []).push(args);
  };
}

export function track(name: string, data?: Props) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    console.debug("[track]", name, data ?? "");
    return;
  }
  initAnalytics();
  window.va?.("event", { name, data });
}

const seen = new Set<string>();

/**
 * Fires `name` once per page load when the element has been at least
 * `threshold` visible for `dwellMs` — so a fast scroll past doesn't count
 * as "looked at".
 */
export function useTrackView<T extends Element>(
  name: string,
  data: Props,
  { threshold = 0.5, dwellMs = 1200 } = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const key = `${name}:${JSON.stringify(data)}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || seen.has(key)) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => {
            if (seen.has(key)) return;
            seen.add(key);
            track(name, data);
            io.disconnect();
          }, dwellMs);
        } else window.clearTimeout(timer);
      },
      { threshold },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, threshold, dwellMs]);

  return ref;
}
