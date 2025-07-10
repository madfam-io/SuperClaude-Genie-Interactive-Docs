'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { SearchBox } from './SearchBox'

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
        type: "spring",
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
        type: "spring",
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
              className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-gradient relative z-10"
              style={{ perspective: 1000 }}
            >
              {title.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  custom={index}
                  className="inline-block"
                  whileHover={{ 
                    scale: 1.2, 
                    color: '#6366f1',
                    textShadow: '0 0 20px rgba(99, 102, 241, 0.8)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
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
            <motion.span
              className="text-gradient font-semibold"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              SuperClaude command generator wizard
            </motion.span>
          </motion.p>
          
          {/* Enhanced Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
          >
            <motion.button
              onClick={() => scrollToSection('getting-started')}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(99, 102, 241, 0.3)',
                    '0 0 40px rgba(99, 102, 241, 0.6)',
                    '0 0 20px rgba(99, 102, 241, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('genie-interface')}
              className="group relative px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold overflow-hidden backdrop-blur-sm"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="relative z-10">Try Demo</span>
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
          
          {/* Enhanced Search Box */}
          <motion.div
            variants={itemVariants}
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
          >
            <SearchBox 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search commands, personas, or workflows..."
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-primary/20 rounded-lg backdrop-blur-sm"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotateX: [0, 360],
              rotateY: [0, 360],
              opacity: [0.2, 0.8, 0.2],
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