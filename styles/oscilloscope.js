import { FONT, MONO, esc, fit, motion, svg, textWidth } from "../card.js";

export const about = "Oscilloscope: a glowing trace shaped by the name scrolls across a graticule screen, stars and forks on the knob panel, a blinking RUN light. Shows no description.";

const P = 115; // the wave repeats every 115px (half the screen), so scrolling by P loops seamlessly

// Bench oscilloscope: the screen on the left, two knobs reading stars and forks on the right.
export default (r) => {
  const c = (i) => r.name.charCodeAt(i % r.name.length);
  const terms = [[1 + (c(0) % 2), 1], [2 + (c(1) % 3), 0.2 + (c(2) % 6) / 10], [5 + (c(3) % 3), 0.1 + (c(4) % 3) / 15]];
  const f = (x) => terms.reduce((s, [n, a], k) => s + a * Math.sin((2 * Math.PI * n * x) / P + c(k + 5)), 0);
  const peak = Math.max(...Array.from({ length: P }, (_, x) => Math.abs(f(x))));
  const pts = Array.from({ length: 174 }, (_, i) => `${17 + i * 2},${(87 - (f(i * 2) / peak) * 32).toFixed(1)}`).join(" ");
  const grid = [...Array.from({ length: 9 }, (_, k) => `M${40 + k * 23} 39V135`), ...Array.from({ length: 7 }, (_, k) => `M17 ${51 + k * 12}H247`)].join("");
  const ticks = Array.from({ length: 49 }, (_, k) => `M${17 + k * 4.6 + 4.6} 85.5v3`).join("") + Array.from({ length: 19 }, (_, k) => `M130.5 ${39 + (k + 1) * 4.8}h3`).join("");
  const knob = (x, v, label, value) => `<g transform="translate(${x} 66)">
    ${Array.from({ length: 12 }, (_, k) => `<path d="M0 -18V-21" stroke="#6b7079" transform="rotate(${k * 30})"/>`).join("")}
    <circle r="15" fill="#18191d" stroke="#4a4e56"/><circle r="11.5" fill="url(#osc-knob)"/>
    <path d="M0 -3V-10" stroke="${r.lang.color}" stroke-width="2.4" stroke-linecap="round" transform="rotate(${(-135 + Math.min(1, Math.log10(v + 1) / 4) * 270).toFixed(0)})"/>
  </g>
  <text x="${x}" y="104" font-size="13" font-weight="700" fill="#f1f3f5" text-anchor="middle">${esc(value)}</text>
  <text x="${x}" y="116" font-size="7.5" fill="#9aa0a8" text-anchor="middle" letter-spacing="1">${label}</text>`;
  const lang = fit(r.lang.name, 90, 10.5);
  return svg(
    r.name,
    `${motion(`.osc-w{animation:osc-w 4s linear infinite}@keyframes osc-w{to{transform:translateX(-${P}px)}}
.osc-run{animation:osc-run 2s steps(1) infinite}@keyframes osc-run{50%{opacity:.2}}`)}
<defs><clipPath id="osc-scr"><rect x="17" y="39" width="230" height="96" rx="3"/></clipPath>
<radialGradient id="osc-knob" cx=".4" cy=".35"><stop offset="0" stop-color="#9aa0a8"/><stop offset="1" stop-color="#3a3e45"/></radialGradient>
<radialGradient id="osc-crt"><stop offset="0" stop-color="#0b2a1f"/><stop offset="1" stop-color="#03100b"/></radialGradient>
<filter id="osc-glow" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<rect width="400" height="150" rx="12" fill="#2e3137"/>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="#484c54"/>
<rect x="12" y="34" width="240" height="106" rx="6" fill="#141619"/>
<rect x="17" y="39" width="230" height="96" rx="3" fill="url(#osc-crt)"/>
<g fill="none" stroke="#2f7a5c" stroke-opacity=".55"><path d="${grid}" stroke-dasharray="1 2.6"/><path d="M17 87H247M132 39V135${ticks}"/></g>
<g clip-path="url(#osc-scr)"><g class="osc-w" filter="url(#osc-glow)"><polyline points="${pts}" fill="none" stroke="#7dffb8" stroke-width="1.8" stroke-linejoin="round"/></g></g>
<g font-family="${MONO}" font-size="7.5" fill="#5fd39a"><text x="22" y="49">CH1 2V</text><text x="242" y="49" text-anchor="end">10ms</text></g>
<rect x="262" y="34" width="126" height="106" rx="6" fill="#26292e"/>
<g font-family="${FONT}">
  <text x="18" y="25" font-size="15" font-weight="700" fill="#f1f3f5">${esc(fit(r.name, 250, 15))}</text>
  <circle cx="${374 - textWidth(lang, 10.5)}" cy="21" r="4.5" fill="${r.lang.color}"/>
  <text x="384" y="25" font-size="10.5" fill="#c3c7ce" text-anchor="end">${esc(lang)}</text>
  ${knob(294, r.starCount, "★ STARS", r.stars)}
  ${knob(356, r.forkCount, "⑂ FORKS", r.forks)}
  <g fill="#5b6069"><circle cx="282" cy="129" r="5.5"/><circle cx="304" cy="129" r="5.5"/></g>
  <g fill="#1b1d21"><circle cx="282" cy="129" r="2.4"/><circle cx="304" cy="129" r="2.4"/></g>
  <text x="362" y="132" font-size="7.5" fill="#9aa0a8" text-anchor="end" letter-spacing="1">RUN</text>
  <circle class="osc-run" cx="372" cy="129" r="3.5" fill="#39ff88"/>
</g>`,
  );
};
