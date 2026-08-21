/**
 * Preloads (downloads + decodes) a list of image URLs so that the browser can
 * paint them instantly when they first appear in the DOM.
 *
 * Without this, an <img> only starts fetching once React mounts it — which for
 * the battle cards happens at the exact moment the photo should already be
 * visible. The result is a dark card for a few frames, i.e. a visible flicker.
 *
 * `decode()` is the important part: a merely *downloaded* image still has to be
 * decoded before the first paint, and for large photos that alone costs frames.
 */

const preloaded = new Map<string, Promise<void>>();

export function preloadImage(url: string): Promise<void> {
  const cached = preloaded.get(url);
  if (cached) return cached;

  const task = new Promise<void>((resolve) => {
    const img = new Image();
    img.src = url;

    const done = () => resolve();

    // decode() resolves once the bitmap is ready to paint. It can reject (e.g.
    // for a broken file) — never let that break the game, just move on.
    if (typeof img.decode === 'function') {
      img.decode().then(done, done);
    } else {
      img.onload = done;
      img.onerror = done;
    }
  });

  preloaded.set(url, task);
  return task;
}

export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(urls.map(preloadImage));
}
