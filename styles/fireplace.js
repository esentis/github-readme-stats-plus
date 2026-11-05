// Cozy hearth: a brick fireplace with flickering flames and glowing embers, its warm light breathing on a brass-trimmed plaque.
import { esc, fit, lines, motion, row, stats, svg, textWidth, wrap } from "../card.js";

export const about = "Cozy hearth: a brick fireplace with flickering flames, glowing embers and rising sparks, its warm light breathing on a brass-trimmed plaque with the name.";

const SERIF = "Georgia, 'Times New Roman', serif";
const ARCH = "M40 126V76Q40 50 82 50Q124 50 124 76V126Z";

// A flame tongue standing on (x, base), w wide at the belly and h tall.
const flame = (x, base, w, h) =>
  `M${x} ${base}C${x - w} ${base - h * 0.2} ${x - w * 0.55} ${base - h * 0.62} ${x + w * 0.1} ${base - h}C${x + w * 0.5} ${base - h * 0.55} ${x + w} ${base - h * 0.25} ${x} ${base}Z`;

export default (r) => {
  const tongue = (x, w, h, fill, dur, delay) =>
    `<path class="fp-f" style="transform-origin:${x}px 124px;animation-duration:${dur}s;animation-delay:${delay}s" d="${flame(x, 124, w, h)}" fill="${fill}"/>`;
  const fire = [[70, 13, 46, -0.3], [84, 16, 60, -1.1], [97, 12, 42, -0.7], [78, 9, 34, -1.5], [91, 9, 38, -0.2]];
  const embers = [[64, 127], [74, 129], [86, 128], [97, 129], [104, 127], [80, 125]].map(([x, y], i) => `<circle class="fp-e" style="animation-delay:${-i * 0.4}s" cx="${x}" cy="${y}" r="${1.4 + (i % 3) * 0.5}" fill="#ffb347"/>`).join("");
  return svg(
    r.name,
    `${motion(".fp-f{animation:fp-f 1.6s ease-in-out infinite}.fp-e{animation:fp-e 2.4s ease-in-out infinite}.fp-glow{animation:fp-glow 4s ease-in-out infinite}.fp-s{animation:fp-s 3s ease-out infinite;opacity:0}@keyframes fp-f{0%,100%{transform:none}30%{transform:scale(.9,1.08) skewX(-4deg)}60%{transform:scale(1.06,.93) skewX(3deg)}}@keyframes fp-e{0%,100%{opacity:1}50%{opacity:.35}}@keyframes fp-glow{0%,100%{opacity:1}50%{opacity:.6}}@keyframes fp-s{0%{transform:none;opacity:0}15%{opacity:1}100%{transform:translate(4px,-40px);opacity:0}}")}
<defs>
  <linearGradient id="fp-wall" x2="0" y2="1"><stop offset="0" stop-color="#2d1b14"/><stop offset="1" stop-color="#1c100b"/></linearGradient>
  <pattern id="fp-brick" width="20" height="16" patternUnits="userSpaceOnUse"><rect width="20" height="16" fill="#4a281d"/><g fill="#8a4430"><rect x=".8" y=".8" width="18.4" height="6.4" rx=".8"/><rect x="-9.2" y="8.8" width="18.4" height="6.4" rx=".8"/><rect x="10.8" y="8.8" width="18.4" height="6.4" rx=".8" fill="#7a3a28"/></g></pattern>
  <radialGradient id="fp-box" cx=".5" cy=".9" r=".8"><stop offset="0" stop-color="#6b2a0e"/><stop offset=".6" stop-color="#1f0e07"/><stop offset="1" stop-color="#0e0604"/></radialGradient>
  <linearGradient id="fp-outer" x2="0" y2="1"><stop offset="0" stop-color="#e2461a"/><stop offset="1" stop-color="#ff9a2e"/></linearGradient>
  <radialGradient id="fp-warm" cx="82" cy="110" r="300" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff8a3d" stop-opacity=".45"/><stop offset=".55" stop-color="#ff8a3d" stop-opacity=".1"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>
  <linearGradient id="fp-plaque" x2="0" y2="1"><stop offset="0" stop-color="#4a2c1b"/><stop offset="1" stop-color="#301b10"/></linearGradient>
  <clipPath id="fp-arch"><path d="${ARCH}"/></clipPath>
</defs>
<rect width="400" height="150" rx="12" fill="url(#fp-wall)"/>
<path d="M28 0V150M56 0V150M184 0V12M212 0V12M240 0V12M268 0V12M296 0V12M324 0V12M352 0V12M380 0V12M184 134V150M268 134V150M352 134V150" stroke="#000" stroke-opacity=".15"/>
<rect x="14" y="22" width="136" height="116" fill="url(#fp-brick)"/><rect x="14" y="22" width="136" height="116" fill="#000" fill-opacity=".15"/>
<path d="${ARCH}" fill="url(#fp-box)" stroke="#2a150d" stroke-width="3"/>
<g clip-path="url(#fp-arch)">
  <g transform="rotate(-9 82 122)"><rect x="56" y="117" width="54" height="9" rx="4.5" fill="#4d2c19"/><ellipse cx="108" cy="121.5" rx="3" ry="4.5" fill="#a46a3e"/></g>
  <g transform="rotate(8 82 122)"><rect x="54" y="117" width="56" height="9" rx="4.5" fill="#5e3620"/><ellipse cx="56" cy="121.5" rx="3" ry="4.5" fill="#b37a4a"/></g>
  <g opacity=".95">${fire.map(([x, w, h, d], i) => tongue(x, w, h, "url(#fp-outer)", 1.4 + i * 0.17, d)).join("")}</g>
  ${fire.map(([x, w, h, d], i) => tongue(x, w * 0.6, h * 0.62, "#ffc845", 1.2 + i * 0.13, d - 0.5)).join("")}
  ${fire.slice(1, 3).map(([x, w, h, d]) => tongue(x, w * 0.3, h * 0.32, "#fff1b5", 1.1, d)).join("")}
  <ellipse cx="82" cy="128" rx="34" ry="5" fill="#ff7a2a" fill-opacity=".55"/>${embers}
  <g fill="#ffd27a">${[[76, 96, 0], [90, 92, -1.2], [84, 100, -2.1]].map(([x, y, d]) => `<circle class="fp-s" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="1"/>`).join("")}</g>
</g>
<rect x="8" y="134" width="148" height="10" rx="2" fill="#5d4b44"/><rect x="8" y="134" width="148" height="2" fill="#7a6760"/>
<path d="M4 12H160V22H4Z" fill="#6b4128"/><path d="M4 12H160" stroke="#a06a42" stroke-width="2"/><path d="M14 22h10l-4 8h-2ZM140 22h10l-4 8h-2Z" fill="#55321e"/>
<rect class="fp-glow" width="400" height="150" rx="12" fill="url(#fp-warm)"/>
<rect x="172" y="20" width="218" height="110" rx="8" fill="url(#fp-plaque)" stroke="#c9a35a" stroke-width="2.5"/>
<rect x="178" y="26" width="206" height="98" rx="5" fill="none" stroke="#c9a35a" stroke-opacity=".45"/>
<rect class="fp-glow" x="172" y="20" width="218" height="110" rx="8" fill="url(#fp-warm)"/>
<g fill="#c9a35a"><circle cx="181" cy="29" r="1.6"/><circle cx="381" cy="29" r="1.6"/><circle cx="181" cy="121" r="1.6"/><circle cx="381" cy="121" r="1.6"/></g>
<g font-family="${SERIF}">
  <text x="190" y="44" font-size="8.5" letter-spacing="2" fill="#c9a35a">${esc(fit(r.owner.toUpperCase(), 180, 8.5, 0.85))}</text>
  <text x="190" y="66" font-size="17" font-weight="700" fill="#f6dfae">${esc(fit(r.name, 184, 17, 0.6))}</text>
  <text font-size="11" fill="#dcc3a3">${lines(wrap(r.description, 33), 190, 85, 14)}</text>
  ${row(stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, Math.max(30, 110 - textWidth(r.stars + r.forks, 11)), 11) } }, { cy: 113, size: 11, text: 'fill="#f6dfae"', icon: 'fill="#c9a35a"' }), 190, 10)}
</g>`,
  );
};
