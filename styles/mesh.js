import { FONT, esc, fit, row, stats, svg, textWidth } from "../card.js";

export const about = "Gradient mesh: big soft organic blobs in the language colour and its hue-shifted complements behind a clean white label.";

const R = [1, 0.78, 1.12, 0.86, 1.05, 0.8];

// A soft closed blob: six uneven lobes joined by quadratic curves through their midpoints.
const blob = (cx, cy, s, attrs) => {
  const p = R.map((k, i) => [cx + Math.cos(i * 1.047) * s * k, cy + Math.sin(i * 1.047) * s * k * 0.8]);
  const mid = (i) => p[i % 6].map((v, j) => ((v + p[(i + 1) % 6][j]) / 2).toFixed(1)).join(" ");
  return `<path ${attrs} d="M${mid(0)}${p.map((_, i) => `Q${p[(i + 1) % 6].map((v) => v.toFixed(1)).join(" ")} ${mid(i + 1)}`).join("")}Z"/>`;
};

// Light card washed with blurred blobs; the repo sits on a frosted white label.
export default (r) => {
  const c = r.lang.color;
  const owner = fit(r.owner, 200, 11);
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="16"/></clipPath>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
  <filter id="h1"><feColorMatrix type="hueRotate" values="140"/></filter>
  <filter id="h2"><feColorMatrix type="hueRotate" values="230"/></filter>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#f4f0ff"/>
  <g filter="url(#soft)">
    ${blob(60, 140, 90, 'fill="#7c5cff" opacity=".7"')}
    ${blob(380, 130, 80, 'fill="#ff7eb6" opacity=".75"')}
    ${blob(90, 20, 100, `fill="${c}"`)}
    ${blob(300, 10, 95, `fill="${c}" filter="url(#h1)"`)}
    ${blob(210, 80, 70, `fill="${c}" filter="url(#h2)" opacity=".8"`)}
  </g>
</g>
<rect x="16" y="14" width="${textWidth(owner, 11) + 20}" height="22" rx="11" fill="#fff" fill-opacity=".75"/>
<rect x="16" y="50" width="368" height="86" rx="14" fill="#fff" fill-opacity=".86" stroke="#fff"/>
<g font-family="${FONT}">
  <text x="26" y="29" font-size="11" font-weight="700" fill="#1f1b2e">${esc(owner)}</text>
  <text x="32" y="78" font-size="18" font-weight="700" fill="#16121f">${esc(fit(r.name, 336, 18))}</text>
  <text x="32" y="97" font-size="11.5" fill="#5b5668">${esc(fit(r.description, 336, 11.5, 0.55))}</text>
  ${row(stats(r, { cy: 118, size: 12, text: 'fill="#16121f"', icon: 'fill="#6b6578"' }), 32, 18)}
</g>`,
  );
};
