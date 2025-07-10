'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNotification } from '../NotificationProvider'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  copyButton?: boolean
  className?: string
}

export function CodeBlock({ code, language = 'text', title, copyButton = true, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { showNotification } = useNotification()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      showNotification('Code copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      showNotification('Failed to copy code', 'error')
    }
  }

  const languageColors: Record<string, string> = {
    javascript: 'bg-yellow-500/20 text-yellow-300',
    typescript: 'bg-blue-500/20 text-blue-300',
    python: 'bg-green-500/20 text-green-300',
    bash: 'bg-gray-500/20 text-gray-300',
    json: 'bg-purple-500/20 text-purple-300',
    css: 'bg-pink-500/20 text-pink-300',
    html: 'bg-orange-500/20 text-orange-300',
  }

  return (
    <motion.div 
      className={`bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-800 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <div className="flex justify-between items-center px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-gray-100 font-medium">{title}</span>
            {language && (
              <span className={`text-xs px-2 py-1 rounded-full font-mono ${languageColors[language] || 'bg-gray-500/20 text-gray-300'}`}>
                {language}
              </span>
            )}
          </div>
          {copyButton && (
            <motion.button
              onClick={handleCopy}
              className="text-gray-400 hover:text-gray-200 transition-colors duration-200 flex items-center space-x-2 px-3 py-1 rounded-lg hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: copied ? 360 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {copied ? '✅' : '📋'}
              </motion.div>
              <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </motion.button>
          )}
        </div>
      )}
      <div className="relative group">
        <pre className="p-4 overflow-x-auto text-sm bg-gray-900 dark:bg-gray-950">
          <code className={`language-${language} text-gray-100 font-mono leading-relaxed`}>
            {code}
          </code>
        </pre>
        {copyButton && !title && (
          <motion.button
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 border border-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <motion.div
              className="flex items-center gap-2"
              animate={{ 
                scale: copied ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {copied ? '✅' : '📋'}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </motion.div>
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}