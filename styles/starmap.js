// Antique constellation chart: gold coordinate grid on navy, a constellation drawn from the repo name, serif chart labels.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap, rng } from "../card.js";

export const about = "Constellation chart: a star pattern unique to each repo name on a gold coordinate grid, with chart labels.";

const SERIF = "Georgia, 'Times New Roman', serif";
const GOLD = "#c9a74a";

export default (r) => {
  const rnd = rng(r.name);
  const n = 6 + (r.name.length % 3);
  const pts = Array.from({ length: n }, (_, i) => [244 + i * (128 / (n - 1)) + (rnd() - 0.5) * 12, 32 + rnd() * 84, 1.2 + rnd() * 1.8]);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + `L${pts[n - 3][0].toFixed(1)} ${pts[n - 3][1].toFixed(1)}`;
  const top = pts.reduce((a, b) => (b[2] > a[2] ? b : a));
  const field = Array.from({ length: 34 }, () => `<circle cx="${(rnd() * 400).toFixed(1)}" cy="${(rnd() * 150).toFixed(1)}" r="${(0.3 + rnd() * 0.6).toFixed(2)}"/>`).join("");
  const grid = [30, 60, 90, 120].map((y) => `M0 ${y + 8}Q200 ${y - 10} 400 ${y + 8}`).join("") + [40, 120, 200, 280, 360].map((x) => `M${x} 0L${200 + (x - 200) * 1.15} 150`).join("");
  return svg(
    r.name,
    `<defs><radialGradient id="sm-sky" cx=".75" cy=".45" r=".9"><stop offset="0" stop-color="#16244a"/><stop offset="1" stop-color="#0a1229"/></radialGradient>
  <clipPath id="sm-clip"><rect width="400" height="150" rx="12"/></clipPath></defs>
${motion(`.sm-tw{animation:sm-tw 4s ease-in-out infinite}.sm-tw:nth-child(2n){animation-delay:-2s}.sm-shoot{opacity:0;animation:sm-shoot 7s linear infinite}
@keyframes sm-tw{50%{opacity:.45}}@keyframes sm-shoot{0%,84%{opacity:0;transform:translate(0,0)}88%{opacity:.9}96%,100%{opacity:0;transform:translate(36px,12px)}}`)}
<g clip-path="url(#sm-clip)">
  <rect width="400" height="150" fill="url(#sm-sky)"/>
  <path d="${grid}" fill="none" stroke="${GOLD}" stroke-opacity=".18" stroke-width=".7"/>
  <g fill="#e8eefc" fill-opacity=".55">${field}</g>
  <path class="sm-shoot" d="M222 18l22 7" stroke="#fff" stroke-width="1" stroke-linecap="round"/>
</g>
<rect x="5.5" y="5.5" width="389" height="139" rx="8" fill="none" stroke="${GOLD}" stroke-opacity=".5"/>
<rect x="8.5" y="8.5" width="383" height="133" rx="6" fill="none" stroke="${GOLD}" stroke-opacity=".25"/>
<path d="${path}" fill="none" stroke="#efe2b4" stroke-opacity=".6" stroke-width=".8"/>
<circle cx="${top[0].toFixed(1)}" cy="${top[1].toFixed(1)}" r="7" fill="#fff6d6" fill-opacity=".12"/>
<g fill="#fff6d6">${pts.map(([x, y, s]) => `<circle class="sm-tw" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(2)}"/>`).join("")}</g>
<g font-family="${SERIF}" font-style="italic" fill="${GOLD}" font-size="9">
  <text x="${(top[0] + 6).toFixed(1)}" y="${(top[1] - 5).toFixed(1)}">α</text>
  <text x="384" y="136" text-anchor="end" letter-spacing="1">${esc(fit(r.name.toUpperCase(), 120, 9, 0.7))}</text>
  <text x="384" y="20" text-anchor="end" font-size="7.5" font-style="normal" letter-spacing="1" fill-opacity=".8">RA 4h–6h · DEC +20°</text>
</g>
<g font-family="${FONT}">
  <text x="20" y="30" font-size="8.5" font-weight="700" fill="${GOLD}" letter-spacing="2.5">CONSTELLATION</text>
  <text x="20" y="54" font-family="${SERIF}" font-style="italic" font-size="20" font-weight="700" fill="#f3e9c6">${esc(fit(r.name, 196, 20, 0.56))}</text>
  <text x="20" y="69" font-family="${SERIF}" font-style="italic" font-size="10.5" fill="#9fb0d0">${esc(fit(`charted by ${r.owner}`, 190, 10.5, 0.55))}</text>
  <text font-size="10.5" fill="#b9c4de">${lines(wrap(r.description, 31), 20, 89, 14)}</text>
  ${row(stats(r, { cy: 124, size: 11, text: 'fill="#f3e9c6"', icon: `fill="${GOLD}"` }), 20, 12)}
</g>`,
  );
};
