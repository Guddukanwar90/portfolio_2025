/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main colors
        primary: "#020617", // Dark blue/black background
        secondary: "#0F172A", // Darker blue
        accent: {
          DEFAULT: "#FF7A59", // Orange accent
          400: "#FF9B81",
          600: "#FF5C36",
        },
        neon: {
          DEFAULT: "#00F5FF",
          300: "#66FFF6",
          500: "#00F5FF",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          400: "#22D3EE",
          600: "#0891B2",
        },
        // Text colors
        "text-light": "#E6EEF8",
        "text-muted": "#94A3B8",
      },
    },
  },
  
}