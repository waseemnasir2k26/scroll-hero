# 3D Scroll Animation Guide (Adaline.ai Style)

> A comprehensive guide to implementing scroll-driven 3D frame animations for websites, including WordPress implementation.

---

## Table of Contents

1. [How It Works](#how-it-works)
2. [Core Technique](#core-technique)
3. [Required Assets](#required-assets)
4. [Frame Specifications](#frame-specifications)
5. [HTML Structure](#html-structure)
6. [CSS Styling](#css-styling)
7. [JavaScript Implementation](#javascript-implementation)
8. [WordPress Integration](#wordpress-integration)
9. [Performance Optimization](#performance-optimization)
10. [Placeholder Animation](#placeholder-animation)
11. [Troubleshooting](#troubleshooting)

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   USER SCROLLS DOWN THE PAGE                            │
│              ↓                                          │
│   ScrollTrigger detects scroll position (0% - 100%)     │
│              ↓                                          │
│   Maps scroll percentage to frame number (1 - 280)      │
│              ↓                                          │
│   Draws corresponding frame on <canvas> element         │
│              ↓                                          │
│   Canvas is "sticky" positioned (stays in viewport)     │
│              ↓                                          │
│   Creates illusion of 3D animation controlled by scroll │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### The Scroll-to-Frame Formula

```javascript
scrollProgress = currentScrollPosition / totalScrollDistance  // 0 to 1
frameIndex = Math.round(scrollProgress * totalFrames)         // 0 to 279
canvas.drawImage(frames[frameIndex])                          // Display frame
```

---

## Core Technique

| Component | Purpose |
|-----------|---------|
| **Frame Sequence** | 200-300 JPEG images exported from 3D software |
| **HTML Canvas** | Displays one frame at a time |
| **Sticky Container** | CSS `position: sticky` pins canvas during scroll |
| **Tall Container** | 500vh height creates scroll distance for animation |
| **GSAP ScrollTrigger** | Maps scroll position to frame index smoothly |
| **Loading Screen** | Shows progress while preloading frames |

### Why This Technique?

- ✅ Works on all modern browsers
- ✅ Smooth 60fps performance
- ✅ No video codec issues
- ✅ Precise scroll control
- ✅ Used by Apple, Adaline.ai, and premium brands

---

## Required Assets

### File Structure

```
your-project/
├── frames/
│   ├── frame-001.jpg
│   ├── frame-002.jpg
│   ├── frame-003.jpg
│   └── ... (up to frame-280.jpg)
├── js/
│   └── scroll-hero.js
├── css/
│   └── scroll-hero.css
└── index.html (or PHP template)
```

### Dependencies

```html
<!-- GSAP (Required) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

---

## Frame Specifications

### For Your 3D Artist

| Property | Recommended Value |
|----------|-------------------|
| **Format** | JPEG |
| **Quality** | 80-85% |
| **Resolution** | 1920 × 1080 (16:9) |
| **Frame Count** | 200-300 frames |
| **Naming Convention** | `frame-001.jpg`, `frame-002.jpg`, etc. |
| **Total File Size** | 50-100MB (all frames) |
| **Per Frame Size** | ~200-400KB each |

### Export Settings by Software

**Blender:**
```
Render > Output > File Format: JPEG
Quality: 85%
Resolution: 1920 x 1080
```

**After Effects:**
```
Composition > Add to Render Queue
Output Module: JPEG Sequence
Quality: 85%
```

**Cinema 4D:**
```
Render Settings > Output
Format: JPEG
Resolution: 1920 x 1080
```

---

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scroll Animation</title>
    <link rel="stylesheet" href="css/scroll-hero.css">
</head>
<body>

    <!-- Loading Screen -->
    <div id="loading-screen">
        <div class="loading-content">
            <div class="loading-logo"></div>
            <p class="loading-text">Loading Experience</p>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
            <p class="progress-percent">0%</p>
        </div>
    </div>

    <!-- Scroll Hero Section -->
    <div class="scroll-hero-container">
        <div class="scroll-hero-sticky">
            <!-- Canvas for frame animation -->
            <canvas id="hero-canvas"></canvas>

            <!-- Overlay effects -->
            <div class="hero-vignette"></div>
            <div class="hero-glow"></div>

            <!-- Text content -->
            <div class="hero-content">
                <h1 class="hero-headline">Your Headline Here</h1>
                <p class="hero-subheadline">Your subheadline text goes here</p>
                <div class="hero-buttons">
                    <a href="#" class="btn-primary">Get Started</a>
                    <a href="#" class="btn-secondary">Learn More</a>
                </div>
            </div>

            <!-- Scroll indicator -->
            <div class="scroll-indicator">
                <div class="scroll-mouse">
                    <div class="scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </div>
    </div>

    <!-- Rest of your page content -->
    <section class="content-section">
        <h2>Your content continues here...</h2>
    </section>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="js/scroll-hero.js"></script>

</body>
</html>
```

---

## CSS Styling

```css
/* ================================
   SCROLL HERO - CSS
   ================================ */

:root {
    --space-black: #0f172a;
    --electric-blue: #3b82f6;
    --violet-accent: #8b5cf6;
    --near-white: #f1f5f9;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--space-black);
    color: var(--near-white);
    font-family: system-ui, -apple-system, sans-serif;
    overflow-x: hidden;
}

/* ================================
   LOADING SCREEN
   ================================ */

#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--space-black);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

#loading-screen::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.2), transparent);
}

.loading-content {
    text-align: center;
    position: relative;
    z-index: 1;
}

.loading-logo {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    background: linear-gradient(135deg, var(--electric-blue), var(--violet-accent));
    border-radius: 20px;
    animation: pulse 2s ease-in-out infinite;
}

.loading-text {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 24px;
}

.progress-container {
    width: 240px;
    height: 3px;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 4px;
    overflow: hidden;
    margin: 0 auto;
}

.progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--electric-blue), var(--violet-accent));
    border-radius: 4px;
    transition: width 0.3s ease;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.progress-percent {
    font-size: 14px;
    color: var(--electric-blue);
    margin-top: 16px;
    font-variant-numeric: tabular-nums;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
}

/* ================================
   SCROLL HERO CONTAINER
   ================================ */

.scroll-hero-container {
    position: relative;
    height: 500vh; /* Scroll distance - adjust as needed */
}

.scroll-hero-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

/* ================================
   CANVAS
   ================================ */

#hero-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* ================================
   OVERLAY EFFECTS
   ================================ */

.hero-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse at center,
        transparent 0%,
        transparent 40%,
        rgba(15, 23, 42, 0.6) 100%
    );
    pointer-events: none;
}

.hero-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle 800px at 50% 30%,
        rgba(59, 130, 246, 0.15),
        transparent
    );
    pointer-events: none;
}

/* ================================
   HERO CONTENT
   ================================ */

.hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10;
    width: 90%;
    max-width: 800px;
}

.hero-headline {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subheadline {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(255,255,255,0.6);
    max-width: 600px;
    margin: 0 auto 32px;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn-primary {
    background: linear-gradient(135deg, var(--electric-blue), var(--violet-accent));
    color: white;
    padding: 16px 32px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
    background: rgba(59, 130, 246, 0.1);
    color: var(--near-white);
    padding: 16px 32px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    border: 1px solid rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.6);
}

/* ================================
   SCROLL INDICATOR
   ================================ */

.scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    z-index: 10;
}

.scroll-mouse {
    width: 26px;
    height: 42px;
    border: 2px solid rgba(59, 130, 246, 0.4);
    border-radius: 14px;
    position: relative;
}

.scroll-wheel {
    width: 4px;
    height: 10px;
    background: linear-gradient(180deg, var(--electric-blue), var(--violet-accent));
    border-radius: 2px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll-wheel 2s ease-in-out infinite;
}

@keyframes scroll-wheel {
    0%, 100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    50% {
        opacity: 0.3;
        transform: translateX(-50%) translateY(14px);
    }
}

.scroll-indicator span {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.4);
}

/* ================================
   MOBILE RESPONSIVE
   ================================ */

@media (max-width: 768px) {
    .scroll-hero-container {
        height: auto; /* Disable scroll animation on mobile */
    }

    .scroll-hero-sticky {
        position: relative; /* Remove sticky on mobile */
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }

    .btn-primary,
    .btn-secondary {
        width: 100%;
        max-width: 280px;
        text-align: center;
    }
}

/* ================================
   CONTENT SECTION (After Hero)
   ================================ */

.content-section {
    min-height: 100vh;
    padding: 100px 20px;
    background: var(--space-black);
    position: relative;
    z-index: 10;
}
```

---

## JavaScript Implementation

```javascript
/**
 * Scroll Hero Animation
 * 3D Frame Sequence controlled by scroll
 */

(function() {
    'use strict';

    // ================================
    // CONFIGURATION
    // ================================

    const CONFIG = {
        // Frame sequence settings
        totalFrames: 280,
        frameUrlPattern: '/frames/frame-{NUM}.jpg', // Adjust path as needed
        frameNumberPadding: 3, // frame-001, frame-002, etc.

        // Animation settings
        scrubDuration: 1, // Smoothing (seconds)

        // Selectors
        containerSelector: '.scroll-hero-container',
        canvasSelector: '#hero-canvas',
        contentSelector: '.hero-content',
        indicatorSelector: '.scroll-indicator',
        loadingSelector: '#loading-screen',
        progressBarSelector: '.progress-bar',
        progressPercentSelector: '.progress-percent',
    };

    // ================================
    // STATE
    // ================================

    const frames = [];
    let currentFrame = 0;
    let canvas, ctx;
    let isMobile = window.innerWidth < 768;

    // ================================
    // UTILITY FUNCTIONS
    // ================================

    function padNumber(num, padding) {
        return String(num).padStart(padding, '0');
    }

    function getFrameUrl(index) {
        const num = padNumber(index + 1, CONFIG.frameNumberPadding);
        return CONFIG.frameUrlPattern.replace('{NUM}', num);
    }

    // ================================
    // CANVAS FUNCTIONS
    // ================================

    function initCanvas() {
        canvas = document.querySelector(CONFIG.canvasSelector);
        if (!canvas) return false;

        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return true;
    }

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        // Redraw current frame after resize
        if (frames[currentFrame]) {
            drawFrame(currentFrame);
        }
    }

    function drawFrame(index) {
        const img = frames[index];
        if (!img || !ctx) return;

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, drawX, drawY;

        // Cover fit calculation
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
    }

    // ================================
    // FRAME LOADER
    // ================================

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load: ${src}`));
            img.src = src;
        });
    }

    async function loadFrames(onProgress) {
        const progressBar = document.querySelector(CONFIG.progressBarSelector);
        const progressPercent = document.querySelector(CONFIG.progressPercentSelector);

        for (let i = 0; i < CONFIG.totalFrames; i++) {
            try {
                const img = await loadImage(getFrameUrl(i));
                frames[i] = img;
            } catch (error) {
                console.warn(`Frame ${i} failed to load, using placeholder`);
                frames[i] = createPlaceholderFrame();
            }

            const progress = ((i + 1) / CONFIG.totalFrames) * 100;

            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            if (progressPercent) {
                progressPercent.textContent = `${Math.round(progress)}%`;
            }
            if (onProgress) {
                onProgress(progress);
            }
        }
    }

    function createPlaceholderFrame() {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 1920;
        tempCanvas.height = 1080;
        const tempCtx = tempCanvas.getContext('2d');

        // Create gradient placeholder
        const gradient = tempCtx.createLinearGradient(0, 0, 1920, 1080);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
        tempCtx.fillStyle = gradient;
        tempCtx.fillRect(0, 0, 1920, 1080);

        const img = new Image();
        img.src = tempCanvas.toDataURL();
        return img;
    }

    // ================================
    // LOADING SCREEN
    // ================================

    function hideLoadingScreen() {
        const loadingScreen = document.querySelector(CONFIG.loadingSelector);
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // ================================
    // GSAP ANIMATION
    // ================================

    function initScrollAnimation() {
        gsap.registerPlugin(ScrollTrigger);

        const container = document.querySelector(CONFIG.containerSelector);
        const content = document.querySelector(CONFIG.contentSelector);
        const indicator = document.querySelector(CONFIG.indicatorSelector);

        if (!container) return;

        // Frame scrubbing animation
        const frameCounter = { frame: 0 };

        gsap.to(frameCounter, {
            frame: CONFIG.totalFrames - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: CONFIG.scrubDuration,
                invalidateOnRefresh: true,
            },
            onUpdate: () => {
                const index = Math.round(frameCounter.frame);
                if (index !== currentFrame) {
                    currentFrame = index;
                    requestAnimationFrame(() => drawFrame(index));
                }
            },
        });

        // Fade out text overlay (first 25% of scroll)
        if (content) {
            gsap.to(content, {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: '25% top',
                    scrub: true,
                },
            });
        }

        // Fade out scroll indicator (first 10% of scroll)
        if (indicator) {
            gsap.to(indicator, {
                opacity: 0,
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: '10% top',
                    scrub: true,
                },
            });
        }
    }

    // ================================
    // MOBILE FALLBACK
    // ================================

    function initMobileFallback() {
        // On mobile, just show first frame as static image
        if (frames[0]) {
            drawFrame(0);
        }
    }

    // ================================
    // INITIALIZATION
    // ================================

    async function init() {
        // Check for mobile
        isMobile = window.innerWidth < 768;

        // Initialize canvas
        if (!initCanvas()) {
            console.error('Canvas not found');
            return;
        }

        // Load all frames
        await loadFrames();

        // Hide loading screen
        hideLoadingScreen();

        // Draw first frame
        drawFrame(0);

        // Initialize animation (desktop only)
        if (!isMobile) {
            initScrollAnimation();
        } else {
            initMobileFallback();
        }

        // Handle resize
        window.addEventListener('resize', () => {
            const wasMobile = isMobile;
            isMobile = window.innerWidth < 768;

            if (wasMobile !== isMobile) {
                // Viewport changed between mobile/desktop
                location.reload(); // Simple solution - reload page
            }
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
```

---

## WordPress Integration

### Option 1: Theme Integration

**functions.php:**

```php
<?php
/**
 * Enqueue Scroll Hero Scripts and Styles
 */
function scroll_hero_enqueue_assets() {
    // GSAP
    wp_enqueue_script(
        'gsap',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
        array(),
        '3.12.5',
        true
    );

    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
        array('gsap'),
        '3.12.5',
        true
    );

    // Scroll Hero CSS
    wp_enqueue_style(
        'scroll-hero-css',
        get_template_directory_uri() . '/assets/css/scroll-hero.css',
        array(),
        '1.0.0'
    );

    // Scroll Hero JS
    wp_enqueue_script(
        'scroll-hero-js',
        get_template_directory_uri() . '/assets/js/scroll-hero.js',
        array('gsap', 'gsap-scrolltrigger'),
        '1.0.0',
        true
    );

    // Pass frame URL to JavaScript
    wp_localize_script('scroll-hero-js', 'scrollHeroConfig', array(
        'frameUrl' => get_template_directory_uri() . '/assets/frames/frame-{NUM}.jpg',
        'totalFrames' => 280,
    ));
}
add_action('wp_enqueue_scripts', 'scroll_hero_enqueue_assets');
```

**Update JavaScript to use WordPress config:**

```javascript
// At the top of scroll-hero.js
const CONFIG = {
    totalFrames: window.scrollHeroConfig?.totalFrames || 280,
    frameUrlPattern: window.scrollHeroConfig?.frameUrl || '/frames/frame-{NUM}.jpg',
    // ... rest of config
};
```

### Option 2: Shortcode

**functions.php:**

```php
<?php
/**
 * Scroll Hero Shortcode
 * Usage: [scroll_hero headline="Your Title" subheadline="Your subtitle"]
 */
function scroll_hero_shortcode($atts) {
    $atts = shortcode_atts(array(
        'headline' => 'Experience the Future',
        'subheadline' => 'Scroll to explore a new dimension',
        'frames' => 280,
        'height' => '500vh',
    ), $atts);

    ob_start();
    ?>

    <!-- Loading Screen -->
    <div id="loading-screen">
        <div class="loading-content">
            <div class="loading-logo"></div>
            <p class="loading-text">Loading Experience</p>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
            <p class="progress-percent">0%</p>
        </div>
    </div>

    <!-- Scroll Hero -->
    <div class="scroll-hero-container" style="height: <?php echo esc_attr($atts['height']); ?>">
        <div class="scroll-hero-sticky">
            <canvas id="hero-canvas"></canvas>
            <div class="hero-vignette"></div>
            <div class="hero-glow"></div>

            <div class="hero-content">
                <h1 class="hero-headline"><?php echo esc_html($atts['headline']); ?></h1>
                <p class="hero-subheadline"><?php echo esc_html($atts['subheadline']); ?></p>
            </div>

            <div class="scroll-indicator">
                <div class="scroll-mouse">
                    <div class="scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </div>
    </div>

    <script>
        window.scrollHeroConfig = {
            frameUrl: '<?php echo get_template_directory_uri(); ?>/assets/frames/frame-{NUM}.jpg',
            totalFrames: <?php echo intval($atts['frames']); ?>
        };
    </script>

    <?php
    return ob_get_clean();
}
add_shortcode('scroll_hero', 'scroll_hero_shortcode');
```

### Option 3: Elementor Widget

Create a custom Elementor widget in your theme or plugin:

```php
<?php
class Scroll_Hero_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'scroll_hero';
    }

    public function get_title() {
        return 'Scroll Hero Animation';
    }

    public function get_icon() {
        return 'eicon-animation';
    }

    public function get_categories() {
        return ['general'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'content_section',
            [
                'label' => 'Content',
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'headline',
            [
                'label' => 'Headline',
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => 'Experience the Future',
            ]
        );

        $this->add_control(
            'subheadline',
            [
                'label' => 'Subheadline',
                'type' => \Elementor\Controls_Manager::TEXTAREA,
                'default' => 'Scroll to explore',
            ]
        );

        $this->add_control(
            'total_frames',
            [
                'label' => 'Total Frames',
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 280,
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        echo do_shortcode('[scroll_hero headline="' . $settings['headline'] . '" subheadline="' . $settings['subheadline'] . '" frames="' . $settings['total_frames'] . '"]');
    }
}
```

---

## Performance Optimization

### 1. Compress Frames

```bash
# Using ImageMagick
mogrify -quality 80 -resize 1920x1080 frames/*.jpg

# Using sharp (Node.js)
npx sharp-cli --input "frames/*.jpg" --output "compressed/" --quality 80
```

### 2. Lazy Loading Strategy

```javascript
// Load first 30 frames immediately, rest in background
async function loadFramesProgressively() {
    // Load first 30 frames (for immediate interaction)
    for (let i = 0; i < 30; i++) {
        frames[i] = await loadImage(getFrameUrl(i));
    }

    // Hide loading screen
    hideLoadingScreen();
    drawFrame(0);
    initScrollAnimation();

    // Load remaining frames in background
    for (let i = 30; i < CONFIG.totalFrames; i++) {
        frames[i] = await loadImage(getFrameUrl(i));
    }
}
```

### 3. Use WebP Format

```javascript
// Check WebP support and use appropriate format
const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;

const frameExtension = supportsWebP ? 'webp' : 'jpg';
const frameUrlPattern = `/frames/frame-{NUM}.${frameExtension}`;
```

### 4. CDN Hosting

Host frames on a CDN for faster global delivery:

```javascript
const CONFIG = {
    frameUrlPattern: 'https://cdn.yoursite.com/frames/frame-{NUM}.jpg',
    // ...
};
```

---

## Placeholder Animation

If you don't have 3D frames yet, use this placeholder generator:

```javascript
function generatePlaceholderFrames(totalFrames, width, height) {
    const frames = [];
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext('2d');

    for (let i = 0; i < totalFrames; i++) {
        const progress = i / (totalFrames - 1);

        // Background gradient
        const gradient = ctx.createRadialGradient(
            width/2, height/2, 0,
            width/2, height/2, Math.max(width, height)
        );
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(0.5, '#0f172a');
        gradient.addColorStop(1, '#020617');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Animated stars (zoom effect)
        const starCount = 200;
        for (let s = 0; s < starCount; s++) {
            const seed = s * 1234.5678;
            const baseX = (Math.sin(seed) * 0.5 + 0.5) * width;
            const baseY = (Math.cos(seed * 1.5) * 0.5 + 0.5) * height;

            const centerX = width / 2;
            const centerY = height / 2;
            const dx = baseX - centerX;
            const dy = baseY - centerY;
            const distance = Math.sqrt(dx*dx + dy*dy);

            const zoomFactor = 1 + progress * 3;
            const newDistance = distance * zoomFactor;
            const angle = Math.atan2(dy, dx);

            const x = centerX + Math.cos(angle) * newDistance;
            const y = centerY + Math.sin(angle) * newDistance;

            if (x > 0 && x < width && y > 0 && y < height) {
                const alpha = Math.max(0, 1 - (newDistance / (width/2)) * 0.7);
                ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Central glowing orb
        const orbSize = 60 + progress * 180;
        const orbGradient = ctx.createRadialGradient(
            width/2, height/2, 0,
            width/2, height/2, orbSize
        );
        orbGradient.addColorStop(0, `rgba(96, 165, 250, ${0.9 - progress * 0.5})`);
        orbGradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.4 - progress * 0.3})`);
        orbGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
        ctx.fillStyle = orbGradient;
        ctx.fillRect(0, 0, width, height);

        // Convert to image
        const img = new Image();
        img.src = tempCanvas.toDataURL('image/jpeg', 0.9);
        frames.push(img);
    }

    return frames;
}

// Usage
const placeholderFrames = generatePlaceholderFrames(280, 1920, 1080);
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Frames not loading** | Check file paths and naming convention |
| **Animation stutters** | Reduce frame count or compress images more |
| **Canvas is blank** | Ensure canvas dimensions are set before drawing |
| **Mobile issues** | Implement proper mobile fallback |
| **Memory issues** | Reduce resolution or frame count |

### Debug Mode

```javascript
// Add this to debug frame loading
function debugFrameLoading() {
    console.log('Total frames:', frames.length);
    console.log('Loaded frames:', frames.filter(f => f).length);
    console.log('Current frame:', currentFrame);

    // Check if specific frame exists
    console.log('Frame 0:', frames[0] ? 'OK' : 'MISSING');
    console.log('Frame 100:', frames[100] ? 'OK' : 'MISSING');
}
```

---

## Quick Reference

### Minimum Code Needed

```html
<div class="scroll-container" style="height:500vh">
  <div style="position:sticky;top:0;height:100vh">
    <canvas id="canvas"></canvas>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);
const frames = [], canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1920; canvas.height = 1080;

// Load frames then animate
Promise.all(Array.from({length:280}, (_,i) =>
  new Promise(r => { const img = new Image(); img.onload = () => r(frames[i]=img); img.src = `/frames/frame-${String(i+1).padStart(3,'0')}.jpg`; })
)).then(() => {
  const counter = {frame:0};
  gsap.to(counter, {frame:279, snap:'frame', ease:'none',
    scrollTrigger: {trigger:'.scroll-container', start:'top top', end:'bottom bottom', scrub:1},
    onUpdate: () => { ctx.clearRect(0,0,1920,1080); ctx.drawImage(frames[Math.round(counter.frame)],0,0); }
  });
});
</script>
```

---

## Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Adaline.ai](https://www.adaline.ai) - Inspiration
- [Apple Product Pages](https://www.apple.com/macbook-pro/) - Similar technique

---

**Created for WordPress implementation reference.**

*Last updated: February 2025*
