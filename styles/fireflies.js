// Fireflies: a dusky meadow where fireflies (placed from the repo name) drift and pulse above tall grass silhouettes.
import { FONT, esc, fit, lines, motion, row, stats, rng, svg, wrap } from "../card.js";

export const about = "Dusky meadow: fireflies drifting and pulsing over tall grass, scattered the same way for each repo name.";

// Tapered blades rooted on the bottom edge; height follows h(x) so the grass stays low under the text.
const grass = (rnd, off, h, fill) => {
  let d = "";
  for (let x = -4, i = off; x < 404; x += 4 + rnd(i++) * 4) {
    const t = h(x) * (0.6 + rnd(i++) * 0.5), lean = (rnd(i++) - 0.5) * t * 0.5;
    d += `M${x.toFixed(1)} 151Q${(x + lean * 0.3).toFixed(1)} ${(150 - t * 0.6).toFixed(1)} ${(x + lean + 1.2).toFixed(1)} ${(150 - t).toFixed(1)}Q${(x + lean * 0.3 + 2).toFixed(1)} ${(150 - t * 0.5).toFixed(1)} ${(x + 3.4).toFixed(1)} 151Z`;
  }
  return `<path d="${d}" fill="${fill}"/>`;
};

export default (r) => {
  const v = Array.from({ length: 1000 }, rng(r.name)), rnd = (i) => v[i];
  const flies = Array.from({ length: 15 }, (_, i) => {
    const x = 250 + rnd(i) * 134, y = 20 + rnd(i + 50) * 84, s = 0.7 + rnd(i + 90) * 0.6;
    return `<g class="ff-d${i % 3}" style="animation-delay:${(-rnd(i + 130) * 9).toFixed(2)}s"><g class="ff-p" style="animation-delay:${(-rnd(i + 170) * 3).toFixed(2)}s;animation-duration:${(2.4 + rnd(i + 210) * 1.6).toFixed(2)}s">
    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(11 * s).toFixed(1)}" fill="url(#ff-glow)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.7 * s).toFixed(2)}" fill="#fbffe0"/></g></g>`;
  }).join("");
  const st = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 84, 12) } }, { cy: 124, size: 12, text: 'fill="#eef5df"', icon: 'fill="#c4e57a"' });
  return svg(
    r.name,
    `<defs>
  <clipPath id="ff-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="ff-sky" x2="0" y2="1"><stop offset="0" stop-color="#0a1324"/><stop offset=".6" stop-color="#16303c"/><stop offset="1" stop-color="#284636"/></linearGradient>
  <radialGradient id="ff-glow"><stop offset="0" stop-color="#efff9e" stop-opacity=".9"/><stop offset=".3" stop-color="#c9ef62" stop-opacity=".45"/><stop offset="1" stop-color="#a3d43a" stop-opacity="0"/></radialGradient>
  <radialGradient id="ff-mist" cx=".75" cy=".7" r=".6"><stop offset="0" stop-color="#b9e36a" stop-opacity=".16"/><stop offset="1" stop-color="#b9e36a" stop-opacity="0"/></radialGradient>
  <filter id="ff-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
${motion(`.ff-p{animation:ff-pulse 3s ease-in-out infinite}.ff-d0{animation:ff-a 9s ease-in-out infinite}.ff-d1{animation:ff-b 11s ease-in-out infinite}.ff-d2{animation:ff-c 13s ease-in-out infinite}
@keyframes ff-pulse{50%{opacity:.2}}@keyframes ff-a{33%{transform:translate(5px,-6px)}66%{transform:translate(-4px,-3px)}}
@keyframes ff-b{25%{transform:translate(-6px,3px)}50%{transform:translate(-2px,-6px)}75%{transform:translate(5px,-2px)}}@keyframes ff-c{50%{transform:translate(6px,5px)}}`)}
<g clip-path="url(#ff-clip)">
  <rect width="400" height="150" fill="url(#ff-sky)"/>
  <rect width="400" height="150" fill="url(#ff-mist)"/>
  <g fill="#fff" opacity=".5"><circle cx="268" cy="12" r=".7"/><circle cx="340" cy="22" r=".6"/><circle cx="386" cy="9" r=".8"/><circle cx="196" cy="14" r=".5"/></g>
  <path d="M0 128C40 120 80 124 120 118S200 112 250 116 330 104 400 110V150H0Z" fill="#132a26"/>
  ${grass(rnd, 300, (x) => (x < 230 ? 8 : 10 + Math.min(1, (x - 230) / 60) * 34), "#0f2320")}
  <g filter="url(#ff-blur)" opacity=".5"><circle cx="${226 + rnd(400) * 30}" cy="${118 + rnd(401) * 12}" r="7" fill="url(#ff-glow)"/><circle cx="${360 + rnd(402) * 26}" cy="${126 + rnd(403) * 10}" r="9" fill="url(#ff-glow)"/></g>
  ${flies}
  ${grass(rnd, 0, (x) => (x < 230 ? 6 : 6 + Math.min(1, (x - 230) / 80) * 24), "#050d0b")}
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#c4e57a" stroke-opacity=".16"/>
<g font-family="${FONT}">
  <text x="24" y="32" font-size="9.5" font-weight="600" letter-spacing="1.6" fill="#7f9c8c">${esc(fit(r.owner.toUpperCase(), 190, 9.5, 0.78))}</text>
  <text x="24" y="54" font-size="20" font-weight="700" fill="#f3f8e6">${esc(fit(r.name, 206, 20))}</text>
  <text font-size="12" fill="#a9c0b2">${lines(wrap(r.description, 29), 24, 75, 16)}</text>
  ${row(st, 24, 13)}
</g>`,
  );
};
