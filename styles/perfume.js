import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Perfume: a faceted glass bottle filled with the language colour, light sweeping through the glass and a soft mist puff now and then; minimalist luxury type.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
const oct = (x0, y0, x1, y1, k) => [[x0 + k, y0], [x1 - k, y0], [x1, y0 + k], [x1, y1 - k], [x1 - k, y1], [x0 + k, y1], [x0, y1 - k], [x0, y0 + k]];
const OUT = oct(284, 58, 360, 138, 12), IN = oct(293, 67, 351, 129, 8);
const pts = (p) => p.map((q) => q.join(" ")).join(" ");
// One bevel per side between the outer and inner outline: white for lit sides, black for shaded ones.
const LIGHT = [".6", ".35", ".1", "0", "0", "0", ".3", ".55"], DARK = ["0", "0", ".12", ".25", ".28", ".2", "0", "0"];
const BEVELS = OUT.map((p, i) => {
  const j = (i + 1) % 8, d = `${pts([p, OUT[j], IN[j], IN[i]])}`;
  return `<polygon points="${d}" fill="#fff" fill-opacity="${LIGHT[i]}"/><polygon points="${d}" fill="#000" fill-opacity="${DARK[i]}"/>`;
}).join("");
const PUFFS = [[2, 0, 5.5], [9, -4, 5], [12, 4, 4.5], [18, -1, 6]].map(([x, y, s], i) => `<circle class="pf-mist" cx="${338 + x}" cy="${36 + y}" r="${s}" style="animation-delay:${i * 0.08}s" opacity="0"/>`).join("");

// Ivory backdrop, serif name on the left, a faceted bottle on the right with its coloured light pooled on the table.
export default (r) => {
  const c = r.lang.color;
  const size = r.name.length > 16 ? 20 : 26;
  return svg(
    r.name,
    `${motion(".pf-ray { animation: pf-ray 7s ease-in-out infinite } @keyframes pf-ray { 0% { transform: translateX(-100px) } 45%, 100% { transform: translateX(100px) } } .pf-mist { transform-origin: 334px 36px; animation: pf-mist 9s ease-out infinite } @keyframes pf-mist { 0%, 61% { opacity: 0; transform: scale(.3) } 66% { opacity: .9 } 90%, 100% { opacity: 0; transform: translate(12px, -4px) scale(1.5) } } .pf-pump { animation: pf-pump 9s ease-in-out infinite } @keyframes pf-pump { 0%, 58%, 68%, 100% { transform: none } 62%, 64% { transform: translateY(2px) } }")}
<defs>
  <clipPath id="pf-card"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="pf-in"><polygon points="${pts(IN)}"/></clipPath>
  <clipPath id="pf-glass"><polygon points="${pts(OUT)}"/></clipPath>
  <radialGradient id="pf-bg" cx=".8" cy=".45" r=".75"><stop offset="0" stop-color="#fffdf9"/><stop offset="1" stop-color="#ece3d7"/></radialGradient>
  <linearGradient id="pf-liq" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".7"/><stop offset="1" stop-color="${c}"/></linearGradient>
  <linearGradient id="pf-gold" x2="1"><stop offset="0" stop-color="#9b7430"/><stop offset=".35" stop-color="#f8e6b0"/><stop offset=".6" stop-color="#d1a855"/><stop offset="1" stop-color="#7f5c22"/></linearGradient>
  <linearGradient id="pf-vol" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".35" stop-color="#fff" stop-opacity=".12"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
  <linearGradient id="pf-beam" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <filter id="pf-mistblur" x="-50%" y="-80%" width="200%" height="260%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="pf-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
<g clip-path="url(#pf-card)"><rect width="400" height="150" fill="url(#pf-bg)"/>
  <ellipse cx="324" cy="139" rx="46" ry="4.5" fill="#4a3a2a" opacity=".25" filter="url(#pf-blur)"/>
  <ellipse cx="368" cy="140" rx="26" ry="4" fill="${c}" opacity=".35" filter="url(#pf-blur)"/></g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#dcd0c0"/>
<g filter="url(#pf-mistblur)" fill="${c}" fill-opacity=".5">${PUFFS}</g>
<g class="pf-pump"><rect x="314" y="29" width="16" height="17" rx="2.5" fill="url(#pf-gold)"/><path d="M314 33H330" stroke="#fff" stroke-opacity=".5"/><circle cx="330.5" cy="36.5" r="1" fill="#5a4018"/></g>
<rect x="315" y="50" width="14" height="12" fill="#e9e4dc" stroke="#c7bcae" stroke-width=".6"/>
<rect x="310" y="43" width="24" height="10" rx="1.5" fill="url(#pf-gold)"/><path d="M310 46.5H334M310 49.5H334" stroke="#6b4c1a" stroke-opacity=".35" stroke-width=".6"/>
<g clip-path="url(#pf-glass)">
  <rect x="280" y="55" width="90" height="90" fill="#fff" fill-opacity=".3"/>
  <rect x="280" y="80" width="90" height="60" fill="url(#pf-liq)" opacity=".6"/>
  <polygon points="${pts(IN)}" fill="#fff" fill-opacity=".12"/>
  <path d="M290 80H354V135H290Z" fill="url(#pf-liq)" clip-path="url(#pf-in)"/>
  ${BEVELS}
  <path d="M290 80H354V135H290Z" fill="url(#pf-vol)"/>
  <path d="M293 80.5H351" stroke="#fff" stroke-opacity=".7"/>
  <rect x="299" y="71" width="4.5" height="56" fill="#fff" fill-opacity=".45"/><rect x="343" y="73" width="1.5" height="52" fill="#fff" fill-opacity=".3"/>
  <path class="pf-ray" d="M318 54H342L316 140H292Z" fill="url(#pf-beam)"/>
</g>
<polygon points="${pts(OUT)}" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width=".8"/>
<polygon points="${pts(OUT)}" fill="none" stroke="#6d5c4a" stroke-opacity=".35" stroke-width=".6" transform="translate(.6 .6)"/>
<g font-family="${FONT}">
  <text x="28" y="32" font-size="8.5" font-weight="600" letter-spacing="4" fill="#a3907c">EAU DE PARFUM</text>
  <text x="27" y="${size > 21 ? 64 : 62}" font-family="${SERIF}" font-size="${size}" fill="#1f1a17">${esc(fit(r.name, 238, size, 0.58))}</text>
  <rect x="28" y="73" width="18" height="1" fill="${c}"/>
  <text font-size="11" fill="#7a6c60" letter-spacing=".2">${lines(wrap(r.description, 37), 28, 92, 15)}</text>
  <text x="28" y="133" font-size="9.5" font-weight="600" letter-spacing="2" fill="#3b332d">★ ${esc(r.stars)}<tspan dx="12">⑂ ${esc(r.forks)}</tspan><tspan dx="12" fill="${c}">●</tspan> ${esc(fit(r.lang.name.toUpperCase(), 110, 9.5, 0.85))}</text>
</g>`,
  );
};
