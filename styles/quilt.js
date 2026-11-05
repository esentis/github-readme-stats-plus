// Patchwork quilt: printed patches seeded from the name, running-stitch seams, a muslin label and one patch lifting in a breeze.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Patchwork quilt: printed cotton patches seeded from the name with running-stitch seams, a muslin label, and one patch in the language colour lifting in a breeze.";

const PAL = ["#b5523b", "#d9a441", "#8a9a5b", "#d49a9a", "#4f6d8a", "#a0522d", "#e3cfae", "#6d4c3d", "#c97b4a"];
const PRINTS = ["dot", "ging", "stripe", "flower"];
const SERIF = "Georgia, 'Times New Roman', serif";

export default (r) => {
  const rand = rng(r.name);
  const pick = (a) => a[Math.floor(rand() * a.length)];
  const patch = (x, y, w, h, fill = pick(PAL)) => {
    const k = rand(), alt = pick(PAL), print = pick(PRINTS);
    const extra = k < 0.3 ? `<path d="M${x} ${y + h}L${x + w} ${y}V${y + h}Z" fill="${alt}"/>` : k < 0.5 ? `<path d="M${x + w / 2} ${y}h${w / 2}v${h / 2}h${-w}v${h / 2}h${w / 2}Z" fill="${alt}"/>` : "";
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>${extra}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#q-${print})" stroke="#2b1d16" stroke-opacity=".35"/>
<rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" fill="none" stroke="#fff7e6" stroke-opacity=".8" stroke-dasharray="3 2.5"/>`;
  };
  const cells = [];
  for (let c = 0; c < 3; c++) for (let k = 0; k < 3; k++) if (c !== 1 || k !== 1) cells.push(patch(250 + c * 50, k * 50, 50, 50));
  for (let c = 0; c < 5; c++) cells.push(patch(c * 50, 112, 50, 38));
  return svg(
    r.name,
    `${motion(".q-lift{animation:q-lift 7s ease-in-out infinite;transform-origin:300px 100px}.q-shade{animation:q-shade 7s ease-in-out infinite}@keyframes q-lift{0%,45%,100%{transform:none}62%{transform:rotate(-7deg) scale(1.04)}74%{transform:rotate(-3deg) scale(1.02)}84%{transform:rotate(-5deg) scale(1.03)}}@keyframes q-shade{0%,45%,100%{opacity:0}62%,84%{opacity:.45}}")}
<defs>
  <pattern id="q-dot" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.3" fill="#fff" fill-opacity=".55"/></pattern>
  <pattern id="q-ging" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0h4v8H0ZM0 0h8v4H0Z" fill="#fff" fill-opacity=".22"/></pattern>
  <pattern id="q-stripe" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2" height="6" fill="#fff" fill-opacity=".28"/></pattern>
  <pattern id="q-flower" width="12" height="12" patternUnits="userSpaceOnUse"><g fill="#fff" fill-opacity=".55"><circle cx="6" cy="3.5" r="1.4"/><circle cx="6" cy="8.5" r="1.4"/><circle cx="3.5" cy="6" r="1.4"/><circle cx="8.5" cy="6" r="1.4"/></g><circle cx="6" cy="6" r="1" fill="#2b1d16" fill-opacity=".4"/></pattern>
  <pattern id="q-muslin" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 .5H3M.5 0V3" stroke="#a88a66" stroke-opacity=".18"/></pattern>
  <clipPath id="q-card"><rect width="400" height="150" rx="12"/></clipPath>
  <filter id="q-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
<g clip-path="url(#q-card)">
  ${cells.join("")}
  <rect x="300" y="50" width="50" height="50" fill="#e8dcc0"/><rect x="300" y="50" width="50" height="50" fill="url(#q-muslin)" stroke="#2b1d16" stroke-opacity=".35"/>
  <g class="q-lift"><rect class="q-shade" x="303" y="54" width="50" height="50" fill="#2b1d16" filter="url(#q-blur)" opacity="0"/>${patch(300, 50, 50, 50, r.lang.color)}</g>
  <rect width="250" height="112" fill="#f4ead6"/><rect width="250" height="112" fill="url(#q-muslin)" stroke="#2b1d16" stroke-opacity=".35"/>
  <rect x="7" y="7" width="236" height="98" rx="3" fill="none" stroke="#7a5a44" stroke-opacity=".7" stroke-width="1.2" stroke-dasharray="4 3"/>
</g>
<g font-family="${FONT}" fill="#3a2a20">
  <text x="18" y="27" font-family="${SERIF}" font-style="italic" font-size="10" fill="#7a5a44">${esc(fit(`hand-pieced by ${r.owner}`, 214, 10, 0.5))}</text>
  <text x="18" y="48" font-size="18" font-weight="700">${esc(fit(r.name, 216, 18))}</text>
  <text font-size="11" fill="#5a4636">${lines(wrap(r.description, 37), 18, 65, 13.5)}</text>
  ${row(stats(r, { cy: 94, size: 11.5, text: 'fill="#3a2a20" font-weight="600"', icon: 'fill="#7a5a44"' }), 18, 12)}
</g>`,
  );
};
