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
        warm: {
          50:  '#FAF8F5',
          100: '#F4EEE8',
          200: '#E8DDD3',
          300: '#D8CCBF',
          400: '#C2B3A3',
          500: '#A08E7E',
          600: '#7C6D60',
          700: '#5C4F45',
          800: '#3A2E27',
          900: '#1A120C',
        },
        blush: {
          50:  '#FFF9F7',
          100: '#F8EAE5',
          200: '#EFD2C7',
          300: '#E4B4A5',
          400: '#D4958A',
          500: '#C0736A',
          600: '#A55652',
          700: '#854040',
          800: '#633030',
          900: '#3D1818',
        },
        champagne: {
          200: '#F0E3CD',
          300: '#E8D5BB',
          400: '#D9C09A',
          500: '#C8A882',
          600: '#B58E64',
          700: '#9A7248',
        },
      },
      fontSize: {
        'display':    ['clamp(64px, 8vw, 120px)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(48px, 6vw, 80px)',  { lineHeight: '0.95', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '26': '6.5rem', '30': '7.5rem',
      },
    },
  },
  plugins: [],
};
