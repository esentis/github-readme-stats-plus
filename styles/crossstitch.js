// Cross-stitch: a heart in language-colour x-stitches on aida cloth in a wooden hoop, needle and thread still working the last stitch.
import { FONT, esc, fit, lines, motion, stats, row, svg, wrap } from "../card.js";

export const about = "Cross-stitch: a heart sewn in language-colour x-stitches on aida cloth in a wooden hoop, the needle and thread bobbing over the unfinished stitches.";

const HEART = [".XX...XX.", "XXXX.XXXX", "XXXXXXXXX", "XXXXXXXXX", ".XXXXXXX.", "..XXXXX..", "...XXo...", "....o...."];
const INK = "#3b2a20";

export default (r) => {
  const c = r.lang.color;
  const x = (cx, cy, s = 6) => `M${cx + 1} ${cy + 1}L${cx + s - 1} ${cy + s - 1}M${cx + s - 1} ${cy + 1}L${cx + 1} ${cy + s - 1}`;
  const done = [], todo = [];
  HEART.forEach((line, j) => [...line].forEach((k, i) => (k === "X" ? done : k === "o" ? todo : []).push(x(49 + i * 6, 42 + j * 6))));
  const [lang, , forks] = stats(r, { cy: 126, size: 12, text: `fill="${INK}" font-weight="600"`, icon: 'fill="#8a6a55"' });
  const border = Array.from({ length: 22 }, (_, i) => x(162 + i * 6, 64, 6)).join("");
  const stitches = (d, w) => `<path d="${d}" stroke="#2b1a10" stroke-opacity=".35" stroke-width="${w + 0.9}" transform="translate(.4 .5)"/><path d="${d}" stroke="${c}" stroke-width="${w}"/><path d="${d}" stroke="#fff" stroke-opacity=".3" stroke-width=".5"/>`;
  return svg(
    r.name,
    `${motion(".cs-needle{animation:cs-needle 3.2s ease-in-out infinite;transform-origin:80px 79px}@keyframes cs-needle{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg) translateY(-2px)}}")}
<defs>
  <pattern id="cs-aida" x="1" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#f3ecdc"/><rect x=".7" y=".7" width="4.6" height="4.6" rx="1.2" fill="#fbf7ee"/><circle r=".8" fill="#cdbfa3"/></pattern>
  <linearGradient id="cs-wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6b986"/><stop offset="1" stop-color="#a8703f"/></linearGradient>
  <linearGradient id="cs-steel"><stop offset="0" stop-color="#8d939b"/><stop offset=".5" stop-color="#f1f3f5"/><stop offset="1" stop-color="#7d838b"/></linearGradient>
</defs>
<rect width="400" height="150" rx="12" fill="url(#cs-aida)"/>
<path d="M0 12A12 12 0 0 1 12 0H388A12 12 0 0 1 400 12V138A12 12 0 0 1 388 150H12A12 12 0 0 1 0 138ZM76 77m-56 0a56 56 0 1 0 112 0a56 56 0 1 0-112 0" fill="#6b4e2e" fill-opacity=".07" fill-rule="evenodd"/>
<circle cx="76" cy="77" r="60" fill="none" stroke="#5a3a1e" stroke-opacity=".22" stroke-width="7" transform="translate(1.5 2)"/>
<circle cx="76" cy="77" r="60" fill="none" stroke="url(#cs-wood)" stroke-width="6.5"/>
<circle cx="76" cy="77" r="55.8" fill="none" stroke="#8d5a2e" stroke-width="2"/><circle cx="76" cy="77" r="62.6" fill="none" stroke="#fff" stroke-opacity=".35"/>
<rect x="68" y="7" width="16" height="12" rx="2.5" fill="#b08a3e" stroke="#7a5c22" stroke-width=".8"/><rect x="65" y="10.5" width="22" height="5" rx="2.5" fill="#d8b866"/>
<g fill="none" stroke-linecap="round">
  ${stitches(done.join(""), 1.9)}
  <path d="${todo.join("")}" stroke="#8a7a68" stroke-opacity=".45" stroke-width=".6" stroke-dasharray="1 1"/>
  ${stitches(border, 1.5)}
</g>
<text x="76" y="113" font-family="${FONT}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">★ ${esc(r.stars)}</text>
<g class="cs-needle">
  <path d="M80 79C102 96 124 72 121 47" fill="none" stroke="${c}" stroke-width="1.4"/><path d="M80 79C102 96 124 72 121 47" fill="none" stroke="#2b1a10" stroke-opacity=".3" stroke-width=".5"/>
  <path d="M118.6 49.2L140.8 17.6 142.4 18.8 122 50.8Q119.8 51.4 118.6 49.2Z" fill="url(#cs-steel)" stroke="#5d636b" stroke-width=".5"/>
  <ellipse cx="121.3" cy="46.3" rx=".7" ry="2.6" fill="#f3ecdc" transform="rotate(36 121.3 46.3)"/>
</g>
<g font-family="${FONT}" fill="${INK}">
  <text x="162" y="32" font-size="9" font-weight="700" letter-spacing="2" fill="#8a6a55">${esc(fit(r.owner.toUpperCase(), 220, 9, 0.8))}</text>
  <text x="162" y="56" font-size="19" font-weight="800">${esc(fit(r.name, 222, 19))}</text>
  <text font-size="11.5" fill="#5a4636">${lines(wrap(r.description, 36), 162, 90, 15)}</text>
  ${row([lang, forks], 162, 16)}
</g>`,
  );
};
