/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "epilogue": ["Epilogue", "sans-serif"]
      },
      colors:{
        "primary": "#272d2d",
        "secondary": "#f6f8ff",
        "complementary": "#9d8df1",
      }
    },
  },
  plugins: [],
}

