// Bokeh: out-of-focus discs in the language colour and its neighbours float and breathe behind a crisp frosted-glass label.
import { FONT, esc, fit, lines, motion, row, stats, rng, svg, wrap } from "../card.js";

export const about = "Out-of-focus light discs in the language colour and its complements, floating and breathing behind a frosted glass label.";

// Hue and saturation of a hex colour; greys get a calm blue so the discs still have colour.
const hue = (hex) => {
  const h = hex.length < 6 ? hex.replace(/\w/g, "$&$&") : hex;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  if (d < 0.12) return [220, 45];
  const H = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [Math.round(H * 60 + 360) % 360, Math.max(60, Math.round((d / (1 - Math.abs(2 * max - d - 1) || 1)) * 100))];
};

export default (r) => {
  const v = Array.from({ length: 1000 }, rng(r.name)), rnd = (i) => v[i];
  const [H, S] = hue(r.lang.color);
  const tones = [0, 0, 32, -32, 180, 150].map((o, i) => `hsl(${(H + o + 360) % 360},${S}%,${i % 2 ? 68 : 58}%)`);
  const disc = (i, x, y, rad) =>
    `<g class="bk-f" style="animation-duration:${(7 + rnd(i + 300) * 6).toFixed(1)}s;animation-delay:${(-rnd(i + 400) * 12).toFixed(1)}s"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="${tones[i % 6]}" fill-opacity="${(0.22 + rnd(i + 500) * 0.25).toFixed(2)}" stroke="${tones[i % 6]}" stroke-opacity=".55" stroke-width="1.2"/></g>`;
  const far = Array.from({ length: 9 }, (_, i) => disc(i, rnd(i) * 420 - 10, rnd(i + 20) * 170 - 10, 22 + rnd(i + 40) * 16)).join("");
  const near = Array.from({ length: 9 }, (_, i) => disc(i + 9, i < 5 ? 296 + rnd(i + 60) * 92 : rnd(i + 60) * 280, 12 + rnd(i + 80) * 126, 7 + rnd(i + 100) * 13)).join("");
  const layers = `<g filter="url(#bk-far)">${far}</g><g filter="url(#bk-near)">${near}</g>`;
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 116, size: 12, text: 'fill="#fff"', icon: 'fill="#c9cde0"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="bk-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="bk-glass"><rect x="14" y="14" width="272" height="122" rx="12"/></clipPath>
  <radialGradient id="bk-bg" cx=".7" cy=".45" r=".8"><stop offset="0" stop-color="#1b2040"/><stop offset="1" stop-color="#080a16"/></radialGradient>
  <linearGradient id="bk-sheen" x2=".3" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity=".03"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>
  <filter id="bk-far" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3.2"/></filter>
  <filter id="bk-near" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1"/></filter>
  <filter id="bk-frost" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter>
</defs>
${motion(`.bk-f{animation:bk-float 9s ease-in-out infinite}@keyframes bk-float{50%{transform:translateY(-7px);opacity:.55}}`)}
<g clip-path="url(#bk-clip)">
  <rect width="400" height="150" fill="url(#bk-bg)"/>
  ${layers}
  <g clip-path="url(#bk-glass)"><rect width="400" height="150" fill="#0b0e1e"/><g filter="url(#bk-frost)">${layers}</g></g>
  <rect x="14" y="14" width="272" height="122" rx="12" fill="#0b0e1e" fill-opacity=".22"/>
  <rect x="14" y="14" width="272" height="122" rx="12" fill="url(#bk-sheen)" stroke="#fff" stroke-opacity=".22"/>
  <path d="M26 14.5H274" stroke="#fff" stroke-opacity=".45" stroke-width=".8"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <text x="30" y="38" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#a7adc8">${esc(fit(r.owner.toUpperCase(), 230, 9.5, 0.78))}</text>
  <text x="30" y="60" font-size="20" font-weight="700" fill="#fff">${esc(fit(r.name, 240, 20))}</text>
  <text font-size="12" fill="#cfd3e6">${lines(wrap(r.description, 34), 30, 80, 15)}</text>
  ${row(st, 30, 13)}
</g>`,
  );
};
