/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        zumthor: {
          DEFAULT: '#EFF6FF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#EFF6FF',
          600: '#B7D6FF',
          700: '#7FB7FF',
          800: '#4797FF',
          900: '#0F78FF'
        },
        'titan-white': {
          DEFAULT: '#ECEDFF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#ECEDFF',
          600: '#B4B8FF',
          700: '#7C83FF',
          800: '#444EFF',
          900: '#0C18FF'
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
