/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        light: {
          100: "#cecefb",
          200: "#a8b5db",
        },
        gray: {
          100: "#9ca4ab",
        },
        dark: {
          100: "#1200ff",
        },
      },
      backgroundImage: {
        'hero-pattern': "var(--background-image-hero-pattern)",
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

