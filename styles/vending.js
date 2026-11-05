import { FONT, MONO, esc, fit, isLight, lines, motion, rng, svg, wrap } from "../card.js";

export const about = "Vending machine glowing at night: lit product rows, the repo on the selection screen and a language-coloured can dropping into the tray.";

const COLORS = ["#e63946", "#f4a261", "#2a9d8f", "#457b9d", "#8338ec", "#ff6b9a", "#06b88a", "#ffbe0b", "#3d5a80"];
// A product standing on a shelf at (x, bottom): can, bottle or snack bag.
const item = (x, y, kind, col) =>
  kind === 0
    ? `<rect x="${x - 7}" y="${y - 22}" width="14" height="22" rx="2.5" fill="${col}"/><rect x="${x - 7}" y="${y - 15}" width="14" height="6" fill="#fff" opacity=".55"/><rect x="${x - 5}" y="${y - 22}" width="2" height="22" fill="#fff" opacity=".25"/>`
    : kind === 1
      ? `<path d="M${x - 2.5} ${y - 25}h5v4q4 2 4 7v14h-13v-14q0-5 4-7Z" fill="${col}" opacity=".85"/><rect x="${x - 4.5}" y="${y - 12}" width="9" height="5" fill="#fff" opacity=".6"/>`
      : `<path d="M${x - 8} ${y - 22}l2 1.5l2-1.5l2 1.5l2-1.5l2 1.5l2-1.5l2 1.5l2-1.5l-1 22h-14Z" fill="${col}"/><circle cx="${x}" cy="${y - 11}" r="3.2" fill="#fff" opacity=".6"/>`;

// The machine fills the frame: glass on the left, a dark selection screen and LED readouts on the right.
export default (r) => {
  const c = r.lang.color, rand = rng(r.name);
  let goods = "";
  [54, 82, 110].forEach((y, row) => {
    [40, 75, 110, 145, 180].forEach((x, i) => {
      if (row || i !== 2) goods += item(x, y, Math.floor(rand() * 3), COLORS[Math.floor(rand() * COLORS.length)]);
    });
    goods += `<rect x="22" y="${y}" width="176" height="3.5" fill="#c9c2b3"/>${[40, 75, 110, 145, 180].map((x) => `<rect x="${x - 5}" y="${y + 0.6}" width="10" height="2.4" fill="#fff"/>`).join("")}`;
  });
  return svg(
    r.name,
    `${motion(".vd-can{transform-origin:110px 43px;animation:vd-can 9s infinite}@keyframes vd-can{0%,50%{transform:none;opacity:1}52%{transform:translateX(1px)}54%{transform:translateX(-1px)}56%{transform:none;animation-timing-function:cubic-bezier(.5,0,1,1)}66%,80%{transform:translateY(92px) rotate(24deg);opacity:1}80.1%{transform:none;opacity:0}92%,100%{transform:none;opacity:1}}.vd-thk{animation:vd-thk 9s infinite}@keyframes vd-thk{0%,65%,80%,100%{opacity:0}67%{opacity:.6}}.vd-tube{animation:vd-tube 7s infinite}@keyframes vd-tube{0%,90%,93%,100%{opacity:1}91%{opacity:.55}92%{opacity:.9}92.5%{opacity:.6}}")}
<defs>
  <clipPath id="vd-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="vd-glass"><rect x="22" y="28" width="176" height="90" rx="3"/></clipPath>
  <linearGradient id="vd-bg" x2="0" y2="1"><stop offset="0" stop-color="#0a0d1c"/><stop offset="1" stop-color="#171c35"/></linearGradient>
  <linearGradient id="vd-in" x2="0" y2="1"><stop offset="0" stop-color="#fffbef"/><stop offset="1" stop-color="#efe1c3"/></linearGradient>
  <linearGradient id="vd-body" x2="1"><stop offset="0" stop-color="#151a2c"/><stop offset=".5" stop-color="#262d47"/><stop offset="1" stop-color="#141828"/></linearGradient>
  <radialGradient id="vd-spill" cy="0"><stop offset="0" stop-color="#ffe9b8" stop-opacity=".5"/><stop offset="1" stop-color="#ffe9b8" stop-opacity="0"/></radialGradient>
</defs>
<g clip-path="url(#vd-clip)">
  <rect width="400" height="150" fill="url(#vd-bg)"/>
  <rect y="141" width="400" height="9" fill="#06070d"/><ellipse cx="160" cy="141" rx="170" ry="9" fill="url(#vd-spill)"/>
  <rect x="12" y="6" width="376" height="135" rx="7" fill="url(#vd-body)" stroke="#3a4262" stroke-width="1"/>
  <rect x="22" y="13" width="356" height="11" rx="2.5" fill="${c}"/>
  <text x="30" y="21.5" font-family="${FONT}" font-size="8" font-weight="800" letter-spacing="2" fill="${isLight(c) ? "#14182a" : "#fff"}">${esc(fit(r.lang.name.toUpperCase(), 150, 8, 0.85))}</text>
  <text x="370" y="21.5" font-family="${FONT}" font-size="8" font-weight="800" letter-spacing="2" fill="${isLight(c) ? "#14182a" : "#fff"}" text-anchor="end">COLD · 24H</text>
  <rect x="22" y="28" width="176" height="90" rx="3" fill="url(#vd-in)"/>
  <rect class="vd-tube" x="22" y="28" width="176" height="90" rx="3" fill="#fff" opacity="1" fill-opacity=".18"/>
  <g clip-path="url(#vd-glass)">${goods}
    <g class="vd-can">${item(110, 54, 0, c)}</g>
    <path d="M70 28L40 118H62L92 28ZM120 28L90 118H98L128 28Z" fill="#fff" opacity=".18"/>
  </g>
  <rect x="22" y="28" width="176" height="90" rx="3" fill="none" stroke="#0b0e19" stroke-width="2"/>
  <rect x="22" y="122" width="176" height="13" rx="2" fill="#0b0e19"/><rect class="vd-thk" x="24" y="123" width="172" height="11" rx="2" fill="${c}" opacity="0"/>
  <text x="110" y="131.5" font-family="${FONT}" font-size="8" font-weight="700" letter-spacing="2" fill="#7d84a3" text-anchor="middle">PUSH</text>
  <rect x="206" y="28" width="172" height="68" rx="4" fill="#041219" stroke="#0b0e19" stroke-width="2"/>
  <rect x="207" y="29" width="170" height="66" rx="3" fill="#2de2c4" opacity=".05"/>
  <g font-family="${FONT}">
    <text x="215" y="42" font-family="${MONO}" font-size="8" font-weight="700" fill="#2de2c4" letter-spacing="1">SELECTION A3 ▸</text>
    <text x="215" y="61" font-size="15" font-weight="700" fill="#e9fffb">${esc(fit(r.name, 156, 15))}</text>
    <text font-size="11" fill="#7fcfc3">${lines(wrap(r.description, 24), 215, 76, 13)}</text>
  </g>
  <g font-family="${MONO}" font-size="12" font-weight="700" fill="#ffb347">
    <rect x="206" y="101" width="83" height="18" rx="3" fill="#0b0e19"/><text x="214" y="114.5">★ ${esc(r.stars)}</text>
    <rect x="295" y="101" width="83" height="18" rx="3" fill="#0b0e19"/><text x="303" y="114.5">⑂ ${esc(r.forks)}</text>
  </g>
  <rect x="206" y="123" width="40" height="11" rx="2" fill="#0b0e19"/><rect x="222" y="126" width="8" height="5" rx="1" fill="#2a3048"/>
  <g fill="#3a4262">${[262, 278, 294, 310, 326, 342].map((x) => `<circle cx="${x}" cy="128.5" r="4"/>`).join("")}</g>
  <circle cx="342" cy="128.5" r="2" fill="#2de2c4"/>
  <rect x="356" y="123" width="22" height="11" rx="2" fill="#0b0e19"/><rect x="365" y="125" width="3" height="7" rx="1" fill="#2a3048"/>
</g>`,
  );
};
