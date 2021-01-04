// eslint-disable-next-line @typescript-eslint/no-require-imports

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
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
