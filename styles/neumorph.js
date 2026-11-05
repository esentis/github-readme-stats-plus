import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Neumorphism: one soft grey surface with extruded and pressed-in shapes and pill-shaped stat chips.";

const BG = "#e4e8ef";

// Neumorphism: everything is the same grey, lit from the top left; raised shapes cast two shadows, pressed ones hold them inside.
export default (r) =>
  svg(
    r.name,
    `${motion(".nm-dot{transform-box:fill-box;transform-origin:center;animation:nm-dot 4s ease-in-out infinite}@keyframes nm-dot{50%{transform:scale(.8)}}.nm-go{animation:nm-go 3s ease-in-out infinite}@keyframes nm-go{0%,60%,100%{transform:none}80%{transform:translate(1.5px,-1.5px)}}")}
<defs>
  <filter id="out" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b"/>
    <feOffset in="b" dx="5" dy="5" result="d"/><feFlood flood-color="#a3b1c6" flood-opacity=".8"/><feComposite in2="d" operator="in" result="dark"/>
    <feOffset in="b" dx="-5" dy="-5" result="l"/><feFlood flood-color="#fff"/><feComposite in2="l" operator="in" result="light"/>
    <feMerge><feMergeNode in="dark"/><feMergeNode in="light"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <!-- Room around the shape so the blur isn't cut at its edge; the shadows are still clipped to the shape by the "out" composites. -->
  <filter id="in" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b"/>
    <feOffset in="b" dx="3" dy="3" result="o1"/><feComposite in="SourceAlpha" in2="o1" operator="out" result="e1"/><feFlood flood-color="#a3b1c6"/><feComposite in2="e1" operator="in" result="dark"/>
    <feOffset in="b" dx="-3" dy="-3" result="o2"/><feComposite in="SourceAlpha" in2="o2" operator="out" result="e2"/><feFlood flood-color="#fff"/><feComposite in2="e2" operator="in" result="light"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="dark"/><feMergeNode in="light"/></feMerge>
  </filter>
</defs>
<rect width="400" height="150" rx="20" fill="${BG}"/>
<circle cx="50" cy="48" r="25" fill="${BG}" filter="url(#out)"/>
<circle cx="50" cy="48" r="15" fill="${BG}" filter="url(#in)"/>
<circle class="nm-dot" cx="50" cy="48" r="7" fill="${r.lang.color}"/>
<g font-family="${FONT}">
  <text x="90" y="44" font-size="19" font-weight="700" fill="#3d4555">${esc(fit(r.name, 286, 19))}</text>
  <text font-size="12" fill="#7a8599">${lines(wrap(r.description, 46), 90, 64, 15)}</text>
  ${row(
    stats({ ...r, lang: { ...r.lang, name: fit(r.lang.name, 100, 12) } }, { cy: 119, size: 12, text: 'fill="#4f5869" font-weight="600"', icon: 'fill="#8a94a6"' }).map(([w, s]) => [
      w + 28,
      `<rect y="105" width="${w + 28}" height="28" rx="14" fill="${BG}" filter="url(#in)"/><g transform="translate(14 0)">${s}</g>`,
    ]),
    24,
    12,
  )}
  <rect x="352" y="105" width="28" height="28" rx="14" fill="${BG}" filter="url(#out)"/>
  <path class="nm-go" d="M361 124l10-10m-7 0h7v7" fill="none" stroke="#8a94a6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</g>`,
  );
