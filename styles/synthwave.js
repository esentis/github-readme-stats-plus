import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "80s sunset with a striped sun over a scrolling neon grid.";

// 80s sunset: a striped sun over a neon grid that scrolls toward the viewer.
export default (r) => {
  const items = stats(r, { cy: 125, text: 'fill="#fff" font-weight="600"', icon: 'fill="#ffd319"' });
  const pill = items.reduce((w, [iw]) => w + iw + 18, 6);
  const nameSize = r.name.length > 20 ? 17 : 22;
  const rays = [-300, -100, 100, 200, 300, 500, 700].map((x) => `<line x1="200" y1="100" x2="${x}" y2="150"/>`).join("");
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="ground"><rect y="100" width="400" height="50"/></clipPath>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12002b"/><stop offset="1" stop-color="#4a0d63"/></linearGradient>
  <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd319"/><stop offset="1" stop-color="#ff2975"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <circle cx="322" cy="84" r="46" fill="url(#sun)"/>
  <path d="M270 82h110v2H270zM270 89h110v3H270zM270 95h110v4H270z" fill="#3d0a58"/>
  <rect y="100" width="400" height="50" fill="#14002e"/>
  <g clip-path="url(#ground)" stroke="#ff2975" stroke-opacity=".7">
    ${rays}
    <path d="M0 104H400M0 112H400M0 124H400M0 140H400"><animateTransform attributeName="transform" type="translate" values="0 -8;0 0" dur="1.2s" repeatCount="indefinite"/></path>
  </g>
  <line x1="0" y1="100" x2="400" y2="100" stroke="#ff2975" stroke-width="1.5"/>
</g>
<g font-family="${FONT}">
  <text x="22" y="40" font-size="${nameSize}" font-weight="800" fill="#fff" stroke="#ff2975" stroke-width=".6">${esc(fit(r.name, 250, nameSize))}</text>
  <text font-size="12.5" fill="#e9c9ff">${lines(wrap(r.description, 36), 22, 62, 16)}</text>
  <rect x="16" y="113" width="${pill}" height="24" rx="12" fill="#14002e" fill-opacity=".85"/>
  ${row(items, 28, 18)}
</g>`,
  );
};
