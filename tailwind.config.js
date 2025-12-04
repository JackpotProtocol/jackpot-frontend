/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. 定义Walawow核心色板
      colors: {
        'walawow': {
          purple: {
            light: '#C084FC', // 较亮的紫色，用于高亮和交互
            DEFAULT: '#9333EA', // 主品牌紫色
            dark: '#7C3AED', // 深紫色，用于导航栏背景等
            deep: '#6D28D9', // 更深，用于悬停状态
          },
          gold: {
            light: '#FDE68A', // 浅金色，用于文字高亮
            DEFAULT: '#FBBF24', // 主品牌金色，用于按钮、重要图标
            dark: '#D97706', // 深金色，用于按钮悬停
          },
          neutral: {
            bg: '#0F0F23', // 深空蓝黑背景，让紫色和金色更突出
            card: '#1A1A2E', // 卡片背景色
            border: '#2D2D4D', // 边框色
            text: {
              primary: '#F3F4F6', // 主要文字
              secondary: '#9CA3AF', // 次要文字
            }
          }
        }
      },
      // 2. 定义惊喜动效
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px #C084FC, 0 0 10px #C084FC' },
          'to': { boxShadow: '0 0 10px #9333EA, 0 0 20px #9333EA, 0 0 30px #9333EA' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-gold': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .7 }
        }
      },
      // 3. 扩展一些圆角和阴影
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'walawow': '0 10px 30px -5px rgba(147, 51, 234, 0.3)',
        'walawow-lg': '0 20px 50px -10px rgba(147, 51, 234, 0.4)',
        'gold': '0 5px 15px rgba(251, 191, 36, 0.3)',
      }
    },
  },
  plugins: [],
}
