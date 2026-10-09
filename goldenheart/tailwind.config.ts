import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF8F5', paper: '#FBF9F6', line: '#E8DFD5',
        maroon: { DEFAULT: '#8B1A1A', dark: '#690008', soft: '#FDF8ED' },
        ember: { DEFAULT: '#D2561E', dark: '#A73A00' },
        gold: { DEFAULT: '#C9A24B', light: '#EBC166' },
        ink: { DEFAULT: '#231F20', body: '#4A4340' },
        wa: '#128C7E',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px -2px rgba(74,67,64,.05)',
        lift: '0 12px 28px -4px rgba(139,26,26,.08)',
      },
      borderRadius: { DEFAULT: '0.25rem', card: '0.5rem' },
    },
  },
}
