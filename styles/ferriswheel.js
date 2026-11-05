import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Dusk fair: a ferris wheel turns slowly with its cabins hanging upright, string lights twinkling over the name.";

const HX = 318, HY = 66, R = 50;
const pt = (a, rad = R) => [HX + rad * Math.cos(a), HY + rad * Math.sin(a)].map((v) => +v.toFixed(2));
// Point t along a quadratic curve, for bulbs on the string lights.
const quad = (p0, p1, p2, t) => p0.map((v, i) => (1 - t) ** 2 * v + 2 * (1 - t) * t * p1[i] + t * t * p2[i]);
const BULBS = ["#ffd166", "#ff7b7b", "#8be0f2", "#fff1b8"];

// Dusk gradient sky, a wheel on the right (one quarter turn per loop, 4-fold symmetric so the loop is seamless), fair silhouettes below.
export default (r) => {
  const c = r.lang.color;
  const spokes = Array.from({ length: 16 }, (_, i) => `M${HX} ${HY}L${pt((i * Math.PI) / 8).join(" ")}`).join("");
  const rim = Array.from({ length: 16 }, (_, i) => `<circle cx="${pt(((i + 0.5) * Math.PI) / 8)[0]}" cy="${pt(((i + 0.5) * Math.PI) / 8)[1]}" r="1.3" class="fw-t" style="animation-delay:-${(i % 4) * 0.6}s"/>`).join("");
  const cabins = Array.from({ length: 8 }, (_, i) => {
    const [x, y] = pt((i * Math.PI) / 4);
    return `<g class="fw-c" style="transform-origin:${x}px ${y}px"><path d="M${x} ${y}v4" stroke="#3a2a4a" stroke-width="1"/><path d="M${x - 7} ${y + 6}q7-4 14 0v7a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3Z" fill="${i % 2 ? "#f6ead6" : c}" stroke="#2a1d3a" stroke-width=".8"/><rect x="${x - 5}" y="${y + 7.5}" width="10" height="3.5" rx="1" fill="#2a1d3a" opacity=".55"/></g>`;
  }).join("");
  const swags = [[[-4, 4], [60, 26], [124, 8]], [[124, 8], [188, 26], [252, 6]]];
  const bulbs = swags.flatMap((s, k) => [0.12, 0.27, 0.42, 0.58, 0.73, 0.88].map((t, i) => {
    const [x, y] = quad(...s, t);
    return `<g class="fw-t" style="animation-delay:-${((k * 6 + i) * 0.41).toFixed(2)}s"><circle cx="${x.toFixed(1)}" cy="${(y + 2).toFixed(1)}" r="4" fill="${BULBS[(k * 6 + i) % 4]}" opacity=".25"/><circle cx="${x.toFixed(1)}" cy="${(y + 2).toFixed(1)}" r="1.6" fill="${BULBS[(k * 6 + i) % 4]}"/></g>`;
  })).join("");
  return svg(
    r.name,
    `${motion(`.fw-w{transform-origin:${HX}px ${HY}px;animation:fw-w 20s linear infinite}@keyframes fw-w{to{transform:rotate(90deg)}}.fw-c{animation:fw-c 20s linear infinite}@keyframes fw-c{to{transform:rotate(-90deg)}}.fw-t{animation:fw-t 2.4s ease-in-out infinite}@keyframes fw-t{0%,100%{opacity:1}50%{opacity:.35}}`)}
<defs>
  <clipPath id="fw-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="fw-sky" x2="0" y2="1"><stop offset="0" stop-color="#1c1642"/><stop offset=".45" stop-color="#4f2a68"/><stop offset=".78" stop-color="#c2606e"/><stop offset="1" stop-color="#f3a874"/></linearGradient>
  <radialGradient id="fw-glow" cx=".8" cy="1" r=".7"><stop offset="0" stop-color="#ffcf8a" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf8a" stop-opacity="0"/></radialGradient>
</defs>
<g clip-path="url(#fw-clip)">
  <rect width="400" height="150" fill="url(#fw-sky)"/><rect width="400" height="150" fill="url(#fw-glow)"/>
  <g fill="#fff" opacity=".6"><circle cx="232" cy="14" r=".7"/><circle cx="388" cy="10" r=".6"/><circle cx="380" cy="34" r=".5"/><circle cx="262" cy="10" r=".5"/><circle cx="210" cy="30" r=".6"/></g>
  <g stroke="#2a1d3a" stroke-width="3" stroke-linecap="round"><path d="M${HX} ${HY}L292 132M${HX} ${HY}L344 132M298 116H338M305 98H331"/></g>
  <g class="fw-w">
    <circle cx="${HX}" cy="${HY}" r="${R}" fill="none" stroke="#f3e2c8" stroke-width="2.2"/><circle cx="${HX}" cy="${HY}" r="${R - 7}" fill="none" stroke="#f3e2c8" stroke-opacity=".7"/>
    <path d="${spokes}" stroke="#f3e2c8" stroke-opacity=".75" stroke-width=".9"/>
    <g fill="#fff3c4">${rim}</g>
    ${cabins}
  </g>
  <circle cx="${HX}" cy="${HY}" r="6" fill="#2a1d3a" stroke="#f3e2c8" stroke-width="1.5"/><circle cx="${HX}" cy="${HY}" r="2" fill="${c}"/>
  <path d="M0 132H400V150H0Z" fill="#1a1230"/>
  <path d="M226 132l12-16l12 16ZM362 132l14-18l14 18Z" fill="#3c2148"/><path d="M238 116v16M376 114v18" stroke="#1a1230"/>
  <path d="M226 132l6-8h12l6 8ZM362 132l7-9h14l7 9Z" fill="#a8455c" opacity=".7"/>
  <path d="M282 130h72v3h-72Z" fill="#2a1d3a"/>
  <path d="M-4 4Q60 26 124 8Q188 26 252 6" fill="none" stroke="#120c24" stroke-width=".8"/>
  ${bulbs}
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <text x="22" y="46" font-size="20" font-weight="700" fill="#fff6ea">${esc(fit(r.name, 222, 20))}</text>
  <text font-size="12" fill="#ead2e6">${lines(wrap(r.description, 30), 22, 66, 15)}</text>
  ${row(stats(r, { cy: 141, size: 12, text: 'fill="#fff1e0"', icon: 'fill="#f3c6a8"' }), 22, 14)}
</g>`,
  );
};
