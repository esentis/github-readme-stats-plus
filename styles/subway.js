import { FONT, esc, fit, isLight, motion, svg } from "../card.js";

export const about = "Transit map: one line in the language colour with stations for the owner, language, stars and forks.";

// A station: white stop on the line with its name above or below.
const stop = (x, y, label, above, end) =>
  `<circle cx="${x}" cy="${y}" r="${end ? 7 : 5.5}" fill="#fff" stroke="#1b1b1b" stroke-width="${end ? 3 : 2.5}"/>
  <text x="${x - 6}" y="${above ? y - 14 : y + 24}">${esc(label)}</text>`;

// A metro map fragment: a line bullet with the repo name, and the line with a 45° jog.
export default (r) => {
  const c = r.lang.color;
  return svg(
    r.name,
    `${motion(".sw-train{opacity:1}")}
<rect x=".5" y=".5" width="399" height="149" rx="12" fill="#fbfbf8" stroke="#e3e3df"/>
<path d="M24 94H180L202 116H376" fill="none" stroke="#e1e1dc" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M24 94H180L202 116H376" fill="none" stroke="${c}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
<g class="sw-train" opacity="0"><circle r="2.8" fill="#fff" stroke="#1b1b1b"><animateMotion dur="9s" repeatCount="indefinite" path="M24 94H180L202 116H376"/><animate attributeName="opacity" dur="9s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.06;.94;1"/></circle></g>
<g font-family="${FONT}" font-weight="700">
  <circle cx="37" cy="29" r="14" fill="${c}"/>
  <text x="37" y="35" font-size="16" fill="${isLight(c) ? "#111" : "#fff"}" text-anchor="middle">${esc(r.name.slice(0, 1).toUpperCase())}</text>
  <text x="59" y="35" font-size="17" fill="#1b1b1b">${esc(fit(r.name, 320, 17))}</text>
  <text x="24" y="58" font-size="11" font-weight="400" fill="#6b6b66">${esc(fit(r.description, 352, 11, 0.55))}</text>
  <g font-size="11.5" fill="#1b1b1b">
    ${stop(40, 94, fit(r.owner, 100, 11.5), true, true)}
    ${stop(150, 94, fit(r.lang.name, 100, 11.5), true)}
    ${stop(250, 116, `★ ${r.stars}`, false)}
    ${stop(356, 116, `⑂ ${r.forks}`, false, true)}
  </g>
</g>`,
  );
};
