import { esc, fit, isLight, svg } from "../card.js";

export const about = "Bubble-gum wrapper: pink polka-dot wrapper with twisted ends, bubbly repo name and a pulsing FREE INSIDE burst with the star count. Shows no description.";

const BUBBLY = "'Arial Rounded MT Bold', 'Varela Round', 'Nunito', 'Trebuchet MS', sans-serif";

// Left twisted end; the right one is the same shape mirrored.
const ZIG = Array.from({ length: 12 }, (_, i) => `${i % 2 ? 16 : 6},${14 + i * 11}`).join(" ");
const END = `<polygon points="64,22 46,66 ${ZIG} 46,84 64,128" fill="#ff8cc0"/><path d="M46 70L10 30M46 75L12 75M46 80L10 120" stroke="#e0478f" stroke-width="1.2"/>`;

const burst = Array.from({ length: 28 }, (_, i) => {
  const a = (i * Math.PI) / 14;
  const d = i % 2 ? 22 : 30;
  return `${(Math.cos(a) * d).toFixed(1)},${(Math.sin(a) * d).toFixed(1)}`;
}).join(" ");

// A twisted bubble-gum wrapper on a sunny background.
export default (r) => {
  const size = r.name.length > 12 ? 20 : 28;
  const ink = isLight(r.lang.color) ? "#5a1033" : "#fff";
  return svg(
    r.name,
    `<defs><pattern id="polka" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.5" fill="#fff" fill-opacity=".45"/><circle cx="12" cy="12" r="2.5" fill="#fff" fill-opacity=".45"/></pattern></defs>
<rect width="400" height="150" rx="12" fill="#fff3b0"/>
${END}<g transform="matrix(-1 0 0 1 400 0)">${END}</g>
<rect x="62" y="18" width="276" height="114" rx="8" fill="#ff5fa2"/>
<rect x="62" y="18" width="276" height="114" rx="8" fill="url(#polka)"/>
<path d="M62 48Q130 36 200 48T338 48V100Q270 112 200 100T62 100Z" fill="#ffd93b"/>
<g font-family="${BUBBLY}" font-weight="900" text-anchor="middle">
  <text x="196" y="${76 + size * 0.36}" font-size="${size}" fill="#fff" stroke="#c2185b" stroke-width="5" stroke-linejoin="round" paint-order="stroke">${esc(fit(r.name, 220, size, 0.62))}</text>
  <text x="80" y="38" font-size="10" fill="#fff" text-anchor="start" letter-spacing="1">BUBBLE GUM</text>
  <rect x="100" y="110" width="200" height="16" rx="8" fill="${r.lang.color}" stroke="#fff" stroke-width="1.5"/>
  <text x="200" y="122" font-size="10" fill="${ink}">${esc(fit(r.lang.name.toUpperCase(), 70, 10, 0.68))} FLAVOUR · ⑂ ${esc(r.forks)}</text>
  <g transform="translate(316 32) rotate(-12)">
    <g><polygon points="${burst}" fill="#ffe14d" stroke="#e0478f" stroke-width="1.5"/>
      <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="1.6s" repeatCount="indefinite"/></g>
    <text y="-5" font-size="6.5" fill="#c2185b">FREE INSIDE</text>
    <text y="9" font-size="12" fill="#c2185b">★${esc(r.stars)}</text>
  </g>
</g>`,
  );
};
