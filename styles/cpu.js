import { FONT, MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "CPU package: gold pins, a heat spreader engraved with the name and a clock speed from the stars (1.2K stars = 1.2 GHz), a die shot whose cores pulse with load.";

// Engraved lettering: dark text with a light edge just below it.
const eng = (s, x, y, size, w = 400) => `<text x="${x}" y="${y + 0.7}" font-size="${size}" fill="#fff" fill-opacity=".55">${s}</text><text x="${x}" y="${y}" font-size="${size}" fill="#5b616a" font-weight="${w}">${s}</text>`;

// A square CPU on the left, specs on the right and a small die shot in the corner.
export default (r) => {
  const c = (i) => r.name.charCodeAt(i % r.name.length);
  const clock = /K$/.test(r.stars) ? `${r.stars.slice(0, -1)} GHz` : /M$/.test(r.stars) ? `${r.stars.slice(0, -1)} THz` : `${r.stars} MHz`;
  const pins = Array.from({ length: 15 }, (_, i) => {
    const p = 21 + i * 7.5;
    return `<rect x="${p}" y="9" width="2.6" height="6"/><rect x="${p}" y="135" width="2.6" height="6"/><rect x="9" y="${p}" width="6" height="2.6"/><rect x="135" y="${p}" width="6" height="2.6"/>`;
  }).join("");
  const code = Array.from({ length: 36 }, (_, i) => (c(i) + i) % 3 ? "" : `<rect x="${102 + (i % 6) * 2.2}" y="${100 + Math.floor(i / 6) * 2.2}" width="2.2" height="2.2"/>`).join("");
  const cores = Array.from({ length: 8 }, (_, i) => `<rect class="cpu-c" x="${330 + (i % 2) * 15}" y="${20 + Math.floor(i / 2) * 13}" width="13" height="11" fill="${r.lang.color}" fill-opacity="${(0.45 + (c(i) % 5) / 10).toFixed(2)}" style="animation-delay:-${(c(i + 3) % 20) / 10}s"/>`).join("");
  return svg(
    r.name,
    `${motion(`.cpu-c{animation:cpu-c 2.2s ease-in-out infinite}@keyframes cpu-c{50%{fill-opacity:.2}}`)}
<defs><linearGradient id="cpu-ihs" x2="1" y2="1"><stop offset="0" stop-color="#eceef1"/><stop offset=".5" stop-color="#c3c8ce"/><stop offset="1" stop-color="#9ba1a9"/></linearGradient>
<pattern id="cpu-l3" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#5fa8b8" fill-opacity=".55"/></pattern></defs>
<rect width="400" height="150" rx="12" fill="#15171c"/>
<g fill="#d8b25a">${pins}</g>
<rect x="14" y="14" width="122" height="122" rx="5" fill="#1e4d38"/>
<g fill="#b98546"><rect x="18" y="19" width="5" height="3"/><rect x="127" y="128" width="5" height="3"/><rect x="18" y="128" width="5" height="3"/></g>
<path d="M17 20L23 14" stroke="#d8b25a" stroke-width="2"/>
<rect x="26" y="26" width="98" height="98" rx="6" fill="url(#cpu-ihs)" stroke="#858b93"/>
<g font-family="${MONO}">
  <rect x="34" y="34" width="13" height="13" rx="2.5" fill="${r.lang.color}"/><rect x="38" y="38" width="5" height="5" fill="#000" fill-opacity=".35"/>
  ${eng("CORE", 52, 44, 8.5, 700)}
  ${eng(esc(fit(r.name.toUpperCase(), 84, 8.5)), 34, 66, 8.5, 700)}
  ${eng(esc(clock), 34, 79, 8.5)}
  ${eng(esc(fit(r.owner.toUpperCase(), 84, 7)), 34, 91, 7)}
  ${eng(`X${(c(0) * 977 + c(1) * 31 + r.name.length).toString(16).toUpperCase().slice(0, 6)}`, 34, 112, 7)}
  <g fill="#5b616a">${code}</g>
</g>
<rect x="324" y="14" width="66" height="62" rx="2" fill="#241c33" stroke="#3b3150"/>
<rect x="361" y="20" width="23" height="50" fill="url(#cpu-l3)"/>
<path d="M327 17H387V73H327Z" fill="none" stroke="#c9a85c" stroke-opacity=".5" stroke-dasharray="1.5 1.5"/>
${cores}
<g font-family="${FONT}">
  <text x="152" y="28" font-family="${MONO}" font-size="8.5" fill="#8a909a" letter-spacing="1.5">${esc(fit(`PROCESSOR · ${r.owner.toUpperCase()}`, 164, 8.5, 0.75))}</text>
  <text x="152" y="52" font-size="17" font-weight="700" fill="#eef0f3">${esc(fit(r.name, 164, 17))}</text>
  <text font-size="11" fill="#a3a9b3">${lines(wrap(r.description, 28, 3), 152, 74, 14)}</text>
  <text x="152" y="132" font-family="${MONO}" font-size="10" fill="#eef0f3"><tspan fill="#8a909a">CLK</tspan> ★ ${esc(clock)}  <tspan fill="#8a909a">CORES</tspan> ⑂ ${esc(r.forks)}</text>
  <circle cx="${376 - Math.min(60, r.lang.name.length * 6)}" cy="128.5" r="4" fill="${r.lang.color}"/>
  <text x="384" y="132" font-family="${MONO}" font-size="10" fill="#eef0f3" text-anchor="end">${esc(fit(r.lang.name, 60, 10))}</text>
</g>`,
  );
};
