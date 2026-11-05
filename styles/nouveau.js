import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Art nouveau: cream paper, sage whiplash curves and flowers in the language colour, elegant serif.";

const SERIF = "Didot, 'Bodoni 72', 'Playfair Display', 'Hoefler Text', Georgia, serif";
const SAGE = "#7f9270";

// One corner: a whiplash curve ending in a curl, two leaves and a five-petal flower.
const corner = (t, c) => `<g transform="${t}">
  <path d="M15 96C15 58 22 26 44 18C64 11 86 14 96 22C104 29 98 40 90 36C84 33 88 26 93 28" fill="none" stroke="${SAGE}" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M22 70c-6-6-6-14 0-20c6 6 6 14 0 20zM62 14c6-5 14-5 20 1c-6 5-14 5-20-1z" fill="${SAGE}" fill-opacity=".7"/>
  <g transform="translate(30 30)"><g class="nv-bloom">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="-6" rx="3.2" ry="6" fill="${c}" fill-opacity=".85" transform="rotate(${a})"/>`).join("")}<circle r="2.6" fill="#f4eedc"/></g></g>
</g>`;

// Art nouveau: flowing sage curves, lang-coloured flowers in each corner, centred serif text.
export default (r) =>
  svg(
    r.name,
    `${motion(".nv-bloom { animation: nv-bloom 8s ease-in-out infinite } @keyframes nv-bloom { 50% { transform: rotate(14deg) } }")}
<rect width="400" height="150" rx="10" fill="#f4eedc"/>
<rect x="6.5" y="6.5" width="387" height="137" rx="8" fill="none" stroke="${SAGE}" stroke-opacity=".6"/>
${corner("", r.lang.color)}
${corner("translate(400 0) scale(-1 1)", r.lang.color)}
${corner("translate(0 150) scale(1 -1)", r.lang.color)}
${corner("translate(400 150) scale(-1 -1)", r.lang.color)}
<g font-family="${SERIF}" text-anchor="middle" fill="#33402b">
  <text x="200" y="34" font-size="11" font-style="italic" fill="${SAGE}">${esc(fit(r.owner, 200, 11, 0.5))}</text>
  <text x="200" y="60" font-size="24">${esc(fit(r.name, 250, 24, 0.55))}</text>
  <path d="M150 70C170 64 185 76 200 70C215 64 230 76 250 70" fill="none" stroke="${SAGE}" stroke-width="1.2"/>
  <text font-size="12.5" font-style="italic" fill="#56614c">${lines(wrap(r.description, 46), 200, 89, 15)}</text>
  <text x="200" y="127" font-size="12" letter-spacing=".5">${esc(fit(r.lang.name, 110, 12, 0.55))}  ·  ★ ${esc(r.stars)}  ·  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
