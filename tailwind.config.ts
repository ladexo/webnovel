import type { Config } from 'tailwindcss';
const config: Config = {
    content: [
          './pages/**/*.{js,ts,jsx,tsx,mdx}',
          './components/**/*.{js,ts,jsx,tsx,mdx}',
          './app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
    theme: {
          extend: {
                  colors: {
                            primary: '#FFD700',
                            accent: '#FF00FF',
                            cyber: '#00FFFF',
                            dark: '#0a0a0a',
                            panel: '#1a1a2e',
                            surface: '#16213e',
                  },
                  fontFamily: {
                            display: ['Bangers', 'cursive'],
                            body: ['Inter', 'sans-serif'],
                  },
          },
    },
    plugins: [],
};
export default config;
