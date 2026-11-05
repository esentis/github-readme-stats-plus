import { FONT, MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Microscope: a round eyepiece view with drifting cells in the language colour and a glass slide label, magnification = stars.";

// The view through an eyepiece on the left, cells placed from the name; a labelled glass slide on the right.
export default (r) => {
  const c = (i) => r.name.charCodeAt(i % r.name.length);
  const col = r.lang.color;
  const cells = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * 2 * Math.PI + (c(i) % 10) / 10, d = i ? 22 + (c(i + 3) % 20) : 0;
    const x = (76 + d * Math.cos(a)).toFixed(1), y = (75 + d * Math.sin(a)).toFixed(1), w = 8 + (c(i + 1) % 6), h = 6 + (c(i + 2) % 5);
    return `<g class="mic-${i % 2 ? "a" : "b"}" transform="translate(${x} ${y}) rotate(${c(i) * 7})"><ellipse rx="${w}" ry="${h}" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-opacity=".85" stroke-width="1.2"/><circle cx="${(w / 4).toFixed(1)}" r="${(h / 2.6).toFixed(1)}" fill="${col}" fill-opacity=".8"/></g>`;
  }).join("");
  const specks = Array.from({ length: 14 }, (_, i) => `<circle cx="${30 + (c(i * 2) * 13) % 92}" cy="${30 + (c(i * 2 + 1) * 17) % 90}" r="${0.8 + (i % 3) * 0.5}"/>`).join("");
  return svg(
    r.name,
    `${motion(`.mic-a{animation:mic-a 7s ease-in-out infinite}.mic-b{animation:mic-b 9s ease-in-out infinite}
@keyframes mic-a{50%{translate:2.5px -2px}}@keyframes mic-b{50%{translate:-2px 2.5px}}`)}
<defs><clipPath id="mic-view"><circle cx="76" cy="75" r="58"/></clipPath>
<radialGradient id="mic-field" cx=".45" cy=".4"><stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#ece3cf"/><stop offset="1" stop-color="#b9ae98"/></radialGradient>
<radialGradient id="mic-vig"><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>
<rect width="400" height="150" rx="12" fill="#15171b"/>
<circle cx="76" cy="75" r="66" fill="#2a2d33"/><circle cx="76" cy="75" r="62" fill="#0b0c0e"/>
<g clip-path="url(#mic-view)">
  <rect x="18" y="17" width="116" height="116" fill="url(#mic-field)"/>
  <g fill="${col}" fill-opacity=".35">${specks}</g>
  ${cells}
  <path d="M76 25V125M26 75H126" stroke="#000" stroke-opacity=".12"/>
  <circle cx="76" cy="75" r="58" fill="url(#mic-vig)"/>
</g>
<rect x="56" y="113" width="40" height="13" rx="6.5" fill="#000" fill-opacity=".6"/>
<text x="76" y="122.5" font-family="${MONO}" font-size="8.5" font-weight="700" fill="#fff" text-anchor="middle">×${esc(r.stars)}</text>
<rect x="150" y="18" width="240" height="114" rx="4" fill="#cfe3ea" fill-opacity=".1" stroke="#cfe3ea" stroke-opacity=".35"/>
<path d="M156 24L176 24M152 128L170 128" stroke="#fff" stroke-opacity=".25"/>
<rect x="160" y="28" width="222" height="94" rx="2" fill="#f4f1e8"/>
<g font-family="${FONT}" fill="#2a2721">
  <text x="170" y="44" font-family="${MONO}" font-size="8" fill="#7a7466" letter-spacing="1.5">${esc(fit(`SLIDE 01 · ${r.owner.toUpperCase()}`, 200, 8, 0.75))}</text>
  <text x="170" y="64" font-size="16" font-weight="700">${esc(fit(r.name, 204, 16))}</text>
  <text font-size="10.5" fill="#5a564d">${lines(wrap(r.description, 34), 170, 81, 13)}</text>
  <path d="M170 102H372" stroke="#2a2721" stroke-opacity=".2"/>
  <text x="170" y="115" font-family="${MONO}" font-size="9.5"><tspan fill="#7a7466">MAG</tspan> <tspan font-weight="700">×${esc(r.stars)}</tspan>  <tspan fill="#7a7466">⑂</tspan> <tspan font-weight="700">${esc(r.forks)}</tspan></text>
  <circle cx="${364 - Math.min(80, r.lang.name.length * 5.7)}" cy="112" r="3.5" fill="${col}"/>
  <text x="372" y="115" font-family="${MONO}" font-size="9.5" text-anchor="end">${esc(fit(r.lang.name, 80, 9.5))}</text>
</g>`,
  );
};
