import { FONT, esc, fit, motion, svg } from "../card.js";

export const about = "Sheet music: engraved title, tempo marking from the stars, the owner as composer, four bars of notes written from the name and the description sung as the lyric; a soft playback cursor moves along the staff.";

const SERIF = "Georgia, 'Times New Roman', serif";
const TEMPO = [[10, "Largo"], [100, "Andante"], [1000, "Moderato"], [10000, "Allegro"], [Infinity, "Presto"]];
const CLEF = "M29 107C26 110 29 114 33 112C35 110 35 106 34 100L32 56C32 50 36 46 38 49C41 54 36 62 30 68C25 74 23 80 25 87C27 94 36 97 41 92C45 87 41 80 35 81C30 82 30 89 34 90";

// Cream manuscript paper: a treble staff with notes derived from the repo name, double bar at the end.
export default (r) => {
  const tempo = TEMPO.find(([max]) => r.starCount < max)[1];
  const notes = Array.from({ length: 16 }, (_, i) => {
    const code = r.name.charCodeAt(i % r.name.length) + i * 5;
    const step = (code * 7) % 9;
    const x = 80 + Math.floor(i / 4) * 76 + (i % 4) * 17;
    const y = 96 - step * 4;
    const up = step < 4;
    const half = code % 5 === 0;
    return `<ellipse cx="${x}" cy="${y}" rx="4.6" ry="3.3" transform="rotate(-20 ${x} ${y})" ${half ? 'fill="#f7f1e3" stroke="#2b2620" stroke-width="1.6"' : 'fill="#2b2620"'}/><path d="M${up ? x + 4.2 : x - 4.2} ${y}V${up ? y - 26 : y + 26}"/>`;
  }).join("");
  return svg(
    r.name,
    `${motion(`.sm-cur{animation:sm-cur 8s linear infinite}@keyframes sm-cur{to{transform:translateX(296px)}}`)}
<rect width="400" height="150" rx="8" fill="#f7f1e3"/>
<rect x=".5" y=".5" width="399" height="149" rx="7.5" fill="none" stroke="#2b2620" stroke-opacity=".15"/>
<rect class="sm-cur" x="68" y="56" width="16" height="48" rx="3" fill="${r.lang.color}" fill-opacity=".25"/>
<g stroke="#2b2620">
  <path d="M20 64H372M20 72H372M20 80H372M20 88H372M20 96H372" stroke-width=".9" stroke-opacity=".75"/>
  <path d="M20 64V96M142 64V96M218 64V96M294 64V96M366 64V96" stroke-width="1.1"/>
  <rect x="369" y="64" width="3" height="32" fill="#2b2620" stroke="none"/>
  <path d="${CLEF}" fill="none" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="30" cy="108" r="2.6" fill="#2b2620" stroke="none"/>
  <g stroke-width="1.2">${notes}</g>
</g>
<g font-family="${SERIF}" fill="#2b2620">
  <text x="200" y="26" font-size="18" font-weight="700" text-anchor="middle">${esc(fit(r.name, 300, 18, 0.55))}</text>
  <text x="20" y="46" font-size="10.5" font-weight="700" font-style="italic">${tempo} <tspan font-weight="400">♩ = ${esc(r.stars)}</tspan></text>
  <text x="380" y="46" font-size="10.5" font-style="italic" text-anchor="end">Music by ${esc(fit(r.owner, 150, 10.5, 0.5))}</text>
  <text x="54" y="80" font-size="17" font-weight="700" text-anchor="middle">4</text><text x="54" y="96" font-size="17" font-weight="700" text-anchor="middle">4</text>
  <text x="68" y="121" font-size="10.5" font-style="italic" fill="#5c5348">${esc(fit(r.description, 300, 10.5, 0.48))}</text>
  <text x="200" y="140" font-size="9.5" fill="#7a7064" text-anchor="middle" font-family="${FONT}" letter-spacing=".5"><tspan fill="${r.lang.color}">●</tspan> ${esc(fit(r.lang.name, 100, 9.5))}   ★ ${esc(r.stars)}   ⑂ ${esc(r.forks)}</text>
</g>`,
  );
};
