import { FONT, esc, fit, isLight, svg } from "../card.js";

export const about = "Festival wristband: woven fabric strip in the language colour with the repo name, a plastic clasp and a passing sheen. Shows no description.";

// A woven festival wristband across a dark card, with a plastic slider clasp and an all-access tag line.
export default (r) => {
  const ink = isLight(r.lang.color) ? "#1a1430" : "#fff";
  const confetti = [[150, 20, "#ff4fa0"], [190, 34, "#3ee0c8"], [236, 16, "#ffd23f"], [270, 32, "#8b6cff"], [300, 18, "#3ee0c8"]]
    .map(([x, y, c], i) => `<rect x="${x}" y="${y}" width="7" height="3" rx="1" fill="${c}" transform="rotate(${i * 50 - 60} ${x} ${y})"/>`)
    .join("");
  return svg(
    r.name,
    `<defs>
  <pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="#000" fill-opacity=".14"/><rect x="3" y="3" width="3" height="3" fill="#000" fill-opacity=".14"/><path d="M0 1.5H6" stroke="#fff" stroke-opacity=".08"/></pattern>
  <linearGradient id="sheen" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="clasp" x2="0" y2="1"><stop offset="0" stop-color="#f4f4f6"/><stop offset=".5" stop-color="#b9bcc6"/><stop offset="1" stop-color="#7d808c"/></linearGradient>
  <clipPath id="band"><rect x="-10" y="50" width="420" height="50"/></clipPath>
</defs>
<rect width="400" height="150" rx="12" fill="#1a1430"/>
${confetti}
<g font-family="${FONT}" font-weight="800">
  <text x="20" y="34" font-size="10" fill="#ffd23f" letter-spacing="3">ALL ACCESS</text>
  <text x="380" y="36" font-size="18" fill="#fff" text-anchor="end">★ ${esc(r.stars)}</text>
  <g transform="rotate(-3 200 75)">
    <g clip-path="url(#band)">
      <rect x="-10" y="50" width="420" height="50" fill="${r.lang.color}"/>
      <rect x="-10" y="50" width="420" height="50" fill="url(#weave)"/>
      <path d="M-10 54H410M-10 96H410" stroke="#ff4fa0" stroke-width="3"/><path d="M-10 58.5H410M-10 91.5H410" stroke="#ffd23f" stroke-width="1.5"/>
      <rect x="-80" y="50" width="70" height="50" fill="url(#sheen)"><animate attributeName="x" values="-80;420;420" keyTimes="0;.5;1" dur="5s" repeatCount="indefinite"/></rect>
    </g>
    <text x="24" y="80" font-size="16" fill="${ink}" letter-spacing="2">${esc(fit(r.name.toUpperCase(), 250, 16, 0.78))}</text>
    <rect x="296" y="44" width="40" height="62" rx="7" fill="url(#clasp)" stroke="#5c5f6b"/>
    <path d="M304 56H328M304 62H328M304 68H328M304 82H328M304 88H328M304 94H328" stroke="#6d707b" stroke-width="1.5"/>
    <circle cx="316" cy="75" r="4" fill="#5c5f6b"/>
  </g>
  <text x="20" y="130" font-size="11" fill="#c7c0e0">${esc(fit(r.lang.name.toUpperCase(), 140, 11, 0.7))} STAGE</text>
  <text x="380" y="130" font-size="11" fill="#c7c0e0" text-anchor="end">⑂ ${esc(r.forks)} · ${esc(fit("@" + r.owner, 140, 11))}</text>
</g>`,
  );
};
