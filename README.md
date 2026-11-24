# brodymcfarland.com

Personal portfolio — Next.js 16 (Pages Router), React 19, Tailwind CSS 4, React Three Fiber, Motion.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Contact form

The form posts through [EmailJS](https://www.emailjs.com/). Set these in `.env.local` (and in your deploy target):

```
NEXT_PUBLIC_SERVICE_ID=
NEXT_PUBLIC_TEMPLATE_ID=
NEXT_PUBLIC_PUBLIC_KEY=
```

## Structure

- `src/pages/index.tsx` — single page: hero, projects, contact
- `src/components/SkillRing.tsx` — the orbiting skill icons (edit `skillImages` to change them)
- `src/components/Projects.tsx` — `projectData` drives the project cards
- `src/styles/globals.css` — Tailwind v4 `@theme` tokens and shared component classes
- `public/og.png` — social preview image (1200×630)

## Commit history on project cards

`src/data/commits.json` is a snapshot of my commits per project (only commits I authored; team repos also show the team total). Refresh it, then commit the JSON:

```bash
npm run sync:commits                     # reads local clones in ../ and public GitHub repos
GITHUB_TOKEN=... npm run sync:commits    # optional: higher rate limit / private repos
```

Add a project in `SOURCES` in `scripts/sync-commits.mjs`; its key must match the `slug` in `projectData` (`src/components/Projects.tsx`).

## Analytics

Vercel Web Analytics loads from `/_vercel/insights/script.js` in production — enable it in the Vercel project → Analytics.
Custom events (`src/lib/track.ts`; need custom events on the Vercel plan): `project_view` (card ≥50% on screen for ~1s),
`project_link`, `skill_tap`, `resume_download`, `social_click`, `contact_sent`.
