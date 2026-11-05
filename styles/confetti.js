// Confetti: a clean milestone label with the star count while confetti in the language colour drifts and flips around it.
import { FONT, esc, fit, isLight, motion, rng, svg, textWidth } from "../card.js";

export const about = "Milestone celebration: a clean star-count label while confetti in the language colour gently falls and flips around it.";

const STAR = `M${Array.from({ length: 10 }, (_, i) => [Math.sin((i * Math.PI) / 5) * (i % 2 ? 5 : 12), -Math.cos((i * Math.PI) / 5) * (i % 2 ? 5 : 12)].map((v) => v.toFixed(1)).join(" ")).join("L")}Z`;

// Every piece falls from above the card to below it (so the loop is seamless) while spinning on its own.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const palette = [c, c, "#ffd166", "#ff5d8f", "#4cc9f0", "#7bed9f", "#fff"];
  const pieces = Array.from({ length: 40 }, (_, i) => {
    const [x, fall, spin, col, kind] = [(i / 40) * 400 + rnd() * 10, 8 + rnd() * 6, 1.6 + rnd() * 2, palette[Math.floor(rnd() * palette.length)], rnd()];
    const shape = kind < 0.5 ? `<rect x="-2" y="-4" width="4" height="8" rx=".6"/>` : kind < 0.75 ? `<circle r="2.6"/>` : `<path d="M0-6q3 3 0 6t0 6" fill="none" stroke="${col}" stroke-width="1.6" stroke-linecap="round"/>`;
    // Pieces rest just below the card; the static transform is where the staggered fall has them at t=0.
    const f = rnd();
    return `<g transform="translate(${x.toFixed(1)} 166)"><g class="cf-f" transform="translate(0 ${(-180 + 180 * f).toFixed(0)})" style="animation-duration:${fall.toFixed(1)}s;animation-delay:${(-f * fall).toFixed(2)}s"><g class="cf-s" fill="${col}" transform="rotate(${(rnd() * 180).toFixed(0)})" style="animation-duration:${spin.toFixed(1)}s${rnd() < 0.5 ? ";animation-direction:reverse" : ""}">${shape}</g></g></g>`;
  }).join("");
  const accent = isLight(c) ? "#6b5a00" : c;
  const big = `${r.stars}`;
  const bw = textWidth(big, 34, 0.58) + 34;
  const meta = `${r.lang.name} · ⑂ ${r.forks}`;
  return svg(
    r.name,
    `${motion(`.cf-f, .cf-s { transform-origin: 0 0; animation: cf-f 10s linear infinite } .cf-s { animation-name: cf-s } .cf-t { transform-origin: 0 0; animation: cf-t 3s ease-in-out infinite }
@keyframes cf-f { 0% { transform: translate(0, -180px) } 25% { transform: translate(7px, -135px) } 50% { transform: translate(0, -90px) } 75% { transform: translate(-7px, -45px) } 100% { transform: translate(0, 0) } }
@keyframes cf-s { 0% { transform: rotate(0) scaleY(1) } 25% { transform: rotate(90deg) scaleY(.2) } 50% { transform: rotate(180deg) scaleY(1) } 75% { transform: rotate(270deg) scaleY(.2) } 100% { transform: rotate(360deg) scaleY(1) } }
@keyframes cf-t { 50% { transform: scale(1.15) } }`)}
<defs>
  <clipPath id="cf-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <radialGradient id="cf-bg" cy=".45" r=".75"><stop offset="0" stop-color="#2a2150"/><stop offset="1" stop-color="#0e0b1c"/></radialGradient>
  <filter id="cf-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
</defs>
<g clip-path="url(#cf-clip)">
  <rect width="400" height="150" fill="url(#cf-bg)"/>
  <rect x="96" y="22" width="208" height="106" rx="16" fill="${c}" opacity=".5" filter="url(#cf-blur)"/>
  <g opacity=".95">${pieces}</g>
  <rect x="104" y="18" width="192" height="114" rx="14" fill="#fff"/>
  <rect x="104" y="18" width="192" height="114" rx="14" fill="none" stroke="${c}" stroke-opacity=".6" stroke-width="1.5"/>
</g>
<g font-family="${FONT}" text-anchor="middle">
  <text x="200" y="40" font-size="9" font-weight="700" letter-spacing="3" fill="${accent}">MILESTONE</text>
  <g transform="translate(${(200 - bw / 2 + 12).toFixed(1)} 68)"><g class="cf-t"><path d="${STAR}" fill="${isLight(c) ? "#e0b400" : c}"/></g></g>
  <text x="${(200 + 17).toFixed(1)}" y="80" font-size="34" font-weight="800" fill="#16131f">${esc(big)}</text>
  <text x="200" y="102" font-size="13" font-weight="700" fill="#16131f">${esc(fit(r.name, 172, 13, 0.6))}</text>
  <text x="200" y="120" font-size="10.5" fill="#6d6880">${esc(fit(meta, 172, 10.5, 0.55))}</text>
</g>`,
  );
};
