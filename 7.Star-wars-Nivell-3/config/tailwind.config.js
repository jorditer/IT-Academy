/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true,
    files: [
      "../src/components/**/*.{js,jsx,ts,tsx}", 
      "../index.html",
      "../src/components/layout/*{tsx, ts, mdx}",
      '../.storybook/**/*.ts',
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
