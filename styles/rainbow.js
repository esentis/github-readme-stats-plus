// Rainbow: a pastel sky after rain, a rainbow rising from soft hills with a glint running along its bands, drifting clouds.
import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Pastel sky after the rain: a rainbow over soft hills with a glint gliding along its bands, clouds drifting by.";

const CX = 330, CY = 150;
const BANDS = ["#f59aa3", "#f8b98a", "#f6d982", "#b3df9c", "#97cfea", "#a3aeee", "#c6a2e8"];
const arc = (rad) => `M${CX - rad} ${CY}A${rad} ${rad} 0 0 1 ${CX + rad} ${CY}`;
const cloud = (x, y, s, cls) =>
  `<g class="${cls}"><g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="6" rx="26" ry="7"/><circle cx="-10" cy="1" r="9"/><circle cx="4" cy="-3" r="12"/><circle cx="16" cy="3" r="7"/></g></g>`;

export default (r) => {
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 126, size: 12, text: 'fill="#2b3a57"', icon: 'fill="#7c8db0"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="rb-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="rb-sky" x2="0" y2="1"><stop offset="0" stop-color="#bcdcfa"/><stop offset=".55" stop-color="#e8e5f7"/><stop offset="1" stop-color="#fff0e0"/></linearGradient>
  <radialGradient id="rb-sun" cx="1" cy="0" r=".9"><stop offset="0" stop-color="#fffbe9"/><stop offset="1" stop-color="#fffbe9" stop-opacity="0"/></radialGradient>
  <filter id="rb-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="rb-soft"><feGaussianBlur stdDeviation=".8"/></filter>
</defs>
${motion(`.rb-glint{animation:rb-glint 7s linear infinite}.rb-c1{animation:rb-drift 13s ease-in-out infinite alternate}.rb-c2{animation:rb-drift 17s ease-in-out -6s infinite alternate-reverse}
@keyframes rb-glint{to{stroke-dashoffset:-300}}@keyframes rb-drift{to{transform:translateX(12px)}}`)}
<g clip-path="url(#rb-clip)">
  <rect width="400" height="150" fill="url(#rb-sky)"/>
  <rect x="160" width="240" height="150" fill="url(#rb-sun)" opacity=".9"/>
  <path d="${arc(61)}Z" fill="#fff" fill-opacity=".28"/>
  <g fill="none" stroke-width="7" opacity=".55" filter="url(#rb-blur)">${BANDS.map((c, i) => `<path d="${arc(93 - i * 5)}" stroke="${c}"/>`).join("")}</g>
  <g fill="none" stroke-width="5.4" opacity=".9">${BANDS.map((c, i) => `<path d="${arc(93 - i * 5)}" stroke="${c}"/>`).join("")}</g>
  <path class="rb-glint" d="${arc(78)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="34" stroke-dasharray="22 278" filter="url(#rb-blur)"/>
  <g filter="url(#rb-soft)" opacity=".95">${cloud(296, 26, 1, "rb-c1")}${cloud(366, 52, 0.7, "rb-c2")}${cloud(254, 14, 0.5, "rb-c2")}</g>
  <path d="M212 150C236 132 262 126 292 130S350 118 400 122V150Z" fill="#cfe7c3"/>
  <path d="M250 150C276 138 304 134 336 138S380 132 400 134V150Z" fill="#addb9f"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#9fb4d6" stroke-opacity=".45"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#7c8db0">${esc(fit(r.owner.toUpperCase(), 190, 9.5, 0.78))}</text>
  <text x="24" y="54" font-size="20" font-weight="700" fill="#1f2d4a">${esc(fit(r.name, 206, 20))}</text>
  <text font-size="12" fill="#55627c">${lines(wrap(r.description, 29), 24, 76, 16)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
