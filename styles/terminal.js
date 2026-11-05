import { MONO, esc, fit, lines, svg, wrap } from "../card.js";

// Green phosphor terminal window with scanlines and a blinking cursor.
export default (r) => {
  const status = [
    ["lang", r.lang.name.toLowerCase(), "#5eead4"],
    ["stars", r.stars, "#fde047"],
    ["forks", r.forks, "#f9a8d4"],
  ];
  // Monospace, so the cursor position is exact: characters × 7.5px at 12.5px.
  const statusLength = status.reduce((n, [k, v]) => n + k.length + 1 + v.length + 1, -1);
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="10"/></clipPath>
  <pattern id="scan" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" opacity=".35"/></pattern>
  <filter id="glow"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#04170a"/>
  <rect width="400" height="22" fill="#0b2a14"/>
  <circle cx="14" cy="11" r="4" fill="#ff5f57"/><circle cx="28" cy="11" r="4" fill="#febc2e"/><circle cx="42" cy="11" r="4" fill="#28c840"/>
  <g font-family="${MONO}" fill="#39ff6a" filter="url(#glow)">
    <text x="18" y="48" font-size="15" font-weight="700">${esc(fit(`~/${r.owner} $ cat ${r.name}`, 364, 15))}</text>
    <text font-size="12" fill="#a7f3b8">${lines(wrap(r.description, 48), 18, 74, 17)}</text>
    <text x="18" y="124" font-size="12.5">${status.map(([k, v, c]) => `${k}=<tspan fill="${c}">${esc(v)}</tspan>`).join(" ")}</text>
    <rect x="${18 + statusLength * 7.5 + 10}" y="113" width="8" height="14" fill="#39ff6a"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.5;.5;1" dur="1.1s" repeatCount="indefinite"/></rect>
  </g>
  <rect width="400" height="150" fill="url(#scan)"/>
</g>`,
  );
};
