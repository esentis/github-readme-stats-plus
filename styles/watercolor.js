// Watercolour sketch: soft washes in the language colour and two neighbouring hues bloom on cold-press paper, hand-lettered title.
import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Watercolour: washes in the language colour and two neighbouring hues softly blooming on textured cold-press paper, with a hand-lettered title.";

const HAND = "'Bradley Hand', 'Segoe Print', 'Marker Felt', 'Comic Sans MS', cursive";
const SERIF = "Georgia, 'Times New Roman', serif";

// A hue-shifted companion of the language colour; greys (no hue) still get a warm, saturated wash.
const companion = (hex, shift) => {
  const h = hex.length < 7 ? hex.replace(/\w/g, "$&$&") : hex;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  const hue = d === 0 ? 20 : 60 * (max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4);
  return `hsl(${Math.round((hue + shift + 360) % 360)}, 62%, 66%)`;
};

export default (r) => {
  const c = r.lang.color;
  const size = r.name.length > 14 ? 19 : 25;
  const hues = [c, companion(c, 40), companion(c, -40)];
  // Pigment pools at the rim of a wash, so each one is paler in the middle.
  const grads = hues.map((h, i) => `<radialGradient id="wc-g${i}"><stop offset="0" stop-color="${h}" stop-opacity=".16"/><stop offset=".75" stop-color="${h}" stop-opacity=".3"/><stop offset="1" stop-color="${h}" stop-opacity=".55"/></radialGradient>`).join("");
  const blob = (i, cx, cy, rx, ry, delay) =>
    `<ellipse class="wc-b" style="transform-origin:${cx}px ${cy}px;animation-delay:${delay}s" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#wc-g${i})" stroke="${hues[i]}" stroke-opacity=".35" stroke-width="1.5"/>`;
  return svg(
    r.name,
    `${motion(".wc-b{animation:wc-b 9s ease-in-out infinite}@keyframes wc-b{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}")}
<defs>
  <filter id="wc-wash" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="4" seed="11"/><feDisplacementMap in="SourceGraphic" scale="26" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="1.3"/></filter>
  <filter id="wc-paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="2"/><feColorMatrix values="0 0 0 0 .42  0 0 0 0 .36  0 0 0 0 .3  0 0 0 -1.1 .62"/></filter>
  ${grads}
  <clipPath id="wc-card"><rect width="400" height="150" rx="10"/></clipPath>
</defs>
<g clip-path="url(#wc-card)">
  <rect width="400" height="150" fill="#fbf8f1"/>
  <g filter="url(#wc-wash)">
    ${blob(0, 338, 52, 70, 48, 0)}
    ${blob(0, 300, 76, 30, 22, -4.5)}
    ${blob(1, 384, 124, 50, 36, -3)}
    ${blob(2, 274, 126, 40, 27, -6)}
    <path d="M18 ${66 - size * 0.35}H${Math.min(30 + r.name.length * size * 0.56, 262)}" stroke="${c}" stroke-opacity=".3" stroke-width="${size * 0.7}" stroke-linecap="round"/>
    <g fill="${c}" fill-opacity=".45"><circle cx="262" cy="30" r="3"/><circle cx="252" cy="42" r="1.6"/><circle cx="388" cy="70" r="2.2"/><circle cx="318" cy="132" r="1.8"/></g>
  </g>
  <rect width="400" height="150" filter="url(#wc-paper)" opacity=".55"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="9.5" fill="none" stroke="#d8cfbf"/>
<g fill="#2e2a3a">
  <text x="24" y="30" font-family="${SERIF}" font-style="italic" font-size="10.5" fill="#7a6f80">${esc(fit(`painted by ${r.owner}`, 220, 10.5, 0.5))}</text>
  <text x="22" y="64" font-family="${HAND}" font-size="${size}" font-weight="700">${esc(fit(r.name, 236, size, 0.62))}</text>
  <text font-family="${SERIF}" font-style="italic" font-size="12" fill="#4a4452">${lines(wrap(r.description, 36), 24, 88, 15)}</text>
  <circle cx="29" cy="127.5" r="5" fill="${c}" fill-opacity=".8"/>
  <text x="40" y="132" font-family="${HAND}" font-size="13" font-weight="700">${esc(fit(r.lang.name, 90, 13, 0.6))}<tspan dx="14">★ ${esc(r.stars)}</tspan><tspan dx="14">⑂ ${esc(r.forks)}</tspan></text>
</g>`,
  );
};
