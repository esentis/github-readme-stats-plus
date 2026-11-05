import { FONT, esc, fit, isLight, lines, motion, svg, wrap } from "../card.js";

export const about = "Guitar effects pedal: a chunky enclosure in the language colour with STARS and FORKS knobs, a chrome footswitch and a glowing LED; notes on the pedalboard beside it.";

const turn = (n, decades) => -135 + 270 * Math.min(1, Math.log10(n + 1) / decades);
const knob = (cx, deg) => `<g transform="translate(${cx} 38)">
    <circle r="17" fill="#000" fill-opacity=".25" transform="translate(1.5 2)"/>
    <circle r="16" fill="#1b1b1d"/><circle r="16" fill="none" stroke="#3a3a3e" stroke-width="2" stroke-dasharray="1.6 1.6"/>
    <circle r="11" fill="url(#pd-cap)"/>
    <path d="M0 -4V-13" stroke="#fff" stroke-width="2.4" stroke-linecap="round" transform="rotate(${deg.toFixed(1)})"/>
  </g>`;

// A stompbox on a dark pedalboard: knobs read the star and fork counts, the LED glows while it is "on".
export default (r) => {
  const c = r.lang.color;
  const ink = isLight(c) ? "#1a1a1a" : "#fff";
  return svg(
    r.name,
    `<defs>
  <linearGradient id="pd-sheen" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  <radialGradient id="pd-cap" cx=".35" cy=".3"><stop offset="0" stop-color="#5a5a60"/><stop offset="1" stop-color="#1f1f22"/></radialGradient>
  <radialGradient id="pd-chrome" cx=".35" cy=".3"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#a9adb5"/><stop offset="1" stop-color="#5d6168"/></radialGradient>
  <radialGradient id="pd-glow"><stop offset="0" stop-color="#ff3b30" stop-opacity=".9"/><stop offset="1" stop-color="#ff3b30" stop-opacity="0"/></radialGradient>
</defs>
${motion(`.pd-glow{transform-box:fill-box;transform-origin:center;animation:pd-glow 2.4s ease-in-out infinite}@keyframes pd-glow{0%,100%{opacity:.9}50%{opacity:.4;transform:scale(.8)}}`)}
<rect width="400" height="150" rx="12" fill="#1d1e22"/>
<path d="M0 30H400M0 60H400M0 90H400M0 120H400" stroke="#26272c"/>
<g fill="#9ea3ab"><rect x="6" y="48" width="12" height="20" rx="2"/><rect x="222" y="48" width="12" height="20" rx="2"/></g>
<rect x="15" y="12" width="214" height="130" rx="12" fill="#000" fill-opacity=".4"/>
<rect x="14" y="9" width="212" height="130" rx="12" fill="${c}"/>
<rect x="14" y="9" width="212" height="130" rx="12" fill="url(#pd-sheen)"/>
<g fill="${ink}" fill-opacity=".35"><circle cx="24" cy="19" r="2.5"/><circle cx="216" cy="19" r="2.5"/><circle cx="24" cy="129" r="2.5"/><circle cx="216" cy="129" r="2.5"/></g>
${knob(54, turn(r.starCount, 4))}${knob(186, turn(r.forkCount, 3))}
<circle class="pd-glow" cx="120" cy="30" r="11" fill="url(#pd-glow)"/>
<circle cx="120" cy="30" r="4" fill="#ff5a4f" stroke="#2a0a08" stroke-width="1"/>
<circle cx="120" cy="122" r="13" fill="#2a2b2f"/><circle cx="120" cy="121" r="10" fill="url(#pd-chrome)"/>
<g font-family="${FONT}" font-weight="800" fill="${ink}" text-anchor="middle">
  <g font-size="7.5" letter-spacing="1.5"><text x="54" y="68">STARS</text><text x="186" y="68">FORKS</text></g>
  <g font-size="9.5" font-weight="700" fill-opacity=".85"><text x="54" y="79">${esc(r.stars)}</text><text x="186" y="79">${esc(r.forks)}</text></g>
  <text x="120" y="54" font-size="7" letter-spacing="1" fill-opacity=".8">${esc(fit(r.lang.name.toUpperCase(), 92, 7, 0.75))}</text>
  <text x="120" y="102" font-size="17" letter-spacing=".5">${esc(fit(r.name.toUpperCase(), 196, 17, 0.7))}</text>
</g>
<g font-family="${FONT}">
  <text x="246" y="32" font-size="9" font-weight="700" fill="#8b8f99" letter-spacing="2">STOMPBOX</text>
  <text x="246" y="50" font-size="12" fill="#e5e7eb">by ${esc(fit(r.owner, 120, 12))}</text>
  <text font-size="10.5" fill="#9ca3af">${lines(wrap(r.description, 22, 4), 246, 70, 14)}</text>
  <text x="246" y="132" font-size="12" font-weight="700" fill="#fff"><tspan fill="${c}">●</tspan> ★ ${esc(r.stars)}  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
