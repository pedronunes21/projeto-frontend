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
        black: "#35363a",
        purple: "#8276f4",
        purpleHover: "#b186ea"
      }
    },
  },
  plugins: [],
}

