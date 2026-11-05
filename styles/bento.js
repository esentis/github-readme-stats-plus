import { FONT, esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Bento grid of rounded tiles: name, a big star count, forks, language and description.";

const tile = (x, y, w, h, fill = "#1c1c23") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}"/>`;

// Bento-box grid: a tile per fact, sized by importance, the language tile filled with its colour.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#111" : "#fff";
  return svg(
    r.name,
    `<rect width="400" height="150" rx="16" fill="#0d0d11"/>
${tile(8, 8, 240, 64)}${tile(254, 8, 138, 64)}${tile(8, 78, 180, 64)}${tile(194, 78, 110, 64, r.lang.color)}${tile(310, 78, 82, 64)}
<rect x="254" y="8" width="138" height="64" rx="12" fill="${r.lang.color}" fill-opacity=".18"/>
<g font-family="${FONT}">
  <g font-size="9" font-weight="700" letter-spacing="1.2" fill="#8b8b99">
    <text x="22" y="28">${esc(fit(r.owner.toUpperCase(), 200, 9, 0.75))}</text><text x="268" y="28">STARS</text><text x="324" y="96">FORKS</text><text x="22" y="96">ABOUT</text>
    <text x="208" y="96" fill="${ink}" fill-opacity=".7">LANGUAGE</text>
  </g>
  <text x="22" y="56" font-size="19" font-weight="700" fill="#fff">${esc(fit(r.name, 212, 19))}</text>
  <text x="268" y="61" font-size="30" font-weight="800" fill="#fff">${esc(r.stars)}</text>
  <text x="378" y="61" font-size="22" fill="${r.lang.color}" text-anchor="end">★</text>
  <text x="208" y="126" font-size="14" font-weight="700" fill="${ink}">${esc(fit(r.lang.name, 84, 14))}</text>
  <text x="324" y="128" font-size="24" font-weight="800" fill="#fff">${esc(r.forks)}</text>
  <text font-size="11" fill="#c4c4d0">${lines(wrap(r.description, 27, 3), 22, 110, 13)}</text>
</g>`,
  );
};
