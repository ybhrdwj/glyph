/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        'slide-up-out': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
          '60%': {
            transform: 'translateY(-120%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(-100%)',
            opacity: '0'
          },
        },
        'slide-up-in': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '60%': {
            transform: 'translateY(-20%)',
            opacity: '1'
          },
          '80%': {
            transform: 'translateY(10%)',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        'slide-down-in': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '60%': {
            transform: 'translateY(20%)',
            opacity: '1'
          },
          '80%': {
            transform: 'translateY(-10%)',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        'slide-up-out-exit': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
          '60%': {
            transform: 'translateY(-120%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(-100%)',
            opacity: '0'
          },
        }
      },
      animation: {
        'slide-up-in': 'slide-up-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'slide-up-out': 'slide-up-out 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'slide-down-in': 'slide-down-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'slide-up-out-exit': 'slide-up-out-exit 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
      }
    },
  },
  plugins: [],
} 