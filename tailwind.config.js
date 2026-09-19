/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        moto: {
          bg: '#0a0c0f',
          charcoal: '#111318',
          card: '#161920',
          surface: '#1d212a',
          border: '#262a35',
          borderLight: '#323746',
          red: '#e50914',
          'red-hover': '#c70812',
          text: '#f5f6f8',
          muted: '#8f95a5',
          dim: '#5d6373',
          metallic: '#9da3b4'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif']
      },
      maxWidth: {
        'site': '1320px',
      }
    },
  },
  plugins: [],
}
