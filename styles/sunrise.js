// Sunrise: a dawn sky glowing out from the sun over layered hills; the sun slowly lifts and breathes while birds flap past.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Dawn over layered hills: a radiant gradient sky, the sun slowly lifting and breathing, a few birds on the wing.";

const SX = 318, SY = 101;
const bird = (x, y, s, d) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="sr-wing" style="animation-delay:${d}s" d="M-7 -1Q-3.5 -5 0 0Q3.5 -5 7 -1"/></g>`;

export default (r) => {
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 129, size: 12, text: 'fill="#fff"', icon: 'fill="#f6b8c8"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="sr-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="sr-sky" gradientUnits="userSpaceOnUse" cx="${SX}" cy="${SY}" r="330"><stop offset="0" stop-color="#ffe9b8"/><stop offset=".1" stop-color="#ffc27c"/><stop offset=".26" stop-color="#f2876c"/><stop offset=".48" stop-color="#b14f84"/><stop offset=".75" stop-color="#4d3378"/><stop offset="1" stop-color="#241d4c"/></radialGradient>
  <radialGradient id="sr-halo"><stop offset=".3" stop-color="#fff3c4" stop-opacity=".75"/><stop offset="1" stop-color="#ffb36b" stop-opacity="0"/></radialGradient>
  <linearGradient id="sr-sun" x2="0" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset="1" stop-color="#ffd27a"/></linearGradient>
  <linearGradient id="sr-haze" x2="0" y2="1"><stop offset="0" stop-color="#ffc98a" stop-opacity="0"/><stop offset=".6" stop-color="#ffc98a" stop-opacity=".35"/><stop offset="1" stop-color="#ffc98a" stop-opacity="0"/></linearGradient>
  <filter id="sr-shadow"><feDropShadow dx="0" dy="1" stdDeviation="1.2" flood-color="#1b1236" flood-opacity=".6"/></filter>
</defs>
${motion(`.sr-sun{animation:sr-rise 10s ease-in-out infinite alternate}.sr-halo{transform-origin:${SX}px ${SY}px;animation:sr-breathe 5s ease-in-out infinite alternate}
.sr-wing{animation:sr-flap 1.3s ease-in-out infinite}
@keyframes sr-rise{to{transform:translateY(-9px)}}@keyframes sr-breathe{to{transform:scale(1.14);opacity:.75}}@keyframes sr-flap{50%{transform:scaleY(.3)}}`)}
<g clip-path="url(#sr-clip)">
  <rect width="400" height="150" fill="url(#sr-sky)"/>
  <g fill="#fff"><circle cx="18" cy="14" r=".8" opacity=".6"/><circle cx="96" cy="9" r=".6" opacity=".45"/><circle cx="168" cy="18" r=".7" opacity=".35"/><circle cx="232" cy="8" r=".6" opacity=".3"/><circle cx="140" cy="6" r=".5" opacity=".4"/></g>
  <g class="sr-sun"><circle class="sr-halo" cx="${SX}" cy="${SY}" r="66" fill="url(#sr-halo)"/><circle cx="${SX}" cy="${SY}" r="23" fill="url(#sr-sun)"/></g>
  <rect y="82" width="400" height="34" fill="url(#sr-haze)"/>
  <path d="M0 104C50 96 110 93 170 98S282 106 338 100 384 92 400 95V150H0Z" fill="#c2607f"/>
  <path d="M0 104C50 96 110 93 170 98S282 106 338 100 384 92 400 95" fill="none" stroke="#ffd3a6" stroke-opacity=".55"/>
  <path d="M0 117C60 109 124 112 186 118S304 114 356 108 392 110 400 112V150H0Z" fill="#7b3d74"/>
  <path d="M0 133C70 125 140 120 212 126S330 137 400 125V150H0Z" fill="#2d1d40"/>
  <g fill="none" stroke="#2b1538" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${bird(256, 44, 1.35, 0)}${bird(282, 33, 1, -0.45)}${bird(279, 57, 0.85, -0.85)}</g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".14"/>
<g font-family="${FONT}" filter="url(#sr-shadow)">
  <text x="24" y="32" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#d9b6e0">${esc(fit(r.owner.toUpperCase(), 190, 9.5, 0.78))}</text>
  <text x="24" y="54" font-size="20" font-weight="700" fill="#fff">${esc(fit(r.name, 206, 20))}</text>
  <text font-size="12" fill="#f4dbe9">${lines(wrap(r.description, 29), 24, 75, 16)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
