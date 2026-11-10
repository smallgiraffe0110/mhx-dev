# Foundry applications

The Foundry application posts to the same-origin Cloudflare Pages Function at `/api/foundry`. It validates all answers, rejects oversized and basic bot submissions, and sends a plain-text and HTML notification through authenticated TLS SMTP. Reply-To is the applicant. Recipients are configured on the server; visitors cannot choose them.

## Required runtime secrets

Set these for the `mhx-dev` Pages project's production environment (and separately for preview testing): `SMTP_HOST`, `SMTP_PORT` (465 or 587), `SMTP_USER`, `SMTP_PASS`, `NOTIFICATION_FROM`, and `NOTIFICATION_TO` (comma-separated addresses). Use a sender authorized by the mail account. Do not commit credentials. `.dev.vars.example` lists the local equivalents.

The handler returns 503 when credentials or recipients are missing and 502 when SMTP fails. The form retains answers and displays the error. It shows success only after the mail server accepts delivery for every configured recipient. SMTP acceptance is not confirmation of inbox placement. No application database or file uploads are included; applicants can share links or describe private work.

## Verification and release

Run `npm test` with Node 22.6+ and `npm run build`. Run `wrangler pages functions build --compatibility-date 2026-11-09 --compatibility-flags nodejs_compat --outdir /tmp/mhx-functions-build` to validate the server bundle. For a complete local preview, use `wrangler pages dev out` with `.dev.vars` configured. `next dev` alone does not serve Pages Functions.

Before production release, configure the recipients and SMTP account, submit one clearly labeled test application through a deployed preview, and confirm receipt. Existing GitHub Actions deploy `master` to production and other branches to previews. The Wrangler configuration preserves the current static Next.js site and adds the function.

Baseline spam controls are same-origin checking, bounded input, and a honeypot. Add Cloudflare rate limiting or Turnstile before a broad public launch. The SMTP Message-ID stays stable during an in-form retry but does not guarantee deduplication; retries following a lost response may produce duplicate notifications.
