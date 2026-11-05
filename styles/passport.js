import { FONT, MONO, esc, fit, lines, svg, wrap } from "../card.js";

const SERIF = "Georgia, 'Times New Roman', serif";

// A passport page with a machine-readable line and a red entry stamp.
export default (r) => {
  const mrz = `P<${r.owner}<<${r.name}`.toUpperCase().replace(/[^A-Z0-9]/g, "<").padEnd(34, "<").slice(0, 34);
  const lang = r.lang.name.toUpperCase();
  const langSize = Math.min(13, 54 / (lang.length * 0.65));
  return svg(
    r.name,
    `<defs>
  <pattern id="guilloche" width="24" height="12" patternUnits="userSpaceOnUse"><path d="M0 6Q6 0 12 6T24 6" fill="none" stroke="#c9b48a" stroke-opacity=".35"/></pattern>
  <path id="ring" d="M262 75a38 38 0 1176 0a38 38 0 11-76 0"/>
</defs>
<rect x=".5" y=".5" width="399" height="149" rx="8" fill="#f4ecd8" stroke="#d8c8a4"/>
<rect x="8" y="8" width="384" height="134" rx="4" fill="url(#guilloche)"/>
<g font-family="${SERIF}" fill="#3b3226">
  <text x="22" y="32" font-size="9.5" letter-spacing="2" fill="#8a7550">REPOSITORY · ${esc(fit(r.owner.toUpperCase(), 150, 9.5, 0.8))}</text>
  <text x="22" y="60" font-size="22" font-weight="700">${esc(fit(r.name, 220, 22, 0.55))}</text>
  <text font-size="12.5" font-style="italic" fill="#5a4e3c">${lines(wrap(r.description, 32), 22, 84, 17)}</text>
  <text x="22" y="132" font-family="${MONO}" font-size="10" fill="#8a7550">${esc(mrz)}</text>
</g>
<g transform="rotate(-12 300 75)" font-family="${FONT}" font-weight="700" text-anchor="middle">
  <g fill="none" stroke="#b3261e" stroke-opacity=".85">
    <circle cx="300" cy="75" r="52" stroke-width="2.5"/>
    <circle cx="300" cy="75" r="45" stroke-dasharray="2 3"/>
    <circle cx="300" cy="75" r="29"/>
  </g>
  <g fill="#b3261e" fill-opacity=".85">
    <text font-size="8" letter-spacing="1"><textPath href="#ring" startOffset="25%">★ ${esc(r.stars)} STARS ★</textPath></text>
    <text x="300" y="${75 + langSize / 3}" font-size="${langSize}">${esc(lang)}</text>
    <text x="300" y="94" font-size="8">⑂ ${esc(r.forks)}</text>
  </g>
</g>`,
  );
};
