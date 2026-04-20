/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        light: "#FFFFFF",
        "light-secondary": "#F8F9FA",
        "light-tertiary": "#F3F4F6",
        "border-light": "#E5E7EB",
        "text-primary": "#1F2937",
        "text-secondary": "#6B7280",
        accent: "#3B82F6",
        "accent-hover": "#2563EB",
      },
      fontFamily: {
        sans: ["Inter", "Geist", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.08)",
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        hover: "0 4px 12px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
};
