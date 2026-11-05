import { FONT, esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Vinyl record: a sleeve in the language colour with the record sliding out and its label slowly spinning.";

// A record sleeve on the left with the record half out of it; title, artist and notes on the right.
export default (r) => {
  const c = r.lang.color;
  const size = r.name.length > 15 ? 14 : 17;
  const ink = isLight(c) ? "#111" : "#fff";
  const grooves = [50, 45, 40, 35, 30, 25].map((g) => `<circle r="${g}" fill="none" stroke="#2c2c31" stroke-width=".7"/>`).join("");
  return svg(
    r.name,
    `<defs><clipPath id="sleeve"><rect x="14" y="19" width="112" height="112" rx="3"/></clipPath></defs>
<rect width="400" height="150" rx="12" fill="#141417"/>
<g transform="translate(154 75)">
  <circle r="54" fill="#0c0c0e"/>${grooves}
  <g>
    <circle r="18" fill="${c}"/><circle r="13" fill="none" stroke="${ink}" stroke-opacity=".35"/>
    <rect x="-1" y="-16" width="2" height="6" fill="${ink}" fill-opacity=".7"/>
    <text y="10" font-family="${FONT}" font-size="5" font-weight="700" fill="${ink}" text-anchor="middle">SIDE A</text>
    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
  </g>
  <circle r="2" fill="#141417"/>
  <path d="M-38 -32A50 50 0 0 1 -10 -48M30 38A48 48 0 0 1 8 47" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="5" stroke-linecap="round"/>
</g>
<rect x="17" y="22" width="112" height="112" rx="3" fill="#000" fill-opacity=".45"/>
<g clip-path="url(#sleeve)">
  <rect x="14" y="19" width="112" height="112" fill="${c}"/>
  <g fill="none" stroke="${ink}" stroke-opacity=".18" stroke-width="5">${[30, 50, 70, 90, 110].map((g) => `<circle cx="126" cy="131" r="${g}"/>`).join("")}</g>
  <text x="24" y="58" font-family="${FONT}" font-size="38" font-weight="800" fill="${ink}">${esc(r.name.slice(0, 1).toUpperCase())}</text>
  <text x="24" y="122" font-family="${FONT}" font-size="8" font-weight="700" fill="${ink}" letter-spacing="1">${esc(fit(r.owner.toUpperCase(), 92, 8, 0.75))}</text>
</g>
<g font-family="${FONT}">
  <text x="224" y="36" font-size="9" font-weight="700" fill="#8b8f99" letter-spacing="2">LP · ${esc(fit(r.lang.name.toUpperCase(), 110, 9, 0.8))}</text>
  <text x="224" y="58" font-size="${size}" font-weight="700" fill="#fff">${esc(fit(r.name, 162, size))}</text>
  <text x="224" y="74" font-size="11" fill="#9aa0aa">by ${esc(fit(r.owner, 140, 11))}</text>
  <text font-size="10.5" fill="#c3c7d0">${lines(wrap(r.description, 25), 224, 95, 14)}</text>
  <text x="224" y="130" font-size="12" font-weight="700" fill="#fff"><tspan fill="${c}">●</tspan> ★ ${esc(r.stars)}   ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
