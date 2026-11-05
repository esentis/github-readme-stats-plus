import { FONT, MONO, esc, fit, lines, svg, wrap } from "../card.js";

export const about = "VHS cover with a chrome title, rainbow stripes and a stars:forks timecode.";

const STRIPES = ["#ff2975", "#ff8a00", "#ffd319", "#1fd1b2", "#3b82f6"];

// A VHS cover: chrome title, rainbow stripes and a VCR on-screen display with a stars:forks timecode.
export default (r) => {
  const nameSize = r.name.length > 18 ? 22 : 30;
  const time = `00:${String(r.starCount).padStart(2, "0")}:${r.forks.padStart(2, "0")}`;
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="8"/></clipPath>
  <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd319"/><stop offset=".55" stop-color="#ff8a00"/><stop offset="1" stop-color="#ff2975"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#0b0b0f"/>
  <g transform="skewX(-25)">${STRIPES.map((c, i) => `<rect x="${300 + i * 4}" y="${98 + i * 8}" width="200" height="6" fill="${c}"/>`).join("")}</g>
  <rect width="400" height="3" fill="#fff" fill-opacity=".06"><animate attributeName="y" values="-3;150" dur="4s" repeatCount="indefinite"/></rect>
</g>
<g font-family="${MONO}" font-size="12" fill="#fff">
  <text x="22" y="26">PLAY ▶<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.6;.6;1" dur="1.4s" repeatCount="indefinite"/></text>
  <text x="378" y="26" text-anchor="end">SP ${esc(time)}</text>
</g>
<g font-family="${FONT}">
  <text x="22" y="64" font-size="${nameSize}" font-weight="900" font-style="italic" fill="url(#chrome)" stroke="#fff" stroke-width=".8">${esc(fit(r.name, 356, nameSize, 0.62))}</text>
  <text font-size="12" fill="#fff" fill-opacity=".75">${lines(wrap(r.description, 36), 22, 88, 16)}</text>
  <rect x="22" y="118" width="40" height="18" rx="2" fill="none" stroke="#fff"/>
  <text x="42" y="131" font-size="11" font-weight="900" font-style="italic" fill="#fff" text-anchor="middle">VHS</text>
  <text x="70" y="131" font-size="10" font-weight="700" fill="#fff" fill-opacity=".8" letter-spacing="1.5">HI-FI · ${esc(fit(r.lang.name.toUpperCase(), 120, 10, 0.75))}</text>
</g>`,
  );
};
