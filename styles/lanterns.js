// Lanterns: paper sky lanterns drift up over a still night lake, their warm light trailing on the water; one glows in the language colour.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Paper sky lanterns rising slowly over a night lake with warm reflections; the closest lantern glows in the language colour.";

// [x, y, scale, rise duration, delay]; the first is the hero lantern, which floats instead of rising away.
const SKY = [[264, 82, 1.35], [302, 60, 0.95, 15, -3], [344, 78, 1.1, 17, -11], [374, 52, 0.75, 14, -7], [322, 40, 0.6, 16, -13], [244, 54, 0.55, 13, -9], [360, 36, 0.5, 18, -2], [386, 88, 0.7, 15, -6]];
const BODY = "M-7 -7C-7.5 -13.5 7.5 -13.5 7 -7L5.2 9Q0 10.6 -5.2 9Z";
const lantern = (c, halo) => `<circle cy="1" r="22" fill="url(#${halo})"/>
  <path d="${BODY}" fill="${c}"/><path d="${BODY}" fill="url(#ln-lit)"/>
  <path d="M-2.6 -11.6Q-2.4 0 -1.8 9.8M2.6 -11.6Q2.4 0 1.8 9.8M-6.6 -3H6.6" fill="none" stroke="#5a2a0c" stroke-opacity=".22" stroke-width=".6"/>
  <ellipse cy="9.2" rx="5" ry="1.4" fill="#5a2a0c" fill-opacity=".35"/><ellipse cy="8.4" rx="1.8" ry="1.6" fill="#fffbe6"/>`;

export default (r) => {
  const c = r.lang.color;
  const sky = SKY.map(([x, y, s, d, delay], i) =>
    i ? `<g class="ln-rise" style="animation-duration:${d}s;animation-delay:${delay}s"><g transform="translate(${x} ${y}) scale(${s})">${lantern("#f59a3c", "ln-halo")}</g></g>`
      : `<g class="ln-bob"><g transform="translate(${x} ${y}) scale(${s})">${lantern(c, "ln-hero")}</g></g>`).join("");
  // Broken reflection under each lantern: stacked dashes that narrow and fade with depth.
  const glints = SKY.map(([x, , s], i) =>
    `<g class="ln-glint" style="animation-delay:${-i * 0.7}s" stroke="${i ? "#f8a04a" : c}" stroke-linecap="round" stroke-width="${(1.2 + s).toFixed(1)}">${[0, 1, 2, 3, 4].map((k) => `<path d="M${(x - 6 * s * (1 - k * 0.15) + (k % 2) * 1.5).toFixed(1)} ${109 + k * 5 + (i % 2) * 2}h${(12 * s * (1 - k * 0.15)).toFixed(1)}" opacity="${((0.75 - k * 0.13) * (0.5 + s * 0.4)).toFixed(2)}"/>`).join("")}</g>`).join("");
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 130, size: 12, text: 'fill="#f3ead8"', icon: 'fill="#f4a65a"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="ln-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="ln-sky" x2="0" y2="1"><stop offset="0" stop-color="#070b22"/><stop offset=".62" stop-color="#211c43"/><stop offset="1" stop-color="#4b2d48"/></linearGradient>
  <linearGradient id="ln-lake" x2="0" y2="1"><stop offset="0" stop-color="#1d1836"/><stop offset="1" stop-color="#07081a"/></linearGradient>
  <radialGradient id="ln-halo"><stop offset="0" stop-color="#ffb35c" stop-opacity=".7"/><stop offset=".35" stop-color="#ffb35c" stop-opacity=".24"/><stop offset="1" stop-color="#ffb35c" stop-opacity="0"/></radialGradient>
  <radialGradient id="ln-hero"><stop offset="0" stop-color="${c}" stop-opacity=".75"/><stop offset=".4" stop-color="#ffb35c" stop-opacity=".22"/><stop offset="1" stop-color="#ffb35c" stop-opacity="0"/></radialGradient>
  <radialGradient id="ln-lit" cy=".85" r=".8"><stop offset="0" stop-color="#fff7d0" stop-opacity=".95"/><stop offset=".6" stop-color="#ffd27a" stop-opacity=".35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
  <filter id="ln-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.2 .5"/></filter>
</defs>
${motion(`.ln-rise{animation:ln-rise 15s linear infinite}.ln-bob{animation:ln-bob 6s ease-in-out infinite alternate}.ln-glint{animation:ln-glint 3.2s ease-in-out infinite}
@keyframes ln-rise{0%{transform:translate(0,0);opacity:0}12%,82%{opacity:1}100%{transform:translate(4px,-22px);opacity:0}}
@keyframes ln-bob{to{transform:translate(2px,-6px)}}@keyframes ln-glint{50%{opacity:.12}}`)}
<g clip-path="url(#ln-clip)">
  <rect width="400" height="150" fill="url(#ln-sky)"/>
  <g fill="#fff"><circle cx="40" cy="12" r=".7" opacity=".5"/><circle cx="150" cy="8" r=".6" opacity=".4"/><circle cx="214" cy="22" r=".7" opacity=".45"/><circle cx="284" cy="10" r=".6" opacity=".5"/><circle cx="392" cy="16" r=".7" opacity=".4"/></g>
  <path d="M0 103C40 99 70 96 110 99S180 95 220 100 300 97 340 100 380 96 400 99V106H0Z" fill="#120e26"/>
  <rect y="105" width="400" height="45" fill="url(#ln-lake)"/>
  <g filter="url(#ln-blur)">${glints}</g>
  <path d="M236 118h16M318 124h22M370 112h14M286 140h18" stroke="#c9bcd3" stroke-opacity=".15" stroke-linecap="round"/>
  ${sky}
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#f4a65a" stroke-opacity=".18"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#a993b8">${esc(fit(r.owner.toUpperCase(), 190, 9.5, 0.78))}</text>
  <text x="24" y="54" font-size="20" font-weight="700" fill="#fff4e2">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="12" fill="#c9bcd3">${lines(wrap(r.description, 28), 24, 75, 16)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
