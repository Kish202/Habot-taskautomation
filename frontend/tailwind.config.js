// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './src/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'neu-light': '#e0e5ec',
//         'neu-dark': '#1f2a44',
//         'neu-shadow-light-out': '#b8b9be',
//         'neu-shadow-light-in': '#ffffff',
//         'neu-shadow-dark-out': '#171b2f',
//         'neu-shadow-dark-in': '#27395a',
//       },
//       boxShadow: {
//         'neu-light': '6px 6px 12px #b8b9be, -6px -6px 12px #ffffff',
//         'neu-dark': '6px 6px 12px #171b2f, -6px -6px 12px #27395a',
//         'neu-inset-light': 'inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff',
//         'neu-inset-dark': 'inset 4px 4px 8px #171b2f, inset -4px -4px 8px #27395a',
//       },
//       animation: {
//         'pulse-neu': 'pulse-neu 1.5s infinite',
//       },
//       keyframes: {
//         'pulse-neu': {
//           '0%, 100%': { opacity: '1' },
//           '50%': { opacity: '0.7' },
//         },
//       },
//     },
//   },
//   plugins: [],
//   darkMode: 'class', // Enable dark mode support
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        foreground: 'var(--text-color)',
        muted: {
          DEFAULT: 'var(--muted-bg)',
          foreground: 'var(--text-secondary)',
        },
        card: 'var(--card-bg)',
        border: 'var(--border-color)',
        primary: {
          DEFAULT: 'var(--accent-color)',
          foreground: '#ffffff',
        },
      },
      boxShadow: {
        neumorphic: 'var(--neumorphic-shadow)',
        'neumorphic-inset': 'var(--neumorphic-shadow-inset)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ':root': {
          '--neumorphic-shadow-light': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
          '--neumorphic-shadow-dark': '8px 8px 16px #1a1f2a, -8px -8px 16px #2e3648',
          '--neumorphic-shadow-inset-light': 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
          '--neumorphic-shadow-inset-dark': 'inset 8px 8px 16px #1a1f2a, inset -8px -8px 16px #2e3648',
        },
        '.theme-light': {
          '--bg-color': '#f4f7fa',
          '--card-bg': '#ffffff',
          '--text-color': '#1f2937',
          '--text-secondary': '#6b7280',
          '--border-color': '#e5e7eb',
          '--accent-color': '#3b82f6',
          '--muted-bg': '#f3f4f6',
          '--neumorphic-shadow': 'var(--neumorphic-shadow-light)',
          '--neumorphic-shadow-inset': 'var(--neumorphic-shadow-inset-light)',
        },
        '.theme-dark': {
          '--bg-color': '#1f2937',
          '--card-bg': '#2d3748',
          '--text-color': '#f9fafb',
          '--text-secondary': '#9ca3af',
          '--border-color': '#4b5563',
          '--accent-color': '#60a5fa',
          '--muted-bg': '#374151',
          '--neumorphic-shadow': 'var(--neumorphic-shadow-dark)',
          '--neumorphic-shadow-inset': 'var(--neumorphic-shadow-inset-dark)',
        },
        '.theme-neumorphic': {
          '--bg-color': '#e0e5ec',
          '--card-bg': '#e0e5ec',
          '--text-color': '#2d3748',
          '--text-secondary': '#6b7280',
          '--border-color': 'transparent',
          '--accent-color': '#3b82f6',
          '--muted-bg': '#d1d9e6',
          '--neumorphic-shadow': 'var(--neumorphic-shadow-light)',
          '--neumorphic-shadow-inset': 'var(--neumorphic-shadow-inset-light)',
        },
        body: {
          fontFamily: "'Inter', sans-serif",
        },
        '.neumorphic': {
          background: 'var(--card-bg)',
          boxShadow: 'var(--neumorphic-shadow)',
          borderRadius: '1rem',
          transition: 'all 0.3s ease',
        },
        '.neumorphic:hover': {
          transform: 'translateY(-2px)',
        },
        '.neumorphic-inset': {
          background: 'var(--card-bg)',
          boxShadow: 'var(--neumorphic-shadow-inset)',
          borderRadius: '1rem',
        },
      });
    },
  ],
};