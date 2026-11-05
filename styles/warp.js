// Hyperspace jump: star streaks rush out from the centre while the name holds steady in the dark eye of the tunnel.
import { FONT, esc, fit, motion, row, stats, svg, textWidth } from "../card.js";
import { seeded } from "./starmap.js";

export const about = "Hyperspace warp: star streaks radiate and rush outward from the centre, with the name held in the middle.";

const PERIODS = [70, 95, 120]; // dash period of each streak layer; each layer slides two periods per loop

export default (r) => {
  const rnd = seeded(r.name);
  const layers = PERIODS.map((p, k) => {
    const d = Array.from({ length: 22 }, () => {
      const a = rnd() * 2 * Math.PI, r0 = 40 + rnd() * 30;
      return `M${(200 + r0 * Math.cos(a)).toFixed(1)} ${(75 + r0 * Math.sin(a) * 0.6).toFixed(1)}L${(200 + 260 * Math.cos(a)).toFixed(1)} ${(75 + 260 * Math.sin(a) * 0.6).toFixed(1)}`;
    }).join("");
    return `<path class="wp-s${k}" d="${d}" stroke="${k === 1 ? r.lang.color : "#dbe7ff"}" stroke-opacity="${0.5 + k * 0.2}" stroke-width="${0.8 + k * 0.4}" stroke-dasharray="${p * 0.35} ${p * 0.65}" stroke-dashoffset="${-k * 23}"/>`;
  });
  const items = stats(r, { cy: 117, size: 11.5, text: 'fill="#e6edff" font-weight="600"', icon: 'fill="#9fb8ff"' });
  const w = items.reduce((s, [iw]) => s + iw, 0) + 32;
  const name = fit(r.name, 280, 22, 0.62);
  return svg(
    r.name,
    `<defs>
  <clipPath id="wp-clip"><rect width="400" height="150" rx="12"/></clipPath>
  <radialGradient id="wp-eye"><stop offset="0" stop-color="#03040c" stop-opacity=".95"/><stop offset=".6" stop-color="#03040c" stop-opacity=".85"/><stop offset="1" stop-color="#03040c" stop-opacity="0"/></radialGradient>
  <radialGradient id="wp-bg" r=".75"><stop offset="0" stop-color="#1b1f4d"/><stop offset="1" stop-color="#020208"/></radialGradient>
</defs>
${motion(PERIODS.map((p, k) => `.wp-s${k}{animation:wp-s${k} ${2 + k}s linear infinite}@keyframes wp-s${k}{from{stroke-dashoffset:${-k * 23}}to{stroke-dashoffset:${-k * 23 - 2 * p}}}`).join("") + ".wp-eye{animation:wp-eye 4s ease-in-out infinite}@keyframes wp-eye{50%{opacity:.8}}")}
<g clip-path="url(#wp-clip)">
  <rect width="400" height="150" fill="url(#wp-bg)"/>
  <g fill="none" stroke-linecap="round">${layers.join("")}</g>
  <rect class="wp-eye" x="40" y="10" width="320" height="130" fill="url(#wp-eye)"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="#9fb8ff" stroke-opacity=".2"/>
<g font-family="${FONT}" text-anchor="middle">
  <text x="200" y="45" font-size="9" font-weight="700" fill="#9fb8ff" letter-spacing="3">JUMP · ${esc(fit(r.owner.toUpperCase(), 150, 9, 0.95))}</text>
  <text x="200" y="74" font-size="22" font-weight="800" fill="#fff" letter-spacing=".5">${esc(name)}</text>
  <text x="200" y="93" font-size="10.5" fill="#b6c6e6">${esc(fit(r.description, 270, 10.5))}</text>
</g>
<g font-family="${FONT}">${row(items, 200 - w / 2, 16)}</g>
<path d="M${200 - Math.min(textWidth(name, 22, 0.62), 280) / 2} 81H${200 + Math.min(textWidth(name, 22, 0.62), 280) / 2}" stroke="${r.lang.color}" stroke-opacity=".7"/>`,
  );
};
