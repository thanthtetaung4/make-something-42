/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
    colors: {
      'white': '#FFFFFF',
      'turquoise': '#00BABC',
      'darkgrey': '#292D39',
      'black': '#1E1E1E'
    },
  },
  plugins: [],
}

