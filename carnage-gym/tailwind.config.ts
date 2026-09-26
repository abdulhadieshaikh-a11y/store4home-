import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        ink: '#0B0B0B',
        coal: '#121212',
        iron: '#1C1C1C',
        steel: '#2A2A2A',
        ash: '#8C8C8A',
        fog: '#B9B8B4',
        bone: '#EDEBE6',
        chalk: '#F7F6F3',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.28em',
        wide2: '0.16em',
      },
      maxWidth: {
        frame: '1440px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        power: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        'line-up': {
          '0%': { transform: 'translateY(105%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.14)' },
          '100%': { transform: 'scale(1.02)' },
        },
        'scroll-cue': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'line-up': 'line-up 1.1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-up': 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ken-burns': 'ken-burns 2.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scroll-cue': 'scroll-cue 2.4s cubic-bezier(0.76, 0, 0.24, 1) infinite',
        marquee: 'marquee 40s linear infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
