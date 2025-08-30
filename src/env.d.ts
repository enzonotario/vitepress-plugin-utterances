/// <reference types="vite/client" />

// Allow importing .vue files in TypeScript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
