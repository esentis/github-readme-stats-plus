import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Deep-water gradient with swaying light rays and rising bubbles.";

const bubble = (x, r, dur, delay) =>
  `<circle cx="${x}" cy="160" r="${r}" fill="#e0f2fe" fill-opacity=".1" stroke="#e0f2fe" stroke-opacity=".55"><animate attributeName="cy" from="160" to="-10" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite"/><animate attributeName="cx" values="${x};${x + 5};${x}" dur="${dur / 3}s" repeatCount="indefinite"/></circle>`;

// Underwater: teal-to-abyss gradient, light rays from the surface, bubbles and seaweed in the language colour.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="depth" x2="0" y2="1"><stop offset="0" stop-color="#0e7490"/><stop offset=".55" stop-color="#0b3954"/><stop offset="1" stop-color="#05192d"/></linearGradient>
  <linearGradient id="ray" x2="0" y2="1"><stop offset="0" stop-color="#cffafe" stop-opacity=".3"/><stop offset="1" stop-color="#cffafe" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#depth)"/>
  <g fill="url(#ray)">
    <path d="M120 0h26l-30 150h-60z"/><path d="M220 0h14l-6 150h-40z"/><path d="M300 0h30l20 150h-70z"/>
    <animateTransform attributeName="transform" type="skewX" values="0;5;0" dur="9s" repeatCount="indefinite"/>
  </g>
  <path d="M0 150V140Q60 130 130 138T260 136T400 134V150Z" fill="#031423"/>
  <g fill="none" stroke="${r.lang.color}" stroke-width="3.5" stroke-linecap="round" opacity=".85">
    <path d="M372 150q-9-14 0-28t0-26"><animateTransform attributeName="transform" type="rotate" values="0 372 150;-4 372 150;0 372 150" dur="5s" repeatCount="indefinite"/></path>
    <path d="M384 150q8-12 0-24"><animateTransform attributeName="transform" type="rotate" values="0 384 150;5 384 150;0 384 150" dur="4s" repeatCount="indefinite"/></path>
  </g>
  ${bubble(40, 2.5, 7, 1)}${bubble(150, 4, 9, 6)}${bubble(250, 2, 6, 3)}${bubble(318, 3.5, 8, 2)}${bubble(352, 2, 5, 4)}${bubble(200, 1.5, 6, 0.5)}
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#a5f3fc" stroke-opacity=".25"/>
<g font-family="${FONT}">
  <text x="24" y="42" font-size="21" font-weight="700" fill="#fff">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13" fill="#a5f3fc">${lines(wrap(r.description, 50), 24, 65, 17)}</text>
  ${row(stats(r, { cy: 120, text: 'fill="#e0f2fe"', icon: 'fill="#67e8f9"' }), 24, 18)}
</g>`,
  );
