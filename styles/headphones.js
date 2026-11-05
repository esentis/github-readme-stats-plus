import { FONT, MONO, esc, fit, isLight, motion, svg } from "../card.js";

export const about = "Over-ear headphones wrapped around a now-playing card: the repo as the track, the owner as artist, a bouncing equalizer and a progress bar playing through. Shows no description.";

const time = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// Headphones on a dark backdrop; the light player card sits between the ear cups.
export default (r) => {
  const seed = [...r.name].reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const p = 0.2 + (seed % 55) / 100;
  const total = 140 + (seed % 140);
  const ink = isLight(r.lang.color) ? "#111" : "#fff";
  const loop = `animation-duration:8s;animation-timing-function:linear;animation-iteration-count:infinite;animation-delay:-${(p * 8).toFixed(2)}s`;
  const cup = (x, flip) => `<g transform="translate(${x} 0)${flip ? " scale(-1 1)" : ""}">
    <path d="M0 66V52" stroke="#3a3d45" stroke-width="6" stroke-linecap="round"/>
    <rect x="-22" y="48" width="44" height="88" rx="21" fill="#25272d"/><rect x="-18" y="54" width="34" height="76" rx="17" fill="#2f3239"/>
    <rect x="10" y="54" width="16" height="76" rx="8" fill="#3d4049"/>
    <circle cx="-4" cy="92" r="7" fill="none" stroke="${r.lang.color}" stroke-width="2"/>
  </g>`;
  return svg(
    r.name,
    `${motion(`.hp-b{transform-box:fill-box;transform-origin:bottom;animation:hp-b 1s ease-in-out infinite alternate}
.hp-p{transform-box:fill-box;transform-origin:left;animation-name:hp-p;${loop}}.hp-k{animation-name:hp-k;${loop}}
@keyframes hp-b{from{transform:scaleY(.35)}to{transform:scaleY(1)}}
@keyframes hp-p{from{transform:scaleX(0)}to{transform:scaleX(${(1 / p).toFixed(4)})}}
@keyframes hp-k{from{transform:translateX(${(-216 * p).toFixed(1)}px)}to{transform:translateX(${(216 * (1 - p)).toFixed(1)}px)}}`)}
<rect width="400" height="150" rx="12" fill="#14151a"/>
<path d="M36 60C36 -2 364 -2 364 60" fill="none" stroke="#2c2e35" stroke-width="11" stroke-linecap="round"/>
<path d="M44 54C48 6 352 6 356 54" fill="none" stroke="#3e414a" stroke-width="3" stroke-linecap="round"/>
${cup(36, false)}${cup(364, true)}
<rect x="76" y="24" width="248" height="112" rx="12" fill="#f6f7f9"/>
<rect x="88" y="36" width="54" height="54" rx="7" fill="${r.lang.color}"/>
<g fill="none" stroke="${ink}" stroke-opacity=".25"><circle cx="115" cy="63" r="20"/><circle cx="115" cy="63" r="13"/></g>
<g font-family="${FONT}">
  <text x="115" y="69" font-size="17" font-weight="800" fill="${ink}" text-anchor="middle">${esc(r.name.slice(0, 1).toUpperCase())}</text>
  <text x="152" y="46" font-size="7.5" font-weight="700" fill="#8a8f98" letter-spacing="1.5">NOW PLAYING</text>
  <text x="152" y="66" font-size="15" font-weight="700" fill="#15171c">${esc(fit(r.name, 160, 15))}</text>
  <text x="152" y="82" font-size="11" fill="#5d636e">${esc(fit(`${r.owner} · ${r.lang.name}`, 160, 11))}</text>
  <text x="88" y="128" font-size="10.5" font-weight="700" fill="#15171c">★ ${esc(r.stars)}</text>
  <text x="312" y="128" font-size="10.5" font-weight="700" fill="#15171c" text-anchor="end">⑂ ${esc(r.forks)}</text>
</g>
<g fill="${r.lang.color}">${[0, 1, 2, 3].map((i) => `<rect class="hp-b" style="animation-delay:-${((seed >> i) % 10) / 10}s" x="${296 + i * 5}" y="${36 + (i % 2) * 3}" width="3" height="${12 - (i % 2) * 3}" rx="1"/>`).join("")}</g>
<rect x="88" y="99" width="224" height="4" rx="2" fill="#dfe1e6"/>
<rect class="hp-p" x="88" y="99" width="${(224 * p).toFixed(1)}" height="4" rx="2" fill="${r.lang.color}"/>
<circle class="hp-k" cx="${(88 + 224 * p).toFixed(1)}" cy="101" r="4.5" fill="#15171c"/>
<g font-family="${MONO}" font-size="8" fill="#8a8f98"><text x="88" y="114">${time(total * p)}</text><text x="312" y="114" text-anchor="end">${time(total)}</text></g>
<g fill="#15171c"><path d="M181 119V129M192 119L183 124L192 129Z"/><circle cx="200" cy="124" r="8"/><path d="M219 119V129M208 119L217 124L208 129Z"/></g>
<path d="M181 119V129M219 119V129" stroke="#15171c" stroke-width="2"/>
<path d="M197.5 120.5V127.5L203.5 124Z" fill="#f6f7f9"/>`,
  );
};
