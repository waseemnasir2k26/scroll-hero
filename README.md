# Scroll Hero - 3D Scroll Animation

A production-ready Next.js website featuring a cinematic scroll-driven 3D animation hero section, inspired by [Adaline.ai](https://www.adaline.ai) and Apple's product pages.

## How It Works

The effect is achieved by:
1. Pre-rendering a 3D animation as a sequence of 200-300 JPEG frames
2. Loading all frames into memory
3. Using GSAP ScrollTrigger to scrub through frames on a `<canvas>` element as the user scrolls
4. The section is "pinned" (sticky) until the full animation plays, then normal scroll resumes

Currently running in **placeholder mode** with a procedurally generated starfield/glass panel animation.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
scroll-hero/
├── app/
│   ├── globals.css       # Global styles + CSS custom properties
│   ├── layout.tsx        # Root layout with fonts + metadata
│   └── page.tsx          # Homepage with hero + content sections
├── components/
│   ├── ScrollHero.tsx    # Main scroll animation component
│   ├── LoadingScreen.tsx # Loading overlay with progress bar
│   ├── Navbar.tsx        # Fixed navigation
│   └── ContentSection.tsx # Post-animation content sections
├── lib/
│   └── frameLoader.ts    # Image sequence loader utility
├── public/
│   └── frames/           # Frame sequence directory (placeholder)
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json
```

## Configuration

All configuration is centralized in `components/ScrollHero.tsx`:

```tsx
const CONFIG = {
  // Frame sequence settings
  totalFrames: 280,                           // Total frames in sequence
  frameUrlPattern: '/frames/frame-{NUM}.jpg', // URL pattern for frames
  frameNumberPadding: 3,                      // frame-001, frame-002, etc.

  // Scroll behavior
  scrollDistance: '500vh',                    // Scroll distance for full animation

  // Canvas dimensions
  canvasWidth: 1920,
  canvasHeight: 1080,

  // Loading settings
  preloadConcurrency: 10,                     // Parallel image loads

  // Hero text content
  headline: 'Experience the Future',
  subheadline: 'Scroll to explore...',

  // Toggle placeholder mode
  usePlaceholder: true,                       // Set to false for real frames
};
```

## Replacing Placeholder with Real Frames

When your 3D artist delivers the rendered frames:

### Frame Specifications

| Property | Requirement |
|----------|-------------|
| Format | JPEG |
| Quality | 85% (balance between size and quality) |
| Resolution | 1920x1080 (16:9) |
| Naming | `frame-001.jpg`, `frame-002.jpg`, etc. |
| Frame Count | 200-300 frames recommended |
| Total Size | Target ~50-100MB for 280 frames |

### Steps to Replace

1. **Export your animation** as a JPEG sequence:
   - In Blender: Render > Output > File Format: JPEG
   - In After Effects: File > Export > Add to Render Queue > JPEG Sequence
   - In Cinema 4D: Render Settings > Output > Format: JPEG

2. **Name the files** with zero-padded numbers:
   ```
   frame-001.jpg
   frame-002.jpg
   ...
   frame-280.jpg
   ```

3. **Place frames** in `/public/frames/`

4. **Update configuration** in `ScrollHero.tsx`:
   ```tsx
   const CONFIG = {
     totalFrames: 280,        // Match your frame count
     usePlaceholder: false,   // Disable placeholder mode
     // ...
   };
   ```

5. **Test locally** with `npm run dev`

6. **Deploy** to Vercel

### Frame Optimization Tips

- **Reduce frame count** if loading is slow (try 200 instead of 300)
- **Compress JPEGs** with tools like [Squoosh](https://squoosh.app) or ImageOptim
- **Consider WebP** for better compression (update `frameUrlPattern` accordingly)
- **Use a CDN** for production (set `NEXT_PUBLIC_FRAME_CDN_URL`)

## Customization

### Colors and Theme

Edit CSS custom properties in `app/globals.css`:

```css
:root {
  --space-black: #050510;
  --space-dark: #0a0a1a;
  --electric-blue: #6e8eff;
  --violet-accent: #a78bfa;
  --near-white: #f0f0ff;
}
```

### Typography

Fonts are configured in `app/layout.tsx`:
- Display: [Syne](https://fonts.google.com/specimen/Syne) - Bold, geometric
- Mono: [Space Mono](https://fonts.google.com/specimen/Space+Mono) - Technical details

### Navigation Links

Edit the `navLinks` array in `components/Navbar.tsx`

### Content Sections

Edit `components/ContentSection.tsx` to modify:
- Feature grid content
- Stats
- CTA messaging
- Footer links

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Deploy automatically

The `next.config.js` is pre-configured for Vercel deployment with unoptimized images (required for frame sequences).

### Manual Deployment

```bash
npm run build
npm start
```

### Environment Variables

Set these in Vercel Dashboard or `.env.local`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking ID (optional) |
| `NEXT_PUBLIC_FRAME_CDN_URL` | CDN URL for frames (optional) |

## Performance

The scroll animation is optimized for 60fps:

- **Canvas rendering** with `requestAnimationFrame`
- **GSAP ScrollTrigger** with 1-second scrub smoothing
- **Concurrent loading** with controlled parallelism
- **Viewport-sized canvas** with device pixel ratio handling
- **Memory management** with image caching

### Performance Checklist

- [ ] Frame JPEGs are compressed (< 50KB each)
- [ ] Total frame count is reasonable (200-300)
- [ ] Testing smooth on target devices
- [ ] Loading screen provides good UX during preload

## Mobile

On viewports under 768px:
- Shows static first frame instead of scroll animation
- Canvas resolution reduced for performance
- Mobile-optimized navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Animation**: GSAP + ScrollTrigger
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## License

MIT

---

Built with GSAP ScrollTrigger. For scroll animation documentation, see [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger).
