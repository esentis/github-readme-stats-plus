import { FONT, esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "De Stijl grid: thick black lines, red, yellow and blue blocks, one block in the language colour.";

// A Mondrian-style composition: blocks first, then the thick black lines on top.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#111" : "#fff";
  const block = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  return svg(
    r.name,
    `<rect width="400" height="150" fill="#f5f2ea"/>
${block(0, 0, 84, 88, "#d4262c")}${block(316, 0, 84, 36, "#1f4fa3")}${block(316, 36, 84, 70, r.lang.color)}${block(236, 106, 164, 44, "#f2c419")}${block(316, 106, 84, 44, "#f5f2ea")}
<path d="M84 0V150M316 0V150M0 88H84M84 106H400M316 36H400M236 106V150M316 106V150" stroke="#111" stroke-width="7"/>
<rect x="3" y="3" width="394" height="144" fill="none" stroke="#111" stroke-width="6"/>
<g font-family="${FONT}" fill="#111">
  <text x="100" y="28" font-size="10" font-weight="600" letter-spacing="1.5" fill="#6b6b6b">${esc(fit(r.owner.toUpperCase(), 196, 10, 0.75))}</text>
  <text x="100" y="51" font-size="20" font-weight="800">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="11.5" fill="#333">${lines(wrap(r.description, 33), 100, 72, 15)}</text>
  <text x="42" y="113" font-size="14" text-anchor="middle">★</text>
  <text x="42" y="136" font-size="19" font-weight="800" text-anchor="middle">${esc(r.stars)}</text>
  <text x="100" y="133" font-size="13" font-weight="700">⑂ ${esc(r.forks)} <tspan font-weight="400">forks</tspan></text>
  <text x="358" y="76" font-size="11" font-weight="700" fill="${ink}" text-anchor="middle">${esc(fit(r.lang.name, 70, 11))}</text>
</g>`,
  );
};
