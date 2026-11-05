import { esc, fit, isLight, lines, motion, svg, wrap, rng } from "../card.js";

export const about = "Casino table: three dice on green felt rolled from stars, forks and the name (one in the language colour, wobbling), gilt serif type and chips for stars and forks.";

const SERIF = "Georgia, 'Times New Roman', serif";
const PIPS = [[[0, 0]], [[-1, -1], [1, 1]], [[-1, -1], [0, 0], [1, 1]], [[-1, -1], [1, -1], [-1, 1], [1, 1]], [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]];

// A rounded die showing n, turned by rot degrees; the inner group is what wobbles.
const die = (x, y, rot, n, face, pip, cls = "") =>
  `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="${cls}">
  <rect x="-16" y="-15" width="38" height="38" rx="8" fill="#000" fill-opacity=".35"/>
  <rect x="-19" y="-19" width="38" height="38" rx="8" fill="${face}"/><rect x="-19" y="-19" width="38" height="38" rx="8" fill="url(#dc-shade)" stroke="#000" stroke-opacity=".15"/>
  <g fill="${pip}">${PIPS[n - 1].map(([a, b]) => `<circle cx="${a * 10}" cy="${b * 10}" r="3.6"/>`).join("")}</g></g></g>`;

const chip = (x, fill, ink, glyph, value) =>
  `<g transform="translate(${x} 122)"><circle r="15" fill="${fill}"/><circle r="13.5" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 3.07"/><circle r="10.5" fill="none" stroke="${ink}" stroke-opacity=".45"/>
  <text y="-2" font-size="7" text-anchor="middle" fill="${ink}">${glyph}</text><text y="7.5" font-size="8.5" font-weight="700" text-anchor="middle" fill="${ink}">${esc(fit(value, 24, 8.5, 0.55))}</text></g>`;

// Green felt inside a wooden rail; dice to the left, gilt type and chips to the right.
export default (r) => {
  const c = r.lang.color;
  const ink = isLight(c) ? "#1a1a1a" : "#fff";
  const d = [(r.starCount % 6) + 1, (r.forkCount % 6) + 1, Math.floor(rng(r.name)() * 6) + 1];
  return svg(
    r.name,
    `<defs>
  <radialGradient id="dc-felt" cx=".35" cy=".45" r=".8"><stop offset="0" stop-color="#2f8f5b"/><stop offset="1" stop-color="#0e4a2c"/></radialGradient>
  <linearGradient id="dc-shade" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
</defs>
${motion(`.dc-wob{transform-box:fill-box;transform-origin:center;animation:dc-wob 4s ease-in-out infinite}
@keyframes dc-wob{0%,70%,100%{transform:rotate(0)}78%{transform:rotate(-8deg)}86%{transform:rotate(5deg)}93%{transform:rotate(-2deg)}}`)}
<rect width="400" height="150" rx="12" fill="url(#dc-felt)"/>
<rect x="3" y="3" width="394" height="144" rx="10" fill="none" stroke="#6b3e1f" stroke-width="6"/>
<rect x="9" y="9" width="382" height="132" rx="7" fill="none" stroke="#d4af37" stroke-opacity=".45"/>
${die(50, 48, -12, d[0], "#faf7ef", "#1a1a1a")}
${die(108, 64, 9, d[1], "#faf7ef", "#b91c1c")}
${die(58, 106, 18, d[2], c, ink, "dc-wob")}
<g font-family="${SERIF}">
  <text x="164" y="32" font-size="9.5" font-weight="700" letter-spacing="2.5" fill="#d4af37">${esc(fit(`HIGH ROLLER · ${r.lang.name.toUpperCase()}`, 220, 9.5, 0.8))}</text>
  <text x="164" y="58" font-size="20" font-weight="700" fill="#f4d58d">${esc(fit(r.name, 222, 20, 0.58))}</text>
  <text font-size="11.5" font-style="italic" fill="#e8e2c8">${lines(wrap(r.description, 34), 164, 78, 15)}</text>
  ${chip(180, c, ink, "★", r.stars)}${chip(216, "#1c1c1c", "#fff", "⑂", r.forks)}
  <text x="242" y="119" font-size="8.5" letter-spacing="2" fill="#d4af37">ROLLED</text>
  <text x="242" y="133" font-size="13" font-weight="700" fill="#f4d58d">${d.join(" · ")} = ${d[0] + d[1] + d[2]}</text>
</g>`,
  );
};
