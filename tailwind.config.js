/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Warm stone / concrete — primary scale */
        stone: {
          50:  '#F6F4F0',
          100: '#EDE9E2',
          200: '#D8D1C6',
          300: '#BCB2A4',
          400: '#948A7A',
          500: '#6A6050',
          600: '#4A4234',
          700: '#302A1E',
          800: '#1C1810',
          900: '#0E0B08',
        },
        /* Amber gold — accent */
        amber: {
          50:  '#FFFCF0',
          100: '#FFF5CC',
          200: '#FFEAA0',
          300: '#FFD760',
          400: '#F5B520',
          500: '#D4941A',
          600: '#A87214',
          700: '#7C520C',
          800: '#4C3006',
          900: '#281800',
        },
      },
    },
  },
  plugins: [],
};
