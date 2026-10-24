# Damian Marquez — Backend Engineering Portfolio

Personal portfolio for junior backend roles. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, fully static.
Deployed on Vercel at https://damian-backend-portfolio.vercel.app.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (eslint-config-next)
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Where things live

| What | File |
| --- | --- |
| Name, title, contact, skills, experience, languages | `src/config/site.ts` |
| Case studies (Repuesthogar, ExamGen AI) | `src/data/projects.ts` |
| Repuesthogar architecture diagram | `src/components/ArchitectureDiagram.tsx` |
| Endpoint table, request pipeline, layer list | `src/components/ProjectParts.tsx` |
| Colors, fonts, motion | `src/app/globals.css` |
| SEO: metadata, OG image, favicon, robots, sitemap | `src/app/layout.tsx`, `src/app/opengraph-image.tsx`, `src/app/icon.svg`, `src/app/robots.ts`, `src/app/sitemap.ts` |

## Content rules

- Only facts verified in code, on the live site, or confirmed by me. Unverified items go in `toConfirm` inside `src/data/projects.ts` (not rendered).
- No skill percentages, invented metrics, testimonials or logos.
- Links render only when they exist: the CV button appears when `public/cv.pdf` exists, the photo when `public/me.jpg` exists, LinkedIn when `site.linkedin` is set.

## TODO

- [x] CV at `public/cv.pdf` (source: replace the file when the CV changes).
- [x] LinkedIn set in `src/config/site.ts`.
- [x] Photo at `public/me.jpg` (About section).
- [ ] Add ExamGen AI screenshots to `public/projects/examgen-ai/` and list them in `images`.
- [ ] Confirm Repuesthogar endpoint names (private repo) before adding an API table to that case study.

## Deploy (Vercel)

This repo replaces the previous contents of `DevDamianMarquez/backend-portfolio`. Vercel picks it up as a Next.js project with no extra settings (`vercel.json` keeps build command and output). Push to `main` and Vercel redeploys.

Optional static export for other hosts: `STATIC_EXPORT=1 npm run build` writes plain files to `out/`.

Fonts are self-hosted via `@fontsource`, so builds don't depend on Google Fonts.
