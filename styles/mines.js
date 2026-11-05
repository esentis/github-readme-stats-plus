import { FONT, MONO, esc, fit, lines, motion, row, stats, svg, wrap, rng } from "../card.js";

export const about = "Mine-sweeper board seeded from the name: a flood-revealed field with numbered cells and waving flags, red LED counters for stars and forks around a star button.";

const NUM = ["", "#1d4ed8", "#15803d", "#dc2626", "#1e3a8a", "#7f1d1d", "#0e7490", "#111", "#6b7280"];
const C = 12, R = 6, S = 14, X = 18, Y = 52;
// A classic grey bevel: raised (out) or sunken.
const bevel = (x, y, w, h, out, sw = 2) =>
  `<path d="M${x} ${y + h}V${y}H${x + w}" fill="none" stroke="${out ? "#fff" : "#808080"}" stroke-width="${sw}"/><path d="M${x + w} ${y}V${y + h}H${x}" fill="none" stroke="${out ? "#808080" : "#fff"}" stroke-width="${sw}"/>`;
const led = (x, value) =>
  `<rect x="${x}" y="16" width="52" height="24" fill="#000"/><text x="${x + 49}" y="34" font-size="16" text-anchor="end" fill="#3b0a0a">${esc(value.replace(/[0-9]/g, "8"))}</text><text x="${x + 49}" y="34" font-size="16" text-anchor="end" fill="#ff1a1a">${esc(value)}</text>`;

// Grey window: counters and button over the board on the left, repo details on the right.
export default (r) => {
  const rnd = rng(r.name);
  const mine = Array(C * R).fill(false);
  for (let k = 0; k < 11; ) {
    const i = Math.floor(rnd() * C * R);
    if (!mine[i]) (mine[i] = true), k++;
  }
  const near = (i) => [-1, 0, 1].flatMap((dy) => [-1, 0, 1].map((dx) => [(i % C) + dx, Math.floor(i / C) + dy])).filter(([x, y]) => x >= 0 && y >= 0 && x < C && y < R).map(([x, y]) => y * C + x);
  const count = (i) => near(i).filter((j) => mine[j]).length;
  const open = new Set();
  const flood = (s) => {
    for (const todo = [s]; todo.length; ) {
      const i = todo.pop();
      if (open.has(i) || mine[i]) continue;
      open.add(i);
      if (!count(i)) todo.push(...near(i));
    }
  };
  const zeros = mine.flatMap((m, i) => (m || count(i) ? [] : [i]));
  zeros.forEach((z, k) => (k === 0 || rnd() < 0.3) && flood(z));
  const flags = mine.flatMap((m, i) => (m && near(i).some((j) => open.has(j)) ? [i] : [])).slice(0, 3);
  const cells = mine
    .map((_, i) => {
      const [x, y] = [X + (i % C) * S, Y + Math.floor(i / C) * S];
      if (open.has(i)) return `<rect x="${x}" y="${y}" width="${S}" height="${S}" fill="#bdbdbd" stroke="#8a8a8a" stroke-width=".5"/>${count(i) ? `<text x="${x + 7}" y="${y + 11}" fill="${NUM[count(i)]}">${count(i)}</text>` : ""}`;
      const flag = flags.includes(i) ? `<path d="M${x + 7.5} ${y + 2.5}V${y + 10.5}M${x + 3.5} ${y + 11}h8" stroke="#000" stroke-width="1.5"/><path class="${i === flags[0] ? "mn-flag" : ""}" d="M${x + 8} ${y + 2.5}L${x + 3} ${y + 5.2}L${x + 8} ${y + 7.8}Z" fill="#e00"/>` : "";
      return `<rect x="${x}" y="${y}" width="${S}" height="${S}" fill="#c6c6c6"/>${bevel(x + 1, y + 1, S - 2, S - 2, true, 1.5)}${flag}`;
    })
    .join("");
  return svg(
    r.name,
    `${motion(`.mn-flag{transform-box:fill-box;transform-origin:100% 50%;animation:mn-flag 2.4s ease-in-out infinite}@keyframes mn-flag{50%{transform:scaleX(.7) skewY(-6deg)}}`)}
<rect width="400" height="150" rx="4" fill="#c0c0c0"/>
${bevel(1.5, 1.5, 397, 147, true, 3)}
${bevel(12, 10, 182, 36, false)}
<g font-family="${MONO}" font-weight="700">${led(18, fit(r.stars.padStart(3, "0"), 50, 16))}${led(136, fit(r.forks.padStart(3, "0"), 50, 16))}</g>
<rect x="91" y="16" width="24" height="24" fill="#c0c0c0"/>${bevel(92, 17, 22, 22, true)}
<circle cx="103" cy="28" r="8" fill="#ffd400" stroke="#000" stroke-width=".8"/><text x="103" y="31.5" font-size="9" text-anchor="middle">★</text>
${bevel(16, 50, 172, 88, false)}
<g font-family="${MONO}" font-size="11" font-weight="700" text-anchor="middle">${cells}</g>
<g font-family="${FONT}">
  <circle cx="212" cy="26" r="4" fill="${r.lang.color}" stroke="#000" stroke-opacity=".3"/>
  <text x="221" y="30" font-size="10" font-weight="700" letter-spacing="1.5" fill="#505050">${esc(fit(r.lang.name.toUpperCase(), 160, 10, 0.75))}</text>
  <text x="208" y="54" font-size="17" font-weight="700" fill="#000">${esc(fit(r.name, 180, 17))}</text>
  <text x="208" y="70" font-size="10.5" fill="#505050">${esc(fit(`by ${r.owner}`, 180, 10.5))}</text>
  <text font-size="11" fill="#202020">${lines(wrap(r.description, 27), 208, 92, 14)}</text>
  ${row(stats(r, { cy: 128, size: 12, text: 'fill="#000" font-weight="600"', icon: 'fill="#505050"' }).slice(1), 208, 14)}
</g>`,
  );
};
