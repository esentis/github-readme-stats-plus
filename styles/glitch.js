import { FONT, MONO, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "RGB-split glitch title with displaced scanline slices that jitter now and then.";

const JITTER = 'calcMode="discrete" keyTimes="0;.82;.86;.9;.94;1" dur="4s" repeatCount="indefinite"';

// RGB-split glitch: cyan/magenta ghosts of the title, sliced and shifted strips, scanlines over everything.
export default (r) => {
  const name = esc(fit(r.name, 350, 24, 0.64));
  const copy = (fill, x = 22) => `<text x="${x}" y="50" fill="${fill}">${name}</text>`;
  const slice = (y, h, shift) =>
    `<g clip-path="url(#s${y})"><g>${copy("#fff")}<animateTransform attributeName="transform" type="translate" values="0 0;${shift} 0;${-shift / 2} 0;0 0;${shift / 2} 0;0 0" ${JITTER}/></g></g>`;
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="10"/></clipPath>
  <clipPath id="s33"><rect y="33" width="400" height="5"/></clipPath>
  <clipPath id="s44"><rect y="44" width="400" height="3"/></clipPath>
  <pattern id="scan" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity=".45"/></pattern>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#07070c"/>
  <g fill-opacity=".55"><rect x="250" y="20" width="130" height="3" fill="#00f0ff"/><rect x="290" y="101" width="100" height="5" fill="#ff2bd6"/><rect x="220" y="108" width="44" height="2" fill="${r.lang.color}"/><rect x="0" y="142" width="80" height="2" fill="#00f0ff"/></g>
  <rect width="5" height="150" fill="${r.lang.color}"/><rect y="60" width="9" height="14" fill="${r.lang.color}"/>
</g>
<g font-family="${FONT}" font-size="24" font-weight="800">
  <g style="mix-blend-mode:screen">
    <g>${copy("#00f0ff", 19.5)}${copy("#ff2bd6", 24.5)}<animateTransform attributeName="transform" type="translate" values="0 0;-3 1;4 -1;0 0;2 0;0 0" ${JITTER}/></g>
  </g>
  ${copy("#fff")}
  ${slice(33, 5, 10)}${slice(44, 3, -8)}
</g>
<g font-family="${MONO}">
  <text font-size="12" fill="#a3a8c3">${lines(wrap(r.description, 48), 22, 76, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#e6e8f5"', icon: 'fill="#00f0ff"' }), 22, 20)}
</g>
<rect width="400" height="150" fill="url(#scan)" clip-path="url(#clip)"/>`,
  );
};
