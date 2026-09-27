import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Deep dark brown — the primary ground
        iron: {
          DEFAULT: '#1E130D',
          950: '#120B07',
          900: '#1E130D',
          800: '#2A1B12',
          700: '#3A2619',
          600: '#4D3322',
          500: '#6B4A33',
        },
        // Burnt orange — the signal colour
        ember: {
          DEFAULT: '#C4541C',
          300: '#E8905E',
          400: '#DB6B2E',
          500: '#C4541C',
          600: '#A84414',
          700: '#86350F',
        },
        // Warm cream / off-white
        cream: {
          DEFAULT: '#F1E6D2',
          50: '#FBF6EC',
          100: '#F6EEDF',
          200: '#F1E6D2',
          300: '#E4D3B6',
          400: '#CDB896',
        },
        // Muted tan / antique gold accent
        brass: {
          DEFAULT: '#B8935A',
          300: '#D8BD8C',
          400: '#C7A56E',
          500: '#B8935A',
          600: '#957444',
        },
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'Haettenschweiler', 'sans-serif'],
        label: ['var(--font-oswald)', 'Arial Narrow', 'sans-serif'],
        serif: ['var(--font-baskerville)', 'Georgia', 'serif'],
        sans: ['var(--font-dmsans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        poster: '0.01em',
        label: '0.22em',
        wide2: '0.32em',
      },
      maxWidth: {
        frame: '1440px',
      },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'ken-burns': {
          '0%': { transform: 'scale(1.12) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1) translate3d(0,0,0)' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translate3d(0,105%,0)' },
          '100%': { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'draw-line': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        'spin-slow': 'spin-slow 60s linear infinite',
        marquee: 'marquee 38s linear infinite',
        'ken-burns': 'ken-burns 2.8s cubic-bezier(.2,.7,.2,1) both',
        'rise-in': 'rise-in 1.1s cubic-bezier(.2,.8,.2,1) both',
        'fade-in': 'fade-in 1.2s ease both',
        'draw-line': 'draw-line 1.2s cubic-bezier(.7,0,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
