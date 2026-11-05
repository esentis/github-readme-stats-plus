import { esc, fit, lines, motion, svg, textWidth, wrap } from "../card.js";

export const about = "Sketchbook doodle on graph paper: a wobbly hand-drawn box, an arrow to a circled star count, handwriting.";

const HAND = "'Marker Felt', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

// Jitter comes from the repo name, so the doodle is the same on every render.
const rng = (s) => {
  let h = [...s].reduce((a, c) => Math.imul(a ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
  return () => (h = (Math.imul(h, 1103515245) + 12345) >>> 0) / 2 ** 32;
};

// A pencil sketch on graph paper: boxed title, notes, an arrow to a scribbled circle round the stars.
export default (r) => {
  const rand = rng(r.name);
  const j = (n) => +((rand() - 0.5) * 2 * n).toFixed(1);
  const stroke = (x1, y1, x2, y2) =>
    `M${x1 + j(1.5)} ${y1 + j(1.5)}Q${(x1 + x2) / 2 + j(3)} ${(y1 + y2) / 2 + j(3)} ${x2 + j(1.5)} ${y2 + j(1.5)}`;
  const box = (x, y, w, h) =>
    [stroke(x - 4, y, x + w + 5, y), stroke(x + w, y - 3, x + w, y + h + 4), stroke(x + w + 4, y + h, x - 5, y + h), stroke(x, y + h + 3, x, y - 4)].join("");
  // A loop that runs a little past a full turn, like a quick pen circle.
  const scribble = (cx, cy, rx, ry) => {
    const p = Array.from({ length: 12 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2 - 2.4;
      return [cx + Math.cos(a) * rx * (1 + j(0.06)), cy + Math.sin(a) * ry * (1 + j(0.08))];
    });
    const m = (a, b) => `${((a[0] + b[0]) / 2).toFixed(1)} ${((a[1] + b[1]) / 2).toFixed(1)}`;
    return `M${m(p[0], p[1])}` + p.slice(1, -1).map((q, i) => `Q${q[0].toFixed(1)} ${q[1].toFixed(1)} ${m(q, p[i + 2])}`).join("");
  };
  const lang = fit(r.lang.name, 90, 13, 0.55);
  return svg(
    r.name,
    `${motion(".sk-arrow{stroke-dasharray:1 2;animation:sk-arrow 6s ease-in-out infinite}@keyframes sk-arrow{0%,55%,100%{stroke-dashoffset:0}75%{stroke-dashoffset:1}}")}
<defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#9ec5e8" stroke-opacity=".45" stroke-width=".6"/></pattern></defs>
<rect width="400" height="150" rx="6" fill="#fdfdf7"/>
<rect width="400" height="150" rx="6" fill="url(#grid)"/>
<g fill="none" stroke="#2b2b2b" stroke-width="1.6" stroke-linecap="round">
  <path d="${box(16, 14, 258, 40)}${box(16, 14, 258, 40)}" stroke-width="1.2"/>
  <path class="sk-arrow" pathLength="1" d="${stroke(278, 30, 304, 46)}${stroke(296, 47, 305, 47)}${stroke(304, 47, 302, 38)}"/>
  <path d="${scribble(344, 60, 38, 23)}"/>
  <path d="${stroke(344 - textWidth(lang, 13, 0.27), 130, 344 + textWidth(lang, 13, 0.27), 129)}" stroke="${r.lang.color}" stroke-width="9" stroke-opacity=".55"/>
</g>
<g font-family="${HAND}" fill="#2b2b2b">
  <text x="28" y="42" font-size="21">${esc(fit(r.name, 236, 21, 0.56))}</text>
  <text font-size="13" fill="#3d4a5c">${lines(wrap(r.description, 36), 22, 82, 18)}</text>
  <text x="22" y="134" font-size="11" fill="#8a8f98">by ${esc(fit(r.owner, 160, 11, 0.55))}</text>
  <text x="344" y="67" font-size="${r.stars.length > 3 ? 17 : 20}" text-anchor="middle">★ ${esc(r.stars)}</text>
  <text x="344" y="105" font-size="13" text-anchor="middle">⑂ ${esc(r.forks)} forks</text>
  <text x="344" y="133" font-size="13" text-anchor="middle">${esc(lang)}</text>
</g>`,
  );
};
