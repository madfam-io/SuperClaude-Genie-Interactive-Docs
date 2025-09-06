'use client'

import { useState, useRef, useEffect, ReactNode, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { 
  Sidebar, 
  PanelLeft as Panel, 
  Terminal, 
  Code, 
  FileText, 
  Settings,
  Maximize2,
  Minimize2,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Grip,
  X,
  Plus,
  MoreHorizontal
} from 'lucide-react'

interface PanelConfig {
  id: string
  title: string
  icon: ReactNode
  content: ReactNode
  defaultSize: number
  minSize: number
  maxSize: number
  closable?: boolean
  resizable?: boolean
}

interface DevToolsLayoutProps {
  children?: ReactNode
  theme?: 'cyberpunk' | 'minimal' | 'neon'
  initialLayout?: LayoutPreset
  onLayoutChange?: (layout: LayoutState) => void
}

type LayoutPreset = 'ide' | 'focus' | 'terminal' | 'mobile' | 'custom'

interface LayoutState {
  leftPanel: { visible: boolean; width: number }
  rightPanel: { visible: boolean; width: number }
  bottomPanel: { visible: boolean; height: number }
  topPanel: { visible: boolean; height: number }
  preset: LayoutPreset
}

export default function DevToolsLayout({
  children,
  theme = 'cyberpunk',
  initialLayout = 'ide',
  onLayoutChange
}: DevToolsLayoutProps) {
  const [layout, setLayout] = useState<LayoutState>({
    leftPanel: { visible: true, width: 300 },
    rightPanel: { visible: false, width: 250 },
    bottomPanel: { visible: true, height: 200 },
    topPanel: { visible: false, height: 100 },
    preset: initialLayout
  })

  const [isDragging, setIsDragging] = useState(false)
  const [dragTarget, setDragTarget] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('terminal')
  const [responsiveMode, setResponsiveMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const containerRef = useRef<HTMLDivElement>(null)

  // Theme configurations
  const themes = {
    cyberpunk: {
      bg: 'bg-black',
      panel: 'bg-background-secondary',
      border: 'border-neon-blue/30',
      text: 'text-neon-blue',
      secondary: 'text-neon-purple',
      muted: 'text-gray-400',
      accent: 'neon-blue',
      glow: 'shadow-[0_0_20px_rgba(0,212,255,0.2)]',
      handle: 'bg-neon-blue/20 hover:bg-neon-blue/40',
      tab: 'hover:bg-neon-blue/10',
      activeTab: 'bg-neon-blue/20 border-neon-blue/50'
    },
    minimal: {
      bg: 'bg-background',
      panel: 'bg-background-secondary',
      border: 'border-border',
      text: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      accent: 'accent-blue',
      glow: 'shadow-elegant',
      handle: 'bg-border hover:bg-accent-blue/20',
      tab: 'hover:bg-background-tertiary',
      activeTab: 'bg-accent-blue/10 border-accent-blue/30'
    },
    neon: {
      bg: 'bg-black',
      panel: 'bg-background-secondary',
      border: 'border-neon-purple/30',
      text: 'text-neon-purple',
      secondary: 'text-neon-orange',
      muted: 'text-gray-400',
      accent: 'neon-purple',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
      handle: 'bg-neon-purple/20 hover:bg-neon-purple/40',
      tab: 'hover:bg-neon-purple/10',
      activeTab: 'bg-neon-purple/20 border-neon-purple/50'
    }
  }

  const currentTheme = themes[theme]

  // Sample panels configuration
  const panels: Record<string, PanelConfig> = {
    explorer: {
      id: 'explorer',
      title: 'Explorer',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className={`p-4 ${currentTheme.text}`}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-background-tertiary cursor-pointer">
              <span>📁</span>
              <span>src/</span>
            </div>
            <div className="flex items-center space-x-2 p-2 ml-4 rounded hover:bg-background-tertiary cursor-pointer">
              <span>📄</span>
              <span>App.tsx</span>
            </div>
            <div className="flex items-center space-x-2 p-2 ml-4 rounded hover:bg-background-tertiary cursor-pointer">
              <span>📄</span>
              <span>index.ts</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-background-tertiary cursor-pointer">
              <span>📁</span>
              <span>components/</span>
            </div>
          </div>
        </div>
      ),
      defaultSize: 300,
      minSize: 200,
      maxSize: 500,
      closable: true,
      resizable: true
    },
    terminal: {
      id: 'terminal',
      title: 'Terminal',
      icon: <Terminal className="w-4 h-4" />,
      content: (
        <div className={`p-4 ${currentTheme.panel} h-full font-mono text-sm`}>
          <div className={`${currentTheme.text} mb-2`}>
            developer@superclaude:~/project$ npm run dev
          </div>
          <div className={`${currentTheme.secondary} mb-1`}>
            Starting development server...
          </div>
          <div className={`${currentTheme.secondary} mb-1`}>
            ✓ Compiled successfully
          </div>
          <div className={`${currentTheme.text}`}>
            developer@superclaude:~/project$ _
          </div>
        </div>
      ),
      defaultSize: 200,
      minSize: 150,
      maxSize: 400,
      closable: true,
      resizable: true
    },
    output: {
      id: 'output',
      title: 'Output',
      icon: <Code className="w-4 h-4" />,
      content: (
        <div className={`p-4 ${currentTheme.text} font-mono text-sm`}>
          <div className="space-y-1">
            <div>[INFO] Build started...</div>
            <div>[SUCCESS] Compilation successful</div>
            <div>[INFO] Server running on http://localhost:3000</div>
          </div>
        </div>
      ),
      defaultSize: 200,
      minSize: 150,
      maxSize: 400,
      closable: true,
      resizable: true
    },
    problems: {
      id: 'problems',
      title: 'Problems',
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className={`p-4 ${currentTheme.text}`}>
          <div className="text-center text-text-muted">
            No problems detected
          </div>
        </div>
      ),
      defaultSize: 200,
      minSize: 150,
      maxSize: 400,
      closable: true,
      resizable: true
    }
  }

  // Layout presets
  const presets: Record<LayoutPreset, Partial<LayoutState>> = {
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
    },
    custom: layout
  }

  const applyPreset = useCallback((preset: LayoutPreset) => {
    const newLayout = { ...layout, ...presets[preset], preset }
    setLayout(newLayout)
    onLayoutChange?.(newLayout)
  }, [layout, presets, onLayoutChange])

  // Responsive breakpoints
  useEffect(() => {
    const updateResponsiveMode = () => {
      const width = window.innerWidth
      if (width < 768) {
        setResponsiveMode('mobile')
        applyPreset('mobile')
      } else if (width < 1024) {
        setResponsiveMode('tablet')
      } else {
        setResponsiveMode('desktop')
      }
    }

    updateResponsiveMode()
    window.addEventListener('resize', updateResponsiveMode)
    return () => window.removeEventListener('resize', updateResponsiveMode)
  }, [applyPreset])

  const togglePanel = (panel: keyof Omit<LayoutState, 'preset'>) => {
    const newLayout = {
      ...layout,
      [panel]: {
        ...layout[panel],
        visible: !layout[panel].visible
      }
    }
    setLayout(newLayout)
    onLayoutChange?.(newLayout)
  }

  const handleDrag = (panel: keyof Omit<LayoutState, 'preset'>, delta: number) => {
    const newLayout = { ...layout }
    
    if (panel === 'leftPanel' || panel === 'rightPanel') {
      const newWidth = Math.max(200, Math.min(600, layout[panel].width + delta))
      newLayout[panel] = { ...layout[panel], width: newWidth }
    } else {
      const newHeight = Math.max(150, Math.min(500, layout[panel].height + delta))
      newLayout[panel] = { ...layout[panel], height: newHeight }
    }

    setLayout(newLayout)
    onLayoutChange?.(newLayout)
  }

  const bottomTabs = ['terminal', 'output', 'problems']

  return (
    <div 
      ref={containerRef}
      className={`h-screen ${currentTheme.bg} flex flex-col overflow-hidden`}
    >
      {/* Top Bar */}
      <div className={`flex items-center justify-between ${currentTheme.panel} border-b ${currentTheme.border} px-4 py-2`}>
        <div className="flex items-center space-x-4">
          <h1 className={`text-lg font-semibold ${currentTheme.text}`}>
            SuperClaude Dev Tools
          </h1>
          
          {/* Layout Presets */}
          <div className="flex items-center space-x-2">
            {(['ide', 'focus', 'terminal'] as LayoutPreset[]).map(preset => (
              <motion.button
                key={preset}
                onClick={() => applyPreset(preset)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  layout.preset === preset 
                    ? `${currentTheme.activeTab} ${currentTheme.text}` 
                    : `${currentTheme.tab} ${currentTheme.muted}`
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Responsive Mode Indicators */}
          <div className="flex items-center space-x-1">
            {[
              { mode: 'desktop', icon: <Monitor className="w-4 h-4" /> },
              { mode: 'tablet', icon: <Tablet className="w-4 h-4" /> },
              { mode: 'mobile', icon: <Smartphone className="w-4 h-4" /> }
            ].map(({ mode, icon }) => (
              <button
                key={mode}
                onClick={() => setResponsiveMode(mode as any)}
                className={`p-2 rounded transition-colors ${
                  responsiveMode === mode 
                    ? `${currentTheme.activeTab} ${currentTheme.text}` 
                    : `${currentTheme.tab} ${currentTheme.muted}`
                }`}
                title={`${mode} view`}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Panel Toggles */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => togglePanel('leftPanel')}
              className={`p-2 rounded transition-colors ${layout.leftPanel.visible ? currentTheme.activeTab : currentTheme.tab} ${currentTheme.muted}`}
              title="Toggle sidebar"
            >
              <Sidebar className="w-4 h-4" />
            </button>
            <button
              onClick={() => togglePanel('bottomPanel')}
              className={`p-2 rounded transition-colors ${layout.bottomPanel.visible ? currentTheme.activeTab : currentTheme.tab} ${currentTheme.muted}`}
              title="Toggle bottom panel"
            >
              <Panel className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2 rounded transition-colors ${currentTheme.tab} ${currentTheme.muted}`}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <AnimatePresence>
          {layout.leftPanel.visible && (
            <motion.div
              className={`${currentTheme.panel} border-r ${currentTheme.border} flex flex-col`}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: layout.leftPanel.width, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Left Panel Header */}
              <div className={`flex items-center justify-between border-b ${currentTheme.border} px-4 py-2`}>
                <span className={`text-sm font-medium ${currentTheme.text}`}>
                  {panels.explorer.title}
                </span>
                <button
                  onClick={() => togglePanel('leftPanel')}
                  className={`p-1 rounded hover:bg-background-tertiary ${currentTheme.muted}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Left Panel Content */}
              <div className="flex-1 overflow-auto">
                {panels.explorer.content}
              </div>

              {/* Resize Handle */}
              <motion.div
                className={`absolute right-0 top-0 bottom-0 w-1 ${currentTheme.handle} cursor-col-resize`}
                drag="x"
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onDrag={(_, info: PanInfo) => handleDrag('leftPanel', info.delta.x)}
                whileHover={{ backgroundColor: 'rgba(0, 212, 255, 0.5)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Editor Area */}
          <div className="flex-1 overflow-hidden">
            {children || (
              <div className={`h-full flex items-center justify-center ${currentTheme.text}`}>
                <div className="text-center">
                  <Code className={`w-16 h-16 mx-auto mb-4 ${currentTheme.secondary}`} />
                  <h2 className="text-2xl font-bold mb-2">Welcome to SuperClaude Dev Tools</h2>
                  <p className={`${currentTheme.muted}`}>
                    Your intelligent development environment
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel */}
          <AnimatePresence>
            {layout.bottomPanel.visible && (
              <motion.div
                className={`${currentTheme.panel} border-t ${currentTheme.border} flex flex-col`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: layout.bottomPanel.height, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Bottom Panel Tabs */}
                <div className={`flex items-center border-b ${currentTheme.border}`}>
                  {bottomTabs.map(tabId => {
                    const panel = panels[tabId]
                    const isActive = activeTab === tabId
                    return (
                      <button
                        key={tabId}
                        onClick={() => setActiveTab(tabId)}
                        className={`flex items-center space-x-2 px-4 py-2 border-r ${currentTheme.border} transition-colors ${
                          isActive 
                            ? `${currentTheme.activeTab} ${currentTheme.text}` 
                            : `${currentTheme.tab} ${currentTheme.muted}`
                        }`}
                      >
                        {panel.icon}
                        <span className="text-sm font-medium">{panel.title}</span>
                      </button>
                    )
                  })}
                  
                  <div className="flex-1" />
                  
                  <button
                    onClick={() => togglePanel('bottomPanel')}
                    className={`p-2 ${currentTheme.tab} ${currentTheme.muted}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Panel Content */}
                <div className="flex-1 overflow-auto">
                  {panels[activeTab]?.content}
                </div>

                {/* Resize Handle */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 ${currentTheme.handle} cursor-row-resize`}
                  drag="y"
                  dragMomentum={false}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  onDrag={(_, info: PanInfo) => handleDrag('bottomPanel', -info.delta.y)}
                  whileHover={{ backgroundColor: 'rgba(0, 212, 255, 0.5)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel */}
        <AnimatePresence>
          {layout.rightPanel.visible && (
            <motion.div
              className={`${currentTheme.panel} border-l ${currentTheme.border} flex flex-col`}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: layout.rightPanel.width, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`p-4 ${currentTheme.text}`}>
                Right Panel Content
              </div>

              {/* Resize Handle */}
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-1 ${currentTheme.handle} cursor-col-resize`}
                drag="x"
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onDrag={(_, info: PanInfo) => handleDrag('rightPanel', -info.delta.x)}
                whileHover={{ backgroundColor: 'rgba(0, 212, 255, 0.5)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drag Overlay */}
      {isDragging && (
        <div className="fixed inset-0 pointer-events-none bg-neon-blue/5 backdrop-blur-sm z-50" />
      )}
    </div>
  )
}