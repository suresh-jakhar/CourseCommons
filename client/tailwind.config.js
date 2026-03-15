/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0F1111',
        surface: '#141414',
        section: '#1A1A1A',
        primary: '#FFFFFF',
        secondary: '#CFCFCF',
        muted: '#8A8A8A',
        disabled: '#5A5A5A',
        btn: '#1C1C1C',
        'btn-hover': '#2A2A2A',
        card: '#181818',
        navbar: 'rgba(20,20,20,0.75)',
        border: '#2F2F2F',
        divider: '#242424',
        glass: 'rgba(255,255,255,0.05)',
        'glass-glow': 'rgba(255,255,255,0.08)',
        'accent-blue': '#4DA3FF',
        'accent-purple': '#7A7CFF'
      }
    },
  },
  plugins: [],
}
