/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        grey: { 300: "#e6e6e6", 700: "#666666", "300_01": "#e5e5e5" },
        blue_grey: {
          50: "#f1f1f1",
          100: "#cbcbcb",
          800: "#333b6a",
          900: "2f2e41",
          "600_4c": "#655b7f4c",
          "800_01": "#3f3d56",
          "900_01": "#272d51",
        },
        indigo: { 400: "#5c6bc0", A200: "#6c63ff" },
        deep_ornage: { 100: "#ffb6b6", "100_01": "#ffb7b7" },
        white: { A700_87: "#ffffff87", A700: "#ffffff" },
        black: { 900: "#000000", "900_19": "#00000019" },
      },
      boxShadow: { xs: "0 4px 8px 0 #655b7f4c" },
      fontFamily: { montserrat: "Montserrat", inter: "Inter" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
