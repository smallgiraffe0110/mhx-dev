import type { Metadata } from "next";
import { Globe } from "@/components/Globe";
import { FormDisclosure } from "@/components/FormDisclosure";
import { MailForm, type MailField } from "@/components/MailForm";

export const metadata: Metadata = {
  title: "work with us",
  description:
    "Bring mhx the hard part. Who should reach out, what we're good at, and how to start.",
};

const FIELDS: MailField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Company or project", autoComplete: "organization" },
  { name: "when", label: "When you need it", hint: "A date, a quarter, or \"yesterday\"." },
  {
    name: "what",
    label: "What are you working on, and where are you stuck?",
    type: "textarea",
    required: true,
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 lg:min-h-[100svh] lg:pt-0">
        <div className="mx-auto grid max-w-[88rem] items-center gap-4 px-5 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[1.1fr_1fr] lg:px-12">
          <h1 className="relative z-10 font-display text-[clamp(4rem,11vw,10.5rem)] leading-[1] tracking-[-0.035em] lg:-mr-24">
            bring us
            <br />
            the hard
            <br />
            part<span className="text-sodium">.</span>
          </h1>
          <div className="relative -mx-5 sm:mx-0">
            <Globe
              label="A slowly turning globe at night with city lights and an orbit ring"
              className="aspect-square w-full"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="who"
        className="mx-auto max-w-[88rem] border-t border-starlight/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <h2 id="who" className="max-w-[18ch] font-display text-4xl leading-tight sm:text-5xl">
          Very simply, who should reach out
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="font-display text-2xl text-sodium">Network</h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-starlight/80">
              Founders, operators, and companies with a real problem and a
              deadline. If something needs to exist and nobody on your team has
              the hours, that&apos;s us.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-sodium">Skills</h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-starlight/80">
              Product engineering, AI and automation, design, and getting a
              first version into users&apos; hands. We work end to end, from
              the database to the pixels.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <FormDisclosure buttonLabel="Collaborate">
            <div className="max-w-3xl">
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-haze">
                Tell us what you&apos;re building and where it hurts. We read
                everything and answer within two working days.
              </p>
              <MailForm
                subject="Collaborate with mhx"
                fields={FIELDS}
                submitLabel="Send message"
              />
            </div>
          </FormDisclosure>
        </div>
      </section>
    </>
  );
}
