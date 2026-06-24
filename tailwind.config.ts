import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Warm Studio Light palette */
        paper:   '#F5F1EA',
        stone:   '#EDE9E1',
        ink:     '#1C1814',
        ivory:   '#FDFCFA',
        /* Brand */
        amber:   '#B8956A',
        /* Neutrals */
        'warm-muted':   '#8A847C',
        'warm-faint':   '#B5AFA8',
        'warm-border':  '#D8D3C9',
        /* Legacy dark tokens */
        cream:    '#EDE8DE',
        charcoal: '#0C0B0A',
        warm:     '#C8B89A',
        muted:    '#7A7A72',
        border:   'rgba(237,232,222,0.12)',
        surface:  '#141210',
        card:     '#1C1A17',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        sans:    ['"Open Runde"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
