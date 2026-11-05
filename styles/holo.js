import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

// Iridescent foil that slowly shifts, with a shine sweeping across, like a rare trading card.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="16"/></clipPath>
  <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ff7ad9"/><stop offset=".3" stop-color="#7afcff"/><stop offset=".6" stop-color="#fff07a"/><stop offset="1" stop-color="#a77aff"/>
    <animateTransform attributeName="gradientTransform" type="translate" values="-.3 0;.3 0;-.3 0" dur="7s" repeatCount="indefinite"/>
  </linearGradient>
  <linearGradient id="shine" x1="0" x2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#14121c"/>
  <rect width="400" height="150" fill="url(#foil)" opacity=".38"/>
  <rect x="-150" width="90" height="150" fill="url(#shine)" transform="skewX(-20)"><animate attributeName="x" values="-150;560" dur="3.5s" repeatCount="indefinite"/></rect>
</g>
<rect x=".75" y=".75" width="398.5" height="148.5" rx="15.5" fill="none" stroke="url(#foil)" stroke-width="1.5"/>
<g font-family="${FONT}" fill="#fff">
  <text x="24" y="44" font-size="22" font-weight="700">${esc(fit(r.name, 352, 22))}</text>
  <text font-size="13.5" fill="#ece8f8">${lines(wrap(r.description, 50), 24, 70, 18)}</text>
  ${row(stats(r, { cy: 122, icon: 'fill="#fff"' }), 24, 22)}
</g>`,
  );
