/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core colors
        black: '#000000',
        white: '#FFFFFF',
        // Grayscale for subtle variations
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F4',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography')
  ],
};
