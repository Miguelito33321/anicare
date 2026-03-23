import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#F4B6C2",
          pinkDeep: "#E98AA5",
          pinkSoft: "#FDE7ED",
          beige: "#F5EDE2",
          sand: "#FBF6F0",
          warmGray: "#6B6763",
          border: "#E9E1D7",
          ink: "#2E2A27",
          inkSoft: "#3A3430"
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(46, 42, 39, 0.12)",
        card: "0 1px 2px rgba(46, 42, 39, 0.06), 0 16px 40px rgba(46, 42, 39, 0.12)",
        float: "0 18px 55px rgba(46, 42, 39, 0.18)"
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif"
        ],
        display: [
          "var(--font-nunito)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(1200px 500px at 10% 10%, rgba(244,182,194,0.45) 0%, rgba(251,246,240,0.0) 60%), radial-gradient(900px 450px at 90% 20%, rgba(245,237,226,0.85) 0%, rgba(255,253,251,0.0) 55%)"
      }
    }
  },
  plugins: []
};

export default config;