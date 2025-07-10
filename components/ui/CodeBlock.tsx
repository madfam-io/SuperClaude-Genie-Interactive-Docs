'use client'

import { useState } from 'react'
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

  return (
    <div className={`bg-bg-dark rounded-lg overflow-hidden border border-white/10 ${className}`}>
      {title && (
        <div className="flex justify-between items-center px-4 py-2 bg-bg-card border-b border-white/10">
          <span className="text-text-primary font-medium">{title}</span>
          {copyButton && (
            <button
              onClick={handleCopy}
              className="text-text-muted hover:text-primary transition-colors duration-200 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm">
          <code className={`language-${language} text-text-primary`}>
            {code}
          </code>
        </pre>
        {copyButton && !title && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-bg-card hover:bg-primary text-text-secondary hover:text-white px-2 py-1 rounded text-xs transition-colors duration-200"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  )
}