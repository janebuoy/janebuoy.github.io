const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      serif: ['Space Grotesk', ...defaultTheme.fontFamily.serif],
      sans: [
				'Signika Negative',
        'Clear Sans',
        'Roboto',
        'Fira Sans',
        ...defaultTheme.fontFamily.sans,
      ],
    },
    fontSize: {
      xs: '0.63rem',
      sm: '0.8rem',
      code: '0.85rem',
      base: '1rem',
      lg: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
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
