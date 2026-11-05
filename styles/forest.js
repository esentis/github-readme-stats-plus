import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Misty layered pine forest fading into the distance.";

const rnd = (i) => Math.abs(Math.sin(i * 43.1) * 1e4) % 1;

// A three-tier pine: tip, two shelves of branches, wide base.
const pine = (x, b, h) => {
  const w = h * 0.42;
  const p = [[0, -h], [0.4, -0.64], [0.2, -0.64], [0.72, -0.3], [0.45, -0.3], [1, 0]].map(([dx, dy], i) => (i ? [dx * w, dy * h] : [0, dy]));
  const side = (s) => p.map(([dx, dy]) => `${(x + s * dx).toFixed(1)} ${(b + dy).toFixed(1)}`);
  return `M${side(1).join("L")}L${side(-1).reverse().join("L")}Z`;
};

const layer = (b, hMin, hVar, step, seed, from = -10, to = 410) => {
  const d = [];
  for (let i = 0, x = from; x < to; i++, x += step * (0.7 + rnd(seed + i) * 0.6)) d.push(pine(x, b, hMin + rnd(seed + i + 50) * hVar));
  return `<path d="${d.join("")}M-10 ${b}H410V150H-10Z"/>`;
};

const mist = (y) => `<rect y="${y}" width="400" height="${150 - y}" fill="url(#mist)"/>`;

// Forest: three depths of pine silhouettes with mist between them, ground strip for the stats.
export default (r) =>
  svg(
    r.name,
    `${motion(".fo-sway { transform-origin: 200px 150px; animation: fo-sway 8s ease-in-out infinite } @keyframes fo-sway { 50% { transform: skewX(-2deg) } }")}
<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="#eef3ee"/><stop offset="1" stop-color="#cfdcd2"/></linearGradient>
  <linearGradient id="mist" x2="0" y2="1"><stop offset="0" stop-color="#eef3ee" stop-opacity=".65"/><stop offset=".5" stop-color="#eef3ee" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <g fill="#b3c7b9">${layer(112, 24, 18, 15, 1)}</g>${mist(100)}
  <g class="fo-sway" fill="#7d9c88">${layer(128, 30, 18, 22, 2)}</g>${mist(118)}
  <g class="fo-sway" style="animation-delay:.8s" fill="#2e4b3a">${layer(150, 46, 18, 30, 3, 250)}${layer(150, 40, 10, 30, 4, -10, 10)}</g>
  <rect y="130" width="400" height="20" fill="#2e4b3a"/>
</g>
<g font-family="${FONT}">
  <text x="24" y="38" font-size="21" font-weight="700" fill="#14281d">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13" fill="#3d5a4a">${lines(wrap(r.description, 46), 24, 60, 17)}</text>
  ${row(stats(r, { cy: 140, size: 12, text: 'fill="#eef3ee"', icon: 'fill="#a7d3b4"' }), 24, 16)}
</g>`,
  );
