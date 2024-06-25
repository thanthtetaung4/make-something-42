/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'PRIMARY' : '#00BABC',
        'BACKGROUND' : '#292D39',
        'SECONDARY' : '#FFFFFF',
        'TEXT_COLOR' : '#000000'
      }
    },
  },
  plugins: [],
}

