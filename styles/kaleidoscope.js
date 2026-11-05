// Kaleidoscope: a mirrored rosette seeded from the repo name, its pattern slowly turning inside the mirrors.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Kaleidoscope rosette seeded from the repo name; shapes drift through the mirrors so the symmetric pattern keeps unfolding.";

const [X, Y, R] = [314, 75, 62];

// One wedge of shapes is mirrored around the circle; the shapes themselves rotate inside the fixed mirrors, which is what makes it a kaleidoscope.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const m = 5 + Math.floor(rnd() * 4);
  const deg = 180 / m;
  const fills = [`fill="${c}"`, `fill="${c}" filter="url(#ks-h1)"`, `fill="${c}" filter="url(#ks-h2)"`, 'fill="#fff"', `fill="${c}"`, 'fill="#0d0b16"'];
  const shapes = Array.from({ length: 64 }, () => {
    const [a, d, s, f] = [rnd() * 360, 6 + rnd() * 54, 4 + rnd() * 10, fills[Math.floor(rnd() * fills.length)]];
    const t = `transform="rotate(${a.toFixed(0)}) translate(${d.toFixed(1)} 0)"`;
    const kind = rnd();
    if (kind < 0.4) return `<circle r="${s.toFixed(1)}" ${t} ${f}/>`;
    if (kind < 0.75) return `<ellipse rx="${(s * 1.6).toFixed(1)}" ry="${(s * 0.55).toFixed(1)}" ${t} ${f}/>`;
    return `<path d="M0 ${-s.toFixed(1)}L${(s * 0.7).toFixed(1)} 0L0 ${s.toFixed(1)}L${(-s * 0.7).toFixed(1)} 0Z" ${t} ${f}/>`;
  }).join("");
  const a = ((deg + 0.6) * Math.PI) / 180;
  const wedges = Array.from({ length: 2 * m }, (_, k) =>
    `<g clip-path="url(#ks-w)" transform="${k % 2 ? `rotate(${((k + 1) * deg).toFixed(2)}) scale(1 -1)` : `rotate(${(k * deg).toFixed(2)})`}"><use href="#ks-s" class="ks-in"/></g>`,
  ).join("");
  return svg(
    r.name,
    `${motion(".ks-in { transform-origin: 0 0; animation: ks-in 60s linear infinite } .ks-o { transform-origin: 0 0; animation: ks-in 90s linear infinite reverse } @keyframes ks-in { to { transform: rotate(360deg) } }")}
<defs>
  <clipPath id="ks-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <clipPath id="ks-w"><path d="M0 0L${R} 0A${R} ${R} 0 0 1 ${(R * Math.cos(a)).toFixed(2)} ${(R * Math.sin(a)).toFixed(2)}Z"/></clipPath>
  <filter id="ks-h1"><feColorMatrix type="hueRotate" values="50"/></filter>
  <filter id="ks-h2"><feColorMatrix type="hueRotate" values="-60"/></filter>
  <filter id="ks-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
  <radialGradient id="ks-bg" cx=".78" cy=".5" r=".7"><stop offset="0" stop-color="#1a1530"/><stop offset="1" stop-color="#08070e"/></radialGradient>
  <radialGradient id="ks-disc"><stop offset="0" stop-color="#0d0b16"/><stop offset=".6" stop-color="#17132c"/><stop offset="1" stop-color="${c}" stop-opacity=".45"/></radialGradient>
  <g id="ks-s" fill-opacity=".75"><circle r="${R}" fill="url(#ks-disc)" fill-opacity="1"/>${shapes}<circle r="3.5" fill="#fff"/></g>
</defs>
<g clip-path="url(#ks-clip)">
  <rect width="400" height="150" fill="url(#ks-bg)"/>
  <circle cx="${X}" cy="${Y}" r="${R}" fill="${c}" opacity=".45" filter="url(#ks-blur)"/>
</g>
<g transform="translate(${X} ${Y})">
  ${wedges}
  <circle r="${R}" fill="none" stroke="#fff" stroke-opacity=".35"/>
  <circle class="ks-o" r="${R + 5}" fill="none" stroke="${c}" stroke-opacity=".8" stroke-width="1.4" stroke-dasharray="1.5 5" stroke-linecap="round"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="11" fill="#9a95b5">${esc(fit(r.owner, 200, 11))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#f5f3ff">${esc(fit(r.name, 216, 20))}</text>
  <text font-size="12.5" fill="#b2adc9">${lines(wrap(r.description, 30), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#ece9f7"', icon: 'fill="#9a95b5"' }), 24, 16)}
</g>`,
  );
};
