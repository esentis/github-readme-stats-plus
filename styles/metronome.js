import { FONT, esc, fit, motion, row, stats, svg } from "../card.js";

export const about = "Wooden pyramid metronome swinging at the star count in BPM, with the tempo name, repo name, description and stats set beside it.";

const TEMPO = [[10, "Grave"], [60, "Largo"], [100, "Andante"], [140, "Moderato"], [200, "Allegro"], [Infinity, "Presto"]];

// A wooden metronome on warm paper: the arm swings at the stars as BPM (clamped to a 1–8s loop), a dot blinks on each tick.
export default (r) => {
  const bpm = r.starCount;
  const period = Math.min(8, Math.max(1, 120 / Math.max(bpm, 1))).toFixed(2);
  const weight = 34 + 54 * (1 - Math.min(1, Math.log10(bpm + 1) / 4));
  const tempo = TEMPO.find(([max]) => bpm < max)[1].toUpperCase();
  return svg(
    r.name,
    `<defs>
  <linearGradient id="mt-wood" x2="1"><stop offset="0" stop-color="#5b3218"/><stop offset=".45" stop-color="#9a5e31"/><stop offset="1" stop-color="#4a2812"/></linearGradient>
</defs>
${motion(`.mt-arm{transform-origin:75px 112px;animation:mt-arm ${period}s linear infinite}.mt-tick{animation:mt-tick ${period}s linear infinite}
@keyframes mt-arm{0%{transform:rotate(0);animation-timing-function:ease-out}25%{transform:rotate(20deg);animation-timing-function:ease-in}50%{transform:rotate(0);animation-timing-function:ease-out}75%{transform:rotate(-20deg);animation-timing-function:ease-in}100%{transform:rotate(0)}}
@keyframes mt-tick{0%,20%,30%,70%,80%,100%{opacity:.25}25%,75%{opacity:1}}`)}
<rect width="400" height="150" rx="12" fill="#f4ede1"/>
<path d="M28 142H122" stroke="#000" stroke-opacity=".12" stroke-width="4" stroke-linecap="round"/>
<path d="M62 10H88L120 140H30Z" fill="url(#mt-wood)"/>
<path d="M65 20H85L98 106H52Z" fill="#efdcb6"/>
<g stroke="#7a5230" stroke-width=".8">${Array.from({ length: 11 }, (_, i) => `<path d="M71 ${28 + i * 7}H79"/>`).join("")}</g>
<rect x="46" y="112" width="58" height="22" rx="2" fill="#3a1f0c"/>
<g class="mt-arm">
  <path d="M75 112V18" stroke="#c9ccd2" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M68 ${weight.toFixed(1)}H82L80 ${(weight + 11).toFixed(1)}H70Z" fill="#b8bcc4" stroke="#6b6f76" stroke-width=".8"/>
</g>
<circle cx="75" cy="112" r="3.5" fill="#3a1f0c" stroke="#c9ccd2"/>
<g font-family="${FONT}">
  <circle class="mt-tick" cx="154" cy="28.5" r="4" fill="${r.lang.color}"/>
  <text x="164" y="32" font-size="10" font-weight="700" letter-spacing="3" fill="#9a7b58">${tempo}</text>
  <text x="148" y="72" font-size="40" font-weight="800" fill="#2b2118">${esc(r.stars)}<tspan font-size="12" font-weight="700" fill="#9a7b58" dx="6">BPM</tspan></text>
  <text x="150" y="96" font-size="16" font-weight="700" fill="#2b2118">${esc(fit(r.name, 230, 16))}</text>
  <text x="150" y="113" font-size="10.5" fill="#7a6a58">${esc(fit(r.description, 230, 10.5))}</text>
  ${row(stats(r, { cy: 131, size: 11.5, text: 'fill="#2b2118"', icon: 'fill="#9a7b58"' }).filter((_, i) => i !== 1), 150, 14)}
</g>`,
  );
};
