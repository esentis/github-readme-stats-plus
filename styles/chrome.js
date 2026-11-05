import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Liquid chrome blobs with sharp highlights on black, and a chrome title.";

// Liquid chrome: mirror-metal blobs on black with a horizon-banded chrome title and a lang-coloured reflection.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="metal" x1="0" y1="0" x2=".4" y2="1">
    <stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#8d96a3"/><stop offset=".47" stop-color="#16181d"/><stop offset=".52" stop-color="${r.lang.color}"/><stop offset=".58" stop-color="#eef1f5"/><stop offset=".82" stop-color="#5d6672"/><stop offset="1" stop-color="#fff"/>
    <animateTransform attributeName="gradientTransform" type="translate" values="0 -.1;0 .1;0 -.1" dur="7s" repeatCount="indefinite"/>
  </linearGradient>
  <linearGradient id="title" x1="0" y1="0" x2="0" y2="1">
    <stop offset=".1" stop-color="#fff"/><stop offset=".48" stop-color="#c3ccd8"/><stop offset=".5" stop-color="#4a515c"/><stop offset=".58" stop-color="#e6eaf0"/><stop offset=".9" stop-color="#fff"/>
  </linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#08090c"/>
  <path d="M312 -14C370 -10 418 14 408 58C400 94 352 88 336 64C320 40 288 32 298 6Z" fill="url(#metal)"/>
  <path d="M286 162C282 128 322 104 358 112C392 120 414 146 408 164Z" fill="url(#metal)"/>
  <path d="M352 82C368 86 376 98 372 108" fill="none" stroke="url(#metal)" stroke-width="9" stroke-linecap="round"/>
  <g fill="none" stroke="#fff" stroke-linecap="round">
    <path d="M318 2C350 4 382 16 392 36" stroke-width="2"/><path d="M304 150C306 134 326 120 350 120" stroke-width="1.5" stroke-opacity=".8"/>
  </g>
  <path d="M0-9L1.6-1.6L9 0L1.6 1.6L0 9L-1.6 1.6L-9 0L-1.6-1.6Z" fill="#fff" transform="translate(330 88)"><animate attributeName="opacity" values="1;.2;1" dur="3s" repeatCount="indefinite"/></path>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".12"/>
<g font-family="${FONT}">
  <text x="24" y="44" font-size="23" font-weight="800" fill="url(#title)">${esc(fit(r.name, 270, 23, 0.62))}</text>
  <text font-size="13" fill="#aab2bf">${lines(wrap(r.description, 40), 24, 68, 17)}</text>
  ${row(stats(r, { cy: 122, text: 'fill="#e8ecf2" font-weight="600"', icon: 'fill="#c3cad5"' }), 24, 20)}
</g>`,
  );
