import { FONT, MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Bohr atom: a glowing nucleus in the language colour with one orbiting electron per fork (up to 9) and element-style data, stars as the atomic number.";

const RX = 74, RY = 22;
const NUCLEUS = [[0, 0], [5, -3], [-5, -2], [2, 5], [-3, 5], [5, 3], [-1, -6], [-6, 3]];

// An atom on the right: three tilted orbits, electrons sweep them as two eased sine motions (an exact ellipse, no SMIL).
export default (r) => {
  const n = Math.min(r.forkCount, 9);
  const electrons = Array.from({ length: n }, (_, k) => {
    const o = k % 3, m = Math.ceil((n - o) / 3), a = (2 * Math.PI * Math.floor(k / 3)) / m + o, T = 2 + o * 0.5;
    const d = (a / Math.PI) * T;
    return `<g transform="rotate(${o * 60})"><g class="at-x at-${o}" transform="translate(${(-RX * Math.cos(a)).toFixed(1)} 0)" style="animation-delay:-${d.toFixed(2)}s">
    <g class="at-y at-${o}" transform="translate(0 ${(RY * Math.sin(a)).toFixed(1)})" style="animation-delay:-${(d + T / 2).toFixed(2)}s"><circle r="3.6"/></g></g></g>`;
  }).join("");
  const ease = "cubic-bezier(.37,0,.63,1) infinite alternate";
  return svg(
    r.name,
    `${motion(`.at-x{animation:at-x 2s ${ease}}.at-y{animation:at-y 2s ${ease}}.at-1{animation-duration:2.5s}.at-2{animation-duration:3s}
@keyframes at-x{from{transform:translateX(-${RX}px)}to{transform:translateX(${RX}px)}}@keyframes at-y{from{transform:translateY(-${RY}px)}to{transform:translateY(${RY}px)}}
.at-n{animation:at-n 3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes at-n{50%{transform:scale(1.15);opacity:.7}}`)}
<defs><radialGradient id="at-bg" cx=".75" cy=".5" r=".8"><stop offset="0" stop-color="#1d1846"/><stop offset="1" stop-color="#0a0918"/></radialGradient>
<radialGradient id="at-glow"><stop offset="0" stop-color="${r.lang.color}" stop-opacity=".6"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity="0"/></radialGradient>
<filter id="at-blur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<rect width="400" height="150" rx="12" fill="url(#at-bg)"/>
<g transform="translate(302 75)">
  <circle class="at-n" r="26" fill="url(#at-glow)"/>
  <g fill="none" stroke="#a9b2ff" stroke-opacity=".38" stroke-width="1.2">${[0, 60, 120].map((t) => `<ellipse rx="${RX}" ry="${RY}" transform="rotate(${t})"/>`).join("")}</g>
  <g stroke="#0a0918" stroke-opacity=".5">${NUCLEUS.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4.6" fill="${i % 2 ? "#c9cde6" : r.lang.color}"/>`).join("")}</g>
  <g fill="#eef1ff" filter="url(#at-blur)">${electrons}</g>
</g>
<g font-family="${FONT}">
  <circle cx="26" cy="25" r="4" fill="${r.lang.color}"/>
  <text x="36" y="29" font-family="${MONO}" font-size="9.5" fill="#9aa0c8" letter-spacing="2">${esc(fit(r.lang.name.toUpperCase(), 180, 9.5, 0.75))}</text>
  <text x="22" y="54" font-size="20" font-weight="700" fill="#f1f2ff">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="11.5" fill="#aab0d6">${lines(wrap(r.description, 31), 22, 76, 15)}</text>
  <text x="22" y="127" font-family="${MONO}" font-size="12.5" font-weight="700" fill="#f1f2ff"><tspan fill="#8088c0" font-weight="400">Z </tspan>★ ${esc(r.stars)}<tspan dx="12" fill="#8088c0" font-weight="400">e⁻ </tspan>⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
