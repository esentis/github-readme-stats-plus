import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Soft pink cherry blossom branch with petals drifting down.";

const blossom = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288]
    .map((a) => `<ellipse cy="-5" rx="3.6" ry="5" transform="rotate(${a})" fill="#fbcfe0"/>`)
    .join("")}<circle r="2" fill="#db2777"/></g>`;

// A petal that drifts down a wavy path, spinning as it goes; negative begin spreads them at load.
const petal = (x, dur, delay) =>
  `<path d="M0 0c2-3 7-3 7 0s-4 4-7 0z" fill="#f9a8c9"><animateMotion path="M${x} -10c-20 40 20 70 -10 100s-10 50 -30 70" dur="${dur}s" begin="-${delay}s" rotate="auto" repeatCount="indefinite"/></path>`;

// Sakura: blush gradient, a dark branch with blossoms from the top-right corner, falling petals.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="bg" x2="0" y2="1"><stop offset="0" stop-color="#fff6f8"/><stop offset="1" stop-color="#fde1ea"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#bg)"/>
  <g fill="none" stroke="#5b3a3a" stroke-linecap="round">
    <path d="M410 6C380 12 362 24 340 26S304 36 290 50" stroke-width="4"/>
    <path d="M352 22q-4 16 6 30M318 32q-10-12-6-24M300 42q-4 14 2 26" stroke-width="2"/>
  </g>
  ${blossom(290, 50, 1.1)}${blossom(358, 52, 1.2)}${blossom(312, 9, 0.9)}${blossom(302, 68, 0.8)}${blossom(376, 14, 1)}${blossom(334, 30, 0.7)}
  ${petal(330, 9, 1)}${petal(250, 11, 5)}${petal(380, 8, 4)}${petal(200, 12, 8)}${petal(300, 10, 7)}${petal(140, 13, 3)}
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#f9a8c9" stroke-opacity=".6"/>
<g font-family="${FONT}">
  <text x="24" y="42" font-size="21" font-weight="700" fill="#6b1d3e">${esc(fit(r.name, 254, 21))}</text>
  <text font-size="13" fill="#8a4a66">${lines(wrap(r.description, 40), 24, 68, 17)}</text>
  ${row(
    stats(r, { cy: 120, text: 'fill="#6b1d3e"', icon: 'fill="#db2777"' }).map(([w, s]) => [
      w + 22,
      `<rect y="107" width="${w + 22}" height="26" rx="13" fill="#fff" fill-opacity=".75" stroke="#f9a8c9" stroke-opacity=".6"/><g transform="translate(11 0)">${s}</g>`,
    ]),
    24,
    8,
  )}
</g>`,
  );
