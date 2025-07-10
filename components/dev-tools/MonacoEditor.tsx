'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  Play, 
  Square, 
  Save, 
  Copy, 
  Download,
  Settings,
  Maximize2,
  Minimize2,
  Terminal,
  Code,
  FileText
} from 'lucide-react'

// Simple text editor component as fallback
interface SimpleEditorProps {
  language?: string
  theme?: string
  value?: string
  onChange?: (value: string | undefined) => void
  onMount?: (editor: any, monaco: any) => void
  options?: any
}

const SimpleEditor = ({ 
  value = '', 
  onChange, 
  language = 'typescript',
  options = {}
}: SimpleEditorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-4 py-2 bg-background-tertiary border-b border-neon-blue/10 text-sm text-text-muted">
        Simple Text Editor - {language.toUpperCase()}
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        className="flex-1 w-full p-4 bg-background-secondary text-text-primary font-mono text-sm resize-none border-none outline-none"
        placeholder={`Enter your ${language} code here...`}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          lineHeight: '1.5',
          tabSize: 2
        }}
        spellCheck={false}
      />
    </div>
  )
}

// Use simple editor as the main component for now
const Editor = SimpleEditor

interface MonacoEditorProps {
  language?: string
  theme?: 'cyberpunk-dark' | 'neon-minimal' | 'terminal-green' | 'matrix-code'
  value?: string
  onChange?: (value: string | undefined) => void
  onRun?: (code: string) => void
  readOnly?: boolean
  minimap?: boolean
  lineNumbers?: boolean
  wordWrap?: boolean
  className?: string
  height?: string | number
  showToolbar?: boolean
}

// Theme configurations for simple editor (visual styling only)
const editorThemes = {
  'cyberpunk-dark': {
    background: 'bg-black',
    text: 'text-neon-blue',
    accent: 'border-neon-blue/20'
  },
  'neon-minimal': {
    background: 'bg-background-secondary',
    text: 'text-neon-purple', 
    accent: 'border-neon-purple/20'
  },
  'terminal-green': {
    background: 'bg-black',
    text: 'text-neon-green',
    accent: 'border-neon-green/20'
  },
  'matrix-code': {
    background: 'bg-black',
    text: 'text-neon-green',
    accent: 'border-neon-green/20'
  }
}

export default function MonacoEditor({
  language = 'typescript',
  theme = 'cyberpunk-dark',
  value = '',
  onChange,
  onRun,
  readOnly = false,
  minimap = true,
  lineNumbers = true,
  wordWrap = true,
  className = '',
  height = 400,
  showToolbar = true
}: MonacoEditorProps) {
  const [editorValue, setEditorValue] = useState(value)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [monaco, setMonaco] = useState<any>(null)
  const editorRef = useRef<any>(null)

  // Simple editor setup (no Monaco-specific features)
  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    // Simple editor doesn't need Monaco setup
    editorRef.current = editor
    setMonaco(monacoInstance)
  }

  const handleEditorChange = (newValue: string | undefined) => {
    setEditorValue(newValue || '')
    onChange?.(newValue)
  }

  const handleRunCode = async () => {
    if (!onRun || !editorValue) return
    
    setIsRunning(true)
    try {
      await onRun(editorValue)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSave = () => {
    // Trigger save (could integrate with file system or local storage)
    console.log('Saving code:', editorValue)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([editorValue], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const languageIcons = {
    typescript: <Code className="w-4 h-4" />,
    javascript: <Code className="w-4 h-4" />,
    python: <Terminal className="w-4 h-4" />,
    json: <FileText className="w-4 h-4" />,
    html: <Code className="w-4 h-4" />,
    css: <Code className="w-4 h-4" />,
  }

  return (
    <motion.div
      className={`relative bg-background-secondary border border-neon-blue/20 rounded-lg overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between bg-background-tertiary border-b border-neon-blue/10 px-4 py-2">
          <div className="flex items-center space-x-4">
            {/* Language indicator */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded-lg">
              {languageIcons[language as keyof typeof languageIcons] || <Code className="w-4 h-4" />}
              <span className="text-sm text-text-primary font-mono uppercase">{language}</span>
            </div>
            
            {/* Theme indicator */}
            <div className="flex items-center space-x-2 text-text-muted">
              <div className={`w-3 h-3 rounded-full ${
                theme === 'cyberpunk-dark' ? 'bg-neon-blue' :
                theme === 'neon-minimal' ? 'bg-neon-purple' :
                'bg-neon-green'
              }`} />
              <span className="text-xs font-mono">{theme.replace('-', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Action buttons */}
            {onRun && (
              <motion.button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center space-x-2 px-3 py-1.5 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 rounded-lg text-neon-green transition-all duration-200 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isRunning ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {isRunning ? 'Running...' : 'Run'}
                </span>
                <kbd className="px-1.5 py-0.5 bg-background-secondary rounded text-xs">⌘↵</kbd>
              </motion.button>
            )}
            
            <div className="flex items-center space-x-1">
              <motion.button
                onClick={handleSave}
                className="p-2 hover:bg-neon-blue/10 rounded-lg text-text-muted hover:text-neon-blue transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Save (⌘S)"
              >
                <Save className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={handleCopy}
                className="p-2 hover:bg-neon-purple/10 rounded-lg text-text-muted hover:text-neon-purple transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={handleDownload}
                className="p-2 hover:bg-neon-orange/10 rounded-lg text-text-muted hover:text-neon-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </motion.button>
              
              <div className="w-px h-6 bg-border mx-2" />
              
              <motion.button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-text-muted/10 rounded-lg text-text-muted hover:text-text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      )}
      
      {/* Editor container */}
      <div className="relative h-full">
        <Editor
          language={language}
          theme={theme}
          value={editorValue}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly
          }}
        />
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-transparent to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-background-tertiary/80 backdrop-blur-sm border-t border-neon-blue/10 px-4 py-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4 text-text-muted">
              <span>Ln {1}, Col {1}</span>
              <span>UTF-8</span>
              <span>{language.toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-4 text-text-muted">
              <span>{editorValue.length} chars</span>
              <span>{editorValue.split('\n').length} lines</span>
              {isRunning && (
                <div className="flex items-center space-x-1 text-neon-green">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  <span>Running</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}