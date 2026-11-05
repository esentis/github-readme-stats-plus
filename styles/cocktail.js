import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Cocktail bar menu: a coupe glass filled in the language colour with a citrus garnish and rising bubbles, the repo as the signature drink.";

const SERIF = "Georgia, 'Times New Roman', serif";
const BOWL = "M36 36H124C124 68 102 80 80 80C58 80 36 68 36 36Z";

// A dim bar with a coupe glass on the left and a gold-on-black menu entry on the right.
export default (r) => {
  const c = r.lang.color;
  const bubbles = [[64, 66, 0], [80, 72, -1.2], [94, 64, -2.4], [72, 58, -3.1]]
    .map(([x, y, d]) => `<circle class="ck-bub" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="1.6"/>`).join("");
  return svg(
    r.name,
    `<defs>
  <radialGradient id="spot" cx=".2" cy=".1" r=".8"><stop offset="0" stop-color="#3a2c3f"/><stop offset="1" stop-color="#111117"/></radialGradient>
  <linearGradient id="drink" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".95"/><stop offset="1" stop-color="${c}" stop-opacity=".7"/></linearGradient>
  <clipPath id="bowl"><path d="${BOWL}"/></clipPath>
</defs>
${motion(`.ck-bub{animation:ck-up 4s ease-in-out infinite}@keyframes ck-up{0%{transform:translateY(0);opacity:0}30%{opacity:.8}100%{transform:translateY(-16px);opacity:0}}
.ck-surf{animation:ck-slosh 6s ease-in-out infinite}@keyframes ck-slosh{0%,100%{transform:translateX(-2px)}50%{transform:translateX(2px)}}`)}
<rect width="400" height="150" rx="12" fill="url(#spot)"/>
<rect x="6" y="6" width="388" height="138" rx="9" fill="none" stroke="#c9a96e" stroke-opacity=".35"/>
<ellipse cx="80" cy="127" rx="44" ry="5" fill="#000" fill-opacity=".45"/>
<g clip-path="url(#bowl)">
  <rect x="30" y="44" width="100" height="40" fill="url(#drink)"/>
  <path class="ck-surf" d="M24 44q8-3 16 0t16 0t16 0t16 0t16 0t16 0t16 0V50H24Z" fill="#fff" fill-opacity=".28"/>
  <g fill="#fff">${bubbles}</g>
</g>
<path d="${BOWL}" fill="#fff" fill-opacity=".06" stroke="#e8e2d6" stroke-opacity=".75" stroke-width="1.4"/>
<path d="M44 42C46 58 56 68 66 72" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>
<path d="M77 80H83V118Q83 122 100 124H60Q77 122 77 118Z" fill="#e8e2d6" fill-opacity=".55"/>
<ellipse cx="80" cy="124" rx="22" ry="3.5" fill="#e8e2d6" fill-opacity=".6"/>
<g transform="translate(118 36) rotate(-25)"><circle r="12" fill="#f5c542"/><circle r="10" fill="#fbe38a"/>
  <path d="M0-10V10M-10 0H10M-7-7L7 7M-7 7L7-7" stroke="#f5c542" stroke-width="1.2"/><rect x="-14" y="-1" width="4" height="2" fill="#111117"/></g>
<g font-family="${SERIF}">
  <text x="164" y="34" font-family="${FONT}" font-size="8.5" font-weight="700" letter-spacing="3" fill="#c9a96e">SIGNATURE COCKTAIL</text>
  <text x="164" y="60" font-size="21" font-style="italic" fill="#f3ece0">${esc(fit(r.name, 216, 21, 0.52))}</text>
  <text font-size="11" font-style="italic" fill="#a59f95">${lines(wrap(r.description, 38), 164, 80, 14)}</text>
  <path d="M164 106H380" stroke="#c9a96e" stroke-opacity=".5" stroke-dasharray="1 3"/>
  <circle cx="168" cy="122" r="4" fill="${c}"/>
  <text x="178" y="126" font-family="${FONT}" font-size="11" fill="#d8d1c4">${esc(fit(r.lang.name, 100, 11))}</text>
  <text x="380" y="126" font-family="${FONT}" font-size="12" font-weight="700" fill="#c9a96e" text-anchor="end">★ ${esc(r.stars)}  ·  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
