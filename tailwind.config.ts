import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#122224",
        cream: "#f7f3eb",
        coral: "#f06f54",
        mint: "#bde4d5",
        navy: "#153b3f",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(20, 48, 49, 0.12)",
        card: "0 8px 30px rgba(20, 48, 49, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
