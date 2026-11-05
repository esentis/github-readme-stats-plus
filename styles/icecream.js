import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Ice-cream parlour: striped pastel awning, a waffle cone with a scoop in the language colour, twinkling sprinkles and a slow drip.";

const SPRINKLES = [[-8, -8, 30, "#fff"], [6, -11, -40, "#ffd23f"], [10, 0, 70, "#7ee0c3"], [-11, 3, -10, "#ff7aa8"], [0, 4, 45, "#fff"], [-2, -14, 90, "#7ee0c3"]];

// A cone on the left under a scalloped awning, shop-sign text on the right.
export default (r) => {
  const c = r.lang.color;
  const awning = Array.from({ length: 16 }, (_, i) => `<rect x="${i * 25}" width="25" height="18" fill="${i % 2 ? "#fff8fb" : "#f9a8cf"}"/><circle cx="${i * 25 + 12.5}" cy="18" r="12.5" fill="${i % 2 ? "#fff8fb" : "#f9a8cf"}"/>`).join("");
  const sprinkles = SPRINKLES.map(([x, y, a, f], i) => `<rect class="${i % 2 ? "ic-tw" : ""}" style="animation-delay:${-i * 0.7}s" x="${x - 3}" y="${y - 1}" width="6" height="2" rx="1" fill="${f}" transform="rotate(${a} ${x} ${y})"/>`).join("");
  return svg(
    r.name,
    `<defs>
  <clipPath id="card"><rect width="400" height="150" rx="14"/></clipPath>
  <pattern id="waffle" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#e3a65c"/><path d="M0 0H7V7" fill="none" stroke="#b97a35" stroke-width="1.2"/></pattern>
  <linearGradient id="bg" x2="0" y2="1"><stop offset="0" stop-color="#fff4f9"/><stop offset="1" stop-color="#e3f7f1"/></linearGradient>
</defs>
${motion(`.ic-tw{animation:ic-tw 3s ease-in-out infinite}@keyframes ic-tw{0%,100%{opacity:1}50%{opacity:.25}}
.ic-drip{transform-box:fill-box;transform-origin:top;animation:ic-drip 7s ease-in-out infinite}@keyframes ic-drip{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.45)}}`)}
<g clip-path="url(#card)">
  <rect width="400" height="150" fill="url(#bg)"/>
  <g fill="#f7c6dc" fill-opacity=".5"><circle cx="150" cy="130" r="2"/><circle cx="380" cy="48" r="2.5"/><circle cx="20" cy="70" r="2"/><circle cx="130" cy="44" r="1.5"/></g>
  <g>${awning}</g>
</g>
<path d="M50 88L90 88L70 142Z" fill="url(#waffle)" stroke="#b97a35" stroke-linejoin="round"/>
<circle cx="70" cy="84" r="20" fill="#ffd1e1"/><path d="M50 86q5 6 10 2t10 2t10-2t10 1" fill="none" stroke="#f5a3c3" stroke-width="2"/>
<path class="ic-drip" d="M80 96v6a3 3 0 0 0 6 0v-8Z" fill="#ffd1e1"/>
<g transform="translate(70 59)">
  <circle r="19" fill="${c}"/><path d="M-19 4q5 6 10 2t10 2t10-2t9 1" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="2"/>
  <path d="M-11-9a12 12 0 0 1 9-6" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>${sprinkles}
  <path d="M1-19q1-5 5-8" fill="none" stroke="#5a8a3a" stroke-width="1.5"/><circle cx="1" cy="-22" r="5" fill="#e0263f"/>
</g>
<g font-family="${FONT}">
  <text x="138" y="50" font-size="9" font-weight="800" letter-spacing="2.5" fill="#e0568f">SCOOP OF THE DAY</text>
  <text x="138" y="72" font-size="20" font-weight="800" fill="#3b2f4a">${esc(fit(r.name, 244, 20, 0.62))}</text>
  <text font-size="11" fill="#6b5b7b">${lines(wrap(r.description, 36), 138, 91, 14)}</text>
  ${row(stats(r, { cy: 128, size: 11.5, text: 'fill="#3b2f4a" font-weight="600"', icon: 'fill="#e0568f"' }), 138, 14)}
</g>`,
  );
};
