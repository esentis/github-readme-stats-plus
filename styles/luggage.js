import { MONO, barcode, esc, fit, motion, svg, words } from "../card.js";

export const about = "Kraft-paper luggage tag with a string, an airport-style code and a barcode. Shows no description.";

// A kraft-paper luggage tag with a string, an airport-style code and a barcode.
export default (r) => {
  const parts = words(r.name);
  const code = (parts.length > 1 ? parts.slice(0, 2).map((p) => p.slice(0, 2)).join("-") : parts[0].slice(0, 3)).toUpperCase();
  return svg(
    r.name,
    `${motion(".lg-swing { transform-origin: 36px 75px; animation: lg-swing 6s ease-in-out infinite } @keyframes lg-swing { 25% { transform: rotate(.6deg) } 75% { transform: rotate(-.6deg) } }")}
<defs>
  <mask id="hole"><rect width="400" height="150" fill="#fff"/><circle cx="36" cy="75" r="7" fill="#000"/></mask>
  <clipPath id="tag"><polygon points="42,8 392,8 392,142 42,142 14,114 14,36"/></clipPath>
</defs>
<g class="lg-swing">
<g mask="url(#hole)">
  <polygon points="42,8 392,8 392,142 42,142 14,114 14,36" fill="#d8b98a" stroke="#a8865a"/>
  <rect clip-path="url(#tag)" y="8" width="400" height="8" fill="${r.lang.color}"/>
</g>
<circle cx="36" cy="75" r="10" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>
<g font-family="${MONO}" fill="#2b1d0e">
  <g font-size="9" fill="#6b4f2a" letter-spacing="1"><text x="62" y="36">NAME</text><text x="62" y="80">FROM</text><text x="170" y="80">LANG</text></g>
  <text x="62" y="56" font-size="18" font-weight="700">${esc(fit(r.name, 230, 18))}</text>
  <text x="62" y="98" font-size="13" font-weight="700">${esc(fit(r.owner, 100, 13))}</text>
  <text x="170" y="98" font-size="13" font-weight="700">${esc(fit(r.lang.name, 110, 13))}</text>
  <text x="62" y="128" font-size="13" font-weight="700">★ ${esc(r.stars)}   ⑂ ${esc(r.forks)}</text>
  <text x="380" y="82" font-size="22" font-weight="700" text-anchor="end">${esc(code)}</text>
  <g fill="#2b1d0e">${barcode(r.name, 300, 92, 80, 36)}</g>
</g>
</g>
<path d="M36 75C22 58 10 96 0 66" fill="none" stroke="#6b4f2a" stroke-width="2"/>`,
  );
};
