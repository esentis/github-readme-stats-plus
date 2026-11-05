// Shared pieces for every card style: GitHub fetch, text helpers and the SVG frame.
export const FONT = "-apple-system, 'Segoe UI', Ubuntu, Helvetica, Arial, sans-serif";
export const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const ICONS = {
  star: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z",
  fork: "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z",
};

const QUERY = `query($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name description isPrivate stargazerCount forkCount
    owner { login }
    primaryLanguage { name color }
  }
}`;

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

// shortcut: width is estimated from the character count; switch to per-glyph metrics if long names overlap.
export const textWidth = (s, size, ratio = 0.6) => s.length * size * ratio;

export const fit = (s, maxWidth, size, ratio = 0.6) => {
  const max = Math.floor(maxWidth / (size * ratio));
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
};

export function wrap(text, width, maxLines = 2) {
  const lines = [""];
  for (const word of text.trim().split(/\s+/)) {
    const i = lines.length - 1;
    if (!lines[i]) lines[i] = word;
    else if (lines[i].length + 1 + word.length <= width) lines[i] += " " + word;
    else lines.push(word);
  }
  const cut = lines.length > maxLines;
  return lines
    .slice(0, maxLines)
    .map((l, i) => (l.length > width || (cut && i === maxLines - 1) ? l.slice(0, width - 1) + "…" : l));
}

export const lines = (arr, x, y, dy) =>
  arr.map((l, i) => `<tspan x="${x}" y="${y + i * dy}">${esc(l)}</tspan>`).join("");

export const icon = (name, x, y, size, attrs) =>
  `<path transform="translate(${x} ${y}) scale(${size / 16})" fill-rule="evenodd" ${attrs} d="${ICONS[name]}"/>`;

// Lays out [width, svg] items left to right from x; each item draws from its own origin.
export const row = (items, x, gap) =>
  items
    .map(([w, s]) => {
      const g = `<g transform="translate(${x} 0)">${s}</g>`;
      x += w + gap;
      return g;
    })
    .join("");

// The language, star and fork items most styles show, centred on the line cy.
export const stats = (r, { cy, size = 12.5, text = "", icon: iconAttrs = "" }) => {
  const label = (x, s) => `<text x="${x}" y="${cy + size * 0.36}" font-size="${size}" ${text}>${esc(s)}</text>`;
  return [
    [16 + textWidth(r.lang.name, size), `<circle cx="5" cy="${cy}" r="5" fill="${r.lang.color}"/>${label(16, r.lang.name)}`],
    [20 + textWidth(r.stars, size), icon("star", 0, cy - 7, 14, iconAttrs) + label(20, r.stars)],
    [20 + textWidth(r.forks, size), icon("fork", 0, cy - 7, 14, iconAttrs) + label(20, r.forks)],
  ];
};

export const svg = (title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="150" viewBox="0 0 400 150" role="img"><title>${esc(title)}</title>
${body}
</svg>`;

export function normalize(r) {
  const lang = r.primaryLanguage ?? { name: "Unknown" };
  return {
    owner: r.owner.login,
    name: r.name,
    description: r.description || "No description provided",
    stars: compact.format(r.stargazerCount),
    forks: compact.format(r.forkCount),
    // The colour goes into attributes unescaped, so only accept a plain hex value.
    lang: { name: lang.name, color: /^#[0-9a-f]{3,8}$/i.test(lang.color) ? lang.color : "#858585" },
  };
}

export async function fetchRepo(owner, name, token = process.env.GITHUB_TOKEN) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { authorization: `bearer ${token}`, "user-agent": "github-readme-stats-plus" },
    body: JSON.stringify({ query: QUERY, variables: { owner, name } }),
  });
  const { data, errors, message } = await res.json();
  if (!data?.repository) throw new Error(errors?.[0]?.message ?? message ?? "Repository not found");
  // A token with repo scope can see private repos; never render those publicly.
  if (data.repository.isPrivate) throw new Error("Repository not found");
  return normalize(data.repository);
}

export const renderError = (message) =>
  svg(
    "Error",
    `<rect x=".5" y=".5" width="399" height="149" rx="12" fill="#0d1117" stroke="#30363d"/>
<g font-family="${FONT}">
  <text x="24" y="48" font-size="17" font-weight="600" fill="#f85149">Couldn't render this card</text>
  <text font-size="13" fill="#9198a1">${lines(wrap(message, 52, 3), 24, 78, 18)}</text>
</g>`,
  );
