/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: {
          50: '#090c11',
          100: '#1e2a38', //main
          200: '#243242',
          300: '#364b63',
          400: '#476485',
          500: '#597da6',
          600: '#7a97b8',
          700: '#9cb1c9',
          800: '#bdcbddb',
          900: '#dee5ed',
          950: '#eef2f6',
        },
        background: {
          50: '#1a1200',
          100: '#332400',
          200: '#664700',
          300: '#996b00',
          400: '#cc8f00',
          500: '#ffb300',
          600: '#ffc233',
          700: '#ffd166',
          800: '#ffe099',
          900: '#fff0cc',
          950: '#fff7e5', //main
        },
        primary: {
          50: '#00121a',
          100: '#002433',
          200: '#004766',
          300: '#006b99',
          400: '#008fcc',
          500: '#0096d6', //main
          600: '#33c2ff',
          700: '#66d1ff',
          800: '#99e0ff',
          900: '#ccf0ff',
          950: '#e5f7ff',
        },
        secondary: {
          50: '#1a0d00',
          100: '#331a00',
          200: '#663300',
          300: '#994c00',
          400: '#cc6600',
          500: '#ff8c1a', //main
          600: '#ff9933',
          700: '#ffb366',
          800: '#ffcc99',
          900: '#ffe6cc',
          950: '#fff2e5',
        },
        accent: {
          50: '#1a1400',
          100: '#332900',
          200: '#665200',
          300: '#997a00',
          400: '#cca300',
          500: '#ffcc00',
          600: '#ffd83d', //main
          700: '#ffe066',
          800: '#ffeb99',
          900: '#fff5cc',
          950: '#fffae5',
        },
        surface: '#ffffff',
        textSecondary: '#5F6C7B',
        error: '#E55039',
        success: '#2ECC71',
      },
      fontFamily: {
        poppins: ['Poppins_400Regular', 'Poppins_500Medium', 'Poppins_600SemiBold', 'Poppins_700Bold'],
      },
      fontSize: {
        h1: ['28px', { lineHeight: '34px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '30px', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '26px', fontWeight: '600' }],
        body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],
        button: ['15px', { lineHeight: '20px', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}