import { FONT, MONO, esc, fit, lines, motion, row, stats, svg, wrap, rng } from "../card.js";

export const about = "Arcade claw machine: a glass box of plush balls (the prize in the language colour), the claw slowly lowering toward it and a prize LED showing the stars.";

const PLUSH = ["#f9a8d4", "#a5f3fc", "#fde68a", "#c4b5fd", "#86efac", "#fdba74"];
// A plush ball: stitched seam and a soft highlight.
const ball = (x, y, c) =>
  `<g transform="translate(${x} ${y})"><circle r="10" fill="${c}" stroke="#000" stroke-opacity=".15"/><path d="M-7-2Q0 5 7-2" fill="none" stroke="#000" stroke-opacity=".25" stroke-dasharray="1.5 1.5"/><circle cx="-3.5" cy="-4" r="3" fill="#fff" fill-opacity=".45"/></g>`;

// A pink cabinet on dark purple: glass box with the claw over the prize, controls and prize LED below, details to the right.
export default (r) => {
  const rnd = rng(r.name);
  const pick = () => PLUSH[Math.floor(rnd() * PLUSH.length)];
  const pile = [36, 55, 74, 93, 112, 131, 150].map((x) => ball(x, 99, pick())).join("") + [46, 65, 84, 122, 141].map((x) => ball(x, 83, pick())).join("") + ball(103, 82, r.lang.color);
  return svg(
    r.name,
    `<defs>
  <linearGradient id="cm-cab" x2="0" y2="1"><stop offset="0" stop-color="#f472b6"/><stop offset="1" stop-color="#be185d"/></linearGradient>
  <radialGradient id="cm-glow" cx=".22" cy=".5" r=".45"><stop offset="0" stop-color="#db2777" stop-opacity=".35"/><stop offset="1" stop-color="#db2777" stop-opacity="0"/></radialGradient>
  <clipPath id="cm-glass"><rect x="26" y="38" width="134" height="72"/></clipPath>
</defs>
${motion(`.cm-claw{animation:cm-claw 8s ease-in-out infinite}@keyframes cm-claw{0%,15%,85%,100%{transform:translateY(0)}45%,55%{transform:translateY(12px)}}`)}
<rect width="400" height="150" rx="12" fill="#1e1036"/>
<rect width="400" height="150" rx="12" fill="url(#cm-glow)"/>
<rect x="16" y="6" width="154" height="138" rx="10" fill="url(#cm-cab)"/>
<text x="93" y="22" font-family="${FONT}" font-size="9" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1.5">★ CATCH A STAR ★</text>
<rect x="26" y="30" width="134" height="80" rx="3" fill="#2a1747"/>
<g clip-path="url(#cm-glass)">
  ${pile}
  <g class="cm-claw">
    <path d="M103-40V46" stroke="#cbd5e1" stroke-width="1.2"/>
    <rect x="97" y="44" width="12" height="6" rx="2" fill="#e2e8f0"/>
    <path d="M99 50C91 54 91 61 96 65M103 50V63M107 50C115 54 115 61 110 65" fill="none" stroke="#e2e8f0" stroke-width="2.2" stroke-linecap="round"/>
  </g>
</g>
<rect x="26" y="34" width="134" height="4" fill="#94a3b8"/><rect x="96" y="32" width="14" height="8" rx="2" fill="#e2e8f0"/>
<path d="M30 30h22l-26 80v-30zM70 30h8l-30 80h-8z" fill="#fff" fill-opacity=".08"/>
<rect x="26" y="30" width="134" height="80" rx="3" fill="none" stroke="#fbcfe8" stroke-width="2"/>
<rect x="22" y="114" width="142" height="26" rx="4" fill="#9d174d"/>
<rect x="28" y="118" width="30" height="18" rx="3" fill="#1f0a17"/>
<ellipse cx="72" cy="133" rx="7" ry="2.5" fill="#111"/><path d="M72 133V122" stroke="#111" stroke-width="2"/><circle cx="72" cy="121" r="4" fill="#ef4444"/>
<circle cx="89" cy="128" r="5" fill="#facc15" stroke="#a16207"/>
<rect x="100" y="117" width="60" height="20" rx="3" fill="#12060e"/>
<g font-family="${MONO}" text-anchor="middle">
  <text x="130" y="124.5" font-size="5.5" letter-spacing="1" fill="#f9a8d4">PRIZE</text>
  <text x="130" y="134" font-size="9.5" font-weight="700" fill="#fde047">${esc(fit(`★ ${r.stars}`, 56, 9.5))}</text>
</g>
<g font-family="${FONT}">
  <circle cx="190" cy="27" r="4" fill="${r.lang.color}"/>
  <text x="199" y="31" font-size="9.5" font-weight="700" letter-spacing="1.5" fill="#f9a8d4">${esc(fit(`PRIZE CLAW · ${r.lang.name.toUpperCase()}`, 186, 9.5, 0.78))}</text>
  <text x="186" y="56" font-size="19" font-weight="700" fill="#fff">${esc(fit(r.name, 200, 19))}</text>
  <text font-size="11.5" fill="#ddd6fe">${lines(wrap(r.description, 29), 186, 78, 15)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#fff" font-weight="600"', icon: 'fill="#f9a8d4"' }).slice(1), 186, 14)}
</g>`,
  );
};
