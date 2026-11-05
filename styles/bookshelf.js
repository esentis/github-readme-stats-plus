// Bookshelf: a row of cloth spines seeded from the name, and a stack of books lying flat carrying the name, notes and stats.
import { FONT, esc, fit, isLight, motion, rng, row, stats, svg } from "../card.js";

export const about = "Bookshelf: cloth-bound spines seeded from the name on a walnut shelf, a stack of lying books with the name in foil on the top one, and one book gently tipping.";

const PAL = ["#7b2d26", "#2f4a3a", "#2c3e5c", "#b8842c", "#e2d3b3", "#2f6b6b", "#5b3a52", "#a77b4f", "#8c4a2f"];
const SERIF = "Georgia, 'Times New Roman', serif";
const GOLD = "#e3c27a";

export default (r) => {
  const rand = rng(r.name);
  const c = r.lang.color;
  const foil = isLight(c) ? "#2a1a10" : GOLD;
  const books = [];
  for (let x = 16; ; ) {
    const w = Math.round(11 + rand() * 11), h = Math.round(66 + rand() * 40), col = PAL[Math.floor(rand() * PAL.length)];
    if (x + w > 178) break;
    const band = col === "#e2d3b3" ? "#7b2d26" : GOLD;
    books.push([x, w, `<rect x="${x}" y="${128 - h}" width="${w}" height="${h}" rx="1.5" fill="${col}"/><rect x="${x}" y="${128 - h}" width="${w}" height="${h}" rx="1.5" fill="url(#bs-spine)"/>
<path d="M${x + 2} ${136 - h}h${w - 4}M${x + 2} ${139 - h}h${w - 4}M${x + 2} 118h${w - 4}" stroke="${band}" stroke-opacity=".8"/>${rand() < 0.5 ? `<rect x="${x + 2.5}" y="${146 - h}" width="${w - 5}" height="${Math.min(22, h / 4)}" rx="1" fill="#f3e8cf" fill-opacity=".75"/>` : ""}`]);
    x += w + (rand() < 0.2 ? 2 : 0.6);
  }
  const [tx, tw, tipper] = books.pop();
  const lying = (x, y, w, h, fill, body) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#bs-lie)" stroke="#1a0f08" stroke-opacity=".4"/>
<path d="M${x + 8} ${y + 2}v${h - 4}M${x + 11} ${y + 2}v${h - 4}M${x + w - 8} ${y + 2}v${h - 4}M${x + w - 11} ${y + 2}v${h - 4}" stroke="${fill === c ? foil : GOLD}" stroke-opacity=".7"/>${body}`;
  return svg(
    r.name,
    `${motion(`.bs-tip{animation:bs-tip 8s ease-in-out infinite;transform-origin:${tx + tw}px 128px}@keyframes bs-tip{0%,45%,100%{transform:rotate(0)}60%{transform:rotate(8deg)}70%{transform:rotate(5.5deg)}86%{transform:rotate(.5deg)}}`)}
<defs>
  <linearGradient id="bs-back" x2="0" y2="1"><stop offset="0" stop-color="#1e120b"/><stop offset=".25" stop-color="#3a2416"/><stop offset="1" stop-color="#2c1a10"/></linearGradient>
  <linearGradient id="bs-spine"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity=".14"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
  <linearGradient id="bs-lie" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#fff" stop-opacity=".15"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
</defs>
<rect width="400" height="150" rx="12" fill="url(#bs-back)"/>
<path d="M30 0V128M92 0V128M154 0V128M232 0V128M300 0V128M362 0V128" stroke="#000" stroke-opacity=".18"/>
<path d="M0 128H400V138A12 12 0 0 1 388 150H12A12 12 0 0 1 0 138Z" fill="#7a4a2c"/><rect y="125" width="400" height="4" fill="#9c653e"/><path d="M0 129.5H400" stroke="#2a170c" stroke-opacity=".5"/>
<rect x="166" y="133" width="76" height="12" rx="2" fill="#c9a35a" stroke="#7d6128" stroke-width=".8"/>
<text x="204" y="141.8" font-family="${FONT}" font-size="8" font-weight="700" fill="#3d2b0e" text-anchor="middle">${esc(fit(r.owner, 68, 8, 0.62))}</text>
${books.map((b) => b[2]).join("")}
<g class="bs-tip">${tipper}</g>
${lying(196, 100, 190, 28, "#6d2a26", `<g font-family="${FONT}">${row(stats(r, { cy: 114, size: 12, text: `fill="${GOLD}" font-weight="700"`, icon: `fill="${GOLD}"` }).slice(1), 214, 16)}</g>`)}
${lying(204, 74, 176, 26, "#2f4a3a", `<text x="219" y="91" font-family="${SERIF}" font-style="italic" font-size="11" fill="#efe3c6">${esc(fit(r.description, 146, 11, 0.5))}</text>`)}
${lying(192, 38, 196, 36, c, `<g font-family="${SERIF}" fill="${foil}"><text x="207" y="51.5" font-size="8" letter-spacing="1.6">${esc(fit(r.lang.name.toUpperCase(), 160, 8, 0.85))}</text><text x="207" y="67" font-size="15.5" font-weight="700">${esc(fit(r.name, 166, 15.5, 0.6))}</text></g>`)}
<path d="M338 38H362L359 23H341Z" fill="#b5623d"/><rect x="339" y="20" width="22" height="5" rx="1" fill="#c9774f"/>
<g fill="#5f8a3a" transform="translate(0 -3)"><ellipse cx="344" cy="18" rx="5" ry="3" transform="rotate(-30 344 18)"/><ellipse cx="354" cy="15" rx="5" ry="3" transform="rotate(25 354 15)"/><ellipse cx="350" cy="10" rx="3" ry="4.5"/><ellipse cx="364" cy="30" rx="3" ry="4.5" transform="rotate(-20 364 30)"/><ellipse cx="366" cy="40" rx="2.6" ry="4" transform="rotate(10 366 40)"/></g>
<path d="M360 21Q368 27 365 41" fill="none" stroke="#4d7330" stroke-width="1"/>`,
  );
};
