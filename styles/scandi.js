import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Scandinavian minimal: warm off-white, a few muted pastel shapes, lots of space and thin type.";

// Scandinavian minimal: soft shapes on the right, light type on the left.
export default (r) =>
  svg(
    r.name,
    `<defs><clipPath id="c"><rect width="400" height="150" rx="14"/></clipPath></defs>
<g clip-path="url(#c)">
  <rect width="400" height="150" fill="#f5f1ea"/>
  <circle cx="372" cy="22" r="64" fill="#ead2c2"/>
  <path d="M318 150V112A26 26 0 0 1 370 112V150Z" fill="#c3cdbd"/>
  <circle cx="300" cy="64" r="11" fill="${r.lang.color}" fill-opacity=".55"/>
</g>
<g font-family="${FONT}" font-weight="300">
  <text x="28" y="34" font-size="9.5" letter-spacing="2.5" fill="#9a9389">${esc(fit(r.owner.toUpperCase(), 220, 9.5, 0.85))}</text>
  <text x="28" y="62" font-size="23" fill="#2f2e2b">${esc(fit(r.name, 244, 23, 0.55))}</text>
  <text font-size="12" fill="#857e75">${lines(wrap(r.description, 38), 28, 84, 16)}</text>
  ${row(stats(r, { cy: 128, size: 11.5, text: 'fill="#5c5750"', icon: 'fill="#a59c90"' }), 28, 16)}
</g>`,
  );
