import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        primary: '1600px',
      },
    },
  },
  plugins: [],
} satisfies Config;
