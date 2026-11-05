import { FONT, MONO, esc, fit, motion, svg, textWidth, words } from "../card.js";

export const about = "Git commit graph: a main line with a feature branch in the language colour and a fix branch in its complement, merges from the name, and a pulsing HEAD tag.";

// The language colour turned halfway round the colour wheel, kept bright enough for a dark background.
const complement = (hex) => {
  const h = hex.length < 7 ? hex.replace(/\w/g, "$&$&") : hex;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), d = mx - Math.min(r, g, b);
  const hue = d === 0 ? 0 : mx === r ? (g - b) / d : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return `hsl(${(Math.round(hue * 60) + 540) % 360}, 70%, 62%)`;
};
const X = (i) => 34 + i * 38;
const branch = (a, b, lane) => `M${X(a)} 100C${X(a) + 12} 100 ${X(a) + 8} ${lane} ${X(a) + 19} ${lane}H${X(b) - 19}C${X(b) - 8} ${lane} ${X(b) - 12} 100 ${X(b)} 100`;

// Header with name and description, then a left-to-right graph: main in grey, two branches merging back.
export default (r) => {
  const c = (i) => r.name.charCodeAt(i % r.name.length);
  const ws = words(r.name.toLowerCase());
  const a = 1 + (c(0) % 2), b = a + 3 + (c(1) % 2), f = 3 + (c(2) % 2);
  const g = Math.min(6, f + 2 + (c(3) % 2) === b ? b + 1 : f + 2 + (c(3) % 2));
  const [cf, cx] = [r.lang.color, complement(r.lang.color)];
  const dots = (from, to, lane, col) => Array.from({ length: to - from - 1 }, (_, k) => `<circle cx="${X(from + k + 1)}" cy="${lane}" r="4.5" fill="${col}"/>`).join("");
  const lang = fit(r.lang.name, 90, 10.5);
  return svg(
    r.name,
    `${motion(`.gg-h{animation:gg-h 2.4s ease-out infinite;transform-box:fill-box;transform-origin:center}@keyframes gg-h{0%{transform:scale(1);opacity:.8}70%,100%{transform:scale(2.2);opacity:0}}`)}
<rect x=".5" y=".5" width="399" height="149" rx="12" fill="#0f1218" stroke="#262c36"/>
<g fill="none" stroke-width="2.6">
  <path d="M14 100H${X(7)}" stroke="#8b949e"/>
  <path d="${branch(a, b, 76)}" stroke="${cf}"/>
  <path d="${branch(f, g, 124)}" stroke="${cx}"/>
</g>
${dots(a, b, 76, cf)}${dots(f, g, 124, cx)}
<g fill="#0f1218" stroke="#8b949e" stroke-width="2.4">${Array.from({ length: 7 }, (_, i) => `<circle cx="${X(i)}" cy="100" r="4.5"${i === b || i === g ? ` stroke="${i === b ? cf : cx}"` : ""}/>`).join("")}</g>
<circle class="gg-h" cx="${X(7)}" cy="100" r="6" fill="none" stroke="#e6edf3" stroke-width="1.5"/>
<circle cx="${X(7)}" cy="100" r="6" fill="#e6edf3"/>
<g font-family="${MONO}" font-size="9">
  <text x="${X(a + 1) - 4}" y="66" fill="${cf}">${esc(fit(`feat/${ws[0]}`, 120, 9))}</text>
  <text x="${X(f + 1) - 4}" y="143" fill="${cx}">${esc(fit(`fix/${ws[ws.length - 1]}`, 120, 9))}</text>
  <rect x="${X(7) + 12}" y="92" width="72" height="16" rx="8" fill="#e6edf3"/>
  <text x="${X(7) + 48}" y="103" font-weight="700" fill="#0f1218" text-anchor="middle">HEAD → main</text>
</g>
<g font-family="${FONT}">
  <text x="22" y="30" font-size="17" font-weight="700" fill="#e6edf3">${esc(fit(r.name, 250, 17))}</text>
  <text x="378" y="30" font-family="${MONO}" font-size="11.5" font-weight="700" fill="#e6edf3" text-anchor="end">★ ${esc(r.stars)}  ⑂ ${esc(r.forks)}</text>
  <text x="22" y="48" font-size="11" fill="#8b949e">${esc(fit(r.description, 250, 11, 0.55))}</text>
  <circle cx="${367 - textWidth(lang, 10.5)}" cy="44.5" r="4" fill="${cf}"/>
  <text x="378" y="48" font-size="10.5" fill="#c9d1d9" text-anchor="end">${esc(lang)}</text>
</g>`,
  );
};
