import { FONT, esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Two-colour print: the language colour, near-black ink and big halftone shapes.";

const INK = "#121212";

// Duotone poster: language-colour paper, ink halftone that grows to the right, a big ink disc holding the stars.
export default (r) => {
  const fg = isLight(r.lang.color) ? INK : "#fff";
  const name = r.name.toUpperCase();
  const size = name.length <= 12 ? 30 : name.length <= 18 ? 22 : 17;
  const bands = [1, 1.6, 2.2, 2.8, 3.4, 4];
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="10"/></clipPath>
  ${bands.map((d, i) => `<pattern id="h${i}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="5" cy="5" r="${d}" fill="${INK}"/></pattern>`).join("")}
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="${r.lang.color}"/>
  ${bands.map((_, i) => `<rect x="${214 + i * 31}" width="31" height="150" fill="url(#h${i})"/>`).join("")}
  <circle cx="336" cy="128" r="72" fill="${INK}"/>
  <circle cx="336" cy="128" r="84" fill="none" stroke="${INK}" stroke-width="4"/>
</g>
<g font-family="${FONT}" font-weight="800">
  <text x="22" y="30" font-size="10" letter-spacing="2.5" fill="${fg}" fill-opacity=".75">${esc(fit(r.owner.toUpperCase(), 220, 10, 1))}</text>
  <text x="22" y="${36 + size}" font-size="${size}" letter-spacing="-.5" fill="${fg}">${esc(fit(name, 260, size, 0.7))}</text>
  <rect x="22" y="${46 + size}" width="44" height="5" fill="${fg}"/>
  <text font-size="12" font-weight="600" fill="${fg}">${lines(wrap(r.description, 30), 22, 82 + size * 0.4, 15)}</text>
  <text x="22" y="134" font-size="11" letter-spacing="1.5" fill="${fg}">${esc(fit(r.lang.name.toUpperCase(), 130, 11, 0.8))}  ⑂ ${esc(r.forks)}</text>
  <text x="340" y="108" font-size="11" letter-spacing="2" fill="#fff" fill-opacity=".7" text-anchor="middle">STARS</text>
  <text x="340" y="136" font-size="26" fill="#fff" text-anchor="middle">★${esc(r.stars)}</text>
</g>`,
  );
};
