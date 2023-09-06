/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      display: ['group-hover'],
      colors: {
        cyan: {
          200: "#E3EDF7",
          400: "#1565C0",
          500: "#1E244B",
          600: "#1565C0",
          900: "#1F254C"
        },
        gray: {
          100: "#ECECEC",
          200: "#F8F8F8",
          300:"#969696",
          400: "#84818A",
          800: "#585757",
          900: "#1C1C1C"
        }
      },
      minHeight: {
        '64': '16rem',
      },
      fontFamily: {
        'inter':['Inter', 'sans-serif'],
        'sans':['Inter', 'sans-serif']
      },
      height: {
        '100': "35rem"
      },
      width: {
        '100': '35rem'
      }
    },
  },
  plugins: [],
})
