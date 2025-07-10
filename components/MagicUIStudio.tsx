'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { CodeBlock } from './ui/CodeBlock'
import { useNotification } from './NotificationProvider'

export function MagicUIStudio() {
  const [componentType, setComponentType] = useState('button')
  const [framework, setFramework] = useState('react')
  const [description, setDescription] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('code')

  const { showNotification } = useNotification()

  const generateComponent = async () => {
    if (!description.trim()) {
      showNotification('Please describe the component you want to create', 'warning')
      return
    }

    setIsGenerating(true)

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate sample component based on selection
    let code = ''
    
    if (framework === 'react' && componentType === 'button') {
      code = `import React from 'react'

interface MagicButtonProps {
  text?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const MagicButton: React.FC<MagicButtonProps> = ({ 
  text = 'Click me', 
  variant = 'primary', 
  disabled = false, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={\`magic-button \${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children || text}
    </button>
  )
}

export default MagicButton`
    } else if (framework === 'vue' && componentType === 'button') {
      code = `<template>
  <button 
    class="magic-button" 
    :class="variant"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: 'MagicButton',
  props: {
    text: {
      type: String,
      default: 'Click me'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.magic-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}
</style>`
    } else {
      code = `// Generated ${componentType} component for ${framework}
// Description: ${description}

// This is a placeholder implementation
// The actual Magic UI generation would create
// a fully functional component based on your description`
    }

    setGeneratedCode(code)
    setIsGenerating(false)
    showNotification('🪄 Magic component generated!', 'success')
  }

  return (
    <Card className="p-8 mt-12" id="magic-ui-studio">
      <h2 className="text-3xl font-bold mb-6 text-gradient">✨ Magic UI Studio</h2>
      <p className="text-lg text-text-secondary mb-8">
        Generate and preview UI components with AI assistance
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Component Type:
              </label>
              <select
                value={componentType}
                onChange={(e) => setComponentType(e.target.value)}
                className="w-full px-4 py-3 bg-bg-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="button">Button</option>
                <option value="card">Card</option>
                <option value="form">Form</option>
                <option value="navigation">Navigation</option>
                <option value="modal">Modal</option>
                <option value="table">Data Table</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Framework:
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full px-4 py-3 bg-bg-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="react">React</option>
                <option value="vue">Vue.js</option>
                <option value="svelte">Svelte</option>
                <option value="html">HTML/CSS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Description & Requirements:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the component you want to create..."
              className="w-full h-32 px-4 py-3 bg-bg-light border border-white/10 rounded-lg text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={generateComponent}
            disabled={isGenerating}
            className="w-full px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200 disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              '🪄 Generate Component'
            )}
          </button>
        </div>

        <div>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'code' 
                  ? 'bg-primary text-white' 
                  : 'bg-bg-card text-text-secondary hover:bg-primary/20'
              }`}
            >
              💻 Code
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'preview' 
                  ? 'bg-primary text-white' 
                  : 'bg-bg-card text-text-secondary hover:bg-primary/20'
              }`}
            >
              👁️ Preview
            </button>
          </div>

          {activeTab === 'code' && (
            <div>
              {generatedCode ? (
                <CodeBlock 
                  code={generatedCode}
                  language={framework === 'react' ? 'typescript' : framework}
                  title="Generated Component"
                  copyButton={true}
                />
              ) : (
                <div className="bg-bg-dark rounded-lg p-8 text-center border border-white/10">
                  <div className="text-4xl mb-4">🪄</div>
                  <p className="text-text-muted">
                    Your generated component code will appear here
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-bg-dark rounded-lg p-8 text-center border border-white/10 h-64 flex items-center justify-center">
              <div>
                <div className="text-4xl mb-4">👁️</div>
                <p className="text-text-muted">
                  Component preview will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}