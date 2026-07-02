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
        primary: {
          DEFAULT: '#1D4ED8', // Product Royal Blue
          dark: '#1E3A8A',
          light: '#DBEAFE',
        },
        accent: {
          DEFAULT: '#E11D48', // Product Red/Pink Swoosh (Rose 600)
          dark: '#BE123C',
          light: '#FFE4E6',
        },
        textDark: '#0F172A', // Slate-900
        bgLight: '#F8FAFC',  // Slate-50
        darkBg: '#090D16',   // Extremely deep dark theme
        darkCard: '#131A26',
        darkBorder: '#1E293B',
        darkText: '#F1F5F9',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'wave': 'wave 25s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        wave: {
          '0%': { marginX: '0' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
