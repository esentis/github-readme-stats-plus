import { FONT, esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Terrazzo: speckled stone chips unique to each repo, a solid label panel and a round star chip.";

const CHIPS = ["#c97b63", "#7d9b8a", "#d9b26f", "#8c8fae", "#4a5050", "#e3a99c", "#a7b7b0"];

// Deterministic pseudo-random numbers from the repo name, so each repo keeps its own floor.
const rng = (s) => {
  let h = [...s].reduce((a, c) => Math.imul(a ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
  return () => (h = (Math.imul(h, 1103515245) + 12345) >>> 0) / 2 ** 32;
};

// Cream terrazzo floor of irregular chips with a solid label panel laid over it.
export default (r) => {
  const rand = rng(r.name);
  const chips = Array.from({ length: 90 }, (_, i) => {
    const [x, y, s] = [rand() * 400, rand() * 150, 1.5 + rand() * rand() * 11];
    const n = 5 + Math.floor(rand() * 3);
    const pts = Array.from({ length: n }, (_, k) => {
      const a = (k / n) * Math.PI * 2 + rand() * 0.7;
      const d = s * (0.55 + rand() * 0.5);
      return `${(x + Math.cos(a) * d).toFixed(1)},${(y + Math.sin(a) * d).toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="${i % 11 === 0 ? r.lang.color : CHIPS[Math.floor(rand() * CHIPS.length)]}"/>`;
  }).join("");
  const ink = isLight(r.lang.color) ? "#1f2222" : "#fff";
  return svg(
    r.name,
    `<defs><clipPath id="clip"><rect width="400" height="150" rx="10"/></clipPath></defs>
<g clip-path="url(#clip)"><rect width="400" height="150" fill="#ece5d8"/><g opacity=".85">${chips}</g></g>
<rect x="20" y="20" width="268" height="110" rx="3" fill="#000" fill-opacity=".12" transform="translate(2 3)"/>
<rect x="20" y="20" width="268" height="110" rx="3" fill="#fbf9f4"/>
<rect x="20" y="20" width="5" height="110" rx="2" fill="${r.lang.color}"/>
<circle cx="342" cy="75" r="36" fill="#fbf9f4"/>
<circle cx="342" cy="75" r="31" fill="${r.lang.color}"/>
<g font-family="${FONT}" fill="#1f2222">
  <text x="40" y="48" font-size="18" font-weight="700">${esc(fit(r.name, 234, 18))}</text>
  <text font-size="12" fill="#55595a">${lines(wrap(r.description, 37), 40, 70, 16)}</text>
  <text x="40" y="117" font-size="11" font-weight="600" letter-spacing="1" fill="#7a7e7e">${esc(fit(r.lang.name.toUpperCase(), 150, 11, 0.7))}  ·  ⑂ ${esc(r.forks)}</text>
  <text x="342" y="69" font-size="12" fill="${ink}" text-anchor="middle">★</text>
  <text x="342" y="88" font-size="${r.stars.length > 3 ? 14 : 18}" font-weight="700" fill="${ink}" text-anchor="middle">${esc(r.stars)}</text>
</g>`,
  );
};
