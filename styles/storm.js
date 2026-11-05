import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Dark storm clouds, steady rain and an occasional lightning flash.";

const cloud = (puffs, fill) => `<g fill="${fill}">${puffs.map(([x, y, rad]) => `<circle cx="${x}" cy="${y}" r="${rad}"/>`).join("")}</g>`;

const BOLT = "M334 36L322 62L334 64L314 98L326 100L304 150";
const FLASH = `<animate attributeName="opacity" values="0;0;1;.2;.9;0;0" keyTimes="0;.78;.79;.81;.83;.87;1" dur="7s" repeatCount="indefinite"/>`;

// Storm: billowing cloud deck, falling rain pattern, a bolt and sky flash every few seconds.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="#151b24"/><stop offset="1" stop-color="#0a0e14"/></linearGradient>
  <pattern id="rain" width="24" height="40" patternUnits="userSpaceOnUse"><path d="M5 0l-2.5 9M17 16l-2.5 9M11 29l-2 7" stroke="#9fb3c8" stroke-opacity=".28"/></pattern>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="glow" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="1.4" flood-color="#000" flood-opacity=".9"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <rect y="-40" width="400" height="190" fill="url(#rain)"><animateTransform attributeName="transform" type="translate" from="0 0" to="0 40" dur=".6s" repeatCount="indefinite"/></rect>
  <g opacity="0">
    <path d="${BOLT}" fill="none" stroke="#c7d7ff" stroke-width="5" filter="url(#glow)"/><path d="${BOLT}" fill="none" stroke="#fff" stroke-width="1.6"/>
    ${FLASH}
  </g>
  <g filter="url(#soft)">
    ${cloud([[0, -12, 46], [85, -8, 44], [170, -14, 48], [255, -8, 44], [340, -12, 46], [420, -8, 44]], "#566177")}
    ${cloud([[40, 14, 30], [118, 18, 32], [196, 12, 30], [272, 18, 32], [348, 14, 30], [410, 18, 28]], "#3c4555")}
    ${cloud([[8, 30, 18], [74, 34, 20], [150, 30, 18], [214, 34, 20], [290, 30, 18], [358, 34, 20], [404, 30, 18]], "#2a313d")}
  </g>
  <rect width="400" height="150" fill="#dbe7ff" opacity="0"><animate attributeName="opacity" values="0;0;.22;.04;.18;0;0" keyTimes="0;.78;.79;.81;.83;.87;1" dur="7s" repeatCount="indefinite"/></rect>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}" filter="url(#shadow)">
  <text x="24" y="66" font-size="21" font-weight="700" fill="#fff">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13" fill="#c8d3e0">${lines(wrap(r.description, 50), 24, 88, 17)}</text>
  ${row(stats(r, { cy: 132, text: 'fill="#e5ecf4"', icon: 'fill="#facc15"' }), 24, 18)}
</g>`,
  );
