import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Glazed donut in the language colour with twinkling sprinkles on a pastel background, playful rounded type.";

const C = [82, 75];
const COLORS = ["#fff", "#ff6fa5", "#ffd23f", "#62d2c3", "#8f7bff"];

// A wavy closed ring of radius r around the donut centre, bumps make the glaze look poured.
const wavy = (r, amp, n) =>
  "M" + Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2, rr = r + amp * Math.sin(a * n);
    return `${(C[0] + rr * Math.cos(a)).toFixed(1)} ${(C[1] + rr * Math.sin(a)).toFixed(1)}`;
  }).join("L") + "Z";

// A big donut on the left, shop text on the right.
export default (r) => {
  const sprinkles = Array.from({ length: 22 }, (_, i) => {
    const a = i * 2.4, d = 26 + ((i * 7) % 15);
    const x = C[0] + d * Math.cos(a), y = C[1] + d * Math.sin(a);
    return `<rect class="${i % 4 ? "" : "dn-tw"}" style="animation-delay:${-i * 0.4}s" x="${(x - 3.5).toFixed(1)}" y="${(y - 1.2).toFixed(1)}" width="7" height="2.4" rx="1.2" fill="${COLORS[i % 5]}" transform="rotate(${(i * 47) % 180} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join("");
  return svg(
    r.name,
    `<defs><radialGradient id="dough" cx=".45" cy=".4"><stop offset=".55" stop-color="#e9b779"/><stop offset="1" stop-color="#b9763a"/></radialGradient>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.6" fill="#f7a6c8" fill-opacity=".45"/><circle cx="15" cy="15" r="1.6" fill="#9ad8cf" fill-opacity=".45"/></pattern></defs>
${motion(`.dn-tw{animation:dn-tw 3s ease-in-out infinite}@keyframes dn-tw{0%,100%{opacity:1}50%{opacity:.2}}
.dn-sway{transform-box:fill-box;transform-origin:center;animation:dn-sway 8s ease-in-out infinite}@keyframes dn-sway{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}`)}
<rect width="400" height="150" rx="14" fill="#ffe6f0"/>
<rect width="400" height="150" rx="14" fill="url(#dots)"/>
<ellipse cx="86" cy="134" rx="50" ry="6" fill="#d68aa8" fill-opacity=".35"/>
<g class="dn-sway">
  <path d="M${C[0] - 58} ${C[1]}a58 58 0 1 0 116 0a58 58 0 1 0-116 0ZM${C[0] - 15} ${C[1]}a15 15 0 1 1 30 0a15 15 0 1 1-30 0Z" fill="url(#dough)" fill-rule="evenodd"/>
  <path d="${wavy(50, 4, 9)}${wavy(21, 1.5, 6)}" fill="${r.lang.color}" fill-rule="evenodd"/>
  <path d="M${C[0] - 38} ${C[1] - 22}a44 44 0 0 1 34-24" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>
  ${sprinkles}
</g>
<g font-family="'Arial Rounded MT Bold', 'Nunito', ${FONT}">
  <text x="160" y="40" font-size="9" font-weight="800" letter-spacing="2.5" fill="#e0568f">GLAZED DAILY</text>
  <text x="160" y="64" font-size="21" font-weight="800" fill="#5b2245">${esc(fit(r.name, 226, 21, 0.62))}</text>
  <text font-size="11" fill="#7a4a64">${lines(wrap(r.description, 34), 160, 84, 14)}</text>
  <rect x="152" y="110" width="236" height="26" rx="13" fill="#fff" fill-opacity=".75"/>
  ${row(stats(r, { cy: 123, size: 11.5, text: 'fill="#5b2245" font-weight="700"', icon: 'fill="#e0568f"' }), 164, 14)}
</g>`,
  );
};
