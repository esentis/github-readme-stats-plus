import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";
import { xp } from "./pixel.js";

export const about = "Smartwatch face: activity rings fill with stars and forks toward the next milestone, details beside the watch.";

const C = 2 * Math.PI * 46;
const c2 = 2 * Math.PI * 36;

// A round smartwatch on a strap; the outer ring is stars toward the next milestone, the inner one forks.
export default (r) => {
  const { next } = xp(r.starCount);
  const forks = r.forkCount;
  const fnext = xp(forks).next;
  const ring = (rad, frac, color, circ) =>
    `<circle cx="75" cy="75" r="${rad}" fill="none" stroke="${color}" stroke-opacity=".22" stroke-width="8"/>
  <circle cx="75" cy="75" r="${rad}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(Math.min(frac, 1) * circ).toFixed(1)} ${circ.toFixed(1)}" transform="rotate(-90 75 75)"/>`;
  return svg(
    r.name,
    `<defs><linearGradient id="case" x2="1" y2="1"><stop offset="0" stop-color="#5b5e66"/><stop offset="1" stop-color="#25272c"/></linearGradient></defs>
<rect width="400" height="150" rx="14" fill="#eef0f3"/>
<path d="M48 0H102V150H48Z" fill="#2b2e35"/>
<g fill="#1a1c21"><circle cx="75" cy="141" r="2.2"/><circle cx="75" cy="9" r="2.2"/></g>
<rect x="131" y="62" width="9" height="24" rx="3" fill="#4a4d55"/>
<circle cx="75" cy="75" r="62" fill="url(#case)"/>
<circle cx="75" cy="75" r="57" fill="#050506"/>
<circle cx="75" cy="21" r="1.6" fill="#fff"><animateTransform attributeName="transform" type="rotate" from="0 75 75" to="360 75 75" dur="60s" repeatCount="indefinite"/></circle>
${ring(46, next ? r.starCount / next : 1, r.lang.color, C)}
${ring(36, fnext ? forks / fnext : 1, "#a3e635", c2)}
<g font-family="${FONT}" text-anchor="middle" fill="#fff">
  <text x="75" y="80" font-size="16" font-weight="700">${esc(r.stars)}</text>
  <text x="75" y="91" font-size="7.5" fill="#9ca3af">★ ${next ? `/ ${next >= 1000 ? next / 1000 + "K" : next}` : "MAX"}</text>
</g>
<g font-family="${FONT}">
  <text x="160" y="34" font-size="11" fill="#6b7280">${esc(fit(r.owner, 220, 11))}</text>
  <text x="160" y="56" font-size="18" font-weight="700" fill="#111827">${esc(fit(r.name, 222, 18))}</text>
  <text font-size="11.5" fill="#4b5563">${lines(wrap(r.description, 32), 160, 78, 15)}</text>
  ${row(stats(r, { cy: 122, size: 12, text: 'fill="#111827"', icon: 'fill="#6b7280"' }), 160, 14)}
</g>`,
  );
};
