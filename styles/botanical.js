import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Botanical plate: cream paper, a fine line-drawn fern, an italic species-style name and a Latin family label.";

const SERIF = "'Hoefler Text', 'Cormorant Garamond', Garamond, 'Palatino Linotype', Palatino, Georgia, serif";

// A fern frond: pairs of leaflets along a curved stem, shrinking toward the tip.
const fern = () => {
  const [p0, p1, p2] = [[334, 146], [318, 84], [356, 16]];
  const at = (t, i) => (1 - t) ** 2 * p0[i] + 2 * (1 - t) * t * p1[i] + t * t * p2[i];
  const leaf = (l) => `M0 0Q${l / 2} ${-l / 4.5} ${l} 0Q${l / 2} ${l / 4.5} 0 0ZM0 0L${l * 0.85} 0`;
  let out = `<path d="M${p0}Q${p1} ${p2}" fill="none"/>`;
  for (let k = 0; k < 11; k++) {
    const t = 0.1 + k * 0.08;
    const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const a = (Math.atan2(dy, dx) * 180) / Math.PI;
    const l = 34 * (1 - t * 0.8);
    for (const side of [-58, 58])
      out += `<path transform="translate(${at(t, 0).toFixed(1)} ${at(t, 1).toFixed(1)}) rotate(${(a + side).toFixed(1)})" d="${leaf(l)}"/>`;
  }
  return out;
};

// Herbarium plate: ruled frame, specimen drawing on the right, the repo as a botanical name.
export default (r) =>
  svg(
    r.name,
    `${motion(".bt-sway{transform-origin:334px 146px;animation:bt-sway 7s ease-in-out -1.75s infinite}@keyframes bt-sway{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}")}
<defs><filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .38  0 0 0 0 .25  0 0 0 .5 -.18"/></filter></defs>
<rect width="400" height="150" rx="4" fill="#f6efdc"/>
<rect width="400" height="150" rx="4" filter="url(#paper)"/>
<rect x="7" y="7" width="386" height="136" fill="none" stroke="#8b7d5c" stroke-width=".9"/>
<rect x="11" y="11" width="378" height="128" fill="none" stroke="#8b7d5c" stroke-width=".4"/>
<g class="bt-sway"><g stroke="#46633a" stroke-width=".9" fill="#7a9a55" fill-opacity=".16" stroke-linejoin="round">${fern()}</g>
<circle cx="361" cy="15" r="3.5" fill="${r.lang.color}" stroke="#46633a" stroke-width=".6"/></g>
<g font-family="${SERIF}" fill="#2f3b24">
  <text x="26" y="32" font-size="8.5" letter-spacing="2.5" fill="#8b7d5c">${esc(fit(`HERBARIUM · @${r.owner}`.toUpperCase(), 250, 8.5, 0.85))}</text>
  <text x="26" y="58" font-size="24" font-style="italic">${esc(fit(r.name, 256, 24, 0.5))}</text>
  <line x1="26" y1="68" x2="110" y2="68" stroke="#8b7d5c" stroke-width=".7"/>
  <text font-size="12.5" fill="#5a5040">${lines(wrap(r.description, 40), 26, 86, 15)}</text>
  <circle cx="30" cy="123" r="4" fill="${r.lang.color}" stroke="#2f3b24" stroke-width=".5"/>
  <text x="40" y="127" font-size="12">Fam. <tspan font-style="italic">${esc(fit(r.lang.name, 110, 12, 0.5))}</tspan><tspan fill="#8b7d5c">  ·  ★ ${esc(r.stars)}  ·  ⑂ ${esc(r.forks)}</tspan></text>
  <text x="372" y="134" font-size="9" font-style="italic" fill="#8b7d5c" text-anchor="end">fig. 1</text>
</g>`,
  );
