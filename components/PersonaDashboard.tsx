'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { useNotification } from './NotificationProvider'

export function PersonaDashboard() {
  const [selectedPersona, setSelectedPersona] = useState('frontend')
  const { showNotification } = useNotification()

  const personas = [
    {
      id: 'architect',
      icon: '🏗️',
      name: 'Solutions Architect',
      description: 'System design, patterns, scalability',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'frontend',
      icon: '🎨',
      name: 'Frontend Developer',
      description: 'UI/UX, components, styling, interactivity',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: 'backend',
      icon: '⚙️',
      name: 'Backend Developer',
      description: 'APIs, databases, server logic, performance',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'security',
      icon: '🔒',
      name: 'Security Engineer',
      description: 'Security audits, vulnerabilities, compliance',
      gradient: 'from-red-500 to-pink-500'
    }
  ]

  const selectPersona = (personaId: string) => {
    setSelectedPersona(personaId)
    const persona = personas.find(p => p.id === personaId)
    showNotification(`Switched to ${persona?.name} persona`, 'success')
  }

  return (
    <Card className="p-8 mt-12" id="persona-dashboard">
      <h2 className="text-3xl font-bold mb-6 text-gradient">🎭 Persona Dashboard</h2>
      <p className="text-lg text-text-secondary mb-8">
        Choose your development focus for personalized command suggestions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personas.map((persona) => (
          <div
            key={persona.id}
            onClick={() => selectPersona(persona.id)}
            className={`
              p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
              ${selectedPersona === persona.id 
                ? 'border-primary bg-primary/10 scale-105' 
                : 'border-white/10 hover:border-primary/50 hover:scale-102'
              }
            `}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${persona.gradient} flex items-center justify-center text-2xl`}>
                {persona.icon}
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                {persona.name}
              </h4>
              <p className="text-text-secondary text-sm">
                {persona.description}
              </p>
              <button className={`
                mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedPersona === persona.id 
                  ? 'bg-primary text-white' 
                  : 'bg-bg-card text-text-secondary hover:bg-primary hover:text-white'
                }
              `}>
                {selectedPersona === persona.id ? '✓ Selected' : 'Select Persona'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}