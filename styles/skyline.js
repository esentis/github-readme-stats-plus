import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Night skyline: office windows switch on and off in a slow wave across the towers, under a moon and a language-coloured city glow.";

const STARS = Array.from({ length: 40 }, (_, i) => [(Math.abs(Math.sin(i * 12.99) * 43758) % 1) * 400, (Math.abs(Math.sin(i * 78.23) * 43758) % 1) * 78, 0.4 + (i % 3) * 0.25])
  .filter(([x, y]) => x > 262 || y < 16) // keep the sky behind the text clean
  .map(([x, y, r]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`).join("");
// Highest a roof may reach at x: low blocks under the text, towers on the right, shorter again under the moon.
const roof = (x) => (x < 240 ? 112 : x < 268 ? 112 - (x - 240) * 2.3 : x < 342 ? 48 : 68);

export default (r) => {
  const rand = rng(r.name);
  let back = "", front = "", wins = "", tall = { y: 150 };
  for (let x = -6, w; x < 400; x += w) {
    w = 12 + Math.floor(rand() * 16);
    const y = Math.round(Math.max(x + w < 238 ? 104 : 0, roof(x + w / 2) - 12 + rand() * 22));
    back += `<rect x="${x}" y="${y}" width="${w}" height="${150 - y}"/>`;
  }
  for (let x = -5, w; x < 400; x += w) {
    w = 20 + 5 * Math.floor(rand() * 4);
    const y = Math.round(x + w < 240 ? 112 + rand() * 14 : roof(x + w / 2) + rand() * 26);
    if (y < tall.y && x > 240) tall = { x: x + w / 2, y };
    front += `<rect x="${x}" y="${y}" width="${w}" height="${150 - y}"/>`;
    for (let wx = x + 4; wx <= x + w - 6; wx += 5)
      for (let wy = y + 6; wy < 146; wy += 7) {
        if (rand() > 0.34) continue;
        const c = rand() < 0.12 ? "#bcd6ff" : rand() < 0.3 ? "#fff0c8" : "#ffcf7a";
        const anim = rand() < 0.24 ? ` class="sk-w" style="animation-delay:-${((wx / 400) * 9 + rand() * 3).toFixed(1)}s"` : "";
        wins += `<rect x="${wx}" y="${wy}" width="2.4" height="3.4" fill="${c}"${anim}/>`;
      }
  }
  return svg(
    r.name,
    `${motion(".sk-w{animation:sk-w 18s infinite}@keyframes sk-w{0%,45%{opacity:1}47%,93%{opacity:.08}95%,100%{opacity:1}}.sk-b{animation:sk-b 2.4s infinite}@keyframes sk-b{0%,40%{opacity:1}55%,100%{opacity:.15}}")}
<defs>
  <clipPath id="sk-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="sk-sky" x2="0" y2="1"><stop offset="0" stop-color="#050816"/><stop offset=".6" stop-color="#121735"/><stop offset="1" stop-color="#262147"/></linearGradient>
  <radialGradient id="sk-glow" cx=".5" cy="1" r=".6"><stop offset="0" stop-color="${r.lang.color}" stop-opacity=".5"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity="0"/></radialGradient>
  <radialGradient id="sk-halo"><stop offset=".3" stop-color="#fff6dc" stop-opacity=".35"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/></radialGradient>
  <linearGradient id="sk-haze" x2="0" y2="1"><stop offset="0" stop-color="${r.lang.color}" stop-opacity="0"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity=".22"/></linearGradient>
</defs>
<g clip-path="url(#sk-clip)">
  <rect width="400" height="150" fill="url(#sk-sky)"/>
  <g fill="#fff" opacity=".7">${STARS}</g>
  <rect x="40" y="40" width="400" height="140" fill="url(#sk-glow)"/>
  <circle cx="366" cy="28" r="34" fill="url(#sk-halo)"/>
  <circle cx="366" cy="28" r="10" fill="#f6f1df"/><g fill="#d9d2bb" opacity=".6"><circle cx="363" cy="25" r="2.4"/><circle cx="369" cy="31" r="1.6"/></g>
  <g fill="#222949">${back}</g>
  <rect y="60" width="400" height="90" fill="url(#sk-haze)"/>
  <path d="M${tall.x} ${tall.y}v-10" stroke="#0a0e20" stroke-width="1.5"/>
  <circle class="sk-b" cx="${tall.x}" cy="${tall.y - 10}" r="1.6" fill="#ff5a5a"/>
  <g fill="#0a0e20">${front}</g>
  <g>${wins}</g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <text x="24" y="38" font-size="20" font-weight="700" fill="#f4f1ff">${esc(fit(r.name, 216, 20))}</text>
  <text font-size="12" fill="#aeb4d6">${lines(wrap(r.description, 30), 24, 58, 15)}</text>
  ${row(stats(r, { cy: 92, size: 12, text: 'fill="#e8e6f8"', icon: 'fill="#aeb4d6"' }), 24, 14)}
</g>`,
  );
};
