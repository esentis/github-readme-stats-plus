import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Vintage library catalog card: ruled lines, a red heading line, a call number and typewriter text.";

const TYPE = "'Courier New', Courier, ui-monospace, monospace";

// A library index card: typed author and title entry, a call number in the margin and a punched hole.
export default (r) => {
  const call = [r.lang.name.slice(0, 3).toUpperCase(), `★${r.stars}`, `.${r.owner[0].toUpperCase()}${r.name.length}`];
  return svg(
    r.name,
    `${motion(".cg-caret { animation: cg-caret 2s step-end infinite } @keyframes cg-caret { 0% { fill-opacity: 1 } 50% { fill-opacity: 0 } }")}
<defs><mask id="hole"><rect width="400" height="150" rx="5" fill="#fff"/><circle cx="200" cy="138" r="6" fill="#000"/></mask></defs>
<g mask="url(#hole)">
  <rect width="400" height="150" fill="#fbf6e6"/>
  <path d="M0 50.5H400M0 68.5H400M0 86.5H400M0 104.5H400M0 122.5H400" stroke="#9cc3e0" stroke-opacity=".7"/>
  <path d="M0 30.5H400" stroke="#d9473c" stroke-width="1.5"/>
  <path d="M72.5 0V150" stroke="#d9473c" stroke-opacity=".35"/>
</g>
<circle cx="200" cy="138" r="6" fill="none" stroke="#d8ceb4"/>
<g font-family="${TYPE}" fill="#2a2724">
  <text font-size="11.5" font-weight="700">${lines(call.map((s) => fit(s, 58, 11.5)), 14, 48, 18)}</text>
  <text x="84" y="25" font-size="12">${esc(fit(`${r.owner}.`, 296, 12))}</text>
  <text x="96" y="47" font-size="13" font-weight="700">${esc(fit(r.name, 286, 13))}</text>
  <text font-size="11.5">${lines(wrap(r.description, 40), 96, 65, 18)}</text>
  <text x="84" y="101" font-size="11.5">${esc(fit(r.lang.name, 120, 11.5))}. ★ ${esc(r.stars)} ; ⑂ ${esc(r.forks)}.</text>
  <text x="84" y="119" font-size="10" fill="#6b645a">1. ${esc(fit(r.lang.name, 90, 10))} -- Repositories. I. Title.<tspan class="cg-caret" fill-opacity="0">_</tspan></text>
</g>`,
  );
};
