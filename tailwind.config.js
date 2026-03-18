/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: {
            1: "#0F172A", //main bg
            2: "#134CC7", // forget pass text
            3: "#1E293B", //login bg
            4: "#151E31", //about card
          },
          secondary: "#2563ea", //about
          white: "#fff",
          black: "#000",
          gray: "#9CA3AF", //text login
        },
        light: {
          primary: "#F8FAFC", //main bg
          secondary: "#2563ea", //about
          main: "#F0F4F8",
          blue50: "#EFF6FF",
          white: "#fff",
          black: "#000",
          gray: "#9CA3AF", //text login // border field login
        },
      },
    },
  },
  plugins: [],
};
