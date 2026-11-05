import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Icy frosted glass with slowly turning snowflake crystals.";

// A six-armed snowflake; each arm has two pairs of side branches.
const flake = (x, y, s, o, spin = "") =>
  `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}"><g>${[0, 60, 120, 180, 240, 300]
    .map((a) => `<path transform="rotate(${a})" d="M0 0V-20M0-8l-5-5M0-8l5-5M0-14l-3.5-3.5M0-14l3.5-3.5"/>`)
    .join("")}${spin}</g></g>`;

const SPIN = `<animateTransform attributeName="transform" type="rotate" from="0" to="60" dur="20s" repeatCount="indefinite"/>`;

// Frost: pale blue gradient, speckled frost grain, white rim glow and scattered ice crystals.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="ice" x2="1" y2="1"><stop offset="0" stop-color="#d6ebfb"/><stop offset=".5" stop-color="#eef7fd"/><stop offset="1" stop-color="#cfe4f6"/></linearGradient>
  <radialGradient id="rim" r=".75"><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></radialGradient>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.4 -.7"/></filter>
  <filter id="edge" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation=".9" flood-color="#5b9bd5"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#ice)"/>
  <rect width="400" height="150" filter="url(#grain)" opacity=".5"/>
  <rect width="400" height="150" fill="url(#rim)"/>
  <g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.6" filter="url(#edge)">
    ${flake(352, 44, 2.1, 0.95, SPIN)}${flake(300, 120, 0.9, 0.8)}${flake(388, 128, 0.7, 0.7)}${flake(250, 18, 0.5, 0.7)}
  </g>
</g>
<rect x="1" y="1" width="398" height="148" rx="13" fill="none" stroke="#fff" stroke-width="2"/>
<g font-family="${FONT}">
  <text x="24" y="42" font-size="21" font-weight="700" fill="#0b3556">${esc(fit(r.name, 280, 21))}</text>
  <rect x="24" y="50" width="28" height="3" rx="1.5" fill="${r.lang.color}"/>
  <text font-size="13" fill="#3a6585">${lines(wrap(r.description, 42), 24, 72, 17)}</text>
  ${row(stats(r, { cy: 124, text: 'fill="#0b3556"', icon: 'fill="#4a90d9"' }), 24, 18)}
</g>`,
  );
