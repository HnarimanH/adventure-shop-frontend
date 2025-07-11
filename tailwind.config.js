// tailwind.config.js
module.exports = {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}', // or whatever the hell you're using
    ],
    theme: {
        extend: {
            fontFamily: {
                gladolia: ['Gladolia', 'sans-serif'],
            }
        },
    },
    plugins: [],
}