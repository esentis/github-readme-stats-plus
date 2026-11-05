// Green phosphor radar scope: a sweep turns over range rings and lights up blips, one blip per few stars.
import { MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";
import { seeded } from "./starmap.js";

export const about = "Radar scope in green phosphor: a rotating sweep lights up blips (stars as contacts), readouts beside it.";

const G = "#4ade80";
const D = 4; // seconds per sweep

export default (r) => {
  const rnd = seeded(r.name);
  const count = Math.min(9, 2 + Math.round(Math.log2(r.starCount + 1)));
  // Each blip flashes when the sweep passes its bearing: a negative delay lines its keyframe 0% up with that moment.
  const blips = Array.from({ length: count }, () => {
    const b = rnd() * 360, d = 14 + rnd() * 42, a = (b * Math.PI) / 180;
    const x = (d * Math.sin(a)).toFixed(1), y = (-d * Math.cos(a)).toFixed(1);
    return `<g class="rd-blip" style="animation-delay:${(-(D - (b / 360) * D)).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="4.5" fill="${G}" fill-opacity=".25"/><circle cx="${x}" cy="${y}" r="2" fill="#bbf7d0"/></g>`;
  }).join("");
  const ticks = Array.from({ length: 36 }, (_, i) => `<path d="M0 -60V${i % 9 ? -57 : -53}" transform="rotate(${i * 10})"/>`).join("");
  const cell = (x, k, v, size = 14) => `<text x="${x}" y="112" font-size="8" fill="${G}" fill-opacity=".6" letter-spacing="1">${k}</text><text x="${x}" y="129" font-size="${size}" font-weight="700" fill="#bbf7d0">${v}</text>`;
  return svg(
    r.name,
    `<defs>
  <radialGradient id="rd-scope"><stop offset="0" stop-color="#0a3518"/><stop offset="1" stop-color="#03140a"/></radialGradient>
  <linearGradient id="rd-sweep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="-54" y2="0"><stop offset="0" stop-color="${G}" stop-opacity=".55"/><stop offset="1" stop-color="${G}" stop-opacity="0"/></linearGradient>
  <filter id="rd-glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.5" result="b"/><feComponentTransfer in="b" result="b"><feFuncA type="linear" slope=".6"/></feComponentTransfer><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
${motion(`.rd-sweep{transform-box:fill-box;transform-origin:center;animation:rd-spin ${D}s linear infinite}.rd-blip{animation:rd-fade ${D}s linear infinite}
@keyframes rd-spin{to{transform:rotate(360deg)}}@keyframes rd-fade{0%{opacity:1}70%,100%{opacity:.2}}`)}
<rect width="400" height="150" rx="12" fill="#020a05"/>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="${G}" stroke-opacity=".25"/>
<g transform="translate(78 75)">
  <circle r="66" fill="#0b1a10" stroke="#1d3b26" stroke-width="3"/>
  <circle r="62" fill="url(#rd-scope)"/>
  <g fill="none" stroke="${G}" stroke-opacity=".28"><circle r="20"/><circle r="40"/><circle r="60"/><path d="M-62 0H62M0 -62V62"/></g>
  <g stroke="${G}" stroke-opacity=".6">${ticks}</g>
  <g class="rd-sweep"><circle r="62" fill="none"/><path d="M0 0V-62A62 62 0 0 0 -53.7 -31Z" fill="url(#rd-sweep)"/><path d="M0 0V-62" stroke="#bbf7d0" stroke-width="1.5"/></g>
  ${blips}
  <circle r="2.5" fill="${r.lang.color}" stroke="#bbf7d0" stroke-width=".8"/>
</g>
<g font-family="${MONO}">
  <text x="164" y="28" font-size="9" fill="${G}" fill-opacity=".65" letter-spacing="1">CONTACT · ${esc(fit(r.owner.toUpperCase(), 140, 9, 0.72))}</text>
  <text x="164" y="50" font-size="16" font-weight="700" fill="#bbf7d0" filter="url(#rd-glow)">${esc(fit(r.name, 222, 16))}</text>
  <text font-size="9.5" fill="${G}" fill-opacity=".85">${lines(wrap(r.description, 38), 164, 68, 13)}</text>
  <path d="M164 98H386" stroke="${G}" stroke-opacity=".3" stroke-dasharray="2 3"/>
  ${cell(164, "CONTACTS", `★ ${esc(r.stars)}`)}${cell(246, "FORKS", `⑂ ${esc(r.forks)}`)}
  <circle cx="312" cy="109" r="3" fill="${r.lang.color}"/>${cell(318, "LANG", esc(fit(r.lang.name, 70, 11)), 11)}
</g>`,
  );
};
