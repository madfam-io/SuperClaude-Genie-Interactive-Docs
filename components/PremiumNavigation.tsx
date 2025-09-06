'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function PremiumNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navItems = [
    { href: '#hero', label: 'Home', icon: '🏠' },
    { href: '#getting-started', label: 'Start', icon: '🚀' },
    { href: '#commands', label: 'Commands', icon: '⚡' },
    { href: '#personas', label: 'Personas', icon: '🎭' },
    { href: '#workflows', label: 'Workflows', icon: '🔄' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section
      const sections = navItems.map(item => item.href.substring(1))
      let current = ''
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section
            break
          }
        }
      }
      
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'glass-premium backdrop-blur-2xl border-b border-white/10 shadow-elegant' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('#hero')}
            >
              <motion.span 
                className="text-3xl group-hover:scale-110 transition-transform duration-300"
                animate={{ 
                  rotateY: [0, 10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🧞
              </motion.span>
              <div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-cyber-primary bg-clip-text text-transparent">
                  SuperClaude
                </span>
                <span className="text-xl lg:text-2xl font-bold text-text-primary ml-1">
                  Genie
                </span>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    activeSection === item.href.substring(1)
                      ? 'text-cyber-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm">{item.icon}</span>
                    <span className="hidden lg:inline">{item.label}</span>
                  </span>
                  
                  {/* Active indicator */}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      className="absolute inset-0 glass-cyber rounded-xl border border-cyber-cyan/30"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={() => handleNavClick('#genie-interface')}
                className="glass-premium px-6 py-2.5 rounded-xl border border-white/10 hover:border-cyber-cyan/30 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 font-medium text-text-primary group-hover:text-cyber-cyan transition-colors">
                  Try Demo
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-cyber-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
              </motion.button>
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass-premium border border-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-6">
                <motion.span
                  className="absolute w-6 h-0.5 bg-text-primary rounded-full"
                  style={{ top: '6px' }}
                  animate={isMenuOpen ? { rotate: 45, top: '11px' } : { rotate: 0, top: '6px' }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-text-primary rounded-full top-3"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-text-primary rounded-full"
                  style={{ bottom: '6px' }}
                  animate={isMenuOpen ? { rotate: -45, bottom: '11px' } : { rotate: 0, bottom: '6px' }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background-dark/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="relative glass-premium border-r border-white/10 w-80 h-full p-6"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4
              }}
            >
              {/* Menu Header */}
              <div className="flex items-center space-x-3 mb-8 pt-16">
                <span className="text-3xl">🧞</span>
                <div>
                  <span className="text-xl font-bold bg-gradient-cyber-primary bg-clip-text text-transparent">
                    SuperClaude
                  </span>
                  <span className="text-xl font-bold text-text-primary ml-1">
                    Genie
                  </span>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                      activeSection === item.href.substring(1)
                        ? 'glass-cyber text-cyber-cyan border border-cyber-cyan/30'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <motion.button
                onClick={() => handleNavClick('#genie-interface')}
                className="w-full mt-8 glass-premium px-6 py-4 rounded-xl border border-white/10 hover:border-cyber-cyan/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium text-text-primary group-hover:text-cyber-cyan transition-colors">
                  Try Demo ✨
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}