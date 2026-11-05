import { esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Japanese woodblock print: beige paper, curling indigo waves that roll gently, a red seal with the star count.";

const MINCHO = "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', Georgia, serif";
const INDIGO = "#1d3461";

// A row of curling crests: each one rises, curls back on itself and leaves a foam tip.
const crests = (y, w, n, fill, foam) =>
  Array.from({ length: n }, (_, i) => {
    const x = i * w;
    return `<path d="M${x} ${y + 30}C${x + w * 0.2} ${y + 6} ${x + w * 0.55} ${y - 4} ${x + w * 0.8} ${y + 6}C${x + w * 0.95} ${y + 12} ${x + w * 0.86} ${y + 22} ${x + w * 0.74} ${y + 17}C${x + w * 0.66} ${y + 14} ${x + w * 0.7} ${y + 8} ${x + w * 0.78} ${y + 10}L${x + w} ${y + 30}V160H${x}Z" fill="${fill}"/><circle cx="${x + w * 0.82}" cy="${y + 7}" r="1.8" fill="${foam}"/><circle cx="${x + w * 0.9}" cy="${y + 11}" r="1.3" fill="${foam}"/>`;
  }).join("");

// Japanese woodblock print: indigo waves along the bottom, a big curl on the right and a red seal.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="c"><rect width="400" height="150" rx="6"/></clipPath>
  <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2e6cb"/><stop offset="1" stop-color="#e7d6b1"/></linearGradient>
</defs>
<g clip-path="url(#c)">
  <rect width="400" height="150" fill="url(#paper)"/>
  <g>${crests(112, 50, 10, "#5b7bab", "#f6efe0")}<animateTransform attributeName="transform" type="translate" values="0 0;-12 2;0 0" dur="7s" repeatCount="indefinite"/></g>
  <g transform="translate(-25 0)">${crests(124, 46, 11, INDIGO, "#f6efe0")}<animateTransform attributeName="transform" type="translate" values="-25 0;-10 -2;-25 0" dur="5s" repeatCount="indefinite"/></g>
  <path d="M262 160C276 128 296 90 328 74C356 60 388 68 394 92C398 108 384 118 372 112C362 107 366 96 376 98C368 88 350 90 340 102C326 118 330 140 344 160Z" fill="${INDIGO}"/>
  <path d="M300 96C318 74 352 64 378 74" fill="none" stroke="#f6efe0" stroke-width="2" stroke-dasharray="1 5" stroke-linecap="round"/>
  <path d="M276 140C288 112 304 92 326 80" fill="none" stroke="#5b7bab" stroke-width="3"/>
</g>
<rect x="5.5" y="5.5" width="389" height="139" rx="3" fill="none" stroke="${INDIGO}" stroke-opacity=".5"/>
<g transform="translate(346 14)">
  <rect width="38" height="40" rx="3" fill="#b8312f"/>
  <rect x="3" y="3" width="32" height="34" rx="2" fill="none" stroke="#f2e6cb" stroke-width=".8"/>
  <text x="19" y="17" font-family="${MINCHO}" font-size="10" fill="#f2e6cb" text-anchor="middle">★</text>
  <text x="19" y="31" font-family="${MINCHO}" font-size="12" font-weight="700" fill="#f2e6cb" text-anchor="middle">${esc(r.stars)}</text>
</g>
<g font-family="${MINCHO}" fill="${INDIGO}">
  <text x="22" y="28" font-size="10" letter-spacing="1.5" fill="#b8312f">${esc(fit(r.owner, 200, 10, 0.6))}</text>
  <text x="22" y="52" font-size="22" font-weight="600">${esc(fit(r.name, 300, 22, 0.56))}</text>
  <text font-size="12" font-family="Georgia, serif" fill="#3b4a66">${lines(wrap(r.description, 44), 22, 72, 15)}</text>
  ${row(stats(r, { cy: 104, size: 11.5, text: `fill="${INDIGO}"`, icon: `fill="${INDIGO}"` }).slice(0, 1).concat([[60, `<text y="108" font-size="11.5">⑂ ${esc(r.forks)}</text>`]]), 22, 16)}
</g>`,
  );
