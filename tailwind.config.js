/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#6518eb', 
        secondary: '#cfcfcf', 
        tertiary: "#adadad", 
        transparent : "rgba(0 , 0 , 0 , 0.15)"
      }
    },
  },
  plugins: [

  ],
}

