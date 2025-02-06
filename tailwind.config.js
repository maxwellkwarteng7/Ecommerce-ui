/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: 'brown', 
        secondary: '#f3f3f3', 
        tertiary: "#adadad", 
        transparent : "rgba(0 , 0 , 0 , 0.15)"
      }
    },
  },
  plugins: [

  ],
}

