import type {Config} from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '768px',
      md: '1040px',
      lg: '1200px',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        ...defaultTheme.fontSize,
        base: ['15px', '30px'],
      },
      colors: {
        gray: {
          100: '#f8f8f8',
          200: '#ebebeb',
          300: '#999999',
          400: '#787878',
          500: '#767676',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
