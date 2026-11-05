import { esc, fit, svg } from "../card.js";

export const about = "Railway station sign: a platform roundel with the star count, the name and a direction arrow.";

const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// A white platform sign bolted to a dark blue backing, with a secondary strip underneath.
export default (r) =>
  svg(
    r.name,
    `<rect width="400" height="150" rx="8" fill="#0f2c56"/>
<rect x="10" y="10" width="380" height="94" rx="5" fill="#fff"/>
<g fill="#9aa7b8"><circle cx="18" cy="18" r="2"/><circle cx="382" cy="18" r="2"/><circle cx="18" cy="96" r="2"/><circle cx="382" cy="96" r="2"/></g>
<circle cx="58" cy="57" r="30" fill="#fff" stroke="${r.lang.color}" stroke-width="9"/>
<circle cx="58" cy="57" r="34.5" fill="none" stroke="#0f2c56" stroke-opacity=".25"/>
<path d="M334 57h32M352 43l14 14l-14 14" fill="none" stroke="#0f2c56" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<g font-family="${HELVETICA}" fill="#0f2c56">
  <text x="58" y="47" font-size="10" text-anchor="middle">★</text>
  <text x="58" y="67" font-size="${r.stars.length > 3 ? 15 : 19}" font-weight="700" text-anchor="middle">${esc(r.stars)}</text>
  <text x="106" y="58" font-size="22" font-weight="700" letter-spacing="-.3">${esc(fit(r.name, 216, 22, 0.58))}</text>
  <text x="106" y="80" font-size="11.5" fill="#5b6b80">${esc(fit(r.description, 216, 11.5, 0.52))}</text>
</g>
<rect x="10" y="114" width="12" height="26" fill="${r.lang.color}"/>
<g font-family="${HELVETICA}" font-size="12.5" font-weight="700" fill="#fff">
  <text x="32" y="132">${esc(fit(r.lang.name, 130, 12.5))}</text>
  <text x="200" y="132" fill="#ffd200">⑂ ${esc(r.forks)}</text>
  <text x="388" y="132" font-weight="400" fill="#b9c6da" text-anchor="end">${esc(fit(r.owner, 120, 12.5, 0.55))}</text>
</g>`,
  );
