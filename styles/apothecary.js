import { esc, fit, isLight, lines, svg, wrap } from "../card.js";

export const about = "Victorian apothecary label: cream paper, double border with cut-in corners, a ribbon banner in the language colour, \"No.\" star count.";

const SERIF = "'Hoefler Text', Baskerville, 'Baskerville Old Face', Georgia, serif";
const INK = "#26402f";

// A rectangle inset by i whose corners are cut in by quarter circles of radius c.
const label = (i, c) => {
  const [x0, y0, x1, y1] = [i, i, 400 - i, 150 - i];
  return `M${x0 + c} ${y0}H${x1 - c}A${c} ${c} 0 0 0 ${x1} ${y0 + c}V${y1 - c}A${c} ${c} 0 0 0 ${x1 - c} ${y1}H${x0 + c}A${c} ${c} 0 0 0 ${x0} ${y1 - c}V${y0 + c}A${c} ${c} 0 0 0 ${x0 + c} ${y0}Z`;
};

// Victorian apothecary label with a ribbon banner carrying the repo name.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#2a2116" : "#fbf4e2";
  const tails = "M48 46H86V72H48L58 59ZM352 46H314V72H352L342 59Z";
  return svg(
    r.name,
    `<path d="${label(0, 14)}" fill="#f2e8cf"/>
<path d="${label(6, 10)}" fill="none" stroke="${INK}" stroke-width="2.2"/>
<path d="${label(10.5, 8)}" fill="none" stroke="${INK}" stroke-width=".8"/>
<path d="${tails}" fill="${r.lang.color}"/><path d="${tails}" fill="#000" fill-opacity=".3"/>
<path d="M78 66L86 72V66ZM322 66L314 72V66Z" fill="#000" fill-opacity=".5"/>
<rect x="78" y="38" width="244" height="28" fill="${r.lang.color}"/>
<path d="M78 41.5H322M78 62.5H322" stroke="${ink}" stroke-opacity=".45" stroke-width=".7"/>
<g font-family="${SERIF}" fill="${INK}" text-anchor="middle">
  <text x="200" y="30" font-size="9.5" letter-spacing="2.5">${esc(fit(r.owner.toUpperCase(), 180, 9.5, 0.85))} &amp; CO.</text>
  <text x="200" y="57" font-size="16" font-weight="700" fill="${ink}">${esc(fit(r.name, 226, 16, 0.58))}</text>
  <text font-size="11.5" font-style="italic" fill="#4a3b2a">${lines(wrap(r.description, 52), 200, 85, 14)}</text>
  <path d="M168 122H192M208 122H232" stroke="${INK}" stroke-width=".8"/><rect x="196.5" y="118.5" width="7" height="7" fill="${INK}" transform="rotate(45 200 122)"/>
  <text x="32" y="127" font-size="15" text-anchor="start"><tspan font-style="italic" font-size="12">No.</tspan> <tspan font-weight="700">${esc(r.stars)}</tspan> <tspan font-size="11">★</tspan></text>
  <text x="368" y="127" font-size="12" text-anchor="end"><tspan font-style="italic">${esc(fit(r.lang.name, 90, 12, 0.5))}</tspan>  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
