import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Velvet: deep jewel-tone pile with a slow drifting sheen, a gold-foil serif title and a gold tassel swaying from a twisted rope.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
// Emerald, ruby, sapphire, amethyst: [lit pile, shadowed pile]; the name picks one.
const JEWELS = [["#0f5a43", "#03140e"], ["#6e1230", "#170309"], ["#1d3680", "#050b22"], ["#4f1d70", "#12061c"]];
const ROPE = "M282 -8Q350 46 408 0";
// The rope's twist: slanted beads along the same quadratic curve.
const ROPE_TWIST = Array.from({ length: 44 }, (_, i) => {
  const t = i / 43, u = 1 - t, x = 282 * u * u + 700 * t * u + 408 * t * t, y = -8 * u * u + 92 * t * u;
  const a = (Math.atan2(92 * (1 - 2 * t) + 16 * u, 2 * (68 * u + 58 * t)) * 180) / Math.PI + 58;
  return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.6" ry="1.7" transform="rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
}).join("");

// Velvet card: lit pile top left, gold foil title, a tassel hanging from a rope across the top-right corner.
export default (r) => {
  const [hi, lo] = JEWELS[[...r.name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 4];
  const size = r.name.length > 16 ? 20 : 25;
  const threads = Array.from({ length: 11 }, (_, i) => `<path d="M${350.5 + i * 1.1} 66Q${349 + i * 1.6} 92 ${343.5 + i * 2.5} 112"/>`).join("");
  return svg(
    r.name,
    `${motion(".vv-sheen { animation: vv-sheen 12s ease-in-out infinite } @keyframes vv-sheen { 50% { transform: translate(170px, 18px) } } .vv-tassel { transform-origin: 356px 21px; animation: vv-swing 6s ease-in-out infinite } @keyframes vv-swing { 25% { transform: rotate(2.4deg) } 75% { transform: rotate(-2.4deg) } }")}
<defs>
  <clipPath id="vv-card"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="vv-pile" cx=".22" cy=".1" r="1.1"><stop offset="0" stop-color="${hi}"/><stop offset=".75" stop-color="${lo}"/></radialGradient>
  <radialGradient id="vv-light"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="vv-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbeec0"/><stop offset=".45" stop-color="#e2b65a"/><stop offset=".55" stop-color="#c3923c"/><stop offset="1" stop-color="#f1d58c"/></linearGradient>
  <linearGradient id="vv-goldh" x2="1"><stop offset="0" stop-color="#8a6220"/><stop offset=".4" stop-color="#f6dc95"/><stop offset="1" stop-color="#9c7128"/></linearGradient>
  <filter id="vv-noise"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .09 0"/></filter>
  <filter id="vv-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
<g clip-path="url(#vv-card)">
  <rect width="400" height="150" fill="url(#vv-pile)"/>
  <path d="M-20 150C60 96 120 140 210 84S330 70 420 30" stroke="#000" stroke-opacity=".22" stroke-width="40" fill="none" filter="url(#vv-soft)"/>
  <ellipse class="vv-sheen" cx="70" cy="40" rx="150" ry="90" fill="url(#vv-light)"/>
  <rect width="400" height="150" filter="url(#vv-noise)"/>
  <path d="${ROPE}" stroke="#000" stroke-opacity=".35" stroke-width="8" fill="none" transform="translate(1 4)" filter="url(#vv-soft)"/>
  <g class="vv-tassel">
    <ellipse cx="357" cy="112" rx="13" ry="3" fill="#000" opacity=".35" filter="url(#vv-soft)"/>
    <path d="M356 21V42" stroke="#b88a35" stroke-width="2.2"/>
    <path d="M349.5 64C348 82 344 98 342 112H370C368 98 364 82 362.5 64Z" fill="url(#vv-goldh)"/>
    <g stroke="#6d4a14" stroke-width=".6" stroke-opacity=".7" fill="none">${threads}</g>
    <circle cx="356" cy="51" r="8.5" fill="url(#vv-gold)"/>
    <path d="M349 60H363V66H349Z" fill="url(#vv-goldh)"/><path d="M349 62H363M349 64.4H363" stroke="#6d4a14" stroke-width=".5"/>
    <ellipse cx="353" cy="47.5" rx="2.6" ry="1.8" fill="#fff" opacity=".55"/>
  </g>
  <path d="${ROPE}" stroke="#5c3f10" stroke-width="7.5" fill="none" stroke-linecap="round"/>
  <g fill="url(#vv-gold)" stroke="#6d4a14" stroke-width=".4">${ROPE_TWIST}</g>
</g>
<rect x="6.5" y="6.5" width="387" height="137" rx="9" fill="none" stroke="#e2b65a" stroke-opacity=".38"/>
<g font-family="${FONT}">
  <text x="28" y="34" font-size="8.5" font-weight="600" letter-spacing="3" fill="#e2c27a" fill-opacity=".8">${esc(fit(`ATELIER ${r.owner.toUpperCase()}`, 250, 8.5, 0.95))}</text>
  <text x="27" y="${size > 21 ? 64 : 62}" font-family="${SERIF}" font-size="${size}" fill="url(#vv-gold)" stroke="#5c3f10" stroke-width=".35" stroke-opacity=".6">${esc(fit(r.name, 290, size, 0.58))}</text>
  <text font-family="${SERIF}" font-style="italic" font-size="12" fill="#efe3cc" fill-opacity=".82">${lines(wrap(r.description, 40), 28, 85, 15)}</text>
  <path d="M28 112H58" stroke="#e2b65a" stroke-opacity=".7"/><path d="M62 112l3 -3l3 3l-3 3z" fill="#e2b65a" fill-opacity=".8"/>
  <text x="28" y="134" font-size="11" font-weight="600" letter-spacing="1.2" fill="#ecd08d"><tspan>★ ${esc(r.stars)}</tspan><tspan dx="14">⑂ ${esc(r.forks)}</tspan><tspan dx="14" fill="${r.lang.color}">●</tspan> ${esc(fit(r.lang.name, 140, 11, 0.66))}</text>
</g>`,
  );
};
