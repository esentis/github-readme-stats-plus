import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Museum placard: off-white card, small-caps owner, serif title, italic description and an accession line with stars and forks.";

const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";

// A gallery wall label: artist, title, medium, a short note and the accession line.
export default (r) =>
  svg(
    r.name,
    `${motion(".pc-rule { stroke-dasharray: 340; animation: pc-rule 9s ease-in-out infinite } @keyframes pc-rule { 0%, 60%, 100% { stroke-dashoffset: 0 } 70% { stroke-dashoffset: 340 } }")}
<rect x=".5" y=".5" width="399" height="149" rx="3" fill="#f6f2e9" stroke="#d9d1c1"/>
<rect x="6.5" y="6.5" width="387" height="137" rx="1" fill="none" stroke="#e6dfd1"/>
<g font-family="${SERIF}">
  <text x="30" y="32" font-size="10" fill="#7a7264" letter-spacing="2.5">${esc(fit(r.owner.toUpperCase(), 330, 10, 0.85))}</text>
  <text x="30" y="57" font-size="21" fill="#1f1c18">${esc(fit(r.name, 340, 21, 0.56))}</text>
  <circle cx="34" cy="69" r="4" fill="${r.lang.color}"/>
  <text x="44" y="73" font-size="11.5" fill="#4a443b">${esc(fit(r.lang.name, 160, 11.5, 0.55))}, open-source software</text>
  <text font-size="11.5" font-style="italic" fill="#5b5448">${lines(wrap(r.description, 58), 30, 93, 15)}</text>
  <path class="pc-rule" d="M30 120H370" stroke="#d6cebd"/>
  <text x="30" y="135" font-size="9" fill="#7a7264" letter-spacing="1.5">ACCESSION  ★ ${esc(r.stars)}  ·  ⑂ ${esc(r.forks)}</text>
  <text x="370" y="135" font-size="9" fill="#a39a89" letter-spacing="1.5" text-anchor="end">GIFT OF THE AUTHOR</text>
</g>`,
  );
