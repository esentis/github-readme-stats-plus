// Snow globe: a glass globe on a walnut base holding a tiny winter scene with a language-coloured cottage; snow swirls inside.
import { FONT, esc, fit, isLight, lines, motion, row, rng, stats, svg, wrap } from "../card.js";

export const about = "Snow globe on a walnut base: a tiny cottage in the language colour among pines, snow swirling slowly behind the glass.";

const CX = 322, CY = 62, R = 49;
const pine = (x, y, h) => `<path d="M${x} ${y - h}L${x + h * 0.36} ${y}H${x - h * 0.36}Z" fill="#1d5446"/><path d="M${x} ${y - h}L${x + h * 0.14} ${y - h * 0.62}Q${x} ${y - h * 0.55} ${x - h * 0.14} ${y - h * 0.62}Z" fill="#eef4fb"/><rect x="${x - 1}" y="${y}" width="2" height="3" fill="#4a2f22"/>`;

export default (r) => {
  const c = r.lang.color, rand = rng(r.name);
  // Flakes sit within the globe radius so the rotating swirl never leaves the glass.
  const flakes = (n) => Array.from({ length: n }, () => {
    const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * (R - 3);
    return `<circle cx="${(CX + Math.cos(a) * d).toFixed(1)}" cy="${(CY + Math.sin(a) * d).toFixed(1)}" r="${(0.6 + rand() * 1).toFixed(2)}"/>`;
  }).join("");
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 124, size: 12, text: 'fill="#eef2fb"', icon: 'fill="#a9b8dc"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="sg-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="sg-glass"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath>
  <radialGradient id="sg-bg" cx=".8" cy=".45" r=".7"><stop offset="0" stop-color="#2f3a68"/><stop offset="1" stop-color="#121427"/></radialGradient>
  <linearGradient id="sg-in" x2="0" y2="1"><stop offset="0" stop-color="#1f2c55"/><stop offset="1" stop-color="#46629a"/></linearGradient>
  <radialGradient id="sg-fresnel"><stop offset=".72" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#dfe9ff" stop-opacity=".3"/></radialGradient>
  <linearGradient id="sg-wood" x2="0" y2="1"><stop offset="0" stop-color="#6b4330"/><stop offset="1" stop-color="#2c1a12"/></linearGradient>
  <radialGradient id="sg-window"><stop offset="0" stop-color="#ffd98a" stop-opacity=".7"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
  <filter id="sg-blur"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
${motion(`.sg-s1{transform-origin:${CX}px ${CY}px;animation:sg-spin 22s linear infinite}.sg-s2{transform-origin:${CX}px ${CY}px;animation:sg-spin 34s linear infinite reverse}
.sg-lit{animation:sg-lit 4s ease-in-out infinite alternate}@keyframes sg-spin{to{transform:rotate(360deg)}}@keyframes sg-lit{to{opacity:.55}}`)}
<g clip-path="url(#sg-clip)">
  <rect width="400" height="150" fill="url(#sg-bg)"/>
  <g fill="#fff" opacity=".35"><circle cx="246" cy="20" r=".8"/><circle cx="392" cy="34" r="1"/><circle cx="380" cy="128" r=".7"/><circle cx="210" cy="10" r=".7"/><circle cx="256" cy="104" r=".8"/></g>
  <ellipse cx="${CX}" cy="139" rx="56" ry="6" fill="#000" opacity=".35" filter="url(#sg-blur)"/>
  <g clip-path="url(#sg-glass)">
    <rect x="${CX - R}" y="${CY - R}" width="${R * 2}" height="${R * 2}" fill="url(#sg-in)"/>
    <circle cx="${CX + 18}" cy="${CY - 24}" r="5" fill="#f4f1dc" opacity=".8"/>
    <path d="M${CX - R} ${CY + 30}Q${CX - 20} ${CY + 18} ${CX + 6} ${CY + 26}T${CX + R} ${CY + 22}V${CY + R}H${CX - R}Z" fill="#dfe8f6"/>
    ${pine(CX - 30, CY + 26, 30)}${pine(CX + 32, CY + 26, 24)}${pine(CX + 22, CY + 28, 16)}
    <g transform="translate(${CX - 12} ${CY + 8})">
      <circle cx="12" cy="14" r="16" fill="url(#sg-window)" class="sg-lit"/>
      <rect y="6" width="24" height="16" fill="${c}"/><path d="M-3 7L12 -5L27 7Z" fill="#f2f6fc"/><path d="M-3 7L12 -5L27 7" fill="none" stroke="#b9c7de" stroke-width=".8"/>
      <rect x="15" y="11" width="5" height="5" fill="#ffd98a" class="sg-lit"/><rect x="4" y="13" width="5" height="9" fill="${isLight(c) ? "#5b4636" : "#f2e6d0"}" opacity=".85"/>
    </g>
    <path d="M${CX - R} ${CY + 38}Q${CX} ${CY + 30} ${CX + R} ${CY + 38}V${CY + R}H${CX - R}Z" fill="#f2f6fc"/>
    <g fill="#fff" opacity=".9"><g class="sg-s1">${flakes(26)}</g><g class="sg-s2" opacity=".7">${flakes(18)}</g></g>
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#sg-fresnel)"/>
  </g>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#e6eeff" stroke-opacity=".45"/>
  <path d="M${CX - 36} ${CY - 22}A42 42 0 0 1 ${CX - 8} ${CY - 42}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3.5" stroke-linecap="round" filter="url(#sg-blur)"/>
  <circle cx="${CX + 30}" cy="${CY - 30}" r="2" fill="#fff" opacity=".6"/>
  <path d="M${CX - 40} 106H${CX + 40}L${CX + 50} 136Q${CX} 140 ${CX - 50} 136Z" fill="url(#sg-wood)"/>
  <path d="M${CX - 41} 111H${CX + 41}" stroke="#d6b26a" stroke-width="1.6" stroke-opacity=".8"/>
  <path d="M${CX - 40} 106.5H${CX + 40}" stroke="#fff" stroke-opacity=".2"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".12"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#8e9bc4">${esc(fit(r.owner.toUpperCase(), 190, 9.5, 0.78))}</text>
  <text x="24" y="54" font-size="20" font-weight="700" fill="#fff">${esc(fit(r.name, 216, 20))}</text>
  <text font-size="12" fill="#bcc6e4">${lines(wrap(r.description, 30), 24, 75, 16)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
