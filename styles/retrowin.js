import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Mid-90s dialog box on a teal desktop.";

const SANS = "'MS Sans Serif', Tahoma, Geneva, Verdana, sans-serif";

// A raised grey control: white light from the top left, dark shadow bottom right.
const bevel = (x, y, w, h) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#c0c0c0"/>
  <path d="M${x} ${y + h}V${y}H${x + w}" fill="none" stroke="#fff"/>
  <path d="M${x} ${y + h}H${x + w}V${y}" fill="none" stroke="#404040"/>`;

const button = (x, label) =>
  `${bevel(x, 104, 64, 22)}<text x="${x + 32}" y="119" text-anchor="middle">${esc(label)}</text>`;

// A mid-90s desktop dialog box on a teal desktop.
export default (r) =>
  svg(
    r.name,
    `${motion(".rw-busy { opacity: 1; transform-box: fill-box; transform-origin: center; animation: rw-busy 4s ease-in-out infinite } @keyframes rw-busy { 0%, 40% { transform: none } 50%, 90% { transform: rotate(180deg) } 100% { transform: rotate(360deg) } }")}
<defs><linearGradient id="title"><stop offset="0" stop-color="#000080"/><stop offset="1" stop-color="#1084d0"/></linearGradient></defs>
<rect width="400" height="150" rx="4" fill="#008080"/>
${bevel(14, 12, 372, 126)}
<rect x="18" y="16" width="364" height="18" fill="url(#title)"/>
<g font-family="${SANS}" font-size="11">
  <text x="24" y="29" font-weight="700" fill="#fff">${esc(fit(`${r.name}.exe`, 290, 11, 0.62))}</text>
  ${[330, 346, 364].map((x, i) => `${bevel(x, 19, 14, 12)}<text x="${x + 7}" y="${29 - (i === 0 ? 2 : 0)}" text-anchor="middle" font-size="9" font-weight="700">${["_", "□", "×"][i]}</text>`).join("")}
  <circle cx="42" cy="64" r="13" fill="#1a5fd6" stroke="#00255f"/>
  <text x="42" y="70" text-anchor="middle" font-family="Georgia, serif" font-size="17" font-weight="700" fill="#fff">i</text>
  <text>${lines(wrap(r.description, 48), 68, 58, 15)}</text>
  ${button(168, `★ ${r.stars}`)}
  ${button(240, `⑂ ${r.forks}`)}
  ${button(312, fit(r.lang.name, 56, 11))}
  <g class="rw-busy" opacity="0" stroke="#000" stroke-linejoin="round"><path d="M136 106h11v2l-4 5l4 5v2h-11v-2l4-5l-4-5Z" fill="#fff"/><path d="M138.5 119.5h6l-3-3.5Z" fill="#000"/></g>
</g>`,
  );
