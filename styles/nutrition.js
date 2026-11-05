import { esc, fit, lines, svg, wrap } from "../card.js";

export const about = "Black-and-white nutrition-facts label: Repository Facts with stars, forks and language rows, the description as the ingredients.";

const HEAVY = "'Helvetica Neue', 'Arial Black', Helvetica, Arial, sans-serif";

// A nutrition-facts panel: facts column on the left, name and ingredients on the right.
export default (r) => {
  const fact = (y, label, value, size, rule) =>
    `<text x="20" y="${y}" font-size="${size}"><tspan font-weight="900">${label}</tspan></text><text x="196" y="${y}" font-size="${size}" font-weight="900" text-anchor="end">${esc(value)}</text><rect x="20" y="${y + 5}" width="176" height="${rule}"/>`;
  return svg(
    r.name,
    `<rect x="1" y="1" width="398" height="148" rx="4" fill="#fff" stroke="#000" stroke-width="2"/>
<g font-family="${HEAVY}" fill="#000">
  <text x="20" y="34" font-size="21" font-weight="900" letter-spacing="-.5">Repository Facts</text>
  <text x="20" y="48" font-size="9">Serving size <tspan font-weight="700">1 repo (${esc(fit(r.owner, 70, 9))})</tspan></text>
  <rect x="20" y="53" width="176" height="7"/>
  <text x="20" y="70" font-size="8" font-weight="700">Amount per serving</text>
  ${fact(90, "Stars ★", r.stars, 17, 4)}
  ${fact(110, "Forks ⑂", r.forks, 11, 1)}
  <text x="20" y="130" font-size="11" font-weight="900">Language</text>
  <rect x="80" y="122" width="8" height="8" fill="${r.lang.color}" stroke="#000" stroke-width=".6"/>
  <text x="196" y="130" font-size="11" text-anchor="end">${esc(fit(r.lang.name, 96, 11, 0.56))}</text>
  <rect x="20" y="135" width="176" height="1"/>
  <rect x="210" y="14" width="1.5" height="122"/>
  <text x="224" y="34" font-size="15" font-weight="900">${esc(fit(r.name, 160, 15, 0.6))}</text>
  <rect x="224" y="40" width="160" height="3"/>
  <text x="224" y="58" font-size="9" font-weight="900">INGREDIENTS:</text>
  <text font-size="9.5">${lines(wrap(r.description, 32, 5), 224, 72, 12)}</text>
  <text x="224" y="134" font-size="7">* Percent Daily Values are open source.</text>
</g>`,
  );
};
