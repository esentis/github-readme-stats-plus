import { FONT, esc, fit, icon, lines, motion, svg, textWidth, wrap } from "../card.js";

export const about = "The adaptive look with GitHub's pinned-repo type sizes when shown three to a row; light or dark, with a shine along the language bar.";

// adaptive's design, sized so a 3-column README grid (~0.65 scale) shows GitHub's pinned-card type:
// 14px semibold name, 12px description and stats.
export default (r) => {
  const lang = fit(r.lang.name, 140, 18.5, 0.62);
  const stars = 46 + textWidth(lang, 18.5, 0.62) + 22;
  const forks = stars + 26 + textWidth(r.stars, 18.5, 0.62) + 22;
  return svg(
    r.name,
    `${motion(".mi-shine { animation: mi-shine 9s ease-in-out infinite } @keyframes mi-shine { 0%, 30% { transform: translateX(0) } 70%, 100% { transform: translateX(480px) } }")}
<style>
  .bg { fill: #fff; stroke: #d0d7de } .t { fill: #1f2328 } .d { fill: #59636e } .i { fill: #818b98 }
  @media (prefers-color-scheme: dark) {
    .bg { fill: #0d1117; stroke: #30363d } .t { fill: #f0f6fc } .d { fill: #9198a1 } .i { fill: #6e7681 }
  }
</style>
<clipPath id="clip"><rect width="400" height="150" rx="12"/></clipPath>
<linearGradient id="shine" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<rect class="bg" x=".5" y=".5" width="399" height="149" rx="11.5"/>
<g clip-path="url(#clip)"><rect y="146" width="400" height="4" fill="${r.lang.color}"/><rect class="mi-shine" x="-80" y="146" width="80" height="4" fill="url(#shine)"/></g>
<g font-family="${FONT}">
  <text class="t" x="24" y="44" font-size="22" font-weight="600">${esc(fit(r.name, 352, 22, 0.58))}</text>
  <text class="d" font-size="18.5">${lines(wrap(r.description, 34), 24, 76, 25)}</text>
  <g class="d" font-size="18.5">
    <circle cx="31" cy="125" r="7" fill="${r.lang.color}"/>
    <text x="46" y="131">${esc(lang)}</text>
    ${icon("star", stars, 116, 18, 'class="i"')}<text x="${stars + 26}" y="131">${esc(r.stars)}</text>
    ${icon("fork", forks, 116, 18, 'class="i"')}<text x="${forks + 26}" y="131">${esc(r.forks)}</text>
  </g>
</g>`,
  );
};
