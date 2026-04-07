/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'share-blue': '#0066FF',
        'record-red': '#FF4500',
      },
      animation: {
        // Pulse — soft opacity breathing (slow for sharing, fast for recording)
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'pulse-fast': 'pulse-fast 1s ease-in-out infinite',
        // Ripple — expanding ring that fades out (duration controlled via inline style)
        'ripple':         'ripple 1.5s ease-out infinite',
        'ripple-delayed': 'ripple-delayed 1.5s ease-out infinite',
        // Blink — sharp snap on/off with scale punch
        'blink':          'blink 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.5' },
        },
        'pulse-fast': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.3' },
        },
        'ripple': {
          '0%':   { transform: 'scale(1)',   opacity: '0.7' },
          '100%': { transform: 'scale(3)',   opacity: '0'   },
        },
        'ripple-delayed': {
          '0%':   { transform: 'scale(1)',   opacity: '0'   },
          '15%':  { transform: 'scale(1)',   opacity: '0.5' },
          '100%': { transform: 'scale(3)',   opacity: '0'   },
        },
        'blink': {
          '0%':   { opacity: '1', transform: 'scale(1)'   },
          '40%':  { opacity: '1', transform: 'scale(1)'   },
          '50%':  { opacity: '0', transform: 'scale(0.4)' },
          '90%':  { opacity: '0', transform: 'scale(0.4)' },
          '100%': { opacity: '1', transform: 'scale(1)'   },
        },
      },
    },
  },
  plugins: [],
}
