import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Warm desert dunes under a hazy shimmering sun.";

// Dunes: layered sand silhouettes, a low sun and far dune wobbling in the heat haze.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="#fdf0d5"/><stop offset=".65" stop-color="#f9c784"/></linearGradient>
  <radialGradient id="glow"><stop offset=".3" stop-color="#fff4d6" stop-opacity=".9"/><stop offset="1" stop-color="#fff4d6" stop-opacity="0"/></radialGradient>
  <filter id="haze" x="-10%" y="-20%" width="120%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".012 .09" numOctaves="1" seed="3"><animate attributeName="baseFrequency" values=".012 .09;.014 .07;.012 .09" dur="6s" repeatCount="indefinite"/></feTurbulence>
    <feDisplacementMap in="SourceGraphic" scale="5"/>
  </filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <g filter="url(#haze)">
    <circle cx="318" cy="80" r="48" fill="url(#glow)"/><circle cx="318" cy="80" r="22" fill="#fff3d1"/>
    <path d="M0 98C60 86 120 84 180 94S300 100 400 84V150H0Z" fill="#f2b06b"/>
  </g>
  <path d="M0 112C70 98 150 100 220 110S340 118 400 100V150H0Z" fill="#e08f4a"/>
  <path d="M0 122C80 110 150 108 230 118S350 126 400 114V150H0Z" fill="#b8612c"/>
  <path d="M0 134C90 122 170 124 250 132S360 130 400 124V150H0Z" fill="#7a3416"/>
</g>
<g font-family="${FONT}">
  <text x="24" y="38" font-size="21" font-weight="700" fill="#4a2208">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13" fill="#7a4419">${lines(wrap(r.description, 46), 24, 60, 17)}</text>
  ${row(stats(r, { cy: 140, size: 12, text: 'fill="#fff4e0"', icon: 'fill="#fde68a"' }), 24, 16)}
</g>`,
  );
