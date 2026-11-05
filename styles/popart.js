import { esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Pop art comic panel: yellow with red halftone dots, bold black outlines and a speech burst with the star count.";

const COMIC = "'Arial Black', 'Helvetica Neue', Impact, sans-serif";
// Speech-burst tail. Its base sits inside the burst; it's outlined first and filled again last, so the join has no seam.
const TAIL = "M294 100L262 138L312 110Z";

// A jagged speech burst: points alternate between two radii.
const burst = (cx, cy, rx, ry, n = 14) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n, k = i % 2 ? 0.68 : 1;
    return `${(cx + rx * k * Math.cos(a)).toFixed(1)},${(cy + ry * k * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

// Pop art comic panel: halftone dots, a white caption box, a speech burst with the stars.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#111" : "#fff";
  const lang = fit(r.lang.name.toUpperCase(), 110, 11, 0.8);
  return svg(
    r.name,
    `<defs>
  <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="4.5" cy="4.5" r="2.4" fill="#ef3b2c"/></pattern>
  <radialGradient id="fade" cx=".8" cy=".4" r=".9"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity=".15"/></radialGradient>
  <mask id="m"><rect width="400" height="150" fill="url(#fade)"/></mask>
</defs>
<rect width="400" height="150" rx="6" fill="#ffd60a"/>
<rect width="400" height="150" rx="6" fill="url(#dots)" mask="url(#m)" opacity=".75"/>
<rect x="3" y="3" width="394" height="144" rx="4" fill="none" stroke="#111" stroke-width="5"/>
<g font-family="${COMIC}" font-weight="900" fill="#111">
  <rect x="18" y="16" width="246" height="80" fill="#fff" stroke="#111" stroke-width="3"/>
  <text x="28" y="40" font-size="17">${esc(fit(r.name.toUpperCase(), 226, 17, 0.78))}</text>
  <text font-size="11" font-weight="700" font-family="'Comic Sans MS', 'Chalkboard SE', ${COMIC}">${lines(wrap(r.description, 38, 3), 28, 58, 14)}</text>
  <rect x="18" y="108" width="${lang.length * 9 + 22}" height="24" fill="${r.lang.color}" stroke="#111" stroke-width="3"/>
  <text x="29" y="125" font-size="11" fill="${ink}">${esc(lang)}</text>
  <text x="${lang.length * 9 + 54}" y="126" font-size="14" stroke="#fff" stroke-width="4" paint-order="stroke">⑂ ${esc(r.forks)}</text>
  <path d="${TAIL}" fill="#fff" stroke="#111" stroke-width="6" stroke-linejoin="round"/>
  <polygon points="${burst(330, 76, 58, 54)}" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
  <path d="${TAIL}" fill="#fff"/>
  <text x="330" y="70" font-size="13" fill="#ef3b2c" text-anchor="middle">★ WOW!</text>
  <text x="330" y="94" font-size="22" text-anchor="middle">${esc(r.stars)}</text>
</g>`,
  );
};
