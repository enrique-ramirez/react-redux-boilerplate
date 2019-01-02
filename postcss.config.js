module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      browsers: ['last 2 major versions', '> 5%', 'ie 11'],
      features: {
        'color-mod-function': { unresolved: 'warn' },
      },
    },
  },
}
