import { MONO, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Vintage \"admit one\" ticket with notched edges and a numbered stub.";

const SERIF = "Georgia, 'Times New Roman', serif";

// A vintage cinema ticket with notched edges and a tear-off stub numbered by stars.
export default (r) => {
  const notches = [25, 50, 75, 100, 125].map((y) => `<circle cy="${y}" r="5" fill="#000"/><circle cx="400" cy="${y}" r="5" fill="#000"/>`).join("");
  return svg(
    r.name,
    `${motion(".cn-chase { animation: cn-chase 2s linear infinite } @keyframes cn-chase { to { stroke-dashoffset: -6 } }")}
<defs><mask id="notch"><rect width="400" height="150" rx="6" fill="#fff"/>${notches}</mask></defs>
<rect width="400" height="150" fill="#f9e3c0" mask="url(#notch)"/>
<rect class="cn-chase" x="14" y="10" width="276" height="130" fill="none" stroke="#c2412d" stroke-dasharray="3 3"/>
<line x1="304" y1="6" x2="304" y2="144" stroke="#c2412d" stroke-dasharray="2 4"/>
<g font-family="${SERIF}" text-anchor="middle">
  <text x="152" y="32" font-size="11" font-weight="700" letter-spacing="4" fill="#c2412d">ADMIT ONE</text>
  <text x="152" y="62" font-size="22" font-weight="700" fill="#3a1f14">${esc(fit(r.name, 260, 22, 0.55))}</text>
  <text font-size="12" font-style="italic" fill="#6b4130">${lines(wrap(r.description, 40), 152, 84, 16)}</text>
  <text x="152" y="128" font-size="11" font-weight="700" letter-spacing="1" fill="#c2412d">${esc(fit(r.lang.name.toUpperCase(), 100, 11, 0.7))} · ★ ${esc(r.stars)} · ⑂ ${esc(r.forks)}</text>
  <g fill="#c2412d">
    <text transform="translate(326 75) rotate(-90)" font-size="11" font-weight="700" letter-spacing="3">ADMIT ONE</text>
    <text transform="translate(352 75) rotate(-90)" font-family="${MONO}" font-size="13" font-weight="700">Nº ${esc(String(r.starCount).padStart(6, "0"))}</text>
    <text transform="translate(376 75) rotate(-90)" font-size="10">${esc(fit(r.owner, 110, 10))}</text>
  </g>
</g>`,
  );
};
