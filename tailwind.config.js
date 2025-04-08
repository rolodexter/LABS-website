/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        highlightBorder: {
          '0%': { borderColor: 'rgba(0, 0, 0, 0.3)' },
          '50%': { borderColor: 'rgba(0, 0, 0, 0.8)' },
          '100%': { borderColor: 'rgba(0, 0, 0, 0.3)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
        delayFadeIn: 'fadeIn 0.4s ease-in-out 0.1s forwards',
        highlightBorder: 'highlightBorder 2s ease-in-out infinite',
        blink: 'blink 1s ease-in-out infinite',
        typing: 'typing 1.5s ease-out',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
