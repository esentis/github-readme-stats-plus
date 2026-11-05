// Pendulum wave: a row of pendulums with tuned periods swinging in and out of travelling wave patterns above the repo text.
import { FONT, esc, fit, motion, rng, row, stats, svg } from "../card.js";

export const about = "Pendulum wave: glossy bobs in the language colour with tuned periods drift in and out of travelling waves.";

const BAR = 14;

// Pendulum i makes K+i swings per 72s cycle, with length ∝ period², like the real demonstration; all start from one seeded moment so the first frame is already a wave.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const [n, K, amp, tau, flip] = [17 + 2 * Math.floor(rnd() * 3), 26 + Math.floor(rnd() * 10), 16 + rnd() * 5, 2 + rnd() * 3, rnd() < 0.5];
  const gap = 336 / (n - 1);
  const items = Array.from({ length: n }, (_, j) => {
    const i = flip ? n - 1 - j : j;
    const [x, T] = [32 + j * gap, 72 / (K + i)];
    const L = 58 * (K / (K + i)) ** 2;
    const now = amp * Math.cos((2 * Math.PI * tau) / T);
    const [sx, sy] = [Math.sin((amp * Math.PI) / 180) * L, Math.cos((amp * Math.PI) / 180) * L];
    const arc = `<path d="M${(x - sx).toFixed(1)} ${(BAR + sy).toFixed(1)}A${L.toFixed(1)} ${L.toFixed(1)} 0 0 0 ${(x + sx).toFixed(1)} ${(BAR + sy).toFixed(1)}"/>`;
    const bob = `<g class="pw" transform="rotate(${now.toFixed(1)})" style="transform-origin:${x.toFixed(1)}px ${BAR}px;animation-duration:${(T / 2).toFixed(3)}s;animation-delay:${(-tau).toFixed(2)}s"><path d="M${x.toFixed(1)} ${BAR}v${L.toFixed(1)}" stroke="#4b4f58" stroke-width=".7"/><circle cx="${x.toFixed(1)}" cy="${(BAR + L).toFixed(1)}" r="5.2" fill="url(#pw-bob)" stroke="#000" stroke-opacity=".28" stroke-width=".8"/></g>`;
    return [arc, bob, x];
  });
  return svg(
    r.name,
    `${motion(`.pw { animation: pw 1s ease-in-out infinite alternate } @keyframes pw { from { transform: rotate(${amp.toFixed(1)}deg) } to { transform: rotate(${(-amp).toFixed(1)}deg) } }`)}
<defs>
  <radialGradient id="pw-bob" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".3" stop-color="${c}"/><stop offset="1" stop-color="${c}"/></radialGradient>
  <linearGradient id="pw-brass" x2="0" y2="1"><stop offset="0" stop-color="#e9d7a8"/><stop offset=".5" stop-color="#b8945a"/><stop offset="1" stop-color="#7d6136"/></linearGradient>
  <linearGradient id="pw-bg" x2="0" y2="1"><stop offset="0" stop-color="#f7f5f0"/><stop offset="1" stop-color="#ebe7df"/></linearGradient>
</defs>
<rect width="400" height="150" rx="16" fill="url(#pw-bg)"/>
<path d="M0 84H400" stroke="#d9d3c7"/>
<g fill="none" stroke="${c}" stroke-opacity=".35" stroke-width="1.2" stroke-dasharray="1 2.5">${items.map((p) => p[0]).join("")}</g>
${items.map((p) => p[1]).join("")}
<rect x="16" y="${BAR - 3}" width="368" height="5" rx="2.5" fill="url(#pw-brass)"/>
<g fill="#5b4626">${items.map((p) => `<circle cx="${p[2].toFixed(1)}" cy="${BAR - 0.5}" r="1"/>`).join("")}</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#d8d2c6"/>
<g font-family="${FONT}">
  <text x="24" y="106" font-size="19" font-weight="700" fill="#1c1b1f">${esc(fit(r.name, 250, 19))}</text>
  <text x="376" y="106" text-anchor="end" font-size="11" fill="#7a766e">${esc(fit(r.owner, 96, 11))}</text>
  <text x="24" y="122" font-size="11.5" fill="#5d5a54">${esc(fit(r.description, 352, 11.5, 0.55))}</text>
  ${row(stats(r, { cy: 137, size: 11.5, text: 'fill="#1c1b1f"', icon: 'fill="#7a766e"' }), 24, 16)}
</g>`,
  );
};
