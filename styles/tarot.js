import { esc, fit, lines, svg, textWidth, wrap } from "../card.js";

export const about = "Tarot card on its side: deep navy, thin gold frame, a sun in the language colour and the star count in roman numerals.";

const SERIF = "'Cormorant Garamond', 'Palatino Linotype', Palatino, Georgia, serif";
const GOLD = "#d9b45a";

const roman = (n) =>
  [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]]
    .reduce((s, [v, l]) => { while (n >= v) { s += l; n -= v; } return s; }, "") || "0";

const corner = (t) => `<path transform="${t}" d="M14 26V14H26M18 22l4-4" fill="none" stroke="${GOLD}"/>`;

// A sideways tarot card; 4000+ stars use a vinculum (bar over the thousands) to keep the numeral short.
export default (r) => {
  const big = r.starCount >= 4000;
  const num = roman(big ? Math.round(r.starCount / 1000) : r.starCount);
  const w = textWidth(num, 17, 0.72);
  const rays = Array.from({ length: 12 }, (_, i) => `<path transform="rotate(${i * 30})" d="M0 -22L3 -32L0 -40L-3 -32Z"/>`).join("");
  return svg(
    r.name,
    `<defs><radialGradient id="sky" cx=".2"><stop offset="0" stop-color="#1d2a5c"/><stop offset="1" stop-color="#0b1130"/></radialGradient></defs>
<rect width="400" height="150" rx="10" fill="url(#sky)"/>
<rect x="7" y="7" width="386" height="136" rx="5" fill="none" stroke="${GOLD}" stroke-width="1.2"/>
<rect x="11" y="11" width="378" height="128" rx="3" fill="none" stroke="${GOLD}" stroke-width=".5"/>
${corner("")}${corner("matrix(-1 0 0 1 400 0)")}${corner("matrix(1 0 0 -1 0 150)")}${corner("rotate(180 200 75)")}
<path d="M138 26V124" stroke="${GOLD}" stroke-width=".5"/>
<g transform="translate(74 72)" fill="${GOLD}">
  <g>${rays}<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite"/></g>
  <circle r="18" fill="${r.lang.color}" stroke="${GOLD}" stroke-width="1.5"/>
  <path d="M36 -46a10 10 0 1 0 8 15a8 8 0 1 1 -8 -15Z"/>
  <path d="M-42 38l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z"><animate attributeName="opacity" values="1;.3;1" dur="3s" repeatCount="indefinite"/></path>
  <path d="M-46 -42l1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"><animate attributeName="opacity" values=".3;1;.3" dur="4s" repeatCount="indefinite"/></path>
</g>
<g font-family="${SERIF}" text-anchor="middle">
  <text x="264" y="40" font-size="17" fill="${GOLD}" letter-spacing="2">${num}</text>
  ${big ? `<path d="M${264 - w / 2} 25H${264 + w / 2}" stroke="${GOLD}" stroke-width="1.2"/>` : ""}
  <text x="264" y="70" font-size="18" font-weight="700" fill="#f3e6c4" letter-spacing="1.5">${esc(fit(r.name.toUpperCase(), 224, 18, 0.72))}</text>
  <text font-size="12" font-style="italic" fill="#b9c0de">${lines(wrap(r.description, 36), 264, 90, 15)}</text>
  <text x="264" y="130" font-size="11" fill="${GOLD}" letter-spacing="1">★ ${esc(r.stars)}  ·  ⑂ ${esc(r.forks)}  ·  ${esc(fit(r.lang.name, 90, 11))}</text>
</g>`,
  );
};
