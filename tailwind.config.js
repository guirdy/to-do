/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          400: '#262626',
          500: '#191919',
          900: '#0d0d0d',
        },
        primary: '#1E6F9F',
        secondary: '#5E60CE',
      },
    },
  },
  plugins: [],
}
