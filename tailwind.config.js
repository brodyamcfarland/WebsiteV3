/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: ["Montserrat", "sans-serif"],
            },
        },
    },
    plugins: [
        require("prettier-plugin-tailwindcss"),
        require("tailwind-scrollbar"),
    ],
};
