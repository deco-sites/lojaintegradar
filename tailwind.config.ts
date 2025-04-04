import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      keyframes: {
        "background-animation": {
          "0%": { transform: "translate(145%, 0%) scale(4)" },
          "50%": { transform: "translate(-145%, 0%) scale(4)" },
          "100%": { transform: "translate(145%, 0%) scale(4)" },
        },
        sliding: {
          "0%": { left: 0 },
          "100%": { transform: "translateX(-50%)" },
        },
        slidingFast: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "pop-up": {
          "0%": { transform: "scale(50%)", opacity: 0 },
          "100%": { transform: "scale(100%)", opacity: 1 },
        },
        "fade-up": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0%)", opacity: 1 },
        },
        "fade-down": {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0%)", opacity: 1 },
        },
        "fade-right": {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0%)", opacity: 1 },
        },
        "fade-left": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0%)", opacity: 1 },
        },
        "fade-up50": {
          "0%": { transform: "translateY(50%)", opacity: 0 },
          "100%": { transform: "translateY(0%)", opacity: 1 },
        },
        "fade-down50": {
          "0%": { transform: "translateY(-50%)", opacity: 0 },
          "100%": { transform: "translateY(0%)", opacity: 1 },
        },
        "fade-down10": {
          "0%": { transform: "translateY(-10%)", opacity: 0 },
          "100%": { transform: "translateY(0%)", opacity: 1 },
        },
        "progress": {
          "0%": { width: 0 },
          "100%": { width: "100%" },
        },
        "blink": {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      boxShadow: {
        "tinyspread": "0px 0px 10px rgba(204, 204, 204, 0.4)",
        "spreaded": "0px 5.563px 31.72px 0px rgba(0, 72, 82, 0.09)",
        "spreaded2": "0px 4px 44px 0px rgba(0, 0, 0, 0.13)",
        "spreaded3": "11px 4px 44px 0px rgba(29, 26, 26, 0.15)",
        "spreaded4": "0px 4px 24px 0px rgba(0, 0, 0, 0.06)",
        "spreaded5": "0px 4px 24px 0px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "background-animation": "background-animation 15s ease infinite",
        sliding: "sliding 30s linear infinite",
        slidingFast: "slidingFast 20s linear infinite",
        "fade-in": "fade-in 2s ease-in-out",
        "pop-up": "pop-up 1s ease-in-out",
        "fade-up": "fade-up 1s ease-in-out",
        "fade-down": "fade-down 1s ease-in-out",
        "fade-right": "fade-right 1s ease-in-out",
        "fade-left": "fade-left 1s ease-in-out",
        "fade-up50": "fade-up50 1.5s ease-in-out",
        "fade-down50": "fade-down50 1.5s ease-in-out",
        "fade-down10": "fade-down10 0.3s ease-in-out",
        "progress": "progress 3s linear",
        "blink": " blink 0.5s linear infinite",
      },
      fontFamily: {
        instrument: ["Instrument Serif", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        "min-1180": "1180px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
        "s1800": "1800px",
      },
    },
  },
};
