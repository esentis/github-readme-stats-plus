import { FONT, esc, fit, isLight, lines, motion, rng, svg, textWidth, wrap } from "../card.js";

export const about = "Inkwell: cream laid paper, an italic serif title with an ink flourish that writes itself again and again, a fountain pen, an inkwell and a wax seal holding the stars.";

const SERIF = "Baskerville, 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";
const INK = "#1d2b4a";

// Writing desk: title and flourish on the left, wax seal, pen and inkwell on the right.
export default (r) => {
  const rand = rng(r.name), c = r.lang.color, on = isLight(c) ? "#3b2a12" : "#fff";
  const size = r.name.length > 16 ? 21 : 26;
  const b = 28 + Math.min(textWidth(r.name, size, 0.5), 206);
  const seal = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * 2 * Math.PI, d = 17 + rand() * 1.8;
    return `${(266 + d * Math.cos(a)).toFixed(1)},${(116 + d * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return svg(
    r.name,
    `${motion(".ik-ink { stroke-dasharray: 700; animation: ik-write 9s linear infinite } @keyframes ik-write { 0%, 62% { stroke-dashoffset: 0; opacity: 1 } 67% { stroke-dashoffset: 0; opacity: 0 } 67.5% { stroke-dashoffset: 700; opacity: 0 } 68% { stroke-dashoffset: 700; opacity: 1 } 96%, 100% { stroke-dashoffset: 0; opacity: 1 } } .ik-pen { animation: ik-pen 9s ease-in-out infinite } @keyframes ik-pen { 0%, 60%, 74%, 100% { transform: none } 66% { transform: translate(-2px, 2.5px) } }")}
<defs>
  <clipPath id="ik-card"><rect width="400" height="150" rx="10"/></clipPath>
  <pattern id="ik-laid" width="30" height="2.4" patternUnits="userSpaceOnUse"><path d="M0 .6H30" stroke="#9c8558" stroke-opacity=".09" stroke-width=".7"/><path d="M15 0V2.4" stroke="#9c8558" stroke-opacity=".12" stroke-width=".9"/></pattern>
  <radialGradient id="ik-paper" cx=".4" cy=".4" r=".8"><stop offset="0" stop-color="#fbf4e3"/><stop offset=".7" stop-color="#f1e5c9"/><stop offset="1" stop-color="#e2d0a8"/></radialGradient>
  <radialGradient id="ik-wax" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
  <linearGradient id="ik-lacquer" x2="0" y2="1"><stop offset="0" stop-color="#3a4a45"/><stop offset=".3" stop-color="#11181a"/><stop offset="1" stop-color="#050708"/></linearGradient>
  <linearGradient id="ik-gold" x2="0" y2="1"><stop offset="0" stop-color="#f8e3a3"/><stop offset=".5" stop-color="#c9953e"/><stop offset="1" stop-color="#8a6322"/></linearGradient>
  <linearGradient id="ik-glass" x2="1"><stop offset="0" stop-color="#2a3a5c"/><stop offset=".3" stop-color="#3e5482"/><stop offset=".6" stop-color="#16213a"/><stop offset="1" stop-color="#0c1322"/></linearGradient>
  <filter id="ik-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2"/></filter>
</defs>
<g clip-path="url(#ik-card)">
  <rect width="400" height="150" fill="url(#ik-paper)"/><rect width="400" height="150" fill="url(#ik-laid)"/>
  <ellipse cx="352" cy="140" rx="34" ry="5" fill="#5a4320" opacity=".3" filter="url(#ik-blur)"/>
  <path d="M338 100Q336 92 342 90H358Q364 92 362 100L376 104V136Q376 141 371 141H327Q322 141 322 136V104Z" fill="url(#ik-glass)"/>
  <path d="M332 106H366V134H332Z" fill="#fff" fill-opacity=".07"/><path d="M332 106L338 101H360L366 106" fill="#fff" fill-opacity=".14"/>
  <path d="M326 106V134M335 108V132" stroke="#fff" stroke-opacity=".3" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M322 136H376" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>
  <path d="M322 104L338 100H362L376 104" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".8"/>
  <rect x="339" y="85" width="22" height="6" rx="1.5" fill="url(#ik-gold)"/>
  <ellipse cx="350" cy="85" rx="10" ry="2" fill="#0b1120"/>
  <g class="ik-pen">
    <path d="M0 0L150 0" transform="translate(305 86) rotate(-38)" stroke="#3c2a10" stroke-opacity=".28" stroke-width="12" stroke-linecap="round" filter="url(#ik-blur)"/>
    <g transform="translate(298 80) rotate(-38)">
      <path d="M0 0L19 -5.5Q24 0 19 5.5Z" fill="url(#ik-gold)" stroke="#7a5518" stroke-width=".5"/>
      <path d="M1.5 0H14" stroke="#5a3d10" stroke-width=".6"/><circle cx="14.5" cy="0" r="1.2" fill="#5a3d10"/>
      <rect x="20" y="-5" width="13" height="10" rx="2" fill="url(#ik-lacquer)"/>
      <rect x="33" y="-6.5" width="3.5" height="13" fill="url(#ik-gold)"/>
      <rect x="36" y="-6.5" width="130" height="13" rx="5" fill="url(#ik-lacquer)"/>
      <path d="M38 -3.8H160" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" stroke-linecap="round"/>
      <rect x="86" y="-6.5" width="2.5" height="13" fill="url(#ik-gold)"/>
    </g>
  </g>
  <polygon points="${seal}" fill="${c}" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
  <polygon points="${seal}" fill="url(#ik-wax)" stroke="#000" stroke-opacity=".15" stroke-linejoin="round"/>
  <circle cx="266" cy="116" r="12.5" fill="none" stroke="${on}" stroke-opacity=".4"/>
  <text x="266" y="112" font-family="${FONT}" font-size="8" text-anchor="middle" fill="${on}" fill-opacity=".85">★</text>
  <text x="266" y="123" font-family="${FONT}" font-size="9.5" font-weight="700" text-anchor="middle" fill="${on}">${esc(r.stars)}</text>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="9.5" fill="none" stroke="#cdb88c"/>
<g font-family="${SERIF}" fill="${INK}">
  <text x="28" y="28" font-size="11" font-style="italic" fill="#8a7556">${esc(fit(`from the desk of ${r.owner}`, 230, 11, 0.5))}</text>
  <text x="27" y="${size > 22 ? 56 : 55}" font-size="${size}" font-style="italic">${esc(fit(r.name, 240, size, 0.5))}</text>
  <path class="ik-ink" d="M30 68C70 63 ${b - 50} 75 ${b - 8} 67C${b + 6} 64 ${b + 8} 57 ${b} 57C${b - 8} 57 ${b - 6} 70 ${b + 12} 70C${b + 22} 70 ${b + 30} 65 ${b + 36} 61" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>
  <text font-size="12" fill="#4a4238">${lines(wrap(r.description, 31), 28, 92, 15)}</text>
  <text x="28" y="133" font-family="${FONT}" font-size="10.5" font-weight="600" letter-spacing="1" fill="#4a3d2a">⑂ ${esc(r.forks)}<tspan dx="12" fill="${c}">●</tspan> ${esc(fit(r.lang.name, 120, 10.5, 0.66))}</text>
</g>`,
  );
};
