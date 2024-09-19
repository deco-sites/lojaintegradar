import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        instrument: ["Instrument Serif", "sans-serif"],
      },
      screens: {
        "min-1180": "1180px",
      },
    },
  },
};
