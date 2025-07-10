'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Command {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  syntax: string
  examples: string[]
}

const COMMANDS: Command[] = [
  {
    id: 'improve',
    name: '/improve',
    description: 'Evidence-based enhancement and optimization',
    category: 'Core',
    tags: ['quality', 'performance', 'optimization'],
    syntax: '/improve [flags] [target]',
    examples: ['/improve --quality', '/improve --perf --iterate', '/improve --arch --think-hard']
  },
  {
    id: 'mcp',
    name: '/mcp',
    description: 'Model Context Protocol operations',
    category: 'Core',
    tags: ['protocol', 'context', 'integration'],
    syntax: '/mcp [operation] [args]',
    examples: ['/mcp status', '/mcp connect server', '/mcp list resources']
  },
  {
    id: 'think',
    name: '/think',
    description: 'Deep thinking and analysis mode',
    category: 'Thinking',
    tags: ['analysis', 'reasoning', 'planning'],
    syntax: '/think [--deep] [--structured]',
    examples: ['/think --deep', '/think --structured --plan']
  },
  {
    id: 'code',
    name: '/code',
    description: 'Advanced code generation and optimization',
    category: 'Development',
    tags: ['coding', 'generation', 'refactor'],
    syntax: '/code [language] [task]',
    examples: ['/code typescript component', '/code python optimize']
  }
]

interface CommandSearchProps {
  isOpen: boolean
  onClose: () => void
  onCommandSelect: (command: Command) => void
}

export function CommandSearch({ isOpen, onClose, onCommandSelect }: CommandSearchProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filteredCommands, setFilteredCommands] = useState<Command[]>(COMMANDS)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setFilteredCommands(COMMANDS)
      setSelectedIndex(0)
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = COMMANDS.filter(cmd => 
      cmd.name.toLowerCase().includes(searchTerm) ||
      cmd.description.toLowerCase().includes(searchTerm) ||
      cmd.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      cmd.category.toLowerCase().includes(searchTerm)
    ).sort((a, b) => {
      const aScore = getRelevanceScore(a, searchTerm)
      const bScore = getRelevanceScore(b, searchTerm)
      return bScore - aScore
    })

    setFilteredCommands(filtered)
    setSelectedIndex(0)
  }, [query])

  const getRelevanceScore = (command: Command, searchTerm: string): number => {
    let score = 0
    
    if (command.name.toLowerCase().startsWith(searchTerm)) score += 100
    if (command.name.toLowerCase().includes(searchTerm)) score += 50
    if (command.description.toLowerCase().includes(searchTerm)) score += 30
    if (command.tags.some(tag => tag.toLowerCase().includes(searchTerm))) score += 20
    if (command.category.toLowerCase().includes(searchTerm)) score += 10
    
    return score
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev === 0 ? filteredCommands.length - 1 : prev - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          onCommandSelect(filteredCommands[selectedIndex])
          onClose()
        }
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl mx-4"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search commands..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">🔍</div>
                <p>No commands found for "{query}"</p>
              </div>
            ) : (
              <div className="p-2">
                {filteredCommands.map((command, index) => (
                  <motion.div
                    key={command.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      onCommandSelect(command)
                      onClose()
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                            {command.name}
                          </code>
                          <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                            {command.category}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {command.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {command.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {index === selectedIndex && (
                        <motion.div
                          className="text-blue-500 ml-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          ⏎
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>⏎ Select</span>
                <span>Esc Close</span>
              </div>
              <span>{filteredCommands.length} results</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}