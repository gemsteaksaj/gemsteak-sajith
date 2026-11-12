// Generates tileable low-poly "faceted" SVG textures into public/textures.
// Run: node scripts/gen-textures.mjs
import { mkdirSync, writeFileSync } from "node:fs";

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function lowpoly({ name, size = 240, cells = 6, palette, seed = 7, jitter = 0.38 }) {
  const r = rng(seed);
  const step = size / cells;
  const pts = [];
  for (let y = 0; y <= cells; y++) {
    pts.push([]);
    for (let x = 0; x <= cells; x++) {
      const edge = x === 0 || y === 0 || x === cells || y === cells;
      const jx = edge ? 0 : (r() - 0.5) * 2 * jitter * step;
      const jy = edge ? 0 : (r() - 0.5) * 2 * jitter * step;
      pts[y].push([x * step + jx, y * step + jy]);
    }
  }
  const polys = [];
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const a = pts[y][x], b = pts[y][x + 1], c = pts[y + 1][x + 1], d = pts[y + 1][x];
      const tris = (x + y) % 2 ? [[a, b, c], [a, c, d]] : [[a, b, d], [b, c, d]];
      for (const t of tris) {
        const cx = (t[0][0] + t[1][0] + t[2][0]) / 3;
        const cy = (t[0][1] + t[1][1] + t[2][1]) / 3;
        // fake top-left lighting + noise picks a palette shade (palette ordered dark -> light)
        const light = 1 - (cx + cy) / (2 * size);
        let i = Math.round((light * 0.45 + r() * 0.55) * (palette.length - 1));
        i = Math.max(0, Math.min(palette.length - 1, i));
        const pts = t.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");
        polys.push(`<polygon points="${pts}" fill="${palette[i]}" stroke="${palette[i]}" stroke-width=".6"/>`);
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">${polys.join("")}</svg>`;
  writeFileSync(`public/textures/${name}.svg`, svg);
  console.log(`wrote public/textures/${name}.svg (${svg.length} bytes)`);
}

mkdirSync("public/textures", { recursive: true });
lowpoly({ name: "stone", palette: ["#6b7488", "#78829a", "#848ea5", "#909ab0", "#9ca5ba", "#aab2c5"], seed: 11 });
lowpoly({ name: "slate", palette: ["#323d5c", "#3a4668", "#424f74", "#4a5880", "#53628c", "#5d6d99"], seed: 23 });
lowpoly({ name: "ruby", size: 160, cells: 5, palette: ["#7d0a28", "#a3103a", "#c4173f", "#e0234e", "#f23d64", "#ff6b8b"], seed: 5, jitter: 0.42 });
lowpoly({ name: "wood", size: 200, cells: 4, palette: ["#5a3418", "#6b3f1d", "#7a4a23", "#8a552a", "#996232"], seed: 3, jitter: 0.2 });
