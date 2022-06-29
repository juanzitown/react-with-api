/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      opacity: {
        10: ".1",
        15: ".15",
        33: ".33",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      minWidth: {
        ...defaultTheme.spacing,
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      minHeight: {
        ...defaultTheme.spacing,
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },
    colors: {
      ...colors,
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      primary: {
        25: "#f8f8fc",
        50: "#e9e7f5",
        100: "#c8c2e7",
        200: "#a39ad7",
        300: "#7e71c6",
        400: "#6352ba",
        500: "#4734ae",
        600: "#402fa7",
        700: "#37279d",
        800: "#2f2194",
        900: "#201584",
      },
      danger: colors.rose,
      warning: colors.amber,
      info: colors.blue,
      success: colors.green,
    },
  },
  plugins: [],
};
