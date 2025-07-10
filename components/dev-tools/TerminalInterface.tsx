'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, 
  Play, 
  Square, 
  Trash2, 
  Copy, 
  Download,
  Settings,
  Maximize2,
  Minimize2,
  ChevronRight,
  Folder,
  Zap
} from 'lucide-react'

interface TerminalCommand {
  id: string
  command: string
  output: string
  timestamp: Date
  status: 'running' | 'success' | 'error' | 'pending'
  executionTime?: number
}

interface TerminalInterfaceProps {
  title?: string
  prompt?: string
  className?: string
  height?: string | number
  onCommand?: (command: string) => Promise<string>
  theme?: 'cyberpunk' | 'matrix' | 'neon-blue' | 'hacker-green'
  showHeader?: boolean
  autoFocus?: boolean
}

export default function TerminalInterface({
  title = 'SuperClaude Terminal',
  prompt = '~/superclaude',
  className = '',
  height = 400,
  onCommand,
  theme = 'cyberpunk',
  showHeader = true,
  autoFocus = true
}: TerminalInterfaceProps) {
  const [commands, setCommands] = useState<TerminalCommand[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Terminal themes
  const themes = {
    cyberpunk: {
      bg: 'bg-black',
      border: 'border-neon-blue/30',
      text: 'text-neon-blue',
      prompt: 'text-neon-blue',
      success: 'text-neon-green',
      error: 'text-neon-orange',
      warning: 'text-neon-purple',
      glow: 'shadow-[0_0_20px_rgba(0,212,255,0.3)]',
      accent: 'neon-blue'
    },
    matrix: {
      bg: 'bg-black',
      border: 'border-neon-green/30',
      text: 'text-neon-green',
      prompt: 'text-neon-green',
      success: 'text-neon-green',
      error: 'text-red-400',
      warning: 'text-yellow-400',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
      accent: 'neon-green'
    },
    'neon-blue': {
      bg: 'bg-background-secondary',
      border: 'border-accent-blue/30',
      text: 'text-accent-blue',
      prompt: 'text-accent-blue',
      success: 'text-accent-green',
      error: 'text-accent-red',
      warning: 'text-accent-yellow',
      glow: 'shadow-[0_0_20px_rgba(0,112,243,0.3)]',
      accent: 'accent-blue'
    },
    'hacker-green': {
      bg: 'bg-black',
      border: 'border-green-400/30',
      text: 'text-green-400',
      prompt: 'text-green-400',
      success: 'text-green-300',
      error: 'text-red-400',
      warning: 'text-yellow-400',
      glow: 'shadow-[0_0_20px_rgba(74,222,128,0.3)]',
      accent: 'green-400'
    }
  }

  const currentTheme = themes[theme]

  // Auto focus input
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Auto scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [commands])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.target === inputRef.current) return
      
      // Focus input on any key press
      if (inputRef.current && !e.ctrlKey && !e.metaKey && !e.altKey) {
        inputRef.current.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const executeCommand = async (command: string) => {
    if (!command.trim()) return

    const newCommand: TerminalCommand = {
      id: Date.now().toString(),
      command: command.trim(),
      output: '',
      timestamp: new Date(),
      status: 'running'
    }

    setCommands(prev => [...prev, newCommand])
    setCommandHistory(prev => [command.trim(), ...prev.slice(0, 49)]) // Keep last 50
    setHistoryIndex(-1)
    setCurrentInput('')
    setIsRunning(true)

    const startTime = Date.now()

    try {
      let output = ''
      
      if (onCommand) {
        output = await onCommand(command.trim())
      } else {
        // Built-in commands
        output = await handleBuiltInCommand(command.trim())
      }

      const executionTime = Date.now() - startTime

      setCommands(prev => prev.map(cmd => 
        cmd.id === newCommand.id 
          ? { ...cmd, output, status: 'success' as const, executionTime }
          : cmd
      ))
    } catch (error) {
      const executionTime = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

      setCommands(prev => prev.map(cmd => 
        cmd.id === newCommand.id 
          ? { ...cmd, output: errorMessage, status: 'error' as const, executionTime }
          : cmd
      ))
    } finally {
      setIsRunning(false)
    }
  }

  const handleBuiltInCommand = async (command: string): Promise<string> => {
    const [cmd, ...args] = command.split(' ')
    
    switch (cmd.toLowerCase()) {
      case 'help':
        return `Available commands:
  help                 - Show this help message
  clear               - Clear terminal output
  echo <text>         - Echo text to output
  date                - Show current date and time
  whoami              - Show current user
  pwd                 - Print working directory
  ls                  - List directory contents
  version             - Show SuperClaude version
  theme <name>        - Change terminal theme
  generate <type>     - Generate code or commands
  analyze <target>    - Analyze code or project
  persona <name>      - Switch to AI persona
  
Use ⌘+K to open command palette
Use ↑/↓ arrows to navigate command history`

      case 'clear':
        setCommands([])
        return ''

      case 'echo':
        return args.join(' ')

      case 'date':
        return new Date().toLocaleString()

      case 'whoami':
        return 'developer@superclaude'

      case 'pwd':
        return '/Users/developer/superclaude-genie'

      case 'ls':
        return `total 42
drwxr-xr-x  12 developer  staff   384B  components/
drwxr-xr-x   8 developer  staff   256B  pages/
drwxr-xr-x   6 developer  staff   192B  lib/
drwxr-xr-x   4 developer  staff   128B  styles/
-rw-r--r--   1 developer  staff   2.1K  package.json
-rw-r--r--   1 developer  staff   1.5K  tailwind.config.js
-rw-r--r--   1 developer  staff   891B  README.md`

      case 'version':
        return 'SuperClaude Genie v2.0.1 - AI-Powered Development Suite'

      case 'theme':
        const themeName = args[0]
        if (themeName && themes[themeName as keyof typeof themes]) {
          return `Theme changed to: ${themeName}`
        }
        return `Available themes: ${Object.keys(themes).join(', ')}`

      case 'generate':
        const type = args[0]
        return `🚀 Generating ${type || 'code'}...
✨ AI analysis complete
📝 Code structure optimized
🎯 Best practices applied
✅ Generated successfully!

Use 'analyze' to review the generated code.`

      case 'analyze':
        const target = args[0] || 'current project'
        return `🔍 Analyzing ${target}...
📊 Performance: Excellent (98/100)
🔒 Security: Strong (95/100)
🎨 Code Quality: Very Good (92/100)
📦 Bundle Size: Optimized (1.2MB)
⚡ Load Time: Fast (0.8s)

✅ Analysis complete! No critical issues found.`

      case 'persona':
        const persona = args[0] || 'architect'
        return `🎭 Switching to ${persona} persona...
🧠 Loading specialized knowledge base...
⚙️ Configuring optimal settings...
✅ ${persona.charAt(0).toUpperCase() + persona.slice(1)} persona activated!

Type 'help' to see persona-specific commands.`

      default:
        return `Command not found: ${cmd}
Type 'help' for available commands.`
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isRunning) {
      executeCommand(currentInput)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Basic autocomplete
      const suggestions = ['help', 'clear', 'generate', 'analyze', 'persona', 'theme']
      const matches = suggestions.filter(cmd => cmd.startsWith(currentInput.toLowerCase()))
      if (matches.length === 1) {
        setCurrentInput(matches[0])
      }
    }
  }

  const clearTerminal = () => {
    setCommands([])
  }

  const copyOutput = () => {
    const output = commands.map(cmd => `$ ${cmd.command}\n${cmd.output}`).join('\n\n')
    navigator.clipboard.writeText(output)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  return (
    <motion.div
      className={`terminal-container relative ${currentTheme.bg} border ${currentTheme.border} rounded-lg overflow-hidden ${currentTheme.glow} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Header */}
      {showHeader && (
        <div className={`flex items-center justify-between bg-background-tertiary border-b ${currentTheme.border} px-4 py-2`}>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="flex items-center space-x-2">
              <Terminal className={`w-4 h-4 ${currentTheme.text}`} />
              <span className={`text-sm font-medium ${currentTheme.text}`}>{title}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={clearTerminal}
              className={`p-1.5 hover:bg-${currentTheme.accent}/10 rounded text-text-muted hover:${currentTheme.text} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Clear terminal"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              onClick={copyOutput}
              className={`p-1.5 hover:bg-${currentTheme.accent}/10 rounded text-text-muted hover:${currentTheme.text} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Copy output"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-1.5 hover:bg-${currentTheme.accent}/10 rounded text-text-muted hover:${currentTheme.text} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      )}

      {/* Terminal Content */}
      <div 
        ref={outputRef}
        className="h-full overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
      >
        {/* Welcome message */}
        {commands.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`${currentTheme.text} mb-4`}
          >
            <div className="mb-2">Welcome to SuperClaude Genie Terminal v2.0.1</div>
            <div className="text-text-muted mb-4">Type 'help' for available commands</div>
          </motion.div>
        )}

        {/* Command History */}
        <AnimatePresence>
          {commands.map((cmd, index) => (
            <motion.div
              key={cmd.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {/* Command Input */}
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-text-muted text-xs">{formatTime(cmd.timestamp)}</span>
                <span className={currentTheme.prompt}>developer@superclaude</span>
                <span className="text-text-muted">:</span>
                <span className={currentTheme.text}>{prompt}</span>
                <span className={currentTheme.prompt}>$</span>
                <span className={currentTheme.text}>{cmd.command}</span>
                {cmd.status === 'running' && (
                  <div className={`w-2 h-2 bg-${currentTheme.accent} rounded-full animate-pulse`} />
                )}
              </div>
              
              {/* Command Output */}
              {cmd.output && (
                <div className={`ml-4 whitespace-pre-wrap ${
                  cmd.status === 'error' ? currentTheme.error :
                  cmd.status === 'success' ? currentTheme.success :
                  currentTheme.text
                }`}>
                  {cmd.output}
                </div>
              )}
              
              {/* Execution time */}
              {cmd.executionTime && (
                <div className="ml-4 text-xs text-text-muted mt-1">
                  Executed in {cmd.executionTime}ms
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input */}
        <div className="flex items-center space-x-2">
          <span className={currentTheme.prompt}>developer@superclaude</span>
          <span className="text-text-muted">:</span>
          <span className={currentTheme.text}>{prompt}</span>
          <span className={currentTheme.prompt}>$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isRunning}
              className={`w-full bg-transparent ${currentTheme.text} outline-none font-mono placeholder-text-muted disabled:opacity-50`}
              placeholder={isRunning ? 'Running command...' : 'Type a command...'}
              autoComplete="off"
              spellCheck={false}
            />
            {/* Cursor */}
            <motion.div
              className={`absolute top-0 w-2 h-5 bg-${currentTheme.accent}`}
              style={{ left: `${currentInput.length * 0.6}em` }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* Glowing border effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r from-${currentTheme.accent}/20 via-transparent to-${currentTheme.accent}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
    </motion.div>
  )
}