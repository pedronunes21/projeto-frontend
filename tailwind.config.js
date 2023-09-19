/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        black: "#263238",
        orange: "#ef8200",
        purpleHover: "#b186ea",
        orangeBackGround: "#FFEBD3",
        blue: "#00A2F0",
        white: "#F9FDFF",
        green: "#74F018",
        darkOrange: "#E37C00",
        grey: "#D7D7D7",
        gold: "#945000"
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
  plugins: [require("tailwindcss-animate")],
}