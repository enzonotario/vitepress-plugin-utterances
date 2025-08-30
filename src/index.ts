import type { App, Plugin } from 'vue'
import Utterances from './Utterances.vue'

export { Utterances }

export interface UtterancesOptions {
  componentName?: string
}

const VitePressPluginUtterances: Plugin = {
  install(app: App, options?: UtterancesOptions) {
    const name = options?.componentName || 'Utterances'
    app.component(name, Utterances)
  },
}

export default VitePressPluginUtterances
