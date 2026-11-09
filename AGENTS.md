# MHX local prototype

Mikey and Hunter's four-page website prototype. This is an iterative prototype, not a finished production site. Work locally unless Mikey explicitly asks to publish or push. Mikey authorized sharing the prototype branch with Hunter; this does not authorize deployment. The GitHub repository is smallgiraffe0110/mhx-dev; it was unarchived on November 8, 2026, and MikWess has collaborator push access. The local prototype branch is codex/mhx-prototype.

## Design source and intent

- Source board: MHXBRAINSTORM.excalidraw (November 7), retained locally and excluded from the public repository. The implementation brief is in `.agent/design-reference/BRIEF.md`.
- User supplied a screenshot of four chosen wireframes: home with floating images and “forged in a new era.”; us with the belief/that/compounds staircase; collaboration; foundry.
- Mikey originally requested Saturn on Foundry; his latest request tries a close-up black-and-white Earth background there. The Saturn asset is retained.
- Mikey explicitly rejected the white Instrument Serif draft. Current direction is dark throughout, bold Inter sans-serif (measured on Z Fellows), compact monochrome founder/technology imagery, and an outward staggered entrance animation. Do not return to the serif/editorial direction.
- Read `.agent/design-reference/BRIEF.md` before design changes. The shared Granola brainstorm clarified the intent: young builders are the hero; signaling and collaboration/fellowship conversion; top navigation; desktop home fits one screen. Personal portfolio ideas in that meeting are a separate task.
- Treat visual references and Mikey’s conversation as evidence. Do not equate a borrowed font with meeting the brief; check composition, mood, hierarchy, content, motion, and responsive behavior together.

## Implementation

- Next.js App Router, TypeScript, React, Tailwind 4, static export.
- Four routes: `/`, `/us`, `/collaborate`, `/foundry`. Shared page composition lives in `src/components/Experience.tsx`; styling in `src/app/globals.css`.
- Collaboration and foundry forms are local UI previews: native validation, dialog keyboard handling, confirmation, no submission/storage/backend. Keep that distinction visible until real integration is requested.
- Assets are local in `public/images`; source/credit metadata is in `public/images/credits.json`. No remote font requests.
- Home now uses a full-width field of 126 uniform square tiles cycling through 53 sourced founder/technology photos, with a repeating radial wake, pause control, and reduced-motion support. Soft gradient fades behind the overlaid headline and thesis preserve readability. A feathered 115px pointer halo reveals original photo color across nearby tiles; keyboard focus also reveals color. This supersedes the compact varied-size cluster. Keep `.home-stage` overflow set to `clip` so focusing a photo or motion control cannot scroll the background out of alignment. Us uses real public GitHub portraits of Mikey and Hunter. Collaboration uses `collab-computing.mp4`, a 25 s monochrome loop cut from public-domain Prelinger Archives films (On Guard! 1956, Nation at Your Fingertips 1951) — it replaced the copyrighted a16z reference film, which was removed. Foundry uses `foundry-orbit-reel.mp4`, a 23.5 s monochrome loop cut from public-domain NASA ISS footage, full-bleed like Collaboration. Both films fade from/to black so a plain `loop` wraps cleanly, keep pause/play and reduced-motion handling, and credit their source in the footer. The Apollo 8 still (`earth-closeup.jpg`) and Cassini Saturn asset are retained but unused. Asset provenance lives in public/images/credits.json and public/video/credits.json; font licenses in public/fonts. Originals remain untouched.
- Original landing-page components are retained but unused, preserving the prior implementation.

## Run and verify

`npm ci`, then `npm run dev -- --hostname 127.0.0.1 --port 4328`.

Run `npm run build` for TypeScript and static-export validation. Stop the dev server before a production build, then restart it; concurrent runs produced stale preview CSS during the initial session. If changed CSS still fails to appear after a restart, stop dev and move `.next/dev` outside the repo before restarting; verify computed styles in the browser.

Inspect all four routes on desktop and narrow/mobile widths. Check both dialogs, required fields, confirmation wording, Escape dismissal, navigation, loaded imagery, and no horizontal overflow. The existing `npm run lint` still uses legacy `next lint`; do not report it as a passing check.

Previous validation, November 8, source-led revision: production build and TypeScript/static export passed; four routes inspected on desktop and mobile; navigation, image dialog/Escape, video pause, required fields and both local form confirmations verified. Independent visual review completed; corrected cropped photo border, Us text collision, and bright-video contrast. No commit, push, deployment, or real form submission.

Latest validation, dark revision November 8: final build/TypeScript/static export passed. Browser inspected all four routes at desktop and 390px mobile; homepage 1440×900 measured scrollHeight900, no horizontal overflow. Local form confirmation, Escape, image viewer, and film pause checked. Independent review corrected motion direction, footer contrast, and Saturn source edge. No push or deployment.
