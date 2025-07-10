'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumCard } from './ui/PremiumCard'
import { CodeBlock } from './ui/CodeBlock'
import { useNotification } from './NotificationProvider'
import { useSupeClaudeAPI } from '@/lib/api-client'
import { GenerateCommandsRequest, PersonaContext } from '@/lib/types'

export function PremiumGenieInterface() {
  const [request, setRequest] = useState('')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [phase, setPhase] = useState('development')
  const [selectedPersona, setSelectedPersona] = useState('architect')
  const [commands, setCommands] = useState<string[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [personas, setPersonas] = useState<PersonaContext[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { showNotification } = useNotification()
  const api = useSupeClaudeAPI()

  const techStack = [
    { name: 'React', color: 'cyber-cyan', icon: '⚛️' },
    { name: 'Vue', color: 'cyber-lime', icon: '💚' },
    { name: 'Node.js', color: 'cyber-lime', icon: '🟢' },
    { name: 'TypeScript', color: 'cyber-blue', icon: '📘' },
    { name: 'Next.js', color: 'text-primary', icon: '▲' },
    { name: 'Docker', color: 'cyber-blue', icon: '🐳' },
    { name: 'PostgreSQL', color: 'cyber-blue', icon: '🐘' },
    { name: 'GraphQL', color: 'cyber-magenta', icon: '◈' },
    { name: 'Tailwind', color: 'cyber-cyan', icon: '🎨' },
    { name: 'Python', color: 'cyber-lime', icon: '🐍' },
    { name: 'Redis', color: 'cyber-orange', icon: '📦' },
    { name: 'Kubernetes', color: 'cyber-blue', icon: '☸️' },
  ]

  const projectPhases = [
    { value: 'planning', label: 'Planning', icon: '📋' },
    { value: 'development', label: 'Development', icon: '⚡' },
    { value: 'testing', label: 'Testing', icon: '🧪' },
    { value: 'deployment', label: 'Deployment', icon: '🚀' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
  ]

  const personaList = [
    { id: 'architect', name: 'Architect', emoji: '🏗️', desc: 'System design expert' },
    { id: 'frontend', name: 'Frontend', emoji: '🎨', desc: 'UI/UX specialist' },
    { id: 'backend', name: 'Backend', emoji: '⚙️', desc: 'API & server expert' },
    { id: 'security', name: 'Security', emoji: '🔒', desc: 'Security specialist' },
    { id: 'analyzer', name: 'Analyzer', emoji: '🔍', desc: 'Debugging expert' },
    { id: 'qa', name: 'QA', emoji: '✅', desc: 'Quality assurance' },
    { id: 'performance', name: 'Performance', emoji: '⚡', desc: 'Speed optimization' },
    { id: 'refactorer', name: 'Refactorer', emoji: '🔧', desc: 'Code improvement' },
    { id: 'mentor', name: 'Mentor', emoji: '👨‍🏫', desc: 'Teaching & docs' },
  ]

  // Initialize session and load personas
  useEffect(() => {
    const initializeAPI = async () => {
      try {
        const session = await api.initializeSession({
          techStack: selectedTech,
          projectPhase: phase
        })
        setSessionId(session.id)

        const availablePersonas = await api.client.getPersonas()
        setPersonas(availablePersonas)
      } catch (error) {
        console.error('Failed to initialize API:', error)
        showNotification('Failed to connect to SuperClaude API', 'error')
      }
    }

    initializeAPI()
  }, [])

  const generateCommands = async () => {
    if (!request.trim()) {
      showNotification('Please describe what you want to accomplish', 'warning')
      return
    }

    setIsGenerating(true)
    setCommands([])
    setStreamingText('')

    try {
      const requestData: GenerateCommandsRequest = {
        prompt: request,
        persona: selectedPersona as any,
        techStack: selectedTech,
        projectPhase: phase,
        sessionId: sessionId || undefined,
        maxCommands: 3,
      }

      const response = await api.client.generateCommands(requestData)
      if (response && 'commands' in response && Array.isArray(response.commands)) {
        setCommands((response.commands as any[]).map((cmd: any) => cmd.command))
      }
      showNotification('Commands generated successfully!', 'success')
    } catch (error) {
      console.error('Failed to generate commands:', error)
      showNotification('Failed to generate commands. Please try again.', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  return (
    <section className="py-24 relative" id="genie-interface">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-6xl"
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
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-cyber-primary bg-clip-text text-transparent">
              AI Command
            </span>
            <span className="text-text-primary"> Generator</span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Describe your development task and watch as our AI generates perfectly crafted commands tailored to your stack and workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Input */}
            <PremiumCard variant="premium" className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-text-primary mb-4">
                    💬 Describe your development task
                  </label>
                  <div className="relative">
                    <motion.textarea
                      ref={textareaRef}
                      value={request}
                      onChange={(e) => setRequest(e.target.value)}
                      onFocus={() => setFocusedInput(true)}
                      onBlur={() => setFocusedInput(false)}
                      placeholder="e.g., 'Create a new React component with TypeScript for user authentication..'"
                      className={`w-full h-32 bg-background-card/50 border-2 rounded-2xl px-6 py-4 text-text-primary placeholder-text-muted resize-none transition-all duration-300 ${
                        focusedInput 
                          ? 'border-cyber-cyan shadow-cyber' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      animate={focusedInput ? { scale: 1.01 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="absolute inset-0 border-2 border-cyber-cyan/50 rounded-2xl opacity-0 pointer-events-none"
                      animate={focusedInput ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Persona Selection */}
                <div>
                  <label className="block text-lg font-semibold text-text-primary mb-4">
                    🎭 Choose AI Persona
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3">
                    {personaList.map((persona) => (
                      <motion.button
                        key={persona.id}
                        onClick={() => setSelectedPersona(persona.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 group ${
                          selectedPersona === persona.id
                            ? 'border-cyber-cyan bg-cyber-cyan/10 shadow-cyber'
                            : 'border-white/10 hover:border-white/20 glass-elegance'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {persona.emoji}
                        </div>
                        <div className="text-sm font-medium text-text-primary mb-1">
                          {persona.name}
                        </div>
                        <div className="text-xs text-text-muted">
                          {persona.desc}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Project Phase */}
                <div>
                  <label className="block text-lg font-semibold text-text-primary mb-4">
                    📊 Project Phase
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {projectPhases.map((phaseOption) => (
                      <motion.button
                        key={phaseOption.value}
                        onClick={() => setPhase(phaseOption.value)}
                        className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 flex items-center space-x-2 ${
                          phase === phaseOption.value
                            ? 'border-cyber-lime bg-cyber-lime/10 text-cyber-lime'
                            : 'border-white/10 hover:border-white/20 text-text-secondary glass-elegance'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{phaseOption.icon}</span>
                        <span className="font-medium">{phaseOption.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-lg font-semibold text-text-primary mb-4">
                    🛠️ Technology Stack
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {techStack.map((tech) => (
                      <motion.button
                        key={tech.name}
                        onClick={() => toggleTech(tech.name)}
                        className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 flex items-center space-x-2 ${
                          selectedTech.includes(tech.name)
                            ? `border-${tech.color} bg-${tech.color}/10 text-${tech.color}`
                            : 'border-white/10 hover:border-white/20 text-text-secondary glass-elegance'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{tech.icon}</span>
                        <span className="font-medium text-sm">{tech.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <motion.button
                  onClick={generateCommands}
                  disabled={isGenerating || !request.trim()}
                  className="w-full py-4 glass-cyber rounded-2xl border-2 border-cyber-cyan/50 hover:border-cyber-cyan transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isGenerating ? { scale: 1.01 } : {}}
                  whileTap={!isGenerating ? { scale: 0.99 } : {}}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3 text-lg font-semibold text-cyber-cyan">
                    {isGenerating ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-cyber-cyan border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Generating Commands...</span>
                      </>
                    ) : (
                      <>
                        <span>✨</span>
                        <span>Generate Commands</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🚀
                        </motion.span>
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-cyber-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  />
                </motion.button>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <PremiumCard variant="neural" className="p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <span>⚡</span>
                <span>Generated Commands</span>
              </h3>
              
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-16 glass-elegance rounded-xl border border-white/5"
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                ) : commands.length > 0 ? (
                  <motion.div
                    key="commands"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {commands.map((command, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-elegance p-4 rounded-xl border border-white/5 hover:border-cyber-cyan/30 transition-all duration-300 group cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(command)}
                      >
                        <CodeBlock
                          code={command}
                          language="bash"
                          className="text-sm"
                        />
                        <div className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to copy
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4 opacity-50">🧞</div>
                    <p className="text-text-muted">
                      Describe your task above to generate custom commands
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </PremiumCard>

            {/* Quick Tips */}
            <PremiumCard variant="elegant" className="p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <span>💡</span>
                <span>Pro Tips</span>
              </h4>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="flex items-start space-x-2">
                  <span className="text-cyber-cyan">•</span>
                  <span>Be specific about your requirements for better results</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-cyber-lime">•</span>
                  <span>Select the right persona for your task type</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-cyber-magenta">•</span>
                  <span>Include your tech stack for optimized commands</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-cyber-orange">•</span>
                  <span>Commands are tailored to your project phase</span>
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}