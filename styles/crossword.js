import { MONO, esc, fit, lines, motion, svg, textWidth, wrap, rng } from "../card.js";

export const about = "Newspaper crossword: the repo name filled in across, the language crossing it down when they share a letter, the description as the clue and a cursor stepping along the word.";

const SERIF = "Georgia, 'Times New Roman', serif";
const C = 12, R = 6, S = 17, X = 16, Y = 38, ROW = 2;
const clean = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

// Newsprint: grid on the left with seeded black squares, clues on the right.
export default (r) => {
  const rnd = rng(r.name);
  const ans = (clean(r.name) || "REPO").slice(0, C);
  const lang = clean(r.lang.name);
  // null is a black square, "" an empty white one, a letter a filled one.
  const grid = Array.from({ length: R }, (_, y) => Array.from({ length: C }, (_, x) => (y === ROW ? (x < ans.length ? ans[x] : x === ans.length ? null : "") : rnd() < 0.24 ? null : "")));
  let down;
  for (let x = 0; x < ans.length && !down; x++)
    for (let k = 0; k < lang.length && !down; k++) if (ans[x] === lang[k] && ROW - k >= 0 && ROW - k + lang.length <= R) down = { x, y: ROW - k };
  if (down) {
    [...lang].forEach((ch, i) => (grid[down.y + i][down.x] = ch));
    if (down.y > 0) grid[down.y - 1][down.x] = null;
    if (down.y + lang.length < R) grid[down.y + lang.length][down.x] = null;
  }
  const white = (y, x) => typeof grid[y]?.[x] === "string";
  let n = 0;
  const num = grid.map((row, y) => row.map((_, x) => (white(y, x) && ((!white(y, x - 1) && white(y, x + 1)) || (!white(y - 1, x) && white(y + 1, x))) ? ++n : 0)));
  const cells = grid
    .flatMap((row, y) =>
      row.map((v, x) => {
        const [px, py] = [X + x * S, Y + y * S];
        if (v === null) return `<rect x="${px}" y="${py}" width="${S}" height="${S}" fill="#1c1c1c"/>`;
        const tint = down && x === down.x && y !== ROW ? `<rect x="${px}" y="${py}" width="${S}" height="${S}" fill="${r.lang.color}" fill-opacity=".3"/>` : "";
        return `${tint}${num[y][x] ? `<text x="${px + 1.5}" y="${py + 6.5}" font-size="5.5">${num[y][x]}</text>` : ""}${v ? `<text x="${px + S / 2}" y="${py + 13.5}" font-size="11.5" font-weight="700" text-anchor="middle">${esc(v)}</text>` : ""}`;
      }),
    )
    .join("");
  const score = `★ ${r.stars}  ⑂ ${r.forks}`;
  const downClue = down ? `${num[down.y][down.x]}. Its language (${lang.length})` : `Language: ${r.lang.name}`;
  return svg(
    r.name,
    `${motion(`.cw-cur{animation:cw-cur ${Math.max(2, ans.length * 0.6).toFixed(1)}s steps(${ans.length}) infinite}@keyframes cw-cur{to{transform:translateX(${ans.length * S}px)}}`)}
<rect width="400" height="150" rx="10" fill="#fbf8f1"/>
<g font-family="${SERIF}" fill="#1c1c1c">
  <text x="16" y="24" font-size="15" font-weight="700">${esc(fit(r.name, 352 - textWidth(score, 11), 15, 0.56))}</text>
  <text x="384" y="24" font-family="${MONO}" font-size="11" text-anchor="end">${esc(score)}</text>
  <path d="M16 29.5H384" stroke="#1c1c1c" stroke-width="1.5"/><path d="M16 32.5H384" stroke="#1c1c1c" stroke-width=".5"/>
  <rect x="${X}" y="${Y}" width="${C * S}" height="${R * S}" fill="#fff"/>
  <rect x="${X}" y="${Y + ROW * S}" width="${ans.length * S}" height="${S}" fill="#cfe3ff"/>
  <rect class="cw-cur" x="${X}" y="${Y + ROW * S}" width="${S}" height="${S}" fill="#ffd84a"/>
  ${cells}
  <path d="${Array.from({ length: C + 1 }, (_, i) => `M${X + i * S} ${Y}v${R * S}`).join("")}${Array.from({ length: R + 1 }, (_, i) => `M${X} ${Y + i * S}h${C * S}`).join("")}" stroke="#1c1c1c" stroke-width=".8"/>
  <rect x="${X}" y="${Y}" width="${C * S}" height="${R * S}" fill="none" stroke="#1c1c1c" stroke-width="1.6"/>
  <text x="232" y="50" font-size="9.5" font-weight="700" letter-spacing="1.5">ACROSS</text>
  <text font-size="10.5">${lines(wrap(`${num[ROW][0] || 1}. ${r.description} (${clean(r.name).length || 4})`, 28, 3), 232, 64, 13)}</text>
  <text x="232" y="112" font-size="9.5" font-weight="700" letter-spacing="1.5">DOWN</text>
  <text x="232" y="126" font-size="10.5">${esc(fit(downClue, 152, 10.5, 0.5))}</text>
  <text x="232" y="140" font-size="9.5" font-style="italic" fill="#666">${esc(fit(`Set by ${r.owner}`, 152, 9.5, 0.5))}</text>
</g>`,
  );
};
