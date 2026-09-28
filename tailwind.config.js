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
        railway: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
          950: '#031926'
        },
        tms: {
          light: '#eff6ff',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        smms: {
          light: '#faf5ff',
          DEFAULT: '#9333ea',
          dark: '#6b21a8',
        },
        tdms: {
          light: '#fff7ed',
          DEFAULT: '#ea580c',
          dark: '#c2410c',
        },
        coa: {
          light: '#f0fdf4',
          DEFAULT: '#16a34a',
          dark: '#15803d',
        }
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radar 2s linear infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
