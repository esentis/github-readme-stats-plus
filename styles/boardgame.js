import { FONT, esc, fit, isLight, lines, motion, svg, wrap, rng } from "../card.js";

export const about = "Board game: a square track of property spaces with a hopping token in the language colour, dice from stars and forks, and a title-deed card with the repo details.";

const PAL = ["#8b5a2b", "#38bdf8", "#db2777", "#f97316", "#dc2626", "#eab308", "#16a34a", "#1d4ed8"];
const S = 18, X = 12, Y = 12;
// Track space t (0 = start at bottom right, clockwise) as [column, row] on the 7×7 rim.
const pos = (t) => (t <= 6 ? [6 - t, 6] : t <= 12 ? [0, 12 - t] : t <= 18 ? [t - 12, 0] : [6, t - 18]);
const PIPS = [[[0, 0]], [[-1, -1], [1, 1]], [[-1, -1], [0, 0], [1, 1]], [[-1, -1], [1, -1], [-1, 1], [1, 1]], [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]];
const die = (x, y, rot, n) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-9" y="-9" width="18" height="18" rx="4" fill="#fff" stroke="#1f2937"/>${PIPS[n - 1].map(([a, b]) => `<circle cx="${a * 4.5}" cy="${b * 4.5}" r="1.7" fill="#1f2937"/>`).join("")}</g>`;

// Cream board on a green table, the token on space (stars + forks) mod 24, a title deed beside it.
export default (r) => {
  const rnd = rng(r.name);
  const c = r.lang.color;
  const ink = isLight(c) ? "#111" : "#fff";
  const spaces = Array.from({ length: 24 }, (_, t) => {
    const [x, y] = pos(t).map((v, k) => (k ? Y : X) + v * S);
    const base = `<rect x="${x}" y="${y}" width="${S}" height="${S}" fill="${t % 6 ? "#fbf6e6" : "#efe4c2"}" stroke="#1f2937" stroke-width=".8"/>`;
    if (!(t % 6)) return base + (t ? "" : `<text x="${x + 9}" y="${y + 12}" font-size="7" font-weight="800" fill="#dc2626" text-anchor="middle">GO</text>`);
    if (rnd() < 0.2) return base + `<text x="${x + 9}" y="${y + 13}" font-size="10" font-weight="800" fill="#ea580c" text-anchor="middle">?</text>`;
    const band = [[x, y, S, 5], [x + S - 5, y, 5, S], [x, y + S - 5, S, 5], [x, y, 5, S]][Math.floor(t / 6)];
    return base + `<rect x="${band[0]}" y="${band[1]}" width="${band[2]}" height="${band[3]}" fill="${PAL[Math.floor(t / 3) % 8]}" stroke="#1f2937" stroke-width=".8"/>`;
  }).join("");
  const [tx, ty] = pos((r.starCount + r.forkCount) % 24).map((v, k) => (k ? Y : X) + v * S + S / 2);
  const [d1, d2] = [(r.starCount % 6) + 1, (r.forkCount % 6) + 1];
  const item = (y, label, value) => `<text x="168" y="${y}" font-size="8.5" letter-spacing="1.2" fill="#4b5563">${label}</text><text x="372" y="${y}" font-size="11" font-weight="700" text-anchor="end" fill="#111827">${esc(value)}</text>`;
  return svg(
    r.name,
    `${motion(`.bg-hop{animation:bg-hop 2.6s ease-in-out infinite}@keyframes bg-hop{0%,60%,100%{transform:translateY(0)}75%{transform:translateY(-5px)}85%{transform:translateY(0)}92%{transform:translateY(-1.5px)}}`)}
<rect width="400" height="150" rx="12" fill="#1e3a2f"/>
<rect x="10" y="10" width="130" height="130" rx="3" fill="#cfe8d5" stroke="#0f172a" stroke-width="1.5"/>
<g font-family="${FONT}">
  ${spaces}
  ${die(64, 70, -10, d1)}${die(87, 77, 12, d2)}
  <text x="75" y="106" font-size="8" font-weight="800" fill="#14532d" text-anchor="middle" letter-spacing="1">ROLL ${d1 + d2}</text>
</g>
<ellipse cx="${tx}" cy="${ty + 5}" rx="5" ry="1.8" fill="#000" fill-opacity=".3"/>
<g transform="translate(${tx} ${ty + 1})"><path class="bg-hop" d="M-5 4h10c0-4-2-6-3-8a3.5 3.5 0 1 0-4 0c-1 2-3 4-3 8z" fill="${c}" stroke="#111" stroke-width="1.1"/></g>
<rect x="152" y="10" width="236" height="130" rx="6" fill="#fffdf7"/>
<rect x="157" y="15" width="226" height="120" rx="2" fill="none" stroke="#1f2937" stroke-width=".8"/>
<rect x="160" y="18" width="220" height="34" fill="${c}"/>
<g font-family="${FONT}">
  <text x="270" y="29" font-size="7.5" font-weight="700" letter-spacing="2.5" fill="${ink}" text-anchor="middle">TITLE DEED</text>
  <text x="270" y="45" font-size="14" font-weight="800" fill="${ink}" text-anchor="middle">${esc(fit(r.name, 208, 14))}</text>
  ${item(68, "RENT", `★ ${r.stars}`)}${item(82, "EACH FORK", `⑂ ${r.forks}`)}${item(96, "DISTRICT", fit(r.lang.name, 110, 11))}
  <path d="M168 104H372" stroke="#1f2937" stroke-width=".6"/>
  <text font-size="10" font-style="italic" fill="#374151" text-anchor="middle">${lines(wrap(r.description, 34), 270, 118, 12)}</text>
</g>`,
  );
};
