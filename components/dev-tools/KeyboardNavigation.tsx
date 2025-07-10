'use client'

import { useEffect, useRef, useState, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Keyboard, Eye, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CornerDownLeft as Enter, X as Escape } from 'lucide-react'

interface KeyboardShortcut {
  id: string
  keys: string[]
  description: string
  category: ShortcutCategory
  action: () => void
  global?: boolean
  disabled?: boolean
}

type ShortcutCategory = 
  | 'navigation'
  | 'editing'
  | 'terminal'
  | 'palette'
  | 'file'
  | 'view'
  | 'general'

interface KeyboardNavigationContextType {
  registerShortcut: (shortcut: KeyboardShortcut) => void
  unregisterShortcut: (id: string) => void
  showShortcuts: () => void
  hideShortcuts: () => void
  isEnabled: boolean
  setEnabled: (enabled: boolean) => void
}

const KeyboardNavigationContext = createContext<KeyboardNavigationContextType | null>(null)

export const useKeyboardNavigation = () => {
  const context = useContext(KeyboardNavigationContext)
  if (!context) {
    throw new Error('useKeyboardNavigation must be used within KeyboardNavigationProvider')
  }
  return context
}

// Custom hook for registering shortcuts
export const useShortcut = (shortcut: KeyboardShortcut) => {
  const { registerShortcut, unregisterShortcut } = useKeyboardNavigation()

  useEffect(() => {
    registerShortcut(shortcut)
    return () => unregisterShortcut(shortcut.id)
  }, [shortcut, registerShortcut, unregisterShortcut])
}

interface KeyboardNavigationProviderProps {
  children: ReactNode
  theme?: 'cyberpunk' | 'minimal' | 'neon'
}

export function KeyboardNavigationProvider({ 
  children, 
  theme = 'cyberpunk' 
}: KeyboardNavigationProviderProps) {
  const [shortcuts, setShortcuts] = useState<Map<string, KeyboardShortcut>>(new Map())
  const [showHelp, setShowHelp] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const keysRef = useRef<Set<string>>(new Set())

  // Theme configurations
  const themes = {
    cyberpunk: {
      bg: 'bg-black/95',
      border: 'border-neon-blue/30',
      text: 'text-neon-blue',
      secondary: 'text-neon-purple',
      muted: 'text-gray-400',
      accent: 'neon-blue',
      glow: 'shadow-[0_0_30px_rgba(0,212,255,0.3)]',
      key: 'bg-neon-blue/20 border-neon-blue/50',
      category: 'text-neon-cyan'
    },
    minimal: {
      bg: 'bg-background-secondary/95',
      border: 'border-border',
      text: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      accent: 'accent-blue',
      glow: 'shadow-elegant',
      key: 'bg-accent-blue/10 border-accent-blue/30',
      category: 'text-accent-purple'
    },
    neon: {
      bg: 'bg-background-secondary/95',
      border: 'border-neon-purple/30',
      text: 'text-neon-purple',
      secondary: 'text-neon-orange',
      muted: 'text-gray-400',
      accent: 'neon-purple',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
      key: 'bg-neon-purple/20 border-neon-purple/50',
      category: 'text-neon-magenta'
    }
  }

  const currentTheme = themes[theme]

  // Default shortcuts
  useEffect(() => {
    const defaultShortcuts: KeyboardShortcut[] = [
      // Navigation
      {
        id: 'command-palette',
        keys: ['Meta', 'k'],
        description: 'Open command palette',
        category: 'palette',
        action: () => console.log('Open command palette'),
        global: true
      },
      {
        id: 'search',
        keys: ['Meta', 'f'],
        description: 'Search in file',
        category: 'navigation',
        action: () => console.log('Search'),
        global: true
      },
      {
        id: 'go-to-line',
        keys: ['Meta', 'g'],
        description: 'Go to line',
        category: 'navigation',
        action: () => console.log('Go to line'),
        global: true
      },
      
      // File operations
      {
        id: 'new-file',
        keys: ['Meta', 'n'],
        description: 'New file',
        category: 'file',
        action: () => console.log('New file'),
        global: true
      },
      {
        id: 'save-file',
        keys: ['Meta', 's'],
        description: 'Save file',
        category: 'file',
        action: () => console.log('Save file'),
        global: true
      },
      {
        id: 'open-file',
        keys: ['Meta', 'o'],
        description: 'Open file',
        category: 'file',
        action: () => console.log('Open file'),
        global: true
      },

      // Terminal
      {
        id: 'new-terminal',
        keys: ['Meta', 'Shift', 'c'],
        description: 'New terminal',
        category: 'terminal',
        action: () => console.log('New terminal'),
        global: true
      },
      {
        id: 'clear-terminal',
        keys: ['Meta', 'k'],
        description: 'Clear terminal',
        category: 'terminal',
        action: () => console.log('Clear terminal')
      },
      {
        id: 'run-command',
        keys: ['Meta', 'Enter'],
        description: 'Run terminal command',
        category: 'terminal',
        action: () => console.log('Run command')
      },

      // View
      {
        id: 'toggle-sidebar',
        keys: ['Meta', 'b'],
        description: 'Toggle sidebar',
        category: 'view',
        action: () => console.log('Toggle sidebar'),
        global: true
      },
      {
        id: 'toggle-panel',
        keys: ['Meta', 'j'],
        description: 'Toggle bottom panel',
        category: 'view',
        action: () => console.log('Toggle panel'),
        global: true
      },
      {
        id: 'zen-mode',
        keys: ['Meta', 'Shift', 'z'],
        description: 'Toggle zen mode',
        category: 'view',
        action: () => console.log('Zen mode'),
        global: true
      },

      // General
      {
        id: 'show-shortcuts',
        keys: ['Meta', 'Shift', 'p'],
        description: 'Show keyboard shortcuts',
        category: 'general',
        action: () => setShowHelp(true),
        global: true
      },
      {
        id: 'settings',
        keys: ['Meta', ','],
        description: 'Open settings',
        category: 'general',
        action: () => console.log('Settings'),
        global: true
      }
    ]

    defaultShortcuts.forEach(shortcut => {
      setShortcuts(prev => new Map(prev).set(shortcut.id, shortcut))
    })
  }, [])

  // Handle keyboard events
  useEffect(() => {
    if (!isEnabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key === ' ' ? 'Space' : e.key
      keysRef.current.add(key)
      setPressedKeys(new Set(keysRef.current))

      // Check for shortcut matches
      shortcuts.forEach(shortcut => {
        if (shortcut.disabled) return

        const requiredKeys = shortcut.keys.map(k => k === 'Meta' ? (navigator.platform.includes('Mac') ? 'Meta' : 'Control') : k)
        const allPressed = requiredKeys.every(reqKey => keysRef.current.has(reqKey))
        const exactMatch = requiredKeys.length === keysRef.current.size

        if (allPressed && exactMatch) {
          e.preventDefault()
          e.stopPropagation()
          shortcut.action()
        }
      })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key === ' ' ? 'Space' : e.key
      keysRef.current.delete(key)
      setPressedKeys(new Set(keysRef.current))
    }

    const handleBlur = () => {
      keysRef.current.clear()
      setPressedKeys(new Set())
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [shortcuts, isEnabled])

  const registerShortcut = (shortcut: KeyboardShortcut) => {
    setShortcuts(prev => new Map(prev).set(shortcut.id, shortcut))
  }

  const unregisterShortcut = (id: string) => {
    setShortcuts(prev => {
      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
  }

  const showShortcuts = () => setShowHelp(true)
  const hideShortcuts = () => setShowHelp(false)

  const formatKey = (key: string) => {
    const keyMap: Record<string, string> = {
      Meta: navigator.platform.includes('Mac') ? '⌘' : 'Ctrl',
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
      Tab: '⇥',
      Backspace: '⌫',
      Delete: '⌦'
    }
    return keyMap[key] || key
  }

  // Group shortcuts by category
  const groupedShortcuts = Array.from(shortcuts.values()).reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<ShortcutCategory, KeyboardShortcut[]>)

  const categoryLabels: Record<ShortcutCategory, string> = {
    navigation: 'Navigation',
    editing: 'Editing',
    terminal: 'Terminal',
    palette: 'Command Palette',
    file: 'File Operations',
    view: 'View',
    general: 'General'
  }

  const categoryIcons: Record<ShortcutCategory, ReactNode> = {
    navigation: <ArrowRight className="w-4 h-4" />,
    editing: <Command className="w-4 h-4" />,
    terminal: <Command className="w-4 h-4" />,
    palette: <Command className="w-4 h-4" />,
    file: <Command className="w-4 h-4" />,
    view: <Eye className="w-4 h-4" />,
    general: <Command className="w-4 h-4" />
  }

  return (
    <KeyboardNavigationContext.Provider value={{
      registerShortcut,
      unregisterShortcut,
      showShortcuts,
      hideShortcuts,
      isEnabled,
      setEnabled: setIsEnabled
    }}>
      {children}

      {/* Keyboard Shortcuts Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background-overlay backdrop-blur-sm"
              onClick={() => setShowHelp(false)}
            />
            
            {/* Modal */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-auto px-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`${currentTheme.bg} backdrop-blur-xl border ${currentTheme.border} rounded-2xl ${currentTheme.glow} overflow-hidden`}>
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Keyboard className={`w-6 h-6 ${currentTheme.accent}`} />
                      <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
                        Keyboard Shortcuts
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowHelp(false)}
                      className={`p-2 hover:bg-${currentTheme.accent}/10 rounded-lg transition-colors`}
                    >
                      <Escape className={`w-5 h-5 ${currentTheme.muted}`} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="max-h-96 overflow-y-auto p-6 space-y-8">
                  {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
                    <div key={category}>
                      <div className="flex items-center space-x-2 mb-4">
                        {categoryIcons[category as ShortcutCategory]}
                        <h3 className={`text-lg font-semibold ${currentTheme.category}`}>
                          {categoryLabels[category as ShortcutCategory]}
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {shortcuts.map(shortcut => (
                          <div
                            key={shortcut.id}
                            className={`flex items-center justify-between p-3 rounded-lg border border-border hover:bg-${currentTheme.accent}/5 transition-colors`}
                          >
                            <span className={`${currentTheme.secondary}`}>
                              {shortcut.description}
                            </span>
                            <div className="flex items-center space-x-1">
                              {shortcut.keys.map((key, index) => (
                                <div key={index} className="flex items-center">
                                  <kbd className={`px-2 py-1 ${currentTheme.key} border rounded text-xs font-mono`}>
                                    {formatKey(key)}
                                  </kbd>
                                  {index < shortcut.keys.length - 1 && (
                                    <span className={`mx-1 ${currentTheme.muted}`}>+</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <div className={`${currentTheme.muted}`}>
                      Press <kbd className="px-2 py-1 bg-background-tertiary border border-border rounded">Esc</kbd> to close
                    </div>
                    <div className={`${currentTheme.muted}`}>
                      {Object.values(groupedShortcuts).flat().length} shortcuts available
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pressed Keys Indicator (Debug/Visual feedback) */}
      {pressedKeys.size > 0 && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className={`${currentTheme.bg} backdrop-blur-sm border ${currentTheme.border} rounded-lg p-3`}>
            <div className="flex items-center space-x-2">
              {Array.from(pressedKeys).map(key => (
                <kbd
                  key={key}
                  className={`px-2 py-1 ${currentTheme.key} border rounded text-xs font-mono`}
                >
                  {formatKey(key)}
                </kbd>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </KeyboardNavigationContext.Provider>
  )
}

// Utility component for showing key combinations
interface KeyComboProps {
  keys: string[]
  theme?: 'cyberpunk' | 'minimal' | 'neon'
  size?: 'sm' | 'md' | 'lg'
}

export function KeyCombo({ keys, theme = 'cyberpunk', size = 'md' }: KeyComboProps) {
  const themes = {
    cyberpunk: 'bg-neon-blue/20 border-neon-blue/50 text-neon-blue',
    minimal: 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue',
    neon: 'bg-neon-purple/20 border-neon-purple/50 text-neon-purple'
  }

  const sizes = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  const formatKey = (key: string) => {
    const keyMap: Record<string, string> = {
      Meta: navigator.platform.includes('Mac') ? '⌘' : 'Ctrl',
      Control: 'Ctrl',
      Shift: '⇧',
      Alt: '⌥',
      Enter: '↵',
      Escape: 'Esc'
    }
    return keyMap[key] || key
  }

  return (
    <div className="flex items-center space-x-1">
      {keys.map((key, index) => (
        <div key={index} className="flex items-center">
          <kbd className={`${themes[theme]} border rounded font-mono ${sizes[size]}`}>
            {formatKey(key)}
          </kbd>
          {index < keys.length - 1 && (
            <span className="mx-1 text-text-muted">+</span>
          )}
        </div>
      ))}
    </div>
  )
}