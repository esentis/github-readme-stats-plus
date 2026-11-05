import { MONO, esc, fit, motion, svg } from "../card.js";

export const about = "80-column punch card: cream card with a cut corner and printed digit rows, the name, stars and language punched in real Hollerith code, a reader light sweeping across.";

// Hollerith (keypunch 029) rows for a character: 12, 11, 0, 1 … 9.
const punches = (ch) => {
  if (/\d/.test(ch)) return [+ch];
  const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(ch);
  if (i >= 0) return i < 9 ? [12, i + 1] : i < 18 ? [11, i - 8] : [0, i - 16];
  return { "-": [11], "&": [12], "/": [0, 1], ".": [12, 3, 8], _: [0, 5, 8], "<": [12, 4, 8], ">": [0, 6, 8], "+": [12, 6, 8] }[ch] ?? [];
};
const rowOf = (p) => (p === 12 ? 0 : p === 11 ? 1 : p + 2);
const X = (col) => 22 + col * 4.5;
const Y = (row) => 61 + row * 6.7;

// A cream punch card with the cut corner top-left; holes come from the text, printed digits show through where unpunched.
export default (r) => {
  const text = `${r.name} ${r.stars} ${r.lang.name}`.toUpperCase().slice(0, 80);
  const holes = [...text].flatMap((ch, col) => punches(ch).map((p) => `<rect x="${(X(col) - 1.3).toFixed(1)}" y="${(Y(rowOf(p)) - 2.6).toFixed(1)}" width="2.6" height="5.2" rx=".4"/>`)).join("");
  const xs = Array.from({ length: 80 }, (_, i) => X(i).toFixed(1)).join(" ");
  const digits = Array.from({ length: 10 }, (_, d) => `<text x="${xs}" y="${(Y(d + 2) + 2).toFixed(1)}">${String(d).repeat(80)}</text>`).join("");
  return svg(
    r.name,
    `${motion(`.pc-scan{animation:pc-scan 6s linear infinite}@keyframes pc-scan{0%{transform:translateX(0);opacity:0}8%,92%{opacity:.28}100%{transform:translateX(358px);opacity:0}}`)}
<defs><filter id="pc-sh" x="-5%" y="-10%" width="110%" height="125%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-opacity=".3"/></filter>
<clipPath id="pc-card"><path d="M24 6H394V144H6V24Z"/></clipPath></defs>
<path d="M24 6H394V144H6V24Z" fill="#f2e6c4" filter="url(#pc-sh)"/>
<g clip-path="url(#pc-card)">
  <rect x="6" y="6" width="388" height="5" fill="${r.lang.color}"/>
  <path d="M6 56H394" stroke="#b8956c" stroke-opacity=".5"/>
  <g font-family="${MONO}" font-size="5.2" fill="#b8956c" fill-opacity=".85" text-anchor="middle">${digits}</g>
  <g fill="#2a2620">${holes}</g>
  <rect class="pc-scan" x="17" y="57" width="8" height="86" fill="${r.lang.color}" opacity="0"/>
</g>
<g font-family="${MONO}" fill="#2a2620">
  <text x="22" y="31" font-size="15" font-weight="700">${esc(fit(r.name, 262, 15))}</text>
  <text x="380" y="31" font-size="11" font-weight="700" text-anchor="end">★ ${esc(r.stars)}  ⑂ ${esc(r.forks)}</text>
  <text x="22" y="47" font-size="9" fill="#6e6250">${esc(fit(r.description, 262, 9))}</text>
  <text x="380" y="47" font-size="9" fill="#6e6250" text-anchor="end">${esc(fit(r.lang.name.toUpperCase(), 90, 9))}</text>
</g>`,
  );
};
