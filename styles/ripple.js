// Ripple: concentric rings spreading from a drop on a calm, language-tinted water surface, with glinting reflections.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Calm water tinted by the language colour; rings ripple out from a drop point while soft reflections glint.";

// Water in the language colour under a dark wash; five rings at staggered points of one 10s expansion.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const [X, Y] = [(310 + rnd() * 10).toFixed(1), (74 + rnd() * 8).toFixed(1)];
  // Static fallback: each ring sits where its staggered animation would be, smaller rings brighter.
  const rings = [0.2, 0.4, 0.6, 0.8, 1].map((s, i) => {
    const m = `matrix(${s} 0 0 ${s} ${(X * (1 - s)).toFixed(1)} ${(Y * (1 - s)).toFixed(1)})`;
    return `<g class="rp-r" transform="${m}" opacity="${(1.1 - s * 0.85).toFixed(2)}" style="animation-delay:${-s * 10}s"><ellipse cx="${X}" cy="${Y}" rx="88" ry="31" stroke="#fff" stroke-opacity=".9" stroke-width="2"/><ellipse cx="${X}" cy="${Y}" rx="83" ry="28.5" stroke="#000" stroke-opacity=".45" stroke-width="3"/><ellipse cx="${X}" cy="${Y}" rx="92" ry="33" stroke="${c}" stroke-width="1.6"/></g>`;
  });
  const glints = Array.from({ length: 12 }, (_, i) => {
    const [x, y, w] = [228 + rnd() * 160, 14 + rnd() * 124, 5 + rnd() * 14];
    return `<rect class="rp-s" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="1" rx=".5" style="animation-delay:${(-rnd() * 6).toFixed(1)}s"/>`;
  }).join("");
  return svg(
    r.name,
    `${motion(`.rp-r { transform-origin: ${X}px ${Y}px; animation: rp-r 10s cubic-bezier(.25,.5,.45,1) infinite } .rp-s { animation: rp-s 6s ease-in-out infinite } .rp-d { transform-origin: ${X}px ${Y}px; animation: rp-d 2s ease-out infinite }
@keyframes rp-r { 0% { transform: scale(.04); opacity: 0 } 8% { opacity: 1 } 60% { opacity: .5 } 100% { transform: scale(1); opacity: 0 } }
@keyframes rp-s { 50% { opacity: .15 } }
@keyframes rp-d { 0% { transform: scale(.3); opacity: 1 } 100% { transform: scale(1.6); opacity: 0 } }`)}
<defs>
  <clipPath id="rp-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <linearGradient id="rp-wash" x2="0" y2="1"><stop offset="0" stop-color="#03060c" stop-opacity=".66"/><stop offset="1" stop-color="#03060c" stop-opacity=".88"/></linearGradient>
  <radialGradient id="rp-sheen" cx="${X}" cy="${Y}" r="120" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 ${Y}) scale(1 .5) translate(0 ${-Y})"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="rp-calm" x2="1"><stop offset=".45" stop-color="#03060c" stop-opacity=".55"/><stop offset=".62" stop-color="#03060c" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#rp-clip)">
  <rect width="400" height="150" fill="${c}"/>
  <rect width="400" height="150" fill="url(#rp-wash)"/>
  <rect width="400" height="150" fill="url(#rp-sheen)"/>
  <g fill="#fff" opacity=".4">${glints}</g>
  <g fill="none">${rings.join("")}</g>
  <circle cx="${X}" cy="${Y}" r="1.8" fill="#fff"/>
  <ellipse class="rp-d" cx="${X}" cy="${Y}" rx="7" ry="2.6" fill="none" stroke="#fff" stroke-opacity=".8"/>
  <rect width="400" height="150" fill="url(#rp-calm)"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="11" font-weight="600" letter-spacing="1" fill="#fff" fill-opacity=".6">${esc(fit(r.owner, 190, 11, 0.65))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#fff">${esc(fit(r.name, 196, 20))}</text>
  <text font-size="12.5" fill="#fff" fill-opacity=".72">${lines(wrap(r.description, 28), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#fff"', icon: 'fill="#fff" fill-opacity=".7"' }), 24, 16)}
</g>`,
  );
};
