import { MONO, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Monospace, with a rotating gradient border.";

// Monospace card with a rotating gradient border.
export default (r) => {
  const full = `${r.owner}/${r.name}`;
  const title =
    fit(full, 352, 19) === full
      ? `<tspan fill="#6b7280">${esc(r.owner)}/</tspan><tspan fill="url(#grad)">${esc(r.name)}</tspan>`
      : `<tspan fill="url(#grad)">${esc(fit(r.name, 352, 19))}</tspan>`;
  return svg(
    r.name,
    `<defs>
  <linearGradient id="grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="150">
    <stop offset="0" stop-color="#a855f7"/><stop offset=".5" stop-color="#22d3ee"/><stop offset="1" stop-color="#f472b6"/>
    <animateTransform attributeName="gradientTransform" type="rotate" from="0 200 75" to="360 200 75" dur="6s" repeatCount="indefinite"/>
  </linearGradient>
</defs>
<rect x="1.5" y="1.5" width="397" height="147" rx="13" fill="#060608" stroke="url(#grad)" stroke-width="2.5"/>
<g font-family="${MONO}">
  <text x="24" y="45" font-size="19" font-weight="700">${title}</text>
  <text font-size="12" fill="#a1a1aa">${lines(wrap(r.description, 46), 24, 72, 17)}</text>
  ${row(stats(r, { cy: 121, text: 'fill="#e4e4e7"', icon: 'fill="#22d3ee"' }), 24, 22)}
</g>`,
  );
};
