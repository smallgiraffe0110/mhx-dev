import Link from "next/link";
import { MotifField } from "@/components/MotifField";

const PILLARS = [
  {
    href: "/work-with-us",
    title: "Consulting",
    body: "We build software with companies that need it shipped, not described.",
  },
  {
    href: "/us#foundry",
    title: "Foundry",
    body: "We start and run our own ventures, from first commit to paying customers.",
  },
  {
    href: "/fellowship",
    title: "Fellowship",
    body: "We bring builders into the network and help them ship their own thing.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-56 pb-16 lg:pt-28">
        <div className="horizon-glow absolute inset-0 -z-10" />
        <MotifField />

        <div className="relative mx-auto grid w-full max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_22rem] lg:items-center lg:px-12">
          <div>
            <h1 className="font-display text-[clamp(3.75rem,10.5vw,10rem)] leading-[0.88] tracking-[-0.03em]">
              forged in
              <br />a new era<span className="text-sodium">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-starlight/80 sm:text-xl">
              mhx is a studio for builders. A few people with the right tools
              can now build what used to take a company, and we&apos;re
              organized around that.
            </p>
          </div>

          <aside
            aria-labelledby="stand-for"
            className="rounded-2xl border border-starlight/12 bg-dusk/70 p-6 backdrop-blur-md sm:p-7"
          >
            <h2 id="stand-for" className="font-display text-2xl">
              What we stand for
            </h2>
            <p className="mt-3 leading-relaxed text-haze">
              Small teams, real products, and the patience to let good work
              compound.
            </p>
            <ul className="mt-6 divide-y divide-starlight/10 border-t border-starlight/10">
              {PILLARS.map((pillar) => (
                <li key={pillar.title}>
                  <Link
                    href={pillar.href}
                    className="group block py-4 transition-colors"
                  >
                    <span className="flex items-baseline justify-between font-display text-xl group-hover:text-sodium">
                      {pillar.title}
                      <span
                        aria-hidden="true"
                        className="text-2xl leading-none text-haze transition-transform group-hover:translate-x-1 group-hover:text-sodium"
                      >
                        &rsaquo;
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-haze">
                      {pillar.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <p className="max-w-[24ch] font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.08] tracking-[-0.01em]">
          We build for clients, we build for ourselves, and we bring new
          builders in. Each one makes the other two better.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/work-with-us"
            className="rounded-full bg-sodium px-7 py-3 font-medium text-night transition-colors hover:bg-[#ffb860]"
          >
            Work with us
          </Link>
          <Link
            href="/fellowship"
            className="rounded-full border border-starlight/20 px-7 py-3 font-medium text-starlight transition-colors hover:border-starlight/50"
          >
            Apply to the fellowship
          </Link>
        </div>
      </section>
    </>
  );
}
