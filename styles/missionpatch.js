// Embroidered round mission patch on jacket canvas: rocket over a planet, orbit ring, star count stitched into the border.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Embroidered round mission patch with a rocket, orbit ring and the star count stitched into its border; mission details beside it.";

const T = "#f3d27a";

export default (r) => {
  const c = r.lang.color;
  const ring = (d, w) => `<path d="${d}" fill="none" stroke="${T}" stroke-width="${w}"/>`;
  return svg(
    r.name,
    `<defs>
  <pattern id="mp-canvas" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4L4 0" stroke="#000" stroke-opacity=".05"/></pattern>
  <pattern id="mp-twill" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="1.2" height="3" fill="#fff" fill-opacity=".07"/></pattern>
  <path id="mp-top" d="M28 75A50 50 0 0 1 128 75"/>
  <path id="mp-bot" d="M21 75A57 57 0 0 0 135 75"/>
  <clipPath id="mp-in"><circle cx="78" cy="75" r="45"/></clipPath>
  <radialGradient id="mp-sky" cx=".5" cy=".3"><stop offset="0" stop-color="#2c4386"/><stop offset="1" stop-color="#0e1838"/></radialGradient>
  <filter id="mp-sh" x="-10%" y="-10%" width="120%" height="125%"><feDropShadow dy="1.5" stdDeviation="1.5" flood-opacity=".35"/></filter>
</defs>
${motion(`.mp-flame{transform-box:fill-box;transform-origin:50% 0;animation:mp-flick 2s ease-in-out infinite}.mp-tw{animation:mp-tw 3s ease-in-out infinite}
@keyframes mp-flick{0%,100%{transform:scaleY(1)}25%{transform:scaleY(.78)}50%{transform:scaleY(1.08)}75%{transform:scaleY(.86)}}@keyframes mp-tw{50%{opacity:.25}}`)}
<rect width="400" height="150" rx="12" fill="#e9e3d4"/><rect width="400" height="150" rx="12" fill="url(#mp-canvas)"/>
<g filter="url(#mp-sh)"><circle cx="78" cy="75" r="64" fill="${T}"/></g>
<circle cx="78" cy="75" r="61" fill="#13204a"/><circle cx="78" cy="75" r="61" fill="url(#mp-twill)"/>
<circle cx="78" cy="75" r="62.5" fill="none" stroke="#9b7a23" stroke-dasharray="2 1.4" stroke-width=".8"/>
<circle cx="78" cy="75" r="47" fill="${T}"/>
<g clip-path="url(#mp-in)">
  <rect x="30" y="28" width="96" height="94" fill="url(#mp-sky)"/>
  <g fill="#fff" class="mp-tw"><circle cx="52" cy="50" r="1.2"/><circle cx="104" cy="44" r="1"/><circle cx="110" cy="70" r="1.3"/></g>
  <g fill="#fff" fill-opacity=".8"><circle cx="46" cy="72" r=".9"/><circle cx="66" cy="38" r=".9"/><circle cx="96" cy="58" r=".8"/></g>
  <circle cx="78" cy="160" r="64" fill="${c}"/><circle cx="78" cy="160" r="64" fill="url(#mp-twill)"/>
  <path d="M30 104Q78 88 126 104" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>
</g>
<g transform="rotate(-18 78 70)">${ring("M40 70A38 11 0 0 1 116 70", 2)}</g>
<path class="mp-flame" d="M72 84Q78 106 84 84Z" fill="#f59e0b"/><path class="mp-flame" d="M75 84Q78 97 81 84Z" fill="#fde68a"/>
<path d="M69 72L60 88L70 84ZM87 72L96 88L86 84Z" fill="#c2410c"/>
<path d="M78 34C87 43 89 58 88 84H68C67 58 69 43 78 34Z" fill="#f5f2ea" stroke="#9c958a" stroke-width=".8"/>
<circle cx="78" cy="56" r="4.5" fill="${c}" stroke="#55534e" stroke-width="1.2"/>
<g transform="rotate(-18 78 70)">${ring("M40 70A38 11 0 0 0 116 70", 2)}</g>
<circle cx="78" cy="75" r="47" fill="none" stroke="#9b7a23" stroke-dasharray="2 1.4" stroke-width=".8"/>
<g font-family="${FONT}" font-weight="800" fill="${T}">
  <text font-size="10" letter-spacing="1.5"><textPath href="#mp-top" startOffset="50%" text-anchor="middle">★ ${esc(r.stars)} STARS ★</textPath></text>
  <text font-size="8.5" letter-spacing="1.5"><textPath href="#mp-bot" startOffset="50%" text-anchor="middle">${esc(fit(r.lang.name.toUpperCase(), 100, 8.5, 0.8))}</textPath></text>
  <text x="22" y="78.5" font-size="9">★</text><text x="134" y="78.5" font-size="9" text-anchor="end">★</text>
</g>
<g font-family="${FONT}">
  <text x="160" y="32" font-size="9" font-weight="700" fill="#9b7a23" letter-spacing="2">MISSION · ${esc(fit(r.owner.toUpperCase(), 130, 9, 0.85))}</text>
  <text x="160" y="56" font-size="19" font-weight="800" fill="#13204a">${esc(fit(r.name, 226, 19, 0.62))}</text>
  <text font-size="11.5" fill="#4b4f5c">${lines(wrap(r.description, 33), 160, 77, 15)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#13204a" font-weight="600"', icon: 'fill="#9b7a23"' }), 160, 14)}
</g>`,
  );
};
