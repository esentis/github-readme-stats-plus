// Prism: a white beam falls into a glass prism and leaves as a shimmering spectrum fan; dark backdrop, sleek type.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Glass prism on a dark backdrop splitting a falling white beam into a softly shimmering spectrum fan.";

const SPEC = ["#ff4d5e", "#ff9a3d", "#ffe04a", "#4bdc7b", "#3cc4ff", "#5a6bff", "#b25cff"];
const P = [336, 52], Q = [310, 98];
const fan = SPEC.map((c, i) => `<path class="pr-band" style="animation-delay:${(-i * 0.55).toFixed(2)}s" d="M${Q[0] - 4 + i * 1.6} ${Q[1]}L${236 + i * 16} 152H${253 + i * 16}Z" fill="${c}"/>`).join("");

export default (r) => {
  const c = r.lang.color;
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 11.5) } }, { cy: 126, size: 11.5, text: 'fill="#e6e8ee"', icon: 'fill="#7d8496"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="pr-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="pr-bg" cx=".78" cy=".55" r=".7"><stop offset="0" stop-color="#161a26"/><stop offset="1" stop-color="#05060a"/></radialGradient>
  <linearGradient id="pr-glass" x1="0" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="${c}" stop-opacity=".22"/></linearGradient>
  <linearGradient id="pr-fade" x2="0" y2="1"><stop offset=".25" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
  <mask id="pr-mask"><rect x="200" y="90" width="200" height="62" fill="url(#pr-fade)"/></mask>
  <filter id="pr-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="pr-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
</defs>
${motion(`.pr-band{animation:pr-shimmer 3.9s ease-in-out infinite}.pr-photon{animation:pr-photon 3s linear infinite}
@keyframes pr-shimmer{50%{opacity:.5}}@keyframes pr-photon{to{stroke-dashoffset:-150}}`)}
<g clip-path="url(#pr-clip)">
  <rect width="400" height="150" fill="url(#pr-bg)"/>
  <g mask="url(#pr-mask)"><g opacity=".7" filter="url(#pr-glow)">${fan}</g><g opacity=".8">${fan}</g></g>
  <ellipse cx="292" cy="152" rx="70" ry="10" fill="#fff" opacity=".06" filter="url(#pr-glow)"/>
  <path d="M410 2L${P}L${Q}" fill="none" stroke="#fff" stroke-width="7" stroke-opacity=".35" filter="url(#pr-soft)"/>
  <path d="M410 2L${P}" fill="none" stroke="#fff" stroke-width="2.2"/>
  <path d="M${P}L${Q}" fill="none" stroke="#fff" stroke-width="2.4" stroke-opacity=".5"/>
  <path class="pr-photon" d="M410 2L${P}L${Q}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 149" filter="url(#pr-soft)"/>
  <path d="M318 20L364 99H272Z" fill="url(#pr-glass)" stroke="#fff" stroke-opacity=".55" stroke-linejoin="round"/>
  <path d="M318 26L276 96" stroke="${c}" stroke-opacity=".75" stroke-width="1.4"/>
  <path d="M320 26L359 94" stroke="#fff" stroke-opacity=".35" stroke-width=".8"/>
  <path d="M276 99.5H364" stroke="#fff" stroke-opacity=".25" stroke-width="3" filter="url(#pr-soft)"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9" font-weight="600" letter-spacing="3" fill="#8b92a4">${esc(fit(r.owner.toUpperCase(), 196, 9, 0.9))}</text>
  <rect x="24" y="40" width="22" height="2" rx="1" fill="${c}"/>
  <text x="24" y="64" font-size="20" font-weight="600" letter-spacing=".2" fill="#f4f5f8">${esc(fit(r.name, 216, 20))}</text>
  <text font-size="11.5" fill="#8f96a7">${lines(wrap(r.description, 31), 24, 84, 15)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
