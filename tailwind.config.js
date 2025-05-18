/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F7F7',
          100: '#C5EAE9',
          200: '#A3DDDC',
          300: '#82D0CF',
          400: '#60C3C2',
          500: '#38B2AC', // Primary teal
          600: '#2D8F8A',
          700: '#236C68',
          800: '#184846',
          900: '#0E2423',
        },
        secondary: {
          50: '#F5F0FF',
          100: '#E9DEFF',
          200: '#D4BDFF',
          300: '#BF9DFF',
          400: '#AA7CFF',
          500: '#9F7AEA', // Secondary purple
          600: '#8056DC',
          700: '#6040B0',
          800: '#402A84',
          900: '#20154A',
        },
        accent: {
          50: '#FEF2EA',
          100: '#FDE0CC',
          200: '#FBCEAE',
          300: '#F9BC90',
          400: '#F7AA72',
          500: '#ED8936', // Accent orange
          600: '#D6762A',
          700: '#B0621F',
          800: '#894D14',
          900: '#63370A',
        },
        success: {
          500: '#48BB78',
        },
        warning: {
          500: '#ECC94B',
        },
        error: {
          500: '#F56565',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};