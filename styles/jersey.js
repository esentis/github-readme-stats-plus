import { FONT, esc, fit, isLight, svg } from "../card.js";

export const about = "Sports jersey in the language colour: repo name across the shoulders, star count as a stitched number. Shows no description.";

const SHIRT = "M170 10L125 22L76 44L96 82L125 68V152H275V68L304 82L324 44L275 22L230 10Q200 34 170 10Z";

// A mesh sports jersey in the language colour with a two-tone tackle-twill star number.
export default (r) => {
  const trim = isLight(r.lang.color) ? "#1b1b1f" : "#fff";
  const size = Math.min(62, Math.floor(130 / (r.stars.length * 0.62)));
  const num = (a) => `<text x="200" y="${70 + size * 0.72}" font-size="${size}" text-anchor="middle" ${a}>${esc(r.stars)}</text>`;
  return svg(
    r.name,
    `<defs>
  <radialGradient id="bg" cy="0" r="1"><stop offset="0" stop-color="#2b3445"/><stop offset="1" stop-color="#10141c"/></radialGradient>
  <pattern id="mesh" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1" fill="#000" fill-opacity=".22"/></pattern>
  <linearGradient id="fold" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".2" stop-opacity="0"/><stop offset=".8" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
  <clipPath id="shirt"><path d="${SHIRT}"/></clipPath>
  <path id="arc" d="M128 52Q200 36 272 52"/>
</defs>
<rect width="400" height="150" rx="12" fill="url(#bg)"/>
<path d="${SHIRT}" fill="${r.lang.color}"/>
<g clip-path="url(#shirt)">
  <rect width="400" height="150" fill="url(#mesh)"/><rect x="76" width="248" height="150" fill="url(#fold)"/>
  <g stroke="${trim}" stroke-width="5"><path d="M78 48L98 86M322 48L302 86"/></g>
  <path d="M170 10Q200 34 230 10" fill="none" stroke="${trim}" stroke-width="6"/>
</g>
<g font-family="${FONT}" font-weight="800">
  <text font-size="12.5" fill="${trim}" letter-spacing="1.5"><textPath href="#arc" startOffset="50%" text-anchor="middle">${esc(fit(r.name.toUpperCase(), 136, 12.5, 0.72))}</textPath></text>
  ${num(`fill="${trim}" stroke="${trim}" stroke-width="9" stroke-linejoin="round"`)}
  ${num(`fill="${trim}" stroke="${r.lang.color}" stroke-width="4" stroke-linejoin="round"`)}
  ${num(`fill="none" stroke="${r.lang.color}" stroke-width=".8" stroke-dasharray="2 1.5" opacity=".9"`)}
  <text x="200" y="142" font-size="8" fill="${trim}" text-anchor="middle" letter-spacing="2">★ STARS</text>
  <g font-size="9" fill="#8b95a7" letter-spacing="1.5"><text x="20" y="108">LANGUAGE</text><text x="380" y="108" text-anchor="end">FORKS</text></g>
  <circle cx="25" cy="125" r="5" fill="${r.lang.color}"/>
  <text x="35" y="130" font-size="13" fill="#fff">${esc(fit(r.lang.name, 84, 13))}</text>
  <text x="380" y="130" font-size="14" fill="#fff" text-anchor="end">⑂ ${esc(r.forks)}</text>
  <text x="20" y="26" font-size="10" fill="#8b95a7">${esc(fit("@" + r.owner, 90, 10))}</text>
</g>`,
  );
};
