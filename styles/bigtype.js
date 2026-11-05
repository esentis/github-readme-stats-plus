import { MONO, esc, fit, isLight, svg, textWidth } from "../card.js";

export const about = "Kinetic type: the repo name oversized, cropped and repeated in sliding rows, with tiny stats. Shows no description.";

const HEAVY = "Impact, 'Arial Black', 'Helvetica Neue', sans-serif";
const slide = (to, dur) =>
  `<animateTransform attributeName="transform" type="translate" values="0 0;${to} 0;0 0" dur="${dur}s" repeatCount="indefinite"/>`;

// Poster typography: three rows of the name, outlined, solid and in the language colour, bleeding off the card.
export default (r) => {
  const n = r.name.toUpperCase().slice(0, 40);
  const rep = esc(`${n} · ${n} · ${n} · `);
  const tagL = fit(`${r.owner}/${r.name}`, 220, 9.5);
  const tagR = `★${r.stars} ⑂${r.forks} ${fit(r.lang.name.toUpperCase(), 80, 9.5)}`;
  const wl = textWidth(tagL, 9.5) + 12, wr = textWidth(tagR, 9.5) + 12;
  return svg(
    r.name,
    `<defs><clipPath id="clip"><rect width="400" height="150" rx="12"/></clipPath></defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#0b0b0b"/>
  <g font-family="${HEAVY}" font-size="64" font-weight="900" letter-spacing="-1">
    <text x="-60" y="50" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2">${rep}${slide(-80, 14)}</text>
    <text x="14" y="107" fill="#fff">${esc(n)}<tspan fill="none" stroke="#fff" stroke-width="1.2"> · ${esc(n)}</tspan></text>
    <text x="-30" y="164" fill="${r.lang.color}">${rep}${slide(60, 11)}</text>
  </g>
  <g font-family="${MONO}" font-size="9.5" font-weight="700">
    <rect x="${392 - wr}" y="8" width="${wr}" height="16" fill="#0b0b0b"/>
    <text x="386" y="19.5" fill="#fff" text-anchor="end">${esc(tagR)}</text>
    <rect x="8" y="126" width="${wl}" height="16" fill="#fff"/>
    <text x="14" y="137.5" fill="#0b0b0b">${esc(tagL)}</text>
  </g>
</g>`,
  );
};
