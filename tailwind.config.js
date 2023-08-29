/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'tablet': '768px',
      'tablet-md':'885px',
      'laptop': '1024px',
      'laptop-md': '1135px',
      'laptop-lg': '1245px',
    },
    extend: {},
  },
  plugins: [],
}