import { FONT, MONO, esc, fit, svg } from "../card.js";

// A dark payment card: the star count is the card number, the owner is the card holder.
export default (r) => {
  const number = r.starCount < 10000 ? String(r.starCount).padStart(4, "0") : r.stars;
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2f3a"/><stop offset="1" stop-color="#0d1017"/></linearGradient>
  <linearGradient id="chip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d58a"/><stop offset="1" stop-color="#b98d2c"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#bg)"/>
  <circle cx="360" cy="-10" r="120" fill="${r.lang.color}" fill-opacity=".22"/>
  <circle cx="300" cy="170" r="90" fill="${r.lang.color}" fill-opacity=".12"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".12"/>
<g font-family="${FONT}" fill="#fff">
  <text x="24" y="34" font-size="15" font-weight="700" letter-spacing=".5">${esc(fit(r.name, 260, 15))}</text>
  <text x="376" y="34" font-size="11" font-weight="700" text-anchor="end" fill-opacity=".7" letter-spacing="1.5">${esc(fit(r.lang.name.toUpperCase(), 90, 11, 0.75))}</text>
  <rect x="24" y="48" width="38" height="28" rx="5" fill="url(#chip)"/>
  <path d="M24 58H62M24 66H62M37 48V76M49 48V76" stroke="#8a6a1f" stroke-width=".8" fill="none"/>
  <path d="M74 54a10 10 0 010 16M80 50a16 16 0 010 24M86 46a22 22 0 010 32" stroke="#fff" stroke-opacity=".7" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <text x="24" y="104" font-family="${MONO}" font-size="19" letter-spacing="2">•••• •••• •••• ${esc(number)}</text>
  <text x="24" y="122" font-size="8" fill-opacity=".6" letter-spacing="1">CARD HOLDER</text>
  <text x="24" y="137" font-size="12" font-weight="600" letter-spacing="1">${esc(fit(r.owner.toUpperCase(), 160, 12, 0.7))}</text>
  <text x="200" y="122" font-size="8" fill-opacity=".6" letter-spacing="1">FORKS</text>
  <text x="200" y="137" font-size="12" font-weight="600">${esc(r.forks)}</text>
  <circle cx="358" cy="124" r="15" fill="${r.lang.color}"/>
  <circle cx="358" cy="124" r="15" fill="none" stroke="#fff" stroke-opacity=".5"/>
  <text x="358" y="129" font-size="14" text-anchor="middle">★</text>
</g>`,
  );
};
