const config = {
  extends: ['@tencent/eslint-config-tencent', '@tencent/eslint-config-tencent/ts', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-parens': ['error', 'as-needed'],
  },
  globals: {
    figma: 'readonly',
    __html__: 'readonly',
    ChildrenMixin: 'readonly',
    SceneNode: 'readonly',
    UIAPI: 'readonly',
  },
};

module.exports = config;
