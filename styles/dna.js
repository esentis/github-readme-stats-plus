import { FONT, MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "DNA sample label: a slowly turning double helix whose base pairs are read from the name's letters, with the sequence printed on the label.";

const BASES = { A: ["#e63946", "T"], T: ["#f4a261", "A"], C: ["#2a9d8f", "G"], G: ["#457b9d", "C"] };
const P = 70; // one helix turn in px; the 20-base sequence spans two turns, so scrolling by 2P loops seamlessly
const y = (x, phase = 0) => 75 + 34 * Math.sin((2 * Math.PI * x) / P + phase);

// A specimen label on the left and a double helix on the right, its base pairs coloured from the name.
export default (r) => {
  const seq = Array.from({ length: 20 }, (_, i) => "ACGT"[r.name.charCodeAt(i % r.name.length) % 4]);
  const strand = (phase) => Array.from({ length: 143 }, (_, i) => `${246 + i * 2},${y(i * 2, phase).toFixed(1)}`).join(" ");
  const rungs = Array.from({ length: 41 }, (_, j) => {
    const x = 3.5 + j * 7, a = y(x), b = y(x, 2.4), m = (a + b) / 2, [col, pair] = BASES[seq[j % 20]];
    return `<path d="M${246 + x} ${a.toFixed(1)}V${m.toFixed(1)}" stroke="${col}"/><path d="M${246 + x} ${m.toFixed(1)}V${b.toFixed(1)}" stroke="${BASES[pair][0]}"/>`;
  }).join("");
  return svg(
    r.name,
    `${motion(".dna-h{animation:dna-h 12s linear infinite}@keyframes dna-h{to{transform:translateX(-140px)}}")}
<defs><clipPath id="dna-clip"><rect x="246" y="10" width="140" height="130"/></clipPath>
<linearGradient id="dna-fade"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".18" stop-color="#fff"/><stop offset=".82" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="dna-mask"><rect x="246" y="10" width="140" height="130" fill="url(#dna-fade)"/></mask></defs>
<rect x=".5" y=".5" width="399" height="149" rx="12" fill="#f8f7f2" stroke="#dcd9cf"/>
<g clip-path="url(#dna-clip)" mask="url(#dna-mask)"><g class="dna-h">
  <polyline points="${strand(2.4)}" fill="none" stroke="#2b2d42" stroke-opacity=".55" stroke-width="3"/>
  <g stroke-width="2.6">${rungs}</g>
  <polyline points="${strand(0)}" fill="none" stroke="${r.lang.color}" stroke-width="3.4"/>
</g></g>
<path d="M22 113H226" stroke="#2b2d42" stroke-opacity=".25"/>
<g font-family="${MONO}" fill="#6b6a63">
  <text x="22" y="26" font-size="8.5" letter-spacing="1.5">${esc(fit(`SAMPLE · ${r.owner.toUpperCase()}`, 118, 8.5, 0.75))}</text>
  <text x="22" y="64" font-size="9.5" letter-spacing=".5">5′-<tspan fill="#2b2d42" font-weight="700">${seq.slice(0, 14).join("")}</tspan>…-3′</text>
  <text x="22" y="130" font-size="9.5"><tspan font-size="7.5" letter-spacing="1">STARS </tspan><tspan fill="#2b2d42" font-weight="700">★ ${esc(r.stars)}</tspan><tspan font-size="7.5" letter-spacing="1">  FORKS </tspan><tspan fill="#2b2d42" font-weight="700">⑂ ${esc(r.forks)}</tspan></text>
</g>
<g font-family="${FONT}" fill="#2b2d42">
  <text x="22" y="48" font-size="18" font-weight="700">${esc(fit(r.name, 206, 18))}</text>
  <text font-size="10.5" fill="#55554f">${lines(wrap(r.description, 36), 22, 84, 14)}</text>
  <circle cx="${226 - Math.min(70, r.lang.name.length * 6) - 8}" cy="22.5" r="3.5" fill="${r.lang.color}"/>
  <text x="226" y="26" font-size="9.5" text-anchor="end">${esc(fit(r.lang.name, 70, 9.5, 0.58))}</text>
</g>`,
  );
};
