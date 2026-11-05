import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Dark glassmorphism: vivid blurred orbs behind a smoky translucent panel with a hairline border.";

// Near-black card; three slowly drifting colour orbs glow through a dark frosted panel.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="16"/></clipPath>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
  <linearGradient id="edge" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#06060a"/>
  <g filter="url(#blur)">
    <circle cx="300" cy="22" r="48" fill="${r.lang.color}"><animate attributeName="cx" values="300;340;300" dur="10s" repeatCount="indefinite"/></circle>
    <circle cx="70" cy="140" r="44" fill="#ff2e88" opacity=".85"><animate attributeName="cy" values="140;118;140" dur="8s" repeatCount="indefinite"/></circle>
    <circle cx="380" cy="140" r="36" fill="#3b5bff" opacity=".9"/>
  </g>
  <rect x="14" y="14" width="372" height="122" rx="12" fill="#0c0c14" fill-opacity=".62"/>
</g>
<rect x="14.5" y="14.5" width="371" height="121" rx="11.5" fill="none" stroke="url(#edge)"/>
<g font-family="${FONT}">
  <text x="32" y="46" font-size="20" font-weight="700" fill="#f5f6fa">${esc(fit(r.name, 336, 20))}</text>
  <text font-size="13" fill="#a3a8b8">${lines(wrap(r.description, 50), 32, 70, 17)}</text>
  ${row(stats(r, { cy: 116, size: 12, text: 'fill="#e6e8f0"', icon: 'fill="#a3a8b8"' }), 32, 20)}
</g>`,
  );
