import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Isometric 3D: a thick light slab with depth faces and a small staircase of blocks in the language colour.";

// An isometric box whose top face is centred at (x, y): a is the half width, h the height.
const box = (x, y, a, h, fill) => {
  const b = a * 0.577;
  const top = `${x},${y - b} ${x + a},${y} ${x},${y + b} ${x - a},${y}`;
  const right = `${x},${y + b} ${x + a},${y} ${x + a},${y + h} ${x},${y + b + h}`;
  const left = `${x - a},${y} ${x},${y + b} ${x},${y + b + h} ${x - a},${y + h}`;
  return `<g stroke="#1e293b" stroke-opacity=".35" stroke-width=".7" stroke-linejoin="round">
    <polygon points="${left}" fill="${fill}"/><polygon points="${right}" fill="${fill}"/><polygon points="${right}" fill="#0f172a" fill-opacity=".3"/>
    <polygon points="${top}" fill="${fill}"/><polygon points="${top}" fill="#fff" fill-opacity=".4"/></g>`;
};

// Blocks are listed back to front and stand on the platform at their base point.
// A light slab seen from above with its left and front edges extruded at 30°, holding a little block scene.
export default (r) => {
  const c = r.lang.color;
  return svg(
    r.name,
    `${motion(".is-hop{animation:is-hop 4s ease-in-out infinite}@keyframes is-hop{50%{transform:translateY(-3px)}}")}
<defs><pattern id="grid" width="24" height="13.86" patternUnits="userSpaceOnUse"><path d="M0 6.93L12 0L24 6.93L12 13.86Z" fill="none" stroke="#94a3b8" stroke-opacity=".18"/></pattern></defs>
<polygon points="18,4 18,124 6,131 6,11" fill="#b8c3d3"/>
<polygon points="18,124 394,124 382,131 6,131" fill="#94a3b8"/>
<rect x="18" y="4" width="376" height="120" rx="3" fill="#f8fafc"/>
<rect x="18" y="4" width="376" height="120" rx="3" fill="url(#grid)" stroke="#cbd5e1"/>
${box(330, 82, 52, 8, "#e2e8f0")}
${[[344, 74, 14, 42, c], [330, 82, 14, 28, c], [296, 82, 10, 10, "#cbd5e1"], [316, 90, 14, 14, c]]
  .map(([x, y, a, h, fill]) => box(x, y - h, a, h, fill))
  .join("")}<g class="is-hop">${box(356, 84, 10, 10, "#cbd5e1")}</g>
<g font-family="${FONT}">
  <text x="36" y="38" font-size="19" font-weight="800" fill="#0f172a">${esc(fit(r.name, 226, 19))}</text>
  <text font-size="12" fill="#475569">${lines(wrap(r.description, 34), 36, 60, 16)}</text>
  ${row(stats(r, { cy: 104, size: 12, text: 'fill="#334155" font-weight="600"', icon: 'fill="#64748b"' }), 36, 14)}
</g>`,
  );
};
