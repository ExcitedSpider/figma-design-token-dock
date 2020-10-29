// eslint-disable-next-line @typescript-eslint/no-require-imports
const prettierConfig = require('./.prettierrc.js');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    '@tencent/eslint-config-tencent',
    '@tencent/eslint-config-tencent/ts',
    'plugin:prettier/recommended',
    // '@typescript-eslint/parser',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': ['warn', prettierConfig],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        /** typescript 直接使用 tsc 检查 undef */
        'no-undef': 'off',
      },
    },
  ],
};
