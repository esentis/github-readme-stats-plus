// Scaffolds a style: npm run new -- <name> ["Group title"]
// Creates styles/<name>.js from a starter template and registers it in styles/index.js.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const [name, group = "Community"] = process.argv.slice(2);
if (!/^[a-z][a-z0-9]*$/.test(name ?? "")) throw new Error('Usage: npm run new -- <lowercase-name> ["Group title"]');
const file = `styles/${name}.js`;
if (existsSync(file)) throw new Error(`${file} already exists`);

writeFileSync(
  file,
  `import { FONT, esc, fit, lines, motion, row, stats, svg, wrap } from "../card.js";

export const about = "TODO: one line describing how ${name} looks.";

// TODO: one line describing the look.
export default (r) =>
  svg(
    r.name,
    \`\${motion(".glow { animation: pulse 3s ease-in-out infinite } @keyframes pulse { 50% { opacity: .4 } }")}
<rect width="400" height="150" rx="14" fill="#111827"/>
<circle class="glow" cx="350" cy="40" r="60" fill="\${r.lang.color}" fill-opacity=".35"/>
<g font-family="\${FONT}">
  <text x="24" y="44" font-size="21" font-weight="700" fill="#fff">\${esc(fit(r.name, 352, 21))}</text>
  <text font-size="13.5" fill="#cbd5e1">\${lines(wrap(r.description, 50), 24, 70, 18)}</text>
  \${row(stats(r, { cy: 122, text: 'fill="#fff"', icon: 'fill="#94a3b8"' }), 24, 22)}
</g>\`,
  );
`,
);

let index = readFileSync("styles/index.js", "utf8");
const imports = index.match(/^import \* as .*$/gm);
index = index.replace(imports.join("\n"), [...imports, `import * as ${name} from "./${name}.js";`].sort().join("\n"));
const key = group.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const line = new RegExp(`^(  (?:${key}|"${key}"): \\{ .*?)( \\},)$`, "m");
index = line.test(index)
  ? index.replace(line, `$1, ${name}$2`)
  : index.replace(/\n};\n\nexport default/, `\n  ${JSON.stringify(group)}: { ${name} },\n};\n\nexport default`);
writeFileSync("styles/index.js", index);
console.log(`Created ${file} in "${group}". Edit it, then run npm run gallery && npm test.`);
