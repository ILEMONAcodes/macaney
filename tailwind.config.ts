import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#fdf8f0',
          100: '#fbeedb',
          200: '#f5d9b0',
          500: '#e69b24',
          600: '#cc821b',
        },
      },
    },
  },
  plugins: [],
};

export default config;