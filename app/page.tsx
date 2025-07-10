'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import ModernNavigation from '@/components/ModernNavigation'
import ModernDashboard from '@/components/ModernDashboard'
import { NotificationProvider } from '@/components/NotificationProvider'

// Lazy load the 3D Hero for better performance
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-6xl font-bold text-text-primary mb-4">
          SuperClaude
        </div>
        <div className="text-text-secondary">Loading 3D Experience...</div>
      </div>
    </div>
  )
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  return (
    <NotificationProvider>
      <div className="relative min-h-screen bg-background text-text-primary overflow-x-hidden">
        {/* Navigation */}
        <ModernNavigation onSearchToggle={setSearchOpen} />
        
        {/* Hero Section with 3D */}
        <Hero3D />

        {/* Modern Dashboard */}
        <ModernDashboard />

        {/* Features Section */}
        <section className="py-24 relative" id="features">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-text-primary">Built for </span>
                <span className="text-accent-purple">Modern Developers</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Experience the future of development with AI-powered tools, 
                intuitive interfaces, and lightning-fast performance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'GPU-optimized animations and 60fps interactions for a smooth experience.'
                },
                {
                  icon: '🎯',
                  title: 'Precision AI',
                  description: 'Context-aware AI that understands your project and generates perfect commands.'
                },
                {
                  icon: '🔧',
                  title: 'Developer First',
                  description: 'Built by developers for developers with modern tooling and best practices.'
                },
                {
                  icon: '🌐',
                  title: 'Universal',
                  description: 'Works with any tech stack, framework, or development environment.'
                },
                {
                  icon: '🔒',
                  title: 'Secure',
                  description: 'Enterprise-grade security with local processing and privacy protection.'
                },
                {
                  icon: '📱',
                  title: 'Mobile Ready',
                  description: 'Responsive design with gesture-based interactions for mobile development.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="card-modern p-6 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="text-text-primary font-semibold">SuperClaude Genie</span>
              </div>
              
              <div className="flex items-center space-x-6 text-text-muted">
                <span>© 2024 SuperClaude. All rights reserved.</span>
                <span>•</span>
                <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
                <span>•</span>
                <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-orange z-50"
          style={{ transformOrigin: '0%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </div>
    </NotificationProvider>
  )
}