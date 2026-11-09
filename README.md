# MHX website prototype

Four exploratory pages for Mikey and Hunter. This is a working design prototype; expect substantial iteration.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
git clone --branch codex/mhx-prototype https://github.com/smallgiraffe0110/mhx-dev.git
cd mhx-dev
npm ci
npm run dev -- --hostname 127.0.0.1 --port 4328
```

Open http://127.0.0.1:4328.

- `/`: “forged in a new era.” with 126 uniform photo tiles from 53 sourced images across the page, soft fades behind the text, a repeating outward wake with pause/reduced-motion controls, and a soft cursor halo that reveals nearby photos in color.
- `/us`: story and belief/that/compounds composition.
- `/collaborate`: cinematic background and collaboration form preview.
- `/foundry`: close-up monochrome Earth background and application preview. The previous Saturn image is retained in `public/images/saturn.jpg`.

## Where to work

`src/components/Experience.tsx` contains the shared page compositions and dialogs. `src/app/globals.css` contains the styling, responsive layouts, and motion. Route wrappers are under `src/app/`.

Read `AGENTS.md` and `.agent/design-reference/BRIEF.md` for design intent. Images, video, and fonts are local; provenance and font licenses are alongside the assets. Reference imagery/footage is prototype material, not an MHX portfolio or endorsement; review usage before a public launch.

Forms are local previews with validation and confirmation only. They do not send or store applications or contact details.

## Validate

Stop the dev server, then run `npm run build` for TypeScript and static export checks. Restart dev afterward. If styles remain stale, stop dev and clear its generated `.next/dev` cache before restarting. Run `npm run lint` (ESLint 9 flat config) and `npm run typecheck`.

Desktop and 390px mobile layouts have been inspected; the latest build passed. Private brainstorm source material, downloaded reference HTML, and scratch copies are excluded from Git.

The existing GitHub workflow deploys pushes to `master`. Keep prototype work on this branch until a deployment is explicitly intended.
