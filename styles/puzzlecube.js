import { FONT, MONO, esc, fit, lines, motion, row, stats, svg, wrap, rng } from "../card.js";

export const about = "Isometric 3×3 puzzle cube scrambled from the repo name, the language colour as the top centre, a scramble sequence and a passing glint.";

const COLORS = ["#f8fafc", "#facc15", "#ef4444", "#f97316", "#2563eb", "#16a34a"];
const U = [13, 7.5], V = [-13, 7.5], W = [0, 15], P = [78, 28];
const at = (o, a, i, b, j) => [o[0] + a[0] * i + b[0] * j, o[1] + a[1] * i + b[1] * j];
const pts = (o, a, b, corners) => corners.map(([i, j]) => at(o, a, i, b, j).map((n) => n.toFixed(1)).join(",")).join(" ");

// One 3×3 face on the plane spanned by a and b from corner o, stickers inset, then a shade for its side.
const face = (o, a, b, fills, shade) =>
  fills
    .map((f, n) => {
      const [i, j] = [n % 3, Math.floor(n / 3)];
      const q = [[0.1, 0.1], [0.9, 0.1], [0.9, 0.9], [0.1, 0.9]].map(([p, s]) => [i + p, j + s]);
      return `<polygon points="${pts(o, a, b, q)}" fill="${f}" stroke="${f}" stroke-width="1.5" stroke-linejoin="round"/>`;
    })
    .join("") + (shade ? `<polygon points="${pts(o, a, b, [[0, 0], [3, 0], [3, 3], [0, 3]])}" fill="#000" fill-opacity="${shade}"/>` : "");

// A floating puzzle cube on warm paper, details and the scramble to its right.
export default (r) => {
  const rnd = rng(r.name);
  const stickers = () => Array.from({ length: 9 }, () => COLORS[Math.floor(rnd() * 6)]);
  const top = stickers();
  top[4] = r.lang.color;
  const moves = [];
  while (moves.length < 9) {
    const f = "RLUDFB"[Math.floor(rnd() * 6)];
    if (moves.at(-1)?.[0] !== f) moves.push(f + ["", "'", "2"][Math.floor(rnd() * 3)]);
  }
  const hull = `78,28 117,50.5 117,95.5 78,118 39,95.5 39,50.5`;
  return svg(
    r.name,
    `<defs>
  <radialGradient id="pc-bg" cx=".2" cy=".5" r=".7"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#ece7dc"/></radialGradient>
  <clipPath id="pc-hull"><polygon points="${hull}"/></clipPath>
</defs>
${motion(`.pc-bob{animation:pc-bob 4s ease-in-out infinite}@keyframes pc-bob{50%{transform:translateY(-3px)}}
.pc-shine{animation:pc-shine 6s ease-in-out infinite}@keyframes pc-shine{0%{transform:translateX(0)}35%,100%{transform:translateX(150px)}}`)}
<rect width="400" height="150" rx="12" fill="url(#pc-bg)"/>
<ellipse cx="78" cy="133" rx="34" ry="5" fill="#000" fill-opacity=".12"/>
<g class="pc-bob">
  <polygon points="${hull}" fill="#151515" stroke="#151515" stroke-width="3" stroke-linejoin="round"/>
  ${face(P, U, V, top, 0)}
  ${face(at(P, V, 3, U, 0), U, W, stickers(), 0.12)}
  ${face(at(P, U, 3, V, 0), V, W, stickers(), 0.28)}
  <g clip-path="url(#pc-hull)"><path class="pc-shine" d="M10 20h14l-34 110h-14z" fill="#fff" fill-opacity=".4"/></g>
</g>
<g font-family="${FONT}">
  <circle cx="152" cy="27" r="4" fill="${r.lang.color}" stroke="#000" stroke-opacity=".2"/>
  <text x="161" y="31" font-size="10" font-weight="600" letter-spacing="1.5" fill="#6b7280">${esc(fit(r.lang.name.toUpperCase(), 210, 10, 0.75))}</text>
  <text x="148" y="56" font-size="19" font-weight="700" fill="#1f2937">${esc(fit(r.name, 236, 19))}</text>
  <text font-size="11.5" fill="#4b5563">${lines(wrap(r.description, 34), 148, 76, 15)}</text>
  <text x="148" y="113" font-family="${MONO}" font-size="10.5" fill="#6b7280">${esc(moves.join(" "))}</text>
  ${row(stats(r, { cy: 131, size: 12, text: 'fill="#1f2937" font-weight="600"', icon: 'fill="#6b7280"' }).slice(1), 148, 14)}
</g>`,
  );
};
