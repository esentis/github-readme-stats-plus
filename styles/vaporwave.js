import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Vaporwave: pastel pink and cyan sky, a checkerboard floor, a marble column and a chromatic serif title.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Georgia, 'Times New Roman', serif";

// A checkerboard floor in perspective: columns converge on the horizon, rows get taller toward the viewer.
const floor = () => {
  const ys = [104, 106, 109, 113, 119, 128, 142, 164];
  const at = (xb, y) => (200 + ((xb - 200) * (y - 104)) / 46).toFixed(1);
  let out = "";
  for (let i = 0; i < ys.length - 1; i++)
    for (let j = -16; j < 16; j++)
      if ((i + j + 32) % 2) {
        const [x0, x1, y0, y1] = [200 + j * 34, 234 + j * 34, ys[i], ys[i + 1]];
        out += `<polygon points="${at(x0, y0)},${y0} ${at(x1, y0)},${y0} ${at(x1, y1)},${y1} ${at(x0, y1)},${y1}"/>`;
      }
  return out;
};

// Pastel vaporwave: a marble column on a checkerboard floor, title with offset cyan and pink ghosts.
export default (r) => {
  const name = esc(fit(r.name, 270, 24, 0.52));
  const items = stats(r, { cy: 128, size: 12, text: 'fill="#4b2a6b" font-weight="600"', icon: 'fill="#ff5fb4"' });
  const pill = items.reduce((w, [iw]) => w + iw + 14, 10);
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="10"/></clipPath>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa6dc"/><stop offset=".55" stop-color="#ffd6ee"/><stop offset="1" stop-color="#a8f0ff"/></linearGradient>
  <linearGradient id="marble" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e6d7ff"/><stop offset=".4" stop-color="#fff"/><stop offset="1" stop-color="#cdb8f0"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="104" fill="url(#sky)"/>
  <rect y="104" width="400" height="46" fill="#fdf2ff"/>
  <g fill="#7ee3ff">${floor()}</g>
  <line x1="0" y1="104" x2="400" y2="104" stroke="#ff5fb4" stroke-width="1.5"/>
  <g fill="url(#marble)" stroke="#a37fd6" stroke-width=".8">
    <rect x="322" y="20" width="56" height="7" rx="2"/><circle cx="324" cy="30" r="5"/><circle cx="376" cy="30" r="5"/>
    <rect x="328" y="27" width="44" height="6"/><rect x="334" y="33" width="32" height="63"/>
    <rect x="330" y="96" width="40" height="4"/><rect x="326" y="100" width="48" height="5"/>
  </g>
  <path d="M341 37v56M347 37v56M353 37v56M359 37v56" stroke="#a37fd6" stroke-opacity=".55"/>
</g>
<g font-family="${SERIF}" font-style="italic" font-weight="700" font-size="24">
  <text x="20.5" y="44" fill="#00d8ff">${name}</text>
  <text x="23.5" y="45" fill="#ff3fa4">${name}</text>
  <text x="22" y="44" fill="#3d1a63">${name}</text>
</g>
<g font-family="${FONT}">
  <text x="22" y="20" font-size="8.5" letter-spacing="4" fill="#7a3f9e">${esc(fit(`@${r.owner}`.toUpperCase(), 200, 8.5, 1.1))}</text>
  <text font-size="12" fill="#4b2a6b">${lines(wrap(r.description, 42), 22, 66, 15)}</text>
  <rect x="16" y="115" width="${pill}" height="26" rx="3" fill="#fff" fill-opacity=".9" stroke="#ff5fb4"/>
  ${row(items, 26, 14)}
</g>`,
  );
};
