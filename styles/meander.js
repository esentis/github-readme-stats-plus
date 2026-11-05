import { esc, fit, lines, svg, wrap } from "../card.js";

export const about = "Greek classical: white marble with soft veins, Greek key bands top and bottom, serif capitals.";

const ROMAN = "'Trajan Pro', Cinzel, 'Optima', Didot, Georgia, serif";
const INK = "#2f3e4e";

// Greek classical: marble, a meander band top and bottom, centred serif capitals.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <linearGradient id="marble" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfaf6"/><stop offset=".6" stop-color="#f1eee7"/><stop offset="1" stop-color="#e4e0d7"/></linearGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="1.2"/></filter>
  <pattern id="key" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 12.5H14M11 12.5V1.5H2V9H8V5H5" fill="none" stroke="${INK}" stroke-width="1.6"/></pattern>
</defs>
<rect width="400" height="150" rx="6" fill="url(#marble)"/>
<g fill="none" stroke="#a7a39a" filter="url(#soft)" opacity=".5">
  <path d="M-10 40C60 30 90 70 160 58S260 20 410 46"/>
  <path d="M40 160C80 120 150 130 210 104S330 90 410 70" stroke-width="2"/>
  <path d="M250 -5C270 30 300 40 340 60"/>
</g>
${[8, 128].map((y) => `<g transform="translate(11 ${y})"><rect width="378" height="14" fill="url(#key)"/><path d="M0 -2.5H378M0 16.5H378" stroke="${INK}" stroke-width="1.2"/></g>`).join("")}
<g font-family="${ROMAN}" text-anchor="middle" fill="${INK}">
  <text x="200" y="44" font-size="9.5" letter-spacing="3" fill="#7d7a72">${esc(fit(r.owner.toUpperCase(), 260, 9.5, 0.95))}</text>
  <text x="200" y="68" font-size="21" letter-spacing="2">${esc(fit(r.name.toUpperCase(), 340, 21, 0.82))}</text>
  <path d="M170 77H230" stroke="${r.lang.color}" stroke-width="2"/>
  <text font-size="11.5" font-style="italic" fill="#555">${lines(wrap(r.description, 58, 1), 200, 94, 14)}</text>
  <text x="200" y="114" font-size="10" letter-spacing="2">${esc(fit(r.lang.name.toUpperCase(), 120, 10, 0.95))}  ·  ★ ${esc(r.stars)}  ·  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
