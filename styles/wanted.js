import { esc, fit, motion, svg } from "../card.js";

export const about = "Western wanted poster on aged paper: slab-serif WANTED, the repo name, its crime as the description and a star reward.";

const SLAB = "Rockwell, 'Roboto Slab', 'Courier New', Georgia, serif";

// A weathered wild-west wanted poster; the description is the charge, stars are the reward.
export default (r) =>
  svg(
    r.name,
    `${motion(".wt-sway{transform-origin:200px 7px;animation:wt-sway 6s ease-in-out -1.5s infinite}@keyframes wt-sway{0%,100%{transform:rotate(-.3deg)}50%{transform:rotate(.3deg)}}")}
<defs>
  <radialGradient id="age" r=".75"><stop offset=".55" stop-color="#ead6a8"/><stop offset="1" stop-color="#c49a5a"/></radialGradient>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .22 0 0 0 0 .08 0 0 0 .55 -.18"/></filter>
</defs>
<g class="wt-sway">
<rect width="400" height="150" rx="6" fill="url(#age)"/>
<rect width="400" height="150" rx="6" filter="url(#grain)"/>
<rect x="9" y="9" width="382" height="132" fill="none" stroke="#3b2414" stroke-width="2"/>
<rect x="13" y="13" width="374" height="124" fill="none" stroke="#3b2414" stroke-width=".7"/>
<circle cx="200" cy="7" r="3" fill="#4a4a4a"/>
<g font-family="${SLAB}" fill="#2e1a0e" text-anchor="middle" font-weight="700">
  <text x="200" y="52" font-size="40" letter-spacing="8">WANTED</text>
  <path d="M40 60H360" stroke="#2e1a0e"/>
  <text x="200" y="72" font-size="8" letter-spacing="3" font-weight="400">THE REPOSITORY KNOWN AS</text>
  <text x="200" y="93" font-size="19">${esc(fit(r.name.toUpperCase(), 330, 19, 0.7))}</text>
  <text x="200" y="108" font-size="10" font-weight="400" font-style="italic">${esc(fit(`“${r.description}”`, 340, 10, 0.52))}</text>
  <path d="M40 114H360" stroke="#2e1a0e" stroke-width=".7"/>
  <text x="200" y="133" font-size="16">REWARD ★ ${esc(r.stars)}</text>
  <g font-size="7.5" font-weight="400" letter-spacing="1">
    <text x="70" y="122">LAST SEEN IN</text><text x="330" y="122">ACCOMPLICES</text>
  </g>
  <text x="70" y="133" font-size="10">${esc(fit(r.lang.name.toUpperCase(), 100, 10, 0.68))}</text>
  <text x="330" y="133" font-size="10">⑂ ${esc(r.forks)}</text>
</g>
</g>`,
  );
