import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Full gradient in the language colour, with the language as a watermark.";

// Full-bleed gradient from the language colour, with the language name as a watermark.
export default (r) =>
  svg(
    r.name,
    `${motion(".bo-mark { animation: bo-mark 10s ease-in-out infinite } @keyframes bo-mark { 50% { transform: translateX(-14px) } }")}
<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="18"/></clipPath>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${r.lang.color}"/><stop offset="1" stop-color="#0b1a3a"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#bg)"/>
  <rect width="400" height="150" fill="#000" fill-opacity=".18"/>
  <text class="bo-mark" x="410" y="140" text-anchor="end" font-family="'Arial Black', Arial, sans-serif" font-size="${Math.min(96, Math.floor(560 / r.lang.name.length))}" font-weight="900" fill="#fff" fill-opacity=".07">${esc(r.lang.name)}</text>
</g>
<g font-family="${FONT}" fill="#fff">
  <text x="26" y="50" font-size="26" font-weight="800">${esc(fit(r.name, 350, 26))}</text>
  <text font-size="13.5" fill-opacity=".85">${lines(wrap(r.description, 44), 26, 76, 18)}</text>
  ${row(stats(r, { cy: 124, size: 13, text: 'font-weight="600"', icon: 'fill="#fff"' }).slice(1), 26, 20)}
</g>`,
  );
