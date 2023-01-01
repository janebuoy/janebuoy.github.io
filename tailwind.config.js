const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      serif: ['Signika', ...defaultTheme.fontFamily.serif],
      sans: [
        'Clear Sans',
        'Roboto',
        'Fira Sans',
        ...defaultTheme.fontFamily.sans,
      ],
    },
    fontSize: {
      xs: '0.63rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.563rem',
      '2xl': '1.953rem',
      '3xl': '2.441rem',
      '4xl': '3.052rem',
    },
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
};
