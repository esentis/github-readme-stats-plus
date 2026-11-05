import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Neon wireframe cube turning slowly over a perspective grid floor.";

// One frame of the cube turned by `a` radians, tilted toward the viewer and projected with light perspective.
const cube = (a) => {
  const v = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const [x, y, z] = [i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1];
    const [rx, rz] = [x * Math.cos(a) - z * Math.sin(a), x * Math.sin(a) + z * Math.cos(a)];
    const [ry, rz2] = [y * Math.cos(0.5) - rz * Math.sin(0.5), y * Math.sin(0.5) + rz * Math.cos(0.5)];
    const k = 27 * (5 / (5 + rz2));
    return `${(322 + rx * k).toFixed(1)} ${(56 + ry * k).toFixed(1)}`;
  });
  return [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]].map(([p, q]) => `M${v[p]}L${v[q]}`).join("");
};

// Neon lines on black: a slowly turning wireframe cube above a perspective grid floor.
export default (r) => {
  // A quarter turn maps the cube onto itself, so looping 0..90° is seamless.
  const frames = Array.from({ length: 10 }, (_, i) => cube(0.45 + (i / 9) * (Math.PI / 2))).join(";");
  const floor =
    [-500, -260, -100, 20, 120, 220, 322, 420, 520, 620, 740, 900, 1150].map((x) => `M322 100L${x} 150`).join("") +
    [1, 1.5, 2.3, 3.6, 6].map((z) => `M0 ${(100 + 50 / z).toFixed(1)}H400`).join("");
  const items = stats(r, { cy: 126, size: 12, text: 'fill="#fff" font-weight="600"', icon: `fill="${r.lang.color}"` });
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="12"/></clipPath>
  <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient>
  <mask id="far"><rect y="100" width="400" height="50" fill="url(#fade)"/></mask>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#030308"/>
  <path d="${floor}" stroke="${r.lang.color}" stroke-width="1" fill="none" mask="url(#far)"/>
  <line x1="0" y1="100" x2="400" y2="100" stroke="${r.lang.color}" stroke-opacity=".6"/>
  <g fill="none" stroke-linecap="round">
    <path stroke="${r.lang.color}" stroke-width="4" filter="url(#glow)" d="${cube(0.45)}"><animate attributeName="d" values="${frames}" dur="8s" repeatCount="indefinite"/></path>
    <path stroke="#fff" stroke-width="1.2" d="${cube(0.45)}"><animate attributeName="d" values="${frames}" dur="8s" repeatCount="indefinite"/></path>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="${r.lang.color}" stroke-opacity=".35"/>
<g font-family="${FONT}">
  <text x="22" y="42" font-size="21" font-weight="700" fill="#fff">${esc(fit(r.name, 250, 21))}</text>
  <text font-size="12.5" fill="#9aa3b8">${lines(wrap(r.description, 38), 22, 64, 16)}</text>
  <rect x="12" y="113" width="${items.reduce((w, [iw]) => w + iw + 18, 2)}" height="26" rx="6" fill="#030308" fill-opacity=".85" stroke="${r.lang.color}" stroke-opacity=".45"/>
  ${row(items, 22, 18)}
</g>`,
  );
};
