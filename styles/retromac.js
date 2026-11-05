import { esc, fit, lines, svg, textWidth, wrap } from "../card.js";

export const about = "Black-and-white early-90s window over a dithered desktop.";

const SYSTEM = "Chicago, Charcoal, Geneva, 'Helvetica Neue', Arial, sans-serif";

// A black-and-white early-90s desktop window over a dithered grey desktop.
export default (r) => {
  const title = fit(r.name, 220, 12);
  const titleWidth = textWidth(title, 12) + 16;
  const stripes = Array.from({ length: 7 }, (_, i) => `M18 ${14 + i * 2}H378`).join("");
  return svg(
    r.name,
    `<defs><pattern id="dither" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#fff"/><rect width="1" height="1" fill="#000"/><rect x="1" y="1" width="1" height="1" fill="#000"/></pattern></defs>
<rect width="400" height="150" rx="6" fill="url(#dither)"/>
<rect x="16" y="12" width="368" height="126" fill="#000"/>
<rect x="14" y="10" width="368" height="126" fill="#fff" stroke="#000"/>
<path d="${stripes}" stroke="#000"/>
<rect x="24" y="13" width="13" height="13" fill="#fff" stroke="#000"/>
<rect x="${198 - titleWidth / 2}" y="11" width="${titleWidth}" height="18" fill="#fff"/>
<line x1="14" y1="30" x2="382" y2="30" stroke="#000"/>
<g font-family="${SYSTEM}" fill="#000">
  <text x="198" y="25" font-size="12" font-weight="700" text-anchor="middle">${esc(title)}</text>
  <path d="M30 42H48L56 50V72H30Z" fill="#fff" stroke="#000"/><path d="M48 42V50H56" fill="none" stroke="#000"/>
  <text x="70" y="54" font-size="15" font-weight="700">${esc(fit(r.name, 300, 15))}</text>
  <text font-size="11">${lines(wrap(r.description, 50), 70, 72, 14)}</text>
  <line x1="14" y1="104" x2="382" y2="104" stroke="#000"/>
  <text x="30" y="124" font-size="11">${esc(r.stars)} star${r.stars === "1" ? "" : "s"}</text>
  <text x="150" y="124" font-size="11">${esc(r.forks)} fork${r.forks === "1" ? "" : "s"}</text>
  <text x="366" y="124" font-size="11" text-anchor="end">${esc(fit(r.lang.name, 110, 11))}</text>
</g>`,
  );
};
