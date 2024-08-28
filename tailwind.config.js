/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    ".pages/**/*.{html,ts}",
    ".componentes/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        primary: "#805C7D"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

