'use client'

import { useState } from 'react'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder = 'Search...' }: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-12 bg-bg-light border-2 border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-light border border-bg-card rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
          <div className="p-4">
            <div className="text-text-muted text-sm mb-2">Quick suggestions:</div>
            <div className="space-y-1">
              <div className="px-3 py-2 hover:bg-bg-card rounded cursor-pointer text-text-secondary">
                React performance optimization
              </div>
              <div className="px-3 py-2 hover:bg-bg-card rounded cursor-pointer text-text-secondary">
                Next.js deployment
              </div>
              <div className="px-3 py-2 hover:bg-bg-card rounded cursor-pointer text-text-secondary">
                API security audit
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}