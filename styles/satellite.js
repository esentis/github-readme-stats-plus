// A gold-foil satellite with solar wings drifting above a dark planet limb lit in the language colour, telemetry beside it.
import { FONT, MONO, esc, fit, lines, motion, svg, wrap, rng } from "../card.js";

export const about = "Satellite with solar panels over a curved planet horizon lit in the language colour, with telemetry readouts.";

const wing = (x) => `<rect x="${x}" y="46" width="52" height="18" fill="#1e3a8a" stroke="#93c5fd" stroke-width=".6"/><path d="M${x + 13} 46V64M${x + 26} 46V64M${x + 39} 46V64M${x} 55H${x + 52}" stroke="#60a5fa" stroke-opacity=".55" stroke-width=".6"/>`;

export default (r) => {
  const rnd = rng(r.owner + r.name);
  const sky = Array.from({ length: 26 }, () => `<circle cx="${(rnd() * 400).toFixed(1)}" cy="${(rnd() * 110).toFixed(1)}" r="${(0.3 + rnd() * 0.6).toFixed(2)}"/>`).join("");
  const cell = (x, k, v) => `<text x="${x}" y="112" font-size="7.5" fill="#7dd3fc" fill-opacity=".75" letter-spacing="1">${k}</text><text x="${x}" y="127" font-size="11" font-weight="700" fill="#e2e8f0">${v}</text>`;
  return svg(
    r.name,
    `<defs>
  <clipPath id="st-clip"><rect width="400" height="150" rx="12"/></clipPath>
  <radialGradient id="st-planet" cx=".5" cy=".05" r=".7"><stop offset="0" stop-color="#16233d"/><stop offset="1" stop-color="#05080f"/></radialGradient>
  <linearGradient id="st-foil" x2="1" y2="1"><stop offset="0" stop-color="#f6d365"/><stop offset=".5" stop-color="#b8860b"/><stop offset="1" stop-color="#e9c46a"/></linearGradient>
  <filter id="st-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
</defs>
${motion(`.st-sat{transform-box:fill-box;transform-origin:center;animation:st-drift 8s ease-in-out infinite}.st-led{animation:st-led 2s steps(1) infinite}
@keyframes st-drift{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}@keyframes st-led{50%{opacity:.15}}`)}
<g clip-path="url(#st-clip)">
  <rect width="400" height="150" fill="#02040a"/>
  <g fill="#fff" fill-opacity=".7">${sky}</g>
  <circle cx="330" cy="330" r="232" fill="${r.lang.color}" fill-opacity=".55" filter="url(#st-blur)"/>
  <circle cx="330" cy="330" r="230" fill="url(#st-planet)"/>
  <circle cx="330" cy="330" r="229" fill="none" stroke="${r.lang.color}" stroke-width="1.5"/>
</g>
<g class="st-sat">
  ${wing(236)}${wing(324)}
  <path d="M288 55H294M318 55H324" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="294" y="42" width="24" height="27" rx="2" fill="url(#st-foil)"/>
  <path d="M298 47L304 52L300 60M310 46L314 56L308 64" fill="none" stroke="#7a5a08" stroke-opacity=".5" stroke-width=".7"/>
  <path d="M306 42V35" stroke="#cbd5e1" stroke-width="1.2"/><path d="M297 30Q306 40 315 30Z" fill="#e5e7eb" stroke="#94a3b8" stroke-width=".6"/>
  <path d="M306 69V75" stroke="#cbd5e1"/><circle class="st-led" cx="306" cy="76.5" r="1.8" fill="${r.lang.color}"/>
</g>
<g font-family="${FONT}">
  <text x="20" y="29" font-family="${MONO}" font-size="9" fill="#7dd3fc" letter-spacing="1">TLM · ${esc(fit(r.owner.toUpperCase(), 150, 9))}</text>
  <text x="20" y="51" font-size="18" font-weight="700" fill="#f8fafc">${esc(fit(r.name, 206, 18, 0.62))}</text>
  <text font-size="11" fill="#a5b4c8">${lines(wrap(r.description, 30), 20, 71, 14)}</text>
</g>
<g font-family="${MONO}">${cell(20, "SIGNAL", `★ ${esc(r.stars)}`)}${cell(84, "LINKS", `⑂ ${esc(r.forks)}`)}${cell(144, "BAND", esc(fit(r.lang.name, 72, 11)))}</g>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="#fff" stroke-opacity=".1"/>`,
  );
};
