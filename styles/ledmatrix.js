import { MONO, esc, fit, svg, textWidth } from "../card.js";

export const about = "LED dot-matrix sign: glowing amber, red and green text lit through a grid of round LEDs, with a scrolling description.";

// LED sign: text is masked through a grid of round dots, so only the LEDs it covers light up.
export default (r) => {
  const desc = fit(r.description.toUpperCase(), 1600, 17);
  const over = Math.max(0, textWidth(desc, 17) - 352);
  // Long descriptions pause, scroll to their end, pause, and jump back.
  const scroll = over
    ? `<animateTransform attributeName="transform" type="translate" values="0 0;0 0;${-over} 0;${-over} 0" keyTimes="0;.15;.85;1" dur="${(over / 25 + 4).toFixed(1)}s" repeatCount="indefinite"/>`
    : "";
  const lang = fit(r.lang.name.toUpperCase(), 130, 17);
  return svg(
    r.name,
    `<defs>
  <pattern id="on" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.3" fill="#fff"/></pattern>
  <pattern id="off" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.05" fill="#2a1c14"/></pattern>
  <mask id="dots"><rect width="400" height="150" fill="url(#on)"/></mask>
  <filter id="glow" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <clipPath id="panel"><rect x="12" y="12" width="376" height="126"/></clipPath>
</defs>
<rect width="400" height="150" rx="10" fill="#1c1c1e"/>
<rect x="10" y="10" width="380" height="130" rx="3" fill="#0a0705"/>
<rect x="12" y="12" width="376" height="126" fill="url(#off)"/>
<g fill="#3a3a3e"><circle cx="5" cy="75" r="2"/><circle cx="395" cy="75" r="2"/></g>
<g clip-path="url(#panel)" filter="url(#glow)">
  <g mask="url(#dots)" font-family="${MONO}" font-weight="700">
    <text x="22" y="44" font-size="24" fill="#ffb000">${esc(fit(r.name.toUpperCase(), 356, 24))}</text>
    <g>${scroll}<text x="22" y="85" font-size="17" fill="#ff4a2e">${esc(desc)}</text></g>
    <text x="22" y="124" font-size="17" fill="#5dff7a">★${esc(r.stars)} ⑂${esc(r.forks)}</text>
    <circle cx="${370 - textWidth(lang, 17) - 14}" cy="118" r="6" fill="${r.lang.color}"/>
    <text x="370" y="124" font-size="17" fill="#ffb000" text-anchor="end">${esc(lang)}</text>
  </g>
</g>
<path d="M12 56H388M12 98H388" stroke="#000" stroke-width="3"/>`,
  );
};
