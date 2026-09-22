/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#16211D',
          50: '#F4F6F4',
          100: '#E4E8E4',
          200: '#C4CCC4',
          400: '#7C8A7E',
          600: '#3B4A3D',
          800: '#20302A',
          900: '#16211D',
        },
        paper: {
          DEFAULT: '#F7F6F2',
          dim: '#EFEDE5',
        },
        brand: {
          DEFAULT: '#1F4B43',
          50: '#EAF1EF',
          100: '#D2E3DF',
          400: '#2F6B5F',
          600: '#1F4B43',
          700: '#163831',
          900: '#0E241F',
        },
        gold: {
          DEFAULT: '#C98A2C',
          50: '#FBF3E6',
          100: '#F3DFB6',
          400: '#D69C41',
          600: '#C98A2C',
          700: '#A66E1E',
        },
        line: '#E4E1D8',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1320px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(22,33,29,0.06)',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'lg': '10px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'slide-in': 'slide-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
