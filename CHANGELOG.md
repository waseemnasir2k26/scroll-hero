# Changelog

All notable changes to this project are documented in this file.

## [2026.10] - 2026-10-12

- scroll-hero is a public Next.js site whose hero is a scroll-driven 3D animation: a JPEG frame sequence scrubbed on a canvas by GSAP ScrollTrigger while the section is pinned. TypeScript, Tailwind, with a SCROLL-ANIMATION-GUIDE.md.
- State: still in placeholder mode; public/frames/ contains only .gitkeep, so the hero runs the procedural starfield fallback and the real rendered frames have never been committed.
- Re-reviewed October 2026: README, file tree and commit history re-read; documentation and version metadata only, no code changes. External links (GSAP ScrollTrigger docs, Google Fonts pages, Squoosh, Vercel, the Adaline.ai inspiration link) all returned HTTP 200.
- README has an MIT License section but the repo had no LICENSE file; a standard MIT LICENSE was added in this release.
- Known gaps: no CI workflow.

## [2026.09] - 2026-09-16

- Maintenance review of scroll-hero — a Next.js site whose hero is a cinematic scroll-driven 3D animation: a pre-rendered JPEG frame sequence scrubbed on a `<canvas>` by GSAP ScrollTrigger while the section is pinned.
- Status: Next.js 16 + React 18 + TypeScript + Tailwind, GSAP/@gsap-react for the scroll work, `app/` router with components for the hero, bento grid, marquee, testimonials, counters, custom cursor and loading screen, plus `lib/frameLoader.ts`. A `SCROLL-ANIMATION-GUIDE.md` documents the technique. No live URL is stated in the README.
- Reviewed September 2026: docs refreshed, CHANGELOG started, package version bumped to 0.2.0, released as v2026.09. No component or config changes.
- Known gaps: the README states the project is still running in **placeholder mode** — `public/frames/` holds only a `.gitkeep`, so the real rendered frame sequence has never been committed and the hero falls back to a procedural starfield/glass-panel animation.
- Repo hygiene: no LICENSE file despite a `## License` section in the README, and no CI workflow under `.github/`.
