// Planetary rover downlink: a rust-coloured camera view with the rover on the dunes, sol counter, and a telemetry panel.
import { MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Planetary rover telemetry: a rust-coloured camera view with the rover, a sol counter from the star count, and a data panel.";

const R = "#e07a4a";

export default (r) => {
  const kv = (y, k, v) => `<text x="216" y="${y}" fill="#a8705a">${k}</text><text x="384" y="${y}" fill="#ffd2b8" text-anchor="end">${v}</text>`;
  const sol = String(r.starCount).padStart(4, "0");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="rv-sky" x2="0" y2="1"><stop offset="0" stop-color="#d9946a"/><stop offset="1" stop-color="#f0c39b"/></linearGradient>
  <clipPath id="rv-view"><rect x="12" y="12" width="190" height="126" rx="4"/></clipPath>
</defs>
${motion(`.rv-rec{animation:rv-rec 2s steps(1) infinite}.rv-head{transform-box:view-box;transform-origin:148px 70px;animation:rv-pan 6s ease-in-out infinite}
@keyframes rv-rec{50%{opacity:.15}}@keyframes rv-pan{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}`)}
<rect width="400" height="150" rx="12" fill="#140d0a"/>
<g clip-path="url(#rv-view)">
  <rect x="12" y="12" width="190" height="126" fill="url(#rv-sky)"/>
  <path d="M12 80L40 68L66 76L98 60L130 72L160 64L202 78V138H12Z" fill="#b5653c"/>
  <path d="M12 98Q60 84 110 96T202 92V138H12Z" fill="#9a4f2b"/>
  <path d="M12 118Q80 108 140 116T202 114V138H12Z" fill="#7a3a1e"/>
  <g fill="#5e2b16"><ellipse cx="40" cy="126" rx="7" ry="3"/><ellipse cx="182" cy="128" rx="5" ry="2.4"/><ellipse cx="70" cy="132" rx="3" ry="1.5"/></g>
  <ellipse cx="128" cy="125" rx="36" ry="3.5" fill="#000" fill-opacity=".25"/>
  <g fill="#24150f" stroke="#24150f">
    <path d="M102 118L115 106L128 118M115 106H141L154 118" fill="none" stroke-width="2.5"/>
    <rect x="104" y="94" width="52" height="12" rx="2" stroke="none"/>
    <rect x="98" y="90" width="64" height="4" fill="${r.lang.color}" stroke="none"/>
    <path d="M148 90V70M112 90V78" stroke-width="2"/><ellipse cx="112" cy="77" rx="5" ry="1.6" stroke="none"/>
    <g class="rv-head"><rect x="141" y="62" width="15" height="8" rx="1.5" stroke="none"/><circle cx="153" cy="66" r="1.6" fill="#7dd3fc" stroke="none"/></g>
    ${[102, 128, 154].map((x) => `<circle cx="${x}" cy="118" r="7" stroke="none"/><circle cx="${x}" cy="118" r="2.2" fill="#6b4532" stroke="none"/>`).join("")}
  </g>
  <rect x="16" y="16" width="70" height="17" rx="2" fill="#000" fill-opacity=".45"/>
</g>
<path d="M18 22V18H22M196 22V18H192M18 128V132H22M196 128V132H192" fill="none" stroke="#fff" stroke-opacity=".6"/>
<rect x="12.5" y="12.5" width="189" height="125" rx="4" fill="none" stroke="${R}" stroke-opacity=".5"/>
<g font-family="${MONO}" font-weight="700">
  <text x="21" y="28.5" font-size="11" fill="#fff">SOL ${esc(sol)}</text>
  <text x="194" y="29" font-size="8" fill="#fff" text-anchor="end">NAVCAM</text>
  <circle class="rv-rec" cx="148" cy="26" r="2.5" fill="#ef4444"/>
</g>
<g font-family="${MONO}">
  <text x="216" y="27" font-size="8.5" fill="#a8705a" letter-spacing="1">ROVER // ${esc(fit(r.owner.toUpperCase(), 110, 8.5, 0.72))}</text>
  <text x="216" y="45" font-size="14" font-weight="700" fill="#ffd2b8">${esc(fit(r.name, 170, 14))}</text>
  <text font-size="9" fill="#c9a08c">${lines(wrap(r.description, 31, 3), 216, 61, 12)}</text>
  <path d="M216 95H384" stroke="${R}" stroke-opacity=".4" stroke-dasharray="2 3"/>
  <g font-size="9.5">${kv(110, "STARS", `★ ${esc(r.stars)}`)}${kv(123, "FORKS", `⑂ ${esc(r.forks)}`)}${kv(136, "LANG", esc(fit(r.lang.name, 110, 9.5)))}</g>
</g>`,
  );
};
