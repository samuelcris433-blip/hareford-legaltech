/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#295457',
        accent: '#6E9B30',
        background: '#FEEEE2',
        surface: '#FFFFFF'
      },
      fontFamily: {
        sans: ['Crossten', 'Outfit', 'sans-serif'],
        heading: ['Crossten', 'Outfit', 'sans-serif'],
        identity: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
