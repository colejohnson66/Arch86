const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
    },
    variants: {},
    plugins: [],
};
