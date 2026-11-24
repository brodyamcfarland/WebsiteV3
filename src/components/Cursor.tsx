import { useEffect, useRef } from "react";

const MAGNETIC = ".btn-primary, .btn-ghost, .icon-btn";
const INTERACTIVE = "a, button, [role='button'], label, summary";
const TEXT = "input, textarea, select, [contenteditable='true']";

/**
 * Custom cursor (blue dot + trailing ring) and magnetic buttons.
 * Mouse / trackpad only: does nothing on touch devices or when the visitor
 * prefers reduced motion, so the native cursor and plain buttons remain.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    const d = dot.current;
    const r = ring.current;
    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let shown = false;
    let magnet: HTMLElement | null = null;
    let raf = 0;

    const release = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!shown) {
        shown = true;
        lag.x = pos.x;
        lag.y = pos.y;
        root.classList.add("cursor-visible");
      }
      const el = e.target as Element | null;
      const overText = !!el?.closest(TEXT);
      root.classList.toggle("cursor-text", overText);
      targetScale = el?.closest(INTERACTIVE) ? 1.8 : 1;
      r.classList.toggle("cursor-ring-active", targetScale > 1);

      // Magnetic pull toward the pointer
      const m = el?.closest<HTMLElement>(MAGNETIC) ?? null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const b = m.getBoundingClientRect();
        const dx = e.clientX - (b.left + b.width / 2);
        const dy = e.clientY - (b.top + b.height / 2);
        m.style.translate = `${dx * 0.28}px ${dy * 0.35}px`;
      }
    };
    const onLeave = () => {
      shown = false;
      root.classList.remove("cursor-visible");
      release();
    };
    const onDown = () => (targetScale *= 0.8);

    const tick = () => {
      lag.x += (pos.x - lag.x) * 0.18;
      lag.y += (pos.y - lag.y) * 0.18;
      scale += (targetScale - scale) * 0.2;
      d.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      r.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      release();
      root.classList.remove("has-cursor", "cursor-visible", "cursor-text");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dot} aria-hidden className="cursor-dot" />
      <div ref={ring} aria-hidden className="cursor-ring" />
    </>
  );
}
