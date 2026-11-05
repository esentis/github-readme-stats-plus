import { FONT, esc, fit, svg } from "../card.js";

const HAND = "'Marker Felt', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

const reel = (cx) => `<g transform="translate(${cx} 82)">
    <circle r="14" fill="#f3ead7"/>
    <g><circle r="7" fill="#2b2b2e"/><path d="M-7 0H7M0-7V7" stroke="#f3ead7" stroke-width="2"/>
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite"/></g>
  </g>`;

// A cassette tape with a hand-written label and spinning reels.
export default (r) =>
  svg(
    r.name,
    `<defs><clipPath id="label"><rect x="22" y="14" width="356" height="96" rx="6"/></clipPath></defs>
<rect width="400" height="150" rx="12" fill="#2b2b2e"/>
<g fill="#55555a"><circle cx="12" cy="12" r="3"/><circle cx="388" cy="12" r="3"/><circle cx="12" cy="138" r="3"/><circle cx="388" cy="138" r="3"/></g>
<rect x="22" y="14" width="356" height="96" rx="6" fill="#f3ead7"/>
<g clip-path="url(#label)"><rect x="22" y="14" width="356" height="10" fill="${r.lang.color}"/><rect x="22" y="24" width="356" height="4" fill="#f59e0b"/></g>
<rect x="30" y="34" width="20" height="20" rx="3" fill="#2b2b2e"/>
<g font-family="${FONT}" font-weight="700">
  <text x="40" y="49" font-size="13" fill="#f3ead7" text-anchor="middle">A</text>
  <text x="30" y="86" font-size="11" fill="#2b2b2e">${esc(fit(r.lang.name, 70, 11))}</text>
  <text x="370" y="86" font-size="11" fill="#2b2b2e" text-anchor="end">★${esc(r.stars)} ⑂${esc(r.forks)}</text>
</g>
<text x="60" y="49" font-family="${HAND}" font-size="19" fill="#1e3a8a">${esc(fit(r.name, 300, 19, 0.55))}</text>
<line x1="58" y1="55" x2="368" y2="55" stroke="#c9bfa8"/>
<rect x="110" y="62" width="180" height="40" rx="20" fill="#1a1a1a"/>
<rect x="164" y="74" width="72" height="16" fill="#5a3b25" fill-opacity=".8"/>
${reel(150)}
${reel(250)}
<path d="M90 150L104 118H296L310 150Z" fill="#232326"/>
<g fill="#111"><circle cx="130" cy="136" r="4"/><circle cx="270" cy="136" r="4"/><rect x="180" y="128" width="8" height="8"/><rect x="212" y="128" width="8" height="8"/></g>`,
  );
