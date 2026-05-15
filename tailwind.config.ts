import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f7f3ff",
        night: "#090a12",
        panel: "#11131f",
        card: "#181b2b",
        felt: "#30d58a",
        "felt-soft": "#143726",
        coral: "#ff5f6d",
        "coral-soft": "#3a1720",
        violet: "#9b6dff",
        "violet-soft": "#261a46",
      },
      boxShadow: {
        card: "0 22px 70px rgba(0, 0, 0, 0.38)",
      },
    },
  },
  plugins: [],
};

export default config;
