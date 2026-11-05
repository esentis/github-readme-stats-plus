import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Apartment block at night: a grid of warmly lit windows patterned from the name, one glowing in the language colour, and a neighbour walking past theirs.";

const FILL = { warm: "url(#cl-warm)", soft: "url(#cl-soft)", tv: "url(#cl-tv)", lang: "url(#cl-lang)", dark: "#121420" };
// One window (34×30) with its glow, frame, interior detail, mullions and sill.
const win = (x, y, kind, plant, extra = "") => {
  const lit = kind !== "dark";
  const inside = extra ? "" :
    kind === "soft" ? `<path d="M${x} ${y}h9q-3 15 0 30h-9ZM${x + 34} ${y}h-9q3 15 0 30h9Z" fill="#b5523a" opacity=".55"/>`
    : kind === "warm" && plant ? `<path d="M${x} ${y + 4}h34" stroke="#c46a3a" stroke-width="2" opacity=".5"/>`
    : kind === "dark" ? `<path d="M${x + 4} ${y + 30}l14-30h6l-14 30Z" fill="#fff" opacity=".05"/>`
    : kind === "warm" ? `<path d="M${x} ${y + 3}h34M${x} ${y + 6}h34M${x} ${y + 9}h34M${x} ${y + 12}h34" stroke="#a4552e" stroke-width="1.1" opacity=".45"/>` : "";
  return `${lit ? `<rect x="${x - 6}" y="${y - 6}" width="46" height="42" rx="8" fill="${kind === "tv" ? "#6d8bff" : kind === "lang" ? "url(#cl-lang)" : "#ffb764"}" opacity=".12"/>` : ""}
  <rect x="${x - 2}" y="${y - 2}" width="38" height="34" fill="#0b0b12"/><rect x="${x}" y="${y}" width="34" height="30" fill="${FILL[kind]}"${kind === "tv" ? ' class="cl-tv"' : ""}/>${inside}${extra}
  <path d="M${x + 17} ${y}v30M${x} ${y + 10}h34" stroke="#0b0b12" stroke-width="1.6"/>
  ${plant ? `<g fill="#1a241c"><path d="M${x + 4} ${y + 25}h8l-1 5h-6Z"/><path d="M${x + 8} ${y + 25}q-7-2-6-9q5 3 6 9q-1-9 3-12q3 6-3 12q3-6 8-6q-1 6-8 6Z"/></g>` : ""}
  <rect x="${x - 3}" y="${y + 30}" width="40" height="3" fill="#3d3647"/>`;
};

// The facade fills the card; a soft scrim on the left keeps the text readable over the windows.
export default (r) => {
  const rand = rng(r.name);
  const cells = [];
  for (const y of [-20, 24, 68, 112]) for (let i = 0; i < 8; i++) cells.push([8 + i * 50, y]);
  const right = cells.map((_, k) => k).filter((k) => cells[k][0] >= 208 && cells[k][1] > 0 && !(cells[k][0] === 308 && cells[k][1] === 68));
  const langCell = right[Math.floor(rand() * right.length)];
  const person = `<g clip-path="url(#cl-room)"><g class="cl-p"><circle cx="325" cy="81" r="4.4" fill="#2b1620"/><path d="M314 98q0-10 11-11q11 1 11 11Z" fill="#2b1620"/></g></g>`;
  const windows = cells.map(([x, y], k) => {
    if (x === 308 && y === 68) return win(x, y, "warm", false, person);
    const p = rand();
    const kind = k === langCell ? "lang" : p < 0.34 ? "dark" : p < 0.6 ? "warm" : p < 0.82 ? "soft" : "tv";
    return win(x, y, kind, rand() < 0.25);
  }).join("");
  return svg(
    r.name,
    `${motion(".cl-p{animation:cl-p 14s ease-in-out infinite}@keyframes cl-p{0%,35%{transform:translateX(0)}50%{transform:translateX(28px)}50.01%{transform:translateX(-28px)}65%,100%{transform:translateX(0)}}.cl-tv{animation:cl-tv 3s infinite}@keyframes cl-tv{0%,100%{opacity:1}18%{opacity:.7}24%{opacity:.95}48%{opacity:.78}70%{opacity:1}84%{opacity:.72}}")}
<defs>
  <clipPath id="cl-clip"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="cl-room"><rect x="308" y="68" width="34" height="30"/></clipPath>
  <linearGradient id="cl-warm" x2="0" y2="1"><stop offset="0" stop-color="#ffd98f"/><stop offset="1" stop-color="#f0903f"/></linearGradient>
  <linearGradient id="cl-soft" x2="0" y2="1"><stop offset="0" stop-color="#ffefc6"/><stop offset="1" stop-color="#f4b56c"/></linearGradient>
  <linearGradient id="cl-tv" x2="1" y2="1"><stop offset="0" stop-color="#8aa6ff"/><stop offset="1" stop-color="#2c3a8f"/></linearGradient>
  <linearGradient id="cl-lang" x2="0" y2="1"><stop offset="0" stop-color="${r.lang.color}" stop-opacity=".75"/><stop offset="1" stop-color="${r.lang.color}"/></linearGradient>
  <linearGradient id="cl-scrim" x2="1"><stop offset="0" stop-color="#0e0c15" stop-opacity=".93"/><stop offset=".45" stop-color="#0e0c15" stop-opacity=".84"/><stop offset=".7" stop-color="#0e0c15" stop-opacity="0"/></linearGradient>
  <pattern id="cl-brick" width="12" height="6" patternUnits="userSpaceOnUse"><path d="M0 .5H12M6 .5V6M0 3.5H12M0 3.5V6" stroke="#000" stroke-opacity=".18" stroke-width=".6" fill="none"/></pattern>
</defs>
<g clip-path="url(#cl-clip)">
  <rect width="400" height="150" fill="#2c2534"/><rect width="400" height="150" fill="url(#cl-brick)"/>
  <g fill="#383042">${[-20, 24, 68, 112].map((y) => `<rect y="${y + 36}" width="400" height="5"/>`).join("")}</g>
  ${windows}
  <rect width="400" height="150" fill="url(#cl-scrim)"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".1"/>
<g font-family="${FONT}">
  <text x="22" y="42" font-size="20" font-weight="700" fill="#fff4e4">${esc(fit(r.name, 220, 20))}</text>
  <text font-size="12" fill="#d6cbbb">${lines(wrap(r.description, 30), 22, 62, 15)}</text>
  ${row(stats(r, { cy: 118, size: 12, text: 'fill="#fff1dc"', icon: 'fill="#e2b98a"' }), 22, 14)}
</g>`,
  );
};
