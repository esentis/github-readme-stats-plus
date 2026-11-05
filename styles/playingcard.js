import { esc, fit, isLight, motion, svg } from "../card.js";

export const about = "Playing card: star count as the rank with a suit in the language colour, ornate centre band with the repo name. Shows no description.";

const SERIF = "'Playfair Display', Didot, 'Bodoni 72', Georgia, serif";

// A playing card on its side; the suit is picked from the repo name so it stays the same.
export default (r) => {
  const suit = "♠♥♦♣"[[...r.name].reduce((a, c) => a + c.charCodeAt(0), 0) % 4];
  const edge = isLight(r.lang.color) ? `stroke="#333" stroke-width=".8"` : "";
  const rank = r.stars.length > 2 ? 14 : 20;
  const index = (t) =>
    `<g transform="${t}" text-anchor="middle"><text x="26" y="${28 + rank * 0.3}" font-size="${rank}" font-weight="700" fill="#1b1b1b">${esc(r.stars)}</text><text x="26" y="${52 + rank * 0.3}" font-size="20" fill="${r.lang.color}" ${edge}>${suit}</text></g>`;
  const pips = (y, skip = []) =>
    Array.from({ length: 9 }, (_, i) => (skip.includes(i) ? "" : `<text class="pc-pip" style="animation-delay:${i * 0.15}s;transform-origin:${116 + i * 21}px ${y - 4}px" x="${116 + i * 21}" y="${y}">${suit}</text>`)).join("");
  return svg(
    r.name,
    `${motion(".pc-pip { animation: pc-pip 5s ease-in-out infinite } @keyframes pc-pip { 0%, 14%, 100% { transform: none } 7% { transform: scale(1.35) } }")}
<defs><pattern id="lace" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M5 0L10 5L5 10L0 5Z" fill="none" stroke="${r.lang.color}" stroke-opacity=".35"/></pattern></defs>
<rect x=".5" y=".5" width="399" height="149" rx="12" fill="#fdfcf8" stroke="#cfcac0"/>
<g font-family="${SERIF}">
  ${index("")}${index("rotate(180 200 75)")}
  <rect x="62" y="16" width="276" height="118" rx="6" fill="url(#lace)" stroke="${r.lang.color}" stroke-opacity=".6"/>
  <rect x="66" y="20" width="268" height="110" rx="4" fill="none" stroke="#1b1b1b" stroke-width=".6"/>
  <g font-size="12" fill="${r.lang.color}" ${edge} text-anchor="middle" opacity=".85">${pips(38)}${pips(122, [2, 3, 4, 5, 6])}</g>
  <path d="M74 75L92 58H308L326 75L308 92H92Z" fill="#fdfcf8" stroke="#1b1b1b" stroke-width="1.2"/>
  <path d="M80 75L94 62H306L320 75L306 88H94Z" fill="none" stroke="${r.lang.color}"/>
  <text x="200" y="81" font-size="17" font-weight="700" fill="#1b1b1b" text-anchor="middle" letter-spacing=".5">${esc(fit(r.name, 196, 17, 0.6))}</text>
  <rect x="148" y="110" width="104" height="16" fill="#fdfcf8"/>
  <text x="200" y="122" font-size="10.5" fill="#1b1b1b" text-anchor="middle" font-style="italic">${esc(fit(r.lang.name, 62, 10.5, 0.5))} · ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
