import assert from "node:assert/strict";
import test from "node:test";
import { isLight, normalize, wrap } from "../card.js";
import styles, { groups } from "../styles/index.js";
import { xp } from "../styles/pixel.js";
import { GET } from "../api/pin.js";

const raw = {
  owner: { login: "esentis" },
  name: "load_switch",
  description: "A <b>switch</b> & more",
  stargazerCount: 1234,
  forkCount: 3,
  primaryLanguage: { name: "Dart", color: "#00B4AB" },
};

test("normalize formats counts and guards the language colour", () => {
  assert.equal(normalize(raw).stars, "1.2K");
  assert.equal(normalize({ ...raw, primaryLanguage: null }).lang.color, "#858585");
  assert.equal(normalize({ ...raw, primaryLanguage: { name: "X", color: '"/><script>' } }).lang.color, "#858585");
});

test("wrap limits lines and marks truncation", () => {
  const lines = wrap("word ".repeat(100), 20, 2);
  assert.equal(lines.length, 2);
  assert.ok(lines.every((l) => l.length <= 20));
  assert.ok(lines[1].endsWith("…"));
  assert.equal(wrap("x".repeat(30), 20)[0].length, 20);
});

test("isLight tells light language colours from dark ones", () => {
  assert.equal(isLight("#f1e05a"), true); // JavaScript yellow
  assert.equal(isLight("#00B4AB"), false); // Dart teal
  assert.equal(isLight("#fff"), true);
});

test("pixel XP bar fills toward the next star milestone", () => {
  assert.deepEqual(xp(0), { next: 10, blocks: 0 });
  assert.deepEqual(xp(20), { next: 25, blocks: 8 });
  assert.deepEqual(xp(25), { next: 50, blocks: 5 });
  assert.equal(xp(2_000_000).blocks, 10);
});

test("every style has an about line for the gallery", () => {
  for (const group of Object.values(groups))
    for (const [name, style] of Object.entries(group)) assert.ok(style.about?.length > 10, `${name} needs an about`);
});

for (const [name, render] of Object.entries(styles)) {
  test(`${name} escapes text and truncates long names`, () => {
    const evil = render(normalize({ ...raw, name: "<b>x" }));
    assert.ok(evil.includes("&#60;b&#62;x"));
    assert.ok(!evil.includes("<b>"));
    const long = render(normalize({ ...raw, name: "a".repeat(80) })).replace(/<title>.*?<\/title>/, "");
    assert.ok(!long.includes("a".repeat(60)));
  });
}

test("API rejects bad requests without calling GitHub", async () => {
  const get = (qs) => GET(new Request(`http://x/api/pin?${qs}`)).then((r) => r.text());
  process.env.ALLOWED_USERS = "esentis";
  assert.match(await get("username=esentis&repo=%3Cscript%3E"), /Invalid username or repo/);
  assert.match(await get("username=esentis&repo=x&style=nope"), /Unknown style/);
  assert.match(await get("username=someone&repo=x"), /not allowed/);
  delete process.env.ALLOWED_USERS;
  assert.match(await get("username=esentis&repo=x"), /ALLOWED_USERS/);
});
