// Flow field: short curved strokes following a seeded vector field, with streaks of light drifting along them like wind.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Generative flow field seeded from the repo name: fine curved strokes with wind-like streaks drifting along them.";

// Each stroke steps 7 times along the field angle; a faint full copy shows the field, a dashed bright copy carries the moving streak.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const [f1, f2, f3, p1, p2, base] = [0.012 + rnd() * 0.012, 0.02 + rnd() * 0.02, 0.008 + rnd() * 0.01, rnd() * 6, rnd() * 6, rnd() - 0.5];
  const angle = (x, y) => base + 0.9 * Math.sin(x * f1 + p1) + 0.7 * Math.cos(y * f2 + p2) + 0.4 * Math.sin((x + y) * f3);
  const groups = [[], [], [], []];
  for (let gx = 0; gx < 18; gx++)
    for (let gy = 0; gy < 6; gy++) {
      let [x, y] = [gx * 23 - 6 + rnd() * 16, gy * 27 + 2 + rnd() * 16];
      let d = `M${x.toFixed(0)} ${y.toFixed(0)}`;
      for (let i = 0; i < 7; i++) {
        const a = angle(x, y);
        const [dx, dy] = [Math.cos(a) * 6.5, Math.sin(a) * 6.5];
        [x, y] = [x + dx, y + dy];
        d += `l${+dx.toFixed(1)} ${+dy.toFixed(1)}`;
      }
      const delay = -((gx * 0.4 + rnd() * 1.5) % 6).toFixed(1);
      groups[Math.floor(rnd() * 4)].push(`<path d="${d}" style="animation-delay:${delay}s"/>`);
    }
  const tones = [`stroke="${c}"`, `stroke="${c}" filter="url(#ff-h1)"`, `stroke="${c}" filter="url(#ff-h2)"`, 'stroke="#fff"'];
  return svg(
    r.name,
    `${motion("#ff-p path { animation: ff-s 6s linear infinite } @keyframes ff-s { to { stroke-dashoffset: -46 } }")}
<defs>
  <clipPath id="ff-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <linearGradient id="ff-bg" x2="1" y2="1"><stop offset="0" stop-color="#07080d"/><stop offset="1" stop-color="#11131c"/></linearGradient>
  <linearGradient id="ff-fade" x2="1"><stop offset=".5" stop-color="#fff" stop-opacity=".1"/><stop offset=".72" stop-color="#fff"/></linearGradient>
  <mask id="ff-m"><rect width="400" height="150" fill="url(#ff-fade)"/></mask>
  <filter id="ff-h1"><feColorMatrix type="hueRotate" values="40"/></filter>
  <filter id="ff-h2"><feColorMatrix type="hueRotate" values="-40"/></filter>
  <g id="ff-p">${groups.map((g, i) => `<g ${tones[i]} opacity="${i === 3 ? 0.7 : 0.95}">${g.join("")}</g>`).join("")}</g>
  <filter id="ff-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
</defs>
<g clip-path="url(#ff-clip)">
  <rect width="400" height="150" fill="url(#ff-bg)"/>
  <ellipse cx="330" cy="75" rx="90" ry="70" fill="${c}" opacity=".22" filter="url(#ff-blur)"/>
  <g mask="url(#ff-m)" fill="none" stroke-linecap="round">
    <use href="#ff-p" stroke-width=".7" opacity=".3"/>
    <use href="#ff-p" stroke-width="1.5" stroke-dasharray="18 28"/>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="11" fill="#8a8fa0">${esc(fit(r.owner, 200, 11))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#f3f4f8">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="12.5" fill="#a6aaba">${lines(wrap(r.description, 28), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#e8e9f0"', icon: 'fill="#8a8fa0"' }), 24, 16)}
</g>`,
  );
};
