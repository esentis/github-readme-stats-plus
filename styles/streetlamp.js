import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Rainy night street: rain glitters as it falls through a street lamp's cone of light, the puddle below shimmers and rings spread.";

const rnd = (i) => Math.abs(Math.sin(i * 91.7) * 43758.5) % 1;
// One 400×150 tile of rain, drawn twice (stacked) so it can fall one tile height seamlessly.
const DROPS = Array.from({ length: 96 }, (_, i) => {
  const x = rnd(i) * 420, y = rnd(i + 99) * 150, l = 6 + rnd(i + 7) * 6;
  return `M${x.toFixed(1)} ${y.toFixed(1)}l${(-l * 0.18).toFixed(1)} ${l.toFixed(1)}`;
}).join("");
const rain = (stroke, op, w) => `<g class="sl-r"><path d="${DROPS}" stroke="${stroke}" stroke-opacity="${op}" stroke-width="${w}" stroke-linecap="round"/><path transform="translate(0 -150)" d="${DROPS}" stroke="${stroke}" stroke-opacity="${op}" stroke-width="${w}" stroke-linecap="round"/></g>`;
const CONE = "M311 34H325L392 128H244Z";
const ripple = (x, y, d) => `<ellipse class="sl-rp" cx="${x}" cy="${y}" rx="7" ry="1.6" style="transform-origin:${x}px ${y}px;animation-delay:-${d}s"/>`;

// Lamp on the right with a person under a language-coloured umbrella; name and stats on the dark left.
export default (r) =>
  svg(
    r.name,
    `${motion(".sl-r{animation:sl-r 2.4s linear infinite}@keyframes sl-r{to{transform:translateY(150px)}}.sl-rp{animation:sl-rp 2.4s ease-out infinite}@keyframes sl-rp{0%{transform:scale(.2);opacity:.9}100%{transform:scale(1.4);opacity:0}}.sl-sh{animation:sl-sh 3.2s ease-in-out infinite;transform-origin:318px 140px}@keyframes sl-sh{0%,100%{transform:scaleX(1);opacity:.9}50%{transform:scaleX(.7);opacity:.55}}")}
<defs>
  <clipPath id="sl-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="sl-cone"><path d="${CONE}"/></clipPath>
  <clipPath id="sl-pud"><ellipse cx="300" cy="140" rx="74" ry="7"/></clipPath>
  <linearGradient id="sl-bg" x2="0" y2="1"><stop offset="0" stop-color="#060a14"/><stop offset="1" stop-color="#141d33"/></linearGradient>
  <linearGradient id="sl-beam" x2="0" y2="1"><stop offset="0" stop-color="#ffd98f" stop-opacity=".55"/><stop offset="1" stop-color="#ffd98f" stop-opacity=".08"/></linearGradient>
  <radialGradient id="sl-halo"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".6"/><stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/></radialGradient>
  <radialGradient id="sl-pool"><stop offset="0" stop-color="#ffd98f" stop-opacity=".45"/><stop offset="1" stop-color="#ffd98f" stop-opacity="0"/></radialGradient>
  <linearGradient id="sl-calm" x2="1"><stop offset="0" stop-color="#070b16" stop-opacity=".75"/><stop offset=".6" stop-color="#070b16" stop-opacity=".5"/><stop offset="1" stop-color="#070b16" stop-opacity="0"/></linearGradient>
  <linearGradient id="sl-refl" x2="0" y2="1"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#sl-clip)">
  <rect width="400" height="150" fill="url(#sl-bg)"/>
  <path d="M150 128V70h34v-14h30v72ZM364 128V58h40v70Z" fill="#101829"/>
  <g fill="#e7b76a" opacity=".35"><rect x="158" y="80" width="5" height="7"/><rect x="198" y="64" width="5" height="7"/><rect x="198" y="92" width="5" height="7"/><rect x="376" y="70" width="5" height="7"/></g>
  ${rain("#9fb3d6", 0.24, 0.7)}
  <rect width="250" height="128" fill="url(#sl-calm)"/>
  <path d="${CONE}" fill="url(#sl-beam)"/>
  <g clip-path="url(#sl-cone)">${rain("#fff3d1", 0.95, 1)}</g>
  <rect y="128" width="400" height="22" fill="#0a101c"/><path d="M0 128.5H400" stroke="#2a3654"/>
  <ellipse cx="318" cy="130" rx="76" ry="7" fill="url(#sl-pool)"/>
  <ellipse cx="300" cy="140" rx="74" ry="7" fill="#162440"/>
  <g clip-path="url(#sl-pud)">
    <rect class="sl-sh" x="312" y="133" width="12" height="17" fill="url(#sl-refl)"/>
    <g fill="none" stroke="#ffe2a0" stroke-opacity=".6" stroke-width=".7">${ripple(262, 141, 0)}${ripple(338, 143, 0.8)}${ripple(296, 138, 1.6)}</g>
  </g>
  <circle cx="318" cy="26" r="40" fill="url(#sl-halo)"/>
  <rect x="316" y="34" width="4" height="96" fill="#1e2638"/><path d="M311 130h14l-2-6h-10Z" fill="#1e2638"/>
  <path d="M307 18h22l-4-6h-14ZM311 12l7-4l7 4Z" fill="#1e2638"/><path d="M310 18h16l-2 14h-12Z" fill="#ffe7ad"/><path d="M309 32h18v3h-18Z" fill="#1e2638"/>
  <g transform="translate(266 102)">
    <path d="M-3 4h6l1 18h-2.4l-1.6-12l-1.6 12h-2.4Z" fill="#141a2a"/><circle cy="1" r="2.8" fill="#141a2a"/>
    <path d="M0-6v8" stroke="#141a2a" stroke-width=".8"/>
    <path d="M-13-6a13 9 0 0 1 26 0q-3.2-2-6.5 0q-3.2-2-6.5 0q-3.2-2-6.5 0q-3.2-2-6.5 0Z" fill="${r.lang.color}"/>
    <path d="M-13-6a13 9 0 0 1 26 0" fill="none" stroke="#fff3d1" stroke-opacity=".35" stroke-width=".8"/>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <text x="22" y="38" font-size="20" font-weight="700" fill="#f2f5ff">${esc(fit(r.name, 216, 20))}</text>
  <text font-size="12" fill="#9eabc6">${lines(wrap(r.description, 30), 22, 58, 15)}</text>
  ${row(stats(r, { cy: 140, size: 12, text: 'fill="#e9eefc"', icon: 'fill="#9eabc6"' }), 22, 14)}
</g>`,
  );
