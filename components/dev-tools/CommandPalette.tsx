'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Command, 
  ArrowRight, 
  Hash,
  Zap,
  Code,
  Terminal,
  Settings,
  User,
  FileText,
  Database,
  Shield,
  Globe,
  Palette,
  Cpu,
  Play,
  Download,
  Copy,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Keyboard,
  HelpCircle
} from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  description: string
  category: CommandCategory
  icon: React.ReactNode
  shortcut?: string
  action: () => void
  keywords?: string[]
  isRecent?: boolean
  isFavorite?: boolean
}

type CommandCategory = 
  | 'generate' 
  | 'analyze' 
  | 'persona' 
  | 'theme' 
  | 'terminal' 
  | 'file' 
  | 'edit' 
  | 'view' 
  | 'help'
  | 'recent'
  | 'favorites'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onCommand?: (command: CommandItem) => void
  theme?: 'cyberpunk' | 'minimal' | 'neon'
  recentCommands?: CommandItem[]
  favoriteCommands?: CommandItem[]
}

export default function CommandPalette({
  isOpen,
  onClose,
  onCommand,
  theme = 'cyberpunk',
  recentCommands = [],
  favoriteCommands = []
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<CommandCategory | 'all'>('all')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

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
      itemHover: 'hover:bg-neon-blue/10',
      selected: 'bg-neon-blue/20 border-neon-blue/50'
    },
    minimal: {
      bg: 'bg-background-secondary/95',
      border: 'border-border',
      text: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      accent: 'accent-blue',
      glow: 'shadow-elegant',
      itemHover: 'hover:bg-background-tertiary',
      selected: 'bg-accent-blue/10 border-accent-blue/30'
    },
    neon: {
      bg: 'bg-background-secondary/95',
      border: 'border-neon-purple/30',
      text: 'text-neon-purple',
      secondary: 'text-neon-orange',
      muted: 'text-gray-400',
      accent: 'neon-purple',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
      itemHover: 'hover:bg-neon-purple/10',
      selected: 'bg-neon-purple/20 border-neon-purple/50'
    }
  }

  const currentTheme = themes[theme]

  // Define all available commands
  const allCommands: CommandItem[] = useMemo(() => [
    // Generate commands
    {
      id: 'generate-component',
      title: 'Generate React Component',
      description: 'Create a new React component with TypeScript and Tailwind',
      category: 'generate',
      icon: <Code className="w-4 h-4" />,
      shortcut: '⌘⇧C',
      action: () => console.log('Generate component'),
      keywords: ['component', 'react', 'tsx', 'create']
    },
    {
      id: 'generate-api',
      title: 'Generate API Endpoint',
      description: 'Create REST API endpoints with validation and types',
      category: 'generate',
      icon: <Database className="w-4 h-4" />,
      shortcut: '⌘⇧A',
      action: () => console.log('Generate API'),
      keywords: ['api', 'endpoint', 'rest', 'server']
    },
    {
      id: 'generate-test',
      title: 'Generate Unit Tests',
      description: 'Create comprehensive test suites for your code',
      category: 'generate',
      icon: <Shield className="w-4 h-4" />,
      action: () => console.log('Generate tests'),
      keywords: ['test', 'unit', 'jest', 'testing']
    },

    // Analyze commands
    {
      id: 'analyze-performance',
      title: 'Analyze Performance',
      description: 'Audit code performance and suggest optimizations',
      category: 'analyze',
      icon: <Zap className="w-4 h-4" />,
      action: () => console.log('Analyze performance'),
      keywords: ['performance', 'optimization', 'audit', 'speed']
    },
    {
      id: 'analyze-security',
      title: 'Security Audit',
      description: 'Scan for security vulnerabilities and best practices',
      category: 'analyze',
      icon: <Shield className="w-4 h-4" />,
      action: () => console.log('Security audit'),
      keywords: ['security', 'vulnerability', 'audit', 'safety']
    },
    {
      id: 'analyze-bundle',
      title: 'Bundle Analysis',
      description: 'Analyze bundle size and dependency usage',
      category: 'analyze',
      icon: <Globe className="w-4 h-4" />,
      action: () => console.log('Bundle analysis'),
      keywords: ['bundle', 'size', 'dependencies', 'webpack']
    },

    // Persona commands
    {
      id: 'persona-architect',
      title: 'Switch to Architect',
      description: 'System design and infrastructure expert',
      category: 'persona',
      icon: <Cpu className="w-4 h-4" />,
      action: () => console.log('Switch to architect'),
      keywords: ['architect', 'system', 'design', 'infrastructure']
    },
    {
      id: 'persona-frontend',
      title: 'Switch to Frontend',
      description: 'UI/UX and modern framework specialist',
      category: 'persona',
      icon: <Palette className="w-4 h-4" />,
      action: () => console.log('Switch to frontend'),
      keywords: ['frontend', 'ui', 'ux', 'react', 'vue']
    },
    {
      id: 'persona-backend',
      title: 'Switch to Backend',
      description: 'API development and server optimization',
      category: 'persona',
      icon: <Database className="w-4 h-4" />,
      action: () => console.log('Switch to backend'),
      keywords: ['backend', 'api', 'server', 'database']
    },

    // Terminal commands
    {
      id: 'terminal-clear',
      title: 'Clear Terminal',
      description: 'Clear all terminal output',
      category: 'terminal',
      icon: <Trash2 className="w-4 h-4" />,
      shortcut: '⌘K',
      action: () => console.log('Clear terminal'),
      keywords: ['clear', 'terminal', 'clean']
    },
    {
      id: 'terminal-run',
      title: 'Run Command',
      description: 'Execute command in terminal',
      category: 'terminal',
      icon: <Play className="w-4 h-4" />,
      shortcut: '⌘↵',
      action: () => console.log('Run command'),
      keywords: ['run', 'execute', 'command']
    },

    // File commands
    {
      id: 'file-new',
      title: 'New File',
      description: 'Create a new file',
      category: 'file',
      icon: <FileText className="w-4 h-4" />,
      shortcut: '⌘N',
      action: () => console.log('New file'),
      keywords: ['new', 'file', 'create']
    },
    {
      id: 'file-save',
      title: 'Save File',
      description: 'Save current file',
      category: 'file',
      icon: <Download className="w-4 h-4" />,
      shortcut: '⌘S',
      action: () => console.log('Save file'),
      keywords: ['save', 'file']
    },

    // Theme commands
    {
      id: 'theme-cyberpunk',
      title: 'Cyberpunk Theme',
      description: 'Switch to cyberpunk dark theme',
      category: 'theme',
      icon: <Moon className="w-4 h-4" />,
      action: () => console.log('Cyberpunk theme'),
      keywords: ['theme', 'cyberpunk', 'dark', 'neon']
    },
    {
      id: 'theme-minimal',
      title: 'Minimal Theme',
      description: 'Switch to minimal clean theme',
      category: 'theme',
      icon: <Sun className="w-4 h-4" />,
      action: () => console.log('Minimal theme'),
      keywords: ['theme', 'minimal', 'clean', 'simple']
    },

    // Help commands
    {
      id: 'help-shortcuts',
      title: 'Keyboard Shortcuts',
      description: 'View all available keyboard shortcuts',
      category: 'help',
      icon: <Keyboard className="w-4 h-4" />,
      action: () => console.log('Show shortcuts'),
      keywords: ['help', 'shortcuts', 'keyboard', 'hotkeys']
    },
    {
      id: 'help-docs',
      title: 'Documentation',
      description: 'Open SuperClaude documentation',
      category: 'help',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => console.log('Open docs'),
      keywords: ['help', 'docs', 'documentation', 'guide']
    }
  ], [])

  // Filter commands based on query and category
  const filteredCommands = useMemo(() => {
    let commands = [...allCommands]

    // Add recent and favorite commands
    if (recentCommands.length > 0) {
      commands = [...recentCommands.map(cmd => ({ ...cmd, isRecent: true })), ...commands]
    }
    if (favoriteCommands.length > 0) {
      commands = [...favoriteCommands.map(cmd => ({ ...cmd, isFavorite: true })), ...commands]
    }

    // Filter by category
    if (activeCategory !== 'all') {
      commands = commands.filter(cmd => 
        cmd.category === activeCategory || 
        (activeCategory === 'recent' && cmd.isRecent) ||
        (activeCategory === 'favorites' && cmd.isFavorite)
      )
    }

    // Filter by query
    if (query) {
      const searchTerm = query.toLowerCase()
      commands = commands.filter(cmd => 
        cmd.title.toLowerCase().includes(searchTerm) ||
        cmd.description.toLowerCase().includes(searchTerm) ||
        cmd.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
      )
    }

    return commands
  }, [allCommands, query, activeCategory, recentCommands, favoriteCommands])

  // Categories
  const categories = [
    { id: 'all', label: 'All', icon: <Command className="w-4 h-4" /> },
    { id: 'recent', label: 'Recent', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'favorites', label: 'Favorites', icon: <Hash className="w-4 h-4" /> },
    { id: 'generate', label: 'Generate', icon: <Zap className="w-4 h-4" /> },
    { id: 'analyze', label: 'Analyze', icon: <Eye className="w-4 h-4" /> },
    { id: 'persona', label: 'Persona', icon: <User className="w-4 h-4" /> },
    { id: 'terminal', label: 'Terminal', icon: <Terminal className="w-4 h-4" /> },
    { id: 'file', label: 'File', icon: <FileText className="w-4 h-4" /> },
    { id: 'theme', label: 'Theme', icon: <Palette className="w-4 h-4" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="w-4 h-4" /> }
  ]

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setActiveCategory('all')
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'Tab':
          e.preventDefault()
          // Cycle through categories
          const currentCategoryIndex = categories.findIndex(cat => cat.id === activeCategory)
          const nextIndex = (currentCategoryIndex + 1) % categories.length
          setActiveCategory(categories[nextIndex].id as CommandCategory | 'all')
          setSelectedIndex(0)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, activeCategory, categories, onClose])

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  const executeCommand = (command: CommandItem) => {
    command.action()
    onCommand?.(command)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
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
          onClick={onClose}
        />
        
        {/* Command Palette */}
        <motion.div
          className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto px-6`}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={`${currentTheme.bg} backdrop-blur-xl border ${currentTheme.border} rounded-2xl ${currentTheme.glow} overflow-hidden`}>
            {/* Search Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <Search className={`w-5 h-5 ${currentTheme.secondary}`} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className={`flex-1 bg-transparent ${currentTheme.text} placeholder-${currentTheme.muted} outline-none text-lg`}
                />
                <div className="flex items-center space-x-2 text-xs text-text-disabled">
                  <kbd className="px-2 py-1 bg-background-tertiary rounded">⌘K</kbd>
                  <kbd className="px-2 py-1 bg-background-tertiary rounded">ESC</kbd>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-1 p-4 border-b border-border overflow-x-auto">
              {categories.map((category) => {
                const isActive = activeCategory === category.id
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id as CommandCategory | 'all')
                      setSelectedIndex(0)
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      isActive 
                        ? `${currentTheme.selected} ${currentTheme.text}` 
                        : `${currentTheme.itemHover} ${currentTheme.muted}`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Commands List */}
            <div 
              ref={listRef}
              className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
            >
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center">
                  <div className={`${currentTheme.muted} mb-2`}>No commands found</div>
                  <div className={`text-sm ${currentTheme.muted}`}>
                    Try adjusting your search or category filter
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  {filteredCommands.map((command, index) => {
                    const isSelected = index === selectedIndex
                    return (
                      <motion.button
                        key={command.id}
                        onClick={() => executeCommand(command)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                          isSelected 
                            ? `${currentTheme.selected} border ${currentTheme.border}` 
                            : `${currentTheme.itemHover} border border-transparent`
                        }`}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`${currentTheme.secondary}`}>
                            {command.icon}
                          </div>
                          <div className="text-left">
                            <div className={`font-medium ${currentTheme.text} flex items-center space-x-2`}>
                              <span>{command.title}</span>
                              {command.isRecent && (
                                <span className="px-2 py-0.5 bg-accent-blue/20 text-accent-blue text-xs rounded-full">
                                  Recent
                                </span>
                              )}
                              {command.isFavorite && (
                                <span className="px-2 py-0.5 bg-accent-purple/20 text-accent-purple text-xs rounded-full">
                                  ★
                                </span>
                              )}
                            </div>
                            <div className={`text-sm ${currentTheme.muted}`}>
                              {command.description}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {command.shortcut && (
                            <kbd className={`px-2 py-1 bg-background-tertiary border border-border rounded text-xs ${currentTheme.muted}`}>
                              {command.shortcut}
                            </kbd>
                          )}
                          <ArrowRight className={`w-4 h-4 ${currentTheme.muted}`} />
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>⇥ Categories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{filteredCommands.length} commands</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}