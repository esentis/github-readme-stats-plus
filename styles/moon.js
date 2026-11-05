import { FONT, esc, fit, lines, row, stats, svg, wrap } from "../card.js";

export const about = "Night sky with a row of moon phases; more stars make the moon fuller.";

const rnd = (i) => Math.abs(Math.sin(i * 33.7) * 1e4) % 1;
const STARS = Array.from({ length: 30 }, (_, i) => `<circle cx="${(rnd(i) * 400).toFixed(1)}" cy="${(rnd(i + 40) * 150).toFixed(1)}" r="${(0.4 + rnd(i + 80) * 0.6).toFixed(2)}"/>`).join("");

// The lit part of a waxing moon of radius r at fullness f (0 new … 1 full), centred on the origin.
export const phase = (r, f, attrs = "") => {
  if (f < 0.02) return "";
  if (f > 0.98) return `<circle r="${r}" ${attrs}/>`;
  return `<path d="M0 ${-r}A${r} ${r} 0 0 1 0 ${r}A${(r * Math.abs(1 - 2 * f)).toFixed(2)} ${r} 0 0 ${f < 0.5 ? 0 : 1} 0 ${-r}Z" ${attrs}/>`;
};

// Moon: silver type on a night sky; the big moon fills up with stars (full at 10K), a phase row marks where it is.
export default (r) => {
  const f = Math.min(1, Math.log10(r.starCount + 1) / 4);
  const now = Math.round(f * 7);
  const moons = Array.from({ length: 8 }, (_, i) => {
    const ring = i === now ? `<circle r="10.5" fill="none" stroke="#e2e8f0" stroke-width="1.2"/>` : "";
    return `<g transform="translate(${32 + i * 24} 124)">${ring}<circle r="7" fill="#273349" stroke="#cbd5e1" stroke-opacity=".25"/><g fill="#cbd5e1">${phase(7, i / 7)}</g></g>`;
  }).join("");
  const counts = stats(r, { cy: 124, text: 'fill="#e2e8f0" font-weight="600"', icon: 'fill="#cbd5e1"' }).slice(1);
  return svg(
    r.name,
    `<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="#070b1d"/><stop offset="1" stop-color="#1b1f45"/></linearGradient>
  <radialGradient id="halo"><stop offset=".45" stop-color="#e2e8f0" stop-opacity=".22"/><stop offset="1" stop-color="#e2e8f0" stop-opacity="0"/></radialGradient>
  <radialGradient id="lit" cx=".4" cy=".35"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#b8c2d1"/></radialGradient>
  <clipPath id="litclip">${phase(38, f, 'transform="translate(330 64)"') || '<circle r="0"/>'}</clipPath>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="url(#sky)"/>
  <g fill="#fff" opacity=".75">${STARS}<animate attributeName="opacity" values=".75;.45;.75" dur="5s" repeatCount="indefinite"/></g>
  <circle cx="330" cy="64" r="${40 + 40 * f}" fill="url(#halo)"/>
  <circle cx="330" cy="64" r="38" fill="#1e2740" stroke="#cbd5e1" stroke-opacity=".2"/>
  <g clip-path="url(#litclip)"><circle cx="330" cy="64" r="38" fill="url(#lit)"/>
    <g fill="#94a3b8" fill-opacity=".35"><circle cx="318" cy="52" r="7"/><circle cx="342" cy="76" r="9"/><circle cx="346" cy="48" r="4"/><circle cx="322" cy="82" r="4"/></g></g>
</g>
<rect x=".5" y=".5" width="399" height="149" rx="13.5" fill="none" stroke="#cbd5e1" stroke-opacity=".18"/>
<g font-family="${FONT}">
  <circle cx="28" cy="27" r="4" fill="${r.lang.color}"/>
  <text x="38" y="31" font-size="10" font-weight="600" letter-spacing="2" fill="#94a3b8">${esc(fit(r.lang.name.toUpperCase(), 200, 10, 0.8))}</text>
  <text x="24" y="56" font-size="20" font-weight="700" fill="#e2e8f0">${esc(fit(r.name, 240, 20))}</text>
  <text font-size="12.5" fill="#94a3b8">${lines(wrap(r.description, 36), 24, 78, 16)}</text>
  ${moons}
  ${row(counts, 330 - (counts[0][0] + counts[1][0] + 14) / 2, 14)}
</g>`,
  );
};
