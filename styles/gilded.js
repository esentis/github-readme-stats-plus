import { FONT, esc, fit, lines, motion, rng, svg, wrap } from "../card.js";

export const about = "Gilded: an ornate gold frame around a landscape painted in the language colour on a damask wall, a glint of light circling the frame; a brass plaque holds the stars.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
// Blends two hex colours (accepts #rgb and #rrggbb[aa]); t = 0 gives a, 1 gives b.
const mix = (a, b, t) => {
  const p = (h) => (h.length < 7 ? h.replace(/\w/g, "$&$&") : h).slice(1, 7).match(/../g).map((x) => parseInt(x, 16) || 0);
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
// Frame outer box and moulding width; the four mitred sides each get their own light.
const [X0, Y0, X1, Y1, W] = [18, 14, 132, 136, 13];
const SIDES = [
  [`${X0},${Y0} ${X1},${Y0} ${X1 - W},${Y0 + W} ${X0 + W},${Y0 + W}`, "url(#gd-top)"],
  [`${X1},${Y0} ${X1},${Y1} ${X1 - W},${Y1 - W} ${X1 - W},${Y0 + W}`, "url(#gd-side)"],
  [`${X1},${Y1} ${X0},${Y1} ${X0 + W},${Y1 - W} ${X1 - W},${Y1 - W}`, "url(#gd-bottom)"],
  [`${X0},${Y1} ${X0},${Y0} ${X0 + W},${Y0 + W} ${X0 + W},${Y1 - W}`, "url(#gd-top)"],
].map(([p, f]) => `<polygon points="${p}" fill="${f}"/>`).join("");
const ROSETTE = (x, y) => `<circle cx="${x}" cy="${y}" r="4.2" fill="url(#gd-top)" stroke="#6b4a12" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="1.6" fill="#fff3c4"/><circle cx="${x}" cy="${y}" r="3" fill="none" stroke="#6b4a12" stroke-width=".5" stroke-dasharray="1 1"/>`;
const PERIM = 2 * (X1 - X0 - 7 + Y1 - Y0 - 7);

// Gallery wall: the framed painting on the left, catalogue text and a brass plaque on the right.
export default (r) => {
  const c = r.lang.color, size = r.name.length > 16 ? 18 : 22;
  const rand = rng(r.name), sun = [44 + rand() * 60, 44 + rand() * 18].map((v) => v.toFixed(0));
  // A pastoral landscape in the language colour: three ranges of hills, darker as they come forward.
  const hills = [0.2, 0.42, 0.62].map((k, i) => {
    const y = 80 + i * 14, a = rand() * 16 - 8, b = rand() * 16 - 8;
    return `<path d="M${X0 + W} ${y + a}C55 ${y - 12 + b} 75 ${y + 10 - a} 95 ${y - 4 + b}S112 ${y - 8} ${X1 - W} ${y + b / 2}V${Y1 - W}H${X0 + W}Z" fill="${mix(c, "#000", k)}"/>`;
  }).join("");
  const plaque = `★ ${r.stars}   ⑂ ${r.forks}`, pw = plaque.length * 6.4 + 24;
  return svg(
    r.name,
    `${motion(`.gd-glint { stroke-dasharray: 34 ${PERIM - 34}; animation: gd-glint 7s linear infinite } @keyframes gd-glint { to { stroke-dashoffset: -${PERIM} } } .gd-lamp { animation: gd-lamp 7s ease-in-out infinite } @keyframes gd-lamp { 50% { opacity: .7 } }`)}
<defs>
  <clipPath id="gd-card"><rect width="400" height="150" rx="12"/></clipPath>
  <pattern id="gd-damask" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M11 3C14 8 18 9 19 11C18 13 14 14 11 19C8 14 4 13 3 11C4 9 8 8 11 3Z" fill="#fff" fill-opacity=".035"/></pattern>
  <radialGradient id="gd-wall" cx=".2" cy="0" r="1.1"><stop offset="0" stop-color="#2c4a3e"/><stop offset=".6" stop-color="#15261f"/><stop offset="1" stop-color="#0a130f"/></radialGradient>
  <radialGradient id="gd-light" cx=".5" cy="0" r=".9"><stop offset="0" stop-color="#ffe9b0" stop-opacity=".22"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/></radialGradient>
  <linearGradient id="gd-top" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".5" stop-color="#d9a842"/><stop offset="1" stop-color="#8a5f1a"/></linearGradient>
  <linearGradient id="gd-side" x2="1"><stop offset="0" stop-color="#8a5f1a"/><stop offset=".5" stop-color="#c8963a"/><stop offset="1" stop-color="#5a3c0e"/></linearGradient>
  <linearGradient id="gd-bottom" x2="0" y2="1"><stop offset="0" stop-color="#6b4a12"/><stop offset=".6" stop-color="#b07f2c"/><stop offset="1" stop-color="#e2b65a"/></linearGradient>
  <radialGradient id="gd-paint" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="${mix(c, "#fff4dc", 0.6)}"/><stop offset=".7" stop-color="${mix(c, "#fff4dc", 0.15)}"/><stop offset="1" stop-color="${c}"/></radialGradient>
  <linearGradient id="gd-brass" x2="0" y2="1"><stop offset="0" stop-color="#f3d993"/><stop offset=".5" stop-color="#c49a45"/><stop offset="1" stop-color="#9c7428"/></linearGradient>
  <filter id="gd-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="gd-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="gd-canvas"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .16 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
</defs>
<g clip-path="url(#gd-card)">
  <rect width="400" height="150" fill="url(#gd-wall)"/><rect width="400" height="150" fill="url(#gd-damask)"/>
  <ellipse class="gd-lamp" cx="75" cy="-10" rx="110" ry="90" fill="url(#gd-light)"/>
  <rect x="${X0 + 4}" y="${Y0 + 7}" width="${X1 - X0}" height="${Y1 - Y0}" fill="#000" opacity=".55" filter="url(#gd-blur)"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="#e2b65a" stroke-opacity=".18"/>
<rect x="${X0 + W}" y="${Y0 + W}" width="${X1 - X0 - 2 * W}" height="${Y1 - Y0 - 2 * W}" fill="url(#gd-paint)"/>
<circle cx="${sun[0]}" cy="${sun[1]}" r="8" fill="#fff4dc" fill-opacity=".85"/><circle cx="${sun[0]}" cy="${sun[1]}" r="16" fill="#fff4dc" fill-opacity=".15"/>
${hills}
<rect x="${X0 + W}" y="${Y0 + W}" width="${X1 - X0 - 2 * W}" height="${Y1 - Y0 - 2 * W}" fill="#fff" filter="url(#gd-canvas)"/>
<path d="M${X0 + W} ${Y0 + W}H${X1 - W}V${Y1 - W}H${X0 + W}Z" fill="none" stroke="#3d2a08" stroke-width="2"/>
${SIDES}
<path d="M${X0} ${Y0}L${X0 + W} ${Y0 + W}M${X1} ${Y0}L${X1 - W} ${Y0 + W}M${X1} ${Y1}L${X1 - W} ${Y1 - W}M${X0} ${Y1}L${X0 + W} ${Y1 - W}" stroke="#5a3c0e" stroke-opacity=".6" stroke-width=".6"/>
<rect x="${X0 + 3.5}" y="${Y0 + 3.5}" width="${X1 - X0 - 7}" height="${Y1 - Y0 - 7}" fill="none" stroke="#fff3c4" stroke-opacity=".9" stroke-width="2.4" stroke-dasharray="0 4" stroke-linecap="round"/>
<rect x="${X0 + 9.5}" y="${Y0 + 9.5}" width="${X1 - X0 - 19}" height="${Y1 - Y0 - 19}" fill="none" stroke="#6b4a12" stroke-opacity=".7"/>
<rect x="${X0 + 0.5}" y="${Y0 + 0.5}" width="${X1 - X0 - 1}" height="${Y1 - Y0 - 1}" fill="none" stroke="#4a3208"/>
${ROSETTE(X0 + 6.5, Y0 + 6.5)}${ROSETTE(X1 - 6.5, Y0 + 6.5)}${ROSETTE(X1 - 6.5, Y1 - 6.5)}${ROSETTE(X0 + 6.5, Y1 - 6.5)}
<rect class="gd-glint" x="${X0 + 3.5}" y="${Y0 + 3.5}" width="${X1 - X0 - 7}" height="${Y1 - Y0 - 7}" fill="none" stroke="#fffbe6" stroke-width="4" stroke-dasharray="0 ${PERIM}" filter="url(#gd-glow)"/>
<g font-family="${FONT}">
  <text x="156" y="34" font-size="8.5" font-weight="600" letter-spacing="2.6" fill="#c9a45c">${esc(fit(`OIL ON CANVAS · ${r.lang.name.toUpperCase()}`, 226, 8.5, 0.95))}</text>
  <text x="155" y="${size > 19 ? 61 : 59}" font-family="${SERIF}" font-size="${size}" fill="#f4e6c3">${esc(fit(r.name, 228, size, 0.58))}</text>
  <text x="156" y="76" font-family="${SERIF}" font-style="italic" font-size="11.5" fill="#c9a45c">${esc(fit(`by ${r.owner}`, 226, 11.5, 0.5))}</text>
  <text font-size="11" fill="#c8c6b4" fill-opacity=".85">${lines(wrap(r.description, 34), 156, 96, 14)}</text>
  <rect x="156" y="116" width="${pw}" height="20" rx="2" fill="url(#gd-brass)" stroke="#6b4a12" stroke-width=".7"/>
  <circle cx="160" cy="126" r=".9" fill="#6b4a12"/><circle cx="${152 + pw}" cy="126" r=".9" fill="#6b4a12"/>
  <text x="${156 + pw / 2}" y="130" font-size="10.5" font-weight="700" letter-spacing=".6" text-anchor="middle" fill="#3d2a08" xml:space="preserve">${esc(plaque)}</text>
</g>`,
  );
};
