// Terrarium on a shelf: a corked glass jar of pebbles, soil, moss, a fern, a succulent and a toadstool in the language colour.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Terrarium: a corked glass jar of moss, a fern, a succulent and a toadstool in the language colour, with condensation droplets gliding down the glass.";

const JAR = "M50 26V33Q50 39 40 41Q30 43 30 53V124Q30 132 38 132H118Q126 132 126 124V53Q126 43 116 41Q106 39 106 33V26Z";
const MOSS = [[36, 104, 7, "#5f8a36"], [46, 100, 8, "#7aa346"], [58, 104, 7, "#4f7a2f"], [70, 101, 8, "#86ac4e"], [84, 103, 8, "#5f8a36"], [97, 100, 7, "#76a043"], [110, 103, 8, "#4f7a2f"], [121, 104, 6, "#7aa346"]];
const DROPS = [[37, 54, 0], [44, 70, -2.5], [113, 58, -1.2], [120, 74, -4], [66, 46, -3.3]];

export default (r) => {
  const c = r.lang.color;
  const leaflets = Array.from({ length: 6 }, (_, i) => {
    const y = 96 - i * 8, w = 11 - i * 1.4;
    return `<path d="M${49 + i * 1.2} ${y}q${-w} ${-2} ${-w - 2} ${-7}q${w * 0.6} 0 ${w + 2} ${7}ZM${49 + i * 1.2} ${y}q${w} ${-3} ${w + 1} ${-8}q${-w * 0.7} 1 ${-w - 1} ${8}Z"/>`;
  }).join("");
  const rosette = [-70, -40, -10, 20, 50, 80, -100, 110].map((a, i) => `<ellipse cx="80" cy="${i > 5 ? 96 : 90}" rx="3.2" ry="${i > 5 ? 7 : 9}" transform="rotate(${a} 80 98)"/>`).join("");
  const drops = DROPS.map(([x, y, d]) => `<g class="tr-drop" style="animation-delay:${d}s"><path d="M${x} ${y - 9}V${y - 2}" stroke="#fff" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="${x}" cy="${y}" rx="1.9" ry="2.5" fill="#fff" fill-opacity=".75" stroke="#7fa79c" stroke-opacity=".6" stroke-width=".6"/><circle cx="${x - 0.6}" cy="${y - 0.9}" r=".55" fill="#fff"/></g>`).join("");
  return svg(
    r.name,
    `${motion(".tr-drop{animation:tr-drop 5s ease-in infinite}@keyframes tr-drop{0%{transform:none;opacity:1}70%{transform:translateY(22px);opacity:1}80%{transform:translateY(24px);opacity:0}82%{transform:none;opacity:0}100%{transform:none;opacity:1}}")}
<defs>
  <linearGradient id="tr-wall" x2="0" y2="1"><stop offset="0" stop-color="#f3ecdf"/><stop offset="1" stop-color="#e6dac5"/></linearGradient>
  <radialGradient id="tr-sun" cx=".1" cy="0" r=".8"><stop offset="0" stop-color="#fff6dc" stop-opacity=".8"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/></radialGradient>
  <linearGradient id="tr-cork" x2="0" y2="1"><stop offset="0" stop-color="#d6ae7c"/><stop offset="1" stop-color="#a87b4d"/></linearGradient>
  <radialGradient id="tr-mist" cy=".25" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <clipPath id="tr-in"><path d="${JAR}"/></clipPath>
</defs>
<rect width="400" height="150" rx="12" fill="url(#tr-wall)"/><rect width="400" height="150" rx="12" fill="url(#tr-sun)"/>
<path d="M0 132H400V138A12 12 0 0 1 388 150H12A12 12 0 0 1 0 138Z" fill="#8b5a3c"/><rect y="128" width="400" height="5" fill="#b07a50"/><path d="M0 133H400M40 140H170M220 144H360" stroke="#5e3b25" stroke-opacity=".35"/>
<ellipse cx="78" cy="131" rx="52" ry="3" fill="#5e3b25" fill-opacity=".35"/>
<path d="${JAR}" fill="#dfeee6" fill-opacity=".35"/>
<g clip-path="url(#tr-in)">
  <rect x="28" y="117" width="100" height="16" fill="#a9a39b"/>
  <g fill="#8a847c">${[34, 44, 55, 66, 77, 89, 100, 111, 121].map((x, i) => `<circle cx="${x}" cy="${123 + (i % 3) * 3}" r="${3 + (i % 2)}" fill="${i % 2 ? "#c2bcb2" : "#8f887e"}"/>`).join("")}</g>
  <rect x="28" y="113" width="100" height="5" fill="#3a3330"/>
  <path d="M28 104Q50 100 78 104T128 103V114H28Z" fill="#5c3d2b"/>
  ${MOSS.map(([x, y, rr, f]) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="${f}"/>`).join("")}
  <g fill="#3f6b2c"><path d="M49 104Q50 80 56 56" fill="none" stroke="#3f6b2c" stroke-width="1.4"/>${leaflets}</g>
  <g fill="#8fb89a" stroke="#5f8f72" stroke-width=".6">${rosette}</g><circle cx="80" cy="98" r="2.5" fill="#b9d8c0"/>
  <path d="M104 101V87" stroke="#f2e6cf" stroke-width="4" stroke-linecap="round"/>
  <path d="M93 89Q93 74 104 74Q115 74 115 89Z" fill="${c}" stroke="#2b1d16" stroke-opacity=".3" stroke-width=".8"/>
  <g fill="#fff8ea"><circle cx="99" cy="81" r="1.6"/><circle cx="106" cy="78" r="1.3"/><circle cx="110" cy="85" r="1.4"/><circle cx="101" cy="86" r="1"/></g>
  <rect x="28" y="26" width="100" height="70" fill="url(#tr-mist)"/>
  ${drops}
</g>
<path d="${JAR}" fill="none" stroke="#9cbcb3" stroke-width="2" stroke-opacity=".9"/>
<path d="M36 60Q35 90 37 120" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M120 62V88" stroke="#fff" stroke-opacity=".45" stroke-width="1.5" stroke-linecap="round"/>
<path d="M46 12H110Q112 12 112 15L108 30H48L44 15Q44 12 46 12Z" fill="url(#tr-cork)"/><g fill="#7a5233" fill-opacity=".45"><circle cx="58" cy="18" r="1"/><circle cx="72" cy="23" r=".8"/><circle cx="90" cy="17" r="1.1"/><circle cx="100" cy="24" r=".8"/></g>
<g font-family="${FONT}" fill="#2f3d2a">
  <text x="152" y="32" font-size="9" font-weight="700" letter-spacing="2" fill="#7a8a6e">${esc(fit(r.owner.toUpperCase(), 230, 9, 0.8))}</text>
  <text x="152" y="56" font-size="19" font-weight="800">${esc(fit(r.name, 232, 19))}</text>
  <text font-size="11.5" fill="#55604c">${lines(wrap(r.description, 37), 152, 78, 15)}</text>
  ${row(stats(r, { cy: 114, size: 12, text: 'fill="#2f3d2a" font-weight="600"', icon: 'fill="#6b7d5e"' }), 152, 14)}
</g>`,
  );
};
