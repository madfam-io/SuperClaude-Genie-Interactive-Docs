'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassmorphicCard } from './ui/GlassmorphicCard'
import { MagicText } from './ui/MagicText'
import { MagicButton } from './ui/MagicButton'

export function GlassmorphismShowcase() {
  const [activeVariant, setActiveVariant] = useState<string>('default')

  const variants = [
    { id: 'default', name: 'Default Glass', description: 'Basic glassmorphism with blur' },
    { id: 'light', name: 'Light Glass', description: 'Enhanced saturation and brightness' },
    { id: 'dark', name: 'Dark Glass', description: 'Darker tint with reduced brightness' },
    { id: 'frosted', name: 'Frosted Glass', description: 'Heavy blur with noise texture' },
    { id: 'holographic', name: 'Holographic', description: 'Animated hue rotation effect' },
    { id: 'chromatic', name: 'Chromatic', description: 'RGB chromatic aberration' },
    { id: 'neumorphic', name: 'Neumorphic', description: 'Soft shadows and depth' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 glow-aurora opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 glass-holographic rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 glass-chromatic rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <MagicText variant="holographic" size="4xl" className="mb-6">
            Glassmorphism Showcase
          </MagicText>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience modern CSS glassmorphism effects with advanced animations and interactions
          </p>
        </motion.div>

        {/* Variant Selector */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {variants.map((variant) => (
            <MagicButton
              key={variant.id}
              variant={activeVariant === variant.id ? 'holographic' : 'glass'}
              size="sm"
              onClick={() => setActiveVariant(variant.id)}
              className={activeVariant === variant.id ? 'text-white' : 'text-primary'}
            >
              {variant.name}
            </MagicButton>
          ))}
        </motion.div>

        {/* Showcase Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Main Showcase Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <GlassmorphicCard
              variant={activeVariant as any}
              glow={activeVariant === 'holographic'}
              magic={activeVariant === 'chromatic'}
              className="h-full"
            >
              <h3 className="text-2xl font-bold mb-4">
                {variants.find(v => v.id === activeVariant)?.name}
              </h3>
              <p className="text-text-secondary mb-6">
                {variants.find(v => v.id === activeVariant)?.description}
              </p>
              
              <div className="space-y-4">
                <div className="p-4 glass rounded-lg">
                  <h4 className="font-semibold mb-2">Nested Glass Effect</h4>
                  <p className="text-sm text-text-secondary">
                    Glass effects can be nested for depth
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <MagicButton variant="glass" size="sm">
                    Action 1
                  </MagicButton>
                  <MagicButton variant="glow" size="sm">
                    Action 2
                  </MagicButton>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Feature Cards */}
          <motion.div variants={itemVariants} className="space-y-6">
            <GlassmorphicCard variant="frosted" glow>
              <h4 className="text-xl font-bold mb-2">
                <MagicText variant="shimmer">Performance</MagicText>
              </h4>
              <p className="text-sm text-text-secondary">
                GPU-accelerated transforms and will-change optimizations
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard variant="holographic">
              <h4 className="text-xl font-bold mb-2">Modern CSS</h4>
              <p className="text-sm text-text-secondary">
                Using @property, CSS layers, and container queries
              </p>
            </GlassmorphicCard>

            <GlassmorphicCard variant="chromatic" magic>
              <h4 className="text-xl font-bold mb-2">Magic Effects</h4>
              <p className="text-sm text-text-secondary">
                Particle animations and dynamic interactions
              </p>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>

        {/* CSS Features Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16"
        >
          <GlassmorphicCard variant="frosted" className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <MagicText variant="gradient">Modern CSS Features</MagicText>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Animation Features</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Scroll-driven animations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Custom cubic-bezier curves
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    GPU-accelerated transforms
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Reduced motion support
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">CSS Enhancements</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    CSS custom properties with @property
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Cascade layers for organization
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Container queries support
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Advanced blend modes
                  </li>
                </ul>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </section>
  )
}