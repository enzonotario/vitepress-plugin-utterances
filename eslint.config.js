import antfu from '@antfu/eslint-config'

export default antfu({
  lessOpinionated: true,
  formatters: {
    markdown: false,
  },
  vue: true,
  typescript: true,
})
