import process from 'node:process'
import { presetDaisy } from '@ameinhardt/unocss-preset-daisy'
import presetWind4 from '@unocss/preset-wind4'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

const gaId = process.env.GA_ID || 'G-TEST'

export default defineConfig({
  title: 'VitePress Plugin Utterances',
  description: 'A VitePress plugin that integrates the Utterances comments widget (GitHub Issues).',
  themeConfig: {
    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/enzonotario/vitepress-plugin-utterances' },
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/enzonotario/vitepress-plugin-utterances/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present <a href="https://enzonotario.me">Enzo Notario</a>',
    },
  },
  vite: {
    plugins: [
      UnoCSS({
        presets: [
          presetWind4(),
          presetDaisy(),
        ],
      }),
    ],
  },
  head: [
    // Google Analytics
    [
      'script',
      { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}` },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');`,
    ],

    // OG Tags
    ['meta', { property: 'og:title', content: 'VitePress Plugin Utterances' }],
    ['meta', { property: 'og:description', content: 'A VitePress plugin that integrates the Utterances comments widget (GitHub Issues).' }],
    ['meta', { property: 'og:url', content: 'https://vitepress-plugin-utterances.vercel.app/' }],
    ['meta', { property: 'og:type', content: 'website' }],

    // Twitter Tags
    ['meta', { name: 'twitter:title', content: 'VitePress Plugin Utterances' }],
    ['meta', { name: 'twitter:description', content: 'A VitePress plugin that integrates the Utterances comments widget (GitHub Issues).' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
})
