import { esc, fit, isLight, motion, svg } from "../card.js";

export const about = "Screen-printed gig poster: LIVE tag, the repo as headliner in bold condensed type with an off-register print, stars and forks on the date line and the language as the venue, under a turning halftone sun. Shows no description.";

const CONDENSED = "Impact, Haettenschweiler, 'Arial Narrow Bold', 'Oswald', 'Franklin Gothic Bold', sans-serif";

// Two-ink poster on cream stock: ink type, language-coloured sun with slowly turning rays on the right.
export default (r) => {
  const c = r.lang.color;
  const name = r.name.toUpperCase();
  const size = name.length <= 9 ? 46 : name.length <= 14 ? 36 : 28;
  const head = esc(fit(name, 252, size, 0.52));
  const rays = Array.from({ length: 16 }, (_, i) => `<path d="M0 0L${(170 * Math.cos(((i * 22.5 - 5) * Math.PI) / 180)).toFixed(1)} ${(170 * Math.sin(((i * 22.5 - 5) * Math.PI) / 180)).toFixed(1)}L${(170 * Math.cos(((i * 22.5 + 5) * Math.PI) / 180)).toFixed(1)} ${(170 * Math.sin(((i * 22.5 + 5) * Math.PI) / 180)).toFixed(1)}Z"/>`).join("");
  return svg(
    r.name,
    `<defs>
  <pattern id="gp-dots" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="2.5" cy="2.5" r="1.3" fill="#1d1a17" fill-opacity=".35"/></pattern>
  <linearGradient id="gp-shade" x1="0" y1="0" x2="1" y2="1"><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
  <mask id="gp-half"><circle cx="336" cy="70" r="44" fill="url(#gp-shade)"/></mask>
  <clipPath id="gp-right"><rect x="280" y="8" width="112" height="134"/></clipPath>
</defs>
${motion(`.gp-rays{animation:gp-rays 8s linear infinite}@keyframes gp-rays{to{transform:rotate(45deg)}}`)}
<rect width="400" height="150" rx="6" fill="#f1e7d2"/>
<g clip-path="url(#gp-right)"><g transform="translate(336 70)"><g class="gp-rays" fill="${c}" fill-opacity=".28">${rays}</g></g></g>
<circle cx="336" cy="70" r="44" fill="${c}"/>
<rect x="290" y="24" width="92" height="92" fill="url(#gp-dots)" mask="url(#gp-half)"/>
<circle cx="336" cy="70" r="44" fill="none" stroke="#1d1a17" stroke-width="2"/>
<rect x="7" y="7" width="386" height="136" rx="3" fill="none" stroke="#1d1a17" stroke-width="2"/>
<path d="M280 8V142" stroke="#1d1a17" stroke-width="2"/>
<g font-family="${CONDENSED}" fill="#1d1a17">
  <rect x="20" y="16" width="44" height="19" fill="${c}"/>
  <text x="42" y="31" font-size="15" letter-spacing="1.5" text-anchor="middle" fill="${isLight(c) ? "#1d1a17" : "#f1e7d2"}">LIVE</text>
  <text x="72" y="30.5" font-size="11" letter-spacing="2.5">ONE NIGHT ONLY</text>
  <text x="23.5" y="86" font-size="${size}" fill="${c}">${head}</text>
  <text x="21" y="84" font-size="${size}">${head}</text>
  <text x="21" y="104" font-size="11" letter-spacing="1.5">W/ SPECIAL GUEST ${esc(fit(r.owner.toUpperCase(), 118, 11, 0.6))}</text>
  <text x="21" y="122" font-size="15" letter-spacing="1">★ ${esc(r.stars)} STARS · ⑂ ${esc(r.forks)} FORKS</text>
  <text x="21" y="136" font-size="9.5" letter-spacing="2.5" fill="#5a524a">AT THE ${esc(fit(r.lang.name.toUpperCase(), 85, 9.5, 0.76))} HALL · DOORS 8PM</text>
  <text x="336" y="133" font-size="10" letter-spacing="3" text-anchor="middle">TOUR</text>
</g>`,
  );
};
