/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'theme("colors.blue.950")',
        primaryfade: 'theme("colors.blue.400")',
      },
    },
  },
  plugins: [],
};
