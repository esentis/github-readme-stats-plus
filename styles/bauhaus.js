import { esc, fit, lines, motion, row, svg, textWidth, wrap } from "../card.js";

export const about = "Bauhaus poster: cream paper, a primary-colour composition of circles, half-circles and squares, lowercase geometric type.";

const GEO = "Futura, 'Century Gothic', 'Avenir Next', 'Josefin Sans', sans-serif";

// A stat with a primary shape as its marker.
const item = (marker, label) => [textWidth(label, 12.5, 0.66) + 18, `${marker}<text x="18" y="126">${esc(label)}</text>`];

// Bauhaus: a block of primary shapes on the right, one quarter circle in the language colour.
export default (r) =>
  svg(
    r.name,
    `${motion(".bh-swing{transform-origin:301px 76px;animation:bh-swing 6s ease-in-out -1.5s infinite}@keyframes bh-swing{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}")}
<defs><clipPath id="clip"><rect width="400" height="150" rx="6"/></clipPath></defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#f1e9d6"/>
  <rect x="268" width="66" height="76" fill="#f2c12e"/>
  <circle cx="366" cy="38" r="30" fill="#d7332a"/>
  <path class="bh-swing" d="M268 76h66a33 33 0 0 1-66 0Z" fill="#1f4e9c"/>
  <rect x="334" y="80" width="66" height="70" fill="#1a1a1a"/>
  <path d="M334 150V104A46 46 0 0 1 380 150Z" fill="${r.lang.color}"/>
  <circle cx="301" cy="126" r="9" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="254" y1="0" x2="254" y2="150" stroke="#1a1a1a" stroke-width="3"/>
</g>
<g font-family="${GEO}" fill="#1a1a1a">
  <text x="22" y="44" font-size="24" font-weight="700">${esc(fit(r.name.toLowerCase(), 222, 24, 0.6))}</text>
  <rect x="22" y="54" width="44" height="5" fill="#d7332a"/>
  <text x="76" y="60" font-size="10.5" font-weight="700" letter-spacing="2">${esc(fit(r.lang.name.toUpperCase(), 166, 10.5, 0.85))}</text>
  <text font-size="12" fill="#3a3a3a">${lines(wrap(r.description, 33), 22, 78, 15)}</text>
  <g font-size="12.5" font-weight="700">${row(
    [
      item(`<rect y="115.5" width="12" height="12" fill="#f2c12e"/>`, `${r.stars} stars`),
      item(`<path d="M0 127.5L6 115.5L12 127.5Z" fill="#1f4e9c"/>`, `${r.forks} forks`),
    ],
    22,
    14,
  )}</g>
</g>`,
  );
