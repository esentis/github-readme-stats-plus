import { esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Y2K chrome: iridescent silver-blue bubble card, a chrome title, a glossy orb in the language colour and twinkling sparkles.";

const BUBBLE = "'Arial Rounded MT Bold', 'Trebuchet MS', Verdana, sans-serif";

// A four-point sparkle that twinkles.
const sparkle = (x, y, s, delay) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10C1-2 2-1 10 0C2 1 1 2 0 10C-1 2-2 1-10 0C-2-1-1-2 0-10Z" fill="#fff" stroke="#9fc3ff" stroke-width=".6"><animate attributeName="opacity" values="1;.15;1" dur="2.4s" begin="${delay}s" repeatCount="indefinite"/></path>`;

// Early-2000s web: iridescent chrome bubble card, aqua gel buttons, glossy orb and sparkles.
export default (r) => {
  const pills = stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 100, 12) } }, { cy: 118, size: 12, text: 'fill="#fff" font-weight="700"', icon: 'fill="#fff"' });
  return svg(
    r.name,
    `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef4fc"/><stop offset=".35" stop-color="#c9d8ee"/><stop offset=".6" stop-color="#f1e6ff"/><stop offset=".8" stop-color="#c4ecff"/><stop offset="1" stop-color="#dfe7f3"/></linearGradient>
  <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#8d9bb3"/><stop offset=".55" stop-color="#5f6d87"/><stop offset="1" stop-color="#e6edf7"/></linearGradient>
  <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".48" stop-color="#9fb2cf"/><stop offset=".52" stop-color="#2d3b5c"/><stop offset=".75" stop-color="#7d93b8"/><stop offset="1" stop-color="#e8f0ff"/></linearGradient>
  <linearGradient id="gel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6cc4ff"/><stop offset="1" stop-color="#0a4fb5"/></linearGradient>
  <radialGradient id="orb" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></radialGradient>
</defs>
<rect x="2" y="2" width="396" height="146" rx="28" fill="url(#bg)" stroke="url(#rim)" stroke-width="4"/>
<g fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".8"><circle cx="356" cy="112" r="20"/><circle cx="384" cy="74" r="8"/><circle cx="326" cy="134" r="7"/></g>
<circle cx="48" cy="52" r="24" fill="${r.lang.color}"/>
<circle cx="48" cy="52" r="24" fill="url(#orb)" stroke="#fff" stroke-opacity=".8" stroke-width="1.5"/>
<ellipse cx="44" cy="40" rx="13" ry="7" fill="#fff" fill-opacity=".75"/>
${sparkle(372, 26, 1, 0)}${sparkle(346, 16, 0.55, 0.8)}${sparkle(22, 118, 0.6, 1.6)}
<g font-family="${BUBBLE}">
  <text x="84" y="54" font-size="23" font-weight="700" font-style="italic" fill="url(#chrome)" stroke="#1f2d4d" stroke-width=".8">${esc(fit(r.name, 250, 23, 0.62))}</text>
  <text font-size="11.5" fill="#2b3a5a">${lines(wrap(r.description, 44), 84, 74, 14)}</text>
  ${row(
    pills.map(([w, s]) => [
      w + 26,
      `<rect y="105" width="${w + 26}" height="26" rx="13" fill="url(#gel)" stroke="#0a3d8f" stroke-width=".8"/><rect x="5" y="107" width="${w + 16}" height="10" rx="5" fill="#fff" fill-opacity=".45"/><g transform="translate(13 0)">${s}</g>`,
    ]),
    40,
    8,
  )}
</g>`,
  );
};
