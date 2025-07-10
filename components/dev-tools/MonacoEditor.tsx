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

// Monaco Editor dynamic import with error handling
const Editor = dynamic(
  () => import('@monaco-editor/react').catch(() => {
    // Fallback component if Monaco Editor fails to load
    return Promise.resolve({ 
      default: () => (
        <div className="h-full bg-background-secondary rounded-lg border border-neon-blue/20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">⚠️</div>
            <div className="text-text-primary text-lg">Monaco Editor Unavailable</div>
            <div className="text-text-secondary text-sm">Advanced code editor features are temporarily disabled</div>
          </div>
        </div>
      )
    })
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full bg-background-secondary rounded-lg border border-neon-blue/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-text-secondary text-sm">Loading Monaco Editor...</div>
        </div>
      </div>
    )
  }
)

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

// Cyberpunk Monaco themes
const cyberpunkThemes = {
  'cyberpunk-dark': {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '#6a9955', fontStyle: 'italic' },
      { token: 'keyword', foreground: '#00d4ff', fontStyle: 'bold' },
      { token: 'string', foreground: '#22c55e' },
      { token: 'number', foreground: '#ff8c00' },
      { token: 'type', foreground: '#a855f7' },
      { token: 'function', foreground: '#f472b6' },
      { token: 'variable', foreground: '#ffffff' },
      { token: 'operator', foreground: '#00d4ff' },
      { token: 'delimiter', foreground: '#ffffff' },
    ],
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#ffffff',
      'editor.lineHighlightBackground': '#00d4ff0a',
      'editor.selectionBackground': '#00d4ff33',
      'editor.inactiveSelectionBackground': '#00d4ff1a',
      'editorCursor.foreground': '#00d4ff',
      'editorWhitespace.foreground': '#404040',
      'editorLineNumber.foreground': '#707070',
      'editorLineNumber.activeForeground': '#00d4ff',
      'editor.border': '#262626',
      'scrollbar.shadow': '#000000',
      'scrollbarSlider.background': '#404040',
      'scrollbarSlider.hoverBackground': '#525252',
      'scrollbarSlider.activeBackground': '#00d4ff',
    }
  },
  'neon-minimal': {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '#a1a1a1', fontStyle: 'italic' },
      { token: 'keyword', foreground: '#a855f7', fontStyle: 'bold' },
      { token: 'string', foreground: '#10b981' },
      { token: 'number', foreground: '#f59e0b' },
      { token: 'type', foreground: '#0070f3' },
      { token: 'function', foreground: '#7c3aed' },
      { token: 'variable', foreground: '#ffffff' },
    ],
    colors: {
      'editor.background': '#0a0a0a',
      'editor.foreground': '#ffffff',
      'editor.lineHighlightBackground': '#a855f70a',
      'editor.selectionBackground': '#a855f733',
      'editorCursor.foreground': '#a855f7',
      'editorLineNumber.foreground': '#707070',
      'editorLineNumber.activeForeground': '#a855f7',
    }
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

  // Monaco editor setup
  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    editorRef.current = editor
    setMonaco(monacoInstance)
    
    // Define custom cyberpunk themes
    Object.entries(cyberpunkThemes).forEach(([themeName, themeData]) => {
      monacoInstance.editor.defineTheme(themeName, themeData)
    })
    
    // Set theme
    monacoInstance.editor.setTheme(theme)
    
    // Custom keyboard shortcuts
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      if (onRun) {
        handleRunCode()
      }
    })
    
    // Auto-completion and IntelliSense enhancements
    monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monacoInstance.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monacoInstance.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monacoInstance.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    })
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
            readOnly,
            minimap: { enabled: minimap },
            lineNumbers: lineNumbers ? 'on' : 'off',
            wordWrap: wordWrap ? 'on' : 'off',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontLigatures: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            suggest: {
              showIcons: true,
              showSnippets: true,
              showWords: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showIssues: true,
              showUsers: true,
              showValues: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            tabCompletion: 'on',
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: 'on',
            accessibilitySupport: 'auto',
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