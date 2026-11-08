"use client";

import { useEffect, useRef } from "react";
import map from "@/data/us-night.json";
import { createGlowSprite, stamp } from "@/lib/glow";
import { fitCanvas, runWhileVisible } from "@/lib/canvasLoop";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Point = readonly [number, number];
type Variant = "full" | "mini";

type NightMapProps = {
  variant?: Variant;
  label: string;
  className?: string;
};

type Arc = {
  from: Point;
  to: Point;
  ctrl: Point;
  start: number;
  travel: number;
};

type Frame = { scale: number; ox: number; oy: number };

const ARC_FADE_MS = 1100;
const TRAIL = 0.34;
const TRAIL_STEPS = 28;
const MAX_GHOSTS = 22;
const MAX_ACTIVE = 7;
const SPAWN_EVERY_MS = 520;

const hubs = map.hubs as unknown as Point[];
const lights = map.lights as unknown as [number, number, number][];
const places = map.places as unknown as Record<"utah" | "texas", Point>;

function frameFor(variant: Variant, width: number, height: number): Frame {
  if (variant === "mini") {
    const scale = Math.min(
      (width * 0.92) / map.width,
      (height * 0.9) / map.height,
    );
    return {
      scale,
      ox: (width - map.width * scale) / 2,
      oy: (height - map.height * scale) / 2,
    };
  }
  if (width >= 1024) {
    // Keep the map left of the fellowship text column, which sits at the
    // right edge of the 88rem (1408px) container with 48px padding and is
    // 30rem (480px) wide.
    const container = Math.min(width, 1408);
    const containerLeft = (width - container) / 2;
    const textLeft = containerLeft + container - 48 - 480;
    const ox = Math.max(width * 0.025, containerLeft + 16);
    const scale = Math.min(
      (textLeft - 48 - ox) / map.width,
      (height * 0.76) / map.height,
    );
    return {
      scale,
      ox,
      oy: height - map.height * scale - height * 0.07,
    };
  }
  const scale = (width * 0.98) / map.width;
  return {
    scale,
    ox: (width - map.width * scale) / 2,
    oy: height - map.height * scale - 20,
  };
}

function bezier(a: Point, c: Point, b: Point, t: number): Point {
  const u = 1 - t;
  return [
    u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
    u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
  ];
}

function makeArc(from: Point, to: Point, start: number): Arc {
  const dist = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const lift = Math.min(dist * 0.32, 150);
  return {
    from,
    to,
    ctrl: [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 - lift],
    start,
    travel: 1300 + dist * 2.6,
  };
}

function randomArc(start: number): Arc {
  for (let i = 0; i < 40; i++) {
    const a = hubs[Math.floor(Math.random() * hubs.length)];
    const b = hubs[Math.floor(Math.random() * hubs.length)];
    const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
    if (d > 150 && d < 640) return makeArc(a, b, start);
  }
  return makeArc(hubs[0], hubs[1], start);
}

function drawStatic(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  frame: Frame,
  dpr: number,
  variant: Variant,
) {
  const { scale, ox, oy } = frame;
  ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);

  const land = new Path2D(map.outline);
  ctx.fillStyle = "rgba(12, 19, 34, 0.7)";
  ctx.fill(land);
  ctx.lineWidth = 1 / scale;
  ctx.strokeStyle = "rgba(239, 231, 217, 0.08)";
  ctx.stroke(land);

  ctx.globalCompositeOperation = "lighter";
  const glowBoost = variant === "mini" ? 1.35 : 1;
  for (const [x, y, pop] of lights) {
    const root = Math.sqrt(pop);
    const radius = Math.min(1.4 + root / 120, 16) * glowBoost;
    ctx.globalAlpha = Math.min(0.28 + root / 1400, 0.95);
    stamp(ctx, sprite, x, y, radius);
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

function strokeCurve(
  ctx: CanvasRenderingContext2D,
  arc: Arc,
  t0: number,
  t1: number,
) {
  ctx.beginPath();
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const [x, y] = bezier(arc.from, arc.ctrl, arc.to, t0 + ((t1 - t0) * i) / steps);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawGhosts(ctx: CanvasRenderingContext2D, ghosts: Arc[], scale: number, alpha: number) {
  ctx.lineWidth = 0.9 / scale;
  ctx.strokeStyle = `rgba(255, 164, 58, ${alpha})`;
  for (const arc of ghosts) strokeCurve(ctx, arc, 0, 1);
}

// Returns false once the arc has fully faded.
function drawArc(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  arc: Arc,
  now: number,
  scale: number,
): boolean {
  const elapsed = now - arc.start;
  if (elapsed < 0) return true;
  const head = Math.min(elapsed / arc.travel, 1);
  const fade = head < 1 ? 1 : 1 - (elapsed - arc.travel) / ARC_FADE_MS;
  if (fade <= 0) return false;

  const tail = Math.max(0, head - TRAIL);
  ctx.lineWidth = 1.6 / scale;
  ctx.lineCap = "round";
  for (let i = 0; i < TRAIL_STEPS; i++) {
    const a = tail + ((head - tail) * i) / TRAIL_STEPS;
    const b = tail + ((head - tail) * (i + 1)) / TRAIL_STEPS;
    const [x0, y0] = bezier(arc.from, arc.ctrl, arc.to, a);
    const [x1, y1] = bezier(arc.from, arc.ctrl, arc.to, b);
    ctx.strokeStyle = `rgba(255, 186, 102, ${((i + 1) / TRAIL_STEPS) * 0.9 * fade})`;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "lighter";
  if (head < 1) {
    const [hx, hy] = bezier(arc.from, arc.ctrl, arc.to, head);
    ctx.globalAlpha = 0.95;
    stamp(ctx, sprite, hx, hy, 9 / scale + 4);
  } else {
    // Arrival: the destination flares and a ring spreads out.
    const p = (elapsed - arc.travel) / ARC_FADE_MS;
    ctx.globalAlpha = fade;
    stamp(ctx, sprite, arc.to[0], arc.to[1], 12 / scale + 6);
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1 / scale;
    ctx.strokeStyle = `rgba(255, 196, 120, ${0.6 * fade})`;
    ctx.beginPath();
    ctx.arc(arc.to[0], arc.to[1], 4 + p * 18, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  return true;
}

function drawPlaceMarkers(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  scale: number,
  now: number,
) {
  ctx.globalCompositeOperation = "lighter";
  for (const [i, p] of [places.utah, places.texas].entries()) {
    const pulse = ((now / 2400 + i * 0.5) % 1 + 1) % 1;
    ctx.globalAlpha = 1;
    stamp(ctx, sprite, p[0], p[1], 14 / scale + 8);
    ctx.lineWidth = 1.2 / scale;
    ctx.strokeStyle = `rgba(255, 196, 120, ${0.7 * (1 - pulse)})`;
    ctx.beginPath();
    ctx.arc(p[0], p[1], 6 + pulse * 26, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

export function NightMap({ variant = "full", label, className }: NightMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = createGlowSprite();
    const layer = document.createElement("canvas");
    let frame: Frame = { scale: 1, ox: 0, oy: 0 };
    let dpr = 1;

    const active: Arc[] = [];
    const ghosts: Arc[] = [];
    let lastSpawn = -Infinity;
    let miniForward = true;

    const between = makeArc(places.utah, places.texas, 0);

    const layout = () => {
      const size = fitCanvas(canvas);
      dpr = size.dpr;
      frame = frameFor(variant, size.width, size.height);
      layer.width = canvas.width;
      layer.height = canvas.height;
      const lctx = layer.getContext("2d");
      if (lctx) drawStatic(lctx, sprite, frame, dpr, variant);
    };

    const paintBase = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(
        dpr * frame.scale,
        0,
        0,
        dpr * frame.scale,
        dpr * frame.ox,
        dpr * frame.oy,
      );
    };

    const paintStill = () => {
      paintBase();
      if (variant === "mini") {
        drawGhosts(ctx, [between], frame.scale, 0.55);
        drawPlaceMarkers(ctx, sprite, frame.scale, 0);
        return;
      }
      const still: Arc[] = [];
      for (let i = 0; i < 16; i++) still.push(randomArc(0));
      drawGhosts(ctx, still, frame.scale, 0.2);
    };

    const tick = (now: number) => {
      paintBase();
      const { scale } = frame;

      if (variant === "mini") {
        drawGhosts(ctx, [between], scale, 0.12);
        if (active.length === 0 && now - lastSpawn > 700) {
          active.push(
            miniForward
              ? makeArc(places.utah, places.texas, now)
              : makeArc(places.texas, places.utah, now),
          );
          miniForward = !miniForward;
          lastSpawn = now;
        }
      } else {
        drawGhosts(ctx, ghosts, scale, 0.085);
        if (active.length < MAX_ACTIVE && now - lastSpawn > SPAWN_EVERY_MS) {
          active.push(randomArc(now));
          lastSpawn = now;
        }
      }

      for (let i = active.length - 1; i >= 0; i--) {
        const alive = drawArc(ctx, sprite, active[i], now, scale);
        if (alive) continue;
        if (variant === "full") {
          ghosts.push(active[i]);
          if (ghosts.length > MAX_GHOSTS) ghosts.shift();
        }
        active.splice(i, 1);
        if (variant === "mini") lastSpawn = now;
      }

      if (variant === "mini") drawPlaceMarkers(ctx, sprite, scale, now);
    };

    // Paint the city lights right away so the canvas is never blank,
    // even before the animation loop starts.
    const relayout = () => {
      layout();
      if (reducedMotion) paintStill();
      else paintBase();
    };
    relayout();

    const ro = new ResizeObserver(relayout);
    ro.observe(canvas);

    const stop = reducedMotion ? () => {} : runWhileVisible(canvas, tick);
    return () => {
      ro.disconnect();
      stop();
    };
  }, [variant, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={className}
    />
  );
}
