import { MONO, esc, fit, svg } from "../card.js";

export const about = "Stadium LED scoreboard: amber dot-matrix STARS and FORKS scores under the repo name as the team. Shows no description.";

const AMBER = "#ffb21a";

// A score panel: unlit dots behind, the lit value masked into dots on top.
const panel = (x, label, value) => {
  const size = value.length > 3 ? 40 : 52;
  return `<rect x="${x}" y="54" width="134" height="72" rx="4" fill="#0b0b0b" stroke="#2c2c2c"/>
  <rect x="${x + 4}" y="58" width="126" height="64" fill="url(#unlit)"/>
  <text x="${x + 67}" y="${90 + size * 0.36}" font-size="${size}" fill="${AMBER}" text-anchor="middle" mask="url(#led)" filter="url(#glow)">${esc(value)}</text>
  <text x="${x + 67}" y="47" font-size="10" fill="#d8d8d8" text-anchor="middle" letter-spacing="3">${label}</text>`;
};

// Black stadium board with bolted frame, two amber dot-matrix scores and a blinking LIVE light.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#fff"/></pattern>
  <pattern id="unlit" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#3a2a0c"/></pattern>
  <mask id="led"><rect width="400" height="150" fill="url(#dots)"/></mask>
  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="400" height="150" rx="10" fill="#2a2a2d"/>
<rect x="6" y="6" width="388" height="138" rx="6" fill="#050505"/>
<g fill="#55555a"><circle cx="14" cy="14" r="2.5"/><circle cx="386" cy="14" r="2.5"/><circle cx="14" cy="136" r="2.5"/><circle cx="386" cy="136" r="2.5"/></g>
<g font-family="${MONO}" font-weight="700">
  <text x="200" y="30" font-size="16" fill="#f4f4f4" text-anchor="middle" letter-spacing="1">${esc(fit(r.name.toUpperCase(), 300, 16))}</text>
  ${panel(22, "STARS", r.stars)}
  ${panel(244, "FORKS", r.forks)}
  <text x="200" y="66" font-size="9" fill="#d8d8d8" text-anchor="middle" letter-spacing="2">LANG</text>
  <rect x="166" y="74" width="68" height="22" rx="3" fill="#0b0b0b" stroke="${r.lang.color}"/>
  <text x="200" y="89" font-size="12" fill="#f4f4f4" text-anchor="middle">${esc(r.lang.name.slice(0, 4).toUpperCase())}</text>
  <circle cx="186" cy="114" r="4" fill="#ff3b30"><animate attributeName="opacity" values="1;1;.15;.15" keyTimes="0;.5;.5;1" dur="1.4s" repeatCount="indefinite"/></circle>
  <text x="194" y="118" font-size="10" fill="#ff3b30" letter-spacing="1">LIVE</text>
</g>`,
  );
