import { FONT, esc, fit, isLight, motion, row, stats, svg } from "../card.js";

export const about = "Mechanical keyboard: a row of keycaps spelling the start of the name, the first in the language colour, keys pressing down one after another as if typed.";

// A strip of sculpted keycaps on a dark plate; the caps type out the name in a loop.
export default (r) => {
  const keys = [...(r.name.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 7) || "?")];
  const x0 = 200 - (keys.length * 48 - 6) / 2;
  const dur = keys.length * 0.3 + 1.6;
  const cap = (ch, i) => {
    const x = x0 + i * 48, lang = i === 0, ink = lang ? (isLight(r.lang.color) ? "#1b1c20" : "#fff") : "#2b2d33";
    return `<rect x="${x}" y="64" width="42" height="48" rx="6" fill="#000" fill-opacity=".45"/>
  <rect x="${x}" y="61" width="42" height="48" rx="6" fill="${lang ? r.lang.color : "#b9bec7"}"/>${lang ? `<rect x="${x}" y="61" width="42" height="48" rx="6" fill="#000" fill-opacity=".22"/>` : ""}
  <g class="kc-p" style="animation-delay:${(i * 0.3).toFixed(1)}s">
    <rect x="${x + 4}" y="63" width="34" height="38" rx="5" fill="${lang ? r.lang.color : "url(#kc-top)"}"/>
    <rect x="${x + 4}" y="63" width="34" height="38" rx="5" fill="none" stroke="#fff" stroke-opacity=".35"/>
    <text x="${x + 10}" y="82" font-size="15" font-weight="700" fill="${ink}">${esc(ch)}</text>
  </g>`;
  };
  return svg(
    r.name,
    `${motion(`.kc-p{animation:kc-p ${dur.toFixed(1)}s ease-in-out infinite}@keyframes kc-p{0%,${((0.3 / dur) * 100).toFixed(1)}%,100%{transform:translateY(0)}${((0.12 / dur) * 100).toFixed(1)}%{transform:translateY(3px)}}`)}
<defs><linearGradient id="kc-top" x2="0" y2="1"><stop offset="0" stop-color="#f3f4f6"/><stop offset="1" stop-color="#d6d9df"/></linearGradient>
<linearGradient id="kc-bg" x2="0" y2="1"><stop offset="0" stop-color="#2d3036"/><stop offset="1" stop-color="#202226"/></linearGradient></defs>
<rect width="400" height="150" rx="12" fill="url(#kc-bg)"/>
<rect x="${x0 - 8}" y="55" width="${keys.length * 48 + 10}" height="64" rx="8" fill="#16171a"/>
<g font-family="${FONT}">
  <text x="22" y="30" font-size="17" font-weight="700" fill="#f1f2f4">${esc(fit(r.name, 356, 17))}</text>
  <text x="22" y="46" font-size="11" fill="#9aa0aa">${esc(fit(r.description, 356, 11, 0.55))}</text>
  ${keys.map(cap).join("")}
  ${row(stats(r, { cy: 134, size: 11.5, text: 'fill="#d5d8de" font-weight="600"', icon: 'fill="#9aa0aa"' }), 22, 16)}
</g>`,
  );
};
