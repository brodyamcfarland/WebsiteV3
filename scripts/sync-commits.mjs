#!/usr/bin/env node
/**
 * Snapshots commit history for every project into src/data/commits.json.
 *
 *   npm run sync:commits
 *
 * - Local repos (private codebases) are read with `git log` — counts only
 *   commits authored by AUTHOR, plus the whole-repo total for context.
 * - GitHub repos are read through the REST API. Set GITHUB_TOKEN to avoid the
 *   60 req/hr anonymous limit (and to read private repos).
 *
 * The site imports the JSON at build time, so re-run this and commit the
 * result whenever you want the numbers refreshed.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "src/data/commits.json");
const AUTHOR = "brodyamcfarland"; // matches both the gmail and GitHub noreply emails
const PROJECTS_DIR = resolve(ROOT, "..");

/** slug -> source. `local` is relative to the folder that holds this repo. */
const SOURCES = {
  starscript: { local: "starscript/Legends-0.0.2" },
  "breathe-ops": { local: "breathe/breathemso" },
  bitboard: { local: "Skate" },
  bigger: { local: "Bigger.sol", github: "brodyamcfarland/Bigger" },
  "3d-portfolio": { local: "3D-Portfolio", github: "brodyamcfarland/3D-Website" },
};

const git = (cwd, args) =>
  execFileSync("git", ["-C", cwd, ...args], { encoding: "utf8", maxBuffer: 64 << 20 });

function fromLocal(dir) {
  const dates = git(dir, ["log", "--all", `--author=${AUTHOR}`, "--format=%aI"])
    .split("\n")
    .filter(Boolean);
  const total = Number(git(dir, ["rev-list", "--all", "--count"]).trim());
  return { dates, total };
}

async function fromGitHub(repo) {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-sync" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const dates = [];
  let total = 0;
  for (let page = 1; page <= 50; page++) {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=100&page=${page}`,
      { headers }
    );
    if (!res.ok) throw new Error(`${repo}: GitHub ${res.status} ${await res.text()}`);
    const batch = await res.json();
    for (const c of batch) {
      total++;
      const login = c.author?.login ?? "";
      const email = c.commit?.author?.email ?? "";
      if (login === AUTHOR || email.includes(AUTHOR)) dates.push(c.commit.author.date);
    }
    if (batch.length < 100) break;
  }
  return { dates, total };
}

const DAY = 86_400_000;
const isoDay = (t) => new Date(t).toISOString().slice(0, 10);

/** Pick a bucket size that gives a readable bar chart for the project's lifespan. */
function summarize({ dates, total }) {
  const times = dates.map((d) => Date.parse(d)).sort((a, b) => a - b);
  if (!times.length) return { mine: 0, total, activeDays: 0, first: null, last: null, bucket: "day", start: null, series: [] };
  const first = times[0];
  const last = times[times.length - 1];
  const span = last - first;
  const bucket = span < 45 * DAY ? "day" : span < 2 * 365 * DAY ? "week" : "month";

  const startDate = new Date(first);
  let start;
  if (bucket === "day") start = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
  else if (bucket === "week") {
    const d = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
    start = d - ((new Date(d).getUTCDay() + 6) % 7) * DAY; // Monday
  } else start = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1);

  const indexOf = (t) => {
    if (bucket === "day") return Math.floor((t - start) / DAY);
    if (bucket === "week") return Math.floor((t - start) / (7 * DAY));
    const d = new Date(t);
    const s = new Date(start);
    return (d.getUTCFullYear() - s.getUTCFullYear()) * 12 + d.getUTCMonth() - s.getUTCMonth();
  };
  const series = new Array(indexOf(last) + 1).fill(0);
  for (const t of times) series[indexOf(t)]++;

  return {
    mine: times.length,
    total,
    activeDays: new Set(times.map(isoDay)).size,
    first: isoDay(first),
    last: isoDay(last),
    bucket,
    start: isoDay(start),
    series,
  };
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")).projects : {};
const projects = {};

for (const [slug, src] of Object.entries(SOURCES)) {
  const localDir = src.local && resolve(PROJECTS_DIR, src.local);
  try {
    let raw;
    if (localDir && existsSync(resolve(localDir, ".git"))) raw = fromLocal(localDir);
    else if (src.github) raw = await fromGitHub(src.github);
    else throw new Error("no local clone and no GitHub repo configured");
    projects[slug] = summarize(raw);
    console.log(`${slug.padEnd(14)} ${String(projects[slug].mine).padStart(5)} mine / ${projects[slug].total} total`);
  } catch (err) {
    // Keep the last good snapshot rather than wiping a project's stats.
    if (previous[slug]) projects[slug] = previous[slug];
    console.warn(`${slug}: ${err.message}${previous[slug] ? " (kept previous)" : ""}`);
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), projects }) + "\n");
console.log(`\nWrote ${OUT}`);
