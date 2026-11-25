// Generates public/og.png (the 1200x630 link-preview image) to match the
// site's look: black background, the portrait drawn as white particle dots,
// silver dust, and a faint blue glow. Run with: npm run og
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

// Seeded random so the image is stable between runs
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// --- Portrait as dots -------------------------------------------------------
const GRID = 150;
const SIZE = 470; // portrait box in px
const PX = 735; // portrait box top-left
const PY = 110;
const { data } = await sharp(path.join(root, "public/heroimage.png"))
  .resize(GRID, GRID)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const portrait = [];
const cell = SIZE / GRID;
for (let y = 0; y < GRID; y++) {
  for (let x = 0; x < GRID; x++) {
    const i = (y * GRID + x) * 4;
    if (data[i + 3] < 120) continue;
    const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
    const cx = PX + (x + 0.5 + (rand() - 0.5) * 0.6) * cell;
    const cy = PY + (y + 0.5 + (rand() - 0.5) * 0.6) * cell;
    const r = (0.55 + lum * 0.75) * cell * 0.5;
    // cool grey shadows -> near-white highlights
    const c = (a, b) => Math.round(a + (b - a) * Math.min(1, Math.max(0, (lum - 0.2) / 0.65)));
    const fill = `rgb(${c(128, 247)},${c(148, 250)},${c(189, 255)})`;
    const op = (0.25 + lum * 0.75).toFixed(2);
    portrait.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(2)}" fill="${fill}" fill-opacity="${op}"/>`);
  }
}

// --- Background dust ----------------------------------------------------------
const dust = [];
for (let k = 0; k < 700; k++) {
  const x = rand() * W;
  const y = rand() * H;
  // keep the text block clean
  if (x > 60 && x < 700 && y > 180 && y < 450 && rand() < 0.85) continue;
  const blue = rand() < 0.18;
  const r = (0.5 + rand() * 1.1).toFixed(2);
  const op = (0.15 + rand() * 0.55).toFixed(2);
  dust.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${blue ? "#9cc4ff" : "#d6dbe4"}" fill-opacity="${op}"/>`);
}

const font = "Segoe UI, Helvetica Neue, Arial, sans-serif";
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="${PX + SIZE / 2}" cy="${PY + SIZE / 2}" r="360" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#5b9cff" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#5b9cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="600" cy="315" r="760" gradientUnits="userSpaceOnUse">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.7"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#070708"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${dust.join("")}
  ${portrait.join("")}
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>

  <line x1="80" y1="214" x2="124" y2="214" stroke="#5b9cff" stroke-width="2"/>
  <text x="140" y="221" font-family="${font}" font-size="19" font-weight="600" letter-spacing="5" fill="#9aa3b2">OPEN TO NEW ROLES</text>
  <text x="78" y="305" font-family="${font}" font-size="68" font-weight="700" letter-spacing="5" fill="#ffffff">BRODY MCFARLAND</text>
  <text x="80" y="360" font-family="${font}" font-size="25" font-weight="400" letter-spacing="7" fill="#c4c9d2">SOFTWARE ENGINEER</text>
  <text x="80" y="420" font-family="${font}" font-size="20" fill="#7d8594">Next.js · React Native · Three.js · Node · Postgres</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(root, "public/og.png"));
console.log(`public/og.png written (${portrait.length} portrait dots)`);
