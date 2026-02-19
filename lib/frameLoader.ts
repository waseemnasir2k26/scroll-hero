/**
 * Frame Sequence Loader
 * Loads image sequences with controlled concurrency and progress tracking
 */

export interface LoaderConfig {
  urlPattern: string;
  totalFrames: number;
  padding: number;
  concurrency: number;
}

/**
 * Generates a frame URL from the pattern
 */
export function getFrameUrl(pattern: string, frameIndex: number, padding: number): string {
  const paddedNumber = String(frameIndex + 1).padStart(padding, '0');
  return pattern.replace('{NUM}', paddedNumber);
}

/**
 * Loads a single image and returns a promise
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

/**
 * Loads an image with retry logic
 */
async function loadImageWithRetry(
  src: string,
  maxRetries: number = 1
): Promise<HTMLImageElement> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await loadImage(src);
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
      }
    }
  }

  throw lastError;
}

/**
 * Loads frame sequence with controlled concurrency
 */
export async function loadFrameSequence(
  config: LoaderConfig,
  onProgress: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const { urlPattern, totalFrames, padding, concurrency } = config;
  const frames: HTMLImageElement[] = new Array(totalFrames);
  let loadedCount = 0;

  // Create an array of frame indices
  const indices = Array.from({ length: totalFrames }, (_, i) => i);

  // Process frames in batches with controlled concurrency
  const processBatch = async (startIndex: number): Promise<void> => {
    const batch = indices.slice(startIndex, startIndex + concurrency);

    await Promise.all(
      batch.map(async (frameIndex) => {
        const url = getFrameUrl(urlPattern, frameIndex, padding);
        try {
          frames[frameIndex] = await loadImageWithRetry(url);
        } catch (error) {
          // Create a placeholder for failed images
          console.warn(`Failed to load frame ${frameIndex}, using placeholder`);
          frames[frameIndex] = createPlaceholderImage();
        }
        loadedCount++;
        onProgress(loadedCount, totalFrames);
      })
    );
  };

  // Load batches sequentially to maintain concurrency limit
  for (let i = 0; i < totalFrames; i += concurrency) {
    await processBatch(i);
  }

  return frames;
}

/**
 * Creates a placeholder image for failed loads
 */
function createPlaceholderImage(): HTMLImageElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d')!;

  // Fill with dark gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#050510');
  gradient.addColorStop(1, '#0a0a1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
}

/**
 * Preloads the first N frames quickly for immediate display
 */
export async function preloadInitialFrames(
  config: LoaderConfig,
  count: number,
  onProgress: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const { urlPattern, padding } = config;
  const frames: HTMLImageElement[] = [];

  for (let i = 0; i < count; i++) {
    const url = getFrameUrl(urlPattern, i, padding);
    try {
      frames[i] = await loadImageWithRetry(url);
    } catch {
      frames[i] = createPlaceholderImage();
    }
    onProgress(i + 1, count);
  }

  return frames;
}
