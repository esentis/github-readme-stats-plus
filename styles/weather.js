import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Weather widget: soft sky gradient, stars as the big temperature, the language as the condition and a small forecast row.";

const sun = (x, y, s, c = "#ffd23f") =>
  `<g transform="translate(${x} ${y}) scale(${s})" stroke="${c}" stroke-width="2" stroke-linecap="round"><circle r="6" fill="${c}"/><path d="M0-10V-12M0 10V12M-10 0H-12M10 0H12M7-7L8.5-8.5M-7 7L-8.5 8.5M7 7L8.5 8.5M-7-7L-8.5-8.5"/></g>`;
const cloud = (x, y, s) =>
  `<g class="wx-cloud"><path transform="translate(${x} ${y}) scale(${s})" fill="#fff" d="M-9 5a5 5 0 010-10a7 7 0 0113-1a5 5 0 014 11z"/></g>`;

// A phone weather widget: location, temperature and condition on the left, summary and forecast on the right.
export default (r) => {
  const c = r.lang.color;
  const forecast = ["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => {
    const x = 234 + i * 32, kind = r.name.charCodeAt(i % r.name.length) % 3;
    const art = kind === 0 ? sun(x, 120, 0.55) : kind === 1 ? cloud(x, 121, 0.75) : sun(x - 3, 117, 0.45) + cloud(x + 2, 123, 0.6);
    return `<text x="${x}" y="103" text-anchor="middle">${d}</text>${art}`;
  }).join("");
  return svg(
    r.name,
    `${motion(".wx-sun{transform-box:fill-box;transform-origin:center;animation:wx-sun 10s linear infinite}@keyframes wx-sun{to{transform:rotate(45deg)}}.wx-cloud{animation:wx-cloud 5s ease-in-out infinite}@keyframes wx-cloud{50%{transform:translateX(1.5px)}}")}
<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="20"/></clipPath>
  <linearGradient id="sky" x2=".4" y2="1"><stop offset="0" stop-color="#6ba9f2"/><stop offset="1" stop-color="#2c5fc2"/></linearGradient>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <circle cx="190" cy="20" r="60" fill="${c}" opacity=".6" filter="url(#blur)"/>
</g>
<rect x="212" y="14" width="174" height="122" rx="14" fill="#fff" fill-opacity=".16"/>
<g font-family="${FONT}" fill="#fff">
  <path d="M22 28L33 23L28 34L27.5 29Z"/>
  <text x="38" y="33" font-size="14" font-weight="600">${esc(fit(r.name, 160, 14))}</text>
  <text x="18" y="86" font-size="50" font-weight="200">${esc(r.stars)}°</text>
  <text x="22" y="107" font-size="13.5" font-weight="600">${esc(fit(r.lang.name, 170, 13.5))}</text>
  <text x="22" y="125" font-size="11.5" fill-opacity=".85">H:★${esc(r.stars)}   L:⑂${esc(r.forks)}</text>
  <g class="wx-sun">${sun(188, 68, 0.85)}</g>
  <text font-size="10.5" fill-opacity=".92">${lines(wrap(r.description, 22, 3), 224, 34, 14)}</text>
  <path d="M224 90H374" stroke="#fff" stroke-opacity=".3"/>
  <g font-size="8.5" font-weight="600" fill-opacity=".85">${forecast}</g>
</g>`,
  );
};
