import { FONT, esc, fit, lines, motion, rng, svg, wrap } from "../card.js";

export const about = "Candle: a candle in the language colour on a brass holder, its flame flickering and a warm glow breathing across the text in the dark.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
// Blends two hex colours (accepts #rgb and #rrggbb[aa]); t = 0 gives a, 1 gives b.
const mix = (a, b, t) => {
  const p = (h) => (h.length < 7 ? h.replace(/\w/g, "$&$&") : h).slice(1, 7).match(/../g).map((x) => parseInt(x, 16) || 0);
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
const FLAME = "M334 26C336 38 341 46 341 55C341 61 338 65 334 65C330 65 327 61 327 55C327 46 332 38 334 26Z";

// Candlelight: text on the left lit by the flame, the candle on the right.
export default (r) => {
  const rand = rng(r.name), c = mix(r.lang.color, "#f3e6cf", 0.25);
  const drips = Array.from({ length: 3 }, (_, i) => {
    const x = 320 + i * 9 + rand() * 5, len = 8 + rand() * 18;
    const [a, b, e] = [(x - 3).toFixed(1), (x + 3).toFixed(1), (76 + len).toFixed(1)];
    return `<path d="M${a} 75C${a} 80 ${(x - 1.7).toFixed(1)} 82 ${(x - 1.7).toFixed(1)} ${e}A1.7 1.7 0 0 0 ${(x + 1.7).toFixed(1)} ${e}C${(x + 1.7).toFixed(1)} 82 ${b} 80 ${b} 75Z" fill="url(#cd-drip)"/>`;
  }).join("");
  const size = r.name.length > 16 ? 19 : 24;
  return svg(
    r.name,
    `${motion(".cd-flame { transform-origin: 334px 64px; animation: cd-flick 2.4s ease-in-out infinite } @keyframes cd-flick { 0%, 100% { transform: none } 20% { transform: scale(.94, 1.06) skewX(-2deg) } 45% { transform: scale(1.04, .95) skewX(1.5deg) } 70% { transform: scale(.97, 1.04) skewX(-1deg) } } .cd-glow { animation: cd-glow 4.8s ease-in-out infinite } @keyframes cd-glow { 0%, 100% { opacity: 1 } 30% { opacity: .78 } 55% { opacity: .95 } 80% { opacity: .82 } } .cd-halo { transform-origin: 334px 50px; animation: cd-halo 2.4s ease-in-out infinite } @keyframes cd-halo { 50% { transform: scale(1.08); opacity: .8 } }")}
<defs>
  <clipPath id="cd-card"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="cd-room" cx=".84" cy=".36" r="1"><stop offset="0" stop-color="#3b200d"/><stop offset=".55" stop-color="#170c06"/><stop offset="1" stop-color="#080402"/></radialGradient>
  <radialGradient id="cd-light" cx="334" cy="52" r="330" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffb347" stop-opacity=".42"/><stop offset=".35" stop-color="#ff9a3c" stop-opacity=".12"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>
  <radialGradient id="cd-halo"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ff8c2a" stop-opacity="0"/></radialGradient>
  <radialGradient id="cd-fire" cx=".5" cy=".75" r=".75"><stop offset="0" stop-color="#fffbe8"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".7" stop-color="#ff9b2f"/><stop offset="1" stop-color="#ff6a1a" stop-opacity=".2"/></radialGradient>
  <linearGradient id="cd-wax" x2="1"><stop offset="0" stop-color="${mix(c, "#000", 0.45)}"/><stop offset=".45" stop-color="${mix(c, "#ffe2b0", 0.35)}"/><stop offset="1" stop-color="${mix(c, "#000", 0.55)}"/></linearGradient>
  <linearGradient id="cd-drip" x2="1"><stop offset="0" stop-color="${mix(c, "#000", 0.2)}"/><stop offset=".5" stop-color="${mix(c, "#fff3d6", 0.5)}"/><stop offset="1" stop-color="${mix(c, "#000", 0.3)}"/></linearGradient>
  <linearGradient id="cd-brass" x2="1"><stop offset="0" stop-color="#6b4a1a"/><stop offset=".4" stop-color="#e8c071"/><stop offset="1" stop-color="#5a3c12"/></linearGradient>
  <filter id="cd-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
<g clip-path="url(#cd-card)">
  <rect width="400" height="150" fill="url(#cd-room)"/>
  <rect class="cd-glow" width="400" height="150" fill="url(#cd-light)"/>
  <ellipse cx="334" cy="142" rx="48" ry="5" fill="#000" opacity=".5"/>
  <circle class="cd-halo" cx="334" cy="50" r="34" fill="url(#cd-halo)"/>
  <rect x="316" y="72" width="36" height="66" fill="url(#cd-wax)"/>
  <ellipse cx="334" cy="72" rx="18" ry="4.5" fill="${mix(c, "#ffe2b0", 0.45)}"/>
  <ellipse cx="334" cy="72.5" rx="12" ry="2.8" fill="${mix(c, "#fff3d6", 0.6)}" opacity=".9"/>
  ${drips}
  <rect x="316" y="72" width="36" height="66" fill="#ffb347" opacity=".08"/>
  <path d="M310 136H358L364 142H304Z" fill="url(#cd-brass)"/><ellipse cx="334" cy="142.5" rx="34" ry="3.5" fill="url(#cd-brass)"/>
  <path d="M334 72.5C334 69 333 67 334.5 64" stroke="#1a0f08" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <g class="cd-flame"><path d="${FLAME}" fill="#ff9b2f" opacity=".45" filter="url(#cd-blur)" transform="translate(-16.7 -3.2) scale(1.05)"/><path d="${FLAME}" fill="url(#cd-fire)"/>
    <path d="M334 44C335.5 51 337 55 337 58C337 61 335.5 62 334 62C332.5 62 331 61 331 58C331 55 332.5 51 334 44Z" fill="#fffdf2" opacity=".9"/>
    <ellipse cx="334" cy="63" rx="3" ry="2" fill="#4f7cff" opacity=".45"/></g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#ffb347" stroke-opacity=".14"/>
<g font-family="${FONT}">
  <text x="27" y="32" font-size="8.5" font-weight="600" letter-spacing="3" fill="#c99a5c">${esc(fit(`NOCTURNE · ${r.lang.name.toUpperCase()}`, 230, 8.5, 0.95))}</text>
  <text x="26" y="${size > 20 ? 62 : 60}" font-family="${SERIF}" font-size="${size}" fill="#fbe3b8">${esc(fit(r.name, 262, size, 0.58))}</text>
  <text font-family="${SERIF}" font-style="italic" font-size="12" fill="#cfae84">${lines(wrap(r.description, 38), 27, 84, 15)}</text>
  <text x="27" y="132" font-size="11" font-weight="600" letter-spacing="1.2" fill="#f0c98e">★ ${esc(r.stars)}<tspan dx="14">⑂ ${esc(r.forks)}</tspan><tspan dx="14" fill="${r.lang.color}">●</tspan> ${esc(fit(r.lang.name, 120, 11, 0.66))}</text>
</g>`,
  );
};
