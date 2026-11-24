import snapshot from "../data/commits.json";

export type CommitStats = {
  mine: number;
  total: number;
  activeDays: number;
  first: string | null;
  last: string | null;
  bucket: "day" | "week" | "month";
  start: string | null;
  series: number[];
};

const projects = snapshot.projects as Record<string, CommitStats>;
export const commitsGeneratedAt = snapshot.generatedAt;

export const getCommits = (slug: string): CommitStats | undefined =>
  projects[slug];

const DAY = 86_400_000;

/** Start date of bucket `i` for a project's series. */
export function bucketDate(stats: CommitStats, i: number): Date {
  const s = new Date(stats.start + "T00:00:00Z");
  if (stats.bucket === "day") return new Date(s.getTime() + i * DAY);
  if (stats.bucket === "week") return new Date(s.getTime() + i * 7 * DAY);
  return new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth() + i, 1));
}

const fmtMonth = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const fmtDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const formatMonth = (d: Date | string) =>
  fmtMonth.format(typeof d === "string" ? new Date(d + "T00:00:00Z") : d);

export function bucketLabel(stats: CommitStats, i: number) {
  const d = bucketDate(stats, i);
  if (stats.bucket === "month") return fmtMonth.format(d);
  if (stats.bucket === "week") return `Week of ${fmtDay.format(d)}`;
  return fmtDay.format(d);
}

/** "YYYY-MM" keys */
const monthKey = (d: Date) =>
  `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;

/** Re-buckets every project's series into calendar months (for the timeline). */
export function monthlyTimeline(slugs: string[]) {
  const rows = slugs.map((slug) => {
    const stats = projects[slug];
    const months = new Map<string, number>();
    stats?.series.forEach((n, i) => {
      if (!n) return;
      const k = monthKey(bucketDate(stats, i));
      months.set(k, (months.get(k) ?? 0) + n);
    });
    return { slug, months };
  });

  const keys = rows.flatMap((r) => [...r.months.keys()]).sort();
  if (!keys.length)
    return {
      columns: [] as string[],
      rows: [] as { slug: string; cells: number[] }[],
      max: 0,
    };
  const [fy, fm] = keys[0].split("-").map(Number);
  const [ly, lm] = keys[keys.length - 1].split("-").map(Number);
  const columns: string[] = [];
  for (
    let y = fy, m = fm;
    y < ly || (y === ly && m <= lm);
    m === 12 ? (y++, (m = 1)) : m++
  ) {
    columns.push(`${y}-${String(m).padStart(2, "0")}`);
  }
  let max = 0;
  const out = rows.map(({ slug, months }) => {
    const cells = columns.map((c) => months.get(c) ?? 0);
    max = Math.max(max, ...cells);
    return { slug, cells };
  });
  return { columns, rows: out, max };
}

export const totals = () => {
  const all = Object.values(projects);
  const firsts = all
    .map((p) => p.first)
    .filter(Boolean)
    .sort() as string[];
  return {
    commits: all.reduce((s, p) => s + p.mine, 0),
    activeDays: all.reduce((s, p) => s + p.activeDays, 0),
    since: firsts[0] ?? null,
  };
};
