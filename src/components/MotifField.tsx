"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Small things every founder carries. Cards drift and trade places.
const MOTIFS = [
  "the first customer",
  "a 2 a.m. commit",
  "the cofounder call",
  "v0.1, shipped anyway",
  "rent, paid by the product",
  "a whiteboard nobody erased",
  "the hard no",
  "the night it worked",
  "payroll, met",
  "one more try",
  "the first hire",
  "a handshake in the parking lot",
  "the second customer",
  "the demo that didn't crash",
];

type Slot = {
  top: string;
  left: string;
  size: "sm" | "md" | "lg";
  driftX: string;
  driftY: string;
  duration: string;
  mobile?: { top: string; left: string };
  wideOnly?: boolean;
};

function slotClass(slot: Slot): string {
  if (slot.wideOnly) return "hidden xl:block top-(--t) left-(--l)";
  if (!slot.mobile) return "hidden lg:block top-(--t) left-(--l)";
  return "top-(--mt) left-(--ml) lg:top-(--t) lg:left-(--l)";
}

// Positions keep clear of the headline, paragraph, and the panel.
// `mobile` places a card in the band above the headline on small screens;
// cards without it only appear from the lg breakpoint.
const SLOTS: Slot[] = [
  { top: "13%", left: "5%", mobile: { top: "86px", left: "20px" }, size: "md", driftX: "14px", driftY: "-10px", duration: "19s" },
  { top: "17%", left: "31%", mobile: { top: "146px", left: "34%" }, size: "lg", driftX: "-12px", driftY: "12px", duration: "24s" },
  { top: "11%", left: "53%", size: "sm", driftX: "10px", driftY: "12px", duration: "21s", wideOnly: true },
  { top: "42%", left: "55%", size: "md", driftX: "-10px", driftY: "16px", duration: "22s", wideOnly: true },
  { top: "84%", left: "6%", size: "lg", driftX: "16px", driftY: "-12px", duration: "26s" },
  { top: "89%", left: "33%", size: "sm", driftX: "-10px", driftY: "-8px", duration: "18s", wideOnly: true },
  { top: "81%", left: "52%", size: "md", driftX: "12px", driftY: "-10px", duration: "23s", wideOnly: true },
];

const SIZE_CLASS: Record<Slot["size"], string> = {
  sm: "px-3 py-2 text-[0.8125rem]",
  md: "px-4 py-2.5 text-[0.9375rem]",
  lg: "px-5 py-3.5 text-[1.0625rem]",
};

const HOLD_MS = 2600;
const FADE_MS = 1200;

export function MotifField() {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState<number[]>(() => SLOTS.map((_, i) => i));
  const [fading, setFading] = useState<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let swapTimer: ReturnType<typeof setTimeout> | undefined;
    let slot = 0;

    const interval = setInterval(() => {
      slot = (slot + 3) % SLOTS.length; // hop around so neighbours don't change together
      const target = slot;
      setFading(target);
      swapTimer = setTimeout(() => {
        setShown((current) => {
          const unused = MOTIFS.map((_, i) => i).filter((i) => !current.includes(i));
          const next = unused[Math.floor(Math.random() * unused.length)];
          return current.map((m, i) => (i === target ? next : m));
        });
        setFading(null);
      }, FADE_MS);
    }, HOLD_MS);

    return () => {
      clearInterval(interval);
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, [reducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SLOTS.map((slot, i) => (
        <div
          key={i}
          className={`absolute ${slotClass(slot)}`}
          style={
            {
              "--t": slot.top,
              "--l": slot.left,
              "--mt": slot.mobile?.top,
              "--ml": slot.mobile?.left,
            } as React.CSSProperties
          }
        >
          <div
            className={reducedMotion ? "" : "animate-drift"}
            style={
              {
                "--drift-x": slot.driftX,
                "--drift-y": slot.driftY,
                animationDuration: slot.duration,
              } as React.CSSProperties
            }
          >
            <div
              className={`flex items-center gap-2.5 rounded-xl border border-starlight/10 bg-dusk/55 whitespace-nowrap text-starlight/80 backdrop-blur-sm transition-opacity ease-in-out ${SIZE_CLASS[slot.size]}`}
              style={{
                opacity: fading === i ? 0 : 1,
                transitionDuration: `${FADE_MS}ms`,
              }}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-sodium shadow-[0_0_10px_2px_rgb(255_164_58/0.55)]" />
              {MOTIFS[shown[i]]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
