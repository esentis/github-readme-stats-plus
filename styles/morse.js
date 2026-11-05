import { FONT, MONO, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Telegraph: the name in real Morse code on a paper tape with the letters decoded below, a brass key and signal lamp that tap out the start of the name.";

const CODE = Object.fromEntries("A.- B-... C-.-. D-.. E. F..-. G--. H.... I.. J.--- K-.- L.-.. M-- N-. O--- P.--. Q--.- R.-. S... T- U..- V...- W.-- X-..- Y-.-- Z--.. 0----- 1.---- 2..--- 3...-- 4....- 5..... 6-.... 7--... 8---.. 9----.".split(" ").map((s) => [s[0], s.slice(1)]));
const U = 0.15; // seconds per Morse unit for the lamp

// [lit, units] steps for the start of the text (at most 56 units): dot 1, dash 3, letter gap 3, word gap 7.
const timeline = (text) => {
  const steps = [];
  for (const ch of text) {
    const add = CODE[ch] ? [...CODE[ch]].flatMap((s) => [[1, s === "." ? 1 : 3], [0, 1]]).concat([[0, 2]]) : steps.length ? [[0, 4]] : [];
    if (steps.concat(add).reduce((n, [, u]) => n + u, 0) > 56) break;
    steps.push(...add);
  }
  return steps;
};

// A walnut desk: paper tape across the middle, the key bottom right, a lamp top right.
export default (r) => {
  const up = r.name.toUpperCase();
  let x = 18;
  const marks = [];
  for (const ch of up) {
    if (x > 380) break;
    if (!CODE[ch]) { x += 10; continue; }
    const start = x;
    for (const s of CODE[ch]) {
      marks.push(s === "." ? `<circle cx="${x + 2.1}" cy="65" r="2.3"/>` : `<rect x="${x}" y="62.7" width="12.6" height="4.6" rx="2.3"/>`);
      x += (s === "." ? 4.2 : 12.6) + 4.2;
    }
    if (x - 4.2 <= 384) marks.push(`<text x="${((start + x - 4.2) / 2).toFixed(1)}" y="77" font-size="7" fill="#9a8662" text-anchor="middle" stroke="none">${esc(ch)}</text>`);
    x += 8.4;
  }
  // The lamp and key tap out the start of the name, then rest for a word gap.
  const steps = timeline(up), total = steps.reduce((n, [, u]) => n + u, 7);
  const frames = (on, off, t = 0) => steps.map(([lit, n]) => { const f = `${((t / total) * 100).toFixed(2)}%{${lit ? on : off}}`; t += n; return f; }).join("") + `100%{${off}}`;
  const lamp = frames("opacity:1", "opacity:.18"), key = frames("transform:rotate(-3deg)", "transform:rotate(0deg)");
  return svg(
    r.name,
    `${steps.length ? motion(`.mo-l{animation:mo-l ${(total * U).toFixed(2)}s step-end infinite}@keyframes mo-l{${lamp}}
.mo-k{animation:mo-k ${(total * U).toFixed(2)}s step-end infinite;transform-box:view-box;transform-origin:352px 106px}@keyframes mo-k{${key}}`) : ""}
<defs><linearGradient id="mo-wood" x2="1" y2="1"><stop offset="0" stop-color="#3e2a1c"/><stop offset="1" stop-color="#24170f"/></linearGradient>
<linearGradient id="mo-brass" x2="0" y2="1"><stop offset="0" stop-color="#f0d08a"/><stop offset="1" stop-color="#a67c34"/></linearGradient>
<radialGradient id="mo-lit"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="${r.lang.color}"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity="0"/></radialGradient>
<filter id="mo-sh" x="-5%" y="-30%" width="110%" height="180%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.2" flood-opacity=".5"/></filter></defs>
<rect width="400" height="150" rx="12" fill="url(#mo-wood)"/>
<path d="M0 53H400V79H0Z" fill="#f1e6c8" filter="url(#mo-sh)"/>
<path d="M0 55.5H400M0 76.5H400" stroke="#d8c9a3" stroke-dasharray="2 4"/>
<g fill="#1d2a44" font-family="${MONO}">${marks.join("")}</g>
<circle cx="372" cy="27" r="12" fill="url(#mo-brass)"/><circle cx="372" cy="27" r="8.5" fill="#2a1d14"/>
<g class="mo-l"><circle cx="372" cy="27" r="15" fill="url(#mo-lit)"/><circle cx="372" cy="27" r="7" fill="${r.lang.color}"/></g>
<rect x="258" y="126" width="128" height="14" rx="3" fill="#5a3a22"/><rect x="272" y="120" width="104" height="7" rx="2" fill="url(#mo-brass)"/>
<rect x="344" y="102" width="16" height="19" rx="2" fill="url(#mo-brass)"/><circle cx="286" cy="117" r="3" fill="url(#mo-brass)"/><circle cx="268" cy="123" r="4" fill="#c9a46a"/><circle cx="380" cy="123" r="4" fill="#c9a46a"/>
<path d="M318 120l3-3l-3-3l3-3l-3-3" fill="none" stroke="#c9a46a" stroke-width="1.4"/>
<g class="mo-k"><rect x="282" y="102" width="82" height="5" rx="2" fill="url(#mo-brass)"/><rect x="284" y="94" width="4" height="9" fill="#2b2b2b"/><ellipse cx="286" cy="94" rx="12" ry="4.5" fill="#151515"/><ellipse cx="286" cy="92.5" rx="10" ry="2.8" fill="#3a3a3a"/></g>
<g font-family="${FONT}">
  <text x="20" y="22" font-family="${MONO}" font-size="8.5" fill="#c9a46a" letter-spacing="1.5">${esc(fit(`TELEGRAM · FROM ${r.owner.toUpperCase()}`, 320, 8.5, 0.75))}</text>
  <text x="20" y="44" font-size="18" font-weight="700" fill="#f3e7cf">${esc(fit(r.name, 320, 18))}</text>
  <text font-size="11" fill="#d9c9a8">${lines(wrap(r.description, 38), 20, 99, 14)}</text>
  ${row(stats(r, { cy: 133, size: 11.5, text: 'fill="#f3e7cf" font-weight="600"', icon: 'fill="#c9a46a"' }), 20, 14)}
</g>`,
  );
};
