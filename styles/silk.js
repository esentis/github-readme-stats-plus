import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Silk: a twisting satin ribbon in the language colour on ivory, a slow shimmer rippling along its folds, refined serif type.";

const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', Baskerville, Georgia, serif";
// Blends two hex colours (accepts #rgb and #rrggbb[aa]); t = 0 gives a, 1 gives b.
const mix = (a, b, t) => {
  const p = (h) => (h.length < 7 ? h.replace(/\w/g, "$&$&") : h).slice(1, 7).match(/../g).map((x) => parseInt(x, 16) || 0);
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
// A ribbon along a cubic curve whose width follows cos(twist); each slice is shaded by which way it faces.
const ribbon = (c, P, half, turns, phase) => {
  const at = (t) => P.reduce((acc, [x, y], i) => {
    const k = [1, 3, 3, 1][i] * (1 - t) ** (3 - i) * t ** i;
    return [acc[0] + k * x, acc[1] + k * y];
  }, [0, 0]);
  const pts = Array.from({ length: 61 }, (_, i) => {
    const t = i / 60, [x, y] = at(t), [x2, y2] = at(t + 0.001), len = Math.hypot(x2 - x, y2 - y);
    const a = phase + t * turns * Math.PI, w = half * Math.cos(a);
    return { l: [x - ((y2 - y) / len) * w, y + ((x2 - x) / len) * w], r: [x + ((y2 - y) / len) * w, y - ((x2 - x) / len) * w], s: Math.sin(a) * Math.sign(Math.cos(a)) };
  });
  const quads = pts.slice(1).map((q, i) => [pts[i], q]);
  const d = ([p, q]) => `M${p.l.map((v) => v.toFixed(1))}L${q.l.map((v) => v.toFixed(1))}L${q.r.map((v) => v.toFixed(1))}L${p.r.map((v) => v.toFixed(1))}Z`;
  const shade = (s) => (s > 0 ? mix(c, "#ffffff", s * 0.5) : mix(c, "#000000", -s * 0.42));
  return { slices: quads.map((q) => `<path d="${d(q)}" fill="${shade((q[0].s + q[1].s) / 2)}" stroke="${shade((q[0].s + q[1].s) / 2)}" stroke-width=".6"/>`).join(""), outline: quads.map(d).join("") };
};

// Ivory page, serif text on the left, a silk ribbon in the language colour falling through the right side.
export default (r) => {
  const c = r.lang.color;
  const main = ribbon(c, [[262, -30], [430, 30], [214, 104], [372, 182]], 27, 2.1, 0.5);
  const back = ribbon(mix(c, "#e9dcc6", 0.72), [[318, -30], [450, 70], [262, 70], [432, 176]], 15, 1.6, 2);
  const size = r.name.length > 17 ? 19 : 24;
  return svg(
    r.name,
    `${motion(".sk-sheen { animation: sk-sheen 7s ease-in-out infinite } @keyframes sk-sheen { 0% { transform: translate(-130px, -110px) } 70%, 100% { transform: translate(110px, 120px) } } .sk-float { animation: sk-float 7s ease-in-out infinite } @keyframes sk-float { 50% { transform: translateY(2px) } }")}
<defs>
  <clipPath id="sk-card"><rect width="400" height="150" rx="14"/></clipPath>
  <clipPath id="sk-rib"><path d="${main.outline}${back.outline}"/></clipPath>
  <linearGradient id="sk-bg" x2="1" y2="1"><stop offset="0" stop-color="#fbf7f0"/><stop offset="1" stop-color="#efe6d8"/></linearGradient>
  <linearGradient id="sk-glow" x1="0" y1="0" x2="1" y2="1"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".47" stop-color="#fff" stop-opacity=".55"/><stop offset=".53" stop-color="#fff" stop-opacity=".55"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <filter id="sk-shadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
</defs>
<g clip-path="url(#sk-card)">
  <rect width="400" height="150" fill="url(#sk-bg)"/>
  <g class="sk-float">
    <path d="${main.outline}${back.outline}" fill="#5a4630" opacity=".22" transform="translate(-5 7)" filter="url(#sk-shadow)"/>
    ${back.slices}${main.slices}
    <g clip-path="url(#sk-rib)"><rect class="sk-sheen" x="170" y="-60" width="260" height="270" fill="url(#sk-glow)" opacity=".8"/></g>
  </g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#d8ccb8"/>
<g font-family="${FONT}">
  <text x="26" y="32" font-size="8.5" font-weight="600" letter-spacing="3" fill="#a08c72">${esc(fit(`SOIE · ${r.lang.name.toUpperCase()}`, 200, 8.5, 0.95))}</text>
  <rect x="26" y="40" width="22" height="1.5" fill="${c}"/>
  <text x="26" y="${size > 20 ? 70 : 68}" font-family="${SERIF}" font-size="${size}" fill="#2a2320">${esc(fit(r.name, 222, size, 0.58))}</text>
  <text font-family="${SERIF}" font-style="italic" font-size="12" fill="#6e6258">${lines(wrap(r.description, 34), 26, 92, 15)}</text>
  <text x="26" y="132" font-size="10.5" letter-spacing="1.5" fill="#4a3f37"><tspan fill="${c}">★</tspan> ${esc(r.stars)}<tspan dx="12" fill="#a08c72">⑂</tspan> ${esc(r.forks)}<tspan dx="12" fill="#a08c72">by</tspan> ${esc(fit(r.owner, 100, 10.5, 0.66))}</text>
</g>`,
  );
};
