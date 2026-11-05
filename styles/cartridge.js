import { FONT, esc, fit, motion, svg } from "../card.js";

export const about = "Retro game cartridge: grey shell with grip ridges, a sunset label in the language colour and the name on a bold banner. Shows no description.";

const OUTLINE = 'stroke="#111" stroke-width="3" stroke-linejoin="round" paint-order="stroke"';

// A grey game cartridge seen from the front: ridged grips either side of a pixel-art label.
export default (r) => {
  const ridges = Array.from({ length: 12 }, (_, i) => `M12 ${30 + i * 8}H40M360 ${30 + i * 8}H388`).join("");
  const lang = fit(r.lang.name.toUpperCase(), 100, 11, 0.7);
  const stars = [[70, 62], [96, 76], [128, 60], [262, 64], [300, 80], [330, 58], [160, 72], [236, 74]]
    .map(([x, y], i) => `<rect class="ct-star" style="animation-delay:${(i * 0.45).toFixed(2)}s" x="${x}" y="${y}" width="2" height="2"/>`).join("");
  return svg(
    r.name,
    `${motion(".ct-star { animation: ct-star 3.6s ease-in-out infinite } @keyframes ct-star { 0%, 100% { opacity: 1 } 50% { opacity: .15 } }")}
<defs>
  <linearGradient id="shell" x2="0" y2="1"><stop offset="0" stop-color="#aeaeb6"/><stop offset="1" stop-color="#85858e"/></linearGradient>
  <linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="0" y2="110"><stop offset="0" stop-color="#1b1446"/><stop offset="1" stop-color="${r.lang.color}"/></linearGradient>
  <clipPath id="label"><rect x="50" y="14" width="300" height="108" rx="5"/></clipPath>
</defs>
<path d="M14 2H386L398 14V140Q398 148 390 148H10Q2 148 2 140V14Z" fill="url(#shell)"/>
<path d="M14 2H386L398 14" fill="none" stroke="#d4d4da" stroke-width="1.5"/>
<path d="${ridges}" stroke="#6e6e77" stroke-width="3" stroke-linecap="round"/>
<rect x="47" y="11" width="306" height="114" rx="7" fill="#76767f"/>
<g clip-path="url(#label)">
  <rect x="50" y="14" width="300" height="108" fill="url(#sky)"/>
  <g fill="#fff" opacity=".85">${stars}</g>
  <circle cx="200" cy="100" r="30" fill="#ffd23f"/>
  <g fill="url(#sky)"><rect x="160" y="88" width="80" height="3"/><rect x="160" y="95" width="80" height="4"/></g>
  <path d="M50 104L92 76L120 92L160 70L204 98L246 74L290 96L322 80L350 92V122H50Z" fill="#140d33"/>
  <rect x="50" y="104" width="300" height="18" fill="#f4f1e8"/>
</g>
<path d="M40 22H360L352 36L360 50H40L48 36Z" fill="#e63946" stroke="#111" stroke-width="2" stroke-linejoin="round"/>
<g font-family="${FONT}" font-weight="800">
  <text x="200" y="43" font-size="19" font-style="italic" fill="#fff" text-anchor="middle" ${OUTLINE}>${esc(fit(r.name.toUpperCase(), 290, 19, 0.68))}</text>
  <text x="58" y="117" font-size="11" fill="#1b1446">★ ${esc(r.stars)}   ⑂ ${esc(r.forks)}</text>
  <rect x="230" y="108" width="8" height="8" fill="${r.lang.color}" stroke="#1b1446"/>
  <text x="243" y="117" font-size="11" fill="#1b1446">${esc(lang)}</text>
  <text x="200" y="141" font-size="9" fill="#6c6c75" text-anchor="middle" letter-spacing="2" stroke="#c4c4cb" stroke-width=".6" paint-order="stroke">▼ ${esc(fit(r.owner.toUpperCase(), 200, 9, 0.85))} ▼</text>
</g>`,
  );
};
