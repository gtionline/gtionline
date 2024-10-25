module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'off',
    'max-len': 'off',
    'vue/max-len': 'off',
    'vue/html-button-has-type': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vue/no-async-in-computed-properties': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'import/no-cycle': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'camelcase': 'off',
    'default-param-last': 'off',
    'no-continue': 'off',
    'max-classes-per-file': 'off',
    'no-useless-constructor': 'off',
    'no-param-reassign': 'off',
    'no-bitwise': 'off',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue', '.json'],
      },
    },
  },
};
