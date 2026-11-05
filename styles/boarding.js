import { FONT, barcode, esc, fit, isLight, svg } from "../card.js";

export const about = "Boarding pass with a tear-off stub and a barcode unique to each repo. Shows no description.";

// A ticket with a tear-off stub. The barcode comes from the repo name, so each repo keeps its own.
export default (r) => {
  const light = isLight(r.lang.color);
  const band = light ? "#16202a" : "#fff";
  const ink = light ? "#16202a" : r.lang.color;
  const nameSize = r.name.length > 16 ? 13 : 16;
  return svg(
    r.name,
    `<defs>
  <mask id="notch"><rect width="400" height="150" rx="12" fill="#fff"/><circle cx="296" r="10" fill="#000"/><circle cx="296" cy="150" r="10" fill="#000"/></mask>
</defs>
<g mask="url(#notch)">
  <rect width="400" height="150" fill="#fdfdfb"/>
  <rect width="400" height="30" fill="${r.lang.color}"/>
  <rect x="296" y="30" width="104" height="120" fill="${r.lang.color}" fill-opacity=".1"/>
</g>
<line x1="296" y1="14" x2="296" y2="138" stroke="#9aa5b1" stroke-dasharray="4 4"/>
<g font-family="${FONT}">
  <text x="18" y="20" font-size="11" font-weight="700" fill="${band}" letter-spacing="2">REPO PASS</text>
  <text x="380" y="20" font-size="11" font-weight="700" fill="${band}" text-anchor="end" letter-spacing="1">GITHUB</text>
  <g font-size="9" fill="#8a94a0" letter-spacing="1">
    <text x="18" y="50">OWNER</text><text x="120" y="50">REPOSITORY</text>
    <text x="18" y="100">LANGUAGE</text><text x="120" y="100">STARS</text><text x="190" y="100">FORKS</text>
  </g>
  <g font-weight="700" fill="#16202a">
    <text x="18" y="72" font-size="16">${esc(fit(r.owner, 72, 16))}</text>
    <text x="94" y="71" font-size="14" fill="${ink}">✈</text>
    <text x="120" y="72" font-size="${nameSize}">${esc(fit(r.name, 166, nameSize))}</text>
    <text x="18" y="120" font-size="15">${esc(fit(r.lang.name, 96, 15))}</text>
    <text x="120" y="120" font-size="15">${esc(r.stars)}</text>
    <text x="190" y="120" font-size="15">${esc(r.forks)}</text>
  </g>
  <g fill="#16202a">${barcode(r.name, 314, 44, 66, 56)}</g>
  <text x="346" y="122" font-size="11" font-weight="700" fill="#16202a" text-anchor="middle" letter-spacing="1">SEAT ★${esc(r.stars)}</text>
</g>`,
  );
};
