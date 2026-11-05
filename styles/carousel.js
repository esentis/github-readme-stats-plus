import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Night-fair carousel: painted horses rise and fall on brass poles under a striped canopy with chasing marquee lights.";

const CX = 306, L = 224, RT = 388, EAVE = 44;
const BULB = (x, y, i) => `<g class="cr-b" style="animation-delay:-${((i % 3) * 0.8).toFixed(1)}s"><circle cx="${x}" cy="${y}" r="3.6" fill="#ffd36b" opacity=".3"/><circle cx="${x}" cy="${y}" r="1.5" fill="#fff4c9"/></g>`;
// A carousel horse facing left with its pole through the saddle (origin), saddle in the language colour.
const horse = (x, body, c, delay) => `<g class="cr-h" style="animation-delay:-${delay}s"><g transform="translate(${x} 86) scale(.95)" stroke-linecap="round" stroke-linejoin="round">
  <g fill="none" stroke="${body}" stroke-width="2.3"><path d="M-7 3L-11 6L-13.5 3.5M-5 3.5L-7 9L-10 10.5M6 3L8 10L6.5 11.5M4 3.5L3 10.5"/></g>
  <path d="M9.5-2Q15-3 14 5" fill="none" stroke="#e8b04a" stroke-width="1.8"/>
  <ellipse rx="10" ry="4.8" fill="${body}"/><path d="M-6-2L-9-11Q-10-14-13-13.5L-17.5-10.5Q-18.5-8.5-16.5-8L-12.5-8L-7 1Z" fill="${body}"/><path d="M-10.5-13L-10-16.5L-12.2-13.6Z" fill="${body}"/>
  <path d="M-9.4-12.4Q-6.4-8-5.4-3" fill="none" stroke="#e8b04a" stroke-width="1.6"/><circle cx="-13.6" cy="-11" r=".7" fill="#2a1830"/>
  <path d="M-3.5-4.4Q.5-7.4 5-4.2L4-1.2H-2.6Z" fill="${c}" stroke="#2a1830" stroke-opacity=".35" stroke-width=".5"/><path d="M-17-9.5L-9-6.5" stroke="#c0392b" stroke-width=".9"/>
</g></g>`;

// Dark fair sky with soft bokeh, text on the left, the carousel on the right.
export default (r) => {
  const c = r.lang.color, seg = (RT - L) / 10;
  const stripes = Array.from({ length: 10 }, (_, i) => `<path d="M${CX} 10L${L + i * seg} ${EAVE + 1}h${seg}Z" fill="${i % 2 ? "#fbe9d0" : "#d7263d"}"/>`).join("");
  const scallops = `M${L} ${EAVE}` + Array.from({ length: 10 }, () => `a${seg / 2} 7 0 0 0 ${seg} 0`).join("") + "Z";
  const bulbs = Array.from({ length: 11 }, (_, i) => BULB(+(L + i * seg).toFixed(1), EAVE + 1, i)).join("") + Array.from({ length: 9 }, (_, i) => BULB(+(L + 12 + i * 18).toFixed(1), 130, i + 1)).join("");
  return svg(
    r.name,
    `${motion(".cr-h{animation:cr-h 3s ease-in-out infinite}@keyframes cr-h{0%,100%{transform:translateY(-4px)}50%{transform:translateY(4px)}}.cr-b{animation:cr-b 2.4s steps(1) infinite}@keyframes cr-b{0%,33%{opacity:1}34%,100%{opacity:.35}}")}
<defs>
  <clipPath id="cr-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="cr-roof"><path d="M${CX} 10Q${CX - 40} 34 ${L} ${EAVE + 1}H${RT}Q${CX + 40} 34 ${CX} 10Z"/></clipPath>
  <linearGradient id="cr-sky" x2="0" y2="1"><stop offset="0" stop-color="#160d2c"/><stop offset="1" stop-color="#34184a"/></linearGradient>
  <radialGradient id="cr-in" cy=".35"><stop offset="0" stop-color="#7a3a4a"/><stop offset="1" stop-color="#2a1430"/></radialGradient>
  <linearGradient id="cr-gold" x2="1"><stop offset="0" stop-color="#9c6b22"/><stop offset=".5" stop-color="#f6d27a"/><stop offset="1" stop-color="#9c6b22"/></linearGradient>
  <radialGradient id="cr-glow" cx=".77" cy=".6" r=".5"><stop offset="0" stop-color="#ffb35c" stop-opacity=".35"/><stop offset="1" stop-color="#ffb35c" stop-opacity="0"/></radialGradient>
</defs>
<g clip-path="url(#cr-clip)">
  <rect width="400" height="150" fill="url(#cr-sky)"/><rect width="400" height="150" fill="url(#cr-glow)"/>
  <g opacity=".22">${[[176, 120, 9, "#ff7b9c"], [196, 96, 5, "#ffd36b"], [212, 132, 6, "#7be0f2"], [150, 140, 4, "#ffd36b"], [392, 96, 7, "#ff7b9c"], [214, 20, 5, "#7be0f2"], [392, 14, 4, "#ffd36b"]].map(([x, y, s, f]) => `<circle cx="${x}" cy="${y}" r="${s}" fill="${f}"/>`).join("")}</g>
  <rect x="${L + 6}" y="${EAVE}" width="${RT - L - 12}" height="76" fill="url(#cr-in)"/>
  <rect x="${CX - 8}" y="${EAVE}" width="16" height="76" fill="url(#cr-gold)" opacity=".85"/><path d="M${CX - 8} 66h16M${CX - 8} 98h16" stroke="#6b4416"/>
  <path d="${[252, 290, 328, 366].map((x) => `M${x} ${EAVE + 6}V120`).join("")}" stroke="url(#cr-gold)" stroke-width="2"/>
  ${horse(252, "#fbf3e4", c, 0)}${horse(290, "#d9dde8", c, 1.5)}${horse(328, "#fbf3e4", c, 0.75)}${horse(366, "#f3d6e2", c, 2.25)}
  <path d="M${CX} 10V3" stroke="#e8b04a" stroke-width="1.2"/><path d="M${CX} 3l9 2.4l-9 2.4Z" fill="${c}"/><circle cx="${CX}" cy="10" r="2.6" fill="#f6d27a"/>
  <g clip-path="url(#cr-roof)">${stripes}<path d="M${L} 30Q${CX} 22 ${RT} 30" fill="none" stroke="#000" stroke-opacity=".08" stroke-width="20"/></g>
  <rect x="${L - 2}" y="${EAVE - 1}" width="${RT - L + 4}" height="4" rx="1" fill="${c}"/>
  <path d="${scallops}" fill="#f2b84b" stroke="#a36f22" stroke-width=".8"/>
  <rect x="${L - 2}" y="119" width="${RT - L + 4}" height="5" fill="url(#cr-gold)"/><rect x="${L}" y="124" width="${RT - L}" height="12" fill="#8e1b33"/>
  <rect y="136" width="400" height="14" fill="#120a1f"/><ellipse cx="${CX}" cy="137" rx="96" ry="4" fill="#ffb35c" opacity=".18"/>
  ${bulbs}
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <circle cx="26" cy="27" r="4" fill="${c}"/>
  <text x="36" y="30.5" font-size="10" font-weight="700" letter-spacing="1.5" fill="#c9b3dc">${esc(fit(r.lang.name.toUpperCase(), 160, 10, 0.8))}</text>
  <text x="22" y="54" font-size="20" font-weight="700" fill="#fff4e2">${esc(fit(r.name, 192, 20))}</text>
  <text font-size="12" fill="#dccbe8">${lines(wrap(r.description, 27), 22, 74, 15)}</text>
  ${row(stats(r, { cy: 120, size: 12, text: 'fill="#fff1de"', icon: 'fill="#f2b84b"' }).slice(1), 22, 16)}
</g>`,
  );
};
