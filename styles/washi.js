import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Washi paper and sumi ink: a brush stroke, a vertical language label and a red hanko seal with the star count.";

const SERIF = "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, 'Times New Roman', serif";

// Fibrous washi paper, an ink brush swash under the name and a red seal stamped at the right.
export default (r) =>
  svg(
    r.name,
    `${motion(".ws-brush{animation:ws-brush 8s ease-out infinite}@keyframes ws-brush{0%,65%,100%{clip-path:inset(-6px)}66%{clip-path:inset(-6px calc(100% + 6px) -6px -6px)}}")}
<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="6"/></clipPath>
  <filter id="fiber"><feTurbulence type="fractalNoise" baseFrequency=".02 .9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .47  0 0 0 0 .33  0 0 0 .5 -.12"/></filter>
  <filter id="rough" x="-10%" y="-30%" width="120%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".05 .7" numOctaves="2" seed="9"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
</defs>
<g clip-path="url(#clip)"><rect width="400" height="150" fill="#f4eddc"/><rect width="400" height="150" filter="url(#fiber)"/></g>
<rect x=".5" y=".5" width="399" height="149" rx="5.5" fill="none" stroke="#d8cdb4"/>
<line x1="38" y1="20" x2="38" y2="130" stroke="#c8322b" stroke-width="1.5"/>
<circle cx="24" cy="24" r="4" fill="${r.lang.color}"/>
<text font-family="${SERIF}" font-size="9" font-weight="700" fill="#3a332a" text-anchor="middle">${lines([...r.lang.name.toUpperCase().slice(0, 10)], 24, 42, 9.6)}</text>
<path class="ws-brush" d="M50 62C120 50 210 55 290 48C296 50 294 56 286 57C210 62 130 64 54 70C46 70 44 64 50 62Z" fill="#1b1a17" fill-opacity=".9" filter="url(#rough)"/>
<g font-family="${SERIF}">
  <text x="54" y="44" font-size="22" font-weight="700" fill="#1b1a17">${esc(fit(r.name, 236, 22, 0.56))}</text>
  <text font-size="12" fill="#4a4238">${lines(wrap(r.description, 38), 54, 90, 16)}</text>
  <text x="54" y="130" font-size="11" fill="#8a7d6a" letter-spacing="1">${esc(fit(r.owner, 150, 11))} · ⑂ ${esc(r.forks)}</text>
</g>
<g transform="translate(336 74) rotate(-6)">
  <rect x="-34" y="-34" width="68" height="68" rx="8" fill="#c8322b" fill-opacity=".92" filter="url(#rough)"/>
  <rect x="-28" y="-28" width="56" height="56" rx="4" fill="none" stroke="#f4eddc" stroke-width="2"/>
  <g font-family="${SERIF}" font-weight="700" fill="#f4eddc" text-anchor="middle">
    <text y="-5" font-size="17">★</text>
    <text y="19" font-size="${r.stars.length > 3 ? 16 : 20}">${esc(r.stars)}</text>
  </g>
</g>`,
  );
