'use client'

import { Card } from '../ui/card'
import { CodeBlock } from '../ui/CodeBlock'
import { FeatureCard } from '../ui/FeatureCard'

export function EnterpriseTab() {
  const enterpriseWorkflows = [
    {
      title: '🚀 Microservices Migration',
      description: 'Breaking down monoliths into scalable services',
      workflow: `# Analyze monolith structure
/analyze --monolith --boundaries --persona-architect --think-hard

# Design microservices architecture
/design --microservices --event-driven --ddd

# Extract first service
/build --extract-service --strangler-fig --api-gateway

# Setup orchestration
/deploy --kubernetes --helm --service-mesh`
    },
    {
      title: '🔒 Security Compliance',
      description: 'Meeting enterprise security standards',
      workflow: `# Full security audit
/scan --comprehensive --owasp --pci --persona-security

# Fix critical vulnerabilities
/improve --security --critical --automated

# Implement security policies
/build --security-headers --rbac --encryption

# Continuous monitoring
/deploy --security-monitoring --siem --alerts`
    },
    {
      title: '📊 Data Pipeline Optimization',
      description: 'Building scalable data processing systems',
      workflow: `# Analyze current pipeline
/analyze --data-flow --bottlenecks --persona-performance

# Design optimized architecture
/design --etl --streaming --kafka --persona-architect

# Implement improvements
/build --pipeline --parallel --spark

# Setup monitoring
/deploy --data-monitoring --metrics --alerting`
    }
  ]

  const enterpriseFlags = [
    {
      icon: '🧠',
      title: '--ultrathink',
      description: 'Maximum reasoning depth for complex architectural decisions'
    },
    {
      icon: '🔄',
      title: '--seq',
      description: 'Sequential reasoning for step-by-step problem solving'
    },
    {
      icon: '⚡',
      title: '--uc',
      description: 'Ultra-compressed mode for token optimization in large codebases'
    }
  ]

  const WorkflowCard = ({ title, description, workflow }: any) => (
    <Card className="p-6">
      <h4 className="text-xl font-semibold text-primary mb-2">{title}</h4>
      <p className="text-text-secondary mb-4">{description}</p>
      <CodeBlock 
        code={workflow}
        language="bash"
        copyButton={true}
      />
    </Card>
  )

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-gradient">🏢 Enterprise-Grade Workflows</h2>
        
        <div className="space-y-8">
          {enterpriseWorkflows.map((workflow, index) => (
            <WorkflowCard key={index} {...workflow} />
          ))}
        </div>
      </Card>

      <Card className="p-8">
        <h3 className="text-2xl font-bold mb-6 text-primary">🛡️ Special Flags for Enterprise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enterpriseFlags.map((flag, index) => (
            <FeatureCard key={index} {...flag} />
          ))}
        </div>
      </Card>
    </div>
  )
}