import { FONT, MONO, esc, fit, motion, svg } from "../card.js";

export const about = "Retro diner letter board: white push-in letters on black felt, menu-priced stars and forks, and a flickering neon OPEN sign.";

const NEON = "#ff4f8b";

// A menu line with a dotted leader to a right-aligned price (11px mono is ~6.6px a character).
const item = (label, value, y) =>
  `<text x="28" y="${y}">${esc(label)}</text><path d="M${34 + label.length * 7.6} ${y}H${268 - value.length * 7.6}" stroke="#8a8a8a" stroke-dasharray="1 4"/><text x="274" y="${y}" font-family="${FONT}" text-anchor="end">${esc(value)}</text>`;

// A wood-framed felt letter board on the left and a neon OPEN sign on a dark wall to the right.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <pattern id="felt" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#1b1b1d"/><rect y="4" width="6" height="2" fill="#0d0d0e"/></pattern>
  <filter id="glow" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
${motion(`.di-neon{animation:di-flicker 7s ease-in-out infinite}
@keyframes di-flicker{0%,100%,88%,95%{opacity:1}90%{opacity:.35}92%{opacity:.9}93.5%{opacity:.4}}`)}
<rect width="400" height="150" rx="10" fill="#26202a"/>
<path d="M300 0V150M300 38H400M300 76H400M300 114H400M350 0V38M325 38V76M375 38V76M350 76V114M325 114V150M375 114V150" stroke="#1d1820" stroke-width="2"/>
<rect x="6" y="6" width="290" height="138" rx="5" fill="#8a5a33"/>
<rect x="12" y="12" width="278" height="126" rx="2" fill="url(#felt)"/>
<g font-family="${FONT}" font-weight="700" fill="#f4f4f0">
  <text x="151" y="32" font-size="8.5" letter-spacing="3" fill="#c9c9c4" text-anchor="middle">TODAY'S SPECIAL</text>
  <text x="151" y="58" font-size="18" letter-spacing="1.5" text-anchor="middle">${esc(fit(r.name.toUpperCase(), 254, 18, 0.78))}</text>
  <text x="151" y="76" font-size="8.5" font-weight="600" letter-spacing="1" fill="#c9c9c4" text-anchor="middle">${esc(fit(r.description.toUpperCase(), 250, 8.5, 0.84))}</text>
</g>
<g font-family="${MONO}" font-size="12" font-weight="700" fill="#f4f4f0">
  ${item("STARS", `★${r.stars}`, 98)}
  ${item("FORKS", `⑂${r.forks}`, 114)}
  <circle cx="32" cy="126" r="4" fill="${r.lang.color}"/>
  <text x="42" y="130" font-size="11">${esc(fit(r.lang.name.toUpperCase(), 230, 11))}</text>
</g>
<path d="M326 14L350 4L374 14" fill="none" stroke="#6e6a72"/>
<g class="di-neon" filter="url(#glow)">
  <rect x="312" y="16" width="76" height="40" rx="10" fill="none" stroke="${r.lang.color}" stroke-width="2.2"/>
  <text x="350" y="44" font-family="${FONT}" font-size="20" font-weight="700" letter-spacing="1" fill="none" stroke="${NEON}" stroke-width="1.6" text-anchor="middle">OPEN</text>
</g>
<g font-family="${FONT}" text-anchor="middle" fill="#a7a0ad">
  <text x="350" y="84" font-size="7.5" font-weight="700" letter-spacing="2">EST. BY</text>
  <text x="350" y="98" font-size="9.5" font-weight="700" fill="#e8e2ea">${esc(fit(r.owner, 86, 9.5))}</text>
  <text x="350" y="128" font-size="9" font-weight="700" letter-spacing="1.5" fill="${NEON}">24 / 7</text>
</g>`,
  );
