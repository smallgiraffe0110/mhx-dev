"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[88rem] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 sm:px-8 lg:px-12"
      >
        <Link
          href="/"
          className="font-display text-[1.75rem] leading-none tracking-tight text-starlight"
        >
          mhx<span className="text-sodium">.</span>
        </Link>

        <ul className="flex items-center gap-2 sm:gap-3">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname === `${link.href}/`;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full border px-3.5 py-1.5 text-[0.8125rem] transition-colors sm:px-5 sm:text-sm ${
                    active
                      ? "border-sodium/60 bg-sodium/10 text-sodium"
                      : "border-starlight/15 text-starlight/80 hover:border-starlight/40 hover:text-starlight"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
