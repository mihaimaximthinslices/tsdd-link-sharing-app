/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purpleH: '#633CFF',
        purpleM: '#BEADFF',
        purpleS: '#EFEBFF',
        blackH: '#333333',
        blackM: '#737373',
        blackS: '#D9D9D9',
        whiteM: '#FAFAFA',
        redH: '#FF3939',
      },
      fontFamily: {
        instrumentSans: ['Instrument Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
