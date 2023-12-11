import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '700px',
      md: '900px',
      xl: '1300px',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    animation: {
      'popup': 'popup .1s ease-in-out',
    },
    keyframes: {
      'popup': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    extend: {
      colors: {
        'primary': 'rgb(var(--primary))',
        'secondary': 'rgb(var(--secondary))',
        'grey-dark': 'rgb(var(--grey-dark))',
        'grey-light': 'rgb(var(--grey-light))',
      }
    },
  },
  plugins: [],
}
export default config
