import { esc, fit, lines, svg, wrap } from "../card.js";

export const about = "Embroidered patch: satin-stitched border in the language colour, twill fabric and thread lettering.";

const THREAD = "'Arial Rounded MT Bold', 'Trebuchet MS', 'Segoe UI', sans-serif";
const EDGE = 'stroke="#0b1222" stroke-width="2.4" stroke-linejoin="round" paint-order="stroke"';

// An embroidered patch: satin border with a dashed stitch line, twill weave and raised thread text.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <pattern id="twill" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="#1d2945"/><rect width="2" height="5" fill="#25355c"/></pattern>
  <pattern id="satin" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(60)"><rect width="3" height="1.2" fill="#000" fill-opacity=".22"/></pattern>
</defs>
<rect x="6" y="6" width="388" height="138" rx="28" fill="url(#twill)"/>
<rect x="6" y="6" width="388" height="138" rx="28" fill="none" stroke="${r.lang.color}" stroke-width="10"/>
<rect x="6" y="6" width="388" height="138" rx="28" fill="none" stroke="url(#satin)" stroke-width="10"/>
<rect x="1.5" y="1.5" width="397" height="147" rx="32" fill="none" stroke="#0b1222" stroke-opacity=".45" stroke-width="1.5"/>
<rect x="17" y="17" width="366" height="116" rx="18" fill="none" stroke="#efe3c4" stroke-opacity=".7" stroke-width="1.4" stroke-dasharray="5 3.5"/>
<g font-family="${THREAD}" font-weight="700" text-anchor="middle">
  <text x="200" y="56" font-size="23" fill="#f6ead0" ${EDGE}>${esc(fit(r.name, 320, 23, 0.62))}</text>
  <text x="200" y="56" font-size="23" fill="url(#satin)">${esc(fit(r.name, 320, 23, 0.62))}</text>
  <text font-size="12" fill="#cdd6ea" ${EDGE}>${lines(wrap(r.description, 44), 200, 80, 16)}</text>
  <text x="200" y="121" font-size="13" fill="#f6ead0" ${EDGE}><tspan fill="#ffd166">★ ${esc(r.stars)}</tspan>   <tspan fill="${r.lang.color}">●</tspan> ${esc(fit(r.lang.name, 100, 13))}   ⑂ ${esc(r.forks)}</text>
</g>`,
  );
