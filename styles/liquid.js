// Liquid: a glossy blob of the language colour slowly morphing beside the repo text on a dark gradient.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Glossy liquid blob in the language colour slowly morphing, lit by soft specular highlights on a dark gradient.";

// A smooth closed curve through radii around (cx, cy) as Catmull-Rom cubics, so every shape shares one command structure for SMIL morphing.
const blob = (cx, cy, radii) => {
  const n = radii.length;
  const p = radii.map((k, i) => [cx + Math.cos((i / n) * 6.283) * k, cy + Math.sin((i / n) * 6.283) * k * 0.9]);
  const f = (v) => v.toFixed(1);
  const seg = (i) => {
    const [a, b, c, e] = [-1, 0, 1, 2].map((o) => p[(i + o + n) % n]);
    return `C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])} ${f(c[1])}`;
  };
  return `M${f(p[0][0])} ${f(p[0][1])}${radii.map((_, i) => seg(i)).join("")}Z`;
};

// Three seeded shapes per blob, looped back to the first so the morph is seamless.
const morph = (rnd, cx, cy, size, n, dur) => {
  const shapes = [0, 1, 2].map(() => blob(cx, cy, Array.from({ length: n }, () => size * (0.8 + rnd() * 0.32))));
  const spline = ".45 0 .55 1;".repeat(3).slice(0, -1);
  return [shapes[0], `<animate attributeName="d" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.33;.67;1" keySplines="${spline}" values="${[...shapes, shapes[0]].join(";")}"/>`];
};

// Dark card; the blob carries a bounding-box shade and a lighting filter so its gloss follows every morph.
export default (r) => {
  const c = r.lang.color;
  const rnd = rng(r.name);
  const [big, bigAnim] = morph(rnd, 312, 76, 50, 7, 16);
  const [drop, dropAnim] = morph(rnd, 371, 26, 10, 5, 11);
  const shape = (d, a) => `<path d="${d}" fill="${c}">${a}</path><path d="${d}" fill="url(#lq-sh)">${a}</path>`;
  return svg(
    r.name,
    `${motion(".lq-g { animation: lq-g 8s ease-in-out infinite } @keyframes lq-g { 50% { opacity: .55 } }")}
<defs>
  <clipPath id="lq-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <linearGradient id="lq-bg" x2="1" y2="1"><stop offset="0" stop-color="#121524"/><stop offset="1" stop-color="#05060b"/></linearGradient>
  <radialGradient id="lq-sh" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient>
  <filter id="lq-blur" filterUnits="userSpaceOnUse" x="180" y="-40" width="260" height="230"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="lq-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="lq-gloss" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b"/>
    <feSpecularLighting in="b" surfaceScale="5" specularConstant="1.1" specularExponent="20" lighting-color="#fff" result="s"><fePointLight x="276" y="18" z="90"/></feSpecularLighting>
    <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
    <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k2="1" k3=".85"/>
  </filter>
</defs>
<g clip-path="url(#lq-clip)">
  <rect width="400" height="150" fill="url(#lq-bg)"/>
  <circle class="lq-g" cx="314" cy="78" r="62" fill="${c}" opacity=".38" filter="url(#lq-blur)"/>
  <ellipse cx="314" cy="136" rx="44" ry="4" fill="${c}" opacity=".35" filter="url(#lq-blur)"/>
  <g filter="url(#lq-gloss)">${shape(big, bigAnim)}${shape(drop, dropAnim)}</g>
  <ellipse cx="294" cy="54" rx="13" ry="7" transform="rotate(-28 294 54)" fill="#fff" opacity=".55" filter="url(#lq-soft)"/>
  <ellipse cx="290" cy="52" rx="4.5" ry="2.2" transform="rotate(-28 290 52)" fill="#fff" opacity=".9"/>
  <circle cx="367" cy="22" r="2.2" fill="#fff" opacity=".85"/>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="11" fill="#8b90a6">${esc(fit(r.owner, 200, 11))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#f4f5fa">${esc(fit(r.name, 222, 20))}</text>
  <text font-size="12.5" fill="#a9adc0">${lines(wrap(r.description, 30), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#e8eaf2"', icon: 'fill="#8b90a6"' }), 24, 16)}
</g>`,
  );
};
