/** @type {import('tailwindcss').Config} */

module.exports = {
    important: true, // to generate utilities as !important
    content: [
        // add the paths to all of your template files
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                // add new font family
                montserrat: ['Montserrat', 'sans-serif'],
            },
        },
        colors: {
            // custom color palette
            primary: '#151515',
            secondary: '#6494AA',
            redwood: '#A63D40',
            earthYellow: '#E9B872',
            aspagarus: '#90A959',
            violet: '#883677',
            congo: '##FF958C',
            success: '#5FC790',
            warning: '#FFA600',
            danger: '#FF5630',
            dark: '#2E3A44',
            info: '#1CA7EC',
            black: '#2E3A44',
            light: '#F9FBFC',
            white: '#FFFF',
            blue: '#096dd9',
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
