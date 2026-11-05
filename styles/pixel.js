import { MONO, esc, fit, lines, row, svg, textWidth, wrap } from "../card.js";

const MILESTONES = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

// The XP bar fills toward the next star milestone, and stays full past the last one.
export const xp = (stars) => {
  const next = MILESTONES.find((m) => m > stars);
  return { next, blocks: next ? Math.floor((stars / next) * 10) : 10 };
};

// 8-bit game dialog box.
export default (r) => {
  const { next, blocks } = xp(r.starCount);
  const items = [
    [`LV.${r.lang.name.toUpperCase()}`, "#5eead4"],
    [`★x${r.stars}`, "#ffd84a"],
    [`⑂x${r.forks}`, "#ff8fab"],
  ].map(([s, c]) => [textWidth(s, 12), `<text y="104" fill="${c}">${esc(s)}</text>`]);
  const bar = Array.from(
    { length: 10 },
    (_, i) => `<rect x="${46 + i * 14}" y="118" width="12" height="12" fill="${i < blocks ? "#7cff6b" : "#3a3756"}"/>`,
  ).join("");
  return svg(
    r.name,
    `<polygon fill="#f8f8f2" points="8,0 392,0 392,4 396,4 396,8 400,8 400,142 396,142 396,146 392,146 392,150 8,150 8,146 4,146 4,142 0,142 0,8 4,8 4,4 8,4"/>
<rect x="6" y="6" width="388" height="138" fill="#1d1b2e"/>
<g font-family="${MONO}" font-weight="700">
  <text x="22" y="38" font-size="17" fill="#ffd84a">▶ ${esc(fit(r.name.toUpperCase(), 336, 17))}</text>
  <text font-size="11.5" font-weight="400" fill="#c9c6e0">${lines(wrap(r.description, 50), 22, 60, 15)}</text>
  <g font-size="12">
    ${row(items, 22, 22)}
    <text x="22" y="128" fill="#f8f8f2">XP</text>
    ${bar}
    <text x="192" y="128" font-weight="400" fill="#8f8bb3">${next ? `${r.starCount}/${next}` : "MAX"}</text>
    <text x="372" y="132" fill="#f8f8f2">▼<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.5;.5;1" dur="1s" repeatCount="indefinite"/></text>
  </g>
</g>`,
  );
};
