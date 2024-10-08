/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        warning: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        },
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        disappear: {
          '0%': { transform: 'translate(0, 0px)', opacity: 1 },
          '100%': { transform: 'translate(0, -100px)', opacity: 0 }
        }
      },
      animation: {
        warning: 'warning 1s ease-in-out infinite',
        disappear: 'disappear 2s ease-in-out 1',
        appear: 'appear 2s ease-in-out 1',
      }
    },
  },
  plugins: [],
}

