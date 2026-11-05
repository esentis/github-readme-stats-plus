import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Postage stamp: perforated edge, engraved frame, the star count as the denomination and a postmark.";

const SERIF = "Georgia, 'Times New Roman', serif";
const INK = "#22253a";

// A perforated stamp with hatched engraving in the language colour and wavy cancellation lines.
export default (r) => {
  const perf = [];
  for (let x = 6; x < 400; x += 12) perf.push(`<circle cx="${x}" r="4"/><circle cx="${x}" cy="150" r="4"/>`);
  for (let y = 6; y < 150; y += 12) perf.push(`<circle cy="${y}" r="4"/><circle cx="400" cy="${y}" r="4"/>`);
  const wave = (y) => `<path d="M262 ${y}q10-5 20 0t20 0t20 0t20 0t20 0" />`;
  return svg(
    r.name,
    `${motion(".st-mark{transform-origin:322px 104px;animation:st-mark 7s ease-in-out infinite}@keyframes st-mark{0%,82%,100%{transform:none}88%{transform:scale(1.05) rotate(-3deg)}94%{transform:scale(.98)}}")}
<defs>
  <mask id="perf"><rect width="400" height="150" fill="#fff"/><g fill="#000">${perf.join("")}</g></mask>
  <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V4" stroke="${r.lang.color}" stroke-width="1.2"/></pattern>
</defs>
<rect width="400" height="150" fill="#f6efdc" mask="url(#perf)"/>
<rect x="14" y="14" width="372" height="122" fill="url(#hatch)" opacity=".35"/>
<rect x="14" y="14" width="372" height="122" fill="none" stroke="${INK}" stroke-width="1.5"/>
<rect x="24" y="24" width="352" height="102" fill="#f6efdc" stroke="${INK}" stroke-width=".8"/>
<rect x="27" y="27" width="346" height="96" fill="none" stroke="${r.lang.color}" stroke-width="1.5"/>
<g font-family="${SERIF}" fill="${INK}">
  <text x="38" y="44" font-size="9" letter-spacing="2.5">${esc(fit(r.owner.toUpperCase(), 130, 9, 0.85))} · POSTE</text>
  <text x="38" y="68" font-size="21" font-weight="700" font-style="italic">${esc(fit(r.name, 236, 21, 0.55))}</text>
  <text font-size="10.5" fill="#4a4c5e">${lines(wrap(r.description, 40, 2), 38, 86, 13)}</text>
  <text x="38" y="117" font-size="10" letter-spacing="1.5">${esc(fit(r.lang.name.toUpperCase(), 140, 10, 0.8))} · ⑂ ${esc(r.forks)}</text>
  <text x="362" y="62" font-size="${r.stars.length > 3 ? 24 : 32}" font-weight="700" text-anchor="end">${esc(r.stars)}</text>
  <text x="362" y="78" font-size="10" letter-spacing="2" text-anchor="end">★ STARS</text>
</g>
<g class="st-mark" fill="none" stroke="${INK}" stroke-opacity=".45" stroke-width="1.3">
  <circle cx="322" cy="104" r="20"/><circle cx="322" cy="104" r="15"/>${[96, 104, 112].map(wave).join("")}
</g>`,
  );
};
