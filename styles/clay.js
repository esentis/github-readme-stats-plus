import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Claymorphism: puffy pastel shapes with soft shadows, inner highlights and a squishy blob in the language colour.";

const INK = "#4a3a73";


// Claymorphism: soft drop shadow, darker bottom-right inner edge and a white top-left inner highlight.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <filter id="puff" x="-20%" y="-30%" width="140%" height="180%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
    <feOffset in="blur" dy="6" result="drop"/><feFlood flood-color="#7c5cc4" flood-opacity=".3"/><feComposite in2="drop" operator="in" result="shadow"/>
    <feOffset in="blur" dx="-4" dy="-5" result="a"/><feComposite in="SourceAlpha" in2="a" operator="out" result="ea"/><feFlood flood-color="#3b2a6b" flood-opacity=".16"/><feComposite in2="ea" operator="in" result="dark"/>
    <feOffset in="blur" dx="4" dy="5" result="b"/><feComposite in="SourceAlpha" in2="b" operator="out" result="eb"/><feFlood flood-color="#fff" flood-opacity=".9"/><feComposite in2="eb" operator="in" result="light"/>
    <feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/><feMergeNode in="dark"/><feMergeNode in="light"/></feMerge>
  </filter>
  <clipPath id="clip"><rect width="400" height="150" rx="16"/></clipPath>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#efe7ff"/>
  <circle cx="14" cy="8" r="44" fill="#d8f1ff"/><circle cx="392" cy="150" r="52" fill="#ffd9ec"/>
  <rect x="12" y="10" width="376" height="126" rx="30" fill="#fffafd" filter="url(#puff)"/>
  <circle cx="340" cy="50" r="24" fill="${r.lang.color}" filter="url(#puff)"/>
  <ellipse cx="332" cy="40" rx="8" ry="5" fill="#fff" fill-opacity=".55"/>
  <circle cx="364" cy="84" r="9" fill="#ffd1e6" filter="url(#puff)"/>
</g>
<g font-family="${FONT}" fill="${INK}">
  <text x="34" y="46" font-size="20" font-weight="800">${esc(fit(r.name, 266, 20))}</text>
  <text font-size="12.5" fill="#7d6f9c">${lines(wrap(r.description, 44), 34, 67, 16)}</text>
  ${row(
    stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 100, 12) } }, { cy: 113, size: 12, text: 'font-weight="700"', icon: `fill="${INK}"` }).map(([w, s], i) => [
      w + 24,
      `<rect y="100" width="${w + 24}" height="26" rx="13" fill="${["#e1f4ff", "#fff0c4", "#ffe0ef"][i]}" filter="url(#puff)"/><g transform="translate(12 0)">${s}</g>`,
    ]),
    32,
    10,
  )}
</g>`,
  );
