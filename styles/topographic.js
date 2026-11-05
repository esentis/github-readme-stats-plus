import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Contour-line map with haloed map-label typography and a starred summit.";

// One organic closed contour around a hill: a wobbly ellipse whose wobble drifts a little per ring.
const contour = (cx, cy, rad, k) =>
  "M" +
  Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2;
    const d = rad * (1 + 0.16 * Math.sin(3 * a + k) + 0.08 * Math.cos(5 * a - k));
    return `${(cx + d * Math.cos(a) * 1.5).toFixed(1)} ${(cy + d * Math.sin(a)).toFixed(1)}`;
  }).join("L") +
  "Z";

const hill = (cx, cy, rings) =>
  Array.from({ length: rings }, (_, i) =>
    `<path d="${contour(cx, cy, 7 + i * 9, i * 0.12)}"${i % 4 === 3 ? ' stroke-width="1.4" stroke-opacity=".9"' : ""}/>`,
  ).join("");

const HALO = 'paint-order="stroke" stroke="#f1ead6" stroke-width="4" stroke-linejoin="round"';

// Topographic: concentric contour lines on beige paper, green hypsometric tint, map labels with halos.
export default (r) =>
  svg(
    r.name,
    `${motion(".tp-ping{transform-box:fill-box;transform-origin:center;animation:tp-ping 3.5s ease-out infinite}@keyframes tp-ping{0%{transform:scale(.8);opacity:0}15%{opacity:.8}100%{transform:scale(2.2);opacity:0}}")}
<defs><clipPath id="clip"><rect width="400" height="150" rx="10"/></clipPath></defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#f1ead6"/>
  <g stroke="#b7ad8c" stroke-opacity=".35"><path d="M100 0V150M200 0V150M300 0V150M0 50H400M0 100H400"/></g>
  <g fill="#6f8f4e" fill-opacity=".045" stroke="#8a7d55" stroke-opacity=".6" stroke-width=".8" stroke-linejoin="round">${hill(318, 86, 15)}${hill(30, 160, 9)}</g>
  <circle class="tp-ping" cx="318" cy="87" r="4" fill="none" stroke="#5b4a2a" vector-effect="non-scaling-stroke" opacity="0"/>
  <path d="M314 90l4-7 4 7z" fill="#5b4a2a"/>
  <text x="318" y="104" font-family="${FONT}" font-size="10" font-weight="700" fill="#5b4a2a" text-anchor="middle" ${HALO}>★ ${esc(r.stars)}</text>
</g>
<rect x="4.5" y="4.5" width="391" height="141" rx="7" fill="none" stroke="#5b4a2a" stroke-opacity=".5"/>
<g font-family="${FONT}" ${HALO}>
  <text x="22" y="26" font-size="9" letter-spacing="2.5" fill="#7a6a45">${esc(fit(r.owner.toUpperCase(), 220, 9, 0.9))}</text>
  <text x="22" y="47" font-size="18" font-weight="700" letter-spacing="1" fill="#33401f">${esc(fit(r.name.toUpperCase(), 350, 18, 0.74))}</text>
  <text font-family="Georgia, serif" font-style="italic" font-size="12.5" fill="#4f5a3a">${lines(wrap(r.description, 52), 22, 68, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#33401f"', icon: 'fill="#6f8f4e"' }), 22, 16)}
</g>
<g transform="translate(372 120)" fill="#5b4a2a"><path d="M0-12l5 14-5-4-5 4z"/><text y="12" font-family="${FONT}" font-size="8" font-weight="700" text-anchor="middle">N</text></g>`,
  );
