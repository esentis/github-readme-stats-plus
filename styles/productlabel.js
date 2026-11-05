import { FONT, MONO, barcode, esc, fit, isLight, lines, motion, svg, wrap } from "../card.js";

export const about = "Retail product sticker on kraft card: big name, small-print description, barcode and a ★ price tag.";

// A white price sticker; the barcode and its digits come from the repo name.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#111" : "#fff";
  const digits = [...r.name.padEnd(12, r.owner + "0000000000")].slice(0, 12).map((c) => c.charCodeAt(0) % 10).join("");
  const price = r.stars.length > 3 ? 24 : 30;
  return svg(
    r.name,
    `${motion(".pl-shine { animation: pl-shine 7s ease-in-out infinite } @keyframes pl-shine { 0%, 70% { transform: none } 90%, 100% { transform: translateX(150px) } }")}
<defs><filter id="lift" x="-5%" y="-5%" width="110%" height="120%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".3"/></filter><clipPath id="tag"><rect x="270" y="44" width="106" height="62" rx="4"/></clipPath></defs>
<rect width="400" height="150" rx="10" fill="#c9a578"/>
<path d="M0 30H400M0 60H400M0 90H400M0 120H400" stroke="#b8925f" stroke-opacity=".5"/>
<rect x="10" y="10" width="380" height="130" rx="9" fill="#fff" filter="url(#lift)"/>
<path d="M10 34V19a9 9 0 0 1 9-9H381a9 9 0 0 1 9 9V34Z" fill="${r.lang.color}"/>
<g font-family="${FONT}">
  <text x="24" y="27" font-size="10" font-weight="700" fill="${ink}" letter-spacing="2">${esc(fit(r.lang.name.toUpperCase(), 200, 10, 0.75))}</text>
  <text x="376" y="27" font-size="10" font-weight="700" fill="${ink}" text-anchor="end" letter-spacing="1">⑂ ${esc(r.forks)} FORKS</text>
  <text x="24" y="60" font-size="21" font-weight="800" fill="#111">${esc(fit(r.name, 236, 21))}</text>
  <text font-size="10" fill="#555">${lines(wrap(r.description, 42), 24, 76, 12)}</text>
  <g fill="#111">${barcode(r.name, 24, 98, 120, 26)}</g>
  <text x="24" y="134" font-family="${MONO}" font-size="8" fill="#111" letter-spacing="1.6">${digits[0]} ${digits.slice(1, 6)} ${digits.slice(6, 11)} ${digits[11]}</text>
  <rect x="270" y="44" width="106" height="62" rx="4" fill="#ffd400"/>
  <text x="323" y="58" font-size="8" font-weight="700" fill="#111" text-anchor="middle" letter-spacing="2">STARS</text>
  <text x="323" y="${82 + price * 0.3}" font-size="${price}" font-weight="900" fill="#111" text-anchor="middle">★${esc(r.stars)}</text>
  <g clip-path="url(#tag)"><path class="pl-shine" d="M250 44H266L246 106H230Z" fill="#fff" fill-opacity=".55"/></g>
  <text x="376" y="132" font-size="8" fill="#888" text-anchor="end">${esc(fit(`by ${r.owner} · open source`, 200, 8))}</text>
</g>`,
  );
};
