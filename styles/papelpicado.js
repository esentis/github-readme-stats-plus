import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Papel picado: a string of swaying cut-paper flags with punched-out patterns, one in the language colour, on a night-plum wall.";

const W = 50;
// One flag outline with a zigzag bottom edge, drawn from its own top-left corner.
const FLAG = `M0 0H${W}V40` + Array.from({ length: 12 }, (_, i) => `L${(W - ((i + 1) * W) / 12).toFixed(1)} ${i % 2 ? 40 : 46}`).join("") + "Z";

// Cut-outs shared by every flag: a centre flower, side diamonds and a row of holes under the string.
const CUTS = `<circle cx="25" cy="22" r="5"/>${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="25" cy="13" rx="2.6" ry="4" transform="rotate(${a} 25 22)"/>`).join("")}
  <path d="M9 22l3-5 3 5-3 5zM35 22l3-5 3 5-3 5z"/>${[7, 15, 23, 31, 39].map((x) => `<circle cx="${x + 2}" cy="6" r="1.4"/>`).join("")}
  ${[5, 13, 21, 29, 37, 45].map((x) => `<path d="M${x - 2} 40l2-4 2 4z"/>`).join("")}`;

// Mexican cut-paper bunting across the top; each flag sways on the string at its own pace.
export default (r) => {
  const colors = ["#ff4fa3", "#ff8c1a", "#ffd23f", r.lang.color, "#43c14a", "#3a86ff", "#9b5de5"];
  const flags = colors
    .map((c, i) => `<g transform="translate(${7 + i * 55} 9)"><g><path d="${FLAG}" fill="${c}" mask="url(#cut)"/><animateTransform attributeName="transform" type="rotate" values="-3 25 0;3 25 0;-3 25 0" dur="${2.6 + (i % 3) * 0.5}s" repeatCount="indefinite"/></g></g>`)
    .join("");
  return svg(
    r.name,
    `<defs><mask id="cut" maskUnits="userSpaceOnUse" x="-5" y="-5" width="60" height="60"><rect x="-5" y="-5" width="60" height="60" fill="#fff"/><g fill="#000">${CUTS}</g></mask></defs>
<rect width="400" height="150" rx="10" fill="#2a1736"/>
<path d="M0 8Q200 14 400 8" fill="none" stroke="#e9d8c4" stroke-width="1.2"/>
${flags}
<g font-family="${FONT}">
  <text x="20" y="84" font-size="19" font-weight="800" fill="#fff">${esc(fit(r.name, 360, 19))}</text>
  <text font-size="12" fill="#d9c7e6">${lines(wrap(r.description, 58, 1), 20, 104, 15)}</text>
  ${row(stats(r, { cy: 128, size: 12, text: 'fill="#fff"', icon: 'fill="#ffd23f"' }), 20, 18)}
  <text x="380" y="132" font-size="11" fill="#b9a4c9" text-anchor="end">${esc(fit(r.owner, 110, 11))}</text>
</g>`,
  );
};
