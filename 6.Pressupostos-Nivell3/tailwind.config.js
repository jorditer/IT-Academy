/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/*.tsx', // Include all .js, .jsx, .ts, and .tsx files in the src directory and subdirectories
    './src/components/Modals/*.tsx',
    './src/components/Budget/*.tsx',
    "./public/index.html", // Include the index.html file in the public directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

