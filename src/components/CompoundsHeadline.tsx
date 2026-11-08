// "belief that compounds." Each word steps down and grows, the way a
// compounding curve does. A hand-drawn ribbon is traced around the steps.
const RIBBON =
  "M 40 74 C 120 40 260 44 318 62 C 362 76 344 176 392 206 C 440 236 540 210 578 236 C 622 268 596 380 642 408 C 690 440 1000 408 1166 424 C 1210 430 1206 520 1204 580 C 1202 628 1180 646 1120 648 C 900 656 620 656 470 644 C 414 638 408 560 404 520 C 398 472 360 448 316 444 C 268 438 284 296 250 268 C 216 240 84 262 46 236 C 16 214 8 100 40 74 Z";

export function CompoundsHeadline({ className }: { className?: string }) {
  return (
    <h1 className={className}>
      <span className="sr-only">belief that compounds.</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 1240 680"
        className="h-auto w-full overflow-visible"
      >
        <path
          d={RIBBON}
          pathLength={1}
          fill="none"
          stroke="var(--color-sodium)"
          strokeOpacity={0.85}
          strokeWidth={2}
          className="ribbon-line"
        />
        <path
          d={RIBBON}
          pathLength={1}
          fill="none"
          stroke="var(--color-ember)"
          strokeOpacity={0.7}
          strokeWidth={1.5}
          transform="translate(9 10)"
          className="ribbon-line"
          style={{ animationDelay: "0.45s" }}
        />
        <g
          fill="var(--color-starlight)"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <text x="62" y="150" fontSize="84">
            belief
          </text>
          <text x="334" y="342" fontSize="108">
            that
          </text>
          <text x="440" y="562" fontSize="132" letterSpacing="-2">
            compounds<tspan fill="var(--color-sodium)">.</tspan>
          </text>
        </g>
      </svg>
    </h1>
  );
}
