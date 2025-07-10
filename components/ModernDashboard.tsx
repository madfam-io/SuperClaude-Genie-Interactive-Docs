'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BentoGrid, 
  FeatureBento, 
  MetricBento, 
  PersonaBento, 
  ActionBento 
} from './BentoGrid'
import { Sparkles, Cpu, Zap, Shield, Code, Database, Search, Settings } from 'lucide-react'

export default function ModernDashboard() {
  const [activePersona, setActivePersona] = useState('architect')
  
  // Sample data
  const metrics = [
    { label: 'Commands Generated', value: '2.1K', change: '+12% this week', trend: 'up' as const },
    { label: 'Active Personas', value: '9', change: 'All systems online', trend: 'neutral' as const },
    { label: 'Success Rate', value: '98%', change: '+2% improvement', trend: 'up' as const },
    { label: 'Response Time', value: '1.2s', change: '-200ms faster', trend: 'up' as const },
  ]
  
  const personas = [
    {
      emoji: '🏗️',
      name: 'Architect',
      description: 'System design and infrastructure expert',
      specialties: ['Microservices', 'Cloud Architecture', 'Scalability', 'Infrastructure'],
      active: activePersona === 'architect'
    },
    {
      emoji: '🎨',
      name: 'Frontend',
      description: 'UI/UX and modern framework specialist',
      specialties: ['React/Vue', 'Design Systems', 'Performance', 'Accessibility'],
      active: activePersona === 'frontend'
    },
    {
      emoji: '⚙️',
      name: 'Backend',
      description: 'API development and server optimization',
      specialties: ['REST/GraphQL', 'Databases', 'Security', 'DevOps'],
      active: activePersona === 'backend'
    },
    {
      emoji: '🔒',
      name: 'Security',
      description: 'Security auditing and vulnerability assessment',
      specialties: ['OWASP', 'Penetration Testing', 'Compliance', 'Threat Modeling'],
      active: activePersona === 'security'
    },
  ]
  
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI Command Generation',
      description: 'Generate intelligent, context-aware commands tailored to your specific development workflow and tech stack.',
      stats: [
        { label: 'Accuracy', value: '98%' },
        { label: 'Speed', value: '<2s' }
      ]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Smart Personas',
      description: '9 specialized AI personas with deep expertise in different aspects of software development.',
      stats: [
        { label: 'Personas', value: '9' },
        { label: 'Specialties', value: '40+' }
      ]
    }
  ]
  
  const actions = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Generate Code',
      description: 'Create boilerplate code, components, and full features with AI assistance.',
      action: 'Start Coding',
      onClick: () => console.log('Generate code')
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Database Setup',
      description: 'Configure databases, create schemas, and set up migrations automatically.',
      action: 'Configure DB',
      onClick: () => console.log('Database setup')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security Audit',
      description: 'Run comprehensive security checks and get recommendations for improvements.',
      action: 'Run Audit',
      onClick: () => console.log('Security audit')
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Code Analysis',
      description: 'Analyze your codebase for performance issues, code quality, and best practices.',
      action: 'Analyze Code',
      onClick: () => console.log('Code analysis')
    }
  ]
  
  return (
    <section className="py-24 relative" id="dashboard">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-6xl"
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
            <span className="text-text-primary">AI-Powered </span>
            <span className="text-accent-blue">Development Hub</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Your intelligent command center for modern development. Generate code, analyze projects, 
            and accelerate your workflow with specialized AI personas.
          </p>
        </motion.div>
        
        {/* Main Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <BentoGrid className="gap-6">
            {/* Metrics Row */}
            {metrics.map((metric, index) => (
              <MetricBento
                key={index}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                trend={metric.trend}
                size="sm"
              />
            ))}
            
            {/* Main Features */}
            {features.map((feature, index) => (
              <FeatureBento
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                stats={feature.stats}
                size="lg"
                variant="featured"
              />
            ))}
            
            {/* AI Personas */}
            {personas.map((persona, index) => (
              <PersonaBento
                key={index}
                emoji={persona.emoji}
                name={persona.name}
                description={persona.description}
                specialties={persona.specialties}
                active={persona.active}
                size="md"
              />
            ))}
            
            {/* Action Cards */}
            {actions.map((action, index) => (
              <ActionBento
                key={index}
                icon={action.icon}
                title={action.title}
                description={action.description}
                action={action.action}
                onClick={action.onClick}
                size="md"
                variant="gradient"
              />
            ))}
            
            {/* Command Interface Preview */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 card-modern p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-text-primary">
                    Command Interface
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                    <span className="text-sm text-text-secondary">Live</span>
                  </div>
                </div>
                
                <div className="glass-medium rounded-xl p-6 border border-border">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🧞</span>
                    </div>
                    <span className="text-text-primary font-medium">SuperClaude Genie</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-text-secondary">
                      $ <span className="text-accent-blue">superclaude generate</span> --type="react-component" --name="Dashboard"
                    </div>
                    <div className="text-text-muted text-sm">
                      ✨ Generating React component with TypeScript and Tailwind...
                    </div>
                    <div className="text-accent-green text-sm">
                      ✅ Component generated successfully!
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => console.log('Open interface')}
                    className="btn-modern bg-accent-blue hover:bg-accent-blue/80 text-white"
                  >
                    Open Interface
                  </button>
                  <button
                    onClick={() => console.log('View docs')}
                    className="btn-modern border-accent-purple text-accent-purple hover:bg-accent-purple/10"
                  >
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </BentoGrid>
        </motion.div>
        
        {/* Quick Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          {[
            { value: '50+', label: 'Command Templates' },
            { value: '15', label: 'Frameworks Supported' },
            { value: '99.9%', label: 'Uptime' },
            { value: '<100ms', label: 'API Response' },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl font-bold text-accent-blue">
                {stat.value}
              </div>
              <div className="text-text-muted text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}