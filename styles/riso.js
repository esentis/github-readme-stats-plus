import { FONT, MONO, esc, fit, lines, svg, textWidth, wrap } from "../card.js";

export const about = "Risograph print: fluorescent pink and blue inks overprinting slightly out of register, with paper grain.";

const PINK = "#ff48b0";
const BLUE = "#0078bf";

// Risograph zine print: two multiplied inks, the pink layer knocked 2px out of register, specks of bare paper.
export default (r) => {
  const name = esc(fit(r.name, 250, 24, 0.62));
  const stat = `★ ${r.stars}  ⑂ ${r.forks}`;
  const lang = fit(r.lang.name, 230 - textWidth(stat, 13), 13);
  const pink = `<g class="ink" fill="${PINK}" transform="translate(2 1.5)">
    <circle cx="328" cy="62" r="54"/>
    <text x="22" y="46" font-family="${FONT}" font-size="24" font-weight="900">${name}</text>
    <text x="22" y="130" font-family="${MONO}" font-size="13" font-weight="700">${esc(stat)}</text>
  </g>`;
  return svg(
    r.name,
    `<defs>
  <style>.ink{mix-blend-mode:multiply}</style>
  <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="2.5" cy="2.5" r="1.8" fill="${BLUE}"/></pattern>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .96  0 0 0 0 .94  0 0 0 0 .9  0 0 0 -2.4 1.3"/></filter>
  <clipPath id="clip"><rect width="400" height="150" rx="6"/></clipPath>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#f5f0e6"/>
  ${pink}
  <g class="ink" fill="${BLUE}">
    <circle cx="354" cy="98" r="48" fill="url(#dots)"/>
    <text x="22" y="46" font-family="${FONT}" font-size="24" font-weight="900" fill-opacity=".9">${name}</text>
    <text font-family="${MONO}" font-size="11.5">${lines(wrap(r.description, 36), 22, 70, 15)}</text>
    <rect x="22" y="106" width="232" height="2.5"/>
    <circle cx="${textWidth(stat, 13) + 34}" cy="125.5" r="4.5" fill="${r.lang.color}"/>
    <text x="${textWidth(stat, 13) + 42}" y="130" font-family="${MONO}" font-size="13" font-weight="700">${esc(lang)}</text>
  </g>
  <rect width="400" height="150" filter="url(#grain)"/>
</g>`,
  );
};
