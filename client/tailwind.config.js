/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "blue",
          secondary: "teal",
        },
      },
    ],
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7D9CAB",
        },
        secondary: {
          DEFAULT: "#F8BA90",
        },
        tretiary: {
          DEFAULT: "#CEEAF7",
        },
        lightBlue: {
          DEFAULT: "#F4F7FD",
        },
        whiteDirty: {
          DEFAULT: "#FFFEFE",
        },
        textGray: {
          DEFAULT: "#9197B3",
        },
      },
    },
  },
  plugins: [require("daisyui")],
}

