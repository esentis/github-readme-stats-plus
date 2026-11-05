import { FONT, esc, fit, isLight, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Morning sea: rolling wave bands, a rising sun and a sailboat in the language colour.";

// A periodic wave band (crest every `len` px) that scrolls one period sideways, so the loop is seamless.
const wave = (y, amp, len, fill, dur, dir = 1) => {
  const n = Math.ceil((400 + 2 * len) / (len / 2));
  const d = `M${-len} ${y}q${len / 4} ${-amp} ${len / 2} 0` + `t${len / 2} 0`.repeat(n - 1) + `V150H${-len}Z`;
  return `<path d="${d}" fill="${fill}"><animateTransform attributeName="transform" type="translate" from="0 0" to="${dir * len} 0" dur="${dur}s" repeatCount="indefinite"/></path>`;
};

// Waves: pale morning sky, low sun with glints on the water, layered rolling waves.
export default (r) =>
  svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="#bfe6fb"/><stop offset=".7" stop-color="#fef6e4"/></linearGradient>
  <radialGradient id="glow"><stop offset="0" stop-color="#fff7d6"/><stop offset=".35" stop-color="#fde68a" stop-opacity=".6"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <circle cx="330" cy="98" r="54" fill="url(#glow)"/><circle cx="330" cy="98" r="17" fill="#fff4cf"/>
  ${wave(98, 2.5, 60, "#7cc8ec", 7, -1)}
  ${wave(106, 3.5, 90, "#3ba4d9", 9)}
  <g transform="translate(232 101)"><path d="M0 0V-22L13 0Z" fill="${r.lang.color}" stroke="${isLight(r.lang.color) ? "#0c4a6e" : "none"}" stroke-width=".8"/><path d="M-9 2H18L14 7H-5Z" fill="#0c4a6e"/>
    <animateTransform attributeName="transform" type="translate" values="232 101;232 98;232 101" dur="3s" repeatCount="indefinite"/></g>
  ${wave(116, 4, 120, "#1479b4", 11, -1)}
  <g stroke="#fffbe8" stroke-width="1.5" stroke-linecap="round"><path d="M316 112h12M334 119h18M320 126h10"><animate attributeName="opacity" values="1;.2;1" dur="2.5s" repeatCount="indefinite"/></path></g>
  ${wave(126, 4, 150, "#0c4a6e", 14)}
</g>
<g font-family="${FONT}">
  <text x="24" y="38" font-size="21" font-weight="700" fill="#0c3550">${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13" fill="#285a78">${lines(wrap(r.description, 46), 24, 60, 17)}</text>
  ${row(stats(r, { cy: 139, size: 12, text: 'fill="#fff"', icon: 'fill="#bae6fd"' }), 24, 16)}
</g>`,
  );
