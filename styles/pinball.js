import { FONT, MONO, esc, fit, isLight, lines, motion, svg, wrap } from "../card.js";

export const about = "Pinball playfield with bumpers (one in the language colour), chasing lane lights and a flicking flipper beside a dot-matrix score of the stars.";

const bumper = (x, y, c) =>
  `<g transform="translate(${x} ${y})"><circle r="14" fill="#0b0716" stroke="${c}" stroke-width="2.5"/><circle r="9.5" fill="${c}"/><circle r="9.5" fill="url(#pb-cap)"/><text y="3.5" font-size="10" text-anchor="middle" fill="${isLight(c) ? "#1a1a1a" : "#fff"}" fill-opacity=".85">★</text></g>`;
const FLIPPER = `<path d="M0-4.5L30-1.8A2 2 0 0 1 30 2.2L0 4.5A4.5 4.5 0 0 1 0-4.5Z" fill="#f1f5f9" stroke="#a78bfa"/><circle r="1.8" fill="#64748b"/>`;

// A violet playfield on the left, a backglass with a glowing title and an orange dot-matrix score on the right.
export default (r) => {
  const lights = [0, 1, 2, 3, 4].map((i) => `<circle cx="${46 + i * 22}" cy="25" r="5" fill="#713f12"/><circle class="pb-l" style="animation-delay:${(i - 5) * 0.3}s" cx="${46 + i * 22}" cy="25" r="5" fill="#fde047" opacity="${i % 2 ? 0 : 1}"/>`).join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="pb-field" x2="0" y2="1"><stop offset="0" stop-color="#2e1065"/><stop offset="1" stop-color="#1e1b4b"/></linearGradient>
  <radialGradient id="pb-cap" cx=".35" cy=".3"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <radialGradient id="pb-ball" cx=".35" cy=".3"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#7c8799"/></radialGradient>
  <pattern id="pb-dmd" width="2.5" height="2.5" patternUnits="userSpaceOnUse"><path d="M0 0H2.5V2.5" fill="none" stroke="#1c0d02" stroke-width=".8"/></pattern>
  <filter id="pb-glow" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="2.5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
${motion(`.pb-l{animation:pb-l 1.5s linear infinite}@keyframes pb-l{0%,100%{opacity:0}10%,30%{opacity:1}45%{opacity:0}}
.pb-flip{transform-box:fill-box;transform-origin:4.5px 4.5px;animation:pb-flip 3s ease-out infinite}
@keyframes pb-flip{0%,82%,100%{transform:rotate(0)}85%,90%{transform:rotate(-30deg)}}`)}
<rect width="400" height="150" rx="12" fill="#0b0716"/>
<rect x="12" y="10" width="156" height="130" rx="10" fill="url(#pb-field)" stroke="#4c1d95" stroke-width="2"/>
<path d="${[0, 1, 2, 3, 4, 5].map((i) => `M${35 + i * 22} 17v15`).join("")}M18 100L44 118M162 100L136 118" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"/>
${lights}
<g fill="#f43f5e" fill-opacity=".85" stroke="#fda4af"><path d="M24 90V112L40 120Z"/><path d="M156 90V112L140 120Z"/></g>
${bumper(60, 62, r.lang.color)}${bumper(120, 60, "#ef4444")}${bumper(90, 92, "#22d3ee")}
<circle cx="120" cy="104" r="5" fill="url(#pb-ball)"/>
<g transform="translate(46 120) rotate(22)"><g class="pb-flip">${FLIPPER}</g></g>
<g transform="translate(134 120) scale(-1 1) rotate(22)">${FLIPPER}</g>
<g font-family="${FONT}">
  <text x="184" y="30" font-size="17" font-weight="800" font-style="italic" fill="#fde047" filter="url(#pb-glow)">${esc(fit(r.name, 196, 17, 0.62))}</text>
  <text x="184" y="46" font-size="10" fill="#a5b4fc">${esc(fit(`${r.owner} · ${r.lang.name}`, 200, 10))}</text>
  <text font-size="10.5" fill="#c4b5fd">${lines(wrap(r.description, 32), 184, 118, 14)}</text>
</g>
<rect x="182" y="55" width="204" height="46" rx="4" fill="#1c0d02" stroke="#4a2a0a"/>
<g font-family="${MONO}" font-weight="700" fill="#ff9a2e">
  <text x="190" y="69" font-size="8.5" letter-spacing="1.5">SCORE</text>
  <text x="378" y="69" font-size="8.5" text-anchor="end">${esc(fit(`BONUS ⑂ ${r.forks}`, 120, 8.5))}</text>
  <text x="190" y="93" font-size="13">★</text>
  <text x="378" y="94" font-size="22" text-anchor="end">${esc(fit(r.starCount.toLocaleString("en"), 160, 22))}</text>
</g>
<rect x="182" y="55" width="204" height="46" rx="4" fill="url(#pb-dmd)"/>`,
  );
};
