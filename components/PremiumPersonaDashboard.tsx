'use client'

import { motion } from 'framer-motion'
import { PersonaCard, FeatureCard, StatCard } from './ui/PremiumCard'

export function PremiumPersonaDashboard() {
  const personas = [
    {
      emoji: '🏗️',
      name: 'Architect',
      description: 'System design expert specializing in scalable architectures, microservices, and cloud infrastructure planning.',
      specialties: ['System Design', 'Microservices', 'Cloud Architecture', 'Scalability', 'Infrastructure']
    },
    {
      emoji: '🎨',
      name: 'Frontend',
      description: 'UI/UX specialist focused on modern frameworks, responsive design, and exceptional user experiences.',
      specialties: ['React/Vue', 'UI/UX Design', 'CSS/Tailwind', 'Responsive Design', 'Accessibility']
    },
    {
      emoji: '⚙️',
      name: 'Backend',
      description: 'API and server expert with deep knowledge of databases, performance optimization, and server architecture.',
      specialties: ['REST/GraphQL APIs', 'Database Design', 'Server Architecture', 'Performance', 'Security']
    },
    {
      emoji: '🔒',
      name: 'Security',
      description: 'Security specialist ensuring robust protection through vulnerability assessment and secure coding practices.',
      specialties: ['OWASP Top 10', 'Penetration Testing', 'Secure Coding', 'Compliance', 'Threat Modeling']
    },
    {
      emoji: '🔍',
      name: 'Analyzer',
      description: 'Debugging expert and performance analyst with exceptional problem-solving and optimization skills.',
      specialties: ['Debugging', 'Performance Analysis', 'Code Review', 'Profiling', 'Monitoring']
    },
    {
      emoji: '✅',
      name: 'QA',
      description: 'Quality assurance specialist focused on comprehensive testing strategies and automation frameworks.',
      specialties: ['Test Automation', 'Unit Testing', 'Integration Testing', 'CI/CD', 'Quality Metrics']
    },
    {
      emoji: '⚡',
      name: 'Performance',
      description: 'Speed optimization expert specializing in application performance and resource optimization.',
      specialties: ['Load Testing', 'Optimization', 'Caching', 'CDN', 'Resource Management']
    },
    {
      emoji: '🔧',
      name: 'Refactorer',
      description: 'Code improvement specialist focused on clean code principles and technical debt reduction.',
      specialties: ['Clean Code', 'Refactoring', 'Design Patterns', 'Code Quality', 'Technical Debt']
    },
    {
      emoji: '👨‍🏫',
      name: 'Mentor',
      description: 'Teaching and documentation expert helping teams grow and maintain excellent development practices.',
      specialties: ['Documentation', 'Code Reviews', 'Best Practices', 'Team Training', 'Knowledge Sharing']
    }
  ]

  const stats = [
    { value: '9', label: 'AI Personas', change: '+100% specialized' },
    { value: '500+', label: 'Commands Generated', change: '+25% this week' },
    { value: '95%', label: 'Accuracy Rate', change: '+5% improvement' },
    { value: '2.1s', label: 'Avg Response Time', change: '-30% faster' },
  ]

  const features = [
    {
      icon: '🧠',
      title: 'Context-Aware Intelligence',
      description: 'Our AI personas understand your project context, tech stack, and development phase to provide perfectly tailored recommendations.'
    },
    {
      icon: '🔄',
      title: 'Adaptive Learning',
      description: 'Each persona learns from your interactions, becoming more aligned with your specific workflow and preferences over time.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Generation',
      description: 'Generate commands, configurations, and solutions instantly with streaming responses and live preview capabilities.'
    }
  ]

  return (
    <section className="py-24 relative" id="personas">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-neural" />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-purple/30 rounded-full blur-6xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-text-primary">Meet Your AI </span>
            <span className="bg-gradient-cyber-secondary bg-clip-text text-transparent">
              Development Team
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-4xl mx-auto leading-relaxed">
            Nine specialized AI personas, each with deep expertise in their domain, ready to transform your development workflow with intelligent, context-aware assistance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              change={stat.change}
              variant="premium"
            />
          ))}
        </motion.div>

        {/* Personas Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          {personas.map((persona, index) => (
            <motion.div
              key={persona.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1 
              }}
            >
              <PersonaCard
                emoji={persona.emoji}
                name={persona.name}
                description={persona.description}
                specialties={persona.specialties}
                variant="neural"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant="elegant"
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <div className="glass-premium p-12 rounded-4xl border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Start generating intelligent commands with our specialized AI personas. Experience the future of developer productivity.
            </p>
            <motion.button
              onClick={() => {
                const element = document.getElementById('genie-interface')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="glass-cyber px-12 py-4 rounded-2xl border-2 border-cyber-cyan/50 hover:border-cyber-cyan transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center space-x-3 text-lg font-semibold text-cyber-cyan">
                <span>🚀</span>
                <span>Start Building Now</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-cyber-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}