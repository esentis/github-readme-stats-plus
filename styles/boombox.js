import { FONT, MONO, esc, fit, isLight, motion, svg } from "../card.js";

export const about = "80s boombox: chrome handle, two speakers thumping to the beat, the name on a green display and a tape in the cassette door labelled with stars and forks. Shows no description.";

const speaker = (cx) => `<g transform="translate(${cx} 88)">
    <circle r="47" fill="url(#bb-chrome)"/><circle r="43" fill="#141518"/><circle r="43" fill="url(#bb-mesh)"/>
    <g class="bb-cone"><circle r="30" fill="url(#bb-cone)"/><circle r="30" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="3"/><circle r="10" fill="#3b3d43"/><circle r="10" fill="none" stroke="#fff" stroke-opacity=".15"/></g>
  </g>`;

// A black boombox with chrome trim: speakers pulse, the cassette reels turn.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#111" : "#fff";
  const reel = (x) => `<g transform="translate(${x} 99)"><g class="bb-reel"><circle r="7" fill="#e8e4da"/><path d="M-7 0H7M0-7V7" stroke="#2a2b30" stroke-width="1.6"/></g></g>`;
  return svg(
    r.name,
    `<defs>
  <linearGradient id="bb-chrome" x2="0" y2="1"><stop offset="0" stop-color="#f1f3f6"/><stop offset=".5" stop-color="#9aa0a9"/><stop offset="1" stop-color="#d8dbe0"/></linearGradient>
  <linearGradient id="bb-body" x2="0" y2="1"><stop offset="0" stop-color="#34363c"/><stop offset="1" stop-color="#18191c"/></linearGradient>
  <radialGradient id="bb-cone" cx=".42" cy=".38"><stop offset="0" stop-color="#5a5d65"/><stop offset="1" stop-color="#1c1d21"/></radialGradient>
  <pattern id="bb-mesh" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="#3a3c42"/></pattern>
</defs>
${motion(`.bb-cone{transform-box:fill-box;transform-origin:center;animation:bb-cone 1.2s ease-out infinite}.bb-reel{animation:bb-reel 3s linear infinite}
@keyframes bb-cone{0%,45%,100%{transform:scale(1)}8%{transform:scale(1.06)}55%{transform:scale(1.035)}}
@keyframes bb-reel{to{transform:rotate(360deg)}}`)}
<rect width="400" height="150" rx="12" fill="#23212a"/>
<path d="M112 30V14Q112 8 118 8H282Q288 8 288 14V30" fill="none" stroke="url(#bb-chrome)" stroke-width="7" stroke-linecap="round"/>
<rect x="6" y="28" width="388" height="118" rx="14" fill="url(#bb-body)" stroke="#4a4c53"/>
<rect x="128" y="30" width="144" height="3" fill="${r.lang.color}"/>
${speaker(72)}${speaker(328)}
<rect x="134" y="38" width="132" height="20" rx="3" fill="#0f1d14" stroke="#000"/>
<rect x="140" y="62" width="120" height="50" rx="4" fill="#3a3c42" stroke="url(#bb-chrome)"/>
<rect x="150" y="68" width="100" height="40" rx="3" fill="#e8e4da"/>
<rect x="150" y="68" width="100" height="16" rx="3" fill="${r.lang.color}"/>
<rect x="164" y="91" width="72" height="16" rx="8" fill="#1a1a1c"/>
${reel(176)}${reel(224)}
<rect x="140" y="62" width="120" height="50" rx="4" fill="#9fb6cc" fill-opacity=".12"/>
<g fill="url(#bb-chrome)">${Array.from({ length: 6 }, (_, i) => `<rect x="${141 + i * 20}" y="${i === 1 ? 119 : 117}" width="17" height="11" rx="2"/>`).join("")}</g>
<rect x="161" y="${119 + 9}" width="17" height="2" fill="${r.lang.color}"/>
<g font-family="${MONO}" font-weight="700">
  <text x="200" y="52.5" font-size="11.5" fill="#8dffb4" text-anchor="middle">${esc(fit(r.name, 124, 11.5))}</text>
  <text x="200" y="80" font-size="9.5" fill="${ink}" text-anchor="middle">★ ${esc(r.stars)}  ⑂ ${esc(r.forks)}</text>
</g>
<text x="200" y="140.5" font-family="${FONT}" font-size="7" font-weight="700" fill="#9aa0a9" letter-spacing="1.5" text-anchor="middle">${esc(fit(r.lang.name.toUpperCase(), 110, 7, 0.8))} · STEREO</text>`,
  );
};
