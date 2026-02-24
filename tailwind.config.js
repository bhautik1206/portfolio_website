module.exports = {
  // Tailwind 3+ uses `content` instead of the old `purge` key
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      },
    },
  },
  plugins: [],
}
