// Blue hologram: a flickering, scanlined translucent card projected in a cone of light from an emitter disc.
import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Blue holographic projection rising from an emitter: a flickering, scanlined translucent card with the name.";

const B = "#4fd8ff";

export default (r) =>
  svg(
    r.name,
    `<defs>
  <linearGradient id="hg-beam" x2="0" y2="1"><stop offset="0" stop-color="${B}" stop-opacity=".04"/><stop offset="1" stop-color="${B}" stop-opacity=".38"/></linearGradient>
  <linearGradient id="hg-panel" x2="0" y2="1"><stop offset="0" stop-color="${B}" stop-opacity=".16"/><stop offset="1" stop-color="${B}" stop-opacity=".06"/></linearGradient>
  <radialGradient id="hg-floor" cy=".9" r=".6"><stop offset="0" stop-color="${B}" stop-opacity=".22"/><stop offset="1" stop-color="${B}" stop-opacity="0"/></radialGradient>
  <pattern id="hg-lines" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1.2" fill="${B}" fill-opacity=".14"/></pattern>
  <clipPath id="hg-clip"><rect x="40" y="12" width="320" height="92" rx="4"/></clipPath>
  <filter id="hg-glow" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
${motion(`.hg-flick{animation:hg-flick 5s linear infinite}.hg-scan{animation:hg-scan 2s linear infinite}.hg-beam{animation:hg-beam 3s ease-in-out infinite}
@keyframes hg-flick{0%,45%,48%,52%,88%,91%,100%{opacity:1}46%{opacity:.55}50%{opacity:.75}89.5%{opacity:.6}}@keyframes hg-scan{to{transform:translateY(4px)}}@keyframes hg-beam{50%{opacity:.7}}`)}
<rect width="400" height="150" rx="12" fill="#030913"/>
<rect width="400" height="150" rx="12" fill="url(#hg-floor)"/>
<path class="hg-beam" d="M162 130L238 130L360 104L40 104Z" fill="url(#hg-beam)"/>
<g class="hg-flick">
  <rect x="40" y="12" width="320" height="92" rx="4" fill="url(#hg-panel)"/>
  <g clip-path="url(#hg-clip)"><rect class="hg-scan" x="40" y="4" width="320" height="104" fill="url(#hg-lines)"/></g>
  <rect x="40.5" y="12.5" width="319" height="91" rx="4" fill="none" stroke="${B}" stroke-opacity=".5"/>
  <path d="M40 24V12H52M348 12H360V24M360 92V104H348M52 104H40V92" fill="none" stroke="#bdf3ff" stroke-width="1.6"/>
  <g font-family="${FONT}" text-anchor="middle">
    <text x="200" y="31" font-size="8.5" font-weight="700" fill="${B}" letter-spacing="2.5">HOLO-PROJECTION · ${esc(fit(r.owner.toUpperCase(), 150, 8.5, 0.9))}</text>
    <text x="200" y="55" font-size="20" font-weight="700" fill="#4fd8ff" fill-opacity=".6" filter="url(#hg-glow)">${esc(fit(r.name, 296, 20, 0.62))}</text>
    <text x="200" y="55" font-size="20" font-weight="700" fill="#e6fbff">${esc(fit(r.name, 296, 20, 0.62))}</text>
    <text font-size="11" fill="#a8ecff">${lines(wrap(r.description, 44), 200, 74, 14)}</text>
  </g>
</g>
<ellipse cx="200" cy="131" rx="44" ry="6" fill="#0b2a3f" stroke="${B}" stroke-width="1.2"/>
<ellipse cx="200" cy="131" rx="30" ry="3.5" fill="${B}" fill-opacity=".55" filter="url(#hg-glow)"/>
<path d="M156 132L164 143H236L244 132" fill="#0d1b2a" stroke="#1f3b52"/>
<g fill="${r.lang.color}"><circle cx="186" cy="138" r="1.6"/><circle cx="200" cy="138" r="1.6"/><circle cx="214" cy="138" r="1.6"/></g>
<g font-family="${FONT}" font-size="11.5" font-weight="600" fill="#cfefff">
  <circle cx="28" cy="133" r="4" fill="${r.lang.color}"/>
  <text x="37" y="137">${esc(fit(r.lang.name, 108, 11.5))}</text>
  <text x="376" y="137" text-anchor="end"><tspan fill="${B}">★</tspan> ${esc(r.stars)}<tspan fill="${B}" dx="10">⑂</tspan> ${esc(r.forks)}</text>
</g>`,
  );
