# github-readme-stats-plus

Repository pin cards for your GitHub profile README, in 26 styles. You host it yourself, for yourself: one small Vercel function with no dependencies.

<p>
  <img src="examples/aurora.svg" width="49%" alt="Aurora style" />
  <img src="examples/neon.svg" width="49%" alt="Neon style" />
</p>

## Styles

Pick one with `&style=<name>`. The default is `adaptive`, which follows the viewer's light or dark theme. A few favourites:

<table>
<tr><td><img src="examples/aurora.svg" alt="aurora" /><br /><code>aurora</code></td><td><img src="examples/holo.svg" alt="holo" /><br /><code>holo</code></td><td><img src="examples/cassette.svg" alt="cassette" /><br /><code>cassette</code></td></tr>
<tr><td><img src="examples/splitflap.svg" alt="splitflap" /><br /><code>splitflap</code></td><td><img src="examples/swiss.svg" alt="swiss" /><br /><code>swiss</code></td><td><img src="examples/synthwave.svg" alt="synthwave" /><br /><code>synthwave</code></td></tr>
</table>

**[See all styles in the gallery →](STYLES.md)**

Most styles take their accent from the repository's main language colour, as GitHub shows it.

## Usage

Once your copy is deployed (see below), add cards to your profile README:

```html
<a href="https://github.com/esentis/load_switch">
  <img width="400" alt="load_switch" src="https://YOUR-DEPLOYMENT.vercel.app/api/pin?username=esentis&repo=load_switch&style=aurora" />
</a>
```

For a grid, put several `<a><img></a>` blocks inside `<p align="center">` and give each image the same width, for example `width="278"` for three per row.

| Parameter | Required | Description |
| --- | --- | --- |
| `username` | yes | Owner of the repository. Must be listed in `ALLOWED_USERS`. |
| `repo` | yes | Repository name. |
| `style` | no | One of the styles above. Defaults to `adaptive`. |

If something goes wrong (a typo in the repo name, an unknown style, a user who isn't allowed), the card itself shows the reason instead of a broken image.

## Deploy your own

This project is meant to be forked: everyone runs their own copy with their own GitHub token, so nobody depends on someone else's server or API quota.

### 1. Create a GitHub token

Go to [github.com/settings/tokens/new](https://github.com/settings/tokens/new), give it a name, pick an expiry and **don't tick any scopes**. Cards only need public data. Private repositories are never rendered, even with a token that could see them.

### 2. Deploy to Vercel

The quickest way is the button. It forks the repo into your account and asks for the two environment variables:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fesentis%2Fgithub-readme-stats-plus&env=GITHUB_TOKEN,ALLOWED_USERS&envDescription=GITHUB_TOKEN%3A%20a%20GitHub%20token%20with%20no%20scopes.%20ALLOWED_USERS%3A%20your%20GitHub%20username.)

Or fork the repo, clone it, and use the CLI:

```bash
npx vercel link
npx vercel env add GITHUB_TOKEN production
npx vercel env add ALLOWED_USERS production
npx vercel --prod
```

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `GITHUB_TOKEN` | yes | GitHub token with no scopes. |
| `ALLOWED_USERS` | yes | Comma-separated GitHub usernames whose repos this deployment will render, for example `esentis` or `esentis,a-friend`. Every other username gets an error card, so strangers can't use up your API quota. |

After changing a variable, redeploy for it to take effect.

## How it works

- `api/pin.js` checks the request, fetches the repo through GitHub's GraphQL API and returns an SVG.
- Cards are cached on Vercel's CDN for a day, so each card costs about one API call per day however often it's viewed. A no-scope token allows 5,000 points an hour, which is plenty for a personal profile.
- Text is never measured by a real font engine. Widths are estimated from character counts, and long names and descriptions are truncated with "…".

### Good to know

- **`adaptive` follows the viewer's operating system theme**, not their GitHub theme setting. Someone with a dark OS who chose GitHub's light theme sees a dark card.
- **Animations** are plain SVG animations. They play in browsers, but GitHub may cache images for a while, and some email or RSS readers show a still frame.
- **Fonts** come from the viewer's system. `brutalist` looks best where Arial Black is installed (macOS and Windows) and falls back to bold Arial elsewhere.

## Add your own style

1. Run `npm run new -- <name> "Group title"`. It creates `styles/<name>.js` from a starter template and registers it in `styles/index.js`, under that group in the gallery (a new group if it doesn't exist yet).
2. Edit the file. Its default export takes the repo data and returns an SVG string, and `about` is its one-line description for the gallery. Copying the closest existing style is often the fastest start.
3. Run `npm run gallery` to regenerate the previews in `examples/` and the `STYLES.md` page, then `npm test`. The tests check every style escapes its text, truncates long names and has an `about`.

For micro-animations, wrap CSS keyframes in `motion()`: they then stay off for viewers whose system asks for reduced motion. For rotations and scaling, add `transform-box: fill-box; transform-origin: center` so elements turn around their own centre.

The repo object a style receives:

```js
{
  owner: "esentis",
  name: "load_switch",
  description: "A highly customizable toggle switch with a loading state.",
  stars: "20",   // already formatted: "1.2K", "3.4M"
  starCount: 20, // the raw numbers, for anything that needs maths
  forkCount: 3,
  forks: "3",
  lang: { name: "Dart", color: "#00B4AB" },
}
```

`card.js` has the shared helpers: `svg()` for the frame, `esc()` for escaping, `fit()` and `wrap()` for truncating text, `stats()` with `row()` for the language, star and fork line, and `motion()` for animations. Always pass repo text through `esc()`: names and descriptions come from strangers' repositories.

## Development

Needs Node 18 or newer. There's nothing to install.

```bash
npm test
```

```bash
npm run gallery
```

To preview a live card locally, run `npx vercel dev` with `GITHUB_TOKEN` and `ALLOWED_USERS` set, then open `http://localhost:3000/api/pin?username=YOU&repo=REPO&style=aurora`.

## Credits

Inspired by [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats). The star and fork icons are [GitHub Octicons](https://github.com/primer/octicons) (MIT).

## License

[MIT](LICENSE)
