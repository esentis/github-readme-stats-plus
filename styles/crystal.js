import { FONT, esc, fit, lines, motion, rng, svg, wrap } from "../card.js";

export const about = "Crystal: a faceted crystal cluster tinted in the language colour inside a dark jewel box, facets catching the light in turn and rainbow caustics flickering around it.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
// Blends two hex colours (accepts #rgb and #rrggbb[aa]); t = 0 gives a, 1 gives b.
const mix = (a, b, t) => {
  const p = (h) => (h.length < 7 ? h.replace(/\w/g, "$&$&") : h).slice(1, 7).match(/../g).map((x) => parseInt(x, 16) || 0);
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
const RAINBOW = ["#ff4d6d", "#ffa94d", "#ffe66d", "#69f0ae", "#4dd0ff", "#7c6dff", "#d06dff"];

// A hexagonal prism seen side-on with a pointed termination: three side faces and three tip facets.
const prism = (c, x, base, w, h, tilt, i) => {
  const [l, a, b, rr, t, d] = [x - w / 2, x - w / 4, x + w / 4, x + w / 2, base - h, w * 0.14], ap = `${x},${(base - h - w * 0.9).toFixed(1)}`;
  const f = (pts, col, extra = "") => `<polygon points="${pts}" fill="${col}"${extra}/>`;
  return `<g transform="rotate(${tilt.toFixed(1)} ${x} ${base})" fill-opacity=".9" stroke="#fff" stroke-opacity=".4" stroke-width=".5" stroke-linejoin="round">
  ${f(`${l},${base} ${l},${t} ${a},${t - d} ${a},${base}`, mix(c, "#000", 0.4))}${f(`${a},${base} ${a},${t - d} ${b},${t - d} ${b},${base}`, mix(c, "#fff", 0.12))}${f(`${b},${base} ${b},${t - d} ${rr},${t} ${rr},${base}`, mix(c, "#fff", 0.42))}
  ${f(`${l},${t} ${ap} ${a},${t - d}`, mix(c, "#fff", 0.15))}${f(`${a},${t - d} ${ap} ${b},${t - d}`, mix(c, "#fff", 0.5))}${f(`${b},${t - d} ${ap} ${rr},${t}`, mix(c, "#fff", 0.78))}
  ${f(`${a},${t - d} ${ap} ${b},${t - d}`, "#fff", ` class="cr-facet" style="animation-delay:${(i * -1.3).toFixed(1)}s" fill-opacity="0" stroke="none"`)}
  <path d="M${a + w * 0.08} ${base - 4}L${a + w * 0.08} ${t + 2}M${x + w * 0.05} ${base - 10}L${x + w * 0.05} ${t + h * 0.4}" stroke-opacity=".35" stroke-width=".8"/></g>`;
};

// Dark jewel box: text on the left, the crystal cluster on the right with caustics scattered round it.
export default (r) => {
  const rand = rng(r.name), c = r.lang.color;
  const cluster = [[-46, 40, 17, -34], [38, 50, 19, 25], [-26, 70, 22, -17], [24, 58, 21, 16], [-4, 92, 27, -5], [12, 40, 17, 6]]
    .map(([dx, h, w, tilt], i) => prism(c, 318 + dx, 138, w, h + rand() * 10 - 5, tilt + rand() * 6 - 3, i)).join("");
  const caustics = Array.from({ length: 11 }, (_, i) => {
    const [x, y] = i < 4 ? [252 + rand() * 18, 20 + rand() * 100] : i < 8 ? [372 + rand() * 18, 16 + rand() * 110] : [262 + rand() * 110, 4 + rand() * 12];
    return `<ellipse class="cr-caustic" style="animation-delay:${(-rand() * 4).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(7 + rand() * 7).toFixed(1)}" ry="${(1.8 + rand() * 1.2).toFixed(1)}" transform="rotate(${(rand() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="url(#cr-rainbow)"/>`;
  }).join("");
  const size = r.name.length > 16 ? 19 : 24;
  return svg(
    r.name,
    `${motion(".cr-caustic { animation: cr-flicker 4s ease-in-out infinite } @keyframes cr-flicker { 0%, 100% { opacity: .85 } 35% { opacity: .2 } 60% { opacity: .65 } } .cr-facet { animation: cr-facet 6.5s ease-in-out infinite } @keyframes cr-facet { 0%, 70%, 100% { fill-opacity: 0 } 80% { fill-opacity: .75 } } .cr-spark { transform-origin: 314px 22px; animation: cr-spark 6.5s ease-in-out infinite } @keyframes cr-spark { 0%, 100% { transform: scale(1); opacity: 1 } 40%, 60% { transform: scale(.3); opacity: 0 } }")}
<defs>
  <clipPath id="cr-card"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="cr-bg" cx=".8" cy=".6" r=".9"><stop offset="0" stop-color="#2c1a48"/><stop offset=".6" stop-color="#140b26"/><stop offset="1" stop-color="#07040e"/></radialGradient>
  <radialGradient id="cr-glow"><stop offset="0" stop-color="${mix(c, "#fff", 0.4)}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
  <linearGradient id="cr-rainbow" x2="1">${RAINBOW.map((s, i) => `<stop offset="${(i / 6).toFixed(2)}" stop-color="${s}" stop-opacity="${i % 6 ? 0.85 : 0}"/>`).join("")}</linearGradient>
  <linearGradient id="cr-rock" x2="0" y2="1"><stop offset="0" stop-color="#3a2d4a"/><stop offset="1" stop-color="#120c1a"/></linearGradient>
  <filter id="cr-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation=".8"/></filter>
</defs>
<g clip-path="url(#cr-card)">
  <rect width="400" height="150" fill="url(#cr-bg)"/>
  <g fill="none" stroke="#fff" stroke-opacity=".04" stroke-width="14"><path d="M-10 40C80 10 140 70 230 30"/><path d="M-10 120C90 90 150 150 250 110"/></g>
  <ellipse cx="318" cy="88" rx="80" ry="64" fill="url(#cr-glow)"/>
  <g filter="url(#cr-blur)">${caustics}</g>
  ${cluster}
  <path d="M262 150C266 136 280 130 296 133C306 126 330 127 342 133C356 129 372 134 378 150Z" fill="url(#cr-rock)"/>
  <path d="M272 140C284 134 296 136 304 138M330 134C342 131 356 134 364 140" stroke="#fff" stroke-opacity=".15" fill="none"/>
  <path class="cr-spark" d="M314 12Q314 22 324 22Q314 22 314 32Q314 22 304 22Q314 22 314 12Z" fill="#fff"/>
</g>
<rect x="5.5" y="5.5" width="389" height="139" rx="10" fill="none" stroke="#b9a6e0" stroke-opacity=".18"/>
<g font-family="${FONT}">
  <circle cx="29" cy="28.5" r="3" fill="${c}"/>
  <text x="38" y="32" font-size="8.5" font-weight="600" letter-spacing="3" fill="#a99bc8">${esc(fit(`FINE GEMS · ${r.lang.name.toUpperCase()}`, 190, 8.5, 0.95))}</text>
  <text x="26" y="${size > 20 ? 62 : 60}" font-family="${SERIF}" font-size="${size}" fill="#f3efff">${esc(fit(r.name, 208, size, 0.58))}</text>
  <text font-family="${SERIF}" font-style="italic" font-size="11.5" fill="#b6abc9">${lines(wrap(r.description, 32), 27, 84, 14.5)}</text>
  <path d="M27 112H57" stroke="${c}" stroke-opacity=".8"/>
  <text x="27" y="132" font-size="11" font-weight="600" letter-spacing="1.2" fill="#ece6fa">★ ${esc(r.stars)} <tspan fill="#a99bc8" font-size="9">CT</tspan><tspan dx="14">⑂ ${esc(r.forks)}</tspan></text>
</g>`,
  );
};
