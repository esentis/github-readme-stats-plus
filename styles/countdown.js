// Launch control at night: big amber T-minus digits (one second per star), a go/no-go checklist and a rocket on its pad.
import { MONO, esc, fit, motion, row, svg, textWidth } from "../card.js";

export const about = "Launch countdown: big T-minus digits from the star count, a go checklist and a rocket steaming on its pad.";

const A = "#ffb020";

export default (r) => {
  const s = Math.min(r.starCount, 359999);
  const t = `T-${[s / 3600, (s / 60) % 60, s % 60].map((n) => String(Math.floor(n)).padStart(2, "0")).join(":")}`;
  const check = (label) => [14 + textWidth(label, 9), `<rect y="122" width="9" height="9" rx="2" fill="#16a34a"/><path d="M2 126.5l2 2 3-4" fill="none" stroke="#dcfce7" stroke-width="1.3"/><text x="13" y="130" font-size="9" fill="#cbd5e1">${esc(label)}</text>`];
  const tower = Array.from({ length: 9 }, (_, i) => `M352 ${126 - i * 12}L364 ${114 - i * 12}M364 ${126 - i * 12}L352 ${114 - i * 12}`).join("");
  return svg(
    r.name,
    `<defs>
  <linearGradient id="cd-sky" x2="0" y2="1"><stop offset="0" stop-color="#090c18"/><stop offset="1" stop-color="#1a2136"/></linearGradient>
  <filter id="cd-blur" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="2"/></filter>
</defs>
${motion(`.cd-glow{animation:cd-pulse 2s ease-in-out infinite}.cd-led{animation:cd-led 2s steps(1) infinite}.cd-steam{transform-box:fill-box;transform-origin:center;animation:cd-steam 4s ease-in-out infinite}.cd-steam:nth-child(2){animation-delay:-1.3s}.cd-steam:nth-child(3){animation-delay:-2.6s}
@keyframes cd-pulse{50%{opacity:.15}}@keyframes cd-led{50%{opacity:.15}}@keyframes cd-steam{0%,100%{transform:scale(.85);opacity:.55}50%{transform:scale(1.1);opacity:.85}}`)}
<rect width="400" height="150" rx="12" fill="url(#cd-sky)"/>
<path d="M0 140H400V138Q400 150 388 150H12Q0 150 0 138Z" fill="#0b0e17"/>
<path d="M0 140H400" stroke="#2a3248"/>
<rect x="306" y="126" width="72" height="8" fill="#283046"/><path d="M314 134V140M370 134V140" stroke="#283046" stroke-width="4"/>
<path d="M352 18H364V126H352Z${tower}" fill="none" stroke="#56607a" stroke-width="1.2"/>
<path d="M352 48H343M352 82H343" stroke="#56607a" stroke-width="2"/>
<circle class="cd-led" cx="358" cy="14" r="2.5" fill="#ef4444"/>
<g fill="#cbd5e1"><circle class="cd-steam" cx="318" cy="122" r="7"/><circle class="cd-steam" cx="342" cy="123" r="6"/><circle class="cd-steam" cx="330" cy="126" r="8"/></g>
<path d="M330 22C337 30 339 40 339 52V114H321V52C321 40 323 30 330 22Z" fill="#e5e7eb"/>
<rect x="321" y="62" width="18" height="10" fill="${r.lang.color}"/>
<path d="M321 98L313 118H321ZM339 98L347 118H339Z" fill="#9ca3af"/>
<path d="M324 114H336V120H324Z" fill="#4b5563"/>
<g font-family="${MONO}">
  <text x="20" y="27" font-size="9" fill="#8b93a7" letter-spacing="1.5">LAUNCH CONTROL · ${esc(fit(r.owner.toUpperCase(), 140, 9))}</text>
  <text x="20" y="48" font-size="16" font-weight="700" fill="#f3f4f6">${esc(fit(r.name, 262, 16))}</text>
  <text x="20" y="63" font-size="9.5" fill="#9aa3b8">${esc(fit(r.description, 262, 9.5))}</text>
  <text class="cd-glow" x="20" y="104" font-size="30" fill-opacity=".7" font-weight="700" fill="${A}" filter="url(#cd-blur)">${t}</text>
  <text x="20" y="104" font-size="30" font-weight="700" fill="${A}">${t}</text>
  <text x="${28 + textWidth(t, 30, 0.62)}" y="86" font-size="8" fill="#8b93a7" letter-spacing="1">★ ${esc(r.stars)}</text>
  <text x="${28 + textWidth(t, 30, 0.62)}" y="97" font-size="8" fill="#8b93a7" letter-spacing="1">1 SEC/STAR</text>
  ${row([check(`LANG ${fit(r.lang.name.toUpperCase(), 72, 9)}`), check(`FORKS ${r.forks}`), check("GO")], 20, 10)}
</g>`,
  );
};
