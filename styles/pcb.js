import { MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Printed circuit board: silkscreen name and stats, a chip whose copper traces are routed from the name, data pulses running out to the vias and a blinking LED.";

const pad = (x, y) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#d6a647"/><circle cx="${x}" cy="${y}" r="1.4" fill="#0a2a17"/>`;
const hole = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="#d6a647"/><circle cx="${x}" cy="${y}" r="3.2" fill="#10151a"/>`;

// Green PCB: silkscreen text on top, a chip whose traces fan out left and right to vias, routed from the name.
export default (r) => {
  const c = (i) => r.name.charCodeAt(i % r.name.length);
  const paths = [0, 1, 2, 3, 4].flatMap((i) => {
    const y = 92 + i * 8, ty = 84 + i * 12, d = Math.abs(ty - y);
    const lx = 150 - (c(i) % 4) * 8, rx = 330 + (c(i + 5) % 5) * 9;
    return [[`M190 ${y}H178L${178 - d} ${ty}H${lx}`, lx, ty], [`M262 ${y}H274L${274 + d} ${ty}H${rx}`, rx, ty]];
  });
  const pin = (x) => [92, 100, 108, 116, 124].map((y) => `<rect x="${x}" y="${y - 1.5}" width="6" height="3" fill="#cfd3d6"/>`).join("");
  const part = (x, y, body) => `<rect x="${x}" y="${y - 3}" width="12" height="6" rx="1" fill="${body}"/><rect x="${x}" y="${y - 3}" width="2.5" height="6" fill="#cfd3d6"/><rect x="${x + 9.5}" y="${y - 3}" width="2.5" height="6" fill="#cfd3d6"/>`;
  return svg(
    r.name,
    `${motion(`.pcb-p{animation:pcb-p 2.6s linear infinite}@keyframes pcb-p{0%{stroke-dashoffset:8}60%,100%{stroke-dashoffset:-100}}
.pcb-led{animation:pcb-led 1.8s ease-in-out infinite}@keyframes pcb-led{50%{opacity:.25}}`)}
<defs><linearGradient id="pcb-bg" x2="1" y2="1"><stop offset="0" stop-color="#0f6b3a"/><stop offset="1" stop-color="#0a4f2b"/></linearGradient>
<filter id="pcb-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter></defs>
<rect width="400" height="150" rx="12" fill="url(#pcb-bg)"/>
${hole(16, 16)}${hole(384, 16)}${hole(16, 134)}${hole(384, 134)}
<g fill="none" stroke="#d4a24c" stroke-width="2.2" stroke-linejoin="round">${paths.map(([d]) => `<path d="${d}"/>`).join("")}</g>
<g fill="none" stroke="#fff6c8" stroke-width="2.4" stroke-linecap="round">${paths.map(([d], i) => `<path class="pcb-p" d="${d}" pathLength="100" stroke-dasharray="6 200" stroke-dashoffset="-100" style="animation-delay:-${(c(i * 3) % 26) / 10}s"/>`).join("")}</g>
${paths.map(([, x, y]) => pad(x, y)).join("")}
${part(298, 96, "#1d1d1d")}${part(204, 79, "#b98546")}${part(236, 79, "#b98546")}
<rect class="pcb-led" x="294" y="114" width="20" height="12" rx="6" fill="${r.lang.color}" filter="url(#pcb-glow)"/>
${part(298, 120, r.lang.color)}
<rect x="190" y="84" width="72" height="48" rx="3" fill="none" stroke="#eef6ee" stroke-opacity=".8"/>
${pin(190)}${pin(256)}
<rect x="196" y="86" width="60" height="44" rx="2" fill="#1b1d1f"/><circle cx="203" cy="93" r="2" fill="#3a3d40"/>
<g font-family="${MONO}" fill="#eef6ee">
  <text x="226" y="111" font-size="7" fill="#c9cdd1" text-anchor="middle">${esc(fit(r.lang.name.toUpperCase(), 54, 7))}</text>
  <text x="226" y="142" font-size="7" text-anchor="middle" fill-opacity=".8">U1</text>
  <text x="30" y="32" font-size="17" font-weight="700">${esc(fit(r.name, 330, 17))}</text>
  <text font-size="10" fill-opacity=".8">${lines(wrap(r.description, 48), 30, 52, 13)}</text>
  <g font-size="12" font-weight="700"><text x="30" y="101">★ ${esc(r.stars)}</text><text x="30" y="118">⑂ ${esc(r.forks)}</text></g>
  <circle cx="34" cy="131" r="4" fill="${r.lang.color}" stroke="#eef6ee"/>
  <text x="43" y="135" font-size="11">${esc(fit(r.lang.name, 70, 11))}</text>
</g>`,
  );
};
