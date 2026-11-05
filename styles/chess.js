import { FONT, MONO, esc, fit, lines, motion, row, stats, svg, wrap, rng } from "../card.js";

export const about = "Chessboard corner with geometric pieces in a position seeded from the name, the last move highlighted in the language colour, an arrow sketching the reply and an algebraic caption.";

// Simple piece silhouettes standing on y = 0, about 23 units tall.
const PIECES = {
  K: '<path d="M-7.5 0h15v-3.5h-2l1.5-8c.5-3-2-5-5-4l-2 1-2-1c-3-1-5.5 1-5 4l1.5 8h-2zM-1-15.5v-2.5h-3v-2h3v-3h2v3h3v2h-3v2.5z"/>',
  Q: '<path d="M-7.5 0h15v-3.5h-1.5l3-13-5.5 6-1.5-9-2 9-2-9-1.5 9-5.5-6 3 13h-1.5z"/>',
  R: '<path d="M-7.5 0h15v-3.5h-2.5l-1-9.5h2v-5.5h-2.6v2.5h-2.2v-2.5h-2.4v2.5h-2.2v-2.5h-2.6v5.5h2l-1 9.5h-2.5z"/>',
  B: '<path d="M-7.5 0h15v-3.5h-4.5l2-3.5c2.5-4.5 0-9-5-12.5-5 3.5-7.5 8-5 12.5l2 3.5h-4.5z"/><circle cy="-21" r="2"/>',
  N: '<path d="M-6 0H7V-3H5C5-9 6-14 2-18L1-21-1-18.5C-4-18-7-14-8-10L-6-8-2-10C-3-7-5-5-5-3H-6Z"/>',
  P: '<path d="M-7 0h14l-1.5-3.5h-11zM-3.5-3.5h7l-1.5-7h-4z"/><circle cy="-13.5" r="4"/>',
};
const S = 28, X = 26, Y = 8;
const centre = (s) => [X + (s % 4) * S + S / 2, Y + Math.floor(s / 4) * S + S / 2];
const square = (s) => "abcd"[s % 4] + (4 - Math.floor(s / 4));

// A walnut table with the bottom-left corner of a board; white just moved, black's idea is drawn as an arrow.
export default (r) => {
  const rnd = rng(r.name);
  const sq = [...Array(16).keys()];
  for (let i = 15; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [sq[i], sq[j]] = [sq[j], sq[i]];
  }
  const set = [["K", 1], ["K", 0], ["QRBN"[Math.floor(rnd() * 4)], 1], ["P", 1], ["RNBQ"[Math.floor(rnd() * 4)], 0], ["P", 0]];
  const board = sq.map((s) => `<rect x="${X + (s % 4) * S}" y="${Y + Math.floor(s / 4) * S}" width="${S}" height="${S}" fill="${(s + Math.floor(s / 4)) % 2 ? "#b5875a" : "#eed9b5"}"/>`).join("");
  const men = set
    .map(([p, white], k) => {
      const [x, y] = centre(sq[k]);
      return `<g transform="translate(${x} ${y + 12})" fill="${white ? "#fbf7ee" : "#211a15"}" stroke="${white ? "#2b2118" : "#e9dcc6"}" stroke-width="${white ? 1.1 : 0.8}" stroke-linejoin="round">${PIECES[p]}</g>`;
    })
    .join("");
  const [[ax, ay], [bx, by]] = [centre(sq[4]), centre(sq[7])];
  const d = Math.hypot(bx - ax, by - ay);
  const [ex, ey] = [bx - ((bx - ax) / d) * 7, by - ((by - ay) / d) * 7];
  const move = `${1 + Math.floor(rnd() * 40)}. ${set[2][0]}${square(sq[2])}`;
  const hl = (s) => `<rect x="${X + (s % 4) * S}" y="${Y + Math.floor(s / 4) * S}" width="${S}" height="${S}" fill="${r.lang.color}" fill-opacity=".5"/>`;
  return svg(
    r.name,
    `<defs><marker id="ch-head" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path d="M0 0L10 5 0 10z" fill="${r.lang.color}"/></marker></defs>
${motion(`.ch-arrow{stroke-dasharray:100;animation:ch-arrow 6s ease-in-out infinite}
@keyframes ch-arrow{0%,40%{stroke-dashoffset:0;opacity:.85}50%{stroke-dashoffset:0;opacity:0}51%{stroke-dashoffset:100;opacity:0}56%{opacity:.85}90%,100%{stroke-dashoffset:0;opacity:.85}}`)}
<rect width="400" height="150" rx="12" fill="#2a211b"/>
<rect x="${X - 3}" y="${Y - 3}" width="${4 * S + 6}" height="${4 * S + 6}" rx="2" fill="#4a382b"/>
${board}${hl(sq[6])}${hl(sq[2])}
${men}
<path class="ch-arrow" d="M${ax} ${ay}L${ex.toFixed(1)} ${ey.toFixed(1)}" pathLength="100" stroke="${r.lang.color}" stroke-width="4.5" stroke-linecap="round" marker-end="url(#ch-head)" opacity=".85"/>
<g font-family="${FONT}" font-size="9" fill="#bba88f" text-anchor="middle">
  ${[0, 1, 2, 3].map((i) => `<text x="${X + i * S + S / 2}" y="135">${"abcd"[i]}</text><text x="${X - 11}" y="${Y + i * S + S / 2 + 3}">${4 - i}</text>`).join("")}
</g>
<g font-family="${FONT}">
  <text x="156" y="30" font-size="9.5" font-weight="700" letter-spacing="2" fill="#bba88f">${esc(fit(`BLACK TO MOVE · ${r.lang.name.toUpperCase()}`, 226, 9.5, 0.8))}</text>
  <text x="156" y="54" font-size="18" font-weight="700" fill="#f3e9d8">${esc(fit(r.name, 228, 18))}</text>
  <text font-size="11" fill="#cbbba3">${lines(wrap(r.description, 35), 156, 74, 14)}</text>
  <text x="156" y="113" font-family="${MONO}" font-size="13" font-weight="700" fill="#f3e9d8">${esc(move)}<tspan fill="${r.lang.color}">!</tspan></text>
  ${row(stats(r, { cy: 131, size: 12, text: 'fill="#f3e9d8" font-weight="600"', icon: 'fill="#bba88f"' }).slice(1), 156, 14)}
</g>`,
  );
};
