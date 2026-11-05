import { FONT, esc, fit, lines, motion, row, stats, svg, wrap, rng } from "../card.js";

export const about = "Top-down maze carved from the repo name, a dot in the language colour running the dotted solution out to the exit where the name waits.";

const W = 11, H = 7, S = 16, X = 18, Y = 20, ENTRY = 4 * W, EXIT = 3 * W - 1;

// A maze on dark navy: a depth-first walk from the exit carves it, so its tree also gives the solution.
export default (r) => {
  const rnd = rng(r.name);
  const par = Array(W * H).fill(-1), right = new Set(), down = new Set(), seen = new Set([EXIT]), stack = [EXIT];
  while (stack.length) {
    const i = stack.at(-1), x = i % W, y = Math.floor(i / W);
    const nb = [x > 0 && i - 1, x < W - 1 && i + 1, y > 0 && i - W, y < H - 1 && i + W].filter((j) => j !== false && !seen.has(j));
    if (!nb.length) {
      stack.pop();
      continue;
    }
    const j = nb[Math.floor(rnd() * nb.length)];
    seen.add(j), (par[j] = i), stack.push(j);
    (Math.abs(j - i) === 1 ? right : down).add(Math.min(i, j));
  }
  let walls = `M${X} ${Y}H${X + W * S}V${Y + 2 * S}M${X + W * S} ${Y + 3 * S}V${Y + H * S}H${X}V${Y + 5 * S}M${X} ${Y + 4 * S}V${Y}`;
  for (let i = 0; i < W * H; i++) {
    const [px, py] = [X + (i % W) * S, Y + Math.floor(i / W) * S];
    if (i % W < W - 1 && !right.has(i)) walls += `M${px + S} ${py}v${S}`;
    if (i < W * (H - 1) && !down.has(i)) walls += `M${px} ${py + S}h${S}`;
  }
  const pts = [[X - 10, Y + 4.5 * S]];
  for (let i = ENTRY; i !== -1; i = par[i]) pts.push([X + ((i % W) + 0.5) * S, Y + (Math.floor(i / W) + 0.5) * S]);
  pts.push([X + W * S + 6, Y + 2.5 * S]);
  // Keep only the corners, then time each one by its distance along the path (85% of the loop is travel).
  const turns = pts.filter((p, k) => k === 0 || k === pts.length - 1 || (p[0] - pts[k - 1][0]) * (pts[k + 1][1] - p[1]) !== (p[1] - pts[k - 1][1]) * (pts[k + 1][0] - p[0]));
  let len = 0;
  const at = turns.map((p, k) => (len += k ? Math.hypot(p[0] - turns[k - 1][0], p[1] - turns[k - 1][1]) : 0));
  const [sx, sy] = turns[0];
  const go = ([x, y]) => `transform:translate(${x - sx}px,${y - sy}px)`;
  const keys = turns.map((p, k) => `${((at[k] / len) * 85).toFixed(2)}%{${go(p)}${k ? "" : ";opacity:1"}}`).join("");
  const end = go(turns.at(-1));
  return svg(
    r.name,
    `${motion(`.mz-dot{animation:mz-dot ${Math.min(10, 3 + len / 60).toFixed(1)}s linear infinite}
@keyframes mz-dot{${keys}90%{${end};opacity:1}97%{${end};opacity:0}97.5%,100%{${go(turns[0])};opacity:0}}`)}
<rect width="400" height="150" rx="12" fill="#0b1220"/>
<polyline points="${turns.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${r.lang.color}" stroke-opacity=".45" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${walls}" fill="none" stroke="#7dd3fc" stroke-width="2" stroke-linecap="round"/>
<path d="M203 55.5l6 4.5-6 4.5z" fill="${r.lang.color}"/>
<circle class="mz-dot" cx="${sx}" cy="${sy}" r="4.5" fill="${r.lang.color}" stroke="#fff" stroke-width="1.5"/>
<g font-family="${FONT}">
  <rect x="214" y="22" width="32" height="14" rx="2" fill="#16a34a"/>
  <text x="230" y="32.5" font-size="9" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">EXIT</text>
  <circle cx="257" cy="29" r="4" fill="${r.lang.color}"/>
  <text x="265" y="33" font-size="10" fill="#94a3b8">${esc(fit(r.lang.name, 120, 10))}</text>
  <text x="214" y="66" font-size="17" font-weight="700" fill="#f1f5f9">${esc(fit(r.name, 172, 17))}</text>
  <text font-size="11" fill="#94a3b8">${lines(wrap(r.description, 26), 214, 88, 14)}</text>
  ${row(stats(r, { cy: 126, size: 12, text: 'fill="#e2e8f0" font-weight="600"', icon: 'fill="#94a3b8"' }).slice(1), 214, 14)}
</g>`,
  );
};
