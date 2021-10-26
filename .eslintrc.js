module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest/globals': true
  },
  'plugins': ['jest'],
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'warn',
      'single', 
      { 'avoidEscape': true }
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
