import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Fortune cookie on a red cloth with its paper slip pulled out: the description is the fortune, stars and forks the lucky numbers.";

const SERIF = "Georgia, 'Times New Roman', serif";

// A four-point twinkle centred on (x, y).
const twinkle = (x, y, s, d) =>
  `<path class="fc-tw" style="animation-delay:${d}s" transform="translate(${x} ${y}) scale(${s})" d="M0-6Q1-1 6 0Q1 1 0 6Q-1 1-6 0Q-1-1 0-6Z"/>`;

// A golden cookie on the left with a long fortune slip sliding out of its fold to the right.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <radialGradient id="cloth" cx=".3" cy=".4" r=".9"><stop offset="0" stop-color="#a8262c"/><stop offset="1" stop-color="#6e1519"/></radialGradient>
  <linearGradient id="cookie" x2=".6" y2="1"><stop offset="0" stop-color="#f3c674"/><stop offset="1" stop-color="#c98632"/></linearGradient>
  <filter id="drop" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dy="2" stdDeviation="2" flood-opacity=".35"/></filter>
</defs>
${motion(`.fc-tw{transform-box:fill-box;transform-origin:center;animation:fc-tw 3.6s ease-in-out infinite}
@keyframes fc-tw{0%,100%{opacity:.2;transform:scale(.6)}50%{opacity:1;transform:scale(1)}}`)}
<rect width="400" height="150" rx="12" fill="url(#cloth)"/>
<path d="M0 30H400M0 120H400" stroke="#f3c674" stroke-opacity=".12" stroke-width="6"/>
<text x="24" y="24" font-family="${FONT}" font-size="9" font-weight="700" letter-spacing="2" fill="#f7d9a6" fill-opacity=".8">${esc(fit(`A FORTUNE FOR ${r.owner.toUpperCase()}`, 300, 9, 0.8))}</text>
<path d="M62 50C80 36 112 38 126 58C134 70 128 84 116 90C110 78 92 64 62 50Z" fill="#c98632"/>
<g transform="rotate(-2 250 80)" filter="url(#drop)">
  <rect x="100" y="46" width="288" height="70" rx="2" fill="#fdfbf4"/>
  <g font-family="${SERIF}" fill="#3a2a22">
    <text x="128" y="64" font-family="${FONT}" font-size="13" font-weight="700">${esc(fit(r.name, 250, 13))}</text>
    <text font-size="10.5" font-style="italic">${lines(wrap(`“${r.description}”`, 44), 128, 80, 13)}</text>
    <text x="128" y="107" font-family="${FONT}" font-size="9" font-weight="700" letter-spacing="1" fill="#a8262c">LUCKY NUMBERS  ★ ${esc(r.stars)}  ⑂ ${esc(r.forks)}</text>
  </g>
</g>
<g filter="url(#drop)">
  <path d="M16 100C10 70 34 48 62 50C86 52 104 70 106 92C96 86 84 88 76 98C66 112 44 122 30 116C22 112 18 106 16 100Z" fill="url(#cookie)"/>
  <path d="M106 92C96 86 84 88 76 98C70 106 60 112 50 114" fill="none" stroke="#a96a22" stroke-width="2" stroke-linecap="round"/>
  <path d="M28 82C30 66 44 58 60 58" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="3.5" stroke-linecap="round"/>
</g>
<g fill="#d9a04f"><circle cx="40" cy="126" r="2"/><circle cx="56" cy="131" r="1.4"/><circle cx="26" cy="120" r="1.2"/></g>
<g fill="#ffe7a8">${twinkle(132, 32, 1, 0)}${twinkle(22, 50, 0.7, -1.2)}${twinkle(100, 128, 0.8, -2.4)}</g>
<circle cx="372" cy="132" r="4" fill="${r.lang.color}" stroke="#fdfbf4" stroke-opacity=".6"/>
<text x="362" y="136" font-family="${FONT}" font-size="10.5" font-weight="600" fill="#f7d9a6" text-anchor="end">${esc(fit(r.lang.name, 160, 10.5))}</text>`,
  );
