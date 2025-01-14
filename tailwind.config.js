/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
          light: '#81C784',
        },
        secondary: {
          DEFAULT: '#2C3E50',
          dark: '#1A252F',
          light: '#34495E',
        },
      },
    },
  },
  plugins: [],
};