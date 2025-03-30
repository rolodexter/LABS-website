/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Using class-based dark mode for system preference detection
  theme: {
    extend: {
      colors: {
        // Strictly limit our color palette to black and white shades as per requirements
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#000000',
            a: {
              color: '#000000',
              '&:hover': {
                color: '#000000',
              },
            },
            h1: {
              color: '#000000',
            },
            h2: {
              color: '#000000',
            },
            h3: {
              color: '#000000',
            },
            h4: {
              color: '#000000',
            },
            h5: {
              color: '#000000',
            },
            h6: {
              color: '#000000',
            },
            strong: {
              color: '#000000',
            },
            code: {
              color: '#000000',
            },
            figcaption: {
              color: '#000000',
            },
            blockquote: {
              color: '#000000',
            },
          },
        },
        dark: {
          css: {
            color: '#FFFFFF',
            a: {
              color: '#FFFFFF',
              '&:hover': {
                color: '#FFFFFF',
              },
            },
            h1: {
              color: '#FFFFFF',
            },
            h2: {
              color: '#FFFFFF',
            },
            h3: {
              color: '#FFFFFF',
            },
            h4: {
              color: '#FFFFFF',
            },
            h5: {
              color: '#FFFFFF',
            },
            h6: {
              color: '#FFFFFF',
            },
            strong: {
              color: '#FFFFFF',
            },
            code: {
              color: '#FFFFFF',
            },
            figcaption: {
              color: '#FFFFFF',
            },
            blockquote: {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
  },
  plugins: [],
};