/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": "#FF4C61",
        "purple": "#6C6CFF",
        "grayfm": "#EBF1FC"
      },
    },
  },
  plugins: [
  ],
}

