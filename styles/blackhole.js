// A black hole: lensed photon ring and a streaming accretion disk tinted with the language colour, minimal light type.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Black hole with a glowing accretion disk in the language colour, light bent over its shadow; minimal type.";

const CX = 300, CY = 75;

export default (r) => {
  const c = r.lang.color;
  const back = `M${CX - 92} ${CY}A92 17 0 0 1 ${CX + 92} ${CY}`, front = `M${CX - 92} ${CY}A92 17 0 0 0 ${CX + 92} ${CY}`;
  return svg(
    r.name,
    `<defs>
  <linearGradient id="bh-disk" gradientUnits="userSpaceOnUse" x1="${CX - 92}" x2="${CX + 92}"><stop offset="0" stop-color="${c}" stop-opacity=".2"/><stop offset=".3" stop-color="${c}"/><stop offset=".45" stop-color="#fff"/><stop offset=".7" stop-color="${c}" stop-opacity=".8"/><stop offset="1" stop-color="${c}" stop-opacity=".1"/></linearGradient>
  <radialGradient id="bh-halo"><stop offset=".3" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
  <filter id="bh-glow" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="3.5"/></filter>
  <clipPath id="bh-clip"><rect width="400" height="150" rx="12"/></clipPath>
</defs>
${motion(`.bh-flow{animation:bh-flow 3s linear infinite}.bh-ring{animation:bh-ring 5s ease-in-out infinite}
@keyframes bh-flow{to{stroke-dashoffset:-24}}@keyframes bh-ring{50%{opacity:.55}}`)}
<g clip-path="url(#bh-clip)">
  <rect width="400" height="150" fill="#020204"/>
  <g fill="#fff" fill-opacity=".5"><circle cx="40" cy="18" r=".6"/><circle cx="160" cy="138" r=".7"/><circle cx="380" cy="20" r=".8"/><circle cx="230" cy="130" r=".6"/><circle cx="210" cy="22" r=".5"/><circle cx="388" cy="128" r=".6"/></g>
  <circle cx="${CX}" cy="${CY}" r="78" fill="url(#bh-halo)"/>
  <path d="${back}" fill="none" stroke="url(#bh-disk)" stroke-width="9" filter="url(#bh-glow)"/>
  <path d="${back}" fill="none" stroke="url(#bh-disk)" stroke-width="3"/>
  <g class="bh-ring">
    <path d="M${CX - 38} ${CY}A38 40 0 0 1 ${CX + 38} ${CY}" fill="none" stroke="${c}" stroke-width="8" filter="url(#bh-glow)"/>
    <path d="M${CX - 37} ${CY}A37 39 0 0 1 ${CX + 37} ${CY}" fill="none" stroke="url(#bh-disk)" stroke-width="3.5"/>
    <path d="M${CX - 33} ${CY}A33 30 0 0 0 ${CX + 33} ${CY}" fill="none" stroke="${c}" stroke-opacity=".6" stroke-width="1.5"/>
  </g>
  <circle cx="${CX}" cy="${CY}" r="30" fill="#000"/>
  <circle cx="${CX}" cy="${CY}" r="30.5" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".8"/>
  <path d="${front}" fill="none" stroke="url(#bh-disk)" stroke-width="10" filter="url(#bh-glow)"/>
  <path d="${front}" fill="none" stroke="url(#bh-disk)" stroke-width="4"/>
  <path class="bh-flow" d="${front}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="4 8"/>
</g>
<g font-family="${FONT}">
  <text x="22" y="31" font-size="8.5" font-weight="600" fill="#6b7280" letter-spacing="3.5">EVENT HORIZON</text>
  <text x="22" y="57" font-size="20" font-weight="300" fill="#f5f5f5" letter-spacing=".3">${esc(fit(r.name, 180, 20, 0.58))}</text>
  <text x="22" y="73" font-size="10.5" fill="#8b8f99">${esc(fit(r.owner, 180, 10.5))}</text>
  <text font-size="10.5" fill="#a1a1aa">${lines(wrap(r.description, 29), 22, 94, 14)}</text>
  ${row(stats(r, { cy: 128, size: 11, text: 'fill="#d4d4d8"', icon: 'fill="#6b7280"' }), 22, 12)}
</g>`,
  );
};
