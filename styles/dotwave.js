// Dot wave: a halftone grid of dots swelling in a seeded travelling wave, lit by the language colour at each crest.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Halftone dot grid rippling in a seeded wave; each crest swells the dots and lights them in the language colour.";

// Each dot runs the same 5s pulse, offset by its phase along a slightly curved wave front.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const [th, lam, bend, x0, y0] = [(rnd() - 0.5) * 1.6, 70 + rnd() * 50, 0.15 + rnd() * 0.25, 240 + rnd() * 150, rnd() * 150];
  const cols = Array.from({ length: 13 }, (_, i) => {
    const x = 242 + i * 12;
    const dots = Array.from({ length: 10 }, (_, j) => {
      const y = 21 + j * 12;
      const ph = ((x - x0) * Math.cos(th) + (y - y0) * Math.sin(th)) / lam + bend * Math.sin(Math.hypot(x - x0, y - y0) / 26);
      return `<circle cx="${x}" cy="${y}" r="2.4" style="animation-delay:${(-(((ph % 1) + 1) % 1) * 5).toFixed(2)}s"/>`;
    }).join("");
    return `<g opacity="${Math.min(1, 0.25 + i * 0.2).toFixed(2)}">${dots}</g>`;
  }).join("");
  return svg(
    r.name,
    `${motion(`.dw circle { transform-box: fill-box; transform-origin: center; animation: dw 5s ease-in-out infinite } @keyframes dw { 0%, 100% { transform: scale(.45); fill: #5b6275 } 50% { transform: scale(1.5); fill: ${c} } }`)}
<defs>
  <clipPath id="dw-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <linearGradient id="dw-bg" x2="1" y2="1"><stop offset="0" stop-color="#0b0d14"/><stop offset="1" stop-color="#141824"/></linearGradient>
  <filter id="dw-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>
</defs>
<g clip-path="url(#dw-clip)">
  <rect width="400" height="150" fill="url(#dw-bg)"/>
  <ellipse cx="316" cy="75" rx="70" ry="60" fill="${c}" opacity=".16" filter="url(#dw-blur)"/>
</g>
<g class="dw" fill="${c}" fill-opacity=".9">${cols}</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="11" fill="#8a90a3">${esc(fit(r.owner, 180, 11))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#f3f5fa">${esc(fit(r.name, 196, 20))}</text>
  <text font-size="12.5" fill="#a7acbd">${lines(wrap(r.description, 28), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#e8eaf1"', icon: 'fill="#8a90a3"' }), 24, 16)}
</g>`,
  );
};
