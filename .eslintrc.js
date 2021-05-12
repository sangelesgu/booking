const Rules = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': Rules.OFF,
    'no-console': Rules.OFF,
    'no-await-in-loop': Rules.OFF,
    'class-methods-use-this': Rules.OFF,
    'eol-last': Rules.OFF,
    'import/prefer-default-export': Rules.OFF,
  },
};