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
        // Restrict the color palette to black and white
        black: '#000000',
        white: '#FFFFFF',
      },
      // Use a grayscale palette for any necessary in-between shades
      grayscale: {
        100: '#F7F7F7',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
