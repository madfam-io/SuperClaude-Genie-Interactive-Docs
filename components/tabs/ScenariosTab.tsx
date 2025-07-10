'use client'

import { Card } from '../ui'
import { CodeBlock } from '../ui/CodeBlock'

export function ScenariosTab() {
  const scenarios = [
    {
      title: '🆕 Building From Scratch',
      scenario: 'I need to build a SaaS dashboard with React and Node.js',
      workflow: `# Setup full-stack environment
/dev-setup --react --node --postgres --docker

# Build the architecture
/design --saas --multi-tenant --persona-architect --think-hard

# Create the frontend
/build --dashboard --react --tailwind --persona-frontend --magic

# Build the API
/build --api --rest --auth --persona-backend`
    },
    {
      title: '🔥 Taming Wild Codebases',
      scenario: 'Just inherited a 5-year-old jQuery app with no tests',
      workflow: `# First, understand what we're dealing with
/analyze --codebase --dependencies --debt --persona-analyzer

# Document the existing functionality
/document --reverse-engineer --behavior --persona-mentor

# Add tests before refactoring
/test --legacy --characterization --persona-qa

# Gradual modernization
/improve --incremental --jquery-to-react --persona-refactorer --seq`
    },
    {
      title: '🐛 Emergency Debugging',
      scenario: 'API response times suddenly 10x slower in production',
      workflow: `# Immediate analysis
/troubleshoot --api --performance --urgent --persona-analyzer --ultrathink

# Deep dive into bottlenecks
/analyze --database --queries --n+1 --seq

# Quick fixes
/improve --performance --cache --indexes --uc

# Verify and monitor
/test --performance --load --monitor`
    }
  ]

  const ScenarioCard = ({ title, scenario, workflow }: any) => (
    <Card className="p-6">
      <h4 className="text-xl font-semibold text-primary mb-3">{title}</h4>
      <div className="bg-bg-dark rounded-lg p-4 mb-4">
        <p className="text-text-secondary">
          <strong>Scenario:</strong> "{scenario}"
        </p>
      </div>
      <div className="mb-3">
        <p className="text-text-primary font-medium mb-2">🎯 Your SuperClaude magic:</p>
        <CodeBlock 
          code={workflow}
          language="bash"
          copyButton={true}
        />
      </div>
    </Card>
  )

  return (
    <Card className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gradient">🎯 Common Development Scenarios</h2>
      
      <div className="space-y-8">
        {scenarios.map((scenario, index) => (
          <ScenarioCard key={index} {...scenario} />
        ))}
      </div>
    </Card>
  )
}