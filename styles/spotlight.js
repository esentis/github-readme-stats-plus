import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "The star count is the hero, over a pulsing glow.";

// The star count is the hero, over a pulsing glow in the language colour.
export default (r) => {
  const [lang, , forks] = stats(r, { cy: 121, text: 'fill="#e5e7eb"', icon: 'fill="#b6bcc8"' });
  const nameSize = r.name.length > 18 ? 16 : 21;
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="335" cy="70" r="120">
    <stop offset="0" stop-color="${r.lang.color}" stop-opacity=".55"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity="0"/>
  </radialGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#111318"/>
  <rect width="400" height="150" fill="url(#glow)"><animate attributeName="opacity" values="1;.55;1" dur="5s" repeatCount="indefinite"/></rect>
  <rect width="5" height="150" fill="${r.lang.color}"/>
</g>
<g font-family="${FONT}">
  <text x="26" y="44" font-size="${nameSize}" font-weight="700" fill="#fff">${esc(fit(r.name, 250, nameSize))}</text>
  <text font-size="13.5" fill="#b6bcc8">${lines(wrap(r.description, 34), 26, 70, 18)}</text>
  ${row([lang, forks], 26, 22)}
  <text x="335" y="88" font-size="${r.stars.length > 3 ? 42 : 60}" font-weight="800" fill="#fff" text-anchor="middle">${esc(r.stars)}</text>
  <text x="335" y="112" font-size="12" fill="#fff" fill-opacity=".75" text-anchor="middle" letter-spacing="2">STARS</text>
</g>`,
  );
};
