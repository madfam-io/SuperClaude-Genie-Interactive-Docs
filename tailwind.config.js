/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Enhanced Color System - Cyberpunk meets Premium Elegance
      colors: {
        // Core Brand Colors
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff', 
          400: '#818cf8',
          500: '#6366f1', // Main primary
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        
        // Cyberpunk Neon Palette
        cyber: {
          cyan: '#00ffff',
          'cyan-dark': '#00d4d4',
          magenta: '#ff00ff',
          'magenta-dark': '#cc00cc',
          lime: '#00ff88',
          'lime-dark': '#00cc6a',
          orange: '#ff6b35',
          blue: '#0080ff',
          purple: '#8b5cf6',
        },
        
        // Premium Grays (Inspired by Stripe/Linear)
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          925: '#0a0f1c',
          950: '#030712',
        },
        
        // Background System
        background: {
          'void': '#000000',
          'dark': '#0a0a0a',
          'darker': '#030712',
          'slate': '#0f172a',
          'card': '#1e293b',
          'elevated': '#334155',
        },
        
        // Text Hierarchy
        text: {
          primary: '#ffffff',
          secondary: '#e2e8f0',
          muted: '#94a3b8',
          'ultra-muted': '#64748b',
        },
        
        // Semantic Colors
        success: '#00ff88',
        warning: '#ff6b35',
        error: '#ff4757',
        
        // Legacy Support
        'bg-dark': '#0a0a0a',
        'bg-light': '#1e293b',
        'bg-card': '#1e293b',
        'text-primary': '#ffffff',
        'text-secondary': '#e2e8f0',
        'text-muted': '#94a3b8',
        secondary: '#8b5cf6',
        accent: '#ff00ff',
      },
      
      // Enhanced Typography (Inspired by Vercel/Linear)
      fontFamily: {
        sans: [
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ],
        display: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
      },
      
      // Enhanced Font Sizes (Stripe-inspired hierarchy)
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      // Enhanced Spacing System
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Premium Gradients
      backgroundImage: {
        // Cyberpunk Gradients
        'gradient-cyber-primary': 'linear-gradient(135deg, #00ffff 0%, #0080ff 100%)',
        'gradient-cyber-secondary': 'linear-gradient(135deg, #8b5cf6 0%, #ff00ff 100%)',
        'gradient-cyber-accent': 'linear-gradient(135deg, #00ff88 0%, #00ffff 100%)',
        
        // Premium Gradients (Stripe-inspired)
        'gradient-premium': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-elegant': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        
        // Geometric Patterns (Vercel-inspired)
        'gradient-mesh': 'radial-gradient(at 40% 40%, #00ffff22 0px, transparent 50%), radial-gradient(at 90% 10%, #ff00ff22 0px, transparent 50%), radial-gradient(at 0% 50%, #8b5cf622 0px, transparent 50%)',
        
        // Neural Network
        'gradient-neural': 'conic-gradient(from 0deg at 50% 50%, #00ffff, #1e293b, #8b5cf6, #1e293b, #ff00ff, #1e293b, #00ffff)',
        
        // Holographic
        'gradient-holographic': 'linear-gradient(45deg, #00ffff, #8b5cf6, #ff00ff, #00ff88, #0080ff, #00ffff)',
      },
      
      // Enhanced Animations (Linear/Vercel-inspired)
      animation: {
        // Subtle animations
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'rotate': 'rotate 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        
        // Cyberpunk animations
        'cyber-pulse': 'cyber-pulse 3s ease-in-out infinite',
        'neural-flow': 'neural-flow 8s ease-in-out infinite',
        'holographic': 'holographic 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        
        // Micro-interactions
        'micro-bounce': 'micro-bounce 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'micro-scale': 'micro-scale 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      
      // Enhanced Keyframes
      keyframes: {
        // Smooth, performance-optimized animations
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateZ(0)', 
          },
          '50%': { 
            transform: 'translateY(-10px) translateZ(0)', 
          },
        },
        glow: {
          '0%': { 
            filter: 'brightness(1) saturate(1)', 
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' 
          },
          '100%': { 
            filter: 'brightness(1.1) saturate(1.2)', 
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)' 
          },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)' 
          },
        },
        'fade-in': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(10px) scale(0.98)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        'slide-up': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'scale-in': {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        'cyber-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            borderColor: 'rgba(0, 255, 255, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4)',
            borderColor: 'rgba(0, 255, 255, 0.8)',
          },
        },
        'neural-flow': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%' 
          },
          '50%': { 
            backgroundPosition: '100% 50%' 
          },
        },
        holographic: {
          '0%, 100%': { 
            filter: 'hue-rotate(0deg)' 
          },
          '50%': { 
            filter: 'hue-rotate(180deg)' 
          },
        },
        shimmer: {
          '0%': { 
            backgroundPosition: '-200% 0' 
          },
          '100%': { 
            backgroundPosition: '200% 0' 
          },
        },
        'micro-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'micro-scale': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      
      // Enhanced Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      // Enhanced Box Shadows (Stripe-inspired)
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.6)',
        'cyber': '0 0 20px rgba(0, 255, 255, 0.4)',
        'cyber-lg': '0 0 40px rgba(0, 255, 255, 0.6)',
        'premium': '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2)',
        'elegant': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      
      // Enhanced Blur
      blur: {
        '4xl': '72px',
        '5xl': '96px',
        '6xl': '120px',
      },
    },
  },
  plugins: [],
}