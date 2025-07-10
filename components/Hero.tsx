'use client'

import { useState } from 'react'
import { SearchBox } from './SearchBox'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="text-center py-16 relative" id="hero">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient animate-glow">
          🧞 SuperClaude Genie
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-8">
          Transform your AI into a SuperClaude command generator wizard
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={() => scrollToSection('getting-started')}
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollToSection('genie-interface')}
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Try Demo
          </button>
        </div>
        
        <SearchBox 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search commands, personas, or workflows..."
        />
      </div>
    </section>
  )
}