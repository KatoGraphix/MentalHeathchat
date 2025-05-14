/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#E6F0FD',
          200: '#CCE1FC',
          300: '#99C4F9',
          400: '#66A6F6',
          500: '#4A90E2', // Primary blue
          600: '#3B82F6',
          700: '#2563EB',
          800: '#1D4ED8',
          900: '#1E3A8A',
        },
        purple: {
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#9B59B6', // Primary purple
          800: '#6B21A8',
          900: '#581C87',
        },
        green: {
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#2ECC71', // Primary green
          800: '#166534',
          900: '#14532D',
        }
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};