import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Low-poly mosaic in shades of the language colour, seeded by the repo name.";

// Small seeded PRNG (FNV-1a hash of the name into mulberry32) so each repo keeps its own mosaic.
const rng = (seed) => {
  let h = [...seed].reduce((a, c) => Math.imul(a ^ c.charCodeAt(0), 16777619), 2166136261);
  return () => {
    let t = (h = (h + 0x6d2b79f5) | 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Low-poly triangle mosaic: the language colour lit and shaded per facet, white text on a dark scrim.
export default (r) => {
  const rand = rng(r.name);
  const pt = (c, k) => [c * 50 + (c % 8 ? (rand() - 0.5) * 36 : 0), k * 50 + (k % 3 ? (rand() - 0.5) * 36 : 0)];
  const grid = Array.from({ length: 9 }, (_, c) => Array.from({ length: 4 }, (_, k) => pt(c, k)));
  const tris = [];
  for (let c = 0; c < 8; c++)
    for (let k = 0; k < 3; k++) {
      const [a, b, d, e] = [grid[c][k], grid[c + 1][k], grid[c][k + 1], grid[c + 1][k + 1]];
      tris.push(...(rand() < 0.5 ? [[a, b, e], [a, e, d]] : [[a, b, d], [b, e, d]]));
    }
  const facets = tris
    .map((t) => {
      // Lighter toward the top right, plus per-facet noise.
      const s = (t[0][0] / 400) * 0.3 - (t[0][1] / 150) * 0.3 + (rand() - 0.5) * 0.3;
      return `<path d="M${t.map((p) => p.map((n) => n.toFixed(1)).join(" ")).join("L")}Z" fill="${s > 0 ? "#fff" : "#000"}" fill-opacity="${Math.abs(s).toFixed(2)}"/>`;
    })
    .join("");
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="12"/></clipPath>
  <linearGradient id="scrim"><stop offset="0" stop-color="#000" stop-opacity=".68"/><stop offset=".6" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="${r.lang.color}"/>
  ${facets}
  <rect width="400" height="150" fill="url(#scrim)"/>
</g>
<g font-family="${FONT}" fill="#fff">
  <text x="24" y="44" font-size="21" font-weight="700">${esc(fit(r.name, 330, 21))}</text>
  <text font-size="13" fill-opacity=".92">${lines(wrap(r.description, 44), 24, 68, 17)}</text>
  ${row(stats(r, { cy: 122, text: 'font-weight="600"', icon: 'fill="#fff"' }), 24, 20)}
</g>`,
  );
};
