import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Deep space with twinkling stars and a ringed planet in the language colour.";

const rnd = (i) => Math.abs(Math.sin(i * 91.7) * 1e4) % 1;
const STARS = Array.from({ length: 50 }, (_, i) => {
  const twinkle = i % 4 ? "" : `<animate attributeName="opacity" values="1;.15;1" dur="${2 + (i % 5)}s" begin="-${i % 3}s" repeatCount="indefinite"/>`;
  return `<circle cx="${(rnd(i) * 400).toFixed(1)}" cy="${(rnd(i + 99) * 150).toFixed(1)}" r="${(0.4 + rnd(i + 7) * 0.9).toFixed(2)}">${twinkle}</circle>`;
}).join("");

// Starfield: twinkling stars, a faint nebula and a ringed planet tinted with the language colour.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="space" cx=".8" cy=".2" r="1"><stop offset="0" stop-color="#1a1f4a"/><stop offset="1" stop-color="#05060f"/></radialGradient>
  <radialGradient id="lit" cx=".3" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>
  <filter id="neb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#space)"/>
  <g filter="url(#neb)" opacity=".45"><ellipse cx="330" cy="70" rx="70" ry="26" fill="${r.lang.color}"/><ellipse cx="270" cy="120" rx="50" ry="18" fill="#7c3aed"/></g>
  <g fill="#fff">${STARS}</g>
  <g transform="translate(350 40) rotate(-18)">
    <ellipse rx="40" ry="8" fill="none" stroke="${r.lang.color}" stroke-opacity=".7" stroke-width="2.5"/>
    <circle r="22" fill="${r.lang.color}"/><circle r="22" fill="url(#lit)"/>
    <path d="M-40 0A40 8 0 0 0 40 0" fill="none" stroke="${r.lang.color}" stroke-width="2.5"/>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".12"/>
<g font-family="${FONT}">
  <text x="24" y="42" font-size="21" font-weight="700" fill="#fff">${esc(fit(r.name, 272, 21))}</text>
  <text font-size="13" fill="#c7d2fe">${lines(wrap(r.description, 46), 24, 68, 17)}</text>
  ${row(stats(r, { cy: 120, text: 'fill="#e0e7ff"', icon: 'fill="#fde68a"' }), 24, 18)}
</g>`,
  );
