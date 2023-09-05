/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        black: "#263238",
        orange: "#ef8200",
        purpleHover: "#b186ea",
        orangeBackGround: "#FFEBD3",
        blue: "#00A2F0",
        white: "#F9FDFF",
        green: "#74F018",
        darkOrange: "#E37C00",
        grey: "#D7D7D7"
      },
      fontFamily: {
        'rubik': ['Rubik'],
        'raleway': ['Raleway'],
      },
      fontWeight: {
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
    },
  },
  variants: {},
  plugins: [],
}

