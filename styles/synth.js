import { FONT, MONO, esc, fit, isLight, motion, svg } from "../card.js";

export const about = "Modular synth: a rack module named after the repo with STARS, FORKS and LANG knobs, patch cables, a blinking LED and a live oscilloscope. Shows no description.";

const knob = (cx, cy, deg) => `<g transform="translate(${cx} ${cy})">
    ${Array.from({ length: 11 }, (_, i) => `<path d="M0 -15V-18" transform="rotate(${-135 + i * 27})"/>`).join("")}
    <circle r="12" fill="#26272c"/><circle r="9" fill="#33353b"/>
    <path d="M0 -3V-10" stroke="#fff" stroke-width="2" stroke-linecap="round" transform="rotate(${deg.toFixed(1)})"/>
  </g>`;
const jack = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="#c9ccd2"/><circle cx="${x}" cy="${y}" r="3" fill="#0d0d0f"/>`;
const cable = (x1, y1, x2, y2, sag, color) =>
  `<path d="M${x1} ${y1}C${x1 + 6} ${sag} ${x2 - 6} ${sag} ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="3.5" fill="${color}"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${color}"/>`;
const turn = (n, decades) => -135 + 270 * Math.min(1, Math.log10(n + 1) / decades);

// A Eurorack-style case: a wide module named after the repo, a VCO with a blinking LED and a scope module, patched together.
export default (r) => {
  const seed = [...r.name].reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const ink = isLight(r.lang.color) ? "#15161a" : "#fff";
  const f = 0.6 + (r.forkCount % 4) * 0.2;
  const wave = Array.from({ length: 41 }, (_, i) => `${i ? "L" : "M"}${306 + i * 4} ${(42 - 11 * Math.sin(i * f)).toFixed(1)}`).join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="sy-rail" x2="0" y2="1"><stop offset="0" stop-color="#c3c7ce"/><stop offset="1" stop-color="#7d828b"/></linearGradient>
  <clipPath id="sy-scope"><rect x="312" y="22" width="70" height="40" rx="3"/></clipPath>
</defs>
${motion(`.sy-led{animation:sy-led 1s ease-in-out infinite}.sy-wave{animation:sy-wave 2s linear infinite}
@keyframes sy-led{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes sy-wave{to{transform:translateX(-${((8 * Math.PI) / f).toFixed(2)}px)}}`)}
<rect width="400" height="150" rx="10" fill="#1b1c20"/>
<rect y="2" width="400" height="9" fill="url(#sy-rail)"/><rect y="139" width="400" height="9" fill="url(#sy-rail)"/>
<g fill="#4b4f57">${[16, 228, 312, 384].map((x) => `<circle cx="${x}" cy="6.5" r="2"/><circle cx="${x}" cy="143.5" r="2"/>`).join("")}</g>
<rect x="10" y="13" width="206" height="124" rx="2" fill="#e4e2dc"/>
<rect x="10" y="13" width="206" height="22" rx="2" fill="${r.lang.color}"/>
<rect x="220" y="13" width="80" height="124" rx="2" fill="#2d3038"/>
<rect x="304" y="13" width="86" height="124" rx="2" fill="#cfcabc"/>
<rect x="312" y="22" width="70" height="40" rx="3" fill="#0b1a12"/>
<g clip-path="url(#sy-scope)"><path d="M312 42H382M347 22V62" stroke="#1f4a2f" stroke-width=".8"/>
  <path class="sy-wave" d="${wave}" fill="none" stroke="#7dffa8" stroke-width="1.5"/></g>
<g stroke="#5a5c63" stroke-width="1.2">${knob(45, 58, turn(r.starCount, 4))}${knob(108, 58, turn(r.forkCount, 3))}${knob(171, 58, (seed % 270) - 135)}</g>
<g stroke="#9aa0aa" stroke-width="1.2">${knob(260, 66, turn(r.starCount + r.forkCount, 4))}</g>
<circle cx="260" cy="32" r="7" fill="#ff3b30" fill-opacity=".25"/><circle class="sy-led" cx="260" cy="32" r="3.5" fill="#ff5a4f"/>
${jack(30, 123)}${jack(75, 123)}${jack(120, 123)}${jack(165, 123)}${jack(245, 104)}${jack(275, 104)}${jack(245, 125)}${jack(275, 125)}${jack(325, 123)}${jack(368, 123)}
<g font-family="${FONT}" font-weight="700" text-anchor="middle">
  <text x="18" y="29" font-size="12.5" fill="${ink}" text-anchor="start" letter-spacing=".5">${esc(fit(r.name.toUpperCase(), 190, 12.5, 0.7))}</text>
  <g font-size="10" fill="#1d1e22"><text x="45" y="88">★ ${esc(r.stars)}</text><text x="108" y="88">⑂ ${esc(r.forks)}</text><text x="171" y="88" font-size="8.5">${esc(fit(r.lang.name, 58, 8.5))}</text></g>
  <g font-size="6.5" fill="#6b6d73" letter-spacing="1"><text x="45" y="98">STARS</text><text x="108" y="98">FORKS</text><text x="171" y="98">LANG</text>
    <text x="30" y="112">IN</text><text x="75" y="112">CV</text><text x="120" y="112">GATE</text><text x="165" y="112">OUT</text>
    <text x="325" y="112">IN</text><text x="368" y="112">OUT</text></g>
  <g font-size="7.5" fill="#d6d9df" letter-spacing="1"><text x="260" y="22" font-size="6.5">CLOCK</text><text x="260" y="92">VCO</text></g>
  <text x="347" y="76" font-size="7.5" fill="#3a3b40" letter-spacing="1">SCOPE</text>
  <text x="347" y="90" font-size="7" font-weight="400" fill="#55575d" font-family="${MONO}">${esc(fit(r.owner, 74, 7))}</text>
</g>
${cable(165, 123, 245, 104, 146, r.lang.color)}${cable(75, 123, 325, 123, 152, "#f59e0b")}${cable(275, 125, 368, 123, 148, "#22d3ee")}`,
  );
};
