"use client";

import { useEffect, useRef } from "react";
import globe from "@/data/globe.json";
import { createGlowSprite, stamp } from "@/lib/glow";
import { fitCanvas, runWhileVisible } from "@/lib/canvasLoop";
import { useReducedMotion } from "@/lib/useReducedMotion";

type GlobeProps = {
  label: string;
  className?: string;
};

type Vec = [number, number, number];

const DEG = Math.PI / 180;
const TILT = 0.42; // lean the north pole toward the viewer
const START_ROTATION = 98 * DEG; // the Americas face front
const SPIN_PER_MS = 0.0045 * DEG;
const ORBIT_PER_MS = 0.00042;

function toVec([lon, lat]: number[]): Vec {
  return [lat * DEG, lon * DEG, 0];
}

const dots = (globe.dots as number[][]).map(toVec);
const lights = (globe.lights as number[][]).map(toVec);

// Project a lat/lon on the rotated, tilted sphere. z > 0 faces the viewer.
function project([lat, lon]: Vec, rotation: number): Vec {
  const x = Math.cos(lat) * Math.sin(lon + rotation);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon + rotation);
  return [x, y * Math.cos(TILT) - z * Math.sin(TILT), y * Math.sin(TILT) + z * Math.cos(TILT)];
}

export function Globe({ label, className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = createGlowSprite();
    let width = 0;
    let height = 0;
    let dpr = 1;

    const layout = () => {
      const size = fitCanvas(canvas);
      width = size.width;
      height = size.height;
      dpr = size.dpr;
    };

    const paint = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * 0.34;
      const rotation = START_ROTATION - now * SPIN_PER_MS;

      // Orbit ring: an ellipse leaning across the globe.
      const orbitTilt = -0.32;
      const rx = r * 1.42;
      const ry = r * 0.34;
      const orbit = (a: number): [number, number] => {
        const ex = Math.cos(a) * rx;
        const ey = Math.sin(a) * ry;
        return [
          cx + ex * Math.cos(orbitTilt) - ey * Math.sin(orbitTilt),
          cy + ex * Math.sin(orbitTilt) + ey * Math.cos(orbitTilt),
        ];
      };
      const strokeOrbit = (from: number, to: number, alpha: number) => {
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) {
          const [x, y] = orbit(from + ((to - from) * i) / 64);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255, 164, 58, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      // Back half of the orbit sits behind the globe.
      strokeOrbit(Math.PI, Math.PI * 2, 0.22);

      // Atmosphere and body.
      const halo = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.32);
      halo.addColorStop(0, "rgba(255, 164, 58, 0.16)");
      halo.addColorStop(1, "rgba(255, 164, 58, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      const body = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r);
      body.addColorStop(0, "#111a2c");
      body.addColorStop(1, "#04060b");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Land as dots, brighter toward the middle of the visible face.
      const dot = Math.max(1.3, r / 150);
      for (const v of dots) {
        const [x, y, z] = project(v, rotation);
        if (z <= 0) continue;
        ctx.fillStyle = `rgba(160, 168, 186, ${0.18 + z * 0.62})`;
        ctx.fillRect(cx + x * r - dot / 2, cy - y * r - dot / 2, dot, dot);
      }

      ctx.globalCompositeOperation = "lighter";
      for (const v of lights) {
        const [x, y, z] = project(v, rotation);
        if (z <= 0.05) continue;
        ctx.globalAlpha = Math.min(1, z * 1.3);
        stamp(ctx, sprite, cx + x * r, cy - y * r, r * 0.05);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // Rim light.
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 196, 120, 0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Front half of the orbit and the craft riding it.
      strokeOrbit(0, Math.PI, 0.55);
      const a = ((now * ORBIT_PER_MS) % (Math.PI * 2)) + Math.PI * 0.15;
      const [sx, sy] = orbit(a);
      const inFront = Math.sin(a) > 0;
      const hidden = !inFront && Math.hypot(sx - cx, sy - cy) < r;
      if (!hidden) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = inFront ? 1 : 0.45;
        stamp(ctx, sprite, sx, sy, r * 0.09);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const relayout = () => {
      layout();
      paint(reducedMotion ? 0 : performance.now());
    };
    relayout();

    const ro = new ResizeObserver(relayout);
    ro.observe(canvas);

    const stop = reducedMotion ? () => {} : runWhileVisible(canvas, paint);
    return () => {
      ro.disconnect();
      stop();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={className}
    />
  );
}
