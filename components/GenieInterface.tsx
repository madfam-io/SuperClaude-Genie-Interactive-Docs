'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui'
import { CodeBlock } from './ui/CodeBlock'
import { useNotification } from './NotificationProvider'
import { useSupeClaudeAPI } from '@/lib/api-client'
import { GenerateCommandsRequest, PersonaContext } from '@/lib/types'

export function GenieInterface() {
  const [request, setRequest] = useState('')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [phase, setPhase] = useState('development')
  const [selectedPersona, setSelectedPersona] = useState('architect')
  const [commands, setCommands] = useState<string[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [personas, setPersonas] = useState<PersonaContext[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)

  const { showNotification } = useNotification()
  const api = useSupeClaudeAPI()

  const techStack = [
    'react', 'vue', 'node', 'typescript', 'express', 
    'next', 'docker', 'postgres', 'graphql', 'tailwind',
    'python', 'django', 'fastapi', 'redis', 'mongodb',
    'kubernetes', 'aws', 'azure', 'gcp', 'vercel'
  ]

  // Initialize session and load personas
  useEffect(() => {
    const initializeAPI = async () => {
      try {
        // Initialize session
        const session = await api.initializeSession({
          techStack: selectedTech,
          projectPhase: phase
        })
        setSessionId(session.id)

        // Load available personas
        const availablePersonas = await api.client.getPersonas()
        setPersonas(availablePersonas)
      } catch (error) {
        console.error('Failed to initialize API:', error)
        showNotification('Failed to connect to SuperClaude API', 'error')
      }
    }

    initializeAPI()
  }, [api, selectedTech, phase, showNotification])

  // Update session context when tech stack or phase changes
  useEffect(() => {
    if (sessionId) {
      api.client.updateContext({
        techStack: selectedTech,
        projectPhase: phase,
        lastRequest: request
      })
    }
  }, [selectedTech, phase, sessionId, request, api.client])

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
    setCommands([])
    setStreamingText('')

    try {
      const generateRequest: GenerateCommandsRequest = {
        prompt: request.trim(),
        techStack: selectedTech,
        projectPhase: phase,
        persona: selectedPersona as any,
        sessionId: sessionId || undefined,
        maxCommands: 4
      }

      // Use streaming for real-time feedback
      let fullResponse = ''
      await api.generateCommandsStream(
        generateRequest,
        (chunk: string) => {
          fullResponse += chunk
          setStreamingText(fullResponse)
        },
        () => {
          // Parse the completed response for commands
          const commandMatches = fullResponse.match(/```bash\n([^`]+)```/g)
          if (commandMatches) {
            const extractedCommands = commandMatches.map(match => 
              match.replace(/```bash\n|```/g, '').trim()
            )
            setCommands(extractedCommands)
          } else {
            // Fallback: look for lines starting with /
            const lines = fullResponse.split('\n')
            const commandLines = lines.filter(line => 
              line.trim().startsWith('/') && line.includes('--')
            )
            if (commandLines.length > 0) {
              setCommands(commandLines)
            }
          }
          
          setIsGenerating(false)
          setStreamingText('')
          showNotification('Commands generated successfully!', 'success')
        },
        (error: Error) => {
          console.error('Command generation error:', error)
          setIsGenerating(false)
          setStreamingText('')
          
          if (api.isAPIError(error)) {
            showNotification(`API Error: ${error.message}`, 'error')
          } else {
            showNotification('Failed to generate commands. Please try again.', 'error')
          }
        }
      )
    } catch (error) {
      console.error('Command generation error:', error)
      setIsGenerating(false)
      setStreamingText('')
      showNotification('Failed to generate commands. Please try again.', 'error')
    }
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

          <div>
            <label className="block text-text-primary font-medium mb-2">
              AI Persona:
            </label>
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="w-full px-4 py-3 bg-bg-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {personas.map(persona => (
                <option key={persona.id} value={persona.id}>
                  {persona.name} - {persona.expertise.slice(0, 50)}...
                </option>
              ))}
            </select>
            {personas.find(p => p.id === selectedPersona) && (
              <p className="text-sm text-text-muted mt-1">
                {personas.find(p => p.id === selectedPersona)?.description}
              </p>
            )}
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
          
          {/* Streaming Response Display */}
          {isGenerating && streamingText && (
            <div className="mb-4 p-4 bg-bg-dark rounded-lg border border-primary/20">
              <div className="flex items-center mb-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                <span className="text-sm text-primary">AI is thinking...</span>
              </div>
              <div className="text-sm text-text-secondary whitespace-pre-wrap">
                {streamingText}
              </div>
            </div>
          )}
          
          {/* Generated Commands */}
          {commands.length > 0 ? (
            <div className="space-y-4">
              {commands.map((command, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Step {index + 1}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(command)
                        showNotification('Command copied to clipboard!', 'success')
                      }}
                      className="text-xs px-2 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <CodeBlock 
                    code={command}
                    language="bash"
                    copyButton={true}
                  />
                </div>
              ))}
              
              {/* Additional Actions */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const allCommands = commands.join('\n')
                      navigator.clipboard.writeText(allCommands)
                      showNotification('All commands copied!', 'success')
                    }}
                    className="px-3 py-1 text-sm bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                  >
                    📋 Copy All
                  </button>
                  <button
                    onClick={() => {
                      setCommands([])
                      setRequest('')
                      showNotification('Interface reset', 'info')
                    }}
                    className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-bg-dark rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🧞</div>
              <p className="text-text-muted mb-2">
                Describe your development needs above, and I'll generate the perfect SuperClaude commands for you!
              </p>
              {sessionId && (
                <p className="text-xs text-text-muted opacity-70">
                  Session: {sessionId.slice(0, 8)}...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}