import { esc, fit, lines, motion, row, svg, textWidth, wrap } from "../card.js";

export const about = "Brutalist web page: default serif on acid green, a blue underlined link, an h1 name, an hr and a bordered table.";

const TIMES = "'Times New Roman', Times, serif";

// Unstyled-HTML look: everything the browser would draw with no stylesheet, on acid green.
export default (r) => {
  const cells = [
    [fit(r.lang.name, 110, 13, 0.5), `<tspan fill="${r.lang.color}" stroke="#000" stroke-width=".6">■</tspan> `],
    [r.stars, "★ "],
    [r.forks, "⑂ "],
  ].map(([s, pre], i) => {
    const w = textWidth(s, 13, 0.52) + 30;
    return [w, `<rect y="112" width="${w}" height="24" fill="${i ? "none" : "#fff"}" stroke="#000" stroke-width="1.5"/><text x="8" y="129">${pre}${esc(s)}</text>`];
  });
  return svg(
    r.name,
    `${motion(".bw-caret { animation: bw-caret 2s step-end infinite } @keyframes bw-caret { 0% { fill-opacity: 1 } 50% { fill-opacity: 0 } }")}
<rect width="400" height="150" fill="#b8ff2b"/>
<rect x="2" y="2" width="396" height="146" fill="none" stroke="#000" stroke-width="4"/>
<g font-family="${TIMES}" fill="#000">
  <text x="16" y="26" font-size="13"><tspan fill="#0000ee" text-decoration="underline">${esc(fit(r.owner, 150, 13, 0.5))}</tspan> / <tspan fill="#551a8b" text-decoration="underline">repos</tspan></text>
  <text x="16" y="56" font-size="28" font-weight="700">${esc(fit(r.name, 366, 28, 0.55))}<tspan class="bw-caret" font-weight="400" fill-opacity="0">|</tspan></text>
  <path d="M16 66H384" stroke="#555" stroke-width="1"/><path d="M16 67.5H384" stroke="#fff" stroke-width="1"/>
  <text font-size="13.5">${lines(wrap(r.description, 54), 16, 86, 16)}</text>
  <g font-size="13">${row(cells, 16, -1.5)}</g>
  <text x="384" y="129" font-size="12" text-anchor="end" fill="#0000ee" text-decoration="underline">view source</text>
</g>`,
  );
};
