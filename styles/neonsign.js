import { FONT, esc, fit, svg, textWidth } from "../card.js";

export const about = "Neon sign on a dark brick wall: glowing tube lettering in the language colour on metal standoffs, with an occasional flicker. Shows no description.";

// Each tube is a blurred coloured copy under a white-cored one.
const tube = (body, y, size, color) =>
  `<text x="200" y="${y}" font-size="${size}" fill="none" stroke="${color}" stroke-width="6" filter="url(#glow)">${body}</text>
  <text x="200" y="${y}" font-size="${size}" fill="#fff" stroke="${color}" stroke-width="2" stroke-linejoin="round" paint-order="stroke">${body}</text>`;

const standoff = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-4" y="-9" width="8" height="18" rx="2" fill="#5b5b62"/><circle r="2" fill="#9a9aa2"/></g>`;

// A neon sign mounted on bricks: name in a tube, an underline tube, and stats in a pink tube.
export default (r) => {
  const size = r.name.length > 14 ? 22 : 30;
  const name = fit(r.name, 330, size);
  const half = Math.min(textWidth(name, size), 330) / 2;
  const lang = fit(r.lang.name.toUpperCase(), 110, 15);
  const low = textWidth(`★ ${r.stars}   ⑂ ${r.forks}   ${lang}`, 15) / 2 + 16;
  return svg(
    r.name,
    `<defs>
  <clipPath id="wall"><rect width="400" height="150" rx="12"/></clipPath>
  <pattern id="brick" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#140c0a"/><rect x="1" y="1" width="38" height="8" rx="1" fill="#3a201a"/><rect x="-19" y="11" width="38" height="8" rx="1" fill="#331c17"/><rect x="21" y="11" width="38" height="8" rx="1" fill="#3e241d"/></pattern>
  <radialGradient id="vignette" cx=".5" cy=".45" r=".7"><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".8"/></radialGradient>
  <filter id="glow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="wash" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
</defs>
<g clip-path="url(#wall)">
  <rect width="400" height="150" fill="url(#brick)"/>
  <ellipse cx="200" cy="72" rx="150" ry="50" fill="${r.lang.color}" opacity=".35" filter="url(#wash)"/>
  <rect width="400" height="150" fill="url(#vignette)"/>
  ${standoff(200 - half - 14, 46)}${standoff(200 + half + 14, 46)}${standoff(200 - low, 116)}${standoff(200 + low, 116)}
  <path d="M${200 + half + 14} 55Q${210 + half} 92 400 90" fill="none" stroke="#0a0a0a" stroke-width="2.5"/>
</g>
<g font-family="${FONT}" font-weight="700" text-anchor="middle" stroke-linecap="round">
  <g>
    ${tube(esc(name), 66, size, r.lang.color)}
    <path d="M${200 - half} 82H${200 + half}" stroke="${r.lang.color}" stroke-width="6" filter="url(#glow)"/>
    <path d="M${200 - half} 82H${200 + half}" stroke="#fff" stroke-width="2"/>
    <animate attributeName="opacity" values="1;1;.3;1;.5;1;1" keyTimes="0;.86;.87;.88;.9;.91;1" dur="7s" repeatCount="indefinite"/>
  </g>
  ${tube(`★ ${esc(r.stars)}   ⑂ ${esc(r.forks)}   ${esc(lang)}`, 121, 15, "#ff4fb8")}
</g>`,
  );
};
