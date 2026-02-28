/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        "light-bg": "#F9FAFB",
        "light-surface": "#FFFFFF",
        "light-border": "#E5E7EB",
        "dark-text": "#1F2937",
        "medium-text": "#6B7280",

        // Dark Mode Colors
        "dark-bg": "#0D1117",
        "glass-surface": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        "light-text": "#E6EDF3",
        "dim-text": "#8B949E",
        accent: "#C973FF", // Vibrant Purple
        "accent-glow": "rgba(201, 115, 255, 0.5)",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(201, 115, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(201, 115, 255, 0.4)",
      },
    },
  },
  plugins: [],
};
