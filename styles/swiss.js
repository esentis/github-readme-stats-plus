import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Light editorial poster with a huge star count and one red accent.";

const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// Light editorial poster: a huge star count, a strict grid and one red accent.
export default (r) => {
  const big = [86, 86, 64, 48][Math.min(r.stars.length, 4) - 1];
  const nameSize = r.name.length > 17 ? 16 : 22;
  return svg(
    r.name,
    `${motion(".ch-sq{transform-box:fill-box;transform-origin:center;animation:ch-sq 8s ease-in-out infinite}@keyframes ch-sq{0%,65%{transform:none}100%{transform:rotate(90deg)}}")}
<rect width="400" height="150" rx="4" fill="#f2efe8"/>
<rect class="ch-sq" x="372" y="14" width="14" height="14" fill="#e63322"/>
<line x1="138" y1="18" x2="138" y2="132" stroke="#111" stroke-width="1.5"/>
<g font-family="${HELVETICA}">
  <text x="18" y="100" font-size="${big}" font-weight="800" fill="#111" letter-spacing="${-big / 20}">${esc(r.stars)}</text>
  <text x="20" y="124" font-size="11" font-weight="700" fill="#e63322" letter-spacing="2">STARS</text>
  <text x="154" y="30" font-size="10.5" font-weight="700" fill="#e63322" letter-spacing="2">${esc(fit(r.owner.toUpperCase(), 200, 10.5, 0.8))}</text>
  <text x="154" y="56" font-size="${nameSize}" font-weight="800" fill="#111" letter-spacing="-.5">${esc(fit(r.name, 230, nameSize))}</text>
  <text font-size="12.5" fill="#333">${lines(wrap(r.description, 34), 154, 80, 16)}</text>
  <text x="154" y="128" font-size="11.5" font-weight="700" fill="#111">${esc(r.lang.name)} <tspan fill="#e63322">/</tspan> ${esc(r.forks)} forks</text>
</g>`,
  );
};
