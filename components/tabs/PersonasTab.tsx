'use client'

import { Card } from '../ui/Card'
import { CodeBlock } from '../ui/CodeBlock'

export function PersonasTab() {
  const personas = [
    {
      icon: '🏗️',
      name: 'Architect',
      flag: '--persona-architect',
      description: 'System design, scalability, infrastructure decisions',
      example: '/design --microservices --persona-architect',
      colors: 'from-blue-500 to-purple-600'
    },
    {
      icon: '🎨',
      name: 'Frontend',
      flag: '--persona-frontend',
      description: 'UI/UX, React, Vue, animations, responsive design',
      example: '/build --component --persona-frontend',
      colors: 'from-pink-500 to-red-500'
    },
    {
      icon: '⚙️',
      name: 'Backend',
      flag: '--persona-backend',
      description: 'APIs, databases, server architecture, scaling',
      example: '/build --api --persona-backend',
      colors: 'from-blue-400 to-cyan-400'
    },
    {
      icon: '🔒',
      name: 'Security',
      flag: '--persona-security',
      description: 'Vulnerability detection, security best practices',
      example: '/scan --penetration --persona-security',
      colors: 'from-red-500 to-pink-500'
    },
    {
      icon: '🔍',
      name: 'Analyzer',
      flag: '--persona-analyzer',
      description: 'Debugging, profiling, root cause analysis',
      example: '/analyze --memory --persona-analyzer',
      colors: 'from-teal-400 to-green-400'
    },
    {
      icon: '✅',
      name: 'QA',
      flag: '--persona-qa',
      description: 'Testing strategies, quality assurance, coverage',
      example: '/test --e2e --persona-qa',
      colors: 'from-yellow-400 to-green-400'
    },
    {
      icon: '⚡',
      name: 'Performance',
      flag: '--persona-performance',
      description: 'Speed optimization, caching, load balancing',
      example: '/improve --optimize --persona-performance',
      colors: 'from-cyan-400 to-blue-500'
    },
    {
      icon: '🔧',
      name: 'Refactorer',
      flag: '--persona-refactorer',
      description: 'Clean code, patterns, technical debt reduction',
      example: '/improve --clean --persona-refactorer',
      colors: 'from-orange-400 to-yellow-500'
    },
    {
      icon: '👨‍🏫',
      name: 'Mentor',
      flag: '--persona-mentor',
      description: 'Teaching, documentation, best practices guidance',
      example: '/explain --detailed --persona-mentor',
      colors: 'from-purple-500 to-indigo-600'
    }
  ]

  const PersonaCard = ({ icon, name, flag, description, example, colors }: any) => (
    <div className="bg-bg-card border border-white/10 rounded-xl p-6 hover:border-primary/30 hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors} flex items-center justify-center text-2xl mr-4`}>
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-text-primary">{name}</h4>
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">{flag}</span>
        </div>
      </div>
      <p className="text-text-secondary mb-4 leading-relaxed">{description}</p>
      <CodeBlock 
        code={example}
        language="bash"
        copyButton={true}
        className="text-xs"
      />
    </div>
  )

  return (
    <Card className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gradient">🎭 The 9 SuperClaude Personas</h2>
      <p className="text-lg text-text-secondary mb-8">
        Each persona brings specialized expertise to your commands:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => (
          <PersonaCard key={index} {...persona} />
        ))}
      </div>
    </Card>
  )
}