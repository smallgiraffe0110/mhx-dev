import Link from "next/link";
import { CONTACT_EMAIL, NAV_LINKS } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-starlight/10">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-12">
        <div>
          <Link
            href="/"
            className="font-display text-6xl leading-none tracking-tight sm:text-7xl"
          >
            mhx<span className="text-sodium">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-haze">
            A studio for builders. Write to us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-starlight underline decoration-sodium/50 underline-offset-4 hover:decoration-sodium"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-starlight/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sodium">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-haze/70">&copy; {year} mhx</p>
        </div>
      </div>
    </footer>
  );
}
