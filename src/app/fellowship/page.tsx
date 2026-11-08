import type { Metadata } from "next";
import { NightMap } from "@/components/NightMap";
import { MailForm, type MailField } from "@/components/MailForm";

export const metadata: Metadata = {
  title: "fellowship",
  description:
    "The mhx fellowship: builders across the country, connected by the work. What it is and how to apply.",
};

const FIELDS: MailField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "where", label: "Where you're based", autoComplete: "address-level2" },
  {
    name: "link",
    label: "Something you've built",
    type: "url",
    hint: "A repo, a site, a demo. Anything we can click.",
  },
  {
    name: "build",
    label: "What do you want to build next, and why you?",
    type: "textarea",
    required: true,
  },
];

const WHAT_WE_DO = [
  {
    title: "Build something real",
    body: "Fellows ship their own project with us working alongside, not grading from the side.",
  },
  {
    title: "Meet the network",
    body: "Founders, engineers, and operators who answer messages and make introductions.",
  },
  {
    title: "Keep the connections",
    body: "The fellowship ends. The people don't. Every cohort makes the network bigger.",
  },
];

export default function FellowshipPage() {
  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <NightMap
          label="The United States at night, city lights joined by arcs of light"
          className="absolute inset-0 -z-10 size-full"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(4_6_11/0.75),transparent_35%)] lg:bg-[linear-gradient(to_left,rgb(4_6_11/0.85),transparent_45%)]" />

        <div className="mx-auto flex min-h-[100svh] max-w-[88rem] px-5 pt-32 pb-16 sm:px-8 lg:justify-end lg:px-12 lg:pt-40">
          <div className="max-w-md lg:max-w-[30rem]">
            <h1 className="font-display text-[clamp(3.5rem,6.2vw,6rem)] leading-[0.9] tracking-[-0.03em]">
              the fellowship<span className="text-sodium">.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-starlight/85">
              Builders all over the country, each working on their own thing,
              joined by one network. Every light on this map is a place someone
              could be building from.
            </p>
            <a
              href="#apply"
              className="mt-8 inline-block rounded-full bg-sodium px-8 py-3.5 font-display text-2xl text-night transition-colors hover:bg-[#ffb860]"
            >
              Apply
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="what"
        className="mx-auto max-w-[88rem] border-t border-starlight/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <h2 id="what" className="font-display text-4xl sm:text-5xl">
          What we do
        </h2>
        <ul className="mt-14 grid gap-12 md:grid-cols-3 lg:gap-16">
          {WHAT_WE_DO.map((item) => (
            <li key={item.title} className="border-l border-sodium/40 pl-6">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-haze">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="apply"
        aria-labelledby="apply-title"
        className="scroll-mt-8 border-t border-starlight/10"
      >
        <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <h2 id="apply-title" className="font-display text-4xl sm:text-5xl">
            Apply
          </h2>
          <p className="mt-5 mb-10 max-w-xl text-lg leading-relaxed text-haze">
            Tell us who you are and what you want to build. Short is fine. A
            link to something you made says more than a résumé.
          </p>
          <div className="max-w-3xl">
            <MailForm
              subject="mhx fellowship application"
              fields={FIELDS}
              submitLabel="Send application"
            />
          </div>
        </div>
      </section>
    </>
  );
}
