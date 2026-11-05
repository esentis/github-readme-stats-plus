import { esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Gothic manuscript: parchment in a dark frame, an illuminated drop cap in the language colour, blackletter heading.";

const GOTHIC = "'Old English Text MT', UnifrakturMaguntia, 'Goudy Text', Georgia, serif";
const BOOK = "'Iowan Old Style', Palatino, 'Palatino Linotype', Georgia, serif";
const RUBRIC = "#9b1c1c";

// Gothic manuscript page: the repo name's first letter becomes an illuminated drop cap.
export default (r) => {
  const [cap = "", ...rest] = [...r.name];
  const ink = isLight(r.lang.color) ? "#2a1b10" : "#f6ecd2";
  const size = r.name.length > 18 ? 20 : 27;
  return svg(
    r.name,
    `<defs><radialGradient id="parch" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#f1e4c3"/><stop offset="1" stop-color="#c9ad7a"/></radialGradient></defs>
<rect width="400" height="150" rx="6" fill="#1c1411"/>
<rect x="7" y="7" width="386" height="136" rx="2" fill="url(#parch)"/>
<rect x="12.5" y="12.5" width="375" height="125" fill="none" stroke="#3a2516" stroke-width="1.2"/>
<rect x="15.5" y="15.5" width="369" height="119" fill="none" stroke="${RUBRIC}" stroke-width=".6"/>
${[[200, 12.5], [200, 137.5], [12.5, 75], [387.5, 75]].map(([x, y]) => `<rect x="${x - 3.5}" y="${y - 3.5}" width="7" height="7" fill="${RUBRIC}" transform="rotate(45 ${x} ${y})"/>`).join("")}
<rect x="26" y="24" width="44" height="44" fill="${r.lang.color}" stroke="#3a2516" stroke-width="1.5"/>
<rect x="29.5" y="27.5" width="37" height="37" fill="none" stroke="#d6b25e" stroke-width="1"/>
<text x="48" y="58" font-family="${GOTHIC}" font-size="34" fill="${ink}" text-anchor="middle">${esc(cap.toUpperCase())}</text>
<text x="80" y="54" font-family="${GOTHIC}" font-size="${size}" fill="#2a1b10">${esc(fit(rest.join(""), 290, size, 0.55))}</text>
<path d="M80 66H372" stroke="#3a2516" stroke-width=".8"/>
<g font-family="${BOOK}">
  <text font-size="12" font-style="italic" fill="#3d2b1c">${lines(wrap(r.description, 54), 28, 88, 15)}</text>
  <text x="28" y="126" font-size="10.5" letter-spacing="1.5" fill="${RUBRIC}">${esc(fit(r.lang.name.toUpperCase(), 120, 10.5, 0.8))}  ◆  ★ ${esc(r.stars)}  ◆  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
