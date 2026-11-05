import { esc, fit, lines, row, svg, textWidth, wrap } from "../card.js";

export const about = "Chalkboard: dark green slate with smudges, chalk-grain lettering, a doodled star and chalk on the tray.";

const CHALK = "'Chalkboard SE', Chalkboard, 'Segoe Print', 'Comic Sans MS', cursive";

// A hand-drawn star: one pentagram stroke, like a quick doodle.
const STAR = "M" + [0, 1, 2, 3, 4, 5].map((i) => { const a = ((-90 + i * 144) * Math.PI) / 180; return `${(Math.cos(a) * 9).toFixed(1)} ${(Math.sin(a) * 9 + (i % 2) * 0.8).toFixed(1)}`; }).join("L");

// A school chalkboard in a wooden frame with chalk sticks in the language colour and white.
export default (r) => {
  const name = fit(r.name, 336, 22, 0.62);
  const under = Math.min(textWidth(name, 22, 0.62), 336);
  const items = [
    [16 + textWidth(r.stars, 14, 0.62), `<path transform="translate(8 108) rotate(-8)" d="${STAR}" fill="none" stroke="#ffe27a" stroke-width="1.8" stroke-linejoin="round"/><text x="22" y="113" fill="#ffe27a">${esc(r.stars)}</text>`],
    [10 + textWidth(`⑂ ${r.forks}`, 14, 0.62), `<text y="113">⑂ ${esc(r.forks)}</text>`],
    [20 + textWidth(fit(r.lang.name, 120, 14, 0.62), 14, 0.62), `<circle cx="7" cy="108" r="6" fill="${r.lang.color}" stroke="#eef3ee" stroke-width="1.2"/><text x="20" y="113">${esc(fit(r.lang.name, 120, 14, 0.62))}</text>`],
  ];
  return svg(
    r.name,
    `<defs>
  <radialGradient id="slate" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#36574a"/><stop offset="1" stop-color="#22392f"/></radialGradient>
  <filter id="smudge" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="chalk" x="-5%" y="-20%" width="110%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 3 0 0 0 -.6" result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
  </filter>
</defs>
<rect width="400" height="150" rx="10" fill="#7a4e2d"/>
<rect x="9" y="9" width="382" height="120" rx="3" fill="url(#slate)"/>
<g fill="#fff" filter="url(#smudge)"><ellipse cx="300" cy="40" rx="70" ry="16" opacity=".09"/><ellipse cx="90" cy="118" rx="80" ry="10" opacity=".07"/><ellipse cx="350" cy="100" rx="30" ry="22" opacity=".06"/></g>
<rect x="4" y="129" width="392" height="9" rx="2" fill="#5c3a20"/>
<rect x="34" y="125" width="52" height="11" rx="2" fill="#d9cba8"/><rect x="34" y="125" width="52" height="4" rx="2" fill="#4a3426"/>
<rect x="300" y="131" width="36" height="5" rx="2.5" fill="#f4f4ee"/><rect x="342" y="131" width="28" height="5" rx="2.5" fill="${r.lang.color}"/>
<g font-family="${CHALK}" fill="#eef3ee" filter="url(#chalk)">
  <text x="24" y="40" font-size="22" font-weight="700">${esc(name)}</text>
  <path d="M24 49q${under / 8} -5 ${under / 4} 0t${under / 4} 0t${under / 4} 0t${under / 4} 0" fill="none" stroke="#eef3ee" stroke-width="1.6" stroke-linecap="round"/>
  <text font-size="12.5" fill="#d7e2d8">${lines(wrap(r.description, 46), 24, 70, 16)}</text>
  <g font-size="14" font-weight="700">${row(items, 22, 20)}</g>
</g>`,
  );
};
