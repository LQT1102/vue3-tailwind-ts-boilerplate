/** @type {import('tailwindcss').Config} */

const getSpacing = (
  base /* number */,
  unit /* "px" | "rem" */,
  values /* number[] */
) =>
  values.reduce((acc, value) => ({ ...acc, [value]: base * value + unit }), {});

const spacing = getSpacing(
  0.4,
  "rem",
  [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 6.5, 7, 8, 9, 10, 11, 12, 14, 16, 17,
    15, 18, 19, 21, 22, 28, 85, 256, 350,
  ]
);

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: false,
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
      },
      //Khai báo màu để dùng trong class tailwind
      colors: {
        "main-background": formatColorValue("--main-background"),
      },
      fontSize: {
        xs: ["1.2rem", "1.6rem"],
        sm: ["1.4rem", "2rem"],
        base: ["1.6rem", "2.4rem"],
        lg: ["1.8rem", "2.8rem"],
        xl: ["2rem", "2.8rem"],
        "2xl": ["2.4rem", "3.2rem"],
        "3xl": ["3rem", "3.6rem"],
        "4xl": ["3.6rem", "4rem"],
        "5xl": ["4.8rem", 1],
        "6xl": ["6rem", 1],
        "7xl": ["7.2rem", 1],
        "8xl": ["9.6rem", 1],
        "9xl": ["12.8rem", 1],
      },
      spacing: {
        px: "1px",
        ...spacing,
      },
      borderRadius: {
        sm: ".2rem",
        DEFAULT: ".4rem",
        md: ".6rem",
        lg: ".8rem",
        xl: "1.2rem",
        "2xl": "1.6rem",
        "3xl": "2.4rem",
      },
      minWidth: (theme) => ({
        ...theme("spacing"),
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
        0: "0rem",
        xs: "32.0rem",
        sm: "38.4rem",
        md: "44.8rem",
        lg: "51.2rem",
        xl: "57.6rem",
        "2xl": "67.2rem",
        "3xl": "76.8rem",
        "4xl": "89.6rem",
        "5xl": "102.4rem",
        "6xl": "115.2rem",
        "7xl": "128.0rem",
      }),
      boxShadow: {
        base: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  daisyui: {},
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  plugins: [require("daisyui"), require("@tailwindcss/aspect-ratio")],
};

//Read custom-color value in theme daisy config
function formatColorValue(variable) {
  return `var(${variable})`;
}
