'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { MagicButton } from './ui/MagicButton'

export function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-10%" })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Smooth parallax transforms (Vercel-inspired performance)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  
  // Mouse movement for premium interaction
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        mouseX.set(x * 20)
        mouseY.set(y * 20)
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    heroRef.current?.addEventListener('mousemove', handleMouseMove)
    return () => heroRef.current?.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants (Linear-inspired timing)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const // Stripe-inspired easing
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 24,
      scale: 0.98,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.1
      }
    }
  }

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh"
      id="hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Geometric Grid (Vercel-inspired) */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyber-cyan via-transparent to-cyber-magenta"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>
        
        {/* Neural Network Nodes */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyber-cyan rounded-full shadow-cyber"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                left: `${15 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Premium Glow Orbs */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan rounded-full blur-6xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-magenta rounded-full blur-6xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto text-center px-6 lg:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Premium Badge (Stripe-inspired) */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center"
          >
            <div className="glass-premium px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyber-lime rounded-full animate-pulse-glow" />
                <span className="text-sm font-medium text-text-secondary">
                  ✨ Powered by Advanced AI
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Title with Premium Typography */}
          <motion.h1 
            ref={titleRef}
            variants={titleVariants}
            className="relative"
          >
            {/* Main Title */}
            <div className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight">
              <div className="relative inline-block">
                <span className="block bg-gradient-cyber-primary bg-clip-text text-transparent bg-[length:200%_200%] animate-neural-flow">
                  SuperClaude
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-cyber-primary opacity-20 blur-2xl rounded-2xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <div className="mt-2 flex items-center justify-center space-x-4">
                <span className="text-4xl md:text-6xl lg:text-7xl">🧞</span>
                <span className="bg-gradient-cyber-secondary bg-clip-text text-transparent bg-[length:200%_200%] animate-neural-flow">
                  Genie
                </span>
              </div>
            </div>
            
            {/* Floating Elements */}
            {isHovered && Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-lime rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                style={{
                  left: `${40 + Math.random() * 20}%`,
                  top: `${40 + Math.random() * 20}%`,
                }}
              />
            ))}
          </motion.h1>

          {/* Subtitle with Premium Spacing */}
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto space-y-4"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary font-light leading-relaxed tracking-wide">
              Transform your AI into an{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-cyber-accent bg-clip-text text-transparent font-semibold">
                  intelligent command generator
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-cyber-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                />
              </span>
              {' '}that understands your development workflow
            </p>
            
            <p className="text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto">
              Powered by specialized personas, contextual intelligence, and premium developer experience
            </p>
          </motion.div>
          
          {/* Premium CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4"
          >
            <MagicButton
              onClick={() => scrollToSection('genie-interface')}
              variant="holographic"
              size="lg"
              magic
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Experience the Magic</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </span>
            </MagicButton>
            
            <motion.button
              onClick={() => scrollToSection('getting-started')}
              className="group relative px-8 py-4 glass-premium rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg font-medium text-text-primary group-hover:text-cyber-cyan transition-colors">
                View Documentation
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-cyber-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: '🏗️', title: 'Smart Architecture', desc: 'AI-powered system design' },
              { icon: '⚡', title: 'Real-time Generation', desc: 'Instant command creation' },
              { icon: '🔮', title: 'Context Aware', desc: 'Understands your workflow' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass-elegant p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group"
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 20px 40px rgba(0, 255, 255, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Premium Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center relative overflow-hidden"
          whileHover={{ borderColor: 'rgba(0, 255, 255, 0.5)' }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-cyber-primary rounded-full mt-2"
            animate={{ 
              y: [0, 16, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <p className="text-xs text-text-muted mt-2 text-center">Scroll to explore</p>
      </motion.div>
    </section>
  )
}