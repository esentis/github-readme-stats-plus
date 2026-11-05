import { FONT, esc, fit, isLight, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Alpine cable car: the gondola carries the repo name on its sign while snowy peaks, pines and pylons glide past in parallax.";

const f = (v) => +v.toFixed(1);
// A jagged ridge repeating every p px, drawn wide enough to scroll one period seamlessly, with snow on each peak.
const ridge = (hs, p, fill, snow) => {
  const step = p / hs.length, n = hs.length * (Math.ceil(400 / p) + 1);
  const pts = Array.from({ length: n + 1 }, (_, i) => [i * step, hs[i % hs.length]]);
  let caps = "";
  for (let i = 1; i < n; i++) {
    const [x, y] = pts[i], [ax, ay] = pts[i - 1], [bx, by] = pts[i + 1];
    if (y >= ay || y >= by) continue;
    const d = Math.min(9, 0.4 * (Math.min(ay, by) - y)), l = x + ((ax - x) * d) / (ay - y), rr = x + ((bx - x) * d) / (by - y);
    caps += `M${f(l)} ${f(y + d)}L${x} ${y}L${f(rr)} ${f(y + d)}L${f(x + (rr - x) * 0.4)} ${f(y + d * 0.6)}L${x} ${f(y + d)}L${f(x + (l - x) * 0.4)} ${f(y + d * 0.6)}Z`;
  }
  return `<path d="M0 150${pts.map(([x, y]) => `L${x} ${y}`).join("")}V150Z" fill="${fill}"/><path d="${caps}" fill="${snow}"/>`;
};
const ground = (x) => 124 + 4 * Math.sin((x / 400) * 2 * Math.PI) + 3 * Math.sin((x / 100) * 2 * Math.PI);
const PINES = [18, 30, 42, 96, 124, 136, 226, 240, 252, 300, 318, 360, 374];
// Valley floor, pines and one pylon per 400 px; two periods so it can scroll by 400.
const NEAR = (() => {
  let d = "M0 150", trees = "", pylon = "";
  for (let x = 0; x <= 800; x += 10) d += `L${x} ${f(ground(x))}`;
  for (const o of [0, 400]) {
    for (const [i, x] of PINES.entries()) { const h = 12 + (i % 4) * 3, y = f(ground(x + o) + 3); trees += `M${x + o} ${f(y - h)}l${h * 0.32} ${h}h${-h * 0.64}Z`; }
    const px = 360 + o, gy = f(ground(px));
    pylon += `<path d="M${px - 7} ${gy}L${px - 2} 20M${px + 7} ${gy}L${px + 2} 20M${px - 6} 110L${px + 5.5} 86L${px - 5} 62L${px + 4.5} 40L${px - 3.5} 24M${px - 8} 18h16" stroke="#3b4554" stroke-width="1.6" fill="none"/>`;
  }
  return `${pylon}<path d="${d}V150Z" fill="#46705f"/><path d="${trees}" fill="#28503f"/>`;
})();

// The gondola holds still (it carries the name) while the world scrolls behind it, far layers slower.
export default (r) => {
  const c = r.lang.color, ink = isLight(c) ? "#1f2630" : "#fff";
  const size = r.name.length <= 17 ? 13 : 11;
  const counts = stats(r, { cy: 121, size: 12, text: 'fill="#2f3542" font-weight="600"', icon: 'fill="#5b6472"' }).slice(1);
  return svg(
    r.name,
    `${motion(".cc-far{animation:cc-200 20s linear infinite}.cc-mid{animation:cc-200 12s linear infinite}.cc-near{animation:cc-400 12s linear infinite}@keyframes cc-200{to{transform:translateX(-200px)}}@keyframes cc-400{to{transform:translateX(-400px)}}")}
<defs>
  <clipPath id="cc-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="cc-sky" x2="0" y2="1"><stop offset="0" stop-color="#5a9fda"/><stop offset=".55" stop-color="#a9d3ef"/><stop offset="1" stop-color="#eef4ef"/></linearGradient>
  <linearGradient id="cc-haze" x2="0" y2="1"><stop offset="0" stop-color="#f3f8fb" stop-opacity="0"/><stop offset="1" stop-color="#f3f8fb" stop-opacity=".6"/></linearGradient>
  <linearGradient id="cc-mist" x2="1"><stop offset="0" stop-color="#f5f9fb" stop-opacity=".8"/><stop offset=".38" stop-color="#f5f9fb" stop-opacity=".55"/><stop offset=".6" stop-color="#f5f9fb" stop-opacity="0"/></linearGradient>
  <linearGradient id="cc-body" x2="0" y2="1"><stop offset="0" stop-color="#fdfaf3"/><stop offset="1" stop-color="#e3d9c6"/></linearGradient>
</defs>
<g clip-path="url(#cc-clip)">
  <rect width="400" height="150" fill="url(#cc-sky)"/>
  <g class="cc-far"><g fill="#fff" opacity=".8">${[0, 200, 400].map((o) => `<ellipse cx="${o + 60}" cy="30" rx="18" ry="5"/><ellipse cx="${o + 72}" cy="26" rx="10" ry="5"/><ellipse cx="${o + 150}" cy="18" rx="13" ry="3.5"/>`).join("")}</g>
    ${ridge([70, 52, 64, 44, 60, 72, 56, 66], 200, "#a5bdd6", "#f4f8fb")}</g>
  <rect y="40" width="400" height="70" fill="url(#cc-haze)"/>
  <g class="cc-mid">${ridge([98, 76, 90, 68, 86, 102, 82, 94], 200, "#6f8db0", "#eaf1f8")}</g>
  <rect y="70" width="400" height="60" fill="url(#cc-haze)" opacity=".7"/>
  <g class="cc-near">${NEAR}</g>
  <rect width="400" height="150" fill="url(#cc-mist)"/>
  <path d="M0 18H400" stroke="#2f3542" stroke-width="1.4"/><path d="M0 23H400" stroke="#2f3542" stroke-opacity=".5" stroke-width=".8"/>
  <path d="M302 22V44L262 51M302 44L342 51" fill="none" stroke="#2f3542" stroke-width="2.4" stroke-linejoin="round"/>
  <rect x="288" y="14" width="28" height="9" rx="2.5" fill="#3b4352"/><g fill="#5b6472" stroke="#232831"><circle cx="295" cy="15" r="3"/><circle cx="309" cy="15" r="3"/></g>
  <path fill-rule="evenodd" fill="url(#cc-body)" stroke="#2f3542" stroke-opacity=".35" d="M231 50h142a9 9 0 0 1 9 9v64a9 9 0 0 1-9 9H231a9 9 0 0 1-9-9V59a9 9 0 0 1 9-9ZM230 81h44v26h-44ZM279 81h46v26h-46ZM330 81h44v26h-44Z"/>
  <path d="M222 59a9 9 0 0 1 9-9h142a9 9 0 0 1 9 9Z" fill="#2f3542"/>
  <g fill="#dff0fa" opacity=".22"><rect x="230" y="81" width="44" height="26"/><rect x="279" y="81" width="46" height="26"/><rect x="330" y="81" width="44" height="26"/></g>
  <path d="M236 107l14-26h7l-14 26ZM286 107l14-26h4l-14 26ZM338 107l14-26h7l-14 26Z" fill="#fff" opacity=".28"/>
  <rect x="230" y="62" width="144" height="16" rx="3" fill="${c}"/>
  <rect x="222" y="109" width="160" height="2.5" fill="${c}" opacity=".8"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#2f3542" stroke-opacity=".18"/>
<g font-family="${FONT}">
  <text x="302" y="${size === 13 ? 74.5 : 73.8}" font-size="${size}" font-weight="700" fill="${ink}" text-anchor="middle">${esc(fit(r.name, 136, size))}</text>
  ${row(counts, 302 - (counts[0][0] + counts[1][0] + 14) / 2, 14)}
  <circle cx="26" cy="31" r="4" fill="${c}" stroke="#1f3550" stroke-opacity=".3"/>
  <text x="36" y="34.5" font-size="9.5" font-weight="700" letter-spacing="1.5" fill="#2c4a66">${esc(fit(r.lang.name.toUpperCase(), 160, 9.5, 0.8))}</text>
  <text font-size="12.5" fill="#1d3450">${lines(wrap(r.description, 26, 3), 22, 56, 16)}</text>
  <text x="22" y="112" font-size="11" fill="#3d5672">by ${esc(fit(r.owner, 170, 11))}</text>
</g>`,
  );
};
