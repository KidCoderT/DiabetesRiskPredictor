/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        theme_blue: "#4F6AB0",
      },
      fontFamily: {
        pacifico: "Pacifico",
        fredoka: "Fredoka One",
      },
      screens: {
        mid: "1050px",
      },
    },
  },
  plugins: [],
};
