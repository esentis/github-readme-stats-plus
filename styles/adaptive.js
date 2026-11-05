import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

// Light or dark depending on the viewer's system colour scheme.
export default (r) =>
  svg(
    r.name,
    `<style>
  .bg { fill: #fff; stroke: #d0d7de } .t { fill: #1f2328 } .d { fill: #59636e } .i { fill: #818b98 }
  @media (prefers-color-scheme: dark) {
    .bg { fill: #0d1117; stroke: #30363d } .t { fill: #f0f6fc } .d { fill: #9198a1 } .i { fill: #6e7681 }
  }
</style>
<clipPath id="clip"><rect width="400" height="150" rx="12"/></clipPath>
<rect class="bg" x=".5" y=".5" width="399" height="149" rx="11.5"/>
<rect clip-path="url(#clip)" y="146" width="400" height="4" fill="${r.lang.color}"/>
<g font-family="${FONT}">
  <text class="i" x="24" y="32" font-size="12">${esc(fit(r.owner, 340, 12))} /</text>
  <text class="t" x="24" y="56" font-size="20" font-weight="600">${esc(fit(r.name, 352, 20))}</text>
  <text class="d" font-size="13.5">${lines(wrap(r.description, 50), 24, 80, 18)}</text>
  ${row(stats(r, { cy: 126, text: 'class="d"', icon: 'class="i"' }), 24, 22)}
</g>`,
  );
