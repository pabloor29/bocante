/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#1c3a28',
          800: '#275038',
          700: '#306249',
          600: '#3d7a5a',
          500: '#4d9068',
          400: '#6bae85',
          100: '#eaf3ed',
        },
        golden: {
          700: '#a67836',
          600: '#c4944a',
          500: '#d4a96a',
          100: '#fbf0e0',
        },
        parchment: {
          300: '#e5d9c8',
          200: '#f0e8dc',
          100: '#faf7f2',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
};
