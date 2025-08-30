import DefaultTheme from 'vitepress/theme'
import VitePressPluginUtterances from '../../../src/index'
import Builder from './components/Builder.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    // Register plugin that exposes <Utterances />
    ctx.app.use(VitePressPluginUtterances, {
      // componentName: 'Utterances',
    })
    // Register docs-only helper component
    ctx.app.component('Builder', Builder)
  },
}
