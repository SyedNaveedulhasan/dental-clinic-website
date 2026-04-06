/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f2',
          100: '#f7ede0',
          200: '#edd9bf',
          300: '#dfc095',
          400: '#cea06a',
          500: '#be844a',
          600: '#a86c3a',
          700: '#8c5630',
          800: '#72452b',
          900: '#5e3a26',
          950: '#321d12',
        },
        cream: {
          50:  '#fffef9',
          100: '#fdfbf2',
          200: '#faf5e4',
          300: '#f4ecd0',
        }
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'slide-right':'slideRight 0.7s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // FIX: translateX(-60px/-30px) → translateX(-8px/8px)
        // Bade values element ko viewport se bahar push karte the → horizontal scroll
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}