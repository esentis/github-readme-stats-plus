import { FONT, esc, fit, lines, svg, textWidth, wrap } from "../card.js";

export const about = "Dark analytics dashboard: KPI tiles and a decorative sparkline unique to each repo, drawing itself in.";

// The sparkline's shape comes from the repo name, so it stays the same on every render.
const spark = (seed, x, y, w, h) => {
  let s = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pts = Array.from({ length: 12 }, (_, i) => {
    s = (s * 1103515245 + 12345) >>> 0;
    const v = 0.15 + 0.6 * (i / 11) * 0.6 + ((s >>> 16) % 1000) / 1000 * 0.45;
    return [x + (i * w) / 11, y + h - Math.min(v, 1) * h];
  });
  return pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`);
};

const kpi = (x, w, label, value) =>
  `<rect x="${x}" y="52" width="${w}" height="56" rx="8" fill="#141922" stroke="#232a36"/>
  <text x="${x + 10}" y="68" font-size="9" font-weight="700" letter-spacing="1" fill="#7d8799">${label}</text>${value}`;

// Dark analytics dashboard: header, three KPI tiles, a trend sparkline in the language colour.
export default (r) => {
  const p = spark(r.name, 264, 64, 112, 36);
  const owner = fit(`${r.owner} /`, 120, 12);
  return svg(
    r.name,
    `<defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${r.lang.color}" stop-opacity=".45"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity="0"/></linearGradient></defs>
<rect width="400" height="150" rx="12" fill="#0b0e14"/>
<rect x=".5" y=".5" width="399" height="149" rx="11.5" fill="none" stroke="#232a36"/>
<g font-family="${FONT}">
  <circle cx="22" cy="26" r="4" fill="${r.lang.color}"/>
  <text x="32" y="30" font-size="12" fill="#7d8799">${esc(owner)} <tspan font-size="14" font-weight="700" fill="#fff">${esc(fit(r.name, 300 - textWidth(owner, 12), 14))}</tspan></text>
  <text x="384" y="30" font-size="9" font-weight="700" letter-spacing="1" fill="#3fb950" text-anchor="end">● PUBLIC<animate attributeName="opacity" values="1;.35;1" dur="2s" repeatCount="indefinite"/></text>
  <line x1="16" y1="42" x2="384" y2="42" stroke="#232a36"/>
  ${kpi(16, 62, "STARS", `<text x="26" y="96" font-size="22" font-weight="800" fill="#fff">${esc(r.stars)}</text>`)}
  ${kpi(84, 62, "FORKS", `<text x="94" y="96" font-size="22" font-weight="800" fill="#fff">${esc(r.forks)}</text>`)}
  ${kpi(152, 96, "LANGUAGE", `<text x="162" y="91" font-size="12.5" font-weight="700" fill="#fff">${esc(fit(r.lang.name, 76, 12.5))}</text><rect x="162" y="97" width="76" height="4" rx="2" fill="${r.lang.color}"/>`)}
  ${kpi(256, 128, "SIGNATURE", "")}
  <path d="M${p.join("L")}L376 100L264 100Z" fill="url(#area)"/>
  <path d="M${p.join("L")}" fill="none" stroke="${r.lang.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" pathLength="1" stroke-dasharray="1"><animate attributeName="stroke-dashoffset" values="1;0" dur="1.6s" fill="freeze"/></path>
  <circle cx="${p[11].split(" ")[0]}" cy="${p[11].split(" ")[1]}" r="3" fill="#fff" stroke="${r.lang.color}" stroke-width="2"/>
  <text font-size="11" fill="#8b95a7">${lines(wrap(r.description, 62), 16, 126, 14)}</text>
</g>`,
  );
};
