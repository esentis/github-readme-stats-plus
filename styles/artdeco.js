import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Art deco: black lacquer and gold, stepped frame, a sunburst fan holding the star count, condensed caps.";

const DECO = "'Avenir Next Condensed', 'DIN Condensed', 'Arial Narrow', 'Roboto Condensed', sans-serif";
const GOLD = "#d9b45a";

// A frame whose corners step inwards twice, s pixels per step.
const stepped = (i, s) => {
  const [a, b, c, d] = [i, i, 400 - i, 150 - i];
  return [[a + 2 * s, b], [c - 2 * s, b], [c - 2 * s, b + s], [c - s, b + s], [c - s, b + 2 * s], [c, b + 2 * s], [c, d - 2 * s], [c - s, d - 2 * s], [c - s, d - s], [c - 2 * s, d - s], [c - 2 * s, d], [a + 2 * s, d], [a + 2 * s, d - s], [a + s, d - s], [a + s, d - 2 * s], [a, d - 2 * s], [a, b + 2 * s], [a + s, b + 2 * s], [a + s, b + s], [a + 2 * s, b + s]].join(" ");
};

// Alternate gold wedges of a half sunburst centred on (cx, cy).
const fan = (cx, cy, r0, r1, n = 14) => {
  const p = (a, rad) => `${(cx + rad * Math.cos(a)).toFixed(1)} ${(cy + rad * Math.sin(a)).toFixed(1)}`;
  return Array.from({ length: n }, (_, i) => {
    const [a0, a1] = [Math.PI * (1 + i / n), Math.PI * (1 + (i + 1) / n)];
    return `<path d="M${p(a0, r0)}L${p(a0, r1)}A${r1} ${r1} 0 0 1 ${p(a1, r1)}L${p(a1, r0)}A${r0} ${r0} 0 0 0 ${p(a0, r0)}Z" fill="${GOLD}" fill-opacity="${i % 2 ? 0.25 : 0.85}"${i % 2 ? ` class="ad-ray" style="animation-delay:${(i * 0.12).toFixed(2)}s"` : ""}/>`;
  }).join("");
};

// Art deco: black and gold, stepped frame, a sunburst fan with the star count, condensed caps.
export default (r) => {
  const name = r.name.toUpperCase();
  const size = name.length > 13 ? 19 : 25;
  return svg(
    r.name,
    `${motion(".ad-ray { animation: ad-ray 7s ease-in-out infinite } @keyframes ad-ray { 0%, 16%, 100% { fill-opacity: .25 } 8% { fill-opacity: .6 } }")}
<rect width="400" height="150" rx="6" fill="#0f0e0c"/>
<polygon points="${stepped(6, 6)}" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
<polygon points="${stepped(11, 5)}" fill="none" stroke="${GOLD}" stroke-width=".6" stroke-opacity=".6"/>
${fan(70, 128, 30, 74)}
<path d="M40 128A30 30 0 0 1 100 128Z" fill="#0f0e0c" stroke="${GOLD}"/>
<path d="M132 26V124M136 30V120" stroke="${GOLD}" stroke-width=".8"/>
<g font-family="${DECO}" font-weight="600">
  <text x="70" y="108" font-size="10" fill="${GOLD}" text-anchor="middle">★</text>
  <text x="70" y="123" font-size="14" fill="#f3e3b5" text-anchor="middle">${esc(r.stars)}</text>
  <text x="70" y="38" font-size="9" letter-spacing="3" fill="${GOLD}" text-anchor="middle">STARS</text>
  <path d="M46 42H94" stroke="${GOLD}" stroke-width=".6"/>
  <text x="152" y="38" font-size="9.5" letter-spacing="3" fill="${GOLD}" fill-opacity=".75">${esc(fit(r.owner.toUpperCase(), 220, 9.5, 0.9))}</text>
  <text x="152" y="${size > 20 ? 66 : 63}" font-size="${size}" letter-spacing="1.5" fill="${GOLD}">${esc(fit(name, 226, size, 0.72))}</text>
  <rect x="152" y="74" width="34" height="2.5" fill="${r.lang.color}"/>
  <text font-size="12" font-weight="400" fill="#e9e0c9">${lines(wrap(r.description, 38), 152, 94, 15)}</text>
  <text x="152" y="130" font-size="10" letter-spacing="2" fill="${GOLD}">${esc(fit(r.lang.name.toUpperCase(), 130, 10, 0.9))}  ◆  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
