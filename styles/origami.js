import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Folded paper: a creased sheet and a slowly turning paper pinwheel faceted in shades of the language colour.";

// A paper pinwheel: four blades, each split into a lit and a shaded facet along its fold.
const pinwheel = (cx, cy, R, color) => {
  const p = (x, y) => `${cx + x * R},${cy + y * R}`;
  const blades = [
    [[-1, -1], [0, -1], [-0.5, -1]],
    [[1, -1], [1, 0], [1, -0.5]],
    [[1, 1], [0, 1], [0.5, 1]],
    [[-1, 1], [-1, 0], [-1, 0.5]],
  ];
  return blades
    .map(([corner, mid, fold]) => {
      const a = `${p(0, 0)} ${p(...corner)} ${p(...fold)}`;
      const b = `${p(0, 0)} ${p(...fold)} ${p(...mid)}`;
      return `<polygon points="${a}" fill="${color}"/><polygon points="${a}" fill="#fff" fill-opacity=".3"/><polygon points="${b}" fill="${color}"/><polygon points="${b}" fill="#000" fill-opacity=".25"/>`;
    })
    .join("");
};

// Origami: a sheet creased once, and a pinwheel that turns very slowly.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="10"/></clipPath>
  <linearGradient id="crease" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".07"/></linearGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#5b4a32" flood-opacity=".25"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#efe9df"/>
  <polygon points="0,0 262,0 214,150 0,150" fill="#fbf8f2"/>
  <polygon points="200,0 262,0 214,150 160,150" fill="url(#crease)"/>
  <line x1="262" y1="0" x2="214" y2="150" stroke="#d8cfc0"/>
</g>
<g filter="url(#soft)" stroke="#000" stroke-opacity=".08" stroke-linejoin="round">
  <g>${pinwheel(326, 75, 46, r.lang.color)}<animateTransform attributeName="transform" type="rotate" from="0 326 75" to="360 326 75" dur="30s" repeatCount="indefinite"/></g>
</g>
<circle cx="326" cy="75" r="4" fill="#fbf8f2" stroke="#000" stroke-opacity=".2"/>
<g font-family="${FONT}">
  <text x="24" y="42" font-size="20" font-weight="700" fill="#2b2622">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="12.5" fill="#6f665a">${lines(wrap(r.description, 30), 24, 64, 16)}</text>
  ${row(stats(r, { cy: 117, size: 12, text: 'fill="#2b2622" font-weight="600"', icon: 'fill="#8c8273"' }), 24, 14)}
</g>`,
  );
