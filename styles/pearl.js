import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Pearl: an iridescent pearl and a graduated strand on champagne-pink satin, a lustre highlight gliding across them; serif type.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
// A graduated strand along a quadratic curve, pearls touching; the big pearl rests above it.
const STRAND = (() => {
  const P = [[222, 168], [292, 92], [368, 150], [424, 64]], out = [];
  const at = (t) => P.reduce((a, [x, y], i) => {
    const k = [1, 3, 3, 1][i] * (1 - t) ** (3 - i) * t ** i;
    return [a[0] + k * x, a[1] + k * y];
  }, [0, 0]);
  // Walk the curve in small steps and drop a pearl whenever the previous one has been cleared.
  let prev = null, r = 6;
  for (let t = 0; t <= 1; t += 0.002) {
    const [x, y] = at(t);
    r = 6 + 3.4 * Math.sin(Math.PI * Math.min(1, t * 1.15));
    if (!prev || Math.hypot(x - prev[0], y - prev[1]) >= prev[2] + r + 0.6) out.push((prev = [x, y, r]));
  }
  return out;
})();
const BIG = [326, 56, 32];
const ALL = [...STRAND, BIG];

const pearl = ([x, y, r]) => `<ellipse cx="${(x + r * 0.25).toFixed(1)}" cy="${(y + r * 0.8).toFixed(1)}" rx="${(r * 0.95).toFixed(1)}" ry="${(r * 0.35).toFixed(1)}" fill="#7a4a42" opacity=".28" filter="url(#pl-blur)"/>
<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#pl-base)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#pl-iri)"/>
<ellipse cx="${(x - r * 0.33).toFixed(1)}" cy="${(y - r * 0.38).toFixed(1)}" rx="${(r * 0.24).toFixed(1)}" ry="${(r * 0.15).toFixed(1)}" fill="#fff" transform="rotate(-35 ${(x - r * 0.33).toFixed(1)} ${(y - r * 0.38).toFixed(1)})"/>`;

// Champagne-pink satin with soft folds, text on the left, pearls on the right.
export default (r) => {
  const size = r.name.length > 16 ? 19 : 24;
  const mid = Math.floor(STRAND.length / 2), [cx, cy, cr] = STRAND[mid];
  return svg(
    r.name,
    `${motion(".pl-gloss { animation: pl-gloss 8s ease-in-out infinite } @keyframes pl-gloss { 0% { transform: translateX(-150px) } 55%, 100% { transform: translateX(130px) } } .pl-fold { animation: pl-fold 10s ease-in-out infinite } @keyframes pl-fold { 50% { opacity: .55 } }")}
<defs>
  <clipPath id="pl-card"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="pl-all">${ALL.map(([x, y, s]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(1)}"/>`).join("")}</clipPath>
  <linearGradient id="pl-satin" x2=".6" y2="1"><stop offset="0" stop-color="#f8ebe3"/><stop offset=".55" stop-color="#efd9cd"/><stop offset="1" stop-color="#e2c3b4"/></linearGradient>
  <radialGradient id="pl-base" cx=".38" cy=".34" r=".72"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#f8efea"/><stop offset=".82" stop-color="#e3d0cb"/><stop offset="1" stop-color="#c5aaa6"/></radialGradient>
  <radialGradient id="pl-iri" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#e6f3ee" stop-opacity="0"/><stop offset=".78" stop-color="#d6efe6" stop-opacity=".45"/><stop offset=".9" stop-color="#e6d3f3" stop-opacity=".5"/><stop offset="1" stop-color="#f6c9b8" stop-opacity=".55"/></radialGradient>
  <linearGradient id="pl-gold" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a8"/><stop offset=".5" stop-color="#c6953f"/><stop offset="1" stop-color="#f1d58c"/></linearGradient>
  <radialGradient id="pl-cab" cx=".4" cy=".35"><stop offset=".4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
  <radialGradient id="pl-shine"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <filter id="pl-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
  <filter id="pl-soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>
</defs>
<g clip-path="url(#pl-card)">
  <rect width="400" height="150" fill="url(#pl-satin)"/>
  <g fill="none" stroke-linecap="round" filter="url(#pl-soft)">
    <path d="M-20 120C80 70 170 150 260 90S380 20 430 50" stroke="#fff" stroke-opacity=".7" stroke-width="16" class="pl-fold"/>
    <path d="M-20 142C90 100 180 170 280 118S390 70 430 88" stroke="#b98a7c" stroke-opacity=".25" stroke-width="14"/>
    <path d="M150 -10C210 30 250 10 330 -6" stroke="#b98a7c" stroke-opacity=".18" stroke-width="12"/>
  </g>
  <path d="M${STRAND.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}" fill="none" stroke="#c7a99e" stroke-width=".8"/>
  ${STRAND.map((p, i) => (i === mid ? "" : pearl(p))).join("")}
  <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(cr - 0.8).toFixed(1)}" fill="${r.lang.color}" stroke="url(#pl-gold)" stroke-width="2.4"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(cr - 2).toFixed(1)}" fill="url(#pl-cab)"/>
  <ellipse cx="${(cx - cr * 0.3).toFixed(1)}" cy="${(cy - cr * 0.3).toFixed(1)}" rx="${(cr * 0.3).toFixed(1)}" ry="${(cr * 0.18).toFixed(1)}" fill="#fff" opacity=".6"/>
  ${pearl(BIG)}
  <ellipse cx="${BIG[0] + 6}" cy="${BIG[1] + 22}" rx="16" ry="4" fill="#f7c9b6" opacity=".45" filter="url(#pl-blur)"/>
  <g clip-path="url(#pl-all)"><ellipse class="pl-gloss" cx="236" cy="75" rx="18" ry="80" fill="url(#pl-shine)"/></g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#dcbfb1"/>
<g font-family="${FONT}">
  <text x="26" y="33" font-size="8.5" font-weight="600" letter-spacing="3" fill="#a77f72">${esc(fit(`PERLE · ${r.owner.toUpperCase()}`, 230, 8.5, 0.95))}</text>
  <text x="25" y="${size > 20 ? 64 : 62}" font-family="${SERIF}" font-size="${size}" fill="#4f2f2c">${esc(fit(r.name, 236, size, 0.58))}</text>
  <text font-family="${SERIF}" font-style="italic" font-size="12" fill="#7d5a52">${lines(wrap(r.description, 33), 26, 86, 15)}</text>
  <text x="26" y="132" font-size="10.5" font-weight="600" letter-spacing="1.4" fill="#5e3d38">★ ${esc(r.stars)}<tspan dx="12">⑂ ${esc(r.forks)}</tspan><tspan dx="12" fill="${r.lang.color}">●</tspan> ${esc(fit(r.lang.name, 90, 10.5, 0.66))}</text>
</g>`,
  );
};
