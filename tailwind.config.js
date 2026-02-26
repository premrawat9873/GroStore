/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6BBE44",
        muted: "#F8F9FA",
        text: "#3A4250",
      },
    },
  },
  plugins: [],
};