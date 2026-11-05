import { esc, fit, lines, row, svg, textWidth, wrap } from "../card.js";

export const about = "Cream card, thick outline, hard shadow and a highlighter title.";

const BLACK = "'Arial Black', 'Helvetica Neue', Arial, sans-serif";

// Cream card, thick black outline, hard offset shadow and a highlighter behind the name.
export default (r) => {
  const name = fit(r.name, 330, 22, 0.69);
  const chips = [r.lang.name.toUpperCase(), `★ ${r.stars}`, `${r.forks} FORKS`].map((label, i) => {
    const w = textWidth(label, 12, 0.75) + 20;
    return [
      w,
      `<rect y="106" width="${w}" height="24" fill="${i ? "#fff" : r.lang.color}" stroke="#111" stroke-width="2"/><text x="10" y="123">${esc(label)}</text>`,
    ];
  });
  return svg(
    r.name,
    `<rect x="9" y="9" width="388" height="138" fill="#111"/>
<rect x="1.5" y="1.5" width="388" height="138" fill="#fffbea" stroke="#111" stroke-width="3"/>
<rect x="20" y="20" width="${textWidth(name, 22, 0.69) + 14}" height="30" fill="#ffd60a"/>
<g font-family="${BLACK}" font-weight="900" fill="#111">
  <text x="27" y="43" font-size="22">${esc(name)}</text>
  <text font-family="Helvetica, Arial, sans-serif" font-weight="400" font-size="13.5" fill="#333">${lines(wrap(r.description, 48), 22, 74, 18)}</text>
  <g font-size="12">${row(chips, 22, 8)}</g>
</g>`,
  );
};
