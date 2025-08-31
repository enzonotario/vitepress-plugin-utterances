import { useTUI } from 'vitepress-theme-tui'
import DefaultTheme from 'vitepress/theme'
import VitePressPluginUtterances from '../../../src/index'
import Builder from './components/Builder.vue'
import 'vitepress-theme-tui/style.css'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    useTUI({
      theme: 'default',
    })

    // Register plugin that exposes <Utterances />
    ctx.app.use(VitePressPluginUtterances, {
      // componentName: 'Utterances',
    })
    // Register docs-only helper component
    ctx.app.component('Builder', Builder)
  },
}
