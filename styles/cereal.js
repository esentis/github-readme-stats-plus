import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Cereal box front: sunburst, chunky cartoon title, a NEW! star burst with the star count and a bowl of rings in the language colour with a milk splash.";

// A spiky starburst polygon of n points centred on (x, y).
const burst = (x, y, ro, ri, n) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n, rr = i % 2 ? ri : ro;
    return `${(x + rr * Math.sin(a)).toFixed(1)},${(y - rr * Math.cos(a)).toFixed(1)}`;
  }).join(" ");

// A bright yellow box with rays behind a bowl of cereal at the bottom right.
export default (r) => {
  const c = r.lang.color;
  const size = r.name.length > 12 ? 21 : 27;
  const rays = Array.from({ length: 18 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 18, b = a + Math.PI / 18;
    return `<path d="M310 112L${(310 + 400 * Math.cos(a)).toFixed(0)} ${(112 + 400 * Math.sin(a)).toFixed(0)}L${(310 + 400 * Math.cos(b)).toFixed(0)} ${(112 + 400 * Math.sin(b)).toFixed(0)}Z"/>`;
  }).join("");
  const rings = [[276, 100], [298, 96], [322, 101], [344, 97], [310, 106], [288, 108], [334, 108]]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4.5" fill="none" stroke="${c}" stroke-width="3.5"/>`).join("");
  return svg(
    r.name,
    `<defs><clipPath id="card"><rect width="400" height="150" rx="10"/></clipPath></defs>
${motion(`.ce-drop{animation:ce-bob 2.8s ease-in-out infinite}@keyframes ce-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.ce-glow{transform-box:fill-box;transform-origin:center;animation:ce-pulse 3s ease-in-out infinite}@keyframes ce-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`)}
<g clip-path="url(#card)">
  <rect width="400" height="150" fill="#ffc21a"/>
  <g fill="#ffd84d">${rays}</g>
  <rect y="138" width="400" height="12" fill="#e3262e"/>
</g>
<rect x="18" y="14" width="${16 + 7.2 * fit(`${r.owner.toUpperCase()}'S`, 160, 9, 0.8).length}" height="16" rx="8" fill="#e3262e"/>
<text x="26" y="26" font-family="${FONT}" font-size="9" font-weight="800" letter-spacing="1.5" fill="#fff">${esc(fit(`${r.owner.toUpperCase()}'S`, 160, 9, 0.8))}</text>
<g font-family="${FONT}" font-weight="900">
  <text x="18" y="62" font-size="${size}" fill="#fff" stroke="#c0262d" stroke-width="6" stroke-linejoin="round" paint-order="stroke" transform="rotate(-4 18 62)">${esc(fit(r.name.toUpperCase(), 216, size, 0.7))}</text>
  <text font-size="10" font-weight="700" fill="#7a2d00">${lines(wrap(r.description, 34), 20, 86, 13)}</text>
  <text x="20" y="147" font-size="8.5" font-weight="800" letter-spacing="1.5" fill="#fff">${esc(fit(`WITH REAL ${r.lang.name.toUpperCase()} · ⑂ ${r.forks} FORKS`, 236, 8.5, 0.75))}</text>
</g>
<ellipse cx="310" cy="102" rx="64" ry="12" fill="#fffaf0"/>
<path class="ce-drop" d="M262 90q-6-14 4-22q-2 10 4 16ZM356 90q6-14-4-22q2 10-4 16Z" fill="#fffaf0"/>
<g class="ce-drop" style="animation-delay:-1.4s" fill="#fffaf0"><circle cx="276" cy="74" r="3"/><circle cx="346" cy="72" r="2.5"/><circle cx="312" cy="78" r="2"/></g>
${rings}
<path d="M246 102H374C372 126 344 140 310 140C276 140 248 126 246 102Z" fill="#2f7fd8"/>
<path d="M256 112Q310 124 364 112" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/>
<polygon class="ce-glow" points="${burst(352, 40, 32, 24, 16)}" fill="#fff" fill-opacity=".55"/>
<polygon points="${burst(352, 40, 28, 21, 16)}" fill="#e3262e"/>
<g font-family="${FONT}" font-weight="900" fill="#fff" text-anchor="middle" transform="rotate(10 352 40)">
  <text x="352" y="36" font-size="11">NEW!</text>
  <text x="352" y="50" font-size="${r.stars.length > 3 ? 10 : 12}">${esc(r.stars)} ★</text>
</g>`,
  );
};
