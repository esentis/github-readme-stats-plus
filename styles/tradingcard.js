import { esc, fit, isLight, motion, svg } from "../card.js";

export const about = "Vintage baseball trading card: cream border, name on a ribbon banner, stat box with the language as the position. Shows no description.";

const SLAB = "Rockwell, 'Roboto Slab', 'Courier New', Georgia, serif";

// A vintage trading card: halftone "photo" panel, ribbon banner with the name, stats box on the right.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#1d1a14" : "#fff";
  const stat = (y, label, value) =>
    `<text x="270" y="${y}" font-size="9" fill="#7a5c2e" letter-spacing="1">${label}</text><text x="378" y="${y}" font-size="14" font-weight="700" fill="#2a2015" text-anchor="end">${esc(value)}</text><path d="M270 ${y + 6}H378" stroke="#c8b48a"/>`;
  return svg(
    r.name,
    `${motion(".tc-foil{animation:tc-foil 8s ease-in-out infinite}@keyframes tc-foil{0%,65%{transform:none}95%,100%{transform:translateX(300px)}}")}
<defs>
  <clipPath id="panel"><rect x="14" y="14" width="236" height="122" rx="4"/></clipPath>
  <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3" cy="3" r="1.3" fill="#fff" fill-opacity=".22"/></pattern>
  <radialGradient id="glow" cx=".35" cy=".35"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="400" height="150" rx="10" fill="#efe2bf"/>
<rect x="5" y="5" width="390" height="140" rx="7" fill="none" stroke="#b5964f" stroke-dasharray="1 2"/>
<rect x="14" y="14" width="236" height="122" rx="4" fill="${r.lang.color}"/>
<rect x="14" y="14" width="236" height="122" rx="4" fill="url(#dots)"/><rect x="14" y="14" width="236" height="122" rx="4" fill="url(#glow)"/>
<text x="132" y="98" font-family="${SLAB}" font-size="96" font-weight="700" fill="${ink}" fill-opacity=".2" text-anchor="middle">${esc(r.name[0].toUpperCase())}</text>
<g clip-path="url(#panel)"><path class="tc-foil" d="M-16 14h26l-30 122h-26z" fill="#fff" fill-opacity=".28"/></g>
<g font-family="${SLAB}" font-weight="700">
  <rect x="24" y="22" width="56" height="16" rx="8" fill="#2a2015"/><text x="52" y="34" font-size="9" fill="#efe2bf" text-anchor="middle" letter-spacing="1">ROOKIE</text>
  <path d="M6 104H258L248 117L258 130H6L16 117Z" fill="#b23a2e"/><path d="M6 130L16 136V130Z" fill="#6e2018"/>
  <text x="132" y="122" font-size="14" fill="#fff" text-anchor="middle" letter-spacing=".5">${esc(fit(r.name.toUpperCase(), 216, 14, 0.66))}</text>
  <rect x="262" y="14" width="124" height="22" rx="3" fill="#2a2015"/>
  <text x="324" y="29" font-size="10" fill="#efe2bf" text-anchor="middle" letter-spacing="2">CAREER STATS</text>
  ${stat(54, "STARS", `★ ${r.stars}`)}
  ${stat(78, "FORKS", `⑂ ${r.forks}`)}
  <text x="270" y="100" font-size="9" fill="#7a5c2e" letter-spacing="1">POSITION</text>
  <circle cx="275" cy="113" r="4" fill="${r.lang.color}" stroke="#2a2015" stroke-width=".6"/>
  <text x="284" y="117" font-size="12" fill="#2a2015">${esc(fit(r.lang.name, 96, 12, 0.66))}</text>
  <text x="324" y="133" font-size="8.5" fill="#7a5c2e" text-anchor="middle">${esc(fit("@" + r.owner, 116, 8.5, 0.62))}</text>
</g>`,
  );
};
