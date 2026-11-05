import { FONT, MONO, esc, fit, icon, motion, svg, textWidth, rng } from "../card.js";

export const about = "Slot machine: three reels with ★, ⑂ and a language-colour ball on the payline, a bulb-lit marquee, a lever and the stars as the jackpot.";

const SERIF = "Georgia, 'Times New Roman', serif";
// Reel symbols drawn around their centre: star, fork, language ball, seven, BAR, cherries.
const SYM = [
  () => `<text y="9" font-size="26" text-anchor="middle" fill="#eab308" stroke="#92400e" stroke-width=".6">★</text>`,
  () => icon("fork", -11, -11, 22, 'fill="#1f2937"'),
  (c) => `<circle r="10" fill="${c}" stroke="#000" stroke-opacity=".25"/><circle cx="-3" cy="-3" r="3" fill="#fff" fill-opacity=".55"/>`,
  () => `<text y="10" font-family="${SERIF}" font-size="28" font-weight="900" text-anchor="middle" fill="#dc2626">7</text>`,
  () => `<rect x="-17" y="-7" width="34" height="14" rx="2" fill="#111"/><text y="4" font-family="${FONT}" font-size="10" font-weight="800" text-anchor="middle" fill="#fff">BAR</text>`,
  () => `<path d="M-5 2C-4-6 0-10 6-11M6 3C5-4 5-8 6-11" stroke="#15803d" stroke-width="1.6" fill="none"/><circle cx="-5" cy="5" r="5.5" fill="#dc2626"/><circle cx="6" cy="6" r="5.5" fill="#b91c1c"/>`,
];

// A red-and-gold cabinet: marquee with the name, reels, a jackpot panel, the description on the coin strip and a lever.
export default (r) => {
  const rnd = rng(r.name);
  const reels = [0, 1, 2]
    .map((i) => {
      const x = 59 + i * 76;
      const strip = [Math.floor(rnd() * 6), i, Math.floor(rnd() * 6)].map((k, j) => `<g transform="translate(${x} ${53 + j * 30})">${SYM[k](r.lang.color)}</g>`).join("");
      return `<g class="sl-reel" style="animation-delay:${i * 0.25}s">${strip}</g>`;
    })
    .join("");
  const bulbs = (y) => Array.from({ length: 29 }, (_, i) => `<circle class="${i % 2 ? "sl-a" : "sl-b"}" cx="${19 + i * 12}" cy="${y}" r="2.2"/>`).join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="sl-body" x2="0" y2="1"><stop offset="0" stop-color="#8b1a1a"/><stop offset="1" stop-color="#3f0909"/></linearGradient>
  <linearGradient id="sl-reel" x2="0" y2="1"><stop offset="0" stop-color="#8d939c"/><stop offset=".3" stop-color="#fff"/><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#8d939c"/></linearGradient>
  <linearGradient id="sl-curve" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
  <linearGradient id="sl-chrome" x2="1"><stop offset="0" stop-color="#9ca3af"/><stop offset=".5" stop-color="#f8fafc"/><stop offset="1" stop-color="#6b7280"/></linearGradient>
  <radialGradient id="sl-knob" cx=".35" cy=".35"><stop offset="0" stop-color="#fca5a5"/><stop offset="1" stop-color="#b91c1c"/></radialGradient>
  <clipPath id="sl-win">${[0, 1, 2].map((i) => `<rect x="${24 + i * 76}" y="52" width="70" height="62"/>`).join("")}</clipPath>
</defs>
${motion(`.sl-reel{animation:sl-nudge 4s ease-in-out infinite}@keyframes sl-nudge{0%,70%,100%{transform:translateY(0)}76%{transform:translateY(5px)}82%{transform:translateY(-2px)}88%{transform:translateY(0)}}
.sl-a{animation:sl-blink 1.2s steps(1,end) infinite}.sl-b{animation:sl-blink 1.2s steps(1,end) -.6s infinite}@keyframes sl-blink{50%{opacity:.25}}`)}
<rect width="400" height="150" rx="12" fill="url(#sl-body)"/>
<rect x="3" y="3" width="394" height="144" rx="10" fill="none" stroke="#fbbf24" stroke-opacity=".6"/>
<rect x="12" y="8" width="350" height="32" rx="6" fill="#1c0606" stroke="#fbbf24" stroke-width="1.5"/>
<g fill="#fde68a">${bulbs(8)}${bulbs(40)}</g>
<text x="187" y="30" font-family="${SERIF}" font-size="16" font-weight="700" fill="#fde68a" text-anchor="middle" letter-spacing=".5">${esc(fit(r.name, 300, 16, 0.6))}</text>
<rect x="18" y="47" width="234" height="71" rx="6" fill="#111" stroke="#fbbf24" stroke-width="2"/>
<g clip-path="url(#sl-win)">${[0, 1, 2].map((i) => `<rect x="${24 + i * 76}" y="52" width="70" height="62" fill="url(#sl-reel)"/>`).join("")}${reels}<rect x="24" y="52" width="222" height="62" fill="url(#sl-curve)"/></g>
<path d="M21 83H249" stroke="#ef4444" stroke-width="1.5" stroke-opacity=".7"/><path d="M18 78l6 5-6 5zM252 78l-6 5 6 5z" fill="#ef4444"/>
<rect x="260" y="47" width="102" height="71" rx="6" fill="#1c0606" stroke="#fbbf24" stroke-width="1.5"/>
<g font-family="${MONO}" text-anchor="middle">
  <text x="311" y="61" font-size="8.5" font-weight="700" letter-spacing="2" fill="#fbbf24">JACKPOT</text>
  <rect x="268" y="66" width="86" height="22" rx="3" fill="#000"/>
  <text x="311" y="82" font-size="14" font-weight="700" fill="#ff3b30">${esc(fit(`★ ${r.stars}`, 80, 14))}</text>
  <text x="311" y="101" font-size="9.5" fill="#fde68a">${esc(fit(`⑂ ${r.forks} FREE SPINS`, 92, 9.5))}</text>
  <circle cx="${310 - textWidth(fit(r.lang.name, 76, 9.5), 9.5) / 2}" cy="110" r="3.5" fill="${r.lang.color}"/>
  <text x="316" y="113.5" font-size="9.5" fill="#fde68a">${esc(fit(r.lang.name, 76, 9.5))}</text>
</g>
<rect x="12" y="124" width="350" height="18" rx="4" fill="#000" fill-opacity=".35"/>
<text x="187" y="137" font-family="${FONT}" font-size="10" fill="#fde68a" text-anchor="middle">${esc(fit(r.description, 330, 10, 0.55))}</text>
<rect x="372" y="86" width="20" height="30" rx="3" fill="url(#sl-chrome)"/>
<rect x="380.5" y="30" width="4" height="60" fill="url(#sl-chrome)"/>
<circle cx="382.5" cy="26" r="8" fill="url(#sl-knob)"/>`,
  );
};
