import { MONO, esc, fit, svg } from "../card.js";

export const about = "Instant photo: a sunset scene in the language colour and a hand-written caption. Shows no description.";

const HAND = "'Marker Felt', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

// A white instant-photo frame with a thick bottom, taped to a desk; the photo is a hills-and-sun scene.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".7" stop-color="#fff" stop-opacity=".35"/></linearGradient>
  <radialGradient id="sun"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".4" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <clipPath id="photo"><rect x="20" y="16" width="360" height="88"/></clipPath>
  <filter id="shadow" x="-5%" y="-10%" width="110%" height="130%"><feDropShadow dy="2" stdDeviation="2.5" flood-opacity=".25"/></filter>
</defs>
<rect width="400" height="150" rx="8" fill="#e6e0d6"/>
<rect x="8" y="5" width="384" height="140" rx="2" fill="#fdfdfb" filter="url(#shadow)"/>
<g clip-path="url(#photo)">
  <rect x="20" y="16" width="360" height="88" fill="${r.lang.color}"/>
  <rect x="20" y="16" width="360" height="88" fill="url(#sky)"/>
  <circle cx="290" cy="64" r="40" fill="url(#sun)"/>
  <path d="M20 80Q90 52 160 76T300 72T380 78V104H20Z" fill="#000" fill-opacity=".28"/>
  <path d="M20 94Q120 74 220 92T380 88V104H20Z" fill="#000" fill-opacity=".5"/>
  <rect x="20" y="16" width="360" height="88" fill="none" stroke="#000" stroke-opacity=".15"/>
  <text x="372" y="98" font-family="${MONO}" font-size="10" font-weight="700" fill="#ff9a3c" stroke="#1a1208" stroke-opacity=".6" stroke-width="2.5" paint-order="stroke" text-anchor="end">★${esc(r.stars)} ⑂${esc(r.forks)}</text>
</g>
<rect x="176" y="-3" width="48" height="16" fill="#efe6c6" fill-opacity=".85" transform="rotate(-4 200 5)"/>
<g font-family="${HAND}" fill="#23324d">
  <text x="28" y="132" font-size="20">${esc(fit(r.name, 248, 20, 0.56))}</text>
  <text x="372" y="132" font-size="13" fill="#5a6475" text-anchor="end">${esc(fit(r.lang.name, 84, 13, 0.56))}</text>
</g>`,
  );
