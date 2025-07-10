'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { SearchBox } from './SearchBox'
import { MagicText } from './ui/MagicText'
import { MagicButton } from './ui/MagicButton'
import { GlassmorphicCard } from './ui/GlassmorphicCard'

export function EnhancedHero() {
  const [searchQuery, setSearchQuery] = useState('')
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  }

  const title = "🧞 SuperClaude Genie"

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <motion.div 
        style={{ y, opacity, scale }}
        className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Animated Title */}
          <div className="relative">
            <motion.h1 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 relative z-10"
              style={{ perspective: 1000 }}
            >
              <MagicText variant="holographic" size="4xl" className="block">
                {title}
              </MagicText>
            </motion.h1>
            
            {/* Floating Magic Sparkles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-8 leading-relaxed"
          >
            Transform your AI into a{' '}
            <MagicText variant="shimmer" size="3xl" className="inline-block font-semibold">
              SuperClaude command generator wizard
            </MagicText>
          </motion.p>
          
          {/* Enhanced Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
          >
            <MagicButton
              onClick={() => scrollToSection('getting-started')}
              variant="holographic"
              size="lg"
              magic
              className="text-white"
            >
              Get Started
            </MagicButton>
            
            <MagicButton
              onClick={() => scrollToSection('genie-interface')}
              variant="glass"
              size="lg"
              className="text-primary"
            >
              Try Demo
            </MagicButton>
          </motion.div>
          
          {/* Enhanced Search Box */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" as const, stiffness: 100 }}
          >
            <GlassmorphicCard variant="frosted" glow className="p-2">
              <SearchBox 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search commands, personas, or workflows..."
              />
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-20 h-20 rounded-lg ${
              i % 3 === 0 ? 'glass-holographic' : 
              i % 3 === 1 ? 'glass-frosted' : 
              'glass-chromatic'
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotateX: [0, 360],
              rotateY: [0, 360],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'translateZ(0)',
            }}
          />
        ))}
        
        {/* Aurora Background Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 glow-aurora" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}