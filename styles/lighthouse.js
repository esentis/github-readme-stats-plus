// Lighthouse: a striped tower on dark rocks at dusk; its beam sweeps round (flashing as it faces you) while the sea glints.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Lighthouse on rocks at dusk with language-colour stripes; its beam sweeps round, flashing as it faces you, over a glinting sea.";

const LX = 342, LY = 33;
const GLINTS = [[236, 112, 14], [262, 118, 20], [300, 110, 10], [228, 124, 10], [250, 132, 24], [292, 141, 16], [180, 114, 10], [384, 116, 10]];

export default (r) => {
  const c = r.lang.color;
  // Tapered tower from y 40 (half width 7) to y 112 (half width 12), cut into five horizontal bands.
  const hw = (y) => 7 + ((y - 40) / 72) * 5;
  const bands = [40, 54.4, 68.8, 83.2, 97.6].map((y, i) => `<path d="M${LX - hw(y)} ${y}H${LX + hw(y)}L${LX + hw(y + 14.4)} ${y + 14.4}H${LX - hw(y + 14.4)}Z" fill="${i % 2 ? "#f3eee6" : c}"/>`).join("");
  const glints = GLINTS.map(([x, y, w], i) => `<path class="lh-g" style="animation-delay:${(-i * 0.45).toFixed(2)}s" d="M${x} ${y}h${w}"/>`).join("");
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 130, size: 12, text: 'fill="#f1ecf6"', icon: 'fill="#f5c28a"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="lh-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="lh-sky" x2="0" y2="1"><stop offset="0" stop-color="#121a3a"/><stop offset=".5" stop-color="#3a3366"/><stop offset=".82" stop-color="#b0647c"/><stop offset="1" stop-color="#f0a174"/></linearGradient>
  <linearGradient id="lh-sea" x2="0" y2="1"><stop offset="0" stop-color="#3a4170"/><stop offset=".25" stop-color="#1f2a52"/><stop offset="1" stop-color="#0b1230"/></linearGradient>
  <linearGradient id="lh-beam" gradientUnits="userSpaceOnUse" x1="${LX}" x2="${LX - 100}"><stop offset="0" stop-color="#fff4cc" stop-opacity=".75"/><stop offset="1" stop-color="#fff4cc" stop-opacity="0"/></linearGradient>
  <radialGradient id="lh-lamp"><stop offset="0" stop-color="#fff8dc"/><stop offset=".3" stop-color="#ffe29a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
  <linearGradient id="lh-shade" x2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a1030" stop-opacity=".45"/></linearGradient>
  <filter id="lh-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.5"/></filter>
</defs>
${motion(`.lh-beam{transform-origin:${LX}px ${LY}px;animation:lh-sweep 8s ease-in-out infinite}.lh-flash{transform-origin:${LX}px ${LY}px;animation:lh-flash 8s ease-in-out infinite}
.lh-g{animation:lh-glint 3.6s ease-in-out infinite}
@keyframes lh-sweep{50%{transform:scaleX(-1)}}@keyframes lh-flash{0%,17%,33%,100%{opacity:.6;transform:scale(1)}25%{opacity:1;transform:scale(1.7)}}@keyframes lh-glint{50%{opacity:.15}}`)}
<g clip-path="url(#lh-clip)">
  <rect width="400" height="150" fill="url(#lh-sky)"/>
  <g fill="#fff" opacity=".5"><circle cx="30" cy="12" r=".7"/><circle cx="122" cy="20" r=".6"/><circle cx="196" cy="8" r=".7"/><circle cx="270" cy="16" r=".5"/><circle cx="388" cy="10" r=".6"/></g>
  <rect y="104" width="400" height="46" fill="url(#lh-sea)"/>
  <path d="M0 104.5H400" stroke="#ffc59a" stroke-opacity=".5"/>
  <g stroke="#ffd9b5" stroke-width="1.5" stroke-linecap="round" opacity=".95" filter="url(#lh-blur)">${glints}</g>
  <path class="lh-beam" d="M${LX} ${LY - 2}L${LX - 100} ${LY - 13}V${LY + 15}L${LX} ${LY + 2}Z" fill="url(#lh-beam)"/>
  ${bands}
  <path d="M${LX - 7} 40H${LX + 7}L${LX + 12} 112H${LX - 12}Z" fill="url(#lh-shade)"/>
  <path d="M290 150L298 122Q306 108 320 112L330 104Q346 98 360 106L378 102Q394 104 404 116V150Z" fill="#141022"/>
  <path d="M298 122Q306 108 320 112L330 104Q346 98 360 106L378 102Q394 104 404 116" fill="none" stroke="#f0a174" stroke-opacity=".35"/>
  <rect x="${LX - 11}" y="38" width="22" height="3" rx="1" fill="#3b3350" stroke="#f0a174" stroke-opacity=".4" stroke-width=".6"/>
  <path d="M${LX - 6} 38V27H${LX + 6}V38" fill="#ffe7a6" stroke="#2a2338" stroke-width="1.2"/>
  <path d="M${LX - 8} 27Q${LX} 16 ${LX + 8} 27Z" fill="#3b3350" stroke="#f0a174" stroke-opacity=".4" stroke-width=".6"/><path d="M${LX} 21.5V16" stroke="#3b3350" stroke-width="1.4"/>
  <circle class="lh-flash" cx="${LX}" cy="${LY}" r="18" fill="url(#lh-lamp)" opacity=".6"/>
  <rect x="${LX - 5}" y="${LY + 39}" width="4" height="6" rx="1" fill="#2a2338" opacity=".7"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".12"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#a7a3cf">${esc(fit(r.owner.toUpperCase(), 190, 9.5, 0.78))}</text>
  <text x="24" y="54" font-size="20" font-weight="700" fill="#fff">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="12" fill="#dcd4ec">${lines(wrap(r.description, 28), 24, 75, 16)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
