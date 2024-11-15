/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			xs: "450px",
			xxs: "360px",
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
