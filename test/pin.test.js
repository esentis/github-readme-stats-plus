import assert from "node:assert/strict";
import test from "node:test";
import { normalize, wrap } from "../card.js";
import styles from "../styles/index.js";
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

for (const [name, render] of Object.entries(styles)) {
  test(`${name} escapes text and truncates long names`, () => {
    const body = render(normalize({ ...raw, name: "a".repeat(80) })).replace(/<title>.*?<\/title>/, "");
    assert.ok(body.includes("&#60;b&#62;switch"));
    assert.ok(!body.includes("<b>"));
    assert.ok(!body.includes("a".repeat(60)));
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
