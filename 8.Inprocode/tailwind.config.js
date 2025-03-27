/** @type {import('tailwindcss').Config} */
export default {
  content: ["./frontend/src/**/*.tsx", "./frontend/index.html"],
  theme: {
    extend: {
      colors(theme) {
        return {
          primary: {...theme.colors.blue},
        }
        },
      },
  },
  plugins: [],
}

