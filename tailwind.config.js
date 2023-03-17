module.exports = {
  content: [
    './src/**/*.tsx',
    './components/**/*.tsx',
    './index.html'
  ],
  mode: 'jit',
  purge: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html'
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
