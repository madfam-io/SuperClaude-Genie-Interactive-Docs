'use client'

import { Card } from '../ui/card'
import { CodeBlock } from '../ui/CodeBlock'

export function CommandsTab() {
  const developmentCommands = [
    {
      name: '/build',
      description: 'Create Code & Features',
      usage: 'Generate complete code implementations with best practices',
      example: '/build --react --typescript --persona-frontend'
    },
    {
      name: '/dev-setup',
      description: 'Environment Setup',
      usage: 'Configure development environments and tooling',
      example: '/dev-setup --docker --postgres --persona-backend'
    },
    {
      name: '/troubleshoot',
      description: 'Debug Issues',
      usage: 'Analyze and fix bugs with intelligent debugging',
      example: '/troubleshoot --memory-leak --profile --persona-analyzer'
    },
    {
      name: '/improve',
      description: 'Optimize Code',
      usage: 'Enhance performance and code quality',
      example: '/improve --performance --refactor --persona-performance'
    }
  ]

  const operationsCommands = [
    {
      name: '/deploy',
      description: 'Deployment Magic',
      usage: 'Handle deployments across any platform',
      example: '/deploy --kubernetes --zero-downtime --persona-architect'
    },
    {
      name: '/scan',
      description: 'Security Analysis',
      usage: 'Comprehensive security audits and fixes',
      example: '/scan --vulnerabilities --fix --persona-security'
    }
  ]

  const CommandCard = ({ name, description, usage, example }: any) => (
    <div className="bg-bg-card border border-white/5 rounded-lg p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold">
          <span className="text-success">{name}</span>
        </h4>
        <button className="text-text-muted hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <p className="text-text-secondary mb-3">{description}</p>
      <p className="text-text-muted text-sm mb-4">{usage}</p>
      <CodeBlock 
        code={example}
        language="bash"
        copyButton={true}
        className="text-xs"
      />
    </div>
  )

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-primary">⚡ Development Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {developmentCommands.map((command, index) => (
            <CommandCard key={index} {...command} />
          ))}
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-secondary">🛠️ Operations Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operationsCommands.map((command, index) => (
            <CommandCard key={index} {...command} />
          ))}
        </div>
      </Card>
    </div>
  )
}