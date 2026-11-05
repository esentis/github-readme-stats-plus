import { FONT, esc, fit, lines, motion, row, stats, svg, wrap, rng } from "../card.js";

export const about = "Sudoku puzzle seeded from the name and stars: givens, pencil marks, every cell with the star count's leading digit lit in the language colour and a pulsing selected cell.";

const S = 14, X = 14, Y = 12;

// A valid 9×9 grid on the left (pattern solution with shuffled bands, rows, columns and digits), puzzle details on the right.
export default (r) => {
  const rnd = rng(r.name + r.starCount);
  const perm = (n) => {
    const a = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const digits = perm(9);
  const order = () => perm(3).flatMap((band) => perm(3).map((k) => band * 3 + k));
  const [rows, cols] = [order(), order()];
  const sol = (y, x) => digits[(rows[y] * 3 + Math.floor(rows[y] / 3) + cols[x]) % 9] + 1;
  const hi = +(String(r.starCount).match(/[1-9]/)?.[0] ?? 1);
  const state = Array.from({ length: 81 }, () => (rnd() < 0.42 ? "given" : rnd() < 0.12 ? "pen" : rnd() < 0.4 ? "pencil" : ""));
  let sel = Math.floor(rnd() * 81);
  while (state[sel] === "given" || state[sel] === "pen") sel = (sel + 1) % 81;
  const [sy, sx] = [Math.floor(sel / 9), sel % 9];
  const cell = (y, x, attrs) => `<rect x="${X + x * S}" y="${Y + y * S}" width="${S}" height="${S}" ${attrs}/>`;
  const marks = state
    .map((st, i) => {
      const [y, x] = [Math.floor(i / 9), i % 9];
      const [cx, cy] = [X + x * S + S / 2, Y + y * S + S / 2];
      const v = sol(y, x);
      if (st === "given") return (v === hi ? cell(y, x, `fill="${r.lang.color}" fill-opacity=".38"`) : "") + `<text x="${cx}" y="${cy + 3.6}" font-size="10" font-weight="700" fill="#0f172a">${v}</text>`;
      if (st === "pen") return `<text x="${cx}" y="${cy + 3.6}" font-size="10" fill="#2563eb">${v}</text>`;
      if (st !== "pencil") return "";
      const cand = [...new Set([v, 1 + Math.floor(rnd() * 9), 1 + Math.floor(rnd() * 9)])];
      return cand.map((d) => `<text x="${cx + (((d - 1) % 3) - 1) * 4.2}" y="${cy + (Math.floor((d - 1) / 3) - 1) * 4.2 + 1.7}" font-size="4.6" fill="#64748b">${d}</text>`).join("");
    })
    .join("");
  const grid = Array.from({ length: 10 }, (_, i) => `<path d="M${X + i * S} ${Y}v${9 * S}M${X} ${Y + i * S}h${9 * S}" stroke="${i % 3 ? "#cbd5e1" : "#334155"}" stroke-width="${i % 3 ? 0.6 : 1.6}"/>`);
  const level = ["EASY", "MEDIUM", "HARD", "EXPERT"][Math.min(3, Math.floor(Math.log10(r.starCount + 1)))];
  return svg(
    r.name,
    `${motion(`.sd-sel{animation:sd-sel 2.4s ease-in-out infinite}@keyframes sd-sel{50%{fill-opacity:.2}}`)}
<rect width="400" height="150" rx="12" fill="#eef2f7"/>
<rect x="${X - 2}" y="${Y - 2}" width="${9 * S + 4}" height="${9 * S + 4}" rx="3" fill="#fff" stroke="#cbd5e1"/>
<rect x="${X}" y="${Y + sy * S}" width="${9 * S}" height="${S}" fill="#e2e8f0"/><rect x="${X + sx * S}" y="${Y}" width="${S}" height="${9 * S}" fill="#e2e8f0"/>
<rect x="${X + Math.floor(sx / 3) * 3 * S}" y="${Y + Math.floor(sy / 3) * 3 * S}" width="${3 * S}" height="${3 * S}" fill="#e2e8f0"/>
${cell(sy, sx, `class="sd-sel" fill="${r.lang.color}" fill-opacity=".55"`)}
<g font-family="${FONT}" text-anchor="middle">${marks}</g>
${grid.filter((_, i) => i % 3).join("")}${grid.filter((_, i) => !(i % 3)).join("")}
<g font-family="${FONT}">
  <text x="158" y="30" font-size="10" font-weight="700" letter-spacing="2" fill="#64748b">${esc(fit(`SUDOKU · ${level} · No.${r.starCount}`, 226, 10, 0.75))}</text>
  <text x="158" y="54" font-size="19" font-weight="700" fill="#0f172a">${esc(fit(r.name, 228, 19))}</text>
  <text font-size="11.5" fill="#475569">${lines(wrap(r.description, 33), 158, 75, 15)}</text>
  ${row(stats(r, { cy: 126, size: 12, text: 'fill="#0f172a" font-weight="600"', icon: 'fill="#64748b"' }), 158, 14)}
</g>`,
  );
};
