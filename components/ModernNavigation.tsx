'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Command, ArrowRight } from 'lucide-react'

interface NavigationProps {
  onSearchToggle?: (open: boolean) => void
}

export default function ModernNavigation({ onSearchToggle }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'dashboard', label: 'Dashboard', href: '#dashboard' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'personas', label: 'Personas', href: '#personas' },
    { id: 'docs', label: 'Docs', href: '#docs' },
  ]
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Handle search keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleSearch()
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
        onSearchToggle?.(false)
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])
  
  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])
  
  const toggleSearch = () => {
    const newState = !searchOpen
    setSearchOpen(newState)
    onSearchToggle?.(newState)
  }
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }
  
  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'raycast-blur border-b border-border/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="text-text-primary font-semibold text-lg">
                SuperClaude
              </span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === item.id
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-blue"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                onClick={toggleSearch}
                className="flex items-center space-x-2 glass-light px-3 py-2 rounded-lg hover:glass-medium transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-4 h-4 text-text-muted" />
                <span className="hidden sm:block text-sm text-text-muted">
                  Search
                </span>
                <div className="hidden sm:flex items-center space-x-1 text-xs text-text-disabled">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </motion.button>
              
              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background-overlay"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-16 left-0 right-0 mx-6 raycast-blur border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-background-tertiary transition-colors text-left"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-text-primary font-medium">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-muted" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background-overlay"
              onClick={() => {
                setSearchOpen(false)
                onSearchToggle?.(false)
              }}
            />
            
            {/* Search Modal */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto px-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="raycast-blur border border-border rounded-2xl p-6">
                {/* Search Input */}
                <div className="flex items-center space-x-4 mb-6">
                  <Search className="w-5 h-5 text-text-muted" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search commands, docs, or features..."
                    className="flex-1 bg-transparent text-text-primary placeholder-text-muted outline-none text-lg"
                  />
                  <div className="flex items-center space-x-1 text-xs text-text-disabled">
                    <span>ESC</span>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-2">
                  <div className="text-xs text-text-muted font-medium mb-3">Quick Actions</div>
                  {[
                    { label: 'Generate Commands', icon: '⚡', action: () => scrollToSection('#dashboard') },
                    { label: 'View Personas', icon: '🎭', action: () => scrollToSection('#personas') },
                    { label: 'Browse Features', icon: '🔍', action: () => scrollToSection('#features') },
                    { label: 'Read Documentation', icon: '📖', action: () => scrollToSection('#docs') },
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        item.action()
                        setSearchOpen(false)
                        onSearchToggle?.(false)
                      }}
                      className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-background-tertiary transition-colors text-left"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-text-primary">{item.label}</span>
                      <div className="flex-1" />
                      <ArrowRight className="w-4 h-4 text-text-muted" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}