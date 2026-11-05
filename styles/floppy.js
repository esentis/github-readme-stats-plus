import { FONT, MONO, esc, fit, lines, svg, wrap } from "../card.js";

const HAND = "'Marker Felt', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

// A 3.5" floppy disk in the language colour, with the repo written on its label.
export default (r) =>
  svg(
    r.name,
    `<rect x=".5" y=".5" width="399" height="149" rx="10" fill="#e9edf2" stroke="#cfd6de"/>
<path d="M20 15H128L140 27V135H20Z" fill="${r.lang.color}"/>
<path d="M20 15H128L140 27V135H20Z" fill="#000" fill-opacity=".15"/>
<rect x="48" y="15" width="64" height="38" fill="#c7cdd4"/>
<rect x="88" y="21" width="14" height="26" fill="#6b7280"/>
<rect x="26" y="122" width="8" height="8" fill="#111"/>
<rect x="34" y="68" width="92" height="60" rx="3" fill="#fff"/>
<path d="M40 96H120M40 110H120" stroke="#dbe3ec"/>
<text x="40" y="88" font-family="${HAND}" font-size="13" fill="#1e3a8a">${esc(fit(r.name, 84, 13, 0.5))}</text>
<text x="40" y="106" font-family="${MONO}" font-size="10" fill="#374151">★${esc(r.stars)} ⑂${esc(r.forks)}</text>
<text x="40" y="121" font-family="${FONT}" font-size="9" fill="#6b7280">${esc(fit(r.lang.name, 80, 9))}</text>
<g font-family="${FONT}">
  <text x="160" y="44" font-size="20" font-weight="700" fill="#111827">${esc(fit(r.name, 222, 20))}</text>
  <text font-size="12.5" fill="#4b5563">${lines(wrap(r.description, 34), 160, 68, 17)}</text>
  <text x="160" y="126" font-size="10.5" font-weight="600" fill="#6b7280" letter-spacing="1">CAPACITY  ★ ${esc(r.stars)} · ⑂ ${esc(r.forks)}</text>
</g>`,
  );
