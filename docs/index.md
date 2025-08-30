---
layout: home
hero:
  text: VitePress Plugin Utterances
  tagline: Add Utterances (GitHub Issues) comments to your VitePress site
  actions:
    - theme: brand
      text: Example
      link: '#example'
    - theme: alt
      text: GitHub
      link: https://github.com/enzonotario/vitepress-plugin-utterances
features:
  - title: GitHub Issues Comments
    details: Use GitHub issues as a lightweight commenting system via Utterances.
  - title: Easy Integration
    details: Minimal setup. Works with VitePress slots and dark/light theme out of the box.
  - title: Open Source & No Tracking
    details: Powered by Utterances — no ads, no tracking, and data lives in your repo.
---

## Install

:::code-group

```bash[npm]
npm install vitepress-plugin-utterances
```

```bash[yarn]
yarn add vitepress-plugin-utterances
```

```bash[pnpm]
pnpm add vitepress-plugin-utterances
```

```bash[bun]
bun install vitepress-plugin-utterances
```

:::

## Setup

```ts
import DefaultTheme from 'vitepress/theme'
import VPUtterances from 'vitepress-plugin-utterances' // [!code ++]

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VPUtterances, { // [!code ++]
      // componentName: 'Utterances', // Optionally, customize the component name. // [!code ++]
    }) // [!code ++]
  },
}
```

## Usage

Add the `<Utterances />` component to your markdown files.

```markdown
# My Page

<Utterances repo="utterance/utterances" issue-term="homepage" />
```

- `repo` (required): "owner/repo" of the repository where issues will be created/read.
- `issueTerm`: "pathname" | "url" | "title" | "og:title" | string. Default: "pathname".
- `label`: optional label for created issues.
- `theme`: Utterances theme (e.g. "github-light", "github-dark").
- `crossorigin`: "anonymous" (default) | "use-credentials".

## How it works

- The widget searches for an existing GitHub issue for the current page using url, pathname, or title.
- If no matching issue is found, utterances-bot automatically creates one when someone comments.
- Users authenticate via GitHub OAuth to comment, or they can comment directly on the GitHub issue.

## More info

Visit the Utterances website for more details:

- https://utteranc.es/

## Example

<Builder />
