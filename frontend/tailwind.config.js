/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // for theme toggle
  theme: {
    extend: {
      colors: {
        background: "#f5f5f5",
        card: "#ffffff",
        primary: "#4ade80",
        border: "#e5e7eb",
        destructive: "#f87171",
        "muted-foreground": "#6b7280",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      boxShadow: {
        "card": "0 4px 14px 0 rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "gradient-notes": "linear-gradient(90deg, #4ade80, #22d3ee)",
      },
    },
  },
  plugins: [],
};
