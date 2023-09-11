import type {Config} from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '768px',
      md: '1040px',
      lg: '1200px',
      xl: '1600px',
    },
    extend: {
      fontFamily: {
        sans: ['Mulish', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ['12px', '30px'],
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
      maxWidth: {
        '8xl': '96rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
