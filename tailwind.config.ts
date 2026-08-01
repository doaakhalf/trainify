import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          light: '#FED7AA',
          dark: '#EA580C',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['var(--font-alexandria)', 'var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
};

export default config;
