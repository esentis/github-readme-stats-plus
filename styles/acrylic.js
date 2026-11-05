import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "Thick frosted acrylic slab with a bevelled edge, lit from behind in the language colour.";

// A thick acrylic block on charcoal: visible lower edge, bevel highlight, grain and a coloured light glowing through.
export default (r) =>
  svg(
    r.name,
    `${motion(".ac-light { animation: ac-light 8s ease-in-out infinite } @keyframes ac-light { 50% { opacity: .7; transform: translate(10px, -4px) } }")}
<defs>
  <clipPath id="clip"><rect width="400" height="150" rx="14"/></clipPath>
  <filter id="light" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .07 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  <linearGradient id="face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".07"/></linearGradient>
  <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".3" stop-color="#fff" stop-opacity=".1"/><stop offset=".75" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/></linearGradient>
  <linearGradient id="side" x1="0" x2="1"><stop offset="0" stop-color="${r.lang.color}" stop-opacity=".75"/><stop offset=".5" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="${r.lang.color}" stop-opacity=".35"/></linearGradient>
</defs>
<g clip-path="url(#clip)">
  <rect width="400" height="150" fill="#18181d"/>
  <g class="ac-light" filter="url(#light)"><circle cx="110" cy="100" r="72" fill="${r.lang.color}"/><circle cx="320" cy="34" r="46" fill="${r.lang.color}" opacity=".6"/><circle cx="110" cy="104" r="24" fill="#fff" opacity=".45"/></g>
  <rect x="24" y="24" width="352" height="116" rx="14" fill="#000" fill-opacity=".55" filter="url(#shadow)"/>
  <rect x="16" y="18" width="368" height="118" rx="14" fill="url(#side)"/>
  <rect x="16" y="12" width="368" height="116" rx="14" fill="#1d1d24" fill-opacity=".42"/>
  <rect x="16" y="12" width="368" height="116" rx="14" fill="url(#face)"/>
  <rect x="16" y="12" width="368" height="116" rx="14" fill="#fff" filter="url(#grain)"/>
  <rect x="16.75" y="12.75" width="366.5" height="114.5" rx="13.25" fill="none" stroke="url(#edge)" stroke-width="1.5"/>
  <rect x="21" y="17" width="358" height="106" rx="10" fill="none" stroke="#fff" stroke-opacity=".08"/>
</g>
<g font-family="${FONT}" fill="#fff">
  <text x="34" y="46" font-size="21" font-weight="700">${esc(fit(r.name, 330, 21))}</text>
  <text font-size="13" fill-opacity=".85">${lines(wrap(r.description, 46), 34, 69, 17)}</text>
  ${row(stats(r, { cy: 110, text: 'font-weight="600"', icon: 'fill="#fff"' }), 34, 20)}
</g>`,
  );
