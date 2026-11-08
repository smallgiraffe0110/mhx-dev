// Runs a draw loop only while the canvas is on screen and the tab is visible.
// Returns a cleanup function.
export function runWhileVisible(
  canvas: HTMLCanvasElement,
  frame: (now: number) => void,
): () => void {
  let raf = 0;
  let onScreen = false;

  const tick = (now: number) => {
    frame(now);
    raf = requestAnimationFrame(tick);
  };

  const sync = () => {
    const shouldRun = onScreen && document.visibilityState === "visible";
    if (shouldRun && !raf) raf = requestAnimationFrame(tick);
    if (!shouldRun && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(canvas);
  document.addEventListener("visibilitychange", sync);

  return () => {
    io.disconnect();
    document.removeEventListener("visibilitychange", sync);
    if (raf) cancelAnimationFrame(raf);
  };
}

// Sizes a canvas to its CSS box at device resolution (capped at 2x).
export function fitCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  return { width, height, dpr };
}
