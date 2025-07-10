'use client'

import { Card } from '../ui'
import { CodeBlock } from '../ui/CodeBlock'

export function WorkflowsTab() {
  const workflows = [
    {
      title: '🚀 New Project Setup',
      description: 'Complete project initialization workflow',
      steps: [
        '# 1. Setup environment\n/dev-setup --node --typescript --eslint',
        '# 2. Build initial structure\n/build --scaffold --react --persona-architect',
        '# 3. Setup testing\n/test --setup --jest --cypress',
        '# 4. Configure CI/CD\n/deploy --ci --github-actions'
      ]
    },
    {
      title: '🐛 Production Emergency',
      description: 'Rapid response for production issues',
      steps: [
        '# 1. Analyze the issue\n/analyze --logs --metrics --persona-analyzer --ultrathink',
        '# 2. Identify root cause\n/troubleshoot --production --trace --seq',
        '# 3. Deploy hotfix\n/build --hotfix --minimal --uc',
        '# 4. Verify fix\n/test --smoke --production'
      ]
    },
    {
      title: '📈 Performance Optimization',
      description: 'Complete performance improvement workflow',
      steps: [
        '# 1. Profile current performance\n/analyze --performance --profile --persona-performance',
        '# 2. Identify bottlenecks\n/troubleshoot --slow --database --api',
        '# 3. Optimize code\n/improve --performance --caching --async',
        '# 4. Validate improvements\n/test --load --benchmark'
      ]
    }
  ]

  const WorkflowCard = ({ title, description, steps }: any) => (
    <Card className="p-6">
      <h4 className="text-xl font-semibold text-primary mb-2">{title}</h4>
      <p className="text-text-secondary mb-4">{description}</p>
      <div className="space-y-3">
        {steps.map((step: string, index: number) => (
          <CodeBlock 
            key={index}
            code={step}
            language="bash"
            copyButton={true}
            className="text-sm"
          />
        ))}
      </div>
    </Card>
  )

  return (
    <Card className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gradient">🔗 Power Workflows</h2>
      <p className="text-lg text-text-secondary mb-8">
        Chain commands for complex development scenarios
      </p>
      
      <div className="space-y-8">
        {workflows.map((workflow, index) => (
          <WorkflowCard key={index} {...workflow} />
        ))}
      </div>
    </Card>
  )
}