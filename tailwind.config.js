/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import("tailwindcss").Config} */

// eslint-disable-next-line no-undef
module.exports = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    darkMode: "media",
    theme: {
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
    },
    variants: {},
    plugins: [],
};
