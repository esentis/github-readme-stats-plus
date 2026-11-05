import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Memphis 80s: squiggles, confetti triangles, dots and zigzags around a hard-shadow panel.";

const PINK = "#ff4f9a";
const YELLOW = "#ffd23f";
const TEAL = "#20c5b5";
const INK = "#1a1a1a";

// White card scattered with 80s Memphis shapes; the panel's hard shadow is the language colour.
export default (r) =>
  svg(
    r.name,
    `<defs><pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.5" fill="${INK}"/></pattern></defs>
<rect width="400" height="150" rx="10" fill="#fff"/>
<rect x="344" y="10" width="46" height="40" fill="url(#dots)"/>
<path d="M8 138q7-10 14 0t14 0t14 0t14 0t14 0" fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round"/>
<path d="M352 68l8 8l8-8l8 8l8-8M352 82l8 8l8-8l8 8l8-8" fill="none" stroke="${PINK}" stroke-width="3" stroke-linejoin="round"/>
<path d="M10 12l16 4l-11 12Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
<path d="M360 120l14-4l-4 14Z" fill="${TEAL}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
<path d="M300 132l10 4l-8 7Z" fill="${PINK}"/><path d="M106 7l8 3l-6 5Z" fill="${TEAL}"/><path d="M14 64l9 2l-5 7Z" fill="${PINK}"/>
<circle cx="386" cy="104" r="5" fill="${YELLOW}" stroke="${INK}" stroke-width="2"/>
<rect x="38" y="28" width="300" height="100" fill="${r.lang.color}" stroke="${INK}" stroke-width="2"/>
<rect x="32" y="22" width="300" height="100" fill="#fff" stroke="${INK}" stroke-width="2"/>
<g font-family="${FONT}" fill="${INK}">
  <text x="46" y="50" font-size="19" font-weight="800">${esc(fit(r.name, 272, 19))}</text>
  <path d="M46 57h${Math.min(272, r.name.length * 11.4)}" stroke="${YELLOW}" stroke-width="4"/>
  <text font-size="12" fill="#333">${lines(wrap(r.description, 44), 46, 76, 15)}</text>
  ${row(stats(r, { cy: 108, size: 11.5, text: 'font-weight="700"', icon: `fill="${INK}"` }), 46, 14)}
</g>`,
  );
