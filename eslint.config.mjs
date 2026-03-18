// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Formatting — let Prettier or editor handle these
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/comma-dangle': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/arrow-parens': 'off',

    // Allow v-html (needed for Mermaid rendering)
    'vue/no-v-html': 'off',

    // Allow any where needed (strict typing not always possible with dynamic content)
    '@typescript-eslint/no-explicit-any': 'warn'
  }
})
