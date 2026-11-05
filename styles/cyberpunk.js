import { FONT, MONO, esc, fit, lines, svg, wrap } from "../card.js";

export const about = "Cyberpunk HUD: cut corners, yellow and cyan on near-black, data readouts and a sweeping scan line.";

const Y = "#fcee0a";
const C = "#00f0ff";

// A heads-up display panel: cut corners, grid, corner brackets, a readout column and a scan line sweeping down.
export default (r) => {
  const bars = Math.min(14, Math.ceil(Math.log2(r.starCount + 1)));
  const readout = (y, k, v, size = 15) =>
    `<text x="292" y="${y}" font-size="9" fill="${C}" letter-spacing="2">${k}</text><text x="384" y="${y + 17}" font-size="${size}" font-weight="700" fill="${Y}" text-anchor="end">${esc(v)}</text>`;
  return svg(
    r.name,
    `<defs>
  <clipPath id="cut"><path d="M0 0H374L400 26V150H26L0 124Z"/></clipPath>
  <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="${C}" stroke-opacity=".08"/></pattern>
  <linearGradient id="scan" x2="0" y2="1"><stop offset="0" stop-color="${C}" stop-opacity="0"/><stop offset="1" stop-color="${C}" stop-opacity=".3"/></linearGradient>
</defs>
<g clip-path="url(#cut)">
  <rect width="400" height="150" fill="#0a0a10"/>
  <rect width="400" height="150" fill="url(#grid)"/>
  <rect y="-30" width="400" height="30" fill="url(#scan)"><animate attributeName="y" values="-30;150" dur="3.5s" repeatCount="indefinite"/></rect>
</g>
<path d="M1 1H373.6L399 26.4V149H26.4L1 123.6Z" fill="none" stroke="${Y}" stroke-width="1.5"/>
<path d="M8 22V8H22M392 128V142H378" fill="none" stroke="${C}" stroke-width="2"/>
<path d="M278 30V128" stroke="${C}" stroke-opacity=".4" stroke-dasharray="2 3"/>
<rect x="22" y="20" width="4" height="12" fill="${r.lang.color}"/>
<g font-family="${MONO}">
  <text x="32" y="30" font-size="10" fill="${C}" letter-spacing="1">// NODE ${esc(fit(r.owner.toUpperCase(), 150, 10))}</text>
  <text font-size="10.5" fill="#b8c4d6">${lines(wrap(r.description, 39), 22, 76, 15)}</text>
  ${readout(36, "STARS", r.stars)}${readout(66, "FORKS", r.forks)}${readout(96, "LANG", fit(r.lang.name.toUpperCase(), 92, 12), 12)}
  <text x="22" y="128" font-size="9" fill="${C}" letter-spacing="2">SIG</text>
  ${Array.from({ length: 14 }, (_, i) => `<rect x="${48 + i * 9}" y="120" width="6" height="8" fill="${i < bars ? Y : "#2a2a36"}"/>`).join("")}
</g>
<text x="22" y="56" font-family="${FONT}" font-size="20" font-weight="800" font-style="italic" fill="${Y}" letter-spacing=".5">${esc(fit(r.name.toUpperCase(), 248, 20, 0.66))}</text>`,
  );
};
