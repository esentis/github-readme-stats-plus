import { esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Constructivist poster: cream, red and black diagonals, a big red circle with the stars, bold slanted caps.";

const POSTER = "Futura, 'Century Gothic', 'Arial Black', 'Helvetica Neue', Arial, sans-serif";

// Soviet avant-garde poster: everything rides a band tilted 6 degrees.
export default (r) => {
  const name = r.name.toUpperCase();
  const size = name.length > 12 ? 17 : 25;
  return svg(
    r.name,
    `${motion(".cv-sun { transform-origin: 336px 52px; animation: cv-sun 6s ease-in-out infinite } @keyframes cv-sun { 50% { transform: scale(1.04) } }")}
<defs><clipPath id="c"><rect width="400" height="150" rx="6"/></clipPath></defs>
<g clip-path="url(#c)">
  <rect width="400" height="150" fill="#efe5cf"/>
  <circle class="cv-sun" cx="336" cy="52" r="70" fill="#c8102e"/>
  <path d="M400 150V112L318 150Z" fill="#1a1a1a"/>
  <g transform="translate(0 86) rotate(-6)">
    <rect x="-10" y="0" width="430" height="24" fill="#1a1a1a"/>
    <rect x="-10" y="28" width="430" height="5" fill="${r.lang.color}"/>
    <g font-family="${POSTER}" font-weight="800" font-style="italic">
      <text x="18" y="-12" font-size="${size}" fill="#1a1a1a" letter-spacing=".5">${esc(fit(name, 262, size, 0.78))}</text>
      <text x="18" y="17" font-size="12" fill="#efe5cf" letter-spacing="2">${esc(fit(r.lang.name.toUpperCase(), 140, 12, 0.85))}  /  ⑂ ${esc(r.forks)}</text>
    </g>
  </g>
</g>
<g font-family="${POSTER}" font-weight="800">
  <text x="22" y="26" font-size="9.5" letter-spacing="2" fill="#1a1a1a">${esc(fit(r.owner.toUpperCase(), 150, 9.5, 0.9))}</text>
  <text x="350" y="24" font-size="12" fill="#efe5cf" text-anchor="middle">★</text>
  <text x="350" y="45" font-size="20" font-style="italic" fill="#efe5cf" text-anchor="middle">${esc(r.stars)}</text>
  <text font-size="10.5" font-weight="500" fill="#1a1a1a">${lines(wrap(r.description, 54), 22, 130, 13)}</text>
</g>`,
  );
};
