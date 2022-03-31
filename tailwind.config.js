module.exports = {
  purge: {
    content: [
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: {
        standard: ["outline-none"],
      },
    },
  },
  theme: {
    fontFamily: {
      sans: "Roboto, Arial, sans-serif",
      serif: "Merriweather, Georgia, serif",
    },
    extend: {
      fontSize: {
        "10xl": "37vh",
      },
      height: {
        hlf: "50vh",
      },
      width: {
        hlf: "50vw",
      },
      minWidth: {
        alb: "20%",
        mobAlb: "43%",
      },
      backgroundColor: {
        album: "#2d2626",
      },
    },
  },
  variants: {},
  plugins: [],
};
