import { esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Die-cut vinyl sticker in the language colour: thick white border, a slight tilt and a peeling corner.";

const ROUND = "'Arial Rounded MT Bold', 'Varela Round', 'Trebuchet MS', sans-serif";

// A tilted die-cut sticker; the cut-off bottom-right corner is drawn folded back over the face.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#1b1b1f" : "#fff";
  return svg(
    r.name,
    `<defs>
  <filter id="lift" x="-10%" y="-20%" width="120%" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dx="1" dy="4"/><feComponentTransfer><feFuncA type="linear" slope=".3"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <linearGradient id="back" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9c9d1"/><stop offset=".5" stop-color="#fdfdfd"/><stop offset="1" stop-color="#e9e9ee"/></linearGradient>
</defs>
<g transform="rotate(-2.5 200 76)">
  <path d="M60 24H340A32 32 0 0 1 372 56V94L338 128H60A32 32 0 0 1 28 96V56A32 32 0 0 1 60 24Z" fill="${r.lang.color}" stroke="#fff" stroke-width="10" stroke-linejoin="round" filter="url(#lift)"/>
  <circle cx="78" cy="76" r="31" fill="#fff"/>
  <circle cx="78" cy="76" r="26" fill="none" stroke="${r.lang.color}" stroke-width="1.5" stroke-dasharray="3 3"/>
  <g font-family="${ROUND}" font-weight="700" text-anchor="middle">
    <text x="78" y="73" font-size="20" fill="#f5a400">★</text>
    <text x="78" y="93" font-size="${r.stars.length > 4 ? 12 : 15}" fill="#1b1b1f">${esc(r.stars)}</text>
  </g>
  <g font-family="${ROUND}" fill="${ink}">
    <text x="124" y="60" font-size="22" font-weight="700">${esc(fit(r.name, 232, 22))}</text>
    <text font-size="12" fill-opacity=".85">${lines(wrap(r.description, 33), 124, 80, 15)}</text>
    <text x="124" y="117" font-size="12" font-weight="700">${esc(fit(`${r.forks} forks · ${r.lang.name}`, 200, 12))}</text>
  </g>
  <path d="M372 94L338 128L340 96Z" fill="#000" fill-opacity=".18" transform="translate(-3 -2)"/>
  <path d="M377 94L338 133L339 94Z" fill="url(#back)" stroke="#d4d4da" stroke-width=".8" stroke-linejoin="round"/>
</g>`,
  );
};
