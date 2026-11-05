import { FONT, esc, fit, lines, motion, rng, svg, wrap } from "../card.js";

export const about = "Chronograph: a luxury watch with a blue sunburst dial, applied indices, sub-dials whose hands track stars and forks and a sweeping seconds hand; details beside it.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
const [CX, CY] = [80, 75];
const polar = (a, rad, cx = CX, cy = CY) => [(cx + rad * Math.sin(a)).toFixed(2), (cy - rad * Math.cos(a)).toFixed(2)];
const tick = (a, r0, r1, cx, cy) => `M${polar(a, r0, cx, cy)}L${polar(a, r1, cx, cy)}`;
const SUN = Array.from({ length: 96 }, (_, i) => tick((i * Math.PI) / 48, 5, 57)).join("");
const TRACK = Array.from({ length: 60 }, (_, i) => tick((i * Math.PI) / 30, i % 5 ? 53 : 51, 55.5)).join("");
// Indices at 3 and 9 o'clock give way to the sub-dials.
const INDEX = Array.from({ length: 12 }, (_, i) => {
  const deg = i * 30, bars = i % 6 === 3 ? [] : i ? [0] : [-2.4, 2.4];
  return bars.map((dx) => `<g transform="rotate(${deg} ${CX} ${CY})"><rect x="${CX - 1.4 + dx}" y="${CY - 49}" width="2.8" height="9" rx=".6" fill="#000" opacity=".45" transform="translate(.6 .8)"/><rect x="${CX - 1.4 + dx}" y="${CY - 49}" width="2.8" height="9" rx=".6" fill="url(#ch-steel)"/></g>`).join("");
}).join("");
// Faceted dauphine hand pointing up from the centre, rotated to angle a (degrees).
const hand = (a, len, w) => `<g transform="rotate(${a.toFixed(1)} ${CX} ${CY})"><path d="M${CX} ${CY - len}L${CX - w} ${CY - 5}L${CX} ${CY + 6}Z" fill="#f4f6fa"/><path d="M${CX} ${CY - len}L${CX + w} ${CY - 5}L${CX} ${CY + 6}Z" fill="#9aa3b2"/></g>`;
// A sub-dial whose hand points at value on a log scale (a full turn is 10K).
const sub = (x, value) => {
  const a = Math.min(1, Math.log10(value + 1) / 4) * 2 * Math.PI;
  return `<circle cx="${x}" cy="${CY}" r="13.5" fill="#0a1430" stroke="#c9ced8" stroke-opacity=".7" stroke-width=".8"/>
  <g fill="none" stroke="#fff" stroke-opacity=".07">${[3, 5, 7, 9, 11].map((s) => `<circle cx="${x}" cy="${CY}" r="${s}"/>`).join("")}</g>
  <path d="${Array.from({ length: 12 }, (_, i) => tick((i * Math.PI) / 6, i % 3 ? 11.2 : 10, 13, x, CY)).join("")}" stroke="#dfe3ea" stroke-width=".7"/>
  <path d="M${x} ${CY}L${polar(a, 11, x, CY)}" stroke="#f4f6fa" stroke-width="1.1" stroke-linecap="round"/><circle cx="${x}" cy="${CY}" r="1.6" fill="#f4f6fa"/>`;
};

// Watch on a leather strap at the left, text panel on the right.
export default (r) => {
  const rand = rng(r.name), [h, m] = [rand() * 360, rand() * 360];
  const size = r.name.length > 16 ? 18 : 22;
  return svg(
    r.name,
    `${motion(`.ch-sec { transform-origin: ${CX}px ${CY}px; animation: ch-sec 12s linear infinite } @keyframes ch-sec { to { transform: rotate(360deg) } } .ch-glare { animation: ch-glare 12s ease-in-out infinite } @keyframes ch-glare { 50% { opacity: .35 } }`)}
<defs>
  <clipPath id="ch-card"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="ch-bg" x2="1" y2="1"><stop offset="0" stop-color="#1d222c"/><stop offset="1" stop-color="#0a0c11"/></linearGradient>
  <linearGradient id="ch-case" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5f7fa"/><stop offset=".3" stop-color="#8d949f"/><stop offset=".55" stop-color="#eef1f5"/><stop offset=".8" stop-color="#5f6670"/><stop offset="1" stop-color="#c9ced6"/></linearGradient>
  <linearGradient id="ch-steel" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#8b93a1"/></linearGradient>
  <radialGradient id="ch-dial" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#2b4f96"/><stop offset="1" stop-color="#0b1838"/></radialGradient>
  <linearGradient id="ch-strap" x2="1"><stop offset="0" stop-color="#2a1a12"/><stop offset=".5" stop-color="#4a2e1f"/><stop offset="1" stop-color="#22150e"/></linearGradient>
  <filter id="ch-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<g clip-path="url(#ch-card)">
  <rect width="400" height="150" fill="url(#ch-bg)"/>
  <circle cx="${CX + 4}" cy="${CY + 6}" r="66" fill="#000" opacity=".5" filter="url(#ch-blur)"/>
  <g fill="url(#ch-strap)"><rect x="54" y="-4" width="52" height="24"/><rect x="54" y="130" width="52" height="24"/></g>
  <path d="M58 -4V16M102 -4V16M58 134V154M102 134V154" stroke="#c9a77a" stroke-opacity=".55" stroke-width=".8" stroke-dasharray="2.5 2"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<rect x="${CX + 63}" y="${CY - 6}" width="7" height="12" rx="2" fill="url(#ch-case)"/>
<circle cx="${CX}" cy="${CY}" r="66" fill="url(#ch-case)"/>
<circle cx="${CX}" cy="${CY}" r="60.5" fill="#2b2f36"/>
<circle cx="${CX}" cy="${CY}" r="58.5" fill="url(#ch-dial)"/>
<g font-family="${FONT}">
  <path d="${SUN}" stroke="#fff" stroke-opacity=".07" stroke-width=".6"/>
  <path class="ch-glare" d="M${CX} ${CY}L${polar(-1.1, 58)}A58 58 0 0 1 ${polar(-0.45, 58)}ZM${CX} ${CY}L${polar(2.05, 58)}A58 58 0 0 1 ${polar(2.7, 58)}Z" fill="#9fc0ff" opacity=".18" filter="url(#ch-blur)"/>
  <path d="${TRACK}" stroke="#dfe3ea" stroke-opacity=".8" stroke-width=".7"/>
  ${INDEX}
  ${sub(CX - 22, r.starCount)}
  ${sub(CX + 22, r.forkCount)}
  ${hand(h, 34, 3.4)}${hand(m, 48, 2.8)}
  <g class="ch-sec"><path d="M${CX} ${CY + 14}V${CY - 54}" stroke="#e8b960" stroke-width="1"/><circle cx="${CX}" cy="${CY + 10}" r="3" fill="${r.lang.color}" stroke="#e8b960" stroke-width=".8"/></g>
  <circle cx="${CX}" cy="${CY}" r="3" fill="#e8b960"/><circle cx="${CX}" cy="${CY}" r="1" fill="#2b2f36"/>
  <path d="M${CX - 40} ${CY - 34}A52 52 0 0 1 ${CX + 22} ${CY - 50}" stroke="#fff" stroke-opacity=".18" stroke-width="5" fill="none" stroke-linecap="round"/>
</g>
<g font-family="${FONT}">
  <circle cx="171" cy="31.5" r="3" fill="${r.lang.color}"/>
  <text x="180" y="35" font-size="8.5" font-weight="600" letter-spacing="2.6" fill="#8d96a8">${esc(fit(`CALIBRE ${r.lang.name.toUpperCase()}`, 196, 8.5, 0.95))}</text>
  <text x="167" y="${size > 19 ? 62 : 60}" font-family="${SERIF}" font-size="${size}" fill="#f2f4f8">${esc(fit(r.name, 214, size, 0.58))}</text>
  <text font-size="11" fill="#a3abba">${lines(wrap(r.description, 33), 168, 84, 15)}</text>
  <path d="M168 112H384" stroke="#fff" stroke-opacity=".1"/>
  <text x="168" y="131" font-size="11" font-weight="600" letter-spacing="1" fill="#e6e9ef"><tspan fill="#e8b960">★</tspan> ${esc(r.stars)} stars<tspan dx="14" fill="#e8b960">⑂</tspan> ${esc(r.forks)} forks</text>
</g>`,
  );
};
