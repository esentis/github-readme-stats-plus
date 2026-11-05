// Cork board: a pinned index card with the name, a taped instant photo in the language colour and a sticky note of stars.
import { FONT, esc, fit, lines, motion, svg, wrap } from "../card.js";

export const about = "Cork board: an index card with the name and notes, a taped instant photo swatch in the language colour, and a sticky note of stars fluttering on its pin.";

const HAND = "'Marker Felt', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";
const pin = (x, y, fill) =>
  `<ellipse cx="${x + 2}" cy="${y + 3}" rx="4.5" ry="3" fill="#2b1a0c" fill-opacity=".35"/><circle cx="${x}" cy="${y}" r="4.6" fill="${fill}"/><circle cx="${x}" cy="${y}" r="4.6" fill="url(#cb-pin)"/>`;

export default (r) => {
  const c = r.lang.color;
  return svg(
    r.name,
    `${motion(".cb-note{animation:cb-note 5s ease-in-out infinite;transform-origin:359px 66px}@keyframes cb-note{0%,100%{transform:rotate(-5deg)}22%{transform:rotate(-1.5deg)}38%{transform:rotate(-6.5deg)}55%{transform:rotate(-3deg)}72%{transform:rotate(-5.8deg)}}")}
<defs>
  <pattern id="cb-cork" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#c4935c"/><g fill="#8f6235" fill-opacity=".55"><circle cx="2" cy="3" r=".9"/><circle cx="9" cy="6" r="1.2"/><circle cx="5" cy="11" r=".7"/><circle cx="12" cy="12" r=".9"/></g><g fill="#e3bb87" fill-opacity=".6"><circle cx="6" cy="2" r=".8"/><circle cx="12" cy="2.5" r=".6"/><circle cx="2" cy="8" r="1"/><circle cx="9" cy="10.5" r=".7"/></g></pattern>
  <radialGradient id="cb-pin" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient>
  <linearGradient id="cb-photo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
  <linearGradient id="cb-curl" x2="0" y2="1"><stop offset=".75" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
  <filter id="cb-sh" x="-10%" y="-10%" width="125%" height="130%"><feDropShadow dx="1.5" dy="2.5" stdDeviation="1.8" flood-color="#3a2210" flood-opacity=".45"/></filter>
</defs>
<rect width="400" height="150" rx="12" fill="#7b4b2a"/><rect x="2" y="2" width="396" height="146" rx="10" fill="none" stroke="#a46b40" stroke-width="2"/>
<rect x="9" y="9" width="382" height="132" rx="3" fill="url(#cb-cork)"/><rect x="9" y="9" width="382" height="132" rx="3" fill="none" stroke="#3d220f" stroke-opacity=".45" stroke-width="2"/>
<g transform="rotate(-1.5 128 76)">
  <rect x="20" y="18" width="216" height="116" rx="1.5" fill="#fffdf6" filter="url(#cb-sh)"/>
  <path d="M20 38H236" stroke="#e07a7a" stroke-opacity=".7"/><path d="M20 61H236M20 77H236M20 93H236M20 109H236M20 125H236" stroke="#7aa2d6" stroke-opacity=".35"/>
  <g font-family="${FONT}">
    <text x="46" y="33" font-size="8.5" font-weight="700" letter-spacing="1.5" fill="#8a8578">${esc(fit(r.owner.toUpperCase(), 150, 8.5, 0.85))}</text>
    <text x="30" y="58" font-size="17" font-weight="800" fill="#2a2a32">${esc(fit(r.name, 196, 17))}</text>
    <text font-size="11" fill="#3e3e4c">${lines(wrap(r.description, 34, 3), 30, 74, 16)}</text>
  </g>
  ${pin(222, 27, "#d64541")}${pin(34, 27, "#e0a43a")}
</g>
<g transform="rotate(4 286 66)">
  <rect x="248" y="24" width="76" height="86" rx="1" fill="#fbfaf5" filter="url(#cb-sh)"/>
  <rect x="254" y="30" width="64" height="60" fill="${c}"/><rect x="254" y="30" width="64" height="60" fill="url(#cb-photo)"/>
  <text x="286" y="104" font-family="${HAND}" font-size="10.5" fill="#3a3a48" text-anchor="middle">${esc(fit(r.lang.name, 66, 10.5, 0.6))}</text>
  <rect x="270" y="18" width="34" height="11" fill="#e6c9a3" fill-opacity=".8" transform="rotate(-6 287 23)"/>
</g>
<g class="cb-note" transform="rotate(-5 359 66)">
  <rect x="330" y="62" width="58" height="62" fill="#f9c6d2" filter="url(#cb-sh)"/><rect x="330" y="62" width="58" height="62" fill="url(#cb-curl)"/>
  <g font-family="${HAND}" fill="#3a2a35" text-anchor="middle">
    <text x="359" y="96" font-size="14" font-weight="700">★ ${esc(r.stars)}</text>
    <text x="359" y="114" font-size="11.5">⑂ ${esc(r.forks)}</text>
  </g>
  ${pin(359, 68, "#3f7cc9")}
</g>`,
  );
};
