// Ribbon: a satin band in the language colour twisting along a wave across the card, shaded like a 3D surface.
import { FONT, esc, fit, lines, motion, rng, row, stats, svg, wrap } from "../card.js";

export const about = "Satin ribbon in the language colour twisting through 3D, shaded face by face, endlessly turning as it flows.";

const rgb = (h) => (h.length < 7 ? h.replace(/\w/g, "$&$&") : h).match(/\w\w/g).slice(0, 3).map((v) => parseInt(v, 16));
const hex = (v) => "#" + v.map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
// Same matrix as feColorMatrix hueRotate, to make the back face a hue-shifted sibling of the front.
const hue = ([r, g, b], deg) => {
  const [cs, sn] = [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
  return [
    r * (0.213 + cs * 0.787 - sn * 0.213) + g * (0.715 - cs * 0.715 - sn * 0.715) + b * (0.072 - cs * 0.072 + sn * 0.928),
    r * (0.213 - cs * 0.213 + sn * 0.143) + g * (0.715 + cs * 0.285 + sn * 0.14) + b * (0.072 - cs * 0.072 - sn * 0.283),
    r * (0.213 - cs * 0.213 - sn * 0.787) + g * (0.715 - cs * 0.715 + sn * 0.715) + b * (0.072 + cs * 0.928 + sn * 0.072),
  ];
};

// The twist and the centre wave share one wavelength, so sliding the band by that wavelength is a seamless endless twist.
export default (r) => {
  const rnd = rng(r.name);
  const [lam, A, w, tilt, ph] = [130 + rnd() * 50, 8 + rnd() * 10, 17 + rnd() * 5, -14 - rnd() * 14, rnd() * 6.28];
  const front = rgb(r.lang.color);
  const back = mix(hue(front, 45), [0, 0, 0], 0.25);
  // Outline: top edge out, bottom edge back; it crosses itself where the band is edge-on, and nonzero fill keeps both lobes.
  const band = (width, dy, shift) => {
    const top = [], bot = [];
    for (let u = -240; u <= 240 + lam; u += 4) {
      const k = (2 * Math.PI * u) / lam;
      const [cy, cf] = [dy + A * Math.sin(k + ph), width * Math.cos(k + shift)];
      top.push(`${u} ${(cy - cf).toFixed(1)}`);
      bot.unshift(`${u} ${(cy + cf).toFixed(1)}`);
    }
    return [`M${top.join("L")}L${bot.join("L")}Z`, `M${top.join("L")}M${bot.join("L")}`];
  };
  // Shading depends only on the twist angle, so one period of it is a repeating gradient that travels with the band.
  const stops = Array.from({ length: 41 }, (_, i) => {
    const k = (i / 40) * 2 * Math.PI;
    const [cf, sf] = [Math.cos(k), Math.sin(k)];
    const facing = Math.abs(cf) < 1e-9 ? (i < 20 ? -1 : 1) : Math.sign(cf);
    const light = Math.max(0, facing * (0.85 * cf - 0.5 * sf));
    const col = hex(mix(mix(facing > 0 ? front : back, [0, 0, 0], 0.62 * (1 - light)), [255, 255, 255], 0.6 * light ** 12));
    const stop = (o, c2) => `<stop offset="${o}" stop-color="${c2}"/>`;
    // At the edge-on angles the face flips, so the colour switches sharply there.
    return i === 10 || i === 30 ? stop(i / 40, hex(mix(facing > 0 ? back : front, [0, 0, 0], 0.62))) + stop(i / 40, col) : stop(i / 40, col);
  }).join("");
  const [main, edges] = band(w, 0, 0);
  const [thin, thinEdges] = band(w * 0.38, 30, Math.PI);
  return svg(
    r.name,
    `${motion(`.rb-m { animation: rb-m 14s linear infinite } @keyframes rb-m { to { transform: translateX(${(-lam).toFixed(1)}px) } }`)}
<defs>
  <clipPath id="rb-clip"><rect width="400" height="150" rx="16"/></clipPath>
  <linearGradient id="rb-bg" x2="1" y2="1"><stop offset="0" stop-color="#0a0a10"/><stop offset="1" stop-color="#171622"/></linearGradient>
  <linearGradient id="rb-fade" x2="1"><stop offset=".58" stop-color="#fff" stop-opacity="0"/><stop offset=".76" stop-color="#fff"/></linearGradient>
  <mask id="rb-mask"><rect width="400" height="150" fill="url(#rb-fade)"/></mask>
  <linearGradient id="rb-g" gradientUnits="userSpaceOnUse" x2="${lam.toFixed(1)}" y2="0" spreadMethod="repeat">${stops}</linearGradient>
  <linearGradient id="rb-g2" href="#rb-g" gradientTransform="translate(${(lam / 2).toFixed(1)} 0)"/>
  <filter id="rb-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter>
</defs>
<g clip-path="url(#rb-clip)">
  <rect width="400" height="150" fill="url(#rb-bg)"/>
  <ellipse cx="320" cy="75" rx="80" ry="50" fill="${r.lang.color}" opacity=".18" filter="url(#rb-blur)"/>
  <g mask="url(#rb-mask)"><g transform="translate(312 72) rotate(${tilt.toFixed(1)})"><g class="rb-m" stroke="#fff" fill="none">
    <path d="${thin}" fill="url(#rb-g2)" opacity=".55"/><path d="${thinEdges}" stroke-opacity=".2" stroke-width=".5"/>
    <path d="${main}" fill="url(#rb-g)"/><path d="${edges}" stroke-opacity=".4" stroke-width=".6"/>
  </g></g></g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="15.5" fill="none" stroke="#fff" stroke-opacity=".08"/>
<g font-family="${FONT}">
  <text x="24" y="34" font-size="11" fill="#8d8b9e">${esc(fit(r.owner, 200, 11))}</text>
  <text x="24" y="58" font-size="20" font-weight="700" fill="#f4f3f8">${esc(fit(r.name, 200, 20))}</text>
  <text font-size="12.5" fill="#aaa8b8">${lines(wrap(r.description, 28), 24, 80, 16)}</text>
  ${row(stats(r, { cy: 124, size: 12, text: 'fill="#e9e8f0"', icon: 'fill="#8d8b9e"' }), 24, 16)}
</g>`,
  );
};
