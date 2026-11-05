import { MONO, esc, fit, isLight, svg, textWidth, words } from "../card.js";

export const about = "Stock-ticker terminal: repo as a ticker symbol, green ▲ star count, sparkline, and a scrolling tape with the description.";

// A rising sparkline that stays the same for a repo: the wiggle comes from the name's character codes.
const spark = (name) =>
  Array.from({ length: 24 }, (_, i) => {
    const y = 108 - i * 1.6 - (name.charCodeAt(i % name.length) % 9) * 2;
    return `${20 + i * (360 / 23)},${y.toFixed(1)}`;
  }).join(" ");

// Dark trading terminal with an animated tape scrolling along the bottom.
export default (r) => {
  const parts = words(r.name.toUpperCase().replace(/[^A-Z0-9_.\s-]/g, ""));
  const sym = (parts.length > 1 ? parts.map((p) => p[0]).join("") : parts[0]).slice(0, 5) || "REPO";
  const tapeText = `${sym} ▲${r.stars} · ⑂${r.forks} · ${r.lang.name.toUpperCase()} · ${fit(r.description, 600, 10)} ·`;
  const w = textWidth(tapeText, 10) + 12;
  const pts = spark(r.name);
  return svg(
    r.name,
    `<defs>
  <linearGradient id="area" x2="0" y2="1"><stop offset="0" stop-color="#22e07a" stop-opacity=".35"/><stop offset="1" stop-color="#22e07a" stop-opacity="0"/></linearGradient>
  <clipPath id="tape"><rect y="126" width="400" height="24"/></clipPath>
  <clipPath id="card"><rect width="400" height="150" rx="10"/></clipPath>
</defs>
<g clip-path="url(#card)">
<rect width="400" height="150" fill="#07100b"/>
<path d="M20 60H380M20 84H380M20 108H380" stroke="#14281c" stroke-dasharray="2 3"/>
<polygon points="20,118 ${pts} 380,118" fill="url(#area)"/>
<polyline points="${pts}" fill="none" stroke="#22e07a" stroke-width="1.6" stroke-linejoin="round"/>
<rect y="126" width="400" height="24" fill="#0f2017"/>
<g font-family="${MONO}" font-weight="700">
  <text x="20" y="34" font-size="24" fill="#f2f2f2">${esc(sym)}</text>
  <rect x="${28 + textWidth(sym, 24)}" y="18" width="${textWidth(fit(r.lang.name, 80, 9), 9) + 12}" height="16" rx="3" fill="${r.lang.color}"/>
  <text x="${34 + textWidth(sym, 24)}" y="29.5" font-size="9" fill="${isLight(r.lang.color) ? "#111" : "#fff"}">${esc(fit(r.lang.name, 80, 9))}</text>
  <text x="20" y="50" font-size="10" font-weight="400" fill="#7f9a88">${esc(fit(r.name, 220, 10))}</text>
  <text x="380" y="34" font-size="22" fill="#22e07a" text-anchor="end">▲ ${esc(r.stars)}</text>
  <text x="380" y="50" font-size="10" font-weight="400" fill="#7f9a88" text-anchor="end">★ STARS · ⑂ ${esc(r.forks)}</text>
  <g clip-path="url(#tape)" font-size="10" fill="#ffd34d">
    <text y="142">${Array.from({ length: Math.ceil(400 / w) + 1 }, (_, i) => `<tspan x="${8 + i * w}">${esc(tapeText)}</tspan>`).join("")}
      <animateTransform attributeName="transform" type="translate" from="0 0" to="${-w} 0" dur="${Math.max(8, Math.round(w / 30))}s" repeatCount="indefinite"/></text>
  </g>
</g>
</g>`,
  );
};
