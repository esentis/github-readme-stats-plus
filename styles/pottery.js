// Pottery studio: a terracotta pot spinning on a potter's wheel beside a glazed tile carrying the name.
import { FONT, esc, fit, isLight, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Pottery studio: a terracotta pot spinning on a potter's wheel with its rim highlight circling, the name glazed on a tile in the language colour.";

const POT = "M55 40C57 44 60 46 59 51C58 58 40 66 41 88C42 104 50 114 54 118H96C100 114 108 104 109 88C110 66 92 58 91 51C90 46 93 44 95 40Z";

export default (r) => {
  const c = r.lang.color;
  const ink = isLight(c) ? "#2a160d" : "#fff6ea";
  // Clay grog speckles on a 40px repeat, slid sideways to read as the pot turning.
  const grog = Array.from({ length: 4 }, (_, k) =>
    [[6, 58], [18, 75], [31, 64], [11, 97], [25, 108], [36, 88], [4, 81], [22, 52]].map(([x, y]) => `<circle cx="${x + k * 40}" cy="${y}" r="${x % 3 ? 0.9 : 0.6}"/>`).join(""),
  ).join("");
  return svg(
    r.name,
    `${motion(".pt-grog{animation:pt-grog 1.6s linear infinite}.pt-rim{animation:pt-rim 1.6s linear infinite}.pt-head{animation:pt-head .8s linear infinite}@keyframes pt-grog{to{transform:translateX(40px)}}@keyframes pt-rim{to{stroke-dashoffset:-100}}@keyframes pt-head{to{stroke-dashoffset:-12.5}}")}
<defs>
  <linearGradient id="pt-bg" x2="0" y2="1"><stop offset="0" stop-color="#3a271e"/><stop offset="1" stop-color="#271a14"/></linearGradient>
  <linearGradient id="pt-clay"><stop offset="0" stop-color="#7a3519"/><stop offset=".32" stop-color="#d27548"/><stop offset=".45" stop-color="#e3925f"/><stop offset=".7" stop-color="#b65a33"/><stop offset="1" stop-color="#6e2f16"/></linearGradient>
  <linearGradient id="pt-steel"><stop offset="0" stop-color="#5d5853"/><stop offset=".4" stop-color="#a39c94"/><stop offset="1" stop-color="#4c4743"/></linearGradient>
  <linearGradient id="pt-glaze" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
  <radialGradient id="pt-lamp" cx=".2" cy=".1" r=".9"><stop offset="0" stop-color="#ffb47a" stop-opacity=".16"/><stop offset="1" stop-color="#ffb47a" stop-opacity="0"/></radialGradient>
  <clipPath id="pt-pot"><path d="${POT}"/></clipPath>
</defs>
<rect width="400" height="150" rx="12" fill="url(#pt-bg)"/><rect width="400" height="150" rx="12" fill="url(#pt-lamp)"/>
<ellipse cx="75" cy="125" rx="68" ry="15" fill="#1a110d"/><ellipse cx="75" cy="122" rx="66" ry="13" fill="#4a3022"/>
<path d="M25 119V124A50 9 0 0 0 125 124V119Z" fill="#45403c"/><ellipse cx="75" cy="119" rx="50" ry="9" fill="url(#pt-steel)"/>
<ellipse class="pt-head" cx="75" cy="119" rx="40" ry="6.5" fill="none" stroke="#d7d0c8" stroke-opacity=".5" pathLength="100" stroke-dasharray="4 8.5"/>
<path d="${POT}" fill="url(#pt-clay)"/>
<g clip-path="url(#pt-pot)">
  <g transform="translate(-40 0)"><g class="pt-grog" fill="#5a2410" fill-opacity=".45">${grog}</g></g>
  <g fill="none" stroke="#5a2410" stroke-opacity=".2">${[58, 66, 74, 82, 90, 98, 106, 113].map((y) => `<path d="M30 ${y}Q75 ${y + 3} 120 ${y}"/>`).join("")}</g>
  <rect x="58" y="40" width="6" height="80" fill="#fff" fill-opacity=".1"/>
</g>
<ellipse cx="75" cy="40" rx="20" ry="4.5" fill="#4a1d0c" stroke="#e8a274" stroke-width="1.6"/>
<ellipse class="pt-rim" cx="75" cy="40" rx="20" ry="4.5" fill="none" stroke="#ffe3c8" stroke-width="1.8" stroke-linecap="round" pathLength="100" stroke-dasharray="16 84"/>
<g><rect x="162" y="19" width="226" height="52" rx="7" fill="#b0603c"/>
  <rect x="164.5" y="21.5" width="221" height="47" rx="5.5" fill="${c}"/><rect x="164.5" y="21.5" width="221" height="47" rx="5.5" fill="url(#pt-glaze)" stroke="#fff" stroke-opacity=".3"/>
  <path d="M180 24.5H300" stroke="#fff" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>
</g>
<g font-family="${FONT}">
  <text x="176" y="37" font-size="8.5" font-weight="700" letter-spacing="1.5" fill="${ink}" fill-opacity=".7">${esc(fit(`THROWN BY ${r.owner.toUpperCase()}`, 196, 8.5, 0.78))}</text>
  <text x="176" y="58" font-size="17" font-weight="800" fill="${ink}">${esc(fit(r.name, 198, 17))}</text>
  <text font-size="11.5" fill="#ead7c4">${lines(wrap(r.description, 35), 164, 92, 15)}</text>
  ${row(stats(r, { cy: 128, size: 12, text: 'fill="#f3e3d0" font-weight="600"', icon: 'fill="#d08a5f"' }), 164, 14)}
</g>`,
  );
};
