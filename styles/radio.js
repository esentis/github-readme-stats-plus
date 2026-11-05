import { FONT, MONO, esc, fit, motion, svg } from "../card.js";

const SERIF = "Georgia, 'Times New Roman', serif";

export const about = "Vintage tube radio: walnut cabinet, woven speaker cloth behind wooden fretwork and a glowing amber dial whose needle is tuned to the star count. Shows no description.";

const LABELS = ["0", "10", "100", "1K", "10K", "100K"];

// A wooden valve radio: the dial runs over five decades of stars, the needle drifts a little while the tubes flicker.
export default (r) => {
  const nx = 178 + 188 * Math.min(1, Math.log10(r.starCount + 1) / 5);
  const ticks = Array.from({ length: 26 }, (_, i) => `<path d="M${178 + i * 7.52} ${i % 5 ? 49 : 45}V53"/>`).join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="rd-wood" x2="1" y2="1"><stop offset="0" stop-color="#8a5530"/><stop offset=".55" stop-color="#5e341a"/><stop offset="1" stop-color="#3f2210"/></linearGradient>
  <linearGradient id="rd-dial" x2="0" y2="1"><stop offset="0" stop-color="#ffe2a3"/><stop offset="1" stop-color="#e9a04a"/></linearGradient>
  <radialGradient id="rd-knob" cx=".35" cy=".3"><stop offset="0" stop-color="#7a4a2a"/><stop offset="1" stop-color="#2a160a"/></radialGradient>
  <pattern id="rd-cloth" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#9b8360"/><path d="M0 1H4M1 0V4" stroke="#c8b38a" stroke-width="1.1"/><path d="M0 3H4M3 0V4" stroke="#7c6646" stroke-width=".8"/></pattern>
  <filter id="rd-glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
</defs>
${motion(`.rd-n{animation:rd-n 5s ease-in-out infinite}.rd-f{animation:rd-f 3s steps(6) infinite}
@keyframes rd-n{0%,100%{transform:translateX(0)}35%{transform:translateX(2.5px)}70%{transform:translateX(-2px)}}
@keyframes rd-f{0%,100%{opacity:0}30%{opacity:.18}55%{opacity:.05}80%{opacity:.14}}`)}
<rect width="400" height="150" rx="18" fill="url(#rd-wood)"/>
<g fill="none" stroke="#2b1708" stroke-opacity=".25"><path d="M0 40C120 30 260 52 400 36M0 92C140 84 250 104 400 88M0 128C110 120 300 138 400 124"/></g>
<rect x="5" y="5" width="390" height="140" rx="14" fill="none" stroke="#d9a877" stroke-opacity=".3" stroke-width="1.5"/>
<rect x="16" y="16" width="130" height="118" rx="12" fill="url(#rd-cloth)" stroke="#2b1708" stroke-width="2"/>
<g fill="url(#rd-wood)" stroke="#2b1708" stroke-opacity=".5"><rect x="44" y="18" width="8" height="114" rx="4"/><rect x="77" y="18" width="8" height="114" rx="4"/><rect x="110" y="18" width="8" height="114" rx="4"/></g>
<rect x="164" y="16" width="220" height="56" rx="8" fill="#2b1708"/>
<rect x="168" y="20" width="212" height="48" rx="6" fill="url(#rd-dial)"/>
<rect class="rd-f" x="168" y="20" width="212" height="48" rx="6" fill="#fff"/>
<g stroke="#5a2e10" stroke-width="1">${ticks}</g>
<g font-family="${MONO}" font-size="8" fill="#5a2e10" text-anchor="middle">${LABELS.map((l, i) => `<text x="${178 + i * 37.6}" y="39">${l}</text>`).join("")}
  <text x="274" y="63" font-size="6.5" letter-spacing="2">★ STARS · KC</text></g>
<g class="rd-n"><path d="M${nx.toFixed(1)} 22V66" stroke="#d6261a" stroke-width="4" stroke-opacity=".45" filter="url(#rd-glow)"/><path d="M${nx.toFixed(1)} 22V66" stroke="#b3170c" stroke-width="1.6"/></g>
<rect x="168" y="20" width="212" height="12" rx="6" fill="#fff" fill-opacity=".18"/>
<g font-family="${SERIF}" fill="#f6e3c0">
  <text x="168" y="94" font-size="17" font-weight="700">${esc(fit(r.name, 214, 17, 0.55))}</text>
  <text x="168" y="111" font-size="11" font-style="italic" fill="#e0c39a">${esc(fit(r.owner, 110, 11, 0.5))} · ${esc(fit(r.lang.name, 90, 11, 0.5))}</text>
  <text x="196" y="132" font-size="12" font-family="${FONT}" font-weight="700">★ ${esc(r.stars)}  <tspan fill="#e0c39a">⑂ ${esc(r.forks)}</tspan></text>
</g>
<circle cx="180" cy="128" r="9" fill="url(#rd-knob)" stroke="#d9a877" stroke-opacity=".5"/><circle cx="180" cy="128" r="3" fill="${r.lang.color}"/>
<circle cx="370" cy="124" r="12" fill="url(#rd-knob)" stroke="#d9a877" stroke-opacity=".5"/><path d="M370 124L${370 + 8 * Math.cos(nx / 30)} ${124 + 8 * Math.sin(nx / 30)}" stroke="#f6e3c0" stroke-width="1.6" stroke-linecap="round"/>`,
  );
};
