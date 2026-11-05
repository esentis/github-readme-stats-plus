import { FONT, esc, fit, lines, motion, row, stats, svg, textWidth, wrap } from "../card.js";

export const about = "Ramen shop: an indigo noren curtain with the repo name, a steaming bowl with egg, nori and naruto, and chopsticks gently lifting noodles.";

// A ramen counter: noren across the top, the bowl on the left, notes on the right.
export default (r) => {
  const noodles = [0, 4, 8, 12].map((x, i) => `<path d="M${118 + x} 70q-4 5 0 10t0 10t${i % 2 ? 2 : -2} 8" fill="none" stroke="#f3d27a" stroke-width="2.2" stroke-linecap="round"/>`).join("");
  return svg(
    r.name,
    `<defs><clipPath id="card"><rect width="400" height="150" rx="12"/></clipPath>
  <linearGradient id="bowl" x2="0" y2="1"><stop offset="0" stop-color="#c0392b"/><stop offset="1" stop-color="#7d1f17"/></linearGradient></defs>
${motion(`.rm-steam{animation:rm-rise 4.5s ease-in-out infinite}@keyframes rm-rise{0%,100%{transform:translateY(0);opacity:.6}50%{transform:translateY(-5px);opacity:.1}}
.rm-lift{animation:rm-lift 5s ease-in-out infinite}@keyframes rm-lift{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`)}
<g clip-path="url(#card)">
  <rect width="400" height="150" fill="#1d1714"/>
  <rect y="128" width="400" height="22" fill="#5a3b26"/><path d="M0 128H400" stroke="#7a5236" stroke-width="2"/>
  <rect y="2" width="400" height="5" fill="#6b4a2f"/>
  <path d="M8 7H392V52H302V40H298V52H202V40H198V52H102V40H98V52H8Z" fill="#1f2a4a"/>
  <path d="M8 46H392" stroke="#fff" stroke-opacity=".08"/>
</g>
<circle cx="36" cy="27" r="12" fill="${r.lang.color}"/><circle cx="36" cy="27" r="7.5" fill="none" stroke="#f3efe6" stroke-width="2"/>
<text x="214" y="33" font-family="${FONT}" font-size="18" font-weight="800" letter-spacing="1" fill="#f3efe6" text-anchor="middle">${esc(fit(r.name, 300, 18, 0.66))}</text>
<g fill="none" stroke="#e8e2d6" stroke-width="2" stroke-linecap="round">
  <path class="rm-steam" d="M50 76q-4-5 0-9t0-9"/><path class="rm-steam" style="animation-delay:-1.5s" d="M72 74q4-5 0-9t0-9"/><path class="rm-steam" style="animation-delay:-3s" d="M94 76q-4-5 0-9t0-9"/>
</g>
<g class="rm-lift">${noodles}
  <g stroke-linecap="round" stroke-width="3.5"><path d="M114 70L176 52" stroke="#d9b98a"/><path d="M124 72L180 60" stroke="#c9a674"/></g>
</g>
<ellipse cx="100" cy="90" rx="74" ry="9" fill="#d9a35a"/><ellipse cx="100" cy="90" rx="74" ry="9" fill="none" stroke="#5e1610" stroke-width="2"/>
<rect x="40" y="62" width="20" height="28" rx="1" fill="#1e3324" transform="rotate(-10 50 76)"/>
<g transform="translate(140 87)"><ellipse rx="13" ry="6" fill="#fffaf0"/><ellipse cx="1" cy="-.5" rx="6" ry="3.5" fill="#f29c1f"/></g>
<g transform="translate(86 89)"><ellipse rx="11" ry="5" fill="#fffaf0"/><path d="M-5 0q2-3 5-1t1 2" fill="none" stroke="#e86a8a" stroke-width="1.6"/></g>
<g fill="#7fbf4d"><rect x="66" y="86" width="5" height="3" rx="1"/><rect x="106" y="90" width="5" height="3" rx="1"/><rect x="118" y="86" width="4" height="3" rx="1"/></g>
<path d="M26 90H174C172 116 142 130 100 130C58 130 28 116 26 90Z" fill="url(#bowl)"/>
<path d="M36 102Q100 116 164 102" fill="none" stroke="#f3efe6" stroke-opacity=".7" stroke-width="2" stroke-dasharray="6 4"/>
<rect x="78" y="128" width="44" height="5" rx="2" fill="#5e1610"/>
<g font-family="${FONT}">
  <text x="196" y="72" font-size="9" font-weight="700" letter-spacing="2" fill="#a89f94">${esc(fit(`BY ${r.owner.toUpperCase()}`, 186, 9, 0.95))}</text>
  <text font-size="11" fill="#e2d9cc">${lines(wrap(r.description, 30), 196, 90, 14)}</text>
  ${row(stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, Math.max(30, 116 - textWidth(r.stars + r.forks, 11)), 11) } }, { cy: 139, size: 11, text: 'fill="#f3efe6" font-weight="600"', icon: 'fill="#d9b98a"' }), 196, 12)}
</g>`,
  );
};
