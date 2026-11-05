import { FONT, esc, fit, lines, motion, row, stats, svg, textWidth, wrap } from "../card.js";

export const about = "Top-down latte with a heart rosetta on a saucer, steam drifting up, and the repo chalked on a café board.";

const CHALK = "'Chalkboard SE', 'Marker Felt', 'Segoe Print', 'Comic Sans MS', cursive";

// A latte seen from above on a wooden table, with today's brew chalked on a framed board.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="card"><rect width="400" height="150" rx="12"/></clipPath>
  <radialGradient id="crema"><stop offset=".55" stop-color="#c8935c"/><stop offset=".9" stop-color="#8a5530"/><stop offset="1" stop-color="#5e3418"/></radialGradient>
  <radialGradient id="shade" cx=".55" cy=".58"><stop offset=".75" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
</defs>
${motion(`.lat-steam{animation:lat-rise 5s ease-in-out infinite}.lat-steam2{animation-delay:-2.5s}
@keyframes lat-rise{0%,100%{transform:translateY(0);opacity:.6}50%{transform:translateY(-7px);opacity:.15}}
.lat-art{transform-box:fill-box;transform-origin:center;animation:lat-swirl 8s ease-in-out infinite}
@keyframes lat-swirl{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}`)}
<g clip-path="url(#card)">
  <rect width="400" height="150" fill="#9b6b43"/>
  <path d="M0 37H400M0 76H400M0 114H400" stroke="#7d5232" stroke-width="1.5"/>
  <path d="M30 20q40 6 80 0M210 58q60-5 120 2M60 96q50 6 100-2M240 133q40 4 90-3" fill="none" stroke="#b07c51" stroke-opacity=".6"/>
  <circle cx="86" cy="79" r="66" fill="url(#shade)"/>
  <circle cx="82" cy="75" r="60" fill="#f1ebe2"/><circle cx="82" cy="75" r="51" fill="none" stroke="#e1d8cb" stroke-width="2"/>
  <rect x="122" y="67" width="26" height="16" rx="8" fill="#fbf8f3" stroke="#e1d8cb"/>
  <circle cx="82" cy="75" r="46" fill="#fbf8f3" stroke="#e7dfd3"/>
  <circle cx="82" cy="75" r="39" fill="url(#crema)"/>
  <g class="lat-art" fill="#f6e8d2">
    <path d="M82 104C58 86 62 60 75 63C79 64 82 68 82 72C82 68 85 64 89 63C102 60 106 86 82 104Z"/>
    <path d="M82 98V110" stroke="#f6e8d2" stroke-width="2" stroke-linecap="round"/>
    <path d="M70 48q12 5 24 0M72 54q10 4 20 0" fill="none" stroke="#f6e8d2" stroke-width="2.4" stroke-linecap="round"/>
  </g>
  <g fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round">
    <path class="lat-steam" d="M66 58q-6-8 0-15t0-15"/><path class="lat-steam lat-steam2" d="M96 54q6-8 0-15t0-15"/>
  </g>
  <rect x="172" y="12" width="216" height="126" rx="6" fill="#5a3a22"/>
  <rect x="178" y="18" width="204" height="114" rx="3" fill="#2e3431"/>
</g>
<g font-family="${CHALK}" fill="#f2efe6">
  <circle cx="194" cy="36" r="4" fill="${r.lang.color}"/>
  <text x="204" y="40" font-size="9.5" letter-spacing="1.5" fill="#bfc4bd">${esc(fit(`HOUSE BREW · ${r.lang.name.toUpperCase()}`, 172, 9.5, 0.76))}</text>
  <text x="190" y="62" font-size="17" font-weight="700">${esc(fit(r.name, 188, 17, 0.58))}</text>
  <text font-size="10.5" fill="#cfd2ca">${lines(wrap(r.description, 30), 190, 81, 14)}</text>
  <path d="M190 104h180" stroke="#f2efe6" stroke-opacity=".35" stroke-dasharray="4 3"/>
</g>
<g font-family="${FONT}">${row(stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, Math.max(30, 114 - textWidth(r.stars + r.forks, 11.5)), 11.5) } }, { cy: 119, size: 11.5, text: 'fill="#f2efe6"', icon: 'fill="#bfc4bd"' }), 190, 12)}</g>`,
  );
