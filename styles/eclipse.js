// Eclipse: a total solar eclipse with a breathing, language-tinted corona and an occasional diamond-ring flash; minimalist type.
import { FONT, esc, fit, lines, motion, row, rng, stats, svg, wrap } from "../card.js";

export const about = "Total solar eclipse: a black disc ringed by a shimmering corona tinted with the language colour, a diamond-ring flash now and then.";

const CX = 316, CY = 75, D = 29;
const DX = (CX + Math.cos(-0.9) * D).toFixed(1), DY = (CY + Math.sin(-0.9) * D).toFixed(1);

export default (r) => {
  const c = r.lang.color, rand = rng(r.name);
  // Coronal streamers: tapered petals rooted under the disc, angles and lengths seeded by the repo name.
  const streamers = (n, from) => Array.from({ length: n }, (_, i) => {
    const a = ((i + from / 2) / n) * 360 + rand() * 18, len = 26 + rand() * 30, w = 4 + rand() * 5;
    return `<path transform="translate(${CX} ${CY}) rotate(${a.toFixed(1)}) translate(0 ${-D + 4})" d="M${-w} 0Q${(-w * 0.35).toFixed(1)} ${(-len * 0.5).toFixed(1)} 0 ${(-len).toFixed(1)}Q${(w * 0.35).toFixed(1)} ${(-len * 0.5).toFixed(1)} ${w} 0Z"/>`;
  }).join("");
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 11.5) } }, { cy: 126, size: 11.5, text: 'fill="#e7e9ef"', icon: 'fill="#6f7585"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="ec-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="ec-bg" cx=".79" cy=".5" r=".75"><stop offset="0" stop-color="#11131d"/><stop offset="1" stop-color="#030409"/></radialGradient>
  <radialGradient id="ec-halo" gradientUnits="userSpaceOnUse" cx="${CX}" cy="${CY}" r="86"><stop offset=".33" stop-color="#fff" stop-opacity=".95"/><stop offset=".4" stop-color="${c}" stop-opacity=".55"/><stop offset=".55" stop-color="${c}" stop-opacity=".2"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
  <linearGradient id="ec-ray" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity="0"/><stop offset=".55" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity=".8"/></linearGradient>
  <radialGradient id="ec-spark"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <filter id="ec-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="ec-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
${motion(`.ec-a,.ec-b,.ec-ring{transform-origin:${CX}px ${CY}px}.ec-a{animation:ec-breathe 7s ease-in-out infinite}.ec-b{animation:ec-breathe 9s ease-in-out -4s infinite}
.ec-ring{animation:ec-flash 10s ease-in-out infinite}.ec-halo{animation:ec-shim 5s ease-in-out infinite alternate}
@keyframes ec-breathe{50%{transform:scale(1.07) rotate(2deg);opacity:.6}}@keyframes ec-shim{to{opacity:.75}}
@keyframes ec-flash{0%,78%{opacity:0;transform:scale(.6)}86%{opacity:1;transform:scale(1)}94%,100%{opacity:0;transform:scale(.8)}}`)}
<g clip-path="url(#ec-clip)">
  <rect width="400" height="150" fill="url(#ec-bg)"/>
  <g fill="#fff" opacity=".45"><circle cx="232" cy="16" r=".6"/><circle cx="388" cy="22" r=".7"/><circle cx="376" cy="132" r=".6"/><circle cx="246" cy="134" r=".5"/><circle cx="204" cy="40" r=".5"/><circle cx="150" cy="10" r=".5"/></g>
  <circle class="ec-halo" cx="${CX}" cy="${CY}" r="86" fill="url(#ec-halo)"/>
  <g class="ec-a" fill="url(#ec-ray)" filter="url(#ec-soft)">${streamers(9, 0)}</g>
  <g class="ec-b" fill="url(#ec-ray)" filter="url(#ec-soft)" opacity=".8">${streamers(9, 1)}</g>
  <circle cx="${CX}" cy="${CY}" r="${D + 1}" fill="none" stroke="#fff" stroke-width="2.5" filter="url(#ec-glow)"/>
  <circle cx="${CX}" cy="${CY}" r="${D}" fill="#000"/>
  <circle cx="${CX}" cy="${CY}" r="${D}" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width=".8"/>
  <g class="ec-ring" opacity="0" style="transform-origin:${DX}px ${DY}px">
    <circle cx="${DX}" cy="${DY}" r="13" fill="url(#ec-spark)"/>
    <path d="M${DX - 24} ${DY}H${+DX + 24}M${DX} ${DY - 20}V${+DY + 20}" stroke="#fff" stroke-opacity=".8" stroke-width=".8"/>
    <circle cx="${DX}" cy="${DY}" r="2.6" fill="#fff"/>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".09"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9" font-weight="600" letter-spacing="3" fill="#8b92a4">TOTALITY · ${esc(fit(r.owner.toUpperCase(), 120, 9, 0.9))}</text>
  <text x="24" y="58" font-size="22" font-weight="300" letter-spacing=".3" fill="#f5f6f8">${esc(fit(r.name, 200, 22, 0.58))}</text>
  <rect x="24" y="68" width="18" height="1.5" fill="${c}"/>
  <text font-size="11.5" fill="#9097a8">${lines(wrap(r.description, 29), 24, 88, 15)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
