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
      // Modern Color System - Linear/Arc/Raycast inspired
      colors: {
        // Base colors - clean, minimal, high contrast
        background: {
          DEFAULT: '#000000',
          secondary: '#0a0a0a',
          tertiary: '#141414',
          card: '#1a1a1a',
          overlay: '#0a0a0a/80',
        },
        
        // Text colors - high contrast for readability
        text: {
          primary: '#ffffff',
          secondary: '#a1a1a1',
          muted: '#707070',
          disabled: '#404040',
        },
        
        // Accent colors - modern, vibrant, purposeful
        accent: {
          blue: '#0070f3',      // Vercel blue
          purple: '#7c3aed',    // Linear purple
          orange: '#ff6b35',    // Arc orange
          green: '#10b981',     // Success green
          red: '#ef4444',       // Error red
          yellow: '#f59e0b',    // Warning yellow
        },
        
        // Neon accents for highlights
        neon: {
          blue: '#00d4ff',
          purple: '#a855f7',
          green: '#22c55e',
          orange: '#ff8c00',
          pink: '#f472b6',
        },
        
        // Borders and surfaces
        border: {
          DEFAULT: '#262626',
          secondary: '#404040',
          accent: '#525252',
        },
        
        // Glass morphism
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
        
        // Legacy compatibility
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff', 
          400: '#818cf8',
          500: '#0070f3',
          600: '#0051a5',
          700: '#0039a6',
          800: '#002e8b',
          900: '#001e6f',
          950: '#00102b',
        },
        
        // Semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        
        // Legacy support
        'bg-dark': '#000000',
        'bg-light': '#1a1a1a',
        'bg-card': '#1a1a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1a1',
        'text-muted': '#707070',
        secondary: '#7c3aed',
        cyber: {
          cyan: '#00d4ff',
          magenta: '#a855f7',
          lime: '#22c55e',
          orange: '#ff8c00',
          blue: '#0070f3',
          purple: '#7c3aed',
        },
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
      
      // GPU-optimized animations - smooth, purposeful, 60fps
      animation: {
        // Core animations - inspired by Linear/Arc/Raycast
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        
        // 3D and smooth micro-interactions
        'rotate-smooth': 'rotateSmooth 10s linear infinite',
        'hover-lift': 'hoverLift 0.3s ease-out',
        'press-down': 'pressDown 0.1s ease-out',
        
        // Performance optimized
        'gpu-fade': 'gpuFade 0.4s ease-out',
        'gpu-slide': 'gpuSlide 0.4s ease-out',
        'gpu-scale': 'gpuScale 0.3s ease-out',
      },
      
      // GPU-optimized keyframes - performance first
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateZ(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateZ(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateZ(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 112, 243, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 112, 243, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateZ(0)' },
          '50%': { transform: 'translateY(-10px) translateZ(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%': { transform: 'translateY(-5px) translateZ(0)' },
        },
        rotateSmooth: {
          '0%': { transform: 'rotate(0deg) translateZ(0)' },
          '100%': { transform: 'rotate(360deg) translateZ(0)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0) translateZ(0)' },
          '100%': { transform: 'translateY(-2px) translateZ(0)' },
        },
        pressDown: {
          '0%': { transform: 'scale(1) translateZ(0)' },
          '100%': { transform: 'scale(0.98) translateZ(0)' },
        },
        gpuFade: {
          '0%': { opacity: '0', transform: 'translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateZ(0)' },
        },
        gpuSlide: {
          '0%': { opacity: '0', transform: 'translateY(10px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
        gpuScale: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateZ(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateZ(0)' },
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
  plugins: [
    // Custom utilities for modern design
    function({ addUtilities, addComponents }) {
      addUtilities({
        '.glass-light': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-medium': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(15px)',
          'border': '1px solid rgba(255, 255, 255, 0.15)',
        },
        '.glass-strong': {
          'background': 'rgba(255, 255, 255, 0.15)',
          'backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.smooth-transition': {
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.gpu-optimized': {
          'transform': 'translateZ(0)',
          'will-change': 'transform',
        },
        '.bento-grid': {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
          'gap': '1rem',
        },
        '.raycast-blur': {
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'background': 'rgba(255, 255, 255, 0.08)',
        },
        '.linear-border': {
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'border-radius': '0.75rem',
        },
        '.arc-hover': {
          'transition': 'all 0.2s ease-out',
          '&:hover': {
            'transform': 'translateY(-1px)',
            'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.15)',
          },
        },
      })
      
      addComponents({
        '.btn-modern': {
          'padding': '0.75rem 1.5rem',
          'border-radius': '0.75rem',
          'font-weight': '500',
          'transition': 'all 0.2s ease-out',
          'background': 'rgba(255, 255, 255, 0.05)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'color': 'white',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.1)',
            'border-color': 'rgba(255, 255, 255, 0.2)',
            'transform': 'translateY(-1px)',
          },
        },
        '.card-modern': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'border-radius': '1rem',
          'padding': '1.5rem',
          'transition': 'all 0.3s ease-out',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.08)',
            'border-color': 'rgba(255, 255, 255, 0.15)',
            'transform': 'translateY(-2px)',
          },
        },
      })
    },
  ],
}