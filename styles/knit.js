// Knitted swatch on a wooden needle: V-stitch wool in the language colour, a cream intarsia name band and a ball of yarn.
import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Knitted swatch: V-stitch wool in the language colour on a wooden needle, a cream intarsia name band and a ball of yarn whose strand sways.";

const INK = "#4a2f20";

export default (r) => {
  const c = r.lang.color;
  // Cast-off edge: 33 little loops along the bottom of the 264px swatch.
  const edge = "a4 4 0 0 1 -8 0".repeat(33);
  const fairisle = (y) => Array.from({ length: 32 }, (_, i) => `M${22 + i * 8} ${y}l3 3-3 3-3-3Z`).join("");
  const by = fit(`made by ${r.owner}`, 150, 8, 0.62);
  const wraps = [-35, 30, 100].map((a, i) => [-5, 0, 5].map((o) => `<ellipse cx="346" cy="${112 + o}" rx="24" ry="${8 + i * 2}" transform="rotate(${a} 346 112)"/>`).join("")).join("");
  const strand = (a) => `M323 99C${a} 279 120`;
  return svg(
    r.name,
    `${motion(".kn-ball{animation:kn-ball 4s ease-in-out infinite;transform-origin:346px 137px}@keyframes kn-ball{0%,100%{transform:rotate(0)}50%{transform:rotate(-3deg)}}")}
<defs>
  <pattern id="kn-v" x="14" y="17" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M4 8.8C1.4 7.6.3 4 .7-.6 2.9.3 4 3.8 4 8.8ZM4 8.8C6.6 7.6 7.7 4 7.3-.6 5.1.3 4 3.8 4 8.8Z" fill="#fff" fill-opacity=".17" stroke="#000" stroke-opacity=".3" stroke-width=".7"/></pattern>
  <pattern id="kn-linen" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 .5H4M.5 0V4" stroke="#b9a184" stroke-opacity=".14"/></pattern>
  <linearGradient id="kn-wood" x2="0" y2="1"><stop offset="0" stop-color="#e3b57c"/><stop offset="1" stop-color="#9c6435"/></linearGradient>
  <filter id="kn-sh" x="-5%" y="-5%" width="110%" height="115%"><feDropShadow dy="2" stdDeviation="2" flood-color="#4a2f20" flood-opacity=".35"/></filter>
  <radialGradient id="kn-shade" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
  <clipPath id="kn-ballclip"><circle cx="346" cy="112" r="25"/></clipPath>
</defs>
<rect width="400" height="150" rx="12" fill="#efe4d0"/><rect width="400" height="150" rx="12" fill="url(#kn-linen)"/>
<g filter="url(#kn-sh)"><path d="M14 13H278V134${edge}Z" fill="${c}"/></g>
<path d="M14 13H278V134${edge}Z" fill="url(#kn-v)"/>
<rect x="14" y="40" width="264" height="64" fill="#f3e8d1"/><rect x="14" y="40" width="264" height="64" fill="url(#kn-v)" opacity=".45"/>
<g fill="${c}" stroke="#000" stroke-opacity=".25" stroke-width=".6"><path d="${fairisle(43)}${fairisle(95)}"/></g>
<rect x="5" y="9" width="300" height="5.5" rx="2.75" fill="url(#kn-wood)"/><path d="M304 9.2L314 11.75 304 14.3Z" fill="#c8915a"/><circle cx="7" cy="11.75" r="5.5" fill="#8a5530"/>
<g font-family="${FONT}" fill="${INK}">
  <text x="26" y="66" font-size="19" font-weight="800">${esc(fit(r.name, 240, 19))}</text>
  <text font-size="11" fill="#6b4c38">${lines(wrap(r.description, 40), 26, 80, 13)}</text>
  <rect x="26" y="111" width="${(by.length * 5 + 14).toFixed(0)}" height="14" rx="1.5" fill="#fbf5e6" stroke="${INK}" stroke-opacity=".25"/>
  <path d="M29 113.5v9M${(by.length * 5 + 37).toFixed(0)} 113.5v9" stroke="${INK}" stroke-opacity=".5" stroke-dasharray="1.5 1.5"/>
  <text x="33" y="121" font-size="8" font-weight="600" fill="#6b4c38">${esc(by)}</text>
  <text x="292" y="36" font-size="9" font-weight="700" letter-spacing="1.5" fill="#8a6a50">${esc(fit(r.lang.name.toUpperCase(), 96, 9, 0.8))}</text>
  <text x="292" y="60" font-size="19" font-weight="800">★ ${esc(r.stars)}</text>
  <text x="292" y="78" font-size="11.5" fill="#6b4c38">⑂ ${esc(r.forks)} forks</text>
</g>
<g fill="none" stroke-linecap="round">
  <path d="${strand("305 82 292 128")}" stroke="#4a2f20" stroke-opacity=".3" stroke-width="3.4"><animate attributeName="d" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" values="${strand("305 82 292 128")};${strand("306 98 290 112")};${strand("305 82 292 128")}"/></path>
  <path d="${strand("305 82 292 128")}" stroke="${c}" stroke-width="2.2"><animate attributeName="d" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" values="${strand("305 82 292 128")};${strand("306 98 290 112")};${strand("305 82 292 128")}"/></path>
</g>
<ellipse cx="346" cy="138" rx="24" ry="3.5" fill="#4a2f20" fill-opacity=".2"/>
<g class="kn-ball"><circle cx="346" cy="112" r="25" fill="${c}"/>
  <g clip-path="url(#kn-ballclip)" fill="none" stroke-width="1">
    <g stroke="#000" stroke-opacity=".22">${wraps}</g><g stroke="#fff" stroke-opacity=".28" transform="translate(-.8 -.8)">${wraps}</g><circle cx="346" cy="112" r="25" fill="url(#kn-shade)" stroke="none"/>
      </g>
</g>`,
  );
};
