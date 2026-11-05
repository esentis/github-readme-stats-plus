import { MONO, esc, fit, svg } from "../card.js";

export const about = "Arcade cabinet marquee: chrome trim, a backlit glow in the language colour and the stars as credits. Shows no description.";

const IMPACT = "Impact, 'Arial Black', 'Helvetica Neue', sans-serif";
const OUTLINE = 'stroke="#12061f" stroke-linejoin="round" paint-order="stroke"';

// A backlit marquee with sunburst rays behind a chrome-edged bold italic title and a blinking credits counter.
export default (r) => {
  const name = r.name.toUpperCase();
  const size = Math.round(Math.max(22, Math.min(40, 340 / (name.length * 0.52))));
  const rays = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    const b = a + Math.PI / 36;
    const p = (t) => `${(200 + Math.cos(t) * 300).toFixed(1)} ${(80 + Math.sin(t) * 300).toFixed(1)}`;
    return `<path d="M200 80L${p(a)}L${p(b)}Z"/>`;
  }).join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="chrome" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f9"/><stop offset=".3" stop-color="#7d8590"/><stop offset=".5" stop-color="#e3e7ec"/><stop offset=".75" stop-color="#555c66"/><stop offset="1" stop-color="#c9ced6"/></linearGradient>
  <radialGradient id="back" cy=".55" r=".7"><stop offset="0" stop-color="${r.lang.color}"/><stop offset=".6" stop-color="${r.lang.color}" stop-opacity=".35"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity="0"/></radialGradient>
  <linearGradient id="title" x2="0" y2="1"><stop offset=".2" stop-color="#fff"/><stop offset=".55" stop-color="#ffe14a"/><stop offset="1" stop-color="#ff7a00"/></linearGradient>
  <clipPath id="glass"><rect x="12" y="12" width="376" height="126" rx="4"/></clipPath>
</defs>
<rect width="400" height="150" rx="10" fill="url(#chrome)"/>
<g clip-path="url(#glass)">
  <rect width="400" height="150" fill="#12061f"/>
  <rect width="400" height="150" fill="url(#back)"><animate attributeName="opacity" values="1;.85;1;1;.9;1" dur="4s" repeatCount="indefinite"/></rect>
  <g fill="#fff" fill-opacity=".07">${rays}</g>
</g>
<rect x="12.5" y="12.5" width="375" height="125" rx="4" fill="none" stroke="#000" stroke-opacity=".5"/>
<g font-family="${IMPACT}" text-anchor="middle" fill="#fff">
  <text x="200" y="36" font-size="11" letter-spacing="4" stroke-width="3" ${OUTLINE}>★ ${esc(fit(r.lang.name.toUpperCase(), 200, 11, 0.8))} ★</text>
  <text x="200" y="${82 + size / 3}" font-size="${size}" font-style="italic" letter-spacing="1" fill="url(#title)" stroke-width="6" ${OUTLINE}>${esc(fit(name, 344, size, 0.52))}</text>
</g>
<g font-family="${MONO}" font-size="11" font-weight="700" stroke-width="3" ${OUTLINE}>
  <text x="26" y="126" fill="#ffe14a">CREDITS ${esc(r.stars)}<animate attributeName="opacity" values="1;1;.2;1" keyTimes="0;.7;.85;1" dur="1.6s" repeatCount="indefinite"/></text>
  <text x="374" y="126" fill="#fff" text-anchor="end">⑂ ${esc(r.forks)} PLAYERS</text>
</g>`,
  );
};
