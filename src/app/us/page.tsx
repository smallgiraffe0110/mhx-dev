import type { Metadata } from "next";
import Link from "next/link";
import { CompoundsHeadline } from "@/components/CompoundsHeadline";
import { NightMap } from "@/components/NightMap";

export const metadata: Metadata = {
  title: "us.",
  description:
    "Who mhx is, how we came to be, what you can expect from us, and why we build.",
};

// Portrait slots. Swap `initial` for a photo when there is one.
const FOUNDERS = [
  { initial: "M", name: "Michael Wessman", place: "Utah" },
  { initial: "H", name: "Hunter Earls", place: "Texas" },
];

export default function UsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[13rem_1fr] lg:gap-16 lg:px-12">
          <ul className="order-2 flex gap-5 lg:order-1 lg:flex-col lg:gap-0">
            {FOUNDERS.map((f) => (
              <li
                key={f.name}
                className="flex flex-col items-center gap-3 text-center lg:mb-6"
              >
                <div className="relative grid size-28 place-items-center overflow-hidden rounded-full border border-starlight/15 bg-[radial-gradient(circle_at_35%_30%,#1b2740,#04060b_75%)] sm:size-36 lg:size-44">
                  <span className="font-display text-6xl text-starlight/85 lg:text-7xl">
                    {f.initial}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(60%_100%_at_50%_100%,rgb(255_164_58/0.28),transparent)]" />
                </div>
                <p className="text-sm text-haze">
                  <span className="block text-starlight/90">{f.name}</span>
                  {f.place}
                </p>
              </li>
            ))}
          </ul>

          <div className="order-1 lg:order-2">
            <CompoundsHeadline className="mx-auto max-w-5xl" />
            <p className="mt-6 text-right">
              <Link
                href="#why"
                className="text-haze underline decoration-sodium/40 underline-offset-4 hover:text-starlight hover:decoration-sodium"
              >
                why we do what we do
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="story"
        className="mx-auto grid max-w-[88rem] gap-14 border-t border-starlight/10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-20 lg:px-12 lg:py-32"
      >
        <div className="max-w-2xl">
          <h2 id="story" className="font-display text-4xl sm:text-5xl">
            Our story
          </h2>
          <div className="mt-8 space-y-6 font-display text-xl leading-[1.55] text-starlight/85 sm:text-[1.375rem]">
            <p>
              mhx started as two people who kept building things on nights and
              weekends and comparing notes. The notes got longer, the projects
              got real, and at some point it made more sense to do it together.
            </p>
            <p>
              We&apos;re still the people who build. When you work with us you
              get us: the ones writing the code, making the calls, and
              answering your messages.
            </p>
          </div>

          <h3 className="mt-14 font-display text-2xl">What you can expect</h3>
          <ul className="mt-5 space-y-3 text-lg leading-relaxed text-haze">
            <li>Straight answers, including when the answer is no.</li>
            <li>Working software every week, not a status report.</li>
            <li>Work that still holds up a year after we hand it over.</li>
          </ul>
        </div>

        <figure className="self-start rounded-2xl border border-starlight/12 bg-dusk/40 p-3">
          <NightMap
            variant="mini"
            label="Night map of the United States with lights in Utah and Texas joined by a glowing arc"
            className="aspect-[1000/640] w-full"
          />
          <figcaption className="px-3 pt-3 pb-2">
            <span className="block font-display text-2xl">Where we are</span>
            <span className="mt-1 block leading-relaxed text-haze">
              Utah and Texas, mostly online. The network runs wherever the
              builders are.
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto grid max-w-[88rem] gap-16 border-t border-starlight/10 px-5 py-24 sm:px-8 md:grid-cols-2 lg:gap-24 lg:px-12 lg:py-32">
        <div id="foundry" className="scroll-mt-24">
          <h2 className="font-display text-4xl sm:text-5xl">Our foundry</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-starlight/80">
            Alongside client work we build our own products. Each one starts
            with a problem one of us has lived, gets a working version in
            weeks, and earns its next step from real users.
          </p>
        </div>
        <div id="why" className="scroll-mt-24">
          <h2 className="font-display text-4xl sm:text-5xl">
            Why we do what we do
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-starlight/80">
            Skills compound. So do trust, reputation, and the people you keep
            building with. A small group that keeps showing up for each other
            can build almost anything given ten years. We&apos;d like to find
            out what.
          </p>
        </div>
      </section>
    </>
  );
}
