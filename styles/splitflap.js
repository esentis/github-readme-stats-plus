import { MONO, esc, svg } from "../card.js";

const tiles = (text, x, y, fill) =>
  [...text]
    .map(
      (c, i) =>
        `<rect x="${x + i * 21}" y="${y}" width="19" height="28" rx="2" fill="#262626"/><text x="${x + i * 21 + 9.5}" y="${y + 21}" fill="${fill}">${esc(c)}</text>`,
    )
    .join("") + `<path d="M${x} ${y + 14}h${[...text].length * 21 - 2}" stroke="#0a0a0a"/>`;

// An airport split-flap departures board: 17 tiles per row.
export default (r) => {
  const name = r.name.toUpperCase();
  const row1 = name.length > 17 ? name.slice(0, 16) + "…" : name.padEnd(17);
  const lang = r.lang.name.toUpperCase().slice(0, 10).padEnd(10);
  return svg(
    r.name,
    `<rect width="400" height="150" rx="10" fill="#141414"/>
<g font-family="${MONO}" font-weight="700">
  <text x="22" y="24" font-size="9" letter-spacing="3" fill="#ffcc00">DEPARTURES</text>
  <g font-size="18" text-anchor="middle">
    ${tiles(row1, 22, 32, "#f5f5f5")}
    ${tiles(lang, 22, 70, "#f5f5f5")}
    ${tiles(`★${r.stars}`.padStart(6).slice(-6), 253, 70, "#ffcc00")}
    ${tiles(`FORKS ${r.forks}`.slice(0, 10).padEnd(10), 22, 108, "#f5f5f5")}
    <g>${tiles("BOARD", 274, 108, "#4ade80")}<animate attributeName="opacity" values="1;1;.25;1" keyTimes="0;.6;.8;1" dur="2s" repeatCount="indefinite"/></g>
  </g>
</g>`,
  );
};
