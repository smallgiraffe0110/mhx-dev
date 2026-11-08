// A soft streetlight glow, drawn once and stamped many times.
// Stamping a prebuilt sprite is far cheaper than a gradient per light.
export function createGlowSprite(size = 64): HTMLCanvasElement {
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;

  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0, "rgba(255, 238, 204, 1)");
  g.addColorStop(0.12, "rgba(255, 196, 112, 0.85)");
  g.addColorStop(0.35, "rgba(255, 164, 58, 0.28)");
  g.addColorStop(0.7, "rgba(185, 83, 26, 0.06)");
  g.addColorStop(1, "rgba(185, 83, 26, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export function stamp(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  x: number,
  y: number,
  radius: number,
) {
  ctx.drawImage(sprite, x - radius, y - radius, radius * 2, radius * 2);
}
