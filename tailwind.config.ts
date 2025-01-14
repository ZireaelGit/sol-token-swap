import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Custom bounce animation with slower speed and lower jump
        'slow-bounce': {
          '0%, 100%': { transform: 'translateY(0)' }, // start and end at 0
          '50%': { transform: 'translateY(-10px)' },  // lower jump (adjust this number)
        },
        'slow-bounce-1': {
          '0%, 100%': { transform: 'translateY(-10px)' }, // start and end at 0
          '50%': { transform: 'translateY(0)' },  // lower jump (adjust this number)
        },
        'slow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'slow-bounce': 'slow-bounce 2s ease-in-out infinite', // slower speed and easing
        'slow-bounce-1': 'slow-bounce-1 2s ease-in-out infinite', // slower speed and easing
        'slow-spin': 'slow-spin 5s linear infinite', // 5s duration for slow spin
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-white" : "#F6FDFB",
        "bg-green" : "#CBF1E7",
        "green" : "#01BC8D",
        "green-border" : "#8c5c47",
        "black" : "#1D1D1D",
        "gray" : "#000d1d99",
        "gray-1" : "#1d1d1d66",
        "input-bg" : "#f8ede5",
        "btn-color" : "#262626",
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add Roboto as default sans-serif font
      },
    },
  },
  plugins: [],
};
export default config;
