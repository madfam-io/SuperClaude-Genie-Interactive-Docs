'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card3D } from './Card3D'
import { ParallaxSection } from './ParallaxSection'

interface Persona {
  id: string
  name: string
  icon: string
  description: string
  specialties: string[]
  color: string
  gradient: string
}

const personas: Persona[] = [
  {
    id: 'architect',
    name: 'Architect',
    icon: '🏗️',
    description: 'System design and scalability expert',
    specialties: ['Architecture', 'Scalability', 'Design Patterns', 'System Integration'],
    color: '#6366f1',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    icon: '🎨',
    description: 'UI/UX and component development specialist',
    specialties: ['React', 'UI/UX', 'Responsive Design', 'Animations'],
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '⚙️',
    description: 'APIs and server architecture expert',
    specialties: ['APIs', 'Databases', 'Server Architecture', 'Performance'],
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    id: 'security',
    name: 'Security',
    icon: '🔒',
    description: 'Security audits and compliance specialist',
    specialties: ['Security Audits', 'Compliance', 'Penetration Testing', 'Encryption'],
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'analyzer',
    name: 'Analyzer',
    icon: '🔍',
    description: 'Debugging and performance analysis expert',
    specialties: ['Debugging', 'Performance Analysis', 'Code Review', 'Optimization'],
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600'
  },
  {
    id: 'qa',
    name: 'QA',
    icon: '✅',
    description: 'Testing and quality assurance specialist',
    specialties: ['Testing', 'Quality Assurance', 'Automation', 'Test Coverage'],
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600'
  }
]

export function EnhancedPersonaDashboard() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  return (
    <ParallaxSection className="py-20" id="persona-dashboard" speed={0.3}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            🎭 SuperClaude Personas
          </motion.h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose your AI specialist persona for tailored assistance and expert guidance
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              variants={cardVariants}
              custom={index}
              onHoverStart={() => setHoveredPersona(persona.id)}
              onHoverEnd={() => setHoveredPersona(null)}
            >
              <Card3D
                className="h-full cursor-pointer"
                intensity={20}
                glowColor={`${persona.color}40`}
                onClick={() => setSelectedPersona(persona)}
              >
                <div className="relative h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="text-4xl mr-4"
                      animate={hoveredPersona === persona.id ? {
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {persona.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{persona.name}</h3>
                      <motion.div
                        className={`h-1 bg-gradient-to-r ${persona.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary mb-6 flex-grow">
                    {persona.description}
                  </p>

                  {/* Specialties */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.specialties.map((specialty, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: `${persona.color}20`,
                            borderColor: persona.color
                          }}
                        >
                          {specialty}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: persona.color,
                          opacity: 0.3,
                          left: `${i * 8}px`,
                          top: `${i * 8}px`,
                        }}
                        animate={hoveredPersona === persona.id ? {
                          y: [-5, 5, -5],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [1, 1.2, 1],
                        } : {}}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>

        {/* Persona Detail Modal */}
        <AnimatePresence>
          {selectedPersona && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPersona(null)}
            >
              <motion.div
                className="bg-bg-light rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-6">
                  <div className="text-6xl mr-6">{selectedPersona.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedPersona.name}</h2>
                    <p className="text-text-secondary text-lg">{selectedPersona.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Core Expertise</h3>
                    <div className="space-y-2">
                      {selectedPersona.specialties.map((specialty, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: selectedPersona.color }} />
                          <span className="text-text-primary">{specialty}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Sample Commands</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-black/20 rounded-lg font-mono text-sm text-green-400">
                        /improve --{selectedPersona.id} --quality
                      </div>
                      <div className="p-3 bg-black/20 rounded-lg font-mono text-sm text-green-400">
                        /analyze --{selectedPersona.id} --deep
                      </div>
                      <div className="p-3 bg-black/20 rounded-lg font-mono text-sm text-green-400">
                        /build --{selectedPersona.id} --optimize
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPersona(null)}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ParallaxSection>
  )
}