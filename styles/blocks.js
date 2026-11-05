import { MONO, esc, fit, lines, motion, svg, wrap, rng } from "../card.js";

export const about = "Falling-blocks puzzle: a well of stacked blocks with a piece in the language colour dropping in and a line about to clear; score = stars, lines = forks.";

// The seven four-block pieces as [column, row] cells.
const SHAPES = [[[0, 0], [1, 0], [2, 0], [3, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[0, 0], [1, 0], [2, 0], [1, 1]], [[0, 0], [1, 0], [1, 1], [2, 1]],
  [[1, 0], [2, 0], [0, 1], [1, 1]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[2, 0], [0, 1], [1, 1], [2, 1]]];
const COLORS = ["#22d3ee", "#facc15", "#a855f7", "#22c55e", "#ef4444", "#3b82f6", "#f97316"];

// One bevelled block of size s with its top-left corner at x, y.
const block = (x, y, fill, s = 10) =>
  `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${fill}"/><path d="M${x + 0.5} ${y + s - 1}V${y + 0.5}H${x + s - 1}" fill="none" stroke="#fff" stroke-opacity=".55"/><path d="M${x + 1} ${y + s - 0.5}H${x + s - 0.5}V${y + 1}" fill="none" stroke="#000" stroke-opacity=".4"/>`;

const box = (x, label, value, size, extra = "") =>
  `<rect x="${x}" y="98" width="80" height="40" rx="4" fill="#161a33" stroke="#2a3050"/><text x="${x + 8}" y="111" font-size="8.5" fill="#8b93b8" letter-spacing="1">${label}</text>${extra}<text x="${x + 8}" y="130" font-size="${size}" font-weight="700" fill="#fff">${esc(fit(value, 66, size))}</text>`;

// A dark 10×13 well on the left; the bottom five rows are a seeded stack whose fourth row is full and flashes.
export default (r) => {
  const rnd = rng(r.name);
  const pick = () => Math.floor(rnd() * 7);
  const stack = [0.35, 0.6, 0.8, 1, 0.85]
    .map((p, k) => {
      const hole = Math.floor(rnd() * 10);
      return Array.from({ length: 10 }, (_, c) => (p === 1 || (c !== hole && rnd() < p) ? block(20 + c * 10, 90 + k * 10, COLORS[pick()]) : "")).join("");
    })
    .join("");
  const piece = SHAPES[pick()].map(([x, y]) => block(50 + x * 10, 10 + y * 10, r.lang.color)).join("");
  const next = SHAPES[pick()].map(([x, y]) => block(341 + x * 8, 30 + y * 8, COLORS[pick()], 8)).join("");
  return svg(
    r.name,
    `<defs><pattern id="blk-grid" x="20" y="10" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0V10H0" fill="none" stroke="#161b33"/></pattern></defs>
${motion(`.blk-drop{animation:blk-drop 5s steps(1,end) infinite}
@keyframes blk-drop{20%{transform:translateY(10px)}40%{transform:translateY(20px)}60%{transform:translateY(30px)}80%,100%{transform:translateY(40px)}}
.blk-flash{animation:blk-flash 5s infinite}
@keyframes blk-flash{0%,82%,100%{opacity:0}86%,94%{opacity:.75}90%{opacity:.25}}`)}
<rect width="400" height="150" rx="12" fill="#0d1020"/>
<rect x="17" y="7" width="106" height="136" rx="3" fill="#05060d" stroke="#2a3050" stroke-width="2"/>
<rect x="20" y="10" width="100" height="130" fill="url(#blk-grid)"/>
${stack}
<rect class="blk-flash" x="20" y="120" width="100" height="10" fill="#fff" opacity="0"/>
<g class="blk-drop">${piece}</g>
<rect x="330" y="12" width="54" height="46" rx="4" fill="#161a33" stroke="#2a3050"/>${next}
<g font-family="${MONO}">
  <text x="357" y="24" font-size="8" fill="#8b93b8" text-anchor="middle" letter-spacing="1.5">NEXT</text>
  <text x="136" y="30" font-size="16" font-weight="700" fill="#fff">${esc(fit(r.name, 186, 16))}</text>
  <text x="136" y="46" font-size="10" fill="#8b93b8">${esc(fit(r.owner, 186, 10))}</text>
  <text font-size="10" fill="#c7cbe0">${lines(wrap(r.description, 39), 136, 74, 13)}</text>
  ${box(136, "SCORE", `★${r.stars}`, 14)}
  ${box(219, "LINES", `⑂${r.forks}`, 14)}
  ${box(302, "LANG", r.lang.name, 11, `<circle cx="372" cy="108" r="4" fill="${r.lang.color}"/>`)}
</g>`,
  );
};
