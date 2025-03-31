/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Restrict the color palette to black and white
        black: '#000000',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
