// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode via class strategy
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensure Tailwind scans your source files
  ],
  theme: {
    extend: {
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
