import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Isometric voxel blocks: the stars stacked as a cube tower in the language colour.";

const W = 13, H = 7.5, V = 13;

// One isometric cube centred on its top face: lit top, plain left, shaded right.
const cube = (x, y, fill) =>
  `<g stroke="#0c0e15" stroke-width=".6" stroke-linejoin="round">
    <path d="M${x - W} ${y}L${x} ${y + H}V${y + H + V}L${x - W} ${y + V}Z" fill="${fill}"/>
    <path d="M${x + W} ${y}L${x} ${y + H}V${y + H + V}L${x + W} ${y + V}Z" fill="${fill}"/><path d="M${x + W} ${y}L${x} ${y + H}V${y + H + V}L${x + W} ${y + V}Z" fill="#000" fill-opacity=".32"/>
    <path d="M${x} ${y - H}L${x + W} ${y}L${x} ${y + H}L${x - W} ${y}Z" fill="${fill}"/><path d="M${x} ${y - H}L${x + W} ${y}L${x} ${y + H}L${x - W} ${y}Z" fill="#fff" fill-opacity=".35"/>
  </g>`;

const tower = (x, y, n, fill) => Array.from({ length: n }, (_, i) => cube(x, y - i * V, fill)).join("");

// Blocky isometric scene: a star tower (taller with more stars) and a small fork stack on a voxel slab.
export default (r) => {
  const n = Math.min(6, 1 + Math.floor(Math.log10(r.starCount + 1) * 1.6));
  const f = 1 + (r.forks !== "0") + /\d\d|[KMB]/.test(r.forks);
  const [x, y] = [322, 100];
  return svg(
    r.name,
    `${motion(".vx-top{animation:vx-top 3.5s ease-in-out infinite}@keyframes vx-top{50%{transform:translateY(-3px)}}")}
<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="12"/></clipPath>
  <pattern id="iso" width="26" height="15" patternUnits="userSpaceOnUse"><path d="M0 7.5L13 0L26 7.5L13 15Z" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#151826"/><rect width="400" height="150" fill="url(#iso)"/>
</g>
${tower(x, y + V, 1, "#3b4157")}${tower(x - W, y + V + H, 1, "#3b4157")}${tower(x + W, y + V + H, 1, "#3b4157")}
${tower(x, y, n - 1, r.lang.color)}<g class="vx-top">${cube(x, y - (n - 1) * V, r.lang.color)}</g>
${tower(x + W, y + H, f, "#c9cede")}
<g font-family="${FONT}">
  <text x="${x}" y="${y - (n - 1) * V - H - 7}" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">★ ${esc(r.stars)}</text>
  <text x="22" y="42" font-size="20" font-weight="800" fill="#fff">${esc(fit(r.name, 245, 20))}</text>
  <text font-size="12.5" fill="#a9afc6">${lines(wrap(r.description, 36), 22, 64, 16)}</text>
  ${row(stats(r, { cy: 122, size: 12, text: 'fill="#fff" font-weight="600"', icon: 'fill="#c9cede"' }), 22, 16)}
</g>`,
  );
};
