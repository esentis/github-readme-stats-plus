import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Glass cup of tea with the bag steeping and colour spreading, steam above, and the repo printed on the bag's string tag.";

// A clear glass cup on the left with the tea bag's tag hanging out over the rim to the right.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <linearGradient id="tea" x2="0" y2="1"><stop offset="0" stop-color="#d99a3a" stop-opacity=".55"/><stop offset="1" stop-color="#9a5418" stop-opacity=".9"/></linearGradient>
  <radialGradient id="plume"><stop offset="0" stop-color="#7a3e10" stop-opacity=".75"/><stop offset="1" stop-color="#7a3e10" stop-opacity="0"/></radialGradient>
  <clipPath id="water"><path d="M28 56H132L126 124Q125 134 115 134H45Q35 134 34 124Z"/></clipPath>
  <filter id="drop" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dy="1.5" stdDeviation="1.5" flood-opacity=".2"/></filter>
</defs>
${motion(`.tb-plume{transform-box:fill-box;transform-origin:center top;animation:tb-steep 7s ease-in-out infinite}
@keyframes tb-steep{0%,100%{transform:scale(.85);opacity:.7}50%{transform:scale(1.15);opacity:1}}
.tb-steam{animation:tb-rise 5s ease-in-out infinite}@keyframes tb-rise{0%,100%{transform:translateY(0);opacity:.7}50%{transform:translateY(-6px);opacity:.15}}`)}
<rect width="400" height="150" rx="12" fill="#eef2e8"/>
<ellipse cx="80" cy="138" rx="58" ry="5" fill="#000" fill-opacity=".08"/>
<g fill="none" stroke="#b7c2ad" stroke-width="2.2" stroke-linecap="round">
  <path class="tb-steam" d="M62 40q-5-7 0-13t0-13"/><path class="tb-steam" style="animation-delay:-2.5s" d="M94 38q5-7 0-13t0-13"/>
</g>
<path d="M132 70h6a14 14 0 0 1 0 38h-9" fill="none" stroke="#c9d3cf" stroke-width="5"/>
<g clip-path="url(#water)">
  <rect x="20" y="60" width="120" height="80" fill="url(#tea)"/>
  <path d="M20 60H140V62H20Z" fill="#fff" fill-opacity=".5"/>
  <ellipse class="tb-plume" cx="76" cy="112" rx="34" ry="26" fill="url(#plume)"/>
  <g transform="rotate(-8 76 104)"><rect x="62" y="86" width="28" height="34" rx="3" fill="#efe2c4" fill-opacity=".92"/><path d="M62 92H90" stroke="#d8c59b"/>
    <g fill="#6e4a20" fill-opacity=".5"><circle cx="70" cy="104" r="1.5"/><circle cx="80" cy="110" r="1.5"/><circle cx="76" cy="99" r="1.2"/><circle cx="84" cy="101" r="1.2"/></g></g>
</g>
<path d="M24 50H136L127 124Q125 138 113 138H47Q35 138 33 124Z" fill="#fff" fill-opacity=".18" stroke="#c9d3cf" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M40 64L46 122" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>
<path d="M75 86Q96 40 136 49Q170 56 200 50" fill="none" stroke="#a89c80" stroke-width="1.2"/>
<g filter="url(#drop)">
  <rect x="190" y="28" width="196" height="108" rx="5" fill="#fffdf6"/>
  <rect x="190" y="28" width="9" height="108" rx="4" fill="${r.lang.color}"/><rect x="195" y="28" width="5" height="108" fill="${r.lang.color}"/>
</g>
<circle cx="208" cy="45" r="3" fill="#eef2e8" stroke="#c9d3cf"/>
<path d="M200 50L208 45" stroke="#a89c80" stroke-width="1.2"/>
<g font-family="${FONT}">
  <text x="218" y="48" font-size="8.5" font-weight="700" letter-spacing="2" fill="#7f8f72">${esc(fit(`${r.lang.name.toUpperCase()} BLEND`, 158, 8.5, 0.8))}</text>
  <text x="210" y="70" font-size="16" font-weight="700" fill="#2f3a2a">${esc(fit(r.name, 166, 16))}</text>
  <text font-size="10" fill="#66705f">${lines(wrap(r.description, 27), 210, 87, 13)}</text>
  ${row(stats(r, { cy: 121, size: 11, text: 'fill="#2f3a2a" font-weight="600"', icon: 'fill="#7f8f72"' }).slice(1), 210, 14)}
</g>`,
  );
