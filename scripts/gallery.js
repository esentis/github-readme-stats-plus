// Regenerates the README previews in examples/ from fixed sample data: npm run gallery
import { mkdirSync, writeFileSync } from "node:fs";
import styles from "../styles/index.js";

const repo = {
  owner: "esentis",
  name: "load_switch",
  description: "A highly customizable toggle switch with a loading state.",
  stars: "20",
  starCount: 20,
  forks: "3",
  lang: { name: "Dart", color: "#00B4AB" },
};

mkdirSync("examples", { recursive: true });
for (const [name, render] of Object.entries(styles)) writeFileSync(`examples/${name}.svg`, render(repo));
