/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,html}'],
  corePlugins: {
    // Disabled: MUI's CssBaseline already handles the reset; preflight breaks MUI buttons.
    preflight: false,
  },
  important: '#root',
  theme: {
    extend: {
      colors: {
        oriontek: {
          navy: '#0F1E47',
          'navy-dark': '#091537',
          blue: '#3B5BFF',
          'blue-dark': '#2845D9',
          purple: '#7B2CFF',
          'purple-dark': '#5A1ECC',
          background: '#F4F6FB',
          border: '#E2E7F2',
        },
      },
      backgroundImage: {
        'oriontek-brand': 'linear-gradient(135deg, #3B5BFF 0%, #7B2CFF 100%)',
      },
    },
  },
  plugins: [],
};
