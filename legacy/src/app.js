/**
 * SuperClaude Genie Interactive Docs - Main Application
 * WebApp with attachment integration, genie prompts, and Magic UI
 */

class SuperClaudeGenieApp {
    constructor() {
        this.state = {
            attachments: [],
            currentPrompt: null,
            generatedUI: [],
            persona: 'frontend',
            mcpConnections: {
                context7: false,
                magic: false,
                codeReasoning: false,
                playwright: false,
                browser: false
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAttachmentSystem();
        this.initializeGeniePrompts();
        this.initializeMCPIntegration();
        this.setupPersonaSelector();
        console.log('🧞 SuperClaude Genie WebApp initialized');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeUI();
        });
    }

    initializeUI() {
        // Create main app container
        const appContainer = document.createElement('div');
        appContainer.id = 'superclaude-genie-app';
        appContainer.className = 'genie-app-container';
        
        // Insert after existing content
        const mainContent = document.querySelector('main') || document.body;
        mainContent.appendChild(appContainer);
        
        this.renderAttachmentInterface();
        this.renderGenieInterface();
        this.renderMagicUIGenerator();
        this.renderPersonaSelector();
    }

    renderAttachmentInterface() {
        const attachmentHTML = `
            <section class="attachment-section" id="attachment-interface">
                <div class="section-header">
                    <h3>📎 Attachment Integration</h3>
                    <p>Upload files, images, and documents to enhance your SuperClaude experience</p>
                </div>
                
                <div class="attachment-dropzone" id="attachment-dropzone">
                    <div class="dropzone-content">
                        <div class="upload-icon">📁</div>
                        <h4>Drag & Drop Files Here</h4>
                        <p>or click to browse</p>
                        <input type="file" id="file-input" multiple accept="*/*" hidden>
                        <div class="supported-formats">
                            <span>Supports: Images, Documents, Code files, Archives</span>
                        </div>
                    </div>
                </div>
                
                <div class="attachment-list" id="attachment-list">
                    <h4>Uploaded Attachments</h4>
                    <div class="attachments-grid" id="attachments-grid">
                        <!-- Dynamically populated -->
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', attachmentHTML);
    }

    initializeAttachmentSystem() {
        // Setup drag and drop functionality
        const dropzone = document.getElementById('attachment-dropzone');
        const fileInput = document.getElementById('file-input');
        
        if (!dropzone) return;
        
        // Click to browse
        dropzone.addEventListener('click', () => {
            fileInput?.click();
        });
        
        // Drag and drop events
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
        
        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });
        
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
        
        // File input change
        fileInput?.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    handleFiles(files) {
        Array.from(files).forEach(file => {
            this.processFile(file);
        });
    }

    async processFile(file) {
        const attachment = {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            preview: null,
            processed: false,
            metadata: {}
        };

        // Generate preview for images
        if (file.type.startsWith('image/')) {
            attachment.preview = await this.generateImagePreview(file);
        }

        // Extract metadata based on file type
        attachment.metadata = await this.extractFileMetadata(file);

        this.state.attachments.push(attachment);
        this.renderAttachment(attachment);
        
        // Process with Context7 MCP if available
        this.processWithMCP(attachment, file);
    }

    generateImagePreview(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    async extractFileMetadata(file) {
        const metadata = {
            extension: file.name.split('.').pop()?.toLowerCase(),
            sizeFormatted: this.formatFileSize(file.size),
            uploadTime: new Date().toISOString()
        };

        // Add specific metadata based on file type
        if (file.type.startsWith('text/') || metadata.extension === 'md') {
            try {
                const content = await file.text();
                metadata.lineCount = content.split('\n').length;
                metadata.wordCount = content.split(/\s+/).length;
                metadata.characterCount = content.length;
            } catch (e) {
                console.warn('Could not extract text metadata:', e);
            }
        }

        return metadata;
    }

    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    renderAttachment(attachment) {
        const attachmentsGrid = document.getElementById('attachments-grid');
        if (!attachmentsGrid) return;

        const attachmentElement = document.createElement('div');
        attachmentElement.className = 'attachment-item';
        attachmentElement.dataset.id = attachment.id;

        const previewContent = attachment.preview ? 
            `<img src="${attachment.preview}" alt="${attachment.name}" class="attachment-preview">` :
            `<div class="attachment-icon">${this.getFileIcon(attachment.type)}</div>`;

        attachmentElement.innerHTML = `
            <div class="attachment-card">
                <div class="attachment-preview-container">
                    ${previewContent}
                </div>
                <div class="attachment-info">
                    <h5 class="attachment-name" title="${attachment.name}">${attachment.name}</h5>
                    <div class="attachment-meta">
                        <span class="file-size">${attachment.metadata.sizeFormatted}</span>
                        <span class="file-type">${attachment.metadata.extension?.toUpperCase() || 'FILE'}</span>
                    </div>
                    ${attachment.metadata.lineCount ? `<div class="text-meta">${attachment.metadata.lineCount} lines</div>` : ''}
                </div>
                <div class="attachment-actions">
                    <button class="btn-icon analyze-btn" title="Analyze with Context7" data-action="analyze">🔍</button>
                    <button class="btn-icon generate-ui-btn" title="Generate UI with Magic" data-action="generate-ui">✨</button>
                    <button class="btn-icon remove-btn" title="Remove" data-action="remove">🗑️</button>
                </div>
            </div>
        `;

        // Add event listeners for actions
        attachmentElement.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action) {
                this.handleAttachmentAction(action, attachment);
            }
        });

        attachmentsGrid.appendChild(attachmentElement);
    }

    getFileIcon(type) {
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('text/')) return '📄';
        if (type.includes('pdf')) return '📕';
        if (type.includes('zip') || type.includes('archive')) return '📦';
        if (type.includes('javascript') || type.includes('json')) return '⚡';
        if (type.includes('html')) return '🌐';
        if (type.includes('css')) return '🎨';
        return '📁';
    }

    async handleAttachmentAction(action, attachment) {
        switch (action) {
            case 'analyze':
                await this.analyzeWithContext7(attachment);
                break;
            case 'generate-ui':
                await this.generateUIWithMagic(attachment);
                break;
            case 'remove':
                this.removeAttachment(attachment.id);
                break;
        }
    }

    async analyzeWithContext7(attachment) {
        try {
            // Simulate Context7 MCP integration
            console.log('🔍 Analyzing with Context7:', attachment.name);
            
            const analysis = {
                summary: `Analysis of ${attachment.name}`,
                insights: [
                    'File structure detected',
                    'Compatible with SuperClaude workflows',
                    'Recommended commands identified'
                ],
                suggestedCommands: [
                    '/analyze --code --structure',
                    '/improve --performance --optimize',
                    '/document --auto --comprehensive'
                ]
            };

            this.showAnalysisResults(analysis, attachment);
        } catch (error) {
            console.error('Context7 analysis failed:', error);
            this.showNotification('Analysis failed. Please check MCP connection.', 'error');
        }
    }

    async generateUIWithMagic(attachment) {
        try {
            console.log('✨ Generating UI with Magic MCP:', attachment.name);
            
            // Simulate Magic MCP UI generation
            const uiComponent = {
                id: Date.now(),
                name: `Generated from ${attachment.name}`,
                type: 'component',
                framework: 'vue',
                code: this.generateSampleComponent(attachment),
                preview: null
            };

            this.state.generatedUI.push(uiComponent);
            this.showUIGenerationResults(uiComponent);
        } catch (error) {
            console.error('Magic UI generation failed:', error);
            this.showNotification('UI generation failed. Please check MCP connection.', 'error');
        }
    }

    generateSampleComponent(attachment) {
        return `<template>
  <div class="generated-component">
    <h3>Component for ${attachment.name}</h3>
    <div class="file-info">
      <p>Size: ${attachment.metadata.sizeFormatted}</p>
      <p>Type: ${attachment.type}</p>
      ${attachment.metadata.lineCount ? `<p>Lines: ${attachment.metadata.lineCount}</p>` : ''}
    </div>
    <div class="actions">
      <button @click="processFile">Process File</button>
      <button @click="downloadFile">Download</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneratedFileComponent',
  props: {
    fileData: Object
  },
  methods: {
    processFile() {
      console.log('Processing file:', this.fileData);
    },
    downloadFile() {
      console.log('Downloading file:', this.fileData);
    }
  }
}
</script>

<style scoped>
.generated-component {
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 1rem;
  background: var(--bg-card);
}

.file-info {
  margin: 1rem 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: var(--primary);
  color: white;
  cursor: pointer;
}

.actions button:hover {
  background: var(--primary-dark);
}
</style>`;
    }

    removeAttachment(id) {
        this.state.attachments = this.state.attachments.filter(att => att.id !== id);
        const element = document.querySelector(`[data-id="${id}"]`);
        element?.remove();
        this.showNotification('Attachment removed', 'success');
    }

    renderGenieInterface() {
        const genieHTML = `
            <section class="genie-section" id="genie-interface">
                <div class="section-header">
                    <h3>🧞 SuperClaude Genie</h3>
                    <p>Transform your needs into ready-to-execute SuperClaude commands</p>
                </div>
                
                <div class="genie-prompt-builder">
                    <div class="input-group">
                        <label for="tech-stack">Tech Stack</label>
                        <select id="tech-stack" multiple>
                            <option value="react">React</option>
                            <option value="vue">Vue.js</option>
                            <option value="node">Node.js</option>
                            <option value="express">Express</option>
                            <option value="typescript">TypeScript</option>
                            <option value="tailwind">Tailwind CSS</option>
                            <option value="docker">Docker</option>
                            <option value="postgres">PostgreSQL</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label for="current-task">Current Task</label>
                        <textarea id="current-task" placeholder="Describe what you're trying to accomplish..."></textarea>
                    </div>
                    
                    <div class="input-group">
                        <label for="project-phase">Project Phase</label>
                        <select id="project-phase">
                            <option value="development">Development</option>
                            <option value="debugging">Debugging</option>
                            <option value="testing">Testing</option>
                            <option value="deployment">Deployment</option>
                            <option value="optimization">Optimization</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    
                    <button id="generate-commands" class="btn-primary genie-generate-btn">
                        ✨ Generate SuperClaude Commands
                    </button>
                </div>
                
                <div class="genie-results" id="genie-results" style="display: none;">
                    <h4>🎯 Your SuperClaude Magic:</h4>
                    <div class="generated-commands" id="generated-commands">
                        <!-- Dynamically populated -->
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', genieHTML);
    }

    initializeGeniePrompts() {
        const generateBtn = document.getElementById('generate-commands');
        generateBtn?.addEventListener('click', () => {
            this.generateGenieCommands();
        });
    }

    async generateGenieCommands() {
        const techStack = Array.from(document.getElementById('tech-stack').selectedOptions).map(o => o.value);
        const currentTask = document.getElementById('current-task').value;
        const projectPhase = document.getElementById('project-phase').value;

        if (!currentTask.trim()) {
            this.showNotification('Please describe your current task', 'warning');
            return;
        }

        // Use Code Reasoning MCP for intelligent command generation
        const commands = await this.generateCommandsWithReasoning(techStack, currentTask, projectPhase);
        this.displayGeneratedCommands(commands);
    }

    async generateCommandsWithReasoning(techStack, task, phase) {
        // Simulate Code Reasoning MCP integration for command generation
        console.log('🧠 Generating commands with Code Reasoning MCP');
        
        const commandMap = {
            development: {
                react: ['/build --component --react --persona-frontend --magic'],
                vue: ['/build --component --vue --persona-frontend --magic'],
                node: ['/build --api --node --express --persona-backend'],
                typescript: ['/analyze --types --strict --persona-analyzer']
            },
            debugging: {
                react: ['/troubleshoot --react --components --persona-analyzer --seq'],
                vue: ['/troubleshoot --vue --components --persona-analyzer --seq'],
                node: ['/troubleshoot --api --performance --persona-performance']
            },
            testing: {
                react: ['/test --unit --component --react --persona-qa'],
                vue: ['/test --unit --component --vue --persona-qa'],
                node: ['/test --api --integration --persona-qa --pup']
            }
        };

        const baseCommands = [];
        techStack.forEach(tech => {
            const phaseCommands = commandMap[phase]?.[tech];
            if (phaseCommands) {
                baseCommands.push(...phaseCommands);
            }
        });

        // Add task-specific commands based on keywords
        const taskLower = task.toLowerCase();
        if (taskLower.includes('performance') || taskLower.includes('slow')) {
            baseCommands.push('/analyze --performance --profile --persona-performance --seq');
        }
        if (taskLower.includes('security') || taskLower.includes('auth')) {
            baseCommands.push('/scan --security --audit --persona-security');
        }
        if (taskLower.includes('deploy') || taskLower.includes('production')) {
            baseCommands.push('/deploy --production --verify --persona-architect');
        }

        return baseCommands.length > 0 ? baseCommands : ['/analyze --project --comprehensive --persona-architect'];
    }

    displayGeneratedCommands(commands) {
        const resultsSection = document.getElementById('genie-results');
        const commandsContainer = document.getElementById('generated-commands');
        
        if (!resultsSection || !commandsContainer) return;

        commandsContainer.innerHTML = '';
        
        commands.forEach((command, index) => {
            const commandElement = document.createElement('div');
            commandElement.className = 'command-result';
            commandElement.innerHTML = `
                <div class="command-header">
                    <span class="command-number">${index + 1}</span>
                    <code class="command-text">${command}</code>
                    <button class="copy-btn" data-command="${command}">📋</button>
                </div>
                <div class="command-description">
                    <p>${this.getCommandDescription(command)}</p>
                </div>
            `;
            
            commandsContainer.appendChild(commandElement);
        });

        // Add copy functionality
        commandsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                const command = e.target.dataset.command;
                navigator.clipboard.writeText(command);
                this.showNotification('Command copied to clipboard!', 'success');
            }
        });

        resultsSection.style.display = 'block';
    }

    getCommandDescription(command) {
        const descriptions = {
            '/build': 'Creates new code, components, or features based on your specifications',
            '/analyze': 'Analyzes your codebase for issues, patterns, and optimization opportunities',
            '/test': 'Sets up or runs tests for your project with appropriate frameworks',
            '/troubleshoot': 'Debugs issues and provides solutions for common problems',
            '/scan': 'Performs security audits and vulnerability assessments',
            '/deploy': 'Handles deployment processes and production setup'
        };

        const mainCommand = command.split(' ')[0];
        return descriptions[mainCommand] || 'Executes the specified SuperClaude operation';
    }

    renderMagicUIGenerator() {
        const magicHTML = `
            <section class="magic-ui-section" id="magic-ui-interface">
                <div class="section-header">
                    <h3>✨ Magic UI Generator</h3>
                    <p>Generate beautiful UI components with AI assistance</p>
                </div>
                
                <div class="ui-generator-controls">
                    <div class="input-group">
                        <label for="component-type">Component Type</label>
                        <select id="component-type">
                            <option value="button">Button</option>
                            <option value="card">Card</option>
                            <option value="form">Form</option>
                            <option value="navigation">Navigation</option>
                            <option value="modal">Modal</option>
                            <option value="table">Table</option>
                            <option value="dashboard">Dashboard</option>
                            <option value="hero">Hero Section</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label for="ui-framework">Framework</label>
                        <select id="ui-framework">
                            <option value="vue">Vue.js</option>
                            <option value="react">React</option>
                            <option value="html">HTML/CSS</option>
                            <option value="tailwind">Tailwind CSS</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label for="ui-description">Description</label>
                        <textarea id="ui-description" placeholder="Describe the component you want to generate..."></textarea>
                    </div>
                    
                    <button id="generate-ui" class="btn-primary magic-generate-btn">
                        🪄 Generate Component
                    </button>
                </div>
                
                <div class="ui-preview" id="ui-preview">
                    <div class="preview-tabs">
                        <button class="tab-btn active" data-tab="code">Code</button>
                        <button class="tab-btn" data-tab="preview">Preview</button>
                    </div>
                    <div class="preview-content">
                        <div class="tab-content active" id="code-tab">
                            <pre><code id="generated-code">// Generated code will appear here</code></pre>
                        </div>
                        <div class="tab-content" id="preview-tab">
                            <iframe id="preview-frame" style="width: 100%; height: 400px; border: none;"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', magicHTML);
    }

    renderPersonaSelector() {
        const personaHTML = `
            <section class="persona-section" id="persona-selector">
                <div class="section-header">
                    <h3>🎭 Frontend Persona</h3>
                    <p>Select your development focus for personalized assistance</p>
                </div>
                
                <div class="persona-grid">
                    <div class="persona-card ${this.state.persona === 'frontend' ? 'active' : ''}" data-persona="frontend">
                        <div class="persona-icon">🎨</div>
                        <h4>Frontend Developer</h4>
                        <p>UI/UX, components, styling, interactivity</p>
                    </div>
                    
                    <div class="persona-card" data-persona="backend">
                        <div class="persona-icon">⚙️</div>
                        <h4>Backend Developer</h4>
                        <p>APIs, databases, server logic, performance</p>
                    </div>
                    
                    <div class="persona-card" data-persona="architect">
                        <div class="persona-icon">🏗️</div>
                        <h4>Solutions Architect</h4>
                        <p>System design, patterns, scalability</p>
                    </div>
                    
                    <div class="persona-card" data-persona="security">
                        <div class="persona-icon">🔒</div>
                        <h4>Security Engineer</h4>
                        <p>Security audits, vulnerabilities, compliance</p>
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', personaHTML);
    }

    setupPersonaSelector() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.persona-card')) {
                const card = e.target.closest('.persona-card');
                const persona = card.dataset.persona;
                this.selectPersona(persona);
            }
        });
    }

    selectPersona(persona) {
        // Update active state
        document.querySelectorAll('.persona-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-persona="${persona}"]`)?.classList.add('active');
        
        this.state.persona = persona;
        this.showNotification(`Switched to ${persona} persona`, 'success');
    }

    async initializeMCPIntegration() {
        console.log('🔌 Initializing MCP integrations...');
        
        // Simulate MCP connection checks
        const mcpServers = ['context7', 'magic', 'codeReasoning', 'playwright', 'browser'];
        
        for (const server of mcpServers) {
            try {
                // Simulate connection check
                await new Promise(resolve => setTimeout(resolve, 100));
                this.state.mcpConnections[server] = true;
                console.log(`✅ ${server} MCP connected`);
            } catch (error) {
                console.warn(`❌ ${server} MCP connection failed:`, error);
                this.state.mcpConnections[server] = false;
            }
        }
    }

    async processWithMCP(attachment, file) {
        if (this.state.mcpConnections.context7) {
            try {
                // Simulate Context7 processing
                console.log('📖 Processing with Context7 MCP:', attachment.name);
                attachment.processed = true;
                attachment.context7Analysis = {
                    documentType: this.detectDocumentType(file),
                    relevantCommands: this.suggestRelevantCommands(file),
                    contextualInfo: 'File analyzed and indexed for contextual assistance'
                };
            } catch (error) {
                console.error('Context7 processing failed:', error);
            }
        }
    }

    detectDocumentType(file) {
        const extension = file.name.split('.').pop()?.toLowerCase();
        const typeMap = {
            'md': 'markdown-documentation',
            'js': 'javascript-source',
            'ts': 'typescript-source',
            'vue': 'vue-component',
            'jsx': 'react-component',
            'html': 'html-template',
            'css': 'stylesheet',
            'json': 'configuration',
            'yml': 'configuration',
            'yaml': 'configuration'
        };
        return typeMap[extension] || 'unknown';
    }

    suggestRelevantCommands(file) {
        const extension = file.name.split('.').pop()?.toLowerCase();
        const commandMap = {
            'js': ['/analyze --javascript --performance', '/improve --code-quality'],
            'ts': ['/analyze --typescript --strict', '/build --typescript'],
            'vue': ['/build --component --vue --persona-frontend', '/test --vue --component'],
            'jsx': ['/build --component --react --persona-frontend', '/test --react --component'],
            'css': ['/analyze --styles --performance', '/improve --css --optimization'],
            'md': ['/document --markdown --enhance', '/analyze --documentation']
        };
        return commandMap[extension] || ['/analyze --file --general'];
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showAnalysisResults(analysis, attachment) {
        const modal = document.createElement('div');
        modal.className = 'analysis-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔍 Analysis Results - ${attachment.name}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="analysis-summary">
                        <h4>Summary</h4>
                        <p>${analysis.summary}</p>
                    </div>
                    <div class="analysis-insights">
                        <h4>Insights</h4>
                        <ul>
                            ${analysis.insights.map(insight => `<li>${insight}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="suggested-commands">
                        <h4>Suggested Commands</h4>
                        <div class="command-list">
                            ${analysis.suggestedCommands.map(cmd => `
                                <div class="command-suggestion">
                                    <code>${cmd}</code>
                                    <button class="copy-btn" data-command="${cmd}">📋</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-btn') || e.target === modal) {
                modal.remove();
            }
            if (e.target.classList.contains('copy-btn')) {
                const command = e.target.dataset.command;
                navigator.clipboard.writeText(command);
                this.showNotification('Command copied!', 'success');
            }
        });
    }

    showUIGenerationResults(component) {
        const codeElement = document.getElementById('generated-code');
        if (codeElement) {
            codeElement.textContent = component.code;
        }
        
        // Show preview
        const previewFrame = document.getElementById('preview-frame');
        if (previewFrame) {
            const previewHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Component Preview</title>
                    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; }
                        ${this.extractStylesFromComponent(component.code)}
                    </style>
                </head>
                <body>
                    <div id="app"></div>
                    <script>
                        const { createApp } = Vue;
                        createApp({
                            template: \`${this.extractTemplateFromComponent(component.code)}\`,
                            data() {
                                return {
                                    fileData: {
                                        name: 'Sample File',
                                        size: '1.2 MB',
                                        type: 'application/pdf'
                                    }
                                };
                            },
                            methods: {
                                processFile() { alert('Processing file...'); },
                                downloadFile() { alert('Downloading file...'); }
                            }
                        }).mount('#app');
                    </script>
                </body>
                </html>
            `;
            
            previewFrame.srcdoc = previewHTML;
        }
        
        this.showNotification('UI component generated successfully!', 'success');
    }

    extractTemplateFromComponent(code) {
        const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/);
        return templateMatch ? templateMatch[1] : '<div>No template found</div>';
    }

    extractStylesFromComponent(code) {
        const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        return styleMatch ? styleMatch[1] : '';
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.superClaudeGenieApp = new SuperClaudeGenieApp();
    });
} else {
    window.superClaudeGenieApp = new SuperClaudeGenieApp();
}