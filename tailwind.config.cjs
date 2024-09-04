/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      'custom-teal': '#12aed1cd',
      'metal': '#565584',
      'tahiti': '#12aed1cd',
      'silver': '#ecebff'
    }
  },
  plugins: [],
});
