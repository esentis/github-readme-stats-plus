import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Northern lights curtains over a dark mountain ridge under the stars.";

const rnd = (i) => Math.abs(Math.sin(i * 57.3) * 1e4) % 1;

// A curtain of thin vertical rays: bright along a wavy lower edge, fading upward.
const curtain = (base, amp, phase, seed) =>
  Array.from({ length: 105 }, (_, i) => {
    const x = i * 4 - 10;
    const y = base + amp * Math.sin(x / 55 + phase);
    const h = 28 + rnd(seed + i) * 46;
    return `<rect x="${x}" y="${(y - h).toFixed(1)}" width="3" height="${h.toFixed(1)}" opacity="${(0.35 + rnd(seed + i + 500) * 0.65).toFixed(2)}"/>`;
  }).join("");

const STARS = Array.from({ length: 34 }, (_, i) => `<circle cx="${(rnd(i) * 400).toFixed(1)}" cy="${(rnd(i + 70) * 100).toFixed(1)}" r="${(0.4 + rnd(i + 9) * 0.7).toFixed(2)}"/>`).join("");

// Borealis: green and violet light curtains swaying over a mountain silhouette.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="#030712"/><stop offset=".7" stop-color="#0b1a2e"/><stop offset="1" stop-color="#0f2f3a"/></linearGradient>
  <linearGradient id="green" x2="0" y2="1"><stop offset="0" stop-color="#4ade80" stop-opacity="0"/><stop offset=".75" stop-color="#4ade80" stop-opacity=".6"/><stop offset="1" stop-color="#d9fbe5" stop-opacity="1"/></linearGradient>
  <linearGradient id="violet" x2="0" y2="1"><stop offset="0" stop-color="#a855f7" stop-opacity="0"/><stop offset="1" stop-color="#c084fc" stop-opacity=".75"/></linearGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="1.2"/></filter>
  <filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000" flood-opacity=".9"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <g fill="#fff" opacity=".8">${STARS}</g>
  <g filter="url(#soft)">
    <g fill="url(#violet)">${curtain(70, 14, 2, 300)}<animateTransform attributeName="transform" type="translate" values="0 0;-14 2;0 0" dur="13s" repeatCount="indefinite"/></g>
    <g fill="url(#green)">${curtain(96, 12, 0, 0)}<animateTransform attributeName="transform" type="translate" values="0 0;12 -3;0 0" dur="10s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.7;1" dur="6s" repeatCount="indefinite"/></g>
  </g>
  <path d="M0 150V116L34 104L62 112L104 96L140 110L176 102L214 114L250 98L290 108L326 94L362 108L400 100V150Z" fill="#14202e"/>
  <path d="M0 150V126L40 116L80 124L122 110L170 126L214 116L262 128L304 112L350 124L400 116V150Z" fill="#070b12"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}" filter="url(#shadow)">
  <text x="24" y="40" font-size="21" font-weight="700" fill="#fff">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13" fill="#d1fae5">${lines(wrap(r.description, 50), 24, 62, 17)}</text>
  ${row(stats(r, { cy: 134, text: 'fill="#e2e8f0"', icon: 'fill="#86efac"' }), 24, 18)}
</g>`,
  );
