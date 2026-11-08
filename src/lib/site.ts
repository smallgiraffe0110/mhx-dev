export const SITE_URL = "https://mhx.dev";

// Every form on the site composes an email to this address.
// NOTE: mhx.dev has no MX records yet, so mail here bounces until
// Cloudflare Email Routing (or another inbox) is set up for it.
export const CONTACT_EMAIL = "hello@mhx.dev";

export const NAV_LINKS = [
  { href: "/us", label: "us." },
  { href: "/work-with-us", label: "work with us" },
  { href: "/fellowship", label: "fellowship" },
] as const;
