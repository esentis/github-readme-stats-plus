import { MONO, esc, fit, wrap, svg } from "../card.js";

export const about = "ASCII art: a +-| box, a shadowed mono title and stats as plain text.";

// Text-mode art: a box drawn with + - | characters (stretched to a fixed width so every monospace font lines up).
export default (r) => {
  const rule = (label, y) => {
    const head = label ? `+-[ ${fit(label, 160, 12)} ]` : "+";
    return `<text x="14" y="${y}" textLength="372" lengthAdjust="spacingAndGlyphs">${esc(head + "-".repeat(51 - head.length))}+</text>`;
  };
  const bars = [35, 50, 80, 95, 110, 125].map((y) => `<text x="14" y="${y}">|</text><text x="386" y="${y}" text-anchor="end">|</text>`).join("");
  const name = esc(fit(r.name.toUpperCase(), 330, 17, 0.64));
  const [d1, d2 = ""] = wrap(r.description, 44);
  return svg(
    r.name,
    `<rect width="400" height="150" rx="8" fill="#101114"/>
<g font-family="${MONO}" font-size="12" fill="#5d6170">
  ${rule(r.owner, 20)}${rule("", 65)}${rule("", 140)}${bars}
</g>
<g font-family="${MONO}" font-weight="800" font-size="17">
  <text x="32" y="49" fill="${r.lang.color}">${name}</text>
  <text x="30" y="47" fill="#f2f2f2">${name}</text>
</g>
<g font-family="${MONO}" font-size="12" fill="#c8cad3">
  <text x="30" y="83">${esc(d1)}</text><text x="30" y="98">${esc(d2)}</text>
  <text x="30" y="125" xml:space="preserve"><tspan fill="#7b8090">stars:</tspan> ${esc(r.stars)}  <tspan fill="#7b8090">forks:</tspan> ${esc(r.forks)}  <tspan fill="#7b8090">lang:</tspan> <tspan fill="${r.lang.color}">${esc(fit(r.lang.name, 90, 12))}</tspan> <tspan>_<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.5;.5;1" dur="1s" repeatCount="indefinite"/></tspan></text>
</g>`,
  );
};
