import { fetchRepo, renderError } from "../card.js";
import styles from "../styles/index.js";

const VALID = /^[\w.-]+$/;

const svg = (body, cache) =>
  new Response(body, {
    headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": cache },
  });

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "";
  const repo = searchParams.get("repo") ?? "";
  const style = searchParams.get("style") ?? "adaptive";
  try {
    if (!VALID.test(username) || !VALID.test(repo)) throw new Error("Invalid username or repo");
    if (!Object.hasOwn(styles, style)) throw new Error(`Unknown style. Use one of: ${Object.keys(styles).join(", ")}`);
    // Required, so nobody else can spend the deployer's GitHub API quota on their own cards.
    const allowed = process.env.ALLOWED_USERS?.toLowerCase().split(",").map((u) => u.trim());
    if (!allowed) throw new Error("Set ALLOWED_USERS on the server");
    if (!allowed.includes(username.toLowerCase())) throw new Error("This user is not allowed on this server");
    // The CDN serves a card for a day, so each repo costs about one GitHub API call per day.
    return svg(
      styles[style](await fetchRepo(username, repo)),
      "public, max-age=14400, s-maxage=86400, stale-while-revalidate=604800",
    );
  } catch (e) {
    // 200 so the README shows the message instead of a broken image.
    return svg(renderError(e.message), "no-store");
  }
}
