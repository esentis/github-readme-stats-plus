import { FONT, esc, fit, motion, svg } from "../card.js";

export const about = "Wine bottle label: cream paper on dark glass, the owner as the estate, language as the region, star count as the vintage, with a shimmering foil band.";

const SERIF = "Georgia, 'Times New Roman', serif";

// A cream label with double gold rules, centred on a dark green bottle.
export default (r) => {
  const c = r.lang.color;
  return svg(
    r.name,
    `<defs>
  <linearGradient id="glass" x2="1"><stop offset="0" stop-color="#0d1a13"/><stop offset=".12" stop-color="#2b4a37"/><stop offset=".3" stop-color="#14251b"/><stop offset=".85" stop-color="#0f1d15"/><stop offset="1" stop-color="#22392b"/></linearGradient>
  <linearGradient id="paper" x2="0" y2="1"><stop offset="0" stop-color="#f7f0de"/><stop offset="1" stop-color="#ece1c6"/></linearGradient>
  <linearGradient id="glint" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <clipPath id="foil"><rect x="36" y="14" width="328" height="7"/></clipPath>
</defs>
${motion(`.wl-glint{animation:wl-glint 7s ease-in-out infinite}@keyframes wl-glint{0%,100%{transform:translateX(0)}50%{transform:translateX(300px)}}`)}
<rect width="400" height="150" rx="12" fill="url(#glass)"/>
<rect x="36" y="8" width="328" height="134" rx="2" fill="url(#paper)"/>
<rect x="36" y="14" width="328" height="7" fill="${c}"/>
<g clip-path="url(#foil)"><rect class="wl-glint" x="20" y="14" width="40" height="7" fill="url(#glint)" opacity=".7"/></g>
<g fill="none" stroke="#a88a4e"><rect x="44" y="27" width="312" height="109"/><rect x="47" y="30" width="306" height="103" stroke-width=".6"/></g>
<g font-family="${SERIF}" text-anchor="middle" fill="#3a2418">
  <text x="200" y="46" font-size="8.5" letter-spacing="3" fill="#7a5f34">${esc(fit(`DOMAINE ${r.owner.toUpperCase()}`, 280, 8.5, 0.85))}</text>
  <text x="200" y="70" font-size="23" font-style="italic" font-weight="700">${esc(fit(r.name, 272, 23, 0.55))}</text>
  <path d="M138 80H188M212 80H262" stroke="#a88a4e"/><path d="M200 75L205 80L200 85L195 80Z" fill="${c}" stroke="#a88a4e" stroke-width=".6"/>
  <text x="200" y="96" font-size="9.5" font-style="italic" fill="#5e4a36">${esc(fit(r.description, 284, 9.5, 0.5))}</text>
  <text x="200" y="110" font-size="7.5" letter-spacing="2" fill="#7a5f34">${esc(fit(`${r.lang.name.toUpperCase()} REGION · ⑂ ${r.forks} CASKS`, 280, 7.5, 0.85))}</text>
  <text x="200" y="127" font-family="${FONT}" font-size="12.5" font-weight="700" letter-spacing="1.5" fill="#7a1f2b">VINTAGE ★ ${esc(r.stars)}</text>
</g>`,
  );
};
