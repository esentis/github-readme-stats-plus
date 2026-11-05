// Letterpress print: deep debossed serif type in language-colour ink on thick cotton paper, with an occasional sheen of a roller pass.
import { esc, fit, isLight, lines, motion, svg, wrap } from "../card.js";

export const about = "Letterpress print: deep debossed serif type on thick cotton paper, inked in the language colour, with a roller's sheen passing now and then.";

const SERIF = "Georgia, 'Times New Roman', serif";

// Light inks are darkened toward a warm umber so they still read on cream paper.
const deepen = (hex, t) => {
  const h = hex.length < 7 ? hex.replace(/\w/g, "$&$&") : hex;
  const [a, b, c] = [1, 3, 5].map((i, k) => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - t) + [80, 38, 18][k] * t));
  return `rgb(${a},${b},${c})`;
};

// Debossed: shadow on the upper wall, a lit lower lip, then the ink on the floor of the impression.
const press = (attrs, body, ink, d = 0.8) =>
  `<text ${attrs} fill="#000" fill-opacity=".26" transform="translate(0 ${-d * 0.8})">${body}</text><text ${attrs} fill="#fff" transform="translate(0 ${d})">${body}</text><text ${attrs} fill="${ink}" filter="url(#lp-ink)">${body}</text>`;

export default (r) => {
  const ink = isLight(r.lang.color) ? deepen(r.lang.color, 0.55) : r.lang.color;
  const fibres = [[40, 30, 14], [92, 120, -10], [150, 24, 8], [236, 132, 12], [318, 40, -14], [352, 112, 9], [66, 84, 6], [286, 92, -7]]
    .map(([x, y, d]) => `<path d="M${x} ${y}q${d / 2} ${-3} ${d} ${2}"/>`).join("");
  const rule = `<path d="M150 75H192M208 75H250" stroke="${ink}" stroke-width="1"/><path d="M200 71l4 4-4 4-4-4Z" fill="${ink}"/>`;
  return svg(
    r.name,
    `${motion(".lp-sheen{animation:lp-sheen 9s ease-in-out infinite}@keyframes lp-sheen{0%,60%{transform:translateX(0)}92%,100%{transform:translateX(650px)}}")}
<defs>
  <filter id="lp-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .38  0 0 0 0 .28  0 0 0 -1.2 .7"/></filter>
  <filter id="lp-ink"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.9 1.2"/><feComposite in="SourceGraphic" operator="in"/></filter>
  <linearGradient id="lp-sh"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <clipPath id="lp-paper"><rect x="8" y="6" width="384" height="136" rx="3"/></clipPath>
</defs>
<rect width="400" height="150" rx="12" fill="#3a332f"/>
<rect x="8" y="9" width="384" height="136" rx="3" fill="#1c1715" fill-opacity=".6"/><rect x="8" y="7.5" width="384" height="136" rx="3" fill="#d9d0bf"/>
<g clip-path="url(#lp-paper)">
  <rect x="8" y="6" width="384" height="136" fill="#f6f0e4"/>
  <rect x="8" y="6" width="384" height="136" filter="url(#lp-grain)" opacity=".5"/>
  <g fill="none" stroke="#bfae8e" stroke-opacity=".45" stroke-width=".5">${fibres}</g>
  <rect x="21" y="17.9" width="358" height="114" fill="none" stroke="#fff" stroke-width="2"/><rect x="21" y="16.3" width="358" height="114" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="2"/>
  <rect x="21" y="17" width="358" height="114" fill="none" stroke="${ink}" stroke-width="1.8"/><rect x="25.5" y="21.5" width="349" height="105" fill="none" stroke="${ink}" stroke-opacity=".45" stroke-width=".6"/>
  <g font-family="${SERIF}" text-anchor="middle">
    ${press('x="200" y="39" font-size="9" letter-spacing="3"', esc(fit(r.owner.toUpperCase(), 300, 9, 0.95)), "#7d7266")}
    ${press('x="200" y="63" font-size="24" font-weight="700"', esc(fit(r.name, 330, 24, 0.62)), ink)}
    ${rule}
    ${press('font-size="11.5" font-style="italic"', lines(wrap(r.description, 50), 200, 92, 14), "#4f473f", 0.6)}
    ${press('x="200" y="120" font-size="10" letter-spacing="1.6"', `${esc(fit(r.lang.name.toUpperCase(), 120, 10, 0.85))}&#160; · &#160;★ ${esc(r.stars)}&#160; · &#160;⑂ ${esc(r.forks)}`, "#3d3630")}
  </g>
  <g transform="skewX(-18)"><rect class="lp-sheen" x="-150" y="-20" width="90" height="190" fill="url(#lp-sh)"/></g>
</g>`,
  );
};
