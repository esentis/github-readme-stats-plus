// Fireworks: rockets climb over a night skyline and bloom into staggered bursts (one in the language colour), sparks fading as they fall.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Night skyline with firework bursts blooming and fading in turn, one in the language colour, a full burst always in the sky.";

// [x, width, top] of each building; low on the left so the stats row stays clear.
const CITY = [[0, 22, 140], [22, 30, 137], [52, 18, 142], [70, 34, 138], [104, 26, 141], [130, 40, 136], [170, 24, 140], [194, 30, 134], [224, 18, 126], [242, 30, 112], [272, 16, 122], [288, 34, 104], [322, 20, 118], [342, 28, 96], [370, 16, 114], [386, 20, 106]];
const city = CITY.map(([x, w, t]) => `<rect x="${x}" y="${t}" width="${w}" height="${150 - t}"/>`).join("");
const windows = CITY.flatMap(([x, w, t], b) =>
  Array.from({ length: Math.floor((146 - t) / 7) * Math.floor(w / 7) }, (_, k) => [x + 3 + (k % Math.floor(w / 7)) * 7, t + 5 + Math.floor(k / Math.floor(w / 7)) * 7, (b * 7 + k * 3) % 5])
    .filter(([, , on]) => on === 0)
    .map(([wx, wy]) => `<rect x="${wx}" y="${wy}" width="2.2" height="3"/>`)).join("");

// A burst of `n` sparks (faint tails, bright heads, white core) around (cx, cy); a rocket climbs to it first. Phase 0..1 offsets it in the shared cycle.
const burst = (cx, cy, rad, color, phase, n = 18) => {
  const at = (a, f) => `${(cx + Math.cos(a) * rad * f).toFixed(1)} ${(cy + Math.sin(a) * rad * f).toFixed(1)}`;
  let tails = "", heads = "", tips = "", core = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = i % 2 ? 0.84 : 1;
    tails += `M${at(a, 0.32 * k)}L${at(a, 0.72 * k)}`;
    heads += `M${at(a, 0.72 * k)}L${at(a, k)}`;
    tips += `<circle cx="${at(a, k).replace(" ", '" cy="')}" r="1.3"/>`;
    if (i % 2) core += `M${at(a + 0.17, 0.12)}L${at(a + 0.17, 0.42)}`;
  }
  const delay = `animation-delay:${(-phase * 6).toFixed(2)}s`;
  return `<path class="fw-rocket" style="${delay}" d="M${cx} ${cy}v10" stroke="#ffe8b0" stroke-width="1.6" stroke-linecap="round" opacity="0"/>
  <g class="fw-burst" style="${delay};transform-origin:${cx}px ${cy}px"><circle cx="${cx}" cy="${cy}" r="${rad * 1.15}" fill="${color}" opacity=".22" filter="url(#fw-blur)"/>
  <g stroke="${color}" stroke-linecap="round" fill="none"><path d="${tails}" stroke-width="1" stroke-opacity=".45"/><path d="${heads}" stroke-width="1.7"/></g>
  <path d="${core}" stroke="#fff6dc" stroke-width="1" stroke-linecap="round" stroke-opacity=".75"/><g fill="#fffbea">${tips}</g><circle cx="${cx}" cy="${cy}" r="2" fill="#fff"/></g>`;
};

export default (r) => {
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 124, size: 12, text: 'fill="#eef0ff"', icon: 'fill="#ffd36b"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="fw-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="fw-sky" x2="0" y2="1"><stop offset="0" stop-color="#04061a"/><stop offset=".7" stop-color="#14173a"/><stop offset="1" stop-color="#2d2150"/></linearGradient>
  <radialGradient id="fw-haze" cx=".78" cy=".35" r=".5"><stop offset="0" stop-color="#7c5cff" stop-opacity=".18"/><stop offset="1" stop-color="#7c5cff" stop-opacity="0"/></radialGradient>
  <filter id="fw-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
</defs>
${motion(`.fw-burst{animation:fw-burst 6s ease-out infinite}.fw-rocket{animation:fw-rocket 6s ease-out infinite}
@keyframes fw-burst{0%,14%{transform:scale(.1);opacity:0}18%{opacity:1}50%{transform:scale(1);opacity:1}82%,100%{transform:scale(1.05) translateY(3px);opacity:0}}
@keyframes fw-rocket{0%{transform:translateY(60px);opacity:0}3%{opacity:.9}14%{transform:translateY(0);opacity:.9}16%,100%{transform:translateY(0);opacity:0}}`)}
<g clip-path="url(#fw-clip)">
  <rect width="400" height="150" fill="url(#fw-sky)"/>
  <rect width="400" height="150" fill="url(#fw-haze)"/>
  <g fill="#fff" opacity=".45"><circle cx="30" cy="14" r=".6"/><circle cx="120" cy="8" r=".7"/><circle cx="204" cy="16" r=".5"/><circle cx="388" cy="10" r=".6"/><circle cx="252" cy="88" r=".5"/></g>
  ${burst(304, 50, 30, r.lang.color, 0.5)}
  ${burst(362, 66, 20, "#ffd36b", 0.64, 14)}
  ${burst(256, 34, 15, "#ff6fa8", 0.08, 12)}
  ${burst(354, 26, 13, "#7fe3ff", 0.26, 12)}
  <g fill="#0a0a1c">${city}</g>
  <g fill="#ffd98a" opacity=".55">${windows}</g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".12"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#8f93c4">${esc(fit(r.owner.toUpperCase(), 190, 9.5, 0.78))}</text>
  <text x="24" y="54" font-size="20" font-weight="700" fill="#fff">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="12" fill="#b9bce0">${lines(wrap(r.description, 28), 24, 75, 16)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
