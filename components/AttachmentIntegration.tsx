'use client'

import { useState, useCallback } from 'react'
import { Card } from './ui/card'
import { useNotification } from './NotificationProvider'

interface AttachmentFile {
  id: string
  name: string
  size: number
  type: string
  analysis?: string[]
}

export function AttachmentIntegration() {
  const [files, setFiles] = useState<AttachmentFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const { showNotification } = useNotification()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const processFiles = useCallback((fileList: File[]) => {
    fileList.forEach(file => {
      const attachmentFile: AttachmentFile = {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        analysis: generateAnalysis(file)
      }
      
      setFiles(prev => [...prev, attachmentFile])
      showNotification(`File "${file.name}" uploaded and analyzed`, 'success')
    })
  }, [showNotification])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }, [processFiles])

  const generateAnalysis = (file: File): string[] => {
    const extension = file.name.split('.').pop()?.toLowerCase()
    const analysis = []

    switch (extension) {
      case 'js':
      case 'jsx':
        analysis.push('/analyze --javascript --performance')
        analysis.push('/improve --code-quality --persona-frontend')
        break
      case 'ts':
      case 'tsx':
        analysis.push('/analyze --typescript --strict')
        analysis.push('/build --typescript --persona-frontend')
        break
      case 'vue':
        analysis.push('/build --component --vue --persona-frontend')
        analysis.push('/test --vue --component --persona-qa')
        break
      case 'css':
        analysis.push('/analyze --styles --performance')
        analysis.push('/improve --css --optimization')
        break
      case 'md':
        analysis.push('/document --markdown --enhance')
        analysis.push('/analyze --documentation --persona-mentor')
        break
      default:
        analysis.push('/analyze --file --general --persona-analyzer')
    }

    return analysis
  }

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (type: string): string => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('text/')) return '📄'
    if (type.includes('pdf')) return '📕'
    if (type.includes('javascript')) return '⚡'
    if (type.includes('html')) return '🌐'
    return '📁'
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    showNotification('File removed', 'info')
  }

  return (
    <Card className="p-8 mt-12" id="attachment-integration">
      <h2 className="text-3xl font-bold mb-6 text-gradient">📎 Smart Attachment Integration</h2>
      <p className="text-lg text-text-secondary mb-8">
        Upload files and let AI analyze them for contextual command suggestions
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
              ${isDragOver 
                ? 'border-primary bg-primary/10' 
                : 'border-white/20 hover:border-primary/50'
              }
            `}
          >
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">
              Drop files for intelligent analysis
            </h4>
            <p className="text-text-secondary mb-4">
              Supports: Code files, designs, documentation, configs
            </p>
            <input
              type="file"
              multiple
              onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Choose Files
            </label>
            <div className="mt-4 text-text-muted text-sm">
              AI will suggest relevant commands based on file content
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-primary mb-4">📊 File Analysis & Suggestions</h4>
          {files.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {files.map((file) => (
                <div key={file.id} className="bg-bg-card rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFileIcon(file.type)}</span>
                      <div>
                        <h5 className="font-medium text-text-primary">{file.name}</h5>
                        <p className="text-text-muted text-sm">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-text-muted hover:text-error transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {file.analysis && file.analysis.length > 0 && (
                    <div className="mt-3">
                      <p className="text-text-secondary text-sm mb-2">Suggested commands:</p>
                      <div className="space-y-1">
                        {file.analysis.map((command, index) => (
                          <div key={index} className="bg-bg-dark rounded px-3 py-1 text-sm font-mono text-success">
                            {command}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-dark rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-text-muted">
                Upload files to see intelligent analysis and command suggestions
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}