// View from a spacecraft cockpit: windshield frame, green HUD with heading tape, artificial horizon and star/fork readouts.
import { FONT, MONO, esc, fit, motion, svg, textWidth } from "../card.js";

export const about = "Cockpit HUD: windshield frame, artificial horizon, heading tape and readouts for stars and forks over a planet.";

const H = "#7cffb2";

export default (r) => {
  const lang = fit(r.lang.name, 92, 11);
  const hdg = [...r.name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  // Heading tape: a tick every 10px is 5°, a label every 30°.
  const base = hdg - (hdg % 5) - 60;
  const tape = Array.from({ length: 25 }, (_, i) => {
    const deg = (base + i * 5 + 360) % 360, x = 200 - ((hdg % 5) / 5) * 10 - 120 + i * 10;
    return `<path d="M${x} 28V${deg % 30 ? 25 : 22}"/>${deg % 30 ? "" : `<text x="${x}" y="19" stroke="none">${String(deg / 10).padStart(2, "0")}</text>`}`;
  }).join("");
  const box = (x, k, v) => `<text x="${x + 31}" y="47" text-anchor="middle" font-size="7.5" letter-spacing="1.5">${k}</text><rect x="${x}" y="51" width="62" height="20" fill="#000" fill-opacity=".35" stroke="${H}"/><text x="${x + 31}" y="65.5" text-anchor="middle" font-size="12" font-weight="700">${v}</text>`;
  return svg(
    r.name,
    `<defs>
  <linearGradient id="ck-sky" x2="0" y2="1"><stop offset="0" stop-color="#03050f"/><stop offset="1" stop-color="#0f1a33"/></linearGradient>
  <linearGradient id="ck-dash" x2="0" y2="1"><stop offset="0" stop-color="#23272f"/><stop offset="1" stop-color="#0d0f13"/></linearGradient>
  <clipPath id="ck-tape"><rect x="136" y="10" width="128" height="22"/></clipPath>
</defs>
${motion(`.ck-roll{transform-box:view-box;transform-origin:200px 64px;animation:ck-roll 7s ease-in-out infinite}.ck-tape{animation:ck-tape 9s ease-in-out infinite}
@keyframes ck-roll{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(3deg)}}@keyframes ck-tape{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}`)}
<rect width="400" height="150" rx="12" fill="url(#ck-sky)"/>
<g fill="#fff" fill-opacity=".6"><circle cx="70" cy="30" r=".8"/><circle cx="120" cy="80" r=".6"/><circle cx="290" cy="22" r=".7"/><circle cx="340" cy="86" r=".8"/><circle cx="230" cy="44" r=".5"/></g>
<circle cx="200" cy="330" r="240" fill="${r.lang.color}" fill-opacity=".25"/><circle cx="200" cy="330" r="240" fill="none" stroke="${r.lang.color}" stroke-opacity=".7"/>
<g stroke="${H}" fill="${H}" font-family="${MONO}" font-size="8" text-anchor="middle">
  <g clip-path="url(#ck-tape)"><g class="ck-tape" stroke-width="1">${tape}</g></g>
  <path d="M196 36L200 31L204 36Z" stroke="none"/>
  <g class="ck-roll" fill="none" stroke-width="1.2"><path d="M110 64H180M220 64H290"/><path d="M160 46H185M215 46H240M160 82H185M215 82H240" stroke-dasharray="4 3" stroke-opacity=".7"/></g>
  <g fill="none" stroke-width="1.4"><circle cx="200" cy="64" r="4"/><path d="M186 64H196M204 64H214M200 60V55"/></g>
  <g stroke="none">${box(34, "STARS", `★ ${esc(r.stars)}`)}${box(304, "FORKS", `⑂ ${esc(r.forks)}`)}</g>
</g>
<path fill-rule="evenodd" d="M0 12Q0 0 12 0H388Q400 0 400 12V150H0ZM24 8H376L394 104H6Z" fill="#0b0d12"/>
<path d="M24 8H376L394 104H6Z" fill="none" stroke="#3a404c" stroke-width="1.5"/>
<path d="M0 112Q200 96 400 112V138Q400 150 388 150H12Q0 150 0 138Z" fill="url(#ck-dash)" stroke="#3a404c"/>
<g font-family="${FONT}">
  <text x="22" y="128" font-size="15" font-weight="700" fill="#f1f5f9">${esc(fit(r.name, 236, 15, 0.62))}</text>
  <text x="22" y="143" font-size="9.5" fill="#8b93a7">${esc(fit(`${r.owner} · ${r.description}`, 236, 9.5))}</text>
  <circle cx="${364 - textWidth(lang, 11, 0.62)}" cy="129" r="4" fill="${r.lang.color}"/>
  <text x="376" y="133" font-size="11" fill="#e2e8f0" text-anchor="end">${esc(lang)}</text>
  <text x="376" y="145" font-family="${MONO}" font-size="7.5" fill="${H}" fill-opacity=".7" text-anchor="end" letter-spacing="1">HDG ${String(hdg).padStart(3, "0")}</text>
</g>`,
  );
};
