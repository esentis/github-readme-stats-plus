import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Slowly drifting blurred glow in the repo's language colour.";

// Dark card with two slowly drifting blurred blobs, one in the language colour.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="38"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#0b0f1a"/>
  <g filter="url(#blur)" opacity=".6">
    <circle cx="330" cy="15" r="85" fill="${r.lang.color}"><animate attributeName="cx" values="330;290;330" dur="9s" repeatCount="indefinite"/></circle>
    <circle cx="50" cy="165" r="75" fill="#7c3aed"><animate attributeName="cx" values="50;110;50" dur="11s" repeatCount="indefinite"/></circle>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".14"/>
<g font-family="${FONT}">
  <text x="24" y="44" font-size="21" font-weight="700" fill="#fff">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13.5" fill="#c9d1e0">${lines(wrap(r.description, 50), 24, 68, 18)}</text>
  ${row(
    stats(r, { cy: 117, text: 'fill="#fff"', icon: 'fill="#9ecbff"' }).map(([w, s]) => [
      w + 24,
      `<rect y="104" width="${w + 24}" height="26" rx="13" fill="#fff" fill-opacity=".1"/><g transform="translate(12 0)">${s}</g>`,
    ]),
    24,
    8,
  )}
</g>`,
  );
