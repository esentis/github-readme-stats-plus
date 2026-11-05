import { FONT, MONO, esc, fit, lines, motion, row, stats, svg, words, wrap } from "../card.js";

export const about = "Chemistry: an Erlenmeyer flask filled with bubbling liquid in the language colour (fuller with more stars) and the name written as a formula.";

const SUB = "₀₁₂₃₄₅₆₇₈₉";
const FLASK = "M68 18V52L30 124Q27 132 36 132H120Q129 132 126 124L88 52V18Z";

// A flask on the bench at the left, the reagent label on the right with the name as a chemical formula.
export default (r) => {
  const c = (i) => r.name.charCodeAt(i % r.name.length);
  const formula = words(r.name).map((w) => w[0].toUpperCase() + w.slice(1, 2) + String(w.length).replace(/\d/g, (d) => SUB[d])).join("");
  const level = 118 - 54 * Math.min(1, Math.log10(r.starCount + 1) / 4);
  const half = 10 + ((level - 52) * 38) / 72; // half-width of the flask at the liquid surface
  const rise = Math.max(4, 124 - level - 6);
  const bubbles = Array.from({ length: 7 }, (_, i) => {
    const t = ((c(i) % 10) / 10 + i / 7) % 1, x = 78 + (((c(i + 2) % 21) - 10) / 10) * (half - 5);
    return `<circle class="fl-b" cx="${x.toFixed(1)}" cy="124" r="${1.4 + (c(i + 4) % 3) * 0.7}" transform="translate(0 ${-(t * rise).toFixed(1)})" style="animation-delay:-${(t * 2.8).toFixed(2)}s"/>`;
  }).join("");
  return svg(
    r.name,
    `${motion(`.fl-b{animation:fl-b 2.8s ease-in infinite}@keyframes fl-b{0%{transform:translateY(0);opacity:0}15%,80%{opacity:.85}100%{transform:translateY(-${rise.toFixed(1)}px);opacity:0}}`)}
<defs><clipPath id="fl-in"><path d="${FLASK}"/></clipPath>
<linearGradient id="fl-liq" x2="0" y2="1"><stop offset="0" stop-color="${r.lang.color}" stop-opacity=".75"/><stop offset="1" stop-color="${r.lang.color}"/></linearGradient></defs>
<rect width="400" height="150" rx="12" fill="#eef3f6"/>
<path d="M0 136H400V138A12 12 0 0 1 388 150H12A12 12 0 0 1 0 138Z" fill="#cfd8df"/>
<g clip-path="url(#fl-in)">
  <rect x="20" y="${level.toFixed(1)}" width="120" height="${(140 - level).toFixed(1)}" fill="url(#fl-liq)"/>
  <ellipse cx="78" cy="${level.toFixed(1)}" rx="${half.toFixed(1)}" ry="2.5" fill="#fff" fill-opacity=".35"/>
  <g fill="#fff" fill-opacity=".7">${bubbles}</g>
</g>
<path d="${FLASK}" fill="#fff" fill-opacity=".25" stroke="#8fa3b3" stroke-width="2.2" stroke-linejoin="round"/>
<rect x="63" y="12" width="30" height="7" rx="2.5" fill="#eef3f6" stroke="#8fa3b3" stroke-width="2"/>
<path d="M72 24V54L38 122" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2.5" stroke-linecap="round"/>
<g stroke="#8fa3b3" stroke-width="1.2"><path d="M93 76h6M102 94h6M112 112h6"/></g>
<g font-family="${MONO}" font-size="6.5" fill="#7f93a3" text-anchor="end"><text x="91" y="78">150</text><text x="100" y="96">100</text><text x="110" y="114">50</text></g>
<g font-family="${FONT}">
  <text x="152" y="28" font-family="${MONO}" font-size="8.5" fill="#7f93a3" letter-spacing="1.5">${esc(fit(`REAGENT · ${r.owner.toUpperCase()}`, 226, 8.5, 0.75))}</text>
  <text x="152" y="52" font-size="21" font-weight="700" fill="#1f2a33">${esc(fit(formula, 230, 21, 0.62))}</text>
  <text x="152" y="67" font-family="${MONO}" font-size="9.5" fill="#5b6b78">${esc(fit(r.name, 230, 9.5))}</text>
  <text font-size="11" fill="#43525e">${lines(wrap(r.description, 38), 152, 88, 14)}</text>
  ${row(stats(r, { cy: 126, size: 11.5, text: 'fill="#1f2a33" font-weight="600"', icon: 'fill="#5b6b78"' }), 152, 14)}
</g>`,
  );
};
