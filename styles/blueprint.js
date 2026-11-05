import { MONO, esc, fit, lines, svg, wrap } from "../card.js";

export const about = "Technical drawing: stars as a dimension line, language and forks in a title block.";

// Technical drawing: the stars as a dimension line, language and forks in a title block.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <pattern id="minor" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#fff" stroke-opacity=".08"/></pattern>
  <pattern id="major" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#fff" stroke-opacity=".2"/></pattern>
  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#cfe3ff"/></marker>
</defs>
<rect width="400" height="150" rx="6" fill="#0f4c9c"/>
<rect width="400" height="150" rx="6" fill="url(#minor)"/>
<rect width="400" height="150" rx="6" fill="url(#major)"/>
<rect x="7" y="7" width="386" height="136" fill="none" stroke="#cfe3ff" stroke-opacity=".7"/>
<g font-family="${MONO}" fill="#fff">
  <text x="22" y="38" font-size="19" font-weight="700">${esc(fit(r.name, 356, 19))}</text>
  <text font-size="11.5" fill="#cfe3ff">${lines(wrap(r.description, 50), 22, 60, 15)}</text>
  <path d="M22 108V124M198 108V124" stroke="#cfe3ff"/>
  <line x1="24" y1="116" x2="196" y2="116" stroke="#cfe3ff" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
  <text x="110" y="109" font-size="11" text-anchor="middle">★ ${esc(r.stars)} STARS</text>
  <g font-size="10" fill="#cfe3ff">
    <rect x="246" y="94" width="136" height="42" fill="#0f4c9c" stroke="#cfe3ff"/>
    <path d="M246 115H382M300 94V136" stroke="#cfe3ff"/>
    <text x="253" y="108">LANG</text><text x="307" y="108" fill="#fff">${esc(fit(r.lang.name.toUpperCase(), 70, 10))}</text>
    <text x="253" y="129">FORKS</text><text x="307" y="129" fill="#fff">${esc(r.forks)}</text>
  </g>
</g>`,
  );
