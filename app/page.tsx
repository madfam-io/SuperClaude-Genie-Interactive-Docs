'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { PremiumNavigation } from '@/components/PremiumNavigation'
import { PremiumHero } from '@/components/PremiumHero'
import { TabSection } from '@/components/TabSection'
import { EnhancedAnimatedBackground } from '@/components/EnhancedAnimatedBackground'
import { PremiumGenieInterface } from '@/components/PremiumGenieInterface'
import { PremiumPersonaDashboard } from '@/components/PremiumPersonaDashboard'
import { MagicUIStudio } from '@/components/MagicUIStudio'
import { AttachmentIntegration } from '@/components/AttachmentIntegration'
import { GlassmorphismShowcase } from '@/components/GlassmorphismShowcase'
import { Footer } from '@/components/Footer'
import { NotificationProvider } from '@/components/NotificationProvider'
import { ParallaxSection } from '@/components/ParallaxSection'
import { CommandSearch } from '@/components/CommandSearch'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  return (
    <SmoothScrollProvider>
      <NotificationProvider>
        <div className="relative min-h-screen bg-bg-dark text-text-primary overflow-x-hidden">
          {/* Enhanced Animated Background */}
          <EnhancedAnimatedBackground />

          {/* Cursor Follow Effect */}
          <motion.div
            className="fixed w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
            }}
            transition={{
              type: "spring" as const,
              stiffness: 500,
              damping: 28,
            }}
          />

          {/* Navigation */}
          <PremiumNavigation />
          
          {/* Hero Section */}
          <PremiumHero />

          {/* Content Sections with Parallax */}
          <ParallaxSection className="relative z-10" speed={0.5}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Tab Section */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TabSection />
              </motion.div>

              {/* Genie Interface */}
              <ParallaxSection className="py-20" speed={0.3} direction="up">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <PremiumGenieInterface />
                </motion.div>
              </ParallaxSection>

              {/* Enhanced Persona Dashboard */}
              <PremiumPersonaDashboard />

              {/* Magic UI Studio */}
              <ParallaxSection className="py-20" speed={0.4} direction="left">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <MagicUIStudio />
                </motion.div>
              </ParallaxSection>

              {/* Glassmorphism Showcase */}
              <ParallaxSection className="py-20" speed={0.5} direction="up">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <GlassmorphismShowcase />
                </motion.div>
              </ParallaxSection>

              {/* Attachment Integration */}
              <ParallaxSection className="py-20" speed={0.6} direction="right">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <AttachmentIntegration />
                </motion.div>
              </ParallaxSection>
            </div>
          </ParallaxSection>
          
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Footer />
          </motion.div>

          {/* Floating Action Elements */}
          <div className="fixed bottom-8 right-8 z-40">
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              {/* Command Search */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Search Commands (⌘K)"
              >
                🔍
              </motion.button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Magic Wand */}
              <motion.button
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.4)',
                    '0 0 40px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(168, 85, 247, 0.4)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => {
                  const sparkles = document.createElement('div')
                  sparkles.className = 'fixed inset-0 pointer-events-none z-50'
                  sparkles.innerHTML = Array.from({ length: 20 }).map(() => 
                    `<div class="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping" style="left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation-delay: ${Math.random() * 2}s;"></div>`
                  ).join('')
                  document.body.appendChild(sparkles)
                  setTimeout(() => document.body.removeChild(sparkles), 3000)
                }}
              >
                🪄
              </motion.button>
            </motion.div>
          </div>

          {/* Command Search Modal */}
          <CommandSearch 
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onCommandSelect={(command) => {
              console.log('Selected command:', command)
            }}
          />

          {/* Progress Indicator */}
          <motion.div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50"
            style={{
              transformOrigin: '0%',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </NotificationProvider>
    </SmoothScrollProvider>
  )
}