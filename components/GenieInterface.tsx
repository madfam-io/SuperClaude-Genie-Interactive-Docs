'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { CodeBlock } from './ui/CodeBlock'
import { useNotification } from './NotificationProvider'

export function GenieInterface() {
  const [request, setRequest] = useState('')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [phase, setPhase] = useState('development')
  const [commands, setCommands] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const { showNotification } = useNotification()

  const techStack = [
    'react', 'vue', 'node', 'typescript', 'express', 
    'next', 'docker', 'postgres', 'graphql', 'tailwind'
  ]

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  const generateCommands = async () => {
    if (!request.trim()) {
      showNotification('Please describe your development challenge', 'warning')
      return
    }

    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simple command generation based on keywords
    const generatedCommands: string[] = []
    const requestLower = request.toLowerCase()

    if (requestLower.includes('build') || requestLower.includes('create')) {
      generatedCommands.push('/build --feature --complete --persona-frontend --magic')
    }
    if (requestLower.includes('performance') || requestLower.includes('slow')) {
      generatedCommands.push('/analyze --performance --profile --persona-performance --seq')
      generatedCommands.push('/improve --performance --optimization --uc')
    }
    if (requestLower.includes('test')) {
      generatedCommands.push('/test --comprehensive --coverage --persona-qa')
    }
    if (requestLower.includes('deploy')) {
      generatedCommands.push('/deploy --production --verify --persona-architect')
    }

    // Add tech-specific flags
    selectedTech.forEach(tech => {
      if (generatedCommands.length > 0) {
        generatedCommands[0] += ` --${tech}`
      }
    })

    if (generatedCommands.length === 0) {
      generatedCommands.push('/analyze --project --comprehensive --persona-architect')
    }

    setCommands(generatedCommands)
    setIsGenerating(false)
    showNotification('Commands generated successfully!', 'success')
  }

  return (
    <Card className="p-8 mt-12" id="genie-interface">
      <h2 className="text-3xl font-bold mb-6 text-gradient">🧞 SuperClaude Genie Interface</h2>
      <p className="text-lg text-text-secondary mb-8">
        Describe your development challenge and get intelligent SuperClaude commands
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              What do you want to accomplish?
            </label>
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Describe your development challenge, tech stack, and goals..."
              className="w-full h-32 px-4 py-3 bg-bg-light border border-white/10 rounded-lg text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Tech Stack:
            </label>
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTech.includes(tech)
                      ? 'bg-primary text-white'
                      : 'bg-bg-card text-text-secondary hover:bg-primary/20'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Project Phase:
            </label>
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="w-full px-4 py-3 bg-bg-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="planning">Planning & Design</option>
              <option value="development">Development</option>
              <option value="debugging">Debugging & Troubleshooting</option>
              <option value="testing">Testing & QA</option>
              <option value="optimization">Performance Optimization</option>
              <option value="deployment">Deployment & CI/CD</option>
            </select>
          </div>

          <button
            onClick={generateCommands}
            disabled={isGenerating}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              '✨ Generate SuperClaude Commands'
            )}
          </button>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-primary mb-4">🎯 Your SuperClaude Magic</h4>
          {commands.length > 0 ? (
            <div className="space-y-4">
              {commands.map((command, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Step {index + 1}</span>
                  </div>
                  <CodeBlock 
                    code={command}
                    language="bash"
                    copyButton={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-dark rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🧞</div>
              <p className="text-text-muted">
                Describe your development needs above, and I'll generate the perfect SuperClaude commands for you!
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}