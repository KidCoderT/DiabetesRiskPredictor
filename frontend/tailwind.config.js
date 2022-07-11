/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  media: false,
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
      height: {
        half_screen: "50%",
      },
      animation: {
        bounce200: "bounce 2s infinite 200ms",
        bounce400: "bounce 2s infinite 400ms",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
