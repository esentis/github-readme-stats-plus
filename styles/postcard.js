import { FONT, esc, fit, isLight, lines, motion, svg, wrap } from "../card.js";

export const about = "Vintage travel postcard: a seaside scene with 'Greetings from' lettering, a star stamp, a postmark and a cloud drifting by.";

const SERIF = "Georgia, 'Times New Roman', serif";
const BLOCK = "Impact, 'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const house = (x, y, w, h, roof) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f7efe0"/><path d="M${x - 1} ${y}l${w / 2 + 1} -5l${w / 2 + 1} 5Z" fill="${roof}"/><rect x="${x + w / 2 - 1}" y="${y + h - 4}" width="2" height="4" fill="#5d7f9a"/>`;

// Postcard: picture on the left with big outlined lettering; stamp, postmark and a handwritten note on the right.
export default (r) => {
  const c = r.lang.color;
  const ink = isLight(c) ? "#2a1a10" : "#fff8ea";
  const size = r.name.length <= 11 ? 27 : r.name.length <= 15 ? 21 : 17;
  const name = esc(fit(r.name, 186, size, 0.56));
  const perf = Array.from({ length: 11 }, (_, i) => `M${338 + i * 4.4} 13h0M${338 + i * 4.4} 66h0`).join("") + Array.from({ length: 13 }, (_, i) => `M337 ${14 + i * 4.3}h0M383 ${14 + i * 4.3}h0`).join("");
  return svg(
    r.name,
    `${motion(".pc-cl{animation:pc-cl 20s linear infinite}@keyframes pc-cl{0%{transform:translateX(0)}25%{transform:translateX(60px)}25.01%{transform:translateX(-180px)}100%{transform:translateX(0)}}.pc-gl{animation:pc-gl 3s ease-in-out infinite}@keyframes pc-gl{0%,100%{opacity:.9}50%{opacity:.2}}")}
<defs>
  <clipPath id="pc-scene"><rect x="14" y="14" width="200" height="122"/></clipPath>
  <radialGradient id="pc-age" r=".75"><stop offset=".6" stop-color="#b98a4e" stop-opacity="0"/><stop offset="1" stop-color="#b98a4e" stop-opacity=".35"/></radialGradient>
  <linearGradient id="pc-sky" x2="0" y2="1"><stop offset="0" stop-color="#7fbfcf"/><stop offset=".75" stop-color="#f3e2b4"/></linearGradient>
  <linearGradient id="pc-sea" x2="0" y2="1"><stop offset="0" stop-color="#3d93a6"/><stop offset="1" stop-color="#245f78"/></linearGradient>
  <pattern id="pc-dots" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".5" fill="#3b2a1a" opacity=".12"/></pattern>
</defs>
<rect width="400" height="150" rx="6" fill="#f2e5c7"/>
<rect width="400" height="150" rx="6" fill="url(#pc-age)"/>
<g fill="#b48a52" opacity=".14"><circle cx="248" cy="128" r="5"/><circle cx="380" cy="104" r="3"/><circle cx="296" cy="22" r="2.4"/><circle cx="226" cy="40" r="3.4"/></g>
<path d="M386 150L400 136V144Q400 150 394 150Z" fill="#e3d1aa"/><path d="M386 150L400 136" stroke="#c8ae7e" stroke-width=".6"/>
<rect x="11" y="11" width="206" height="128" fill="#fbf5e6"/>
<g clip-path="url(#pc-scene)">
  <rect x="14" y="14" width="200" height="122" fill="url(#pc-sky)"/>
  <circle cx="176" cy="88" r="15" fill="#f9cf74"/>
  <g class="pc-cl"><path d="M160 30a7 7 0 0 1 12-5a9 9 0 0 1 16 2a6 6 0 0 1 3 11h-28a5 5 0 0 1-3-8Z" fill="#fffaf0" opacity=".92"/></g>
  <path d="M14 98L50 80L78 90L112 74L150 92L214 84V100H14Z" fill="#8eaaa3"/>
  <rect x="14" y="98" width="200" height="38" fill="url(#pc-sea)"/>
  <g stroke="#fff6dc" stroke-linecap="round" class="pc-gl"><path d="M162 104h14M168 110h20M158 117h10"/></g>
  <path d="M14 136V102Q40 96 70 104Q92 112 96 136Z" fill="#c9965f"/>
  ${house(22, 104, 11, 9, "#c4553a")}${house(37, 100, 13, 11, "#2f6f9f")}${house(54, 106, 10, 8, "#c4553a")}${house(30, 118, 12, 10, "#c4553a")}${house(48, 118, 11, 9, "#2f6f9f")}${house(66, 116, 10, 9, "#c4553a")}
  <g transform="translate(134 120)"><path d="M0 0V-16L10 0Z" fill="${c}" stroke="#2a1a10" stroke-width=".6"/><path d="M-7 2H14L11 6H-4Z" fill="#5a3a2a"/></g>
  <rect x="14" y="14" width="200" height="122" fill="url(#pc-dots)"/>
</g>
<rect x="14" y="14" width="200" height="122" fill="none" stroke="#3b2a1a" stroke-opacity=".35" stroke-width=".8"/>
<text x="26" y="36" font-family="${SERIF}" font-size="14" font-style="italic" fill="#fffaf0" stroke="#3b2a1a" stroke-width="2.4" stroke-opacity=".55" paint-order="stroke">Greetings from</text>
<g font-family="${BLOCK}" font-size="${size}" font-weight="900" letter-spacing=".5">
  <text x="28" y="${44 + size}" fill="#2a1a10" opacity=".45">${name}</text>
  <text x="26" y="${42 + size}" fill="${c}" stroke="#2a1a10" stroke-width="3" stroke-linejoin="round" paint-order="stroke">${name}</text>
</g>
<rect x="337" y="13" width="46" height="53" fill="#fffaf0"/><path d="${perf}" stroke="#f2e5c7" stroke-width="3.2" stroke-linecap="round"/>
<rect x="341" y="17" width="38" height="45" fill="${c}"/><rect x="343" y="19" width="34" height="41" fill="none" stroke="${ink}" stroke-opacity=".5" stroke-width=".6"/>
<g font-family="${SERIF}" fill="${ink}" text-anchor="middle"><text x="360" y="36" font-size="14">★</text><text x="360" y="52" font-size="12" font-weight="700">${esc(r.stars)}</text></g>
<g fill="none" stroke="#2c2747" stroke-opacity=".55" stroke-width="1.1">
  <circle cx="314" cy="44" r="22"/><circle cx="314" cy="44" r="10" stroke-width=".6"/>
  <path d="M232 36q8-4 16 0t16 0t16 0M232 44q8-4 16 0t16 0t16 0M232 52q8-4 16 0t16 0t16 0"/>
</g>
<path id="pc-arc" d="M299 49.5A16 16 0 1 1 329 49.5" fill="none"/>
<g font-family="${SERIF}" font-size="8" font-weight="700" fill="#2c2747" fill-opacity=".7" text-anchor="middle">
  <text><textPath href="#pc-arc" startOffset="50%">${esc(fit(r.lang.name.toUpperCase(), 64, 8, 0.66))}</textPath></text>
  <text x="314" y="47" font-family="${FONT}" font-size="8.5">⑂ ${esc(r.forks)}</text>
  <text x="314" y="62" letter-spacing="1">POST</text>
</g>
<g stroke="#9b8a6a" stroke-opacity=".45" stroke-width=".6"><path d="M232 88H384M232 104H384M232 120H384M232 140H384"/></g>
<text font-family="${SERIF}" font-size="12.5" font-style="italic" fill="#2c3a6b">${lines(wrap(r.description, 24, 3), 234, 85, 16)}</text>
<g font-family="${SERIF}" font-size="11.5" font-style="italic" fill="#2c3a6b"><text x="234" y="137">— ${esc(fit(r.owner, 146, 11.5, 0.5))}</text></g>`,
  );
};
