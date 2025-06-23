/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      fontSize: {
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};