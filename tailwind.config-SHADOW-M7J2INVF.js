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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'title': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'subtitle': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }]
      },
      colors: {
        'lab-black': '#000000',
        'lab-white': '#ffffff',
        'lab-offwhite': '#f7f7f7',
        'lab-gray': {
          100: '#f4f4f4',
          200: '#e6e6e6',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      gridTemplateColumns: {
        'article-1': 'repeat(1, minmax(0, 1fr))',
        'article-2': 'repeat(2, minmax(0, 1fr))',
        'article-3': 'repeat(3, minmax(0, 1fr))',
        'article-4': 'repeat(4, minmax(0, 1fr))',
        'editorial': '1fr 2fr',
        'periodical': '2fr 1fr',
        'feature': '1fr 1fr 1fr',
      },
      gridTemplateRows: {
        'article-1': 'repeat(1, minmax(0, 1fr))',
        'article-2': 'repeat(2, minmax(0, 1fr))',
        'article-3': 'repeat(3, minmax(0, 1fr))',
      },
      borderWidth: {
        '0.5': '0.5px',
        '1': '1px',
        '3': '3px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
