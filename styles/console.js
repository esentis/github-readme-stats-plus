// Spaceship control console: a green screen with the name, toggle switches and blinking indicator lights on brushed metal.
import { MONO, esc, fit, lines, motion, row, stats, svg, textWidth, wrap } from "../card.js";

export const about = "Spaceship control console: a small green screen with the name, toggle switches and blinking indicator lights.";

const screw = (x, y) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#5b616c"/><path d="M${x - 1.4} ${y - 0.6}L${x + 1.4} ${y + 0.6}" stroke="#2a2d33" stroke-width=".8"/>`;

export default (r) => {
  const name = fit(r.name, 212, 15);
  const lights = [r.lang.color, "#ef4444", "#f59e0b", "#22c55e", "#38bdf8"]
    .map((c, i) => `<circle cx="${276 + i * 22}" cy="32" r="6" fill="#111317"/><circle class="cn-l${i % 3}" cx="${276 + i * 22}" cy="32" r="4" fill="${c}"/>`)
    .join("");
  const toggles = ["PWR", "NAV", "COM", "AUX"]
    .map((l, i) => {
      const x = 280 + i * 29, tip = r.name.charCodeAt(i % r.name.length) % 2 ? 60 : 80;
      return `<rect x="${x - 7}" y="58" width="14" height="24" rx="3" fill="#15171b" stroke="#4b515c"/><path d="M${x} 70V${tip}" stroke="#d1d5db" stroke-width="2.6" stroke-linecap="round"/><circle cx="${x}" cy="${tip}" r="2.4" fill="#f3f4f6"/><circle cx="${x}" cy="70" r="2.6" fill="#6b7280"/><text x="${x}" y="95" text-anchor="middle">${l}</text>`;
    })
    .join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="cn-metal" x2="0" y2="1"><stop offset="0" stop-color="#3b4049"/><stop offset="1" stop-color="#22252b"/></linearGradient>
  <radialGradient id="cn-glow" cx=".4" cy=".4" r=".8"><stop offset="0" stop-color="#0d3320"/><stop offset="1" stop-color="#03110a"/></radialGradient>
  <pattern id="cn-scan" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity=".35"/></pattern>
</defs>
${motion(`.cn-l0{animation:cn-blink 2s steps(1) infinite}.cn-l1{animation:cn-blink 3s steps(1) -1.2s infinite}.cn-l2{animation:cn-blink 2.4s steps(1) -.6s infinite}.cn-cur{animation:cn-blink 2s steps(1) infinite}
@keyframes cn-blink{0%{opacity:1}50%{opacity:.2}}`)}
<rect width="400" height="150" rx="12" fill="url(#cn-metal)"/>
<rect x="12" y="12" width="236" height="94" rx="6" fill="#0c0d10" stroke="#4b515c"/>
<rect x="17" y="17" width="226" height="84" rx="4" fill="url(#cn-glow)"/>
<rect x="17" y="17" width="226" height="84" rx="4" fill="url(#cn-scan)"/>
<rect x="258" y="12" width="130" height="94" rx="6" fill="#2b2f37" stroke="#454b55"/>
${screw(264, 18)}${screw(382, 18)}${screw(264, 100)}${screw(382, 100)}
<rect x="12" y="114" width="376" height="26" rx="5" fill="#16181d" stroke="#3a3f48"/>
<g font-family="${MONO}">
  <text x="25" y="33" font-size="9" fill="#4ade80" fill-opacity=".7">&gt; ${esc(fit(r.owner, 190, 9))} /</text>
  <text x="25" y="53" font-size="15" font-weight="700" fill="#86efac">${esc(name)}</text>
  <rect class="cn-cur" x="${27 + textWidth(name, 15)}" y="42" width="7" height="13" fill="#86efac"/>
  <text font-size="9.5" fill="#4ade80" fill-opacity=".8">${lines(wrap(r.description, 36), 25, 73, 13)}</text>
  ${lights}
  <text x="320" y="49" font-size="6.5" fill="#9ca3af" text-anchor="middle" letter-spacing="1">STATUS</text>
  <g font-size="6.5" fill="#9ca3af">${toggles}</g>
  ${row(stats(r, { cy: 127, size: 11, text: 'fill="#e5e7eb"', icon: 'fill="#9ca3af"' }), 24, 14)}
  <circle class="cn-l2" cx="300" cy="127" r="3" fill="#22c55e"/>
  <text x="378" y="130" font-size="8" fill="#86efac" text-anchor="end" letter-spacing="1">NOMINAL</text>
</g>`,
  );
};
