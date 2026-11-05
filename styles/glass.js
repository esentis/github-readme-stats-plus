import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

// Frosted panel over a colourful gradient with a drifting light.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="16"/></clipPath>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4f46e5"/><stop offset=".55" stop-color="#db2777"/><stop offset="1" stop-color="#f59e0b"/>
  </linearGradient>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#bg)"/>
  <g filter="url(#blur)">
    <circle cx="80" cy="30" r="50" fill="#22d3ee" opacity=".7"><animate attributeName="cy" values="30;60;30" dur="8s" repeatCount="indefinite"/></circle>
    <circle cx="330" cy="130" r="55" fill="#fde047" opacity=".6"/>
  </g>
  <rect x="12" y="12" width="376" height="126" rx="12" fill="#fff" fill-opacity=".16" stroke="#fff" stroke-opacity=".45"/>
</g>
<g font-family="${FONT}" fill="#fff">
  <text x="30" y="46" font-size="21" font-weight="700">${esc(fit(r.name, 340, 21))}</text>
  <text font-size="13.5" fill-opacity=".9">${lines(wrap(r.description, 48), 30, 70, 18)}</text>
  ${row(stats(r, { cy: 118, icon: 'fill="#fff"' }), 30, 22)}
</g>`,
  );
