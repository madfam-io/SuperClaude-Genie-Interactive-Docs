'use client'

import { Card } from '../ui/card'
import { FeatureCard } from '../ui/FeatureCard'
import { CodeBlock } from '../ui/CodeBlock'

export function OverviewTab() {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Commands',
      description: 'Get ready-to-use SuperClaude commands for any development task'
    },
    {
      icon: '🎯',
      title: 'Perfect Personas',
      description: 'Automatically selects the right persona for maximum effectiveness'
    },
    {
      icon: '🔗',
      title: 'Smart Workflows',
      description: 'Chains multiple commands for complex development workflows'
    }
  ]

  const quickStartPrompt = `You are SuperClaude Genie 🧞, an expert assistant specialized in generating precise SuperClaude commands for developers. You have mastered all 19 commands, 9 personas, and every flag combination...`

  return (
    <div className="space-y-8">
      <Card id="getting-started" className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-gradient">🚀 What is SuperClaude Genie?</h2>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          SuperClaude Genie is an AI assistant prompt that transforms any AI into an expert SuperClaude command generator. 
          It knows all 19 commands, 9 personas, and every flag combination to help you build, debug, and scale any codebase.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </Card>

      <Card className="p-8">
        <h3 className="text-2xl font-bold mb-6 text-primary">🎯 Quick Start</h3>
        <ol className="space-y-4 text-text-secondary text-lg mb-6">
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">1</span>
            Copy the SuperClaude Genie prompt
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">2</span>
            Paste into Claude, ChatGPT, or any AI assistant
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">3</span>
            Describe your project and needs
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">4</span>
            Receive optimized SuperClaude commands
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">5</span>
            Copy-paste into your CLI and watch the magic! ✨
          </li>
        </ol>
        
        <CodeBlock 
          code={quickStartPrompt}
          language="text"
          title="SuperClaude Genie Prompt"
          copyButton={true}
        />
      </Card>
    </div>
  )
}