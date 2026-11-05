import { FONT, esc, fit, lines, motion, svg, textWidth, words, wrap } from "../card.js";

export const about = "Element tile: stars as the atomic number, a symbol made from the name.";

// A periodic table element tile: stars as the atomic number, a two-letter symbol from the name.
export default (r) => {
  const [a, b = a.slice(1)] = words(r.name);
  const symbol = a[0].toUpperCase() + (b[0] ?? "").toLowerCase();
  const tail = `STARS ${r.stars} · FORKS ${r.forks} · `;
  return svg(
    r.name,
    `${motion(".pd-glow { animation: pd-glow 5s ease-in-out infinite } @keyframes pd-glow { 50% { fill-opacity: .28 } }")}
<rect x=".5" y=".5" width="399" height="149" rx="10" fill="#fbfaf7" stroke="#d9d6cf"/>
<rect class="pd-glow" x="18" y="18" width="114" height="114" rx="6" fill="${r.lang.color}" fill-opacity=".14" stroke="${r.lang.color}" stroke-width="2.5"/>
<g font-family="${FONT}" fill="#1c1b19">
  <text x="28" y="40" font-size="14" font-weight="700">${esc(r.stars)}</text>
  <text x="122" y="40" font-size="11" text-anchor="end" fill="#6b6760">${esc(r.forks)}</text>
  <text x="75" y="94" font-size="50" font-weight="700" text-anchor="middle">${esc(symbol)}</text>
  <text x="75" y="113" font-size="10.5" text-anchor="middle">${esc(fit(r.name, 100, 10.5))}</text>
  <text x="75" y="125" font-size="9" text-anchor="middle" fill="#6b6760">${esc(fit(r.lang.name, 100, 9))}</text>
  <text x="152" y="44" font-size="20" font-weight="700">${esc(fit(r.name, 230, 20))}</text>
  <text font-size="12.5" fill="#4a4740">${lines(wrap(r.description, 34), 152, 68, 17)}</text>
  <text x="152" y="124" font-size="11" fill="#6b6760" letter-spacing=".5">${esc(tail + fit(r.lang.name.toUpperCase(), 236 - textWidth(tail, 11, 0.55), 11, 0.7))}</text>
</g>`,
  );
};
