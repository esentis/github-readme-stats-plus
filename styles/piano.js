import { FONT, esc, fit, motion, svg } from "../card.js";

export const about = "Piano: an elegant serif title over a strip of keys with the repo's own chord lit in the language colour, rippling like an arpeggio.";

const SERIF = "'Didot', 'Bodoni 72', 'Playfair Display', Georgia, 'Times New Roman', serif";
const NOTES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const WHITE = [0, 2, 4, 5, 7, 9, 11];
const W = 400 / 22;

// Ivory card with a three-octave keyboard along the bottom; the chord (root, quality, seventh) comes from the repo name.
export default (r) => {
  const seed = [...r.name].reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const root = seed % 12;
  const minor = seed % 2 === 1;
  const seventh = r.name.length % 3 === 0;
  const chord = [0, minor ? 3 : 4, 7, ...(seventh ? [minor ? 10 : 11] : [])].map((n) => 12 + root + n);
  const label = NOTES[root] + (minor ? "m" : "") + (seventh ? (minor ? "7" : "maj7") : "");
  const lit = (s) => (chord.includes(s) ? ` fill="${r.lang.color}" class="pn-k" style="animation-delay:${chord.indexOf(s) * 0.25}s"` : "");
  const whites = [];
  const blacks = [];
  for (let s = 0; s <= 36; s++) {
    const o = Math.floor(s / 12);
    const n = s % 12;
    if (WHITE.includes(n)) {
      const x = (o * 7 + WHITE.indexOf(n)) * W;
      whites.push(`<rect x="${x.toFixed(2)}" y="88" width="${(W - 1).toFixed(2)}" height="66" rx="2" fill="#fffdf8"/>`);
      if (chord.includes(s)) whites.push(`<rect x="${x.toFixed(2)}" y="88" width="${(W - 1).toFixed(2)}" height="66" rx="2"${lit(s)}/>`);
    } else {
      const x = (o * 7 + WHITE.indexOf(n - 1) + 1) * W - 6;
      blacks.push(`<rect x="${x.toFixed(2)}" y="88" width="11" height="38" rx="1.5" fill="#1c1a19"/>`);
      if (chord.includes(s)) blacks.push(`<rect x="${(x + 1.5).toFixed(2)}" y="88" width="8" height="35" rx="1.5"${lit(s)}/>`);
    }
  }
  return svg(
    r.name,
    `<defs><clipPath id="pn-card"><rect width="400" height="150" rx="12"/></clipPath></defs>
${motion(`.pn-k{animation:pn-k 2.4s ease-in-out infinite}@keyframes pn-k{0%,40%,100%{opacity:1}20%{opacity:.45}}`)}
<g clip-path="url(#pn-card)">
  <rect width="400" height="150" fill="#d9d2c4"/>
  <rect width="400" height="84" fill="#fbf8f1"/>
  ${whites.join("")}${blacks.join("")}
  <rect y="82" width="400" height="6" fill="#1c1a19"/><rect y="86" width="400" height="2" fill="${r.lang.color}"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="#000" stroke-opacity=".12"/>
<g font-family="${SERIF}" fill="#24201b">
  <text x="22" y="38" font-size="26" font-style="italic">${esc(fit(r.name, 262, 26, 0.5))}</text>
  <text x="22" y="56" font-size="11" fill="#6f665b">by ${esc(fit(r.owner, 150, 11, 0.5))} · ${esc(fit(r.lang.name, 90, 11, 0.5))}</text>
  <text x="22" y="72" font-size="10.5" font-style="italic" fill="#8a8073">${esc(fit(r.description, 262, 10.5, 0.48))}</text>
  <text x="378" y="38" font-size="24" text-anchor="end">${label}</text>
  <text x="378" y="56" font-size="12" text-anchor="end" font-family="${FONT}" fill="#4a443c">★ ${esc(r.stars)}  ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
