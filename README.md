# scroll-hero

A Next.js starter for a scroll-driven hero: a pre-rendered image sequence plays on a canvas as the visitor scrolls, in the style of Apple product pages. It runs today with a generated placeholder animation, so you can swap in your own frames later.

## How it works

1. You render a 3D animation as 200-300 JPEG frames.
2. The page preloads the frames into memory.
3. GSAP ScrollTrigger scrubs through them on a `<canvas>` while the hero section stays pinned.
4. When the last frame plays, normal scrolling resumes.

## Quickstart

```bash
git clone https://github.com/waseemnasir2k26/scroll-hero.git && cd scroll-hero
npm install
npm run dev      # http://localhost:3000
```

To use your own animation: export JPEG frames named `frame-001.jpg`, `frame-002.jpg` and so on, put them in `public/frames/`, then edit the `CONFIG` object at the top of `components/ScrollHero.tsx`: set `totalFrames` and `usePlaceholder: false`. Aim for 1920x1080 at about 85% quality. `SCROLL-ANIMATION-GUIDE.md` covers frame export from Blender, After Effects and Cinema 4D plus size tips.

## What is in the repo

- `components/ScrollHero.tsx` - the scroll-scrubbed canvas and its config.
- `lib/frameLoader.ts` - the image-sequence preloader.
- `components/` - supporting sections: navbar, loading screen, bento grid, process, testimonials, marquee, counters, custom cursor.
- `app/` - Next.js App Router layout and page.

Stack: Next.js, React 18, TypeScript, Tailwind CSS 3, GSAP.

## For you if

You have, or will commission, a rendered product animation and want a working scroll-scrub page around it instead of wiring ScrollTrigger and canvas loading from scratch.

## Status and limits

- Placeholder mode only until you add frames: the repo ships an empty `public/frames/`.
- Frame sequences are heavy (the guide estimates 50-100 MB for 280 frames). Use a CDN for production.
- Inspired by the look of Adaline.ai.
- Placeholder copy in the sections is dummy text. Replace it.

## License

MIT, see [LICENSE](LICENSE).

---

Built by SkynetLabs. Contact: info@skynetjoe.com

Need this wired into your business? SkynetLabs builds voice agents, n8n back offices and sites that convert → https://skynetjoe.com
