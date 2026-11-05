// Spirograph: a hypotrochoid seeded from the repo name, drawn in fine glowing lines with a pen tracing it.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Spirograph hypotrochoid seeded from the repo name, in fine glowing ink, slowly turning while a pen point traces the curve.";

const [X, Y] = [314, 75];
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// Hypotrochoid with fixed ring 1, rolling wheel q/p and pen offset d, scaled to radius 60; it closes after q turns.
const curve = (p, q, d) => {
  const [rr, k] = [q / p, (p - q) / q];
  const s = 60 / (1 - rr + d);
  const n = 110 * q;
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * 2 * Math.PI * q;
    return `${(X + s * ((1 - rr) * Math.cos(t) + d * Math.cos(k * t))).toFixed(1)} ${(Y + s * ((1 - rr) * Math.sin(t) - d * Math.sin(k * t))).toFixed(1)}`;
  });
  return `M${pts.join("L")}Z`;
};

// Navy drafting board: the main curve with a glow copy, a fainter companion curve turning the other way, and a bright trail behind the pen.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const p = 5 + Math.floor(rnd() * 7);
  const qs = [2, 3, 4, 5].filter((q) => q < p && gcd(p, q) === 1);
  const q = qs[Math.floor(rnd() * qs.length)];
  const d = (q / p) * (0.55 + rnd() * 0.6);
  return svg(
    r.name,
    `${motion(`.sp-a, .sp-b { transform-origin: ${X}px ${Y}px; animation: sp-a 120s linear infinite } .sp-b { animation-duration: 80s; animation-direction: reverse } .sp-t { animation: sp-t 24s linear infinite } @keyframes sp-a { to { transform: rotate(360deg) } } @keyframes sp-t { from { stroke-dashoffset: 70 } to { stroke-dashoffset: -930 } }`)}
<defs>
  <clipPath id="sp-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <radialGradient id="sp-bg" cx=".78" cy=".5" r=".75"><stop offset="0" stop-color="#141a33"/><stop offset="1" stop-color="#070914"/></radialGradient>
  <filter id="sp-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="sp-h"><feColorMatrix type="hueRotate" values="150"/></filter>
  <path id="sp-c" pathLength="1000" d="${curve(p, q, d)}"/>
</defs>
<g clip-path="url(#sp-clip)">
  <rect width="400" height="150" fill="url(#sp-bg)"/>
  <circle cx="${X}" cy="${Y}" r="67" fill="none" stroke="#fff" stroke-opacity=".14" stroke-dasharray="1 4"/>
  <path class="sp-b" d="${curve(p + 1 + (p % 2), 2, 0.22 + rnd() * 0.25)}" fill="none" stroke="${c}" stroke-width=".6" opacity=".45" filter="url(#sp-h)"/>
  <g class="sp-a" fill="none" stroke="${c}" stroke-linejoin="round">
    <use href="#sp-c" stroke-width="2.4" opacity=".35" filter="url(#sp-glow)"/>
    <use href="#sp-c" stroke-width=".75"/>
    <use href="#sp-c" class="sp-t" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="70 930" stroke-dashoffset="70"/>
    <circle r="5" fill="${c}" stroke="none" opacity=".45" filter="url(#sp-glow)"><animateMotion dur="24s" repeatCount="indefinite"><mpath href="#sp-c"/></animateMotion></circle>
    <circle r="2.2" fill="#fff" stroke="none"><animateMotion dur="24s" repeatCount="indefinite"><mpath href="#sp-c"/></animateMotion></circle>
  </g>
  <circle cx="${X}" cy="${Y}" r="1.6" fill="#fff" opacity=".6"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="10" font-weight="600" letter-spacing="2" fill="#8790b3">${esc(fit(`${r.owner}`.toUpperCase(), 200, 10, 0.8))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#f2f4ff">${esc(fit(r.name, 216, 20))}</text>
  <text font-size="12.5" fill="#a8afcb">${lines(wrap(r.description, 30), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#e6e9f7"', icon: 'fill="#8790b3"' }), 24, 16)}
</g>`,
  );
};
