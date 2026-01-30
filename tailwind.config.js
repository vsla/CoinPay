/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cp: {
          bg: '#070A12',
          surface: '#0C1222',
          surface2: '#0F1830',
          border: 'rgba(255,255,255,0.08)',
          fg: '#E8E8E8',
          muted: '#A9B4D0',
          subtle: '#7D89A8',
          brand: {
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#304FFE',

          },
          success: '#2DD4BF',
          danger: '#FB7185',
          warn: '#FBBF24',
          secondary: '#A4ABFF',
        },
      },
      boxShadow: {
        'cp-surface': '0 10px 30px rgba(0,0,0,0.38)',
        'cp-nav': '0 18px 50px rgba(0,0,0,0.55)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Inter',
          'Arial',
          'sans-serif',
        ],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'cp-title': ['20px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        'cp-h1': ['34px', { lineHeight: '41px', letterSpacing: '0px' }],
        'cp-h2': ['22px', { lineHeight: '28px', letterSpacing: '0px' }],
        'cp-h3': ['28px', { lineHeight: '34px', letterSpacing: '0px' }],
        'cp-body': ['15px', { lineHeight: '22px' }],
        'cp-body-small': ['14px', { lineHeight: '19px', letterSpacing: '0px' }],
        'cp-label': ['14px', { lineHeight: '19px', letterSpacing: '0px' }],
        'cp-small': ['13px', { lineHeight: '18px' }],
        'cp-caption': ['12px', { lineHeight: '16px' }],
      },
      backgroundImage: {
        'selfie-overlay': 'radial-gradient(ellipse 337px 463px at 50% 40%, transparent 0%, transparent 50%, rgba(18, 18, 18, 0.6) 50%, rgba(18, 18, 18, 0.85) 100%)',
      },
    },
  },
  plugins: [],
}

