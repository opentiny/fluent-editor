const stylistic = require('@stylistic/eslint-plugin')

const customized = stylistic.configs.customize({
  // the following options are the default values
  indent: 2,
  quotes: 'single',
  semi: false,
})

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    ...customized.rules,
    // js/ts
    'eol-last': 'error',
    'no-trailing-spaces': 'error',
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-multi-spaces': 'error',
    'quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'camelcase': ['error', { properties: 'never' }],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  overrides: [
    {
      files: ['packages/docs/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],

}
