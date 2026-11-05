import { FONT, esc, fit, svg } from "../card.js";

export const about = "Minimal presentation slide: lots of whitespace, one bold line and tiny metadata.";

// A clean title slide: soft gradient, a short accent bar, the name as the one bold line and a quiet footer.
export default (r) => {
  const size = Math.round(Math.max(20, Math.min(32, 336 / (r.name.length * 0.58))));
  const meta = [r.lang.name, `★ ${r.stars}`, `⑂ ${r.forks}`].map(esc).join("   ·   ");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="bg" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef0f4"/></linearGradient>
  <radialGradient id="glow" cx="1" cy="1" r=".9"><stop offset="0" stop-color="${r.lang.color}" stop-opacity=".16"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="400" height="150" rx="10" fill="url(#bg)"/>
<rect width="400" height="150" rx="10" fill="url(#glow)"/>
<rect x=".5" y=".5" width="399" height="149" rx="9.5" fill="none" stroke="#000" stroke-opacity=".07"/>
<g font-family="${FONT}">
  <text x="32" y="30" font-size="9" font-weight="600" fill="#9aa1ad" letter-spacing="2">${esc(fit(r.owner.toUpperCase(), 280, 9, 0.8))}</text>
  <rect x="32" y="${74 - size}" width="22" height="3" rx="1.5" fill="${r.lang.color}"/>
  <text x="31" y="${80 + size * 0.1}" font-size="${size}" font-weight="700" fill="#111318" letter-spacing="-.6">${esc(fit(r.name, 336, size, 0.58))}</text>
  <text x="32" y="${100 + size * 0.1}" font-size="11.5" fill="#6b7280">${esc(fit(r.description, 336, 11.5, 0.52))}</text>
  <text x="32" y="130" font-size="9" fill="#9aa1ad" letter-spacing="1">${meta}</text>
  <text x="368" y="130" font-size="9" fill="#c2c7d0" text-anchor="end">01</text>
</g>`,
  );
};
