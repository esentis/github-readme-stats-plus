import { MONO, esc, fit, motion, svg } from "../card.js";

export const about = "Server rack front: a 2U unit with the name on its LCD and uptime = stars, 1U units below with drive bays and blinking activity LEDs.";

const LEDS = ["#3ef07a", "#3ef07a", "#ffb020"];

// A rack with rails and four units; the drive-bay LEDs flicker with timings taken from the name.
export default (r) => {
  const c = (i) => r.name.charCodeAt(i % r.name.length);
  const face = (y, h) => `<rect x="28" y="${y}" width="344" height="${h}" rx="3" fill="url(#sr-face)" stroke="#4b5059" stroke-width=".8"/><g fill="#7a808a"><circle cx="34" cy="${y + h / 2}" r="2.2"/><circle cx="366" cy="${y + h / 2}" r="2.2"/></g>`;
  const unit = (y, i, label) => `${face(y, 24)}
  <rect x="42" y="${y + 5}" width="92" height="14" rx="1.5" fill="#e9ecef"/>
  <text x="48" y="${y + 15}" font-size="8.5" fill="#1f2328">${label}</text>
  ${[0, 1, 2, 3].map((b) => {
    const k = i * 4 + b, x = 146 + b * 42;
    return `<rect x="${x}" y="${y + 4}" width="38" height="16" rx="1.5" fill="#202328" stroke="#454a52" stroke-width=".8"/><path d="M${x + 5} ${y + 9}h20M${x + 5} ${y + 12}h20M${x + 5} ${y + 15}h20" stroke="#33373e"/>
    <circle class="sr-l${c(k) % 3}" cx="${x + 32}" cy="${y + 12}" r="2" fill="${LEDS[c(k + 1) % 3]}" style="animation-delay:-${(c(k + 2) % 17) / 10}s"/>`;
  }).join("")}
  <path d="M318 ${y + 5}v14M323 ${y + 5}v14M328 ${y + 5}v14M333 ${y + 5}v14M338 ${y + 5}v14M343 ${y + 5}v14" stroke="#15171a" stroke-width="2.4"/>
  <circle cx="356" cy="${y + 12}" r="2" fill="${r.lang.color}"/>`;
  return svg(
    r.name,
    `${motion(`.sr-l0{animation:sr-a 1.3s steps(1) infinite}.sr-l1{animation:sr-a 2.1s steps(1) infinite reverse}.sr-l2{animation:sr-b 1.7s steps(1) infinite}
@keyframes sr-a{0%,30%,62%{opacity:1}12%,48%,80%{opacity:.15}}@keyframes sr-b{0%,40%{opacity:1}20%,70%,90%{opacity:.15}}
.sr-pw{animation:sr-pw 3s ease-in-out infinite}@keyframes sr-pw{50%{opacity:.35}}`)}
<defs><linearGradient id="sr-face" x2="0" y2="1"><stop offset="0" stop-color="#3b3f46"/><stop offset="1" stop-color="#2a2d33"/></linearGradient>
<pattern id="sr-rail" width="16" height="8" patternUnits="userSpaceOnUse"><rect x="5" y="2" width="5" height="4" fill="#0b0c0e"/></pattern>
<filter id="sr-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2"/></filter></defs>
<rect width="400" height="150" rx="10" fill="#17191d"/>
<g fill="#2b2e34"><rect x="8" y="6" width="16" height="138" rx="2"/><rect x="376" y="6" width="16" height="138" rx="2"/></g>
<g fill="url(#sr-rail)"><rect x="8" y="6" width="16" height="138"/><rect x="376" y="6" width="16" height="138"/></g>
<g font-family="${MONO}">
  ${face(8, 52)}
  <rect x="44" y="15" width="222" height="38" rx="2" fill="#0c2a21" stroke="#05140f"/>
  <text x="52" y="32" font-size="13" font-weight="700" fill="#8dffc8">${esc(fit(r.name, 206, 13))}</text>
  <text x="52" y="46" font-size="8.5" fill="#8dffc8" fill-opacity=".7">${esc(fit(r.description, 206, 8.5))}</text>
  <text x="278" y="26" font-size="7.5" fill="#9aa0a8" letter-spacing="1">UPTIME ★</text>
  <text x="278" y="46" font-size="16" font-weight="700" fill="#eef0f2">${esc(r.stars)}<tspan font-size="10" fill="#9aa0a8"> d</tspan></text>
  <circle class="sr-pw" cx="354" cy="34" r="8" fill="${r.lang.color}" filter="url(#sr-glow)"/>
  <circle cx="354" cy="34" r="5.5" fill="#1b1d21" stroke="${r.lang.color}" stroke-width="2"/>
  <path d="M354 30.5V34" stroke="${r.lang.color}" stroke-width="1.6" stroke-linecap="round"/>
  ${unit(64, 0, `<tspan fill="${r.lang.color}">●</tspan> ${esc(fit(r.lang.name, 70, 8.5))}`)}
  ${unit(91, 1, `⑂ ${esc(r.forks)} FORKS`)}
  ${unit(118, 2, esc(fit(r.owner, 76, 8.5)))}
</g>`,
  );
};
