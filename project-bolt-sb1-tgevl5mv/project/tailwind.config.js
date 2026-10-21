/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fbf7f0',
          100: '#f6efe2',
          200: '#ece0c8',
          300: '#ddc9a3',
          400: '#cfb98a',
        },
        clay: {
          400: '#d9a878',
          500: '#c98a55',
          600: '#a96d3a',
          700: '#8a572c',
        },
        skysoft: '#a7c7e7',
        blush: '#f6b6c3',
        mint: '#a8dadc',
        gold: '#f7d794',
        terracotta: '#e07a5f',
        ink: {
          DEFAULT: '#3a3328',
          soft: '#6b6253',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
