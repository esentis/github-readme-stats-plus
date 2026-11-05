import { FONT, esc, fit, isLight, lines, motion, svg, wrap } from "../card.js";

export const about = "Rooftop billboard at dusk: spotlit tri-vision slats turn between a poster for the repo and its stats, pigeons on the frame.";

const X = 26, Y = 18, W = 264, H = 84, N = 8, SW = W / N;
const pigeon = (x, cls = "") => `<g transform="translate(${x} ${Y - 4}) scale(1.4)" fill="#141526"><path d="M-6-3q2-4 8-3l3 3l-3 3h-6Z"/><path d="M-6-2l-4 1l4 1Z"/><g class="${cls}"><circle cx="3" cy="-6.5" r="2.4"/><path d="M5-7l2 .8l-2 .6Z" fill="#e2a33c"/></g><path d="M-1 0v1.5M1 0v1.5" stroke="#141526" stroke-width=".7"/></g>`;

// Board on the left with two faces cut into slats; each slat squeezes one face away and opens the other.
export default (r) => {
  const c = r.lang.color, ink = isLight(c) ? "#14162a" : "#fff";
  const size = r.name.length > 20 ? 16 : 21;
  const slats = Array.from({ length: N }, (_, i) => {
    const o = `transform-origin:${X + SW * (i + 0.5)}px 0px;animation-delay:-${((N - i) * 0.12).toFixed(2)}s`;
    return `<g clip-path="url(#bb-s${i})"><g class="bb-a" style="${o}"><use href="#bb-fa"/></g><g class="bb-b" transform="scale(0 1)" style="${o}"><use href="#bb-fb"/></g></g>`;
  }).join("");
  const clips = Array.from({ length: N }, (_, i) => `<clipPath id="bb-s${i}"><rect x="${X + SW * i}" y="${Y}" width="${SW}" height="${H}"/></clipPath>`).join("");
  return svg(
    r.name,
    `${motion(".bb-a{animation:bb-a 10s ease-in-out infinite}.bb-b{animation:bb-b 10s ease-in-out infinite}@keyframes bb-a{0%,40%{transform:scaleX(1)}44%,96%{transform:scaleX(0)}100%{transform:scaleX(1)}}@keyframes bb-b{0%,44%{transform:scaleX(0)}48%,92%{transform:scaleX(1)}96%,100%{transform:scaleX(0)}}.bb-h{animation:bb-h 5s ease-in-out infinite}@keyframes bb-h{0%,70%,100%{transform:none}76%,84%{transform:translate(1.5px,2px)}}")}
<defs>${clips}
  <clipPath id="bb-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="bb-sky" x2="0" y2="1"><stop offset="0" stop-color="#121a3a"/><stop offset=".6" stop-color="#3a2f63"/><stop offset="1" stop-color="#b35a6e"/></linearGradient>
  <linearGradient id="bb-paper" x2="0" y2="1"><stop offset="0" stop-color="#fbf4e6"/><stop offset="1" stop-color="#fff9ee"/></linearGradient>
  <linearGradient id="bb-beam" x2="0" y2="1"><stop offset="0" stop-color="#fff1c4" stop-opacity=".05"/><stop offset="1" stop-color="#fff1c4" stop-opacity=".45"/></linearGradient>
  <g id="bb-fa" font-family="${FONT}">
    <rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="url(#bb-paper)"/><g fill="none" stroke="${c}" stroke-opacity=".22" stroke-width="7">${[18, 34, 50].map((s) => `<circle cx="${X + W - 6}" cy="${Y + 10}" r="${s}"/>`).join("")}</g><rect x="${X}" y="${Y}" width="7" height="${H}" fill="${c}"/>
    <text x="${X + 18}" y="${Y + 17}" font-size="9" font-weight="700" letter-spacing="1.5" fill="#8a7f70">${esc(fit(r.owner.toUpperCase(), 130, 9, 0.8))} PRESENTS</text>
    <text x="${X + 18}" y="${Y + 23 + size}" font-size="${size}" font-weight="800" fill="#16182c">${esc(fit(r.name, W - 30, size))}</text>
    <text font-size="11.5" fill="#4f4a58">${lines(wrap(r.description, 34), X + 18, Y + 62, 14)}</text>
  </g>
  <g id="bb-fb" font-family="${FONT}" fill="${ink}">
    <rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="${c}"/>
    <g fill="none" stroke="${ink}" stroke-opacity=".18" stroke-width="10">${[40, 70, 100].map((s) => `<circle cx="${X + W}" cy="${Y + H}" r="${s}"/>`).join("")}</g>
    <text x="${X + 18}" y="${Y + 54}" font-size="34" font-weight="800">★ ${esc(r.stars)}</text>
    <text x="${X + 20}" y="${Y + 72}" font-size="11" font-weight="600" letter-spacing="1.5" opacity=".85">STARGAZERS</text>
    <text x="${X + W - 16}" y="${Y + 32}" font-size="14" font-weight="700" text-anchor="end">⑂ ${esc(r.forks)}</text>
    <text x="${X + W - 16}" y="${Y + 50}" font-size="12" text-anchor="end">${esc(fit(r.lang.name, 90, 12))}</text>
  </g>
</defs>
<g clip-path="url(#bb-clip)">
  <rect width="400" height="150" fill="url(#bb-sky)"/>
  <path d="M372 26a10 10 0 1 1-8-14a8 8 0 0 0 8 14Z" fill="#f4ecd4"/>
  <path d="M0 150V124h18v-12h22v20h30v-16h26v34ZM290 150v-34h20v34Z" fill="#2a2348" opacity=".8"/>
  <g stroke="#1a1a2c" stroke-width="3"><path d="M70 104V140M246 104V140"/></g><path d="M70 112L246 136M70 136L246 112" stroke="#1a1a2c" stroke-width="1.2"/>
  <g transform="translate(330 0)" fill="#1a1a2c"><path d="M-14 118l3-26h22l3 26M-11 104h22" fill="none" stroke="#1a1a2c" stroke-width="2"/><path d="M-20 58q20-14 40 0v34h-40Z"/><path d="M-22 58l22-14l22 14Z"/><path d="M-20 70h40M-20 82h40" stroke="#2c2b48"/><path d="M-18 60v30" stroke="#ffb07a" stroke-opacity=".35" stroke-width="2"/></g>
  <rect y="140" width="400" height="10" fill="#0d0d1a"/><path d="M0 140h400" stroke="#24243c" stroke-width="2"/>
  <rect x="${X - 4}" y="${Y - 4}" width="${W + 8}" height="${H + 8}" rx="2" fill="#1d1e2e"/>
  ${slats}
  <path d="${Array.from({ length: N - 1 }, (_, i) => `M${X + SW * (i + 1)} ${Y}v${H}`).join("")}" stroke="#1d1e2e" stroke-opacity=".5" stroke-width=".8"/>
  <path d="M${X - 6} 108H${X + W + 6}M${X - 6} 114H${X + W + 6}" stroke="#2c2d42" stroke-width="2"/><path d="M${X} 108v6M${X + 66} 108v6M${X + 132} 108v6M${X + 198} 108v6M${X + W} 108v6" stroke="#2c2d42" stroke-width="1.4"/>
  ${[64, 158, 252].map((x) => `<path d="M${x - 3} 104L${x - 44} ${Y}h88L${x + 3} 104Z" fill="url(#bb-beam)" opacity=".25"/><path d="M${x} 112v-4" stroke="#2c2d42" stroke-width="2"/><path d="M${x - 5} 108l2-4h6l2 4Z" fill="#3b3c55"/><rect x="${x - 3}" y="103.5" width="6" height="1.5" fill="#fff3c8"/>`).join("")}
  ${pigeon(60)}${pigeon(74, "bb-h")}${pigeon(232)}
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>`,
  );
};
