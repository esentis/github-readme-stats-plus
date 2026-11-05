import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Cracked dark basalt with softly pulsing glowing lava veins.";

const CRACKS =
  "M0 104L34 98L58 110L96 102L128 118L170 112L204 132L226 150M96 102L110 82L104 64M128 118L132 150" +
  "M262 0L270 24L302 36L314 62L348 74L362 100L400 106M302 36L342 20L360 0M314 62L292 88L304 114L334 128L346 150M362 100L374 130L400 138" +
  "M0 30L22 38L30 60M170 112L196 92L236 96L262 120L292 88";

// Lava: basalt grain, cracks drawn three times (blurred glow, orange, hot core) with a slow glow pulse.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .32  0 0 0 0 .27  0 0 0 0 .24  .5 0 0 0 0"/></filter>
  <filter id="glow" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="4"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#16110f"/>
  <rect width="400" height="150" filter="url(#grain)" opacity=".7"/>
  <g fill="none" stroke-linejoin="round" stroke-linecap="round">
    <path d="${CRACKS}" stroke="#ff4d00" stroke-width="7" filter="url(#glow)"><animate attributeName="opacity" values=".55;1;.55" dur="4s" repeatCount="indefinite"/></path>
    <path d="${CRACKS}" stroke="#ff7a1a" stroke-width="2.4"/>
    <path d="${CRACKS}" stroke="#ffd27a" stroke-width=".8"><animate attributeName="opacity" values=".6;1;.6" dur="4s" repeatCount="indefinite"/></path>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#ff7a1a" stroke-opacity=".25"/>
<g font-family="${FONT}" paint-order="stroke" stroke="#16110f" stroke-width="5" stroke-linejoin="round">
  <text x="24" y="42" font-size="21" font-weight="700" fill="#fff7ed">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13" fill="#e7d3c4">${lines(wrap(r.description, 50), 24, 65, 17)}</text>
  ${row(stats(r, { cy: 124, text: 'fill="#fde4cf"', icon: 'fill="#ff9a3d"' }), 24, 18)}
</g>`,
  );
