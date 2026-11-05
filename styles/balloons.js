import { FONT, esc, fit, isLight, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Golden hour: hot-air balloons, one in the language colour, drift and bob over hazy layered hills.";

const ENV = "M-4 18C-10 12-17 5-17-5A17 17 0 1 1 17-5C17 5 10 12 4 18Z";
// One balloon at the origin (envelope ~34 wide): striped gores, soft shading, ropes, basket and a burner glow.
const balloon = (a, b) => `<path d="${ENV}" fill="${a}"/><path d="${ENV}" transform="scale(.6 1)" fill="${b}"/><path d="${ENV}" transform="scale(.22 1)" fill="${a}"/>
  <path d="${ENV}" fill="url(#bl-shade)"/><rect x="-4.5" y="17" width="9" height="3" rx="1" fill="#5a3a2e"/>
  <path d="M-4 20l1 9M4 20l-1 9" stroke="#5a3a2e" stroke-width=".7"/><rect x="-4" y="28" width="8" height="6" rx="1" fill="#7b4a2c"/><path d="M-4 30.5h8" stroke="#a56c43" stroke-width=".6"/>
  <circle class="bl-f" cy="21.5" r="2.6" fill="#ffd36b" opacity=".8"/>`;

// Golden-hour hills: lavender-peach sky, a low sun, three hazy hill layers, balloons drifting on the right.
export default (r) => {
  const c = r.lang.color;
  const fly = (x, y, s, a, b, dur, delay, op = 1) =>
    `<g class="bl-d" style="animation-duration:${dur}s;animation-delay:-${delay}s"><g transform="translate(${x} ${y}) scale(${s})" opacity="${op}">${balloon(a, b)}</g></g>`;
  return svg(
    r.name,
    `${motion(".bl-d{animation:bl-d 9s ease-in-out infinite}@keyframes bl-d{0%,100%{transform:translate(0,0)}33%{transform:translate(5px,-4px)}66%{transform:translate(-3px,-6px)}}.bl-f{animation:bl-f 1.6s ease-in-out infinite}@keyframes bl-f{0%,100%{opacity:.85}50%{opacity:.3}}")}
<defs>
  <clipPath id="bl-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="bl-sky" x2="0" y2="1"><stop offset="0" stop-color="#cdb8dc"/><stop offset=".5" stop-color="#f6c9a4"/><stop offset="1" stop-color="#ffe2ad"/></linearGradient>
  <radialGradient id="bl-sun"><stop offset="0" stop-color="#fff6d8"/><stop offset=".18" stop-color="#ffe6a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffd59a" stop-opacity="0"/></radialGradient>
  <radialGradient id="bl-shade" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3a1f2a" stop-opacity=".35"/></radialGradient>
  <linearGradient id="bl-haze" x2="0" y2="1"><stop offset="0" stop-color="#ffe2ad" stop-opacity="0"/><stop offset="1" stop-color="#ffe2ad" stop-opacity=".55"/></linearGradient>
</defs>
<g clip-path="url(#bl-clip)">
  <rect width="400" height="150" fill="url(#bl-sky)"/>
  <circle cx="214" cy="96" r="96" fill="url(#bl-sun)"/><circle cx="214" cy="96" r="13" fill="#fff4d4"/>
  <path d="M0 96Q60 82 120 94T240 90T360 92T480 88V150H0Z" fill="#e9b39c"/>
  ${fly(270, 34, 0.5, "#3f8f8c", "#f4d58d", 11, 4, 0.8)}
  <rect y="70" width="400" height="40" fill="url(#bl-haze)"/>
  <path d="M0 108Q50 97 110 105T230 103T350 99T470 105V150H0Z" fill="#c98b7d"/>
  <g fill="#9b6467">${[[96, 104], [104, 103], [300, 99], [312, 100], [318, 98]].map(([x, y]) => `<ellipse cx="${x}" cy="${y - 4}" rx="2.2" ry="6"/>`).join("")}</g>
  ${fly(372, 46, 0.75, "#e8574a", "#fff3dd", 8, 2)}
  <path d="M0 120Q70 109 150 117T300 115T450 119V150H0Z" fill="#8a5a68"/>
  ${fly(320, 62, 1.3, c, isLight(c) ? "#b5532f" : "#fff3dd", 10, 0)}
  <path d="M0 124C80 116 180 118 250 128S350 142 400 136V150H0Z" fill="#4a3150"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#7a4a3a" stroke-opacity=".2"/>
<g font-family="${FONT}">
  <text x="22" y="36" font-size="21" font-weight="700" fill="#4b2733">${esc(fit(r.name, 218, 21))}</text>
  <text font-size="12" fill="#7a4650">${lines(wrap(r.description, 30), 22, 56, 15)}</text>
  ${row(stats(r, { cy: 137, size: 12, text: 'fill="#fff4e6"', icon: 'fill="#f6c9a4"' }), 22, 14)}
</g>`,
  );
};
