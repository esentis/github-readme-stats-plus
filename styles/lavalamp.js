// Lava lamp: a glowing glass lamp where warm wax blobs in the language colour rise, merge and sink.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Lava lamp glowing in the language colour; gooey wax blobs rise, merge and sink inside the glass.";

const X = 326;
const GLASS = `M${X - 14} 22L${X - 26} 84Q${X - 28} 96 ${X - 22} 104H${X + 22}Q${X + 28} 96 ${X + 26} 84L${X + 14} 22Z`;

// Blobs are plain circles under a goo filter (blur + alpha threshold), so they merge as they pass; the glass clips the group around it.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const blobs = Array.from({ length: 7 }, (_, i) => {
    const [x, rad, dur] = [X - 9 + rnd() * 18, 5 + rnd() * 5, 11 + rnd() * 9];
    return `<circle class="ll-${"abc"[i % 3]}" cx="${x.toFixed(1)}" cy="${98 - rad / 2}" r="${rad.toFixed(1)}" style="transform-origin:${x.toFixed(1)}px 98px;animation-duration:${dur.toFixed(1)}s;animation-delay:${(-rnd() * dur).toFixed(1)}s"/>`;
  }).join("");
  return svg(
    r.name,
    `${motion(`.ll-a, .ll-b, .ll-c { animation: ll-a 14s ease-in-out infinite } .ll-b { animation-name: ll-b } .ll-c { animation-name: ll-c } .ll-glow { animation: ll-glow 7s ease-in-out infinite }
@keyframes ll-a { 50% { transform: translate(4px, -68px) scale(.85, 1.15) } } @keyframes ll-b { 50% { transform: translate(-5px, -54px) scale(1.1, .9) } } @keyframes ll-c { 50% { transform: translate(2px, -40px) } } @keyframes ll-glow { 50% { opacity: .35 } }`)}
<defs>
  <clipPath id="ll-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <clipPath id="ll-in"><path d="${GLASS}"/></clipPath>
  <linearGradient id="ll-bg" x2="1"><stop offset="0" stop-color="#0d0910"/><stop offset="1" stop-color="#1a1018"/></linearGradient>
  <linearGradient id="ll-wax" gradientUnits="userSpaceOnUse" y1="104" x2="0" y2="22"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="ll-metal" x2="1"><stop offset="0" stop-color="#2a2730"/><stop offset=".35" stop-color="#8d8996"/><stop offset=".55" stop-color="#4a4652"/><stop offset="1" stop-color="#1c1a21"/></linearGradient>
  <linearGradient id="ll-shine" x2="1"><stop offset=".08" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#fff" stop-opacity=".35"/><stop offset=".34" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset=".9" stop-color="#fff" stop-opacity=".12"/></linearGradient>
  <filter id="ll-goo" filterUnits="userSpaceOnUse" x="${X - 30}" y="10" width="60" height="100"><feGaussianBlur stdDeviation="3.5"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 22 -9"/></filter>
  <filter id="ll-blur" filterUnits="userSpaceOnUse" x="200" y="-60" width="260" height="270"><feGaussianBlur stdDeviation="20"/></filter>
</defs>
<g clip-path="url(#ll-clip)">
  <rect width="400" height="150" fill="url(#ll-bg)"/>
  <ellipse class="ll-glow" cx="${X}" cy="70" rx="44" ry="62" fill="${c}" opacity=".55" filter="url(#ll-blur)"/>
  <ellipse cx="${X}" cy="146" rx="70" ry="7" fill="${c}" opacity=".35" filter="url(#ll-blur)"/>
</g>
<path d="${GLASS}" fill="${c}"/>
<path d="${GLASS}" fill="#0b0710" fill-opacity=".62"/>
<g clip-path="url(#ll-in)">
  <ellipse cx="${X}" cy="108" rx="34" ry="22" fill="${c}" opacity=".55" filter="url(#ll-blur)"/>
  <g filter="url(#ll-goo)" fill="${c}">
    <ellipse cx="${X}" cy="104" rx="24" ry="8"/>
    <ellipse cx="${X}" cy="22" rx="14" ry="5"/>
    ${blobs}
  </g>
  <rect x="${X - 30}" y="20" width="60" height="86" fill="url(#ll-wax)"/>
  <path d="${GLASS}" fill="url(#ll-shine)"/>
</g>
<path d="${GLASS}" fill="none" stroke="#fff" stroke-opacity=".28"/>
<path d="M${X - 12} 8H${X + 12}L${X + 14} 22H${X - 14}Z" fill="url(#ll-metal)"/>
<path d="M${X - 22} 104H${X + 22}L${X + 15} 118L${X + 30} 142H${X - 30}L${X - 15} 118Z" fill="url(#ll-metal)"/>
<path d="M${X - 22} 104.5H${X + 22}" stroke="${c}" stroke-opacity=".7"/>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="11" fill="#a3929c">${esc(fit(r.owner, 220, 11))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#fff4ef">${esc(fit(r.name, 236, 20))}</text>
  <text font-size="12.5" fill="#c4b3b9">${lines(wrap(r.description, 33), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#f6e9e6"', icon: 'fill="#a3929c"' }), 24, 16)}
</g>`,
  );
};
