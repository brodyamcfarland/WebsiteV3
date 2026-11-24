import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { bucketLabel, formatMonth, type CommitStats } from "../lib/commits";

/**
 * Commit history for one project (my commits only), styled for the dark
 * project cards. Bars grow in when scrolled into view; hover / tap a bar to
 * read its count.
 */
export default function CommitChart({
  stats,
  team = false,
}: {
  stats: CommitStats;
  team?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...stats.series);
  const n = stats.series.length;

  const pick = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setHover(
      Math.max(0, Math.min(n - 1, Math.floor(((clientX - r.left) / r.width) * n))),
    );
  };

  return (
    <div className="mt-5 rounded-xl border border-white/5 bg-black/30 p-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-white tabular-nums">
            {stats.mine.toLocaleString()}
          </span>
          <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            commits by me
          </span>
        </p>
        <p className="text-[11px] text-gray-500 tabular-nums">
          {stats.activeDays} active days
          {team && stats.total > stats.mine && (
            <> · {stats.total.toLocaleString()} team total</>
          )}
        </p>
      </div>

      <div
        ref={ref}
        role="img"
        aria-label={`${stats.mine} commits between ${stats.first} and ${stats.last}`}
        onPointerMove={(e) => pick(e.clientX)}
        onPointerDown={(e) => pick(e.clientX)}
        onPointerLeave={() => setHover(null)}
        className="mt-3 flex h-12 touch-pan-y items-end gap-[2px]"
      >
        {stats.series.map((v, i) => (
          <span
            key={i}
            className={`flex-1 origin-bottom rounded-t-[2px] transition-[transform,background-color] duration-700 ease-out ${
              !v ? "bg-white/10" : i === hover ? "bg-accent" : "bg-white/35"
            }`}
            style={{
              height: v ? `${Math.max(8, (v / max) * 100)}%` : "2px",
              transform: `scaleY(${inView ? 1 : 0})`,
              transitionDelay:
                inView && hover === null ? `${(i / n) * 500}ms` : "0ms",
            }}
          />
        ))}
      </div>

      <div className="mt-1.5 flex justify-between gap-3 text-[10px] text-gray-500 tabular-nums">
        {hover === null ? (
          <>
            <span>{stats.first && formatMonth(stats.first)}</span>
            <span>{stats.last && formatMonth(stats.last)}</span>
          </>
        ) : (
          <span className="text-accent">
            {bucketLabel(stats, hover)} · {stats.series[hover]} commit
            {stats.series[hover] === 1 ? "" : "s"}
          </span>
        )}
      </div>
    </div>
  );
}
