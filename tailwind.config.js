const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      'serif': ['Geo', ...defaultTheme.fontFamily.serif],
      'sans': ['Inter', ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      xs: '0.63rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    }
  }
}