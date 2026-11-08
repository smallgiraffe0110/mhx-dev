// Builds the static map data the site draws at runtime.
// Run with: node scripts/generate-geo.mjs  (output is committed, CI does not run this)
//
//   src/data/us-night.json  lower-48 outline + city lights, pre-projected (Albers)
//   src/data/globe.json     land dots on a sphere + major world city lights (lon/lat)

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { geoAlbers, geoPath, geoContains } from "d3-geo";
import { feature, merge } from "topojson-client";
import { presimplify, simplify, quantile } from "topojson-simplify";

const require = createRequire(import.meta.url);
const cities = require("all-the-cities");

const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

// ---------- America at night ----------
const WIDTH = 1000;
const HEIGHT = 620;
const NON_LOWER_48 = new Set(["02", "15", "60", "66", "69", "72", "78"]);

let states = JSON.parse(
  readFileSync(require.resolve("us-atlas/states-10m.json"), "utf8"),
);
states = presimplify(states);
states = simplify(states, quantile(states, 0.08));

const lower48 = {
  type: "GeometryCollection",
  geometries: states.objects.states.geometries.filter(
    (g) => !NON_LOWER_48.has(String(g.id)),
  ),
};
const nation = merge(states, lower48.geometries);

const projection = geoAlbers().fitExtent(
  [
    [8, 8],
    [WIDTH - 8, HEIGHT - 8],
  ],
  nation,
);
const outline = geoPath(projection).digits(1)(nation);

const usCities = cities
  .filter((c) => c.country === "US" && c.population >= 8000)
  .map((c) => {
    const [lon, lat] = c.loc.coordinates;
    return { lon, lat, name: c.name, pop: c.population };
  })
  .filter((c) => geoContains(nation, [c.lon, c.lat]))
  .sort((a, b) => b.pop - a.pop);

const lights = usCities.map((c) => {
  const [x, y] = projection([c.lon, c.lat]);
  return [round(x), round(y), c.pop];
});

// Hubs for the connection arcs: biggest cities, one per ~150px cell so arcs spread out.
const hubs = [];
for (const c of usCities) {
  const [x, y] = projection([c.lon, c.lat]);
  if (hubs.some((h) => Math.hypot(h[0] - x, h[1] - y) < 70)) continue;
  hubs.push([round(x), round(y)]);
  if (hubs.length >= 34) break;
}

// Where the founders are (shown on the /us mini map).
const places = Object.fromEntries(
  Object.entries({
    utah: [-111.89, 40.76],
    texas: [-97.74, 30.27],
  }).map(([key, lonLat]) => [key, projection(lonLat).map((n) => round(n))]),
);

writeFileSync(
  new URL("../src/data/us-night.json", import.meta.url),
  JSON.stringify({ width: WIDTH, height: HEIGHT, outline, lights, hubs, places }),
);

// ---------- Globe ----------
const world = JSON.parse(
  readFileSync(require.resolve("world-atlas/land-110m.json"), "utf8"),
);
const land = feature(world, world.objects.land);

// Fibonacci sphere: evenly spaced points, keep the ones on land.
const N = 28000;
const golden = Math.PI * (3 - Math.sqrt(5));
const dots = [];
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = ((((i * golden * 180) / Math.PI) % 360) + 540) % 360 - 180;
  if (geoContains(land, [lon, lat])) dots.push([round(lon), round(lat)]);
}

const worldLights = cities
  .filter((c) => c.population >= 1500000)
  .map((c) => [round(c.loc.coordinates[0]), round(c.loc.coordinates[1])]);

writeFileSync(
  new URL("../src/data/globe.json", import.meta.url),
  JSON.stringify({ dots, lights: worldLights }),
);

console.log(
  `us-night: outline ${outline.length} chars, ${lights.length} lights, ${hubs.length} hubs`,
);
console.log(`globe: ${dots.length} land dots, ${worldLights.length} lights`);
