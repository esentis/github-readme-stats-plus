// Orbital diagram: a planet in the language colour with one moon per fork (up to four) circling on elliptical orbits.
import { FONT, MONO, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Orbital diagram: a planet in the language colour with one moon per fork (up to four) circling on labelled elliptical orbits.";

const CX = 296, CY = 72;
const ORBITS = [[40, 3], [54, 5], [68, 7], [82, 9]]; // [radius, seconds per lap]

export default (r) => {
  const moons = Math.min(r.forkCount, 4);
  // Two eased translations a quarter-lap apart trace an ellipse; the transform attributes are the static frame.
  const orbit = ([a, d], i) => {
    const b = a * 0.32, phase = (i * 0.37) % 1, ang = phase * 2 * Math.PI;
    const ring = `<ellipse cx="${CX}" cy="${CY}" rx="${a}" ry="${b.toFixed(1)}" fill="none" stroke="#94a3b8" stroke-opacity=".45" stroke-width=".8"${i < moons ? "" : ' stroke-dasharray="2 3"'}/><path d="M${CX + a} ${CY - 3}V${CY + 3}" stroke="#94a3b8"/><text x="${CX + a}" y="${CY + 11}" text-anchor="middle">${i + 1}</text>`;
    const moon = i < moons ? `<g transform="translate(${CX} ${CY})"><g class="or-x${i}" style="animation-delay:${(-phase * d).toFixed(2)}s" transform="translate(${(a * Math.cos(ang)).toFixed(1)} 0)"><g class="or-y${i}" style="animation-delay:${(-(phase + 0.25) * d).toFixed(2)}s" transform="translate(0 ${(-b * Math.sin(ang)).toFixed(1)})"><circle r="3.4" fill="#e2e8f0"/></g></g></g>` : "";
    return [ring, moon];
  };
  const parts = ORBITS.slice(0, Math.max(1, moons)).map(orbit);
  return svg(
    r.name,
    `<defs><radialGradient id="or-lit" cx=".32" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></radialGradient>
  <pattern id="or-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#94a3b8" fill-opacity=".25"/></pattern></defs>
${motion(ORBITS.map(([a, d], i) => [["x", a], ["y", (a * 0.32).toFixed(1)]].map(([k, v]) => `.or-${k}${i}{animation:or-${k}${i} ${d}s cubic-bezier(.37,0,.63,1) infinite}@keyframes or-${k}${i}{0%,100%{transform:translate${k.toUpperCase()}(${v}px)}50%{transform:translate${k.toUpperCase()}(-${v}px)}}`).join("")).join("\n"))}
<rect width="400" height="150" rx="12" fill="#0a0f1d"/>
<rect width="400" height="150" rx="12" fill="url(#or-dots)"/>
<path d="M206 ${CY}H396" stroke="#94a3b8" stroke-opacity=".3" stroke-dasharray="1 3"/>
<g font-family="${MONO}" font-size="7" fill="#94a3b8">${parts.map((p) => p[0]).join("")}</g>
<circle cx="${CX}" cy="${CY}" r="17" fill="${r.lang.color}"/><circle cx="${CX}" cy="${CY}" r="17" fill="url(#or-lit)"/>
${parts.map((p) => p[1]).join("")}
<text x="${CX}" y="134" font-family="${MONO}" font-size="8" fill="#94a3b8" text-anchor="middle" letter-spacing="1">⑂ ${esc(r.forks)} FORKS · ${moons} MOON${moons === 1 ? "" : "S"} SHOWN</text>
<g font-family="${FONT}">
  <text x="20" y="30" font-size="8.5" font-weight="700" fill="#94a3b8" letter-spacing="2.5">SYSTEM · ${esc(fit(r.owner.toUpperCase(), 110, 8.5, 0.8))}</text>
  <text x="20" y="53" font-size="18" font-weight="700" fill="#f1f5f9">${esc(fit(r.name, 184, 18, 0.62))}</text>
  <text font-size="11" fill="#a3b0c6">${lines(wrap(r.description, 28), 20, 74, 15)}</text>
  ${row(stats(r, { cy: 124, size: 11, text: 'fill="#e2e8f0"', icon: 'fill="#94a3b8"' }).slice(0, 2), 20, 14)}
</g>`,
  );
};
