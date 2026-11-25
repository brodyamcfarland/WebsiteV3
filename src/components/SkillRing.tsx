import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import ThreeFiber from "./ThreeFiber";
import { track } from "../lib/track";

const skillImages = [
  { src: "/NEXTJS.png", title: "Next JS", alt: "NextJS Image" },
  { src: "/CLAUDE.svg", title: "Claude Code", alt: "Claude Image" },
  { src: "/REACT.png", title: "React JS", alt: "React Image" },
  { src: "/REACTNATIVE.png", title: "React Native", alt: "React Native Image" },
  { src: "/TS.png", title: "Typescript", alt: "Typescript Image" },
  { src: "/NODE.png", title: "Node JS", alt: "Node JS Image" },
  { src: "/TAILWIND.png", title: "Tailwind CSS", alt: "Tailwind CSS Image" },
  { src: "/THREEJS.png", title: "Three JS", alt: "THREE JS Image" },
  { src: "/GITLOGO.png", title: "GIT", alt: "GIT Image" },
  { src: "/POSTGRES.png", title: "Postgres", alt: "Postgres Image" },
  { src: "/FIREBASE.png", title: "Firebase", alt: "Firebase Image" },
  { src: "/SUPABASE.jpg", title: "Supabase", alt: "Supabase Image" },
  { src: "/MONGODB_LOGO.png", title: "Mongo DB", alt: "Mongo DB Image" },
  { src: "/PRISMA.png", title: "Prisma", alt: "Prisma Image" },
  { src: "/SOLIDITY.png", title: "Solidity", alt: "Solidity Image" },
];

type Skill = {
  src: string | null;
  title: string | null;
  alt: string | null;
};
interface Props {
  selectedSkill: Skill | null;
  setSelectedSkill: Dispatch<SetStateAction<Skill | null>>;
}

// Orbit shape, relative to the portrait's radius R
const RX = 1.32; // horizontal radius
const RY = 0.36; // vertical radius (how "flat" the tilted ring looks)
const CY = 0.3; // ring centre sits below the portrait centre, so the front passes the chest, not the face
const TILT = (-14 * Math.PI) / 180; // ring leans down to the right
const SPEED = 0.00016; // radians per ms (~40s per lap)
const INTRO_DELAY = 1100; // ms, matches the portrait fade-in
const INTRO_MS = 1400;
const CHIP_PAD = 1.8; // particle canvas is this much larger than the chip

type Dot = { x: number; y: number; c: string; g: string; r: number; a: number }; // c = colour, g = greyscale

/** Sample a logo into coloured dots on a unit circle (-1..1), plus a dotted rim. */
async function sampleLogo(src: string, grid = 40): Promise<Dot[]> {
  const img = new window.Image();
  img.src = src;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = c.height = grid;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  // object-contain into the circle, leaving room for the rim
  const s = (grid * 0.78) / Math.max(img.width, img.height);
  const w = img.width * s;
  const h = img.height * s;
  ctx.drawImage(img, (grid - w) / 2, (grid - h) / 2, w, h);
  const { data } = ctx.getImageData(0, 0, grid, grid);
  const dots: Dot[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const i = (y * grid + x) * 4;
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (a < 60 || lum < 0.12) continue; // skip transparent + black backgrounds
      const u = ((x + 0.5) / grid) * 2 - 1;
      const v = ((y + 0.5) / grid) * 2 - 1;
      if (u * u + v * v > 0.8) continue;
      const grey = Math.round(90 + lum * 165); // lifted so dark brand colours still read
      dots.push({
        x: u,
        y: v,
        c: `rgb(${r} ${g} ${b})`,
        g: `rgb(${grey} ${grey} ${grey + 6})`,
        r: Math.random(),
        a: Math.min(1, a / 255),
      });
    }
  }
  // Dotted rim where the old circular border was
  const rim = 30;
  for (let k = 0; k < rim; k++) {
    const t = (k / rim) * Math.PI * 2;
    const rimColour = "rgb(220 226 236)";
    dots.push({ x: Math.cos(t) * 0.97, y: Math.sin(t) * 0.97, c: rimColour, g: rimColour, r: Math.random(), a: 0.35 });
  }
  return dots;
}

/**
 * Skill logos orbit the portrait on a tilted 3-D ring. The near half of the
 * ring renders above the portrait (z-20) and the far half below it (z-0), so
 * logos pass behind the photo and come back around in front. Positions are
 * written straight to the DOM each frame, so there are no React re-renders.
 *
 * Must render inside the same stacking context as the portrait (z-10).
 */
const SkillRing = ({ selectedSkill, setSelectedSkill }: Props) => {
  const wrap = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);
  const paused = useRef(false);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const focus = useRef<number[]>(skillImages.map(() => 0)); // 0 loose .. 1 sharp
  const hovered = useRef<number>(-1);
  const selectedIndex = useRef(-1);
  selectedIndex.current = skillImages.findIndex((s) => s.src === selectedSkill?.src);
  const label = useRef<HTMLSpanElement>(null); // name pill that follows the selected logo

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const dotSets: (Dot[] | null)[] = skillImages.map(() => null);
    skillImages.forEach((s, i) =>
      sampleLogo(s.src)
        .then((d) => (dotSets[i] = d))
        .catch(() => {}),
    );
    const drawChip = (i: number, now: number, intro: number) => {
      const cv = canvases.current[i];
      const dots = dotSets[i];
      if (!cv || !dots) return;
      const size = cv.clientWidth; // canvas is CHIP_PAD x the chip, so pushed dots aren't clipped
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const px = Math.round(size * dpr);
      if (cv.width !== px) cv.width = cv.height = px;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      const want = hovered.current === i || selectedIndex.current === i ? 1 : 0;
      const f = (focus.current[i] += (want - focus.current[i]) * 0.12);
      const t = now / 1000;
      const c = px / 2;
      const R = c / CHIP_PAD; // logo radius in canvas px
      const jitter = (1 - f) * R * 0.024 + (1 - intro) * R * 1.2;
      const dot = Math.max(1, (2 * R) / 40) * (1.05 + f * 0.2);

      ctx.clearRect(0, 0, px, px);
      for (const d of dots) {
        const ox = reduce ? 0 : Math.sin(t * 1.7 + d.r * 40) * jitter * (0.4 + d.r);
        const oy = reduce ? 0 : Math.cos(t * 1.3 + d.r * 30) * jitter * (0.4 + d.r);
        const a = d.a * (0.7 + f * 0.3) * (0.75 + 0.25 * Math.sin(t * 2 + d.r * 20));
        const x = c + d.x * R * 0.96 + ox - dot / 2;
        const y = c + d.y * R * 0.96 + oy - dot / 2;
        // Greyscale by default; brand colour fades in on hover / tap
        if (f < 0.98) {
          ctx.globalAlpha = a * (1 - f);
          ctx.fillStyle = d.g;
          ctx.fillRect(x, y, dot, dot);
        }
        if (f > 0.02) {
          ctx.globalAlpha = a * f;
          ctx.fillStyle = d.c;
          ctx.fillRect(x, y, dot, dot);
        }
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = skillImages.length;
    const cos = Math.cos(TILT);
    const sin = Math.sin(TILT);
    const start = performance.now();
    let angle = 0;
    let last = start;
    let raf = 0;
    let visible = true;
    let tick = 0;
    const blurs = skillImages.map(() => -1);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    // Ring's left edge on screen (only changes on resize / rotate)
    let wrapLeft = el.getBoundingClientRect().left;
    const ro = new ResizeObserver(() => (wrapLeft = el.getBoundingClientRect().left));
    ro.observe(document.documentElement);

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!paused.current && !reduce) angle += dt * SPEED;

      if (visible) {
        const R = el.offsetWidth / 2;
        // Intro: logos fan out from the portrait and fade in
        const p = reduce ? 1 : Math.min(1, Math.max(0, (now - start - INTRO_DELAY) / INTRO_MS));
        const ease = 1 - Math.pow(1 - p, 3);
        const spread = 0.55 + 0.45 * ease;

        for (let i = 0; i < n; i++) {
          const node = chips.current[i];
          if (!node) continue;
          const t = angle + (i / n) * Math.PI * 2 + (1 - ease) * 1.2;
          const ex = Math.cos(t) * R * RX * spread;
          const ey = Math.sin(t) * R * RY * spread;
          const x = R + ex * cos - ey * sin;
          const y = R + R * CY + ex * sin + ey * cos;
          const depth = Math.sin(t); // -1 = far side, 1 = near side
          const scale = 0.68 + (depth + 1) * 0.2;
          node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
          node.style.zIndex = depth > 0 ? "20" : "0";
          // No backdrop disc any more: chips on the far side fade out and
          // soften so they read as passing behind the particle portrait.
          const alpha = ease * (depth >= 0 ? 0.6 + depth * 0.4 : 0.6 + depth * 0.5);
          node.style.opacity = String(alpha);
          // Blur in 0.5px steps, written only when it changes (re-rastering a
          // filter every frame is expensive on phones)
          const blur = depth < 0 ? Math.round(-depth * 5) / 2 : 0;
          if (blurs[i] !== blur) {
            blurs[i] = blur;
            node.style.filter = blur ? `blur(${blur}px)` : "";
          }
          // Particle redraw at ~30fps; skip chips that are nearly invisible
          if (tick % 2 === i % 2 && alpha > 0.12) drawChip(i, now, ease);
          // Name pill rides just under the selected logo, and fades out while
          // the logo passes behind the portrait so it never covers the face
          const tag = label.current;
          if (tag && i === selectedIndex.current) {
            const below = (node.offsetHeight / 2) * scale + 6;
            // keep the pill on screen when the logo is near the edge
            const half = tag.offsetWidth / 2;
            const lo = 8 - wrapLeft + half;
            const hi = document.documentElement.clientWidth - 8 - wrapLeft - half;
            const px = Math.min(Math.max(x, lo), Math.max(lo, hi));
            tag.style.transform = `translate3d(${px}px, ${y + below}px, 0) translate(-50%, 0)`;
            tag.style.opacity = String(ease * Math.min(1, Math.max(0, depth * 3 + 1)));
          }
        }
      }
      tick++;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  // Ring guide line: an ellipse in a 200x200 box matching the portrait, so it
  // scales with it. Drawn twice: full ring behind the portrait, front half on top.
  const ring = (
    <g transform={`rotate(${(TILT * 180) / Math.PI} 100 ${100 + 100 * CY})`}>
      <ellipse
        cx="100"
        cy={100 + 100 * CY}
        rx={100 * RX}
        ry={100 * RY}
        fill="none"
        stroke="rgb(255 255 255 / 0.16)"
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0" aria-label="Skills" role="group">
      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 z-0 h-full w-full overflow-visible">
        {ring}
      </svg>
      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 z-20 h-full w-full overflow-visible">
        <defs>
          <clipPath id="ring-front">
            {/* near half of the ring (below its tilted centre line) */}
            <rect x="-100" y={100 + 100 * CY} width="400" height="200" transform={`rotate(${(TILT * 180) / Math.PI} 100 ${100 + 100 * CY})`} />
          </clipPath>
        </defs>
        <g clipPath="url(#ring-front)">{ring}</g>
      </svg>

      {skillImages.map((image, i) => {
        const selected = image.src === selectedSkill?.src;
        return (
          <button
            key={image.src}
            ref={(node) => {
              chips.current[i] = node;
            }}
            type="button"
            title={image.title}
            aria-label={image.title}
            aria-pressed={selected}
            onClick={() => {
              setSelectedSkill(image);
              track("skill_tap", { skill: image.title });
            }}
            onPointerEnter={(e) => {
              hovered.current = i;
              if (e.pointerType === "mouse") paused.current = true;
            }}
            onPointerLeave={() => {
              hovered.current = -1;
              paused.current = false;
            }}
            style={{ opacity: 0 }}
            className="skill-chip pointer-events-auto absolute top-0 left-0 will-change-transform"
          >
            {/* Logo drawn as particles (see sampleLogo / drawChip) */}
            <canvas
              ref={(node) => {
                canvases.current[i] = node;
              }}
              aria-hidden
              className={`skill-particles ${selected ? "animate-skill-tap skill-particles-on" : ""}`}
            />
          </button>
        );
      })}

      {selectedSkill?.title && (
        <span
          ref={label}
          aria-hidden
          style={{ opacity: 0 }}
          className="pointer-events-none absolute top-0 left-0 z-30 whitespace-nowrap rounded-full border border-white/15 bg-ink/85 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white will-change-transform md:px-3 md:py-1 md:text-xs"
        >
          {selectedSkill.title}
        </span>
      )}

      {/* 3-D site link: top-right of the portrait, clear of the orbit */}
      <div className="pointer-events-auto absolute top-[4%] right-[-6%] z-30 md:top-[6%] md:right-[-4%]">
        <ThreeFiber />
      </div>
    </div>
  );
};

export default SkillRing;
