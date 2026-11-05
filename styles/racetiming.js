import { MONO, esc, fit, svg } from "../card.js";

export const about = "Motorsport live-timing screen: the repo on P1, purple/green/yellow sector times for stars, forks and language, race-control line with the description.";

const SECTORS = ["#b14cff", "#22d36b", "#f5c518"];

// Mini-sector dashes: mostly the language colour, the last few in the sector's timing colour.
const minis = (x, c, lang) =>
  Array.from({ length: 8 }, (_, i) => `<rect x="${x + i * 14}" y="80" width="12" height="5" rx="1" fill="${i < 5 ? lang : c}"/>`).join("");

// A dark timing tower row with three sectors and a race-control message.
export default (r) => {
  const sectors = [["S1 · STARS", `★ ${r.stars}`], ["S2 · FORKS", `⑂ ${r.forks}`], ["S3 · LANG", fit(r.lang.name, 104, 15)]];
  return svg(
    r.name,
    `<rect width="400" height="150" rx="10" fill="#15151e"/>
<rect width="400" height="26" rx="10" fill="#1f1f2b"/><rect y="16" width="400" height="10" fill="#1f1f2b"/>
<rect x="0" y="26" width="400" height="2" fill="#e10600"/>
<g font-family="${MONO}" font-weight="700">
  <text x="16" y="17" font-size="10" fill="#fff" letter-spacing="2">LIVE TIMING</text>
  <circle cx="114" cy="13" r="3" fill="#e10600"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <text x="384" y="17" font-size="10" fill="#9a9aae" text-anchor="end">${esc(fit(r.owner.toUpperCase(), 200, 10))}</text>
  <rect x="16" y="38" width="32" height="26" rx="3" fill="#fff"/><text x="32" y="56" font-size="15" fill="#15151e" text-anchor="middle">P1</text>
  <rect x="56" y="38" width="4" height="26" fill="${r.lang.color}"/>
  <text x="68" y="57" font-size="17" fill="#fff">${esc(fit(r.name.toUpperCase(), 310, 17))}</text>
  ${sectors
    .map(([label, value], i) => {
      const x = 16 + i * 124;
      return `${minis(x, SECTORS[i], r.lang.color)}<text x="${x}" y="100" font-size="9" fill="#9a9aae" letter-spacing="1">${label}</text><text x="${x}" y="118" font-size="15" fill="${SECTORS[i]}">${esc(value)}</text>`;
    })
    .join("")}
  <path d="M16 126H384" stroke="#2c2c3a"/>
  <text x="16" y="140" font-size="9" fill="#f5c518">RACE CONTROL</text>
  <text x="96" y="140" font-size="9" font-weight="400" fill="#c8c8d8">${esc(fit(r.description.toUpperCase(), 288, 9))}</text>
</g>`,
  );
};
