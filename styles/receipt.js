import { MONO, barcode, esc, fit, lines, svg, wrap } from "../card.js";

export const about = "Thermal receipt: torn zig-zag edge, mono line items for stars, forks and language, a highlighted total and a barcode.";

// A line item with a dotted leader between label and right-aligned value (11px mono is ~6.6px a character).
const item = (label, value, y) =>
  `<text x="24" y="${y}">${esc(label)}</text><path d="M${30 + label.length * 6.6} ${y}H${230 - value.length * 6.6}" stroke="#9a9a92" stroke-dasharray="1 3"/><text x="236" y="${y}" text-anchor="end">${esc(value)}</text>`;

// A till receipt on white paper torn along the bottom.
export default (r) => {
  const torn = Array.from({ length: 50 }, (_, i) => `L${396 - i * 8} ${i % 2 ? 146 : 140}`).join("");
  return svg(
    r.name,
    `<defs><filter id="shadow" x="-5%" y="-10%" width="110%" height="125%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-opacity=".25"/></filter></defs>
<path d="M4 4H396V140${torn}Z" fill="#fbfbf7" filter="url(#shadow)"/>
<g font-family="${MONO}" fill="#2a2a28">
  <text x="200" y="24" font-size="15" font-weight="700" text-anchor="middle">${esc(fit(r.name.toUpperCase(), 360, 15))}</text>
  <text x="200" y="38" font-size="9.5" fill="#6d6d66" text-anchor="middle" letter-spacing="1">${esc(fit(`CASHIER: ${r.owner}`, 300, 9.5, 0.7))}</text>
  <path d="M18 47H382M18 99H240" stroke="#2a2a28" stroke-dasharray="3 3"/>
  <path d="M250 55V124" stroke="#c4c4bc" stroke-dasharray="1 3"/>
  <g font-size="11">
    ${item("STARS", r.stars, 64)}
    ${item("FORKS", r.forks, 78)}
    ${item("LANG", fit(r.lang.name.toUpperCase(), 100, 11), 92)}
  </g>
  <rect x="20" y="104" width="220" height="17" rx="2" fill="${r.lang.color}" fill-opacity=".35"/>
  <g font-size="13" font-weight="700"><text x="24" y="117">TOTAL</text><text x="236" y="117" text-anchor="end">★ ${esc(r.stars)}</text></g>
  <text font-size="9" fill="#4a4a45">${lines(wrap(r.description.toUpperCase(), 20, 3), 260, 63, 11)}</text>
  <g>${barcode(r.name, 260, 96, 122, 16)}</g>
  <text x="321" y="124" font-size="8" text-anchor="middle" letter-spacing="2">THANK YOU</text>
</g>`,
  );
};
