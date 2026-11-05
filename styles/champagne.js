import { FONT, esc, fit, lines, motion, rng, svg, wrap } from "../card.js";

export const about = "Champagne: a crystal flute on a dark backdrop with bubbles rising in streams and a sparkling rim; the star count is the vintage.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
const BOWL = "M313 16C312 58 317 88 327.5 96H332.5C343 88 348 58 347 16Z";
const spark = (x, y, s, d) => `<path class="cp-spark" style="transform-origin:${x}px ${y}px;animation-delay:${d}s" d="M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z" fill="#fff8e1"/>`;

// A flute of champagne on the right, bokeh behind; vintage (stars) and forks in the bottom left.
export default (r) => {
  const rand = rng(r.name);
  const bokeh = Array.from({ length: 8 }, (_, i) => `<circle cx="${(200 + rand() * 200).toFixed(0)}" cy="${(rand() * 150).toFixed(0)}" r="${(6 + rand() * 14).toFixed(1)}" fill="${i % 3 ? "#e8b964" : r.lang.color}" fill-opacity="${(0.08 + rand() * 0.12).toFixed(2)}"/>`).join("");
  // Two streams of bubbles: animated ones rise from the bottom of the bowl; the "still" set is the static picture.
  const bub = (still) => Array.from({ length: 12 }, (_, i) => {
    const x = (i % 2 ? 331.5 : 328) + (rand() - 0.5) * 1.4, k = (i >> 1) / 6, rad = (0.7 + k * 0.8).toFixed(2);
    return still ? `<circle cx="${x.toFixed(1)}" cy="${(90 - k * 54).toFixed(1)}" r="${rad}"/>` : `<circle class="cp-bub" cx="${x.toFixed(1)}" cy="90" r="${rad}" style="animation-delay:${(-(k + (i % 2) * 0.08) * 3).toFixed(2)}s"/>`;
  }).join("");
  const size = r.name.length > 16 ? 19 : 24;
  return svg(
    r.name,
    `${motion(".cp-still { display: none } .cp-bub { animation: cp-rise 3s linear infinite } @keyframes cp-rise { 0% { transform: translateY(0); opacity: 0 } 12%, 85% { opacity: .95 } 100% { transform: translateY(-54px); opacity: 0 } } .cp-spark { animation: cp-spark 2.6s ease-in-out infinite } @keyframes cp-spark { 0%, 100% { transform: scale(1); opacity: 1 } 50% { transform: scale(.25); opacity: .2 } }")}
<defs>
  <clipPath id="cp-card"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="cp-bowl"><path d="${BOWL}"/></clipPath>
  <radialGradient id="cp-bg" cx=".8" cy=".35" r=".9"><stop offset="0" stop-color="#2d1f10"/><stop offset="1" stop-color="#080604"/></radialGradient>
  <linearGradient id="cp-wine" x2="0" y2="1"><stop offset="0" stop-color="#fbe9b0"/><stop offset=".6" stop-color="#e3b55a"/><stop offset="1" stop-color="#b98428"/></linearGradient>
  <linearGradient id="cp-gold" x2="0" y2="1"><stop offset="0" stop-color="#f7e3a8"/><stop offset="1" stop-color="#c39343"/></linearGradient>
  <filter id="cp-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
<g clip-path="url(#cp-card)">
  <rect width="400" height="150" fill="url(#cp-bg)"/>
  <g filter="url(#cp-blur)">${bokeh}</g>
  <ellipse cx="330" cy="135" rx="40" ry="5" fill="#e8b964" fill-opacity=".14" filter="url(#cp-blur)"/>
</g>
<rect x="6.5" y="6.5" width="387" height="137" rx="9" fill="none" stroke="#c9a45c" stroke-opacity=".35"/>
<g>
  <path d="${BOWL}" fill="#fff" fill-opacity=".05"/>
  <g clip-path="url(#cp-bowl)"><rect x="300" y="34" width="60" height="70" fill="url(#cp-wine)" fill-opacity=".92"/>
    <ellipse cx="330" cy="34" rx="16.4" ry="2" fill="#fff6d6" fill-opacity=".85"/>
    <g fill="#fffbea"><g class="cp-still">${bub(true)}</g>${bub(false)}</g></g>
  <path d="M327.5 96H332.5V133H327.5Z" fill="url(#cp-gold)" fill-opacity=".4"/><path d="M329 96V133" stroke="#fff" stroke-opacity=".55" stroke-width=".8"/>
  <ellipse cx="330" cy="134.5" rx="17" ry="3.2" fill="#fff" fill-opacity=".12" stroke="#fff" stroke-opacity=".5" stroke-width=".9"/>
  <path d="${BOWL}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.1"/>
  <ellipse cx="330" cy="16" rx="17" ry="1.8" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width=".9"/>
  <path d="M316.5 22C316.5 52 320 76 326 88" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M343 28C343 48 341 64 338 74" stroke="#fff" stroke-opacity=".22" stroke-width="1" fill="none" stroke-linecap="round"/>
  ${spark(314, 16, 4.5, 0)}${spark(345.5, 17, 3.2, -1.3)}${spark(331, 34, 2.6, -0.7)}
</g>
<g font-family="${FONT}">
  <circle cx="30" cy="27.5" r="3" fill="${r.lang.color}"/>
  <text x="39" y="31" font-size="8.5" font-weight="600" letter-spacing="3" fill="#c9a45c">${esc(fit(`CUVÉE ${r.lang.name.toUpperCase()}`, 220, 8.5, 0.95))}</text>
  <text x="27" y="${size > 20 ? 59 : 57}" font-family="${SERIF}" font-size="${size}" fill="#f7e9c6">${esc(fit(r.name, 262, size, 0.58))}</text>
  <text font-family="${SERIF}" font-style="italic" font-size="11.5" fill="#b9a988">${lines(wrap(r.description, 38), 28, 79, 14)}</text>
  <g font-size="8" font-weight="600" letter-spacing="2.5" fill="#9c845a"><text x="28" y="114">VINTAGE</text><text x="118" y="114">SHARED</text></g>
  <path d="M106 106V134" stroke="#c9a45c" stroke-opacity=".4"/>
  <g font-family="${SERIF}" font-size="17" fill="url(#cp-gold)"><text x="28" y="134">★ ${esc(r.stars)}</text><text x="118" y="134">⑂ ${esc(r.forks)}</text></g>
</g>`,
  );
};
