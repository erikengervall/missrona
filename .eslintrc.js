module.exports = {
  plugins: ['jest', 'no-only-tests', 'security', 'sonarjs'],
  root: true,
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 8,
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'sonarjs/no-duplicate-string': 'off',
    'no-unused-vars': 'off',
    'no-only-tests/no-only-tests': 2,
    'object-shorthand': ['error', 'always'],
    semi: ['error', 'never'],
    'security/detect-non-literal-fs-filename': 'off',
  },
}
