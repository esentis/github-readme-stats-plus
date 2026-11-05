import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Soft peach, lilac and mint gradient with rounded pills.";

// Airy pastel gradient (peach, lilac, mint) with soft light blobs and white pill stats.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="22"/></clipPath>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd9cb"/><stop offset=".5" stop-color="#e7dcff"/><stop offset="1" stop-color="#cbf2e2"/></linearGradient>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#bg)"/>
  <g filter="url(#soft)"><circle cx="355" cy="18" r="55" fill="#fff" opacity=".85"/><circle cx="30" cy="150" r="50" fill="${r.lang.color}" opacity=".3"/></g>
  <circle cx="352" cy="104" r="30" fill="#fff" opacity=".35"/><circle cx="318" cy="128" r="12" fill="#fff" opacity=".45"/>
</g>
<rect x=".75" y=".75" width="398.5" height="148.5" rx="21.25" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1.5"/>
<g font-family="${FONT}">
  <text x="26" y="44" font-size="21" font-weight="700" fill="#483d6b">${esc(fit(r.name, 340, 21))}</text>
  <text font-size="13" fill="#6e6690">${lines(wrap(r.description, 46), 26, 67, 17)}</text>
  ${row(
    stats(r, { cy: 119, size: 12, text: 'fill="#483d6b" font-weight="600"', icon: 'fill="#9b86d6"' }).map(([w, s]) => [
      w + 22,
      `<rect y="106" width="${w + 22}" height="26" rx="13" fill="#fff" fill-opacity=".7"/><g transform="translate(11 0)">${s}</g>`,
    ]),
    22,
    8,
  )}
</g>`,
  );
