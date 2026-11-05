import { esc, fit, lines, motion, svg, textWidth, wrap } from "../card.js";

export const about = "Comic strip: two inked panels on cream with cyan halftone, a narration box, an outlined title and a POW burst with the stars.";

const IMPACT = "'Bangers', Impact, 'Haettenschweiler', 'Arial Narrow Bold', sans-serif";
const HAND = "'Comic Neue', 'Comic Sans MS', 'Chalkboard SE', cursive";

// A jagged burst: points alternate between an outer and inner radius, with a little wobble.
const burst = (cx, cy, r1, r2, n) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n - Math.PI / 2;
    const rr = (i % 2 ? r2 : r1) * (1 + ((i * 7) % 5) / 25);
    return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
  }).join(" ");

// Speed lines radiating from the burst in the action panel.
const speed = Array.from({ length: 24 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 24;
  return `M${(330 + Math.cos(a) * 30).toFixed(1)} ${(75 + Math.sin(a) * 30).toFixed(1)}L${(330 + Math.cos(a) * 120).toFixed(1)} ${(75 + Math.sin(a) * 120).toFixed(1)}`;
}).join("");

// Two-panel comic strip: narration and title on the left, a POW burst with the star count on the right.
export default (r) => {
  const title = esc(fit(r.name.toUpperCase(), 216, 26, 0.52));
  const size = Math.min(26, 120 / r.stars.length);
  const cap = fit(`MEANWHILE, AT @${r.owner.toUpperCase()}…`, 224, 10.5, 0.72);
  return svg(
    r.name,
    `${motion(".cm-pow{transform-origin:330px 75px;animation:cm-pow 5s ease-in-out infinite}@keyframes cm-pow{0%,70%,100%{transform:none}78%{transform:scale(.92)}86%{transform:scale(1.02)}}")}
<defs>
  <pattern id="tone" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3" cy="3" r="1.5" fill="#29b6d8" fill-opacity=".45"/></pattern>
  <clipPath id="act"><rect x="262" y="6" width="132" height="138"/></clipPath>
</defs>
<rect width="400" height="150" rx="4" fill="#fffdf6"/>
<rect x="6" y="6" width="250" height="138" fill="#fdf3d8"/>
<rect x="6" y="6" width="250" height="138" fill="url(#tone)"/>
<g clip-path="url(#act)">
  <rect x="262" y="6" width="132" height="138" fill="#ffe9a8"/>
  <path d="${speed}" stroke="#111" stroke-opacity=".25" stroke-width="2"/>
</g>
<g class="cm-pow" stroke="#111" stroke-linejoin="round">
  <polygon points="${burst(330, 75, 60, 40, 11)}" fill="#e63946" stroke-width="3"/>
  <polygon points="${burst(330, 75, 46, 32, 11)}" fill="#ffd60a" stroke-width="2"/>
</g>
<g fill="none" stroke="#111" stroke-width="3.5"><rect x="6" y="6" width="250" height="138"/><rect x="262" y="6" width="132" height="138"/></g>
<rect x="6" y="6" width="${Math.min(250, textWidth(cap, 10.5, 0.72) + 16)}" height="22" fill="#ffe14d" stroke="#111" stroke-width="2.5"/>
<g font-family="${HAND}" font-weight="700" fill="#111">
  <text x="14" y="21" font-size="10.5">${esc(cap)}</text>
  <text font-size="11.5" font-weight="400">${lines(wrap(r.description, 36), 16, 86, 15)}</text>
  <circle cx="21" cy="127" r="5" fill="${r.lang.color}" stroke="#111" stroke-width="1.5"/>
  <text x="31" y="131" font-size="11.5">${esc(fit(`${r.lang.name.toUpperCase()} · ${r.forks} FORKS`, 210, 11.5, 0.68))}</text>
</g>
<g font-family="${IMPACT}" text-anchor="middle">
  <text x="330" y="${72 + size * 0.3}" font-size="${size}" fill="#111">${esc(r.stars)}</text>
  <text x="330" y="${72 + size * 0.3 + 15}" font-size="12" fill="#e63946" letter-spacing="1">★ STARS!</text>
</g>
<g font-family="${IMPACT}" font-size="26" stroke-linejoin="round">
  <text x="19" y="62" fill="${r.lang.color}" stroke="#111" stroke-width="5" paint-order="stroke">${title}</text>
  <text x="16" y="59" fill="#fff" stroke="#111" stroke-width="5" paint-order="stroke">${title}</text>
</g>`,
  );
};
