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
