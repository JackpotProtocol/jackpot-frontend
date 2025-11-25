import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        jackpot: {
          bg: "#020817",
          card: "#020617",
          accent: "#22c55e",
          accentSoft: "#bbf7d0"
        }
      }
    }
  },
  plugins: []
};
export default config;
