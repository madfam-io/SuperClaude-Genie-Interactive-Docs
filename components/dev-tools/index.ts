// SuperClaude Developer Tools - Cyberpunk Minimal UI Components
// Complete developer-first interface with Monaco editor, terminal, and command palette

// Core Components
export { default as MonacoEditor } from './MonacoEditor'
export { default as TerminalInterface } from './TerminalInterface'
export { default as CommandPalette } from './CommandPalette'
export { default as DevToolsLayout } from './DevToolsLayout'

// Navigation and Interaction
export { 
  KeyboardNavigationProvider,
  useKeyboardNavigation,
  useShortcut,
  KeyCombo
} from './KeyboardNavigation'

// Themes and Styling
export {
  syntaxThemes,
  themeMetadata,
  cyberpunkDark,
  matrixGreen,
  neonPurple,
  terminalGreen,
  minimalDark,
  highContrast
} from './SyntaxThemes'

// Types
export type {
  MonacoThemeDefinition
} from './SyntaxThemes'

// Component Configurations
export const devToolsConfig = {
  // Default theme settings
  defaultTheme: 'cyberpunk' as const,
  
  // Monaco Editor defaults
  monacoDefaults: {
    language: 'typescript',
    theme: 'cyberpunk-dark',
    fontSize: 14,
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    minimap: true,
    lineNumbers: true,
    wordWrap: true
  },
  
  // Terminal defaults
  terminalDefaults: {
    theme: 'cyberpunk' as const,
    prompt: '~/superclaude',
    title: 'SuperClaude Terminal',
    height: 400
  },
  
  // Command palette defaults
  paletteDefaults: {
    theme: 'cyberpunk' as const,
    maxRecentCommands: 10,
    categories: [
      'generate',
      'analyze', 
      'persona',
      'terminal',
      'file',
      'theme',
      'help'
    ]
  },
  
  // Layout presets
  layoutPresets: {
    ide: {
      leftPanel: { visible: true, width: 300 },
      rightPanel: { visible: false, width: 250 },
      bottomPanel: { visible: true, height: 200 },
      topPanel: { visible: false, height: 100 }
    },
    focus: {
      leftPanel: { visible: false, width: 300 },
      rightPanel: { visible: false, width: 250 },
      bottomPanel: { visible: false, height: 200 },
      topPanel: { visible: false, height: 100 }
    },
    terminal: {
      leftPanel: { visible: false, width: 300 },
      rightPanel: { visible: false, width: 250 },
      bottomPanel: { visible: true, height: 400 },
      topPanel: { visible: false, height: 100 }
    },
    mobile: {
      leftPanel: { visible: false, width: 300 },
      rightPanel: { visible: false, width: 250 },
      bottomPanel: { visible: true, height: 300 },
      topPanel: { visible: false, height: 100 }
    }
  },
  
  // Keyboard shortcuts
  defaultShortcuts: {
    // Command palette
    'command-palette': ['Meta', 'k'],
    'show-shortcuts': ['Meta', 'Shift', 'p'],
    
    // File operations
    'new-file': ['Meta', 'n'],
    'save-file': ['Meta', 's'],
    'open-file': ['Meta', 'o'],
    
    // Navigation
    'search': ['Meta', 'f'],
    'go-to-line': ['Meta', 'g'],
    'toggle-sidebar': ['Meta', 'b'],
    'toggle-panel': ['Meta', 'j'],
    
    // Terminal
    'new-terminal': ['Meta', 'Shift', 'c'],
    'clear-terminal': ['Meta', 'k'],
    'run-command': ['Meta', 'Enter'],
    
    // View
    'zen-mode': ['Meta', 'Shift', 'z'],
    'settings': ['Meta', ',']
  },
  
  // Color schemes
  colorSchemes: {
    cyberpunk: {
      primary: '#00d4ff',
      secondary: '#a855f7',
      accent: '#f472b6',
      success: '#22c55e',
      warning: '#ff8c00',
      error: '#ff0040',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#ffffff'
    },
    minimal: {
      primary: '#0070f3',
      secondary: '#7c3aed',
      accent: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#ffffff'
    },
    neon: {
      primary: '#a855f7',
      secondary: '#ff00ff',
      accent: '#f472b6',
      success: '#22c55e',
      warning: '#ff8c00',
      error: '#ff0040',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#ffffff'
    }
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  },
  
  // Animation settings
  animations: {
    duration: {
      fast: 0.2,
      medium: 0.3,
      slow: 0.5
    },
    easing: [0.16, 1, 0.3, 1], // Stripe-inspired easing
    reduceMotion: false
  },
  
  // Performance settings
  performance: {
    virtualScrolling: true,
    lazyLoading: true,
    debounceSearch: 300,
    throttleResize: 100
  }
}

// Utility functions
export const devToolsUtils = {
  // Format key combinations for display
  formatKeyCombo: (keys: string[]): string => {
    const keyMap: Record<string, string> = {
      Meta: navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl',
      Control: 'Ctrl',
      Shift: '⇧',
      Alt: '⌥',
      Enter: '↵',
      Escape: 'Esc',
      ArrowUp: '↑',
      ArrowDown: '↓',
      ArrowLeft: '←',
      ArrowRight: '→',
      Space: '␣',
      Tab: '⇥'
    }
    return keys.map(key => keyMap[key] || key).join(' + ')
  },
  
  // Get theme colors
  getThemeColors: (theme: keyof typeof devToolsConfig.colorSchemes) => {
    return devToolsConfig.colorSchemes[theme] || devToolsConfig.colorSchemes.cyberpunk
  },
  
  // Check if device is mobile
  isMobile: (): boolean => {
    return typeof window !== 'undefined' && window.innerWidth < devToolsConfig.breakpoints.mobile
  },
  
  // Get current responsive mode
  getResponsiveMode: (): 'mobile' | 'tablet' | 'desktop' => {
    if (typeof window === 'undefined') return 'desktop'
    
    const width = window.innerWidth
    if (width < devToolsConfig.breakpoints.mobile) return 'mobile'
    if (width < devToolsConfig.breakpoints.tablet) return 'tablet'
    return 'desktop'
  },
  
  // Debounce function
  debounce: <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },
  
  // Throttle function
  throttle: <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), wait)
      }
    }
  }
}

// Theme manager
export class ThemeManager {
  private currentTheme: string = devToolsConfig.defaultTheme
  private listeners: ((theme: string) => void)[] = []
  
  setTheme(theme: string) {
    this.currentTheme = theme
    this.notifyListeners()
    
    // Apply theme to document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }
  
  getTheme(): string {
    return this.currentTheme
  }
  
  subscribe(listener: (theme: string) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }
  
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentTheme))
  }
}

// Create global theme manager instance
export const themeManager = new ThemeManager()