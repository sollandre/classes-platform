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
      backgroundImage: {
        blur: 'url(/src/assets/bg-blur.png), url(/src/assets/bg-react.png)',
        react: 'url(/src/assets/bg-react.png)',
      },
      colors: {
        green: {
          300:'#00B37E',
          500:'#00875F',
          '500-30':'#00875F4D',
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
        'appearLeft': 'appearLeft .2s ease-out forwards',
        'fadeRight': 'fadeRight .2s ease-in forwards'
      },
      keyframes: {
        appearLeft: {
          '0%':{
            transform: 'translateX(100%)',
            visibility: 'hidden',
          },
          '100%': {
            transform: 'translateX(0%)'
          }
        },
        fadeRight: {
          '100%': {
            transform: 'translateX(100%)',
            visibility: 'hidden',
          }
        }
      },
      gradientColorStops: ({theme}) => {
        const allStops = {}
        for (let stop = 10; stop <= 100; stop+=10) {
          const allColorStops = {}
          for(color in theme.colors){
            if(typeof theme.colors[color] === 'object'){
              const colorStopsArr = Object.entries(theme.colors[color]).map(([key, value]) => {
                return [key, `${value} ${stop}%`]
              })
              const colorStops = Object.fromEntries(colorStopsArr)
              allColorStops[color] = colorStops
            }
          }
          allStops[`${stop}%`] = allColorStops
        }
        return {...allStops}
      }
    },
  },
  plugins: [],
}
