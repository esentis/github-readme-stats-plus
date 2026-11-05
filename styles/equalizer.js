import { MONO, esc, fit, motion, svg } from "../card.js";

export const about = "Graphic equalizer: dark hi-fi panel, the name on a green LCD and twenty LED-segment bands whose peaks flicker like a live signal. Shows no description.";

const HZ = ["31", "63", "125", "250", "500", "1K", "2K", "4K", "8K", "16K"];

// A hi-fi graphic equalizer: band heights come from the repo name, the top lit LEDs of each band bounce.
export default (r) => {
  const seed = [...r.name].reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const bands = Array.from({ length: 20 }, (_, i) => {
    const lvl = 3 + Math.round((Math.sin(seed + i * 0.55) + 1) * 1.5) + (r.name.charCodeAt(i % r.name.length) % 4);
    const x = 22 + i * 18;
    const segs = Array.from({ length: 9 }, (_, k) => {
      const lit = k < lvl;
      const fill = !lit ? "#252830" : k >= 7 ? "#ff5a4f" : k >= 5 ? "#ffc247" : r.lang.color;
      const cls = lit && k >= lvl - 2 ? ` class="eq-${k === lvl - 1 ? "a" : "b"}" style="animation-delay:-${((seed * (i + 3)) % 17) / 10}s"` : "";
      return `<rect x="${x}" y="${126 - k * 8}" width="14" height="6" rx="1" fill="${fill}"${cls}/>`;
    }).join("");
    const peak = lvl < 9 ? `<rect x="${x}" y="${126 - lvl * 8 + 4}" width="14" height="2" fill="#e8ebf0" fill-opacity=".55"/>` : "";
    return segs + peak;
  }).join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="eq-panel" x2="0" y2="1"><stop offset="0" stop-color="#2a2d34"/><stop offset="1" stop-color="#111317"/></linearGradient>
  <filter id="eq-glow" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
${motion(`.eq-a{animation:eq-a 1.6s steps(1,end) infinite}.eq-b{animation:eq-b 1.6s steps(1,end) infinite}
@keyframes eq-a{0%{opacity:1}25%{opacity:.12}45%{opacity:1}70%{opacity:.12}85%{opacity:1}}
@keyframes eq-b{0%{opacity:1}30%{opacity:.12}50%{opacity:1}}`)}
<rect width="400" height="150" rx="12" fill="url(#eq-panel)"/>
<rect x="1" y="1" width="398" height="148" rx="11" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g fill="#4a4e57"><circle cx="9" cy="9" r="2"/><circle cx="391" cy="9" r="2"/><circle cx="9" cy="141" r="2"/><circle cx="391" cy="141" r="2"/></g>
<rect x="18" y="12" width="240" height="38" rx="4" fill="#0c1a12" stroke="#000" stroke-opacity=".6"/>
<g font-family="${MONO}">
  <text x="26" y="24" font-size="7" fill="#3f8a5a" letter-spacing="1.5">TRACK · ${esc(fit(r.owner.toUpperCase(), 160, 7, 0.75))}</text>
  <text x="26" y="42" font-size="15" font-weight="700" fill="#8dffb4" filter="url(#eq-glow)">${esc(fit(r.name.toUpperCase(), 224, 15))}</text>
  <circle cx="273" cy="22" r="4" fill="${r.lang.color}"/>
  <text x="282" y="25.5" font-size="9" fill="#9aa1ad" letter-spacing="1">${esc(fit(r.lang.name.toUpperCase(), 98, 9, 0.75))}</text>
  <text x="268" y="44" font-size="13" font-weight="700" fill="#f2f4f7">★ ${esc(r.stars)}  <tspan fill="#9aa1ad">⑂ ${esc(r.forks)}</tspan></text>
  <g font-size="6.5" fill="#6b717d" text-anchor="middle">${HZ.map((h, i) => `<text x="${29 + i * 36}" y="143">${h}</text>`).join("")}</g>
</g>
${bands}`,
  );
};
