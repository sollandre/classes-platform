/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors: {
        green: {
          300:'#00B37E',
          500:'#00875F',
          700: '#015F43'
        },
        blue: {
          500: '#81d8f7'
        },
        orange: {
          500: '#fba94c'
        },
        red: {
          500: '#f75a68'
        },
        gray: {
          100: '#e1e1e6',
          200: '#c4c4cc',
          300: '#8d8d99',
          500: '#323238',
          600: '#29292e',
          700: '#121214',
          900: '#09090a'
        }
      },
      animation: {
        'appearLeft': 'appearLeft .2s ease-out'
      },
      keyframes: {
        appearLeft: {
          '0%':{
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)'
          }
        }
      }
    },
  },
  plugins: [],
}
