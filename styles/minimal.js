import { FONT, esc, fit, icon, lines, motion, svg, textWidth, wrap } from "../card.js";

export const about = "Large-type minimal card that stays readable three to a row; light or dark with the viewer's theme.";

// Built to be shown small (about 280px wide in a 3-column grid): big type, no owner line, one quiet accent.
export default (r) => {
  // Widths are estimates; bold 16px runs wider than the default ratio, so measure with 0.66.
  const lang = fit(r.lang.name, 130, 16, 0.66);
  const stars = 50 + textWidth(lang, 16, 0.66) + 18;
  const forks = stars + 24 + textWidth(r.stars, 16, 0.66) + 18;
  return svg(
    r.name,
    `<style>
  .bg { fill: #fff; stroke: #d0d7de } .t { fill: #1f2328 } .d { fill: #59636e } .i { fill: #818b98 }
  @media (prefers-color-scheme: dark) {
    .bg { fill: #0d1117; stroke: #30363d } .t { fill: #f0f6fc } .d { fill: #9198a1 } .i { fill: #6e7681 }
  }
</style>
${motion(".mn-bar { animation: mn-bar 6s ease-in-out infinite } @keyframes mn-bar { 50% { opacity: .55 } }")}
<clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
<rect class="bg" x=".5" y=".5" width="399" height="149" rx="13.5"/>
<rect class="mn-bar" clip-path="url(#clip)" y="145" width="400" height="5" fill="${r.lang.color}"/>
<g font-family="${FONT}">
  <text class="t" x="28" y="48" font-size="26" font-weight="700" letter-spacing="-.3">${esc(fit(r.name, 344, 26, 0.58))}</text>
  <text class="d" font-size="17">${lines(wrap(r.description, 36), 28, 78, 22)}</text>
  <g font-size="16" font-weight="600" class="d">
    <circle cx="35" cy="125" r="7" fill="${r.lang.color}"/>
    <text x="50" y="131">${esc(lang)}</text>
    ${icon("star", stars, 116, 17, 'class="i"')}<text x="${stars + 24}" y="131">${esc(r.stars)}</text>
    ${icon("fork", forks, 116, 17, 'class="i"')}<text x="${forks + 24}" y="131">${esc(r.forks)}</text>
  </g>
</g>`,
  );
};
