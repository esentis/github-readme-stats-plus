import { FONT, MONO, esc, fit, motion, svg } from "../card.js";

export const about = "DJ mixing desk: STARS, FORKS and LANG channel strips with faders, two VU meters whose needles dance and a crossfader drifting between decks. Shows no description.";

const level = (n, decades) => Math.min(1, Math.log10(n + 1) / decades);

// A VU meter face; the needle sits at the value and jitters around it.
const vu = (x, label, v, delay) => {
  const deg = -45 + 90 * (0.15 + 0.75 * v);
  return `<g transform="translate(${x} 12)">
    <rect width="76" height="52" rx="4" fill="url(#mx-face)" stroke="#000"/>
    <path d="M12 34A34 34 0 0 1 52 20" fill="none" stroke="#2b2620" stroke-width="1.2"/><path d="M52 20A34 34 0 0 1 64 34" fill="none" stroke="#d6261a" stroke-width="2.4"/>
    <g stroke="#2b2620">${[-45, -27, -9, 9, 27, 45].map((a) => `<path d="M38 12V16" transform="rotate(${a} 38 48)"/>`).join("")}</g>
    <text x="9" y="47" font-size="7" font-weight="700" fill="#2b2620">VU</text><text x="67" y="47" font-size="7.5" font-weight="700" fill="#2b2620" text-anchor="end">${label}</text>
    <g transform="rotate(${deg.toFixed(1)} 38 48)"><path class="mx-n" style="animation-delay:-${delay}s" d="M38 48V13" stroke="#1a1a1a" stroke-width="1.2"/></g>
    <rect x="28" y="44" width="20" height="8" rx="2" fill="#1a1a1c"/>
  </g>`;
};
// A channel strip: caption, gain knob, fader slot with the cap at the value, value below.
const strip = (cx, caption, v, value, cap) => `<g transform="translate(${cx} 0)">
    <text y="62" font-size="7" font-weight="700" fill="#8b8f99" letter-spacing="1.2" text-anchor="middle">${caption}</text>
    <circle cy="74" r="6.5" fill="#2e3036" stroke="#4a4d55"/><path d="M0 74L${(4.5 * Math.sin(v * 4.7 - 2.35)).toFixed(1)} ${(74 - 4.5 * Math.cos(v * 4.7 - 2.35)).toFixed(1)}" stroke="#fff" stroke-width="1.4"/>
    <rect x="-2" y="86" width="4" height="38" rx="2" fill="#050506"/>
    <rect x="-11" y="${(119 - v * 34).toFixed(1)}" width="22" height="9" rx="2" fill="${cap}" stroke="#000" stroke-opacity=".5"/>
    <path d="M-11 ${(123.5 - v * 34).toFixed(1)}H11" stroke="#000" stroke-opacity=".5"/>
    <text y="141" font-size="10" font-weight="700" fill="#f2f4f7" text-anchor="middle">${value}</text>
  </g>`;

// A dark mixing desk: three channel strips on the left, meters and the crossfader on the right.
export default (r) => {
  const seed = [...r.name].reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const xf = 238 + 120 * (r.starCount / (r.starCount + r.forkCount + 1));
  return svg(
    r.name,
    `<defs>
  <linearGradient id="mx-panel" x2="0" y2="1"><stop offset="0" stop-color="#25272d"/><stop offset="1" stop-color="#121317"/></linearGradient>
  <linearGradient id="mx-face" x2="0" y2="1"><stop offset="0" stop-color="#fbf0cf"/><stop offset="1" stop-color="#e3cf98"/></linearGradient>
  <linearGradient id="mx-cap" x2="0" y2="1"><stop offset="0" stop-color="#eef0f3"/><stop offset="1" stop-color="#9aa0a9"/></linearGradient>
</defs>
${motion(`.mx-n{transform-origin:38px 48px;animation:mx-n 1.8s ease-in-out infinite}.mx-x{animation:mx-x 7s ease-in-out infinite}
@keyframes mx-n{0%,100%{transform:rotate(0)}20%{transform:rotate(7deg)}35%{transform:rotate(-3deg)}55%{transform:rotate(9deg)}75%{transform:rotate(-5deg)}}
@keyframes mx-x{0%,100%{transform:translateX(0)}50%{transform:translateX(${xf > 298 ? -8 : 8}px)}}`)}
<rect width="400" height="150" rx="12" fill="url(#mx-panel)"/>
<rect x="1" y="1" width="398" height="148" rx="11" fill="none" stroke="#fff" stroke-opacity=".07"/>
<path d="M212 54V140" stroke="#000" stroke-opacity=".6"/><path d="M213 54V140" stroke="#fff" stroke-opacity=".06"/>
<g font-family="${FONT}">
  <text x="20" y="30" font-size="16" font-weight="700" fill="#f2f4f7">${esc(fit(r.name, 186, 16))}</text>
  <text x="20" y="45" font-size="10.5" fill="#8b8f99">${esc(fit(r.owner, 186, 10.5))}</text>
  ${vu(222, "★", level(r.starCount, 4), 0)}${vu(306, "⑂", level(r.forkCount, 3), (seed % 9) / 10)}
  ${strip(46, "STARS", level(r.starCount, 4), `★ ${esc(r.stars)}`, "url(#mx-cap)")}${strip(108, "FORKS", level(r.forkCount, 3), `⑂ ${esc(r.forks)}`, "url(#mx-cap)")}${strip(170, "LANG", 0.3 + (seed % 60) / 100, `<tspan font-size="8.5">${esc(fit(r.lang.name, 58, 8.5))}</tspan>`, r.lang.color)}
  <g font-size="7" font-weight="700" fill="#8b8f99" letter-spacing="1.2" text-anchor="middle"><text x="298" y="86">CROSSFADER</text><text x="232" y="112">A</text><text x="364" y="112">B</text></g>
  <path d="M298 96V120" stroke="#3a3d45"/>
  <rect x="242" y="106" width="112" height="4" rx="2" fill="#050506"/>
  <g class="mx-x"><rect x="${(xf - 7).toFixed(1)}" y="98" width="14" height="20" rx="2" fill="url(#mx-cap)" stroke="#000" stroke-opacity=".5"/><path d="M${xf.toFixed(1)} 98V118" stroke="#000" stroke-opacity=".5"/></g>
  <g font-family="${MONO}" font-size="8" fill="#5f636c"><text x="244" y="137">CUE</text><text x="352" y="137" text-anchor="end">MASTER</text></g>
  <circle cx="276" cy="134" r="3" fill="${r.lang.color}"/><circle cx="314" cy="134" r="3" fill="#3a3d45"/>
</g>`,
  );
};
