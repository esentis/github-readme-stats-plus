import { FONT, MONO, esc, fit, motion, svg } from "../card.js";

export const about = "Audio waveform: the track's waveform in the language colour with a playhead sweeping across, title, owner and description, timestamps below.";

const rnd = (k) => Math.abs(Math.sin(k) * 1e4) % 1;
const time = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// A dark audio player: the waveform shape, track length and play position all come from the repo name.
export default (r) => {
  const seed = [...r.name].reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const p = 0.25 + (seed % 50) / 100;
  const total = 150 + (seed % 120);
  const bars = Array.from({ length: 72 }, (_, i) => {
    const a = 3 + 22 * Math.sin((Math.PI * (i + 0.5)) / 72) ** 0.5 * (0.3 + 0.7 * rnd(seed + i * 7.31));
    return `<rect x="${21 + i * 5}" y="${(90 - a).toFixed(1)}" width="3" height="${(2 * a).toFixed(1)}" rx="1.5"/>`;
  }).join("");
  const head = 20 + 360 * p;
  const loop = (k) => `animation:${k} 8s linear infinite;animation-delay:-${(p * 8).toFixed(2)}s`;
  return svg(
    r.name,
    `<defs><clipPath id="wf-played"><rect class="wf-p" x="20" y="60" width="${(360 * p).toFixed(1)}" height="60"/></clipPath></defs>
${motion(`.wf-p{transform-box:fill-box;transform-origin:left center;${loop("wf-p")}}.wf-h{${loop("wf-h")}}
@keyframes wf-p{from{transform:scaleX(0)}to{transform:scaleX(${(1 / p).toFixed(4)})}}
@keyframes wf-h{from{transform:translateX(${(-360 * p).toFixed(1)}px)}to{transform:translateX(${(360 * (1 - p)).toFixed(1)}px)}}`)}
<rect width="400" height="150" rx="12" fill="#101218"/>
<g fill="#3a3f4c">${bars}</g>
<g fill="${r.lang.color}" clip-path="url(#wf-played)">${bars}</g>
<g class="wf-h"><path d="M${head.toFixed(1)} 62V118" stroke="#fff" stroke-width="1.5"/><circle cx="${head.toFixed(1)}" cy="62" r="3.5" fill="#fff"/></g>
<g font-family="${FONT}">
  <text x="20" y="31" font-size="17" font-weight="700" fill="#f3f4f6">${esc(fit(r.name, 250, 17))}</text>
  <text x="380" y="31" font-size="12" font-weight="700" fill="#f3f4f6" text-anchor="end">★ ${esc(r.stars)}  <tspan fill="#9ca3af">⑂ ${esc(r.forks)}</tspan></text>
  <text x="20" y="48" font-size="10.5" fill="#9ca3af"><tspan fill="#d1d5db">${esc(fit(r.owner, 120, 10.5))}</tspan> — ${esc(fit(r.description, 340 - Math.min(r.owner.length, 20) * 6.3, 10.5))}</text>
  <text x="200" y="136" font-size="10" fill="#9ca3af" text-anchor="middle"><tspan fill="${r.lang.color}">●</tspan> ${esc(fit(r.lang.name, 120, 10))}</text>
</g>
<g font-family="${MONO}" font-size="10" fill="#9ca3af"><text x="20" y="136">${time(total * p)}</text><text x="380" y="136" text-anchor="end">${time(total)}</text></g>`,
  );
};
