'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LoadingScreen from './LoadingScreen';
import { loadFrameSequence, LoaderConfig } from '@/lib/frameLoader';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// CONFIGURATION - Edit these values as needed
// ============================================
const CONFIG = {
  // Frame sequence settings
  totalFrames: 280,
  frameUrlPattern: '/frames/frame-{NUM}.jpg',
  frameNumberPadding: 3,

  // Scroll behavior
  scrollDistance: '500vh',

  // Canvas dimensions (matches frame resolution)
  canvasWidth: 1920,
  canvasHeight: 1080,

  // Loading settings
  preloadConcurrency: 10,

  // Hero text content
  headline: 'Experience the Future',
  subheadline: 'Scroll to explore a new dimension of interactive storytelling.',

  // Toggle placeholder mode (set to false when using real frames)
  usePlaceholder: true,
};

// ============================================
// PLACEHOLDER FRAME GENERATOR
// ============================================
function generatePlaceholderFrames(
  totalFrames: number,
  width: number,
  height: number,
  onProgress: (loaded: number, total: number) => void
): HTMLImageElement[] {
  const frames: HTMLImageElement[] = [];
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d')!;

  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);

    // Clear canvas with gradient
    const bgGradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height)
    );
    bgGradient.addColorStop(0, '#1e293b');
    bgGradient.addColorStop(0.5, '#0f172a');
    bgGradient.addColorStop(1, '#020617');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle blue glow in center
    const glowGradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, 400
    );
    glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
    glowGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, width, height);

    // Center point for all effects
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw animated starfield
    const starCount = 200;
    for (let s = 0; s < starCount; s++) {
      const seed = s * 1234.5678;
      const baseX = ((Math.sin(seed) * 0.5 + 0.5) * width);
      const baseY = ((Math.cos(seed * 1.5) * 0.5 + 0.5) * height);

      // Stars move outward as we progress (zoom effect)
      const dx = baseX - centerX;
      const dy = baseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

      // Exponential zoom effect
      const zoomFactor = 1 + progress * 3;
      const newDistance = distance * zoomFactor;
      const angle = Math.atan2(dy, dx);

      const x = centerX + Math.cos(angle) * newDistance;
      const y = centerY + Math.sin(angle) * newDistance;

      // Fade out stars as they move off screen
      const alpha = Math.max(0, 1 - (newDistance / maxDistance) * 0.7);

      // Star size increases with distance
      const size = (1 + (newDistance / maxDistance) * 2) * (0.5 + Math.sin(seed * 2) * 0.5);

      if (x > 0 && x < width && y > 0 && y < height) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        gradient.addColorStop(0, `rgba(96, 165, 250, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw floating glass panels (3D rotation effect)
    const panelCount = 5;
    for (let p = 0; p < panelCount; p++) {
      const panelProgress = (progress + p * 0.1) % 1;
      const panelAngle = (p * Math.PI * 2) / panelCount + progress * Math.PI;

      // 3D position simulation
      const radius = 300 + p * 50;
      const px = centerX + Math.cos(panelAngle) * radius * (1 - panelProgress * 0.5);
      const py = centerY + Math.sin(panelAngle * 0.5) * 100;

      // Scale based on "depth"
      const scale = 0.5 + (1 - panelProgress) * 0.5;
      const panelWidth = 200 * scale;
      const panelHeight = 150 * scale;

      // Skew for 3D perspective
      const skew = Math.cos(panelAngle) * 0.3;

      ctx.save();
      ctx.translate(px, py);
      ctx.transform(1, skew, 0, 1, 0, 0);
      ctx.globalAlpha = (1 - panelProgress) * 0.3;

      // Glass panel
      const panelGradient = ctx.createLinearGradient(
        -panelWidth / 2,
        -panelHeight / 2,
        panelWidth / 2,
        panelHeight / 2
      );
      panelGradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
      panelGradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)');

      ctx.fillStyle = panelGradient;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;

      // Rounded rectangle
      const r = 10 * scale;
      ctx.beginPath();
      ctx.roundRect(
        -panelWidth / 2,
        -panelHeight / 2,
        panelWidth,
        panelHeight,
        r
      );
      ctx.fill();
      ctx.stroke();

      // Inner glow lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(-panelWidth / 2 + 20, -panelHeight / 2 + 30);
      ctx.lineTo(panelWidth / 2 - 20, -panelHeight / 2 + 30);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-panelWidth / 2 + 20, -panelHeight / 2 + 50);
      ctx.lineTo(panelWidth / 4, -panelHeight / 2 + 50);
      ctx.stroke();

      ctx.restore();
    }

    // Central orb with glow
    const orbSize = 60 + progress * 180;
    const orbGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      orbSize
    );
    orbGradient.addColorStop(0, `rgba(96, 165, 250, ${0.9 - progress * 0.5})`);
    orbGradient.addColorStop(0.3, `rgba(59, 130, 246, ${0.6 - progress * 0.4})`);
    orbGradient.addColorStop(0.6, `rgba(139, 92, 246, ${0.3 - progress * 0.2})`);
    orbGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');

    ctx.fillStyle = orbGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, orbSize, 0, Math.PI * 2);
    ctx.fill();

    // Convert to image
    const img = new Image();
    img.src = offscreen.toDataURL('image/jpeg', 0.9);
    frames.push(img);

    onProgress(i + 1, totalFrames);
  }

  return frames;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>();

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Draw frame to canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || !frames[frameIndex]) return;

      const img = frames[frameIndex];

      // Calculate cover fit
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    [frames]
  );

  // Load frames
  useEffect(() => {
    if (isMobile) {
      // On mobile, just generate a single frame
      const singleFrame = generatePlaceholderFrames(1, CONFIG.canvasWidth, CONFIG.canvasHeight, () => {});
      setFrames(singleFrame);
      setIsLoaded(true);
      return;
    }

    const loadFrames = async () => {
      if (CONFIG.usePlaceholder) {
        // Generate placeholder frames
        const placeholderFrames = generatePlaceholderFrames(
          CONFIG.totalFrames,
          CONFIG.canvasWidth,
          CONFIG.canvasHeight,
          (loaded, total) => {
            setLoadingProgress((loaded / total) * 100);
          }
        );
        setFrames(placeholderFrames);
        setIsLoaded(true);
      } else {
        // Load real frames from files
        const loaderConfig: LoaderConfig = {
          urlPattern: CONFIG.frameUrlPattern,
          totalFrames: CONFIG.totalFrames,
          padding: CONFIG.frameNumberPadding,
          concurrency: CONFIG.preloadConcurrency,
        };

        const loadedFrames = await loadFrameSequence(loaderConfig, (loaded, total) => {
          setLoadingProgress((loaded / total) * 100);
        });

        setFrames(loadedFrames);
        setIsLoaded(true);
      }
    };

    loadFrames();
  }, [isMobile]);

  // Resize canvas to match viewport
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Redraw current frame
      if (frames.length > 0) {
        drawFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frames, drawFrame]);

  // GSAP ScrollTrigger animation
  useGSAP(
    () => {
      if (!isLoaded || frames.length === 0 || isMobile) return;

      const totalFrames = frames.length;
      const frameCounter = { frame: 0 };

      // Main timeline for frame scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(frameCounter, {
        frame: totalFrames - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: () => {
          const index = Math.round(frameCounter.frame);
          if (index !== currentFrameRef.current) {
            currentFrameRef.current = index;
            // Use RAF for smooth canvas updates
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
              drawFrame(index);
            });
          }
        },
      });

      // Text overlay fade out (first 25% of scroll)
      gsap.to(textOverlayRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '25% top',
          scrub: true,
        },
      });

      // Scroll indicator fade out (first 10% of scroll)
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '10% top',
          scrub: true,
        },
      });

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    },
    { scope: containerRef, dependencies: [isLoaded, frames, drawFrame, isMobile] }
  );

  // Draw first frame when loaded
  useEffect(() => {
    if (isLoaded && frames.length > 0) {
      drawFrame(0);
    }
  }, [isLoaded, frames, drawFrame]);

  // Mobile static view
  if (isMobile) {
    return (
      <>
        <LoadingScreen progress={loadingProgress} isComplete={isLoaded} />
        <section className="relative h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'transform' }}
          />
          <div className="vignette" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
            <h1 className="hero-headline gradient-text mb-6">{CONFIG.headline}</h1>
            <p className="hero-subhead font-mono">{CONFIG.subheadline}</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <LoadingScreen progress={loadingProgress} isComplete={isLoaded} />

      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{
          transform: `scaleX(${currentFrameRef.current / (frames.length - 1 || 1)})`,
        }}
      />

      {/* Main scroll container - height determines scroll distance */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: CONFIG.scrollDistance }}
      >
        {/* Sticky canvas container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'transform' }}
          />

          {/* Vignette overlay */}
          <div className="vignette" />

          {/* Text overlay */}
          <div
            ref={textOverlayRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10"
          >
            <h1 className="hero-headline gradient-text mb-6">{CONFIG.headline}</h1>
            <p className="hero-subhead font-mono">{CONFIG.subheadline}</p>

            {/* CTA buttons */}
            <div className="flex gap-4 mt-8">
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div ref={scrollIndicatorRef} className="scroll-indicator z-10">
            <div className="scroll-indicator-mouse">
              <div className="scroll-indicator-wheel" />
            </div>
            <span className="font-mono text-xs text-near-white/50 uppercase tracking-widest">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
