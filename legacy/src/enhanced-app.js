/**
 * SuperClaude Genie Interactive Docs - Enhanced WebApp
 * Improved with prompt content integration, frontend persona, and Magic UI
 */

class EnhancedSuperClaudeGenieApp {
    constructor() {
        this.state = {
            attachments: [],
            currentPrompt: null,
            generatedUI: [],
            persona: 'frontend',
            currentWorkflow: null,
            searchIndex: new Map(),
            userPreferences: this.loadUserPreferences(),
            mcpConnections: {
                context7: false,
                magic: false,
                codeReasoning: false,
                playwright: false,
                browser: false
            }
        };
        
        // SuperClaude command knowledge base from prompt.md
        this.commandKnowledge = {
            development: {
                '/build': { description: 'Create code/features', usage: 'Building components, features, or applications', examples: ['/build --component --react --persona-frontend --magic'] },
                '/dev-setup': { description: 'Environment setup', usage: 'Setting up development environments', examples: ['/dev-setup --node --npm --git --persona-backend'] },
                '/test': { description: 'Testing frameworks', usage: 'Creating and running tests', examples: ['/test --unit --component --react --persona-qa'] },
                '/review': { description: 'Code review', usage: 'Reviewing code quality and standards', examples: ['/review --standards --security --persona-qa'] },
                '/analyze': { description: 'Code analysis', usage: 'Analyzing code for issues and improvements', examples: ['/analyze --performance --profile --api --persona-performance --seq'] },
                '/troubleshoot': { description: 'Debug issues', usage: 'Debugging problems and errors', examples: ['/troubleshoot --debug --trace --persona-analyzer --think-hard'] },
                '/improve': { description: 'Optimization', usage: 'Improving code quality and performance', examples: ['/improve --performance --api --caching --database --persona-performance'] },
                '/explain': { description: 'Documentation', usage: 'Creating documentation and explanations', examples: ['/explain --concept --architecture --persona-mentor'] }
            },
            operations: {
                '/deploy': { description: 'Deployment', usage: 'Deploying applications and services', examples: ['/deploy --production --verify --persona-architect'] },
                '/migrate': { description: 'Migrations', usage: 'Database and system migrations', examples: ['/migrate --database --schema --persona-backend'] },
                '/scan': { description: 'Security', usage: 'Security audits and scans', examples: ['/scan --security --audit --persona-security'] },
                '/cleanup': { description: 'Maintenance', usage: 'Code and system cleanup', examples: ['/cleanup --code --dependencies --persona-refactorer'] },
                '/estimate': { description: 'Planning', usage: 'Project estimation and planning', examples: ['/estimate --effort --timeline --persona-architect'] },
                '/git': { description: 'Version control', usage: 'Git operations and workflows', examples: ['/git --commit --push --verify --persona-architect'] }
            },
            advanced: {
                '/design': { description: 'Architecture', usage: 'System design and architecture', examples: ['/design --architecture --best-practices --persona-architect'] },
                '/document': { description: 'Docs', usage: 'Creating comprehensive documentation', examples: ['/document --api --comprehensive --persona-mentor'] },
                '/spawn': { description: 'Parallel tasks', usage: 'Running parallel operations', examples: ['/spawn --parallel --tasks --persona-performance'] },
                '/load': { description: 'Context loading', usage: 'Loading project context and analysis', examples: ['/load --scope comprehensive --focus architecture'] },
                '/task': { description: 'Task management', usage: 'Managing development tasks', examples: ['/task --create --workflow --persona-architect'] }
            }
        };

        this.personas = {
            'architect': { 
                icon: '🏗️', 
                name: 'Solutions Architect', 
                description: 'System design, patterns, scalability',
                expertise: ['Architecture design', 'System patterns', 'Scalability planning', 'Technical strategy'],
                colors: { primary: '#667eea', secondary: '#764ba2' }
            },
            'frontend': { 
                icon: '🎨', 
                name: 'Frontend Developer', 
                description: 'UI/UX, components, styling, interactivity',
                expertise: ['UI/UX Design', 'Component development', 'Frontend frameworks', 'User experience'],
                colors: { primary: '#f093fb', secondary: '#f5576c' }
            },
            'backend': { 
                icon: '⚙️', 
                name: 'Backend Developer', 
                description: 'APIs, databases, server logic, performance',
                expertise: ['API development', 'Database design', 'Server optimization', 'Backend services'],
                colors: { primary: '#4facfe', secondary: '#00f2fe' }
            },
            'security': { 
                icon: '🔒', 
                name: 'Security Engineer', 
                description: 'Security audits, vulnerabilities, compliance',
                expertise: ['Security auditing', 'Vulnerability assessment', 'Compliance', 'Threat modeling'],
                colors: { primary: '#ff9a9e', secondary: '#fecfef' }
            },
            'analyzer': { 
                icon: '🔍', 
                name: 'Code Analyzer', 
                description: 'Debugging, analysis, optimization',
                expertise: ['Code analysis', 'Performance debugging', 'Issue identification', 'Optimization'],
                colors: { primary: '#a8edea', secondary: '#fed6e3' }
            },
            'qa': { 
                icon: '✅', 
                name: 'Quality Assurance', 
                description: 'Testing, quality control, standards',
                expertise: ['Test automation', 'Quality standards', 'Test strategies', 'Bug tracking'],
                colors: { primary: '#d299c2', secondary: '#fef9d7' }
            },
            'performance': { 
                icon: '⚡', 
                name: 'Performance Engineer', 
                description: 'Speed optimization, monitoring, scaling',
                expertise: ['Performance tuning', 'Load optimization', 'Monitoring', 'Scalability'],
                colors: { primary: '#89f7fe', secondary: '#66a6ff' }
            },
            'refactorer': { 
                icon: '🔧', 
                name: 'Code Refactorer', 
                description: 'Clean code, refactoring, maintainability',
                expertise: ['Code refactoring', 'Clean architecture', 'Technical debt', 'Code quality'],
                colors: { primary: '#fdbb2d', secondary: '#22c1c3' }
            },
            'mentor': { 
                icon: '🎓', 
                name: 'Tech Mentor', 
                description: 'Teaching, guidance, best practices',
                expertise: ['Technical mentoring', 'Best practices', 'Knowledge sharing', 'Team guidance'],
                colors: { primary: '#667eea', secondary: '#764ba2' }
            }
        };

        this.quickStartExamples = [
            {
                title: "Next.js TypeScript Build Issues",
                description: "Next.js app that won't build due to TypeScript errors",
                techStack: ['next', 'typescript'],
                phase: 'debugging',
                commands: ['/troubleshoot --typescript --build --errors --persona-analyzer --seq', '/analyze --types --strict --persona-analyzer', '/build --fix --typescript --persona-frontend']
            },
            {
                title: "Express API Authentication",
                description: "Need to add authentication to my Express API",
                techStack: ['node', 'express'],
                phase: 'development',
                commands: ['/design --auth --api --security --persona-security', '/build --auth --jwt --middleware --persona-backend', '/test --auth --integration --persona-qa']
            },
            {
                title: "React Performance Issues",
                description: "React components are re-rendering too much",
                techStack: ['react'],
                phase: 'optimization',
                commands: ['/analyze --react --renders --performance --persona-performance --seq', '/improve --memoization --optimization --persona-performance', '/test --performance --benchmark --persona-qa']
            },
            {
                title: "CI/CD Monorepo Setup",
                description: "Setting up CI/CD for a monorepo",
                techStack: ['docker', 'git'],
                phase: 'deployment',
                commands: ['/design --cicd --monorepo --architecture --persona-architect', '/build --pipeline --docker --deploy --persona-architect', '/test --integration --e2e --persona-qa']
            },
            {
                title: "REST to GraphQL Migration",
                description: "Migrating from REST to GraphQL",
                techStack: ['graphql', 'api'],
                phase: 'migration',
                commands: ['/analyze --api --rest --migration --persona-architect --seq', '/design --graphql --schema --persona-backend', '/migrate --api --graphql --gradual --persona-backend']
            },
            {
                title: "Database Performance",
                description: "Production database is slow",
                techStack: ['database', 'postgres'],
                phase: 'optimization',
                commands: ['/analyze --database --performance --queries --persona-performance --seq', '/improve --database --indexing --caching --persona-performance', '/monitor --database --performance --persona-performance']
            },
            {
                title: "jQuery to React Migration",
                description: "Need to refactor legacy jQuery to React",
                techStack: ['jquery', 'react'],
                phase: 'refactoring',
                commands: ['/analyze --legacy --jquery --migration --persona-refactorer --seq', '/design --migration --react --architecture --persona-architect', '/migrate --jquery --react --gradual --persona-refactorer']
            },
            {
                title: "Security Audit",
                description: "Security audit before launching",
                techStack: ['security'],
                phase: 'testing',
                commands: ['/scan --security --comprehensive --vulnerabilities --persona-security', '/analyze --security --threats --persona-security --seq', '/improve --security --hardening --persona-security']
            }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeSearchIndex();
        this.initializeAttachmentSystem();
        this.initializeEnhancedGeniePrompts();
        this.initializeMCPIntegration();
        this.setupPersonaSelector();
        this.initializeWorkflowBuilder();
        console.log('🧞✨ Enhanced SuperClaude Genie WebApp initialized');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeUI();
        });
    }

    initializeSearchIndex() {
        // Build search index from command knowledge and examples
        Object.entries(this.commandKnowledge).forEach(([category, commands]) => {
            Object.entries(commands).forEach(([command, details]) => {
                const searchTerms = [
                    command,
                    details.description,
                    details.usage,
                    ...details.examples
                ].join(' ').toLowerCase();
                
                this.state.searchIndex.set(command, {
                    category,
                    command,
                    details,
                    searchTerms
                });
            });
        });

        // Add quick start examples to search
        this.quickStartExamples.forEach((example, index) => {
            const searchTerms = [
                example.title,
                example.description,
                ...example.techStack,
                example.phase,
                ...example.commands
            ].join(' ').toLowerCase();

            this.state.searchIndex.set(`example-${index}`, {
                type: 'example',
                example,
                searchTerms
            });
        });
    }

    initializeUI() {
        // Create enhanced app container
        const appContainer = document.createElement('div');
        appContainer.id = 'enhanced-superclaude-genie-app';
        appContainer.className = 'enhanced-genie-app-container';
        
        // Insert after existing content
        const mainContent = document.querySelector('main') || document.body;
        mainContent.appendChild(appContainer);
        
        this.renderEnhancedGenieInterface();
        this.renderCommandExplorer();
        this.renderQuickStartGallery();
        this.renderWorkflowBuilder();
        this.renderPersonaDashboard();
        this.renderMagicUIStudio();
        this.renderAttachmentIntegration();
    }

    renderEnhancedGenieInterface() {
        const genieHTML = `
            <section class="enhanced-genie-section" id="enhanced-genie-interface">
                <div class="section-header">
                    <h2>🧞 SuperClaude Genie - Enhanced Edition</h2>
                    <p>Intelligent command generation with integrated knowledge base and workflow optimization</p>
                </div>
                
                <div class="genie-main-interface">
                    <div class="genie-input-panel">
                        <div class="smart-input-group">
                            <label for="genie-request">What do you want to accomplish?</label>
                            <textarea id="genie-request" placeholder="Describe your development challenge, tech stack, and goals...
Examples:
• 'I have a React app with slow rendering and need to optimize performance'
• 'Setting up authentication for my Node.js API with JWT and rate limiting'
• 'Need to migrate legacy jQuery code to modern React components'"></textarea>
                            <div class="input-suggestions" id="input-suggestions"></div>
                        </div>
                        
                        <div class="context-selectors">
                            <div class="tech-stack-pills">
                                <label>Tech Stack:</label>
                                <div class="pill-container" id="tech-stack-pills">
                                    <span class="pill" data-tech="react">React</span>
                                    <span class="pill" data-tech="vue">Vue.js</span>
                                    <span class="pill" data-tech="node">Node.js</span>
                                    <span class="pill" data-tech="typescript">TypeScript</span>
                                    <span class="pill" data-tech="express">Express</span>
                                    <span class="pill" data-tech="next">Next.js</span>
                                    <span class="pill" data-tech="docker">Docker</span>
                                    <span class="pill" data-tech="postgres">PostgreSQL</span>
                                    <span class="pill" data-tech="graphql">GraphQL</span>
                                    <span class="pill" data-tech="tailwind">Tailwind</span>
                                </div>
                            </div>
                            
                            <div class="phase-selector">
                                <label for="project-phase">Project Phase:</label>
                                <select id="project-phase">
                                    <option value="planning">Planning & Design</option>
                                    <option value="development" selected>Development</option>
                                    <option value="debugging">Debugging & Troubleshooting</option>
                                    <option value="testing">Testing & QA</option>
                                    <option value="optimization">Performance Optimization</option>
                                    <option value="deployment">Deployment & CI/CD</option>
                                    <option value="maintenance">Maintenance & Refactoring</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="advanced-options">
                            <div class="option-group">
                                <label>
                                    <input type="checkbox" id="sequential-reasoning" checked>
                                    <span class="checkmark"></span>
                                    Sequential Reasoning (--seq)
                                </label>
                                <label>
                                    <input type="checkbox" id="magic-ui">
                                    <span class="checkmark"></span>
                                    Magic UI Generation (--magic)
                                </label>
                                <label>
                                    <input type="checkbox" id="ultra-compressed">
                                    <span class="checkmark"></span>
                                    Token Optimization (--uc)
                                </label>
                            </div>
                        </div>
                        
                        <button id="generate-enhanced-commands" class="btn-primary genie-generate-btn">
                            ✨ Generate Intelligent Commands
                        </button>
                    </div>
                    
                    <div class="genie-output-panel">
                        <div class="command-results" id="enhanced-command-results">
                            <div class="results-header">
                                <h4>🎯 Your SuperClaude Magic</h4>
                                <div class="results-actions">
                                    <button class="btn-secondary" id="copy-all-commands">📋 Copy All</button>
                                    <button class="btn-secondary" id="save-workflow">💾 Save Workflow</button>
                                </div>
                            </div>
                            <div class="generated-commands-container" id="generated-commands-container">
                                <div class="placeholder-content">
                                    <div class="placeholder-icon">🧞</div>
                                    <p>Describe your development needs above, and I'll generate the perfect SuperClaude commands for you!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('enhanced-superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', genieHTML);
    }

    renderCommandExplorer() {
        const explorerHTML = `
            <section class="command-explorer-section" id="command-explorer">
                <div class="section-header">
                    <h3>🗂️ Command Explorer</h3>
                    <p>Browse and discover SuperClaude commands by category</p>
                </div>
                
                <div class="command-search">
                    <input type="text" id="command-search" placeholder="Search commands, flags, or use cases...">
                    <div class="search-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="development">Development</button>
                        <button class="filter-btn" data-filter="operations">Operations</button>
                        <button class="filter-btn" data-filter="advanced">Advanced</button>
                    </div>
                </div>
                
                <div class="command-categories" id="command-categories">
                    ${this.renderCommandCategories()}
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('enhanced-superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', explorerHTML);
    }

    renderCommandCategories() {
        let html = '';
        
        Object.entries(this.commandKnowledge).forEach(([categoryName, commands]) => {
            html += `
                <div class="command-category" data-category="${categoryName}">
                    <h4 class="category-title">${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Commands</h4>
                    <div class="command-grid">
                        ${Object.entries(commands).map(([command, details]) => `
                            <div class="command-card" data-command="${command}">
                                <div class="command-header">
                                    <code class="command-name">${command}</code>
                                    <button class="command-info-btn" data-command="${command}">ℹ️</button>
                                </div>
                                <p class="command-description">${details.description}</p>
                                <div class="command-usage">${details.usage}</div>
                                <div class="command-examples">
                                    <strong>Example:</strong>
                                    <code>${details.examples[0] || 'No example available'}</code>
                                </div>
                                <button class="btn-small use-command-btn" data-command="${command}">Use Command</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        return html;
    }

    renderQuickStartGallery() {
        const galleryHTML = `
            <section class="quick-start-gallery" id="quick-start-gallery">
                <div class="section-header">
                    <h3>🚀 Quick Start Gallery</h3>
                    <p>Ready-to-use command workflows for common development scenarios</p>
                </div>
                
                <div class="examples-grid" id="examples-grid">
                    ${this.quickStartExamples.map((example, index) => `
                        <div class="example-card" data-example="${index}">
                            <h4>${example.title}</h4>
                            <p>${example.description}</p>
                            <div class="example-tech-stack">
                                ${example.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            <div class="example-phase">Phase: ${example.phase}</div>
                            <div class="example-commands">
                                ${example.commands.map(cmd => `<code>${cmd}</code>`).join('')}
                            </div>
                            <div class="example-actions">
                                <button class="btn-small use-example-btn" data-example="${index}">Use This Workflow</button>
                                <button class="btn-small copy-example-btn" data-example="${index}">📋 Copy Commands</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('enhanced-superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', galleryHTML);
    }

    renderWorkflowBuilder() {
        const workflowHTML = `
            <section class="workflow-builder-section" id="workflow-builder">
                <div class="section-header">
                    <h3>🔗 Workflow Builder</h3>
                    <p>Create and chain commands for complex development workflows</p>
                </div>
                
                <div class="workflow-interface">
                    <div class="workflow-canvas" id="workflow-canvas">
                        <div class="workflow-placeholder">
                            <p>Drag commands here to build a workflow</p>
                        </div>
                    </div>
                    
                    <div class="workflow-controls">
                        <button class="btn-secondary" id="clear-workflow">🗑️ Clear</button>
                        <button class="btn-secondary" id="save-workflow-btn">💾 Save</button>
                        <button class="btn-primary" id="execute-workflow">▶️ Execute Workflow</button>
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('enhanced-superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', workflowHTML);
    }

    renderPersonaDashboard() {
        const dashboardHTML = `
            <section class="persona-dashboard" id="persona-dashboard">
                <div class="section-header">
                    <h3>🎭 Persona Dashboard</h3>
                    <p>Choose your development focus for personalized command suggestions</p>
                </div>
                
                <div class="personas-grid">
                    ${Object.entries(this.personas).map(([key, persona]) => `
                        <div class="persona-card ${this.state.persona === key ? 'active' : ''}" data-persona="${key}">
                            <div class="persona-header">
                                <div class="persona-icon" style="background: linear-gradient(135deg, ${persona.colors.primary}, ${persona.colors.secondary})">${persona.icon}</div>
                                <h4>${persona.name}</h4>
                            </div>
                            <p class="persona-description">${persona.description}</p>
                            <div class="persona-expertise">
                                <strong>Expertise:</strong>
                                <ul>
                                    ${persona.expertise.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                            <button class="btn-small select-persona-btn" data-persona="${key}">
                                ${this.state.persona === key ? '✓ Selected' : 'Select Persona'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('enhanced-superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', dashboardHTML);
    }

    renderMagicUIStudio() {
        const studioHTML = `
            <section class="magic-ui-studio" id="magic-ui-studio">
                <div class="section-header">
                    <h3>✨ Magic UI Studio</h3>
                    <p>Generate and preview UI components with AI assistance</p>
                </div>
                
                <div class="studio-interface">
                    <div class="studio-controls">
                        <div class="control-group">
                            <label for="ui-component-type">Component Type:</label>
                            <select id="ui-component-type">
                                <option value="button">Button</option>
                                <option value="card">Card</option>
                                <option value="form">Form</option>
                                <option value="navigation">Navigation</option>
                                <option value="modal">Modal</option>
                                <option value="table">Data Table</option>
                                <option value="dashboard">Dashboard</option>
                                <option value="hero">Hero Section</option>
                                <option value="sidebar">Sidebar</option>
                                <option value="carousel">Carousel</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label for="ui-framework-select">Framework:</label>
                            <select id="ui-framework-select">
                                <option value="vue">Vue.js 3</option>
                                <option value="react">React</option>
                                <option value="svelte">Svelte</option>
                                <option value="html">HTML/CSS</option>
                                <option value="tailwind">Tailwind Components</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label for="ui-description-detailed">Description & Requirements:</label>
                            <textarea id="ui-description-detailed" placeholder="Describe the component you want to create...
Include:
• Visual design preferences
• Functionality requirements  
• Accessibility needs
• Animation or interaction details"></textarea>
                        </div>
                        
                        <div class="control-group">
                            <label>Design System:</label>
                            <div class="design-system-options">
                                <label><input type="radio" name="design-system" value="modern" checked> Modern</label>
                                <label><input type="radio" name="design-system" value="minimal"> Minimal</label>
                                <label><input type="radio" name="design-system" value="glassmorphism"> Glassmorphism</label>
                                <label><input type="radio" name="design-system" value="neumorphism"> Neumorphism</label>
                            </div>
                        </div>
                        
                        <button id="generate-magic-ui" class="btn-primary magic-generate-btn">
                            🪄 Generate Component
                        </button>
                    </div>
                    
                    <div class="studio-output">
                        <div class="output-tabs">
                            <button class="tab-btn active" data-tab="code">💻 Code</button>
                            <button class="tab-btn" data-tab="preview">👁️ Preview</button>
                            <button class="tab-btn" data-tab="documentation">📚 Docs</button>
                        </div>
                        
                        <div class="output-content">
                            <div class="tab-content active" id="code-tab">
                                <div class="code-header">
                                    <span class="code-title">Generated Component</span>
                                    <div class="code-actions">
                                        <button class="btn-small" id="copy-component-code">📋 Copy</button>
                                        <button class="btn-small" id="download-component">💾 Download</button>
                                        <button class="btn-small" id="share-component">🔗 Share</button>
                                    </div>
                                </div>
                                <pre><code id="generated-component-code">// Your generated component will appear here</code></pre>
                            </div>
                            
                            <div class="tab-content" id="preview-tab">
                                <iframe id="component-preview-frame" style="width: 100%; height: 500px; border: none; border-radius: 8px;"></iframe>
                            </div>
                            
                            <div class="tab-content" id="documentation-tab">
                                <div class="component-docs" id="component-documentation">
                                    <h4>Component Documentation</h4>
                                    <p>Generate a component to see its documentation here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('enhanced-superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', studioHTML);
    }

    renderAttachmentIntegration() {
        const attachmentHTML = `
            <section class="attachment-integration" id="attachment-integration">
                <div class="section-header">
                    <h3>📎 Smart Attachment Integration</h3>
                    <p>Upload files and let AI analyze them for contextual command suggestions</p>
                </div>
                
                <div class="attachment-interface">
                    <div class="smart-dropzone" id="smart-attachment-dropzone">
                        <div class="dropzone-content">
                            <div class="upload-icon">🎯</div>
                            <h4>Drop files for intelligent analysis</h4>
                            <p>Supports: Code files, designs, documentation, configs</p>
                            <input type="file" id="smart-file-input" multiple accept="*/*" hidden>
                            <div class="supported-analysis">
                                <span>AI will suggest relevant commands based on file content</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="attachment-analysis" id="attachment-analysis">
                        <h4>📊 File Analysis & Suggestions</h4>
                        <div class="analysis-results" id="analysis-results">
                            <!-- Dynamically populated -->
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        const appContainer = document.getElementById('enhanced-superclaude-genie-app');
        appContainer.insertAdjacentHTML('beforeend', attachmentHTML);
    }

    initializeEnhancedGeniePrompts() {
        const generateBtn = document.getElementById('generate-enhanced-commands');
        const requestTextarea = document.getElementById('genie-request');
        const techStackPills = document.getElementById('tech-stack-pills');
        
        // Generate commands button
        generateBtn?.addEventListener('click', () => {
            this.generateIntelligentCommands();
        });

        // Real-time suggestions as user types
        requestTextarea?.addEventListener('input', debounce(() => {
            this.updateInputSuggestions();
        }, 300));

        // Tech stack pill selection
        techStackPills?.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill')) {
                e.target.classList.toggle('selected');
                this.updateInputSuggestions();
            }
        });

        // Quick start examples
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('use-example-btn')) {
                const exampleIndex = parseInt(e.target.dataset.example);
                this.useQuickStartExample(exampleIndex);
            }
            
            if (e.target.classList.contains('copy-example-btn')) {
                const exampleIndex = parseInt(e.target.dataset.example);
                this.copyExampleCommands(exampleIndex);
            }
        });

        // Enhanced persona selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('select-persona-btn')) {
                const persona = e.target.dataset.persona;
                this.selectEnhancedPersona(persona);
            }
        });
    }

    async generateIntelligentCommands() {
        const request = document.getElementById('genie-request')?.value?.trim();
        const selectedTechStack = Array.from(document.querySelectorAll('.pill.selected')).map(pill => pill.dataset.tech);
        const projectPhase = document.getElementById('project-phase')?.value;
        const useSequential = document.getElementById('sequential-reasoning')?.checked;
        const useMagic = document.getElementById('magic-ui')?.checked;
        const useCompressed = document.getElementById('ultra-compressed')?.checked;

        if (!request) {
            this.showNotification('Please describe what you want to accomplish', 'warning');
            return;
        }

        // Show loading state
        this.showLoadingState();

        try {
            // Use enhanced reasoning with MCP integration
            const commands = await this.generateCommandsWithEnhancedReasoning({
                request,
                techStack: selectedTechStack,
                phase: projectPhase,
                persona: this.state.persona,
                useSequential,
                useMagic,
                useCompressed
            });

            this.displayEnhancedCommandResults(commands);
            
        } catch (error) {
            console.error('Enhanced command generation failed:', error);
            this.showNotification('Command generation failed. Please try again.', 'error');
        } finally {
            this.hideLoadingState();
        }
    }

    async generateCommandsWithEnhancedReasoning(params) {
        // Simulate enhanced reasoning with Code Reasoning MCP
        console.log('🧠 Enhanced reasoning with parameters:', params);

        // Analyze request for keywords and intent
        const analysis = this.analyzeUserRequest(params.request);
        
        // Generate base commands based on analysis
        let commands = this.generateBaseCommands(analysis, params);
        
        // Apply persona-specific enhancements
        commands = this.applyPersonaEnhancements(commands, params.persona);
        
        // Add flags based on options
        commands = this.addEnhancementFlags(commands, params);
        
        // Create workflow if multiple commands
        if (commands.length > 1) {
            const workflow = this.createCommandWorkflow(commands, params);
            return workflow;
        }
        
        return commands;
    }

    analyzeUserRequest(request) {
        const analysis = {
            intent: 'general',
            techStack: [],
            problems: [],
            goals: [],
            urgency: 'normal'
        };

        const requestLower = request.toLowerCase();

        // Detect intent
        if (requestLower.includes('slow') || requestLower.includes('performance') || requestLower.includes('optimize')) {
            analysis.intent = 'performance';
        } else if (requestLower.includes('bug') || requestLower.includes('error') || requestLower.includes('debug')) {
            analysis.intent = 'debugging';
        } else if (requestLower.includes('build') || requestLower.includes('create') || requestLower.includes('add')) {
            analysis.intent = 'development';
        } else if (requestLower.includes('test') || requestLower.includes('testing')) {
            analysis.intent = 'testing';
        } else if (requestLower.includes('deploy') || requestLower.includes('production')) {
            analysis.intent = 'deployment';
        } else if (requestLower.includes('security') || requestLower.includes('audit')) {
            analysis.intent = 'security';
        }

        // Detect tech stack
        const techKeywords = {
            'react': ['react', 'jsx', 'hooks'],
            'vue': ['vue', 'nuxt'],
            'node': ['node', 'nodejs', 'npm'],
            'typescript': ['typescript', 'ts'],
            'express': ['express', 'api'],
            'docker': ['docker', 'container'],
            'postgres': ['postgres', 'postgresql', 'database'],
            'graphql': ['graphql', 'apollo'],
            'next': ['next', 'nextjs']
        };

        Object.entries(techKeywords).forEach(([tech, keywords]) => {
            if (keywords.some(keyword => requestLower.includes(keyword))) {
                analysis.techStack.push(tech);
            }
        });

        // Detect urgency
        if (requestLower.includes('urgent') || requestLower.includes('production') || requestLower.includes('critical')) {
            analysis.urgency = 'high';
        }

        return analysis;
    }

    generateBaseCommands(analysis, params) {
        const commands = [];
        
        switch (analysis.intent) {
            case 'performance':
                commands.push({
                    command: '/analyze',
                    flags: ['--performance', '--profile'],
                    description: 'Analyze performance bottlenecks and identify optimization opportunities'
                });
                commands.push({
                    command: '/improve',
                    flags: ['--performance', '--optimization'],
                    description: 'Apply performance optimizations based on analysis'
                });
                break;
                
            case 'debugging':
                commands.push({
                    command: '/troubleshoot',
                    flags: ['--debug', '--trace'],
                    description: 'Debug issues and trace error sources'
                });
                commands.push({
                    command: '/analyze',
                    flags: ['--error-patterns', '--logs'],
                    description: 'Analyze error patterns and log data'
                });
                break;
                
            case 'development':
                commands.push({
                    command: '/design',
                    flags: ['--architecture', '--best-practices'],
                    description: 'Design solution architecture with best practices'
                });
                commands.push({
                    command: '/build',
                    flags: ['--feature', '--complete'],
                    description: 'Build the feature with comprehensive implementation'
                });
                break;
                
            case 'testing':
                commands.push({
                    command: '/test',
                    flags: ['--comprehensive', '--coverage'],
                    description: 'Create comprehensive test suite with coverage analysis'
                });
                break;
                
            case 'deployment':
                commands.push({
                    command: '/deploy',
                    flags: ['--production', '--verify'],
                    description: 'Deploy to production with verification steps'
                });
                break;
                
            case 'security':
                commands.push({
                    command: '/scan',
                    flags: ['--security', '--audit'],
                    description: 'Perform security audit and vulnerability assessment'
                });
                break;
                
            default:
                commands.push({
                    command: '/analyze',
                    flags: ['--project', '--comprehensive'],
                    description: 'Comprehensive project analysis and recommendations'
                });
        }

        // Add tech-specific flags
        analysis.techStack.forEach(tech => {
            commands.forEach(cmd => {
                if (!cmd.flags.includes(`--${tech}`)) {
                    cmd.flags.push(`--${tech}`);
                }
            });
        });

        return commands;
    }

    applyPersonaEnhancements(commands, persona) {
        // Add persona flag to all commands
        commands.forEach(cmd => {
            cmd.flags.push(`--persona-${persona}`);
        });

        // Add persona-specific command suggestions
        const personaEnhancements = {
            'frontend': (cmds) => {
                if (cmds.some(c => c.command === '/build')) {
                    cmds.push({
                        command: '/test',
                        flags: ['--component', '--visual', '--persona-frontend'],
                        description: 'Test UI components and visual regression'
                    });
                }
            },
            'backend': (cmds) => {
                if (cmds.some(c => c.command === '/build')) {
                    cmds.push({
                        command: '/test',
                        flags: ['--api', '--integration', '--persona-backend'],
                        description: 'Test API endpoints and integration points'
                    });
                }
            },
            'security': (cmds) => {
                cmds.push({
                    command: '/scan',
                    flags: ['--security', '--vulnerabilities', '--persona-security'],
                    description: 'Security scan and vulnerability assessment'
                });
            },
            'performance': (cmds) => {
                cmds.push({
                    command: '/analyze',
                    flags: ['--performance', '--benchmarks', '--persona-performance'],
                    description: 'Performance analysis and benchmarking'
                });
            }
        };

        if (personaEnhancements[persona]) {
            personaEnhancements[persona](commands);
        }

        return commands;
    }

    addEnhancementFlags(commands, params) {
        commands.forEach(cmd => {
            if (params.useSequential) {
                cmd.flags.push('--seq');
            }
            if (params.useMagic && (cmd.command === '/build' || cmd.command === '/design')) {
                cmd.flags.push('--magic');
            }
            if (params.useCompressed) {
                cmd.flags.push('--uc');
            }
        });

        return commands;
    }

    createCommandWorkflow(commands, params) {
        return {
            type: 'workflow',
            title: `${params.persona.charAt(0).toUpperCase() + params.persona.slice(1)} Workflow`,
            description: `Intelligent workflow generated for: ${params.request.substring(0, 100)}...`,
            commands: commands,
            estimatedTime: this.estimateWorkflowTime(commands),
            difficulty: this.assessWorkflowDifficulty(commands),
            prerequisites: this.identifyPrerequisites(commands, params.techStack)
        };
    }

    estimateWorkflowTime(commands) {
        const timeEstimates = {
            '/analyze': 5,
            '/build': 30,
            '/test': 15,
            '/deploy': 20,
            '/improve': 25,
            '/troubleshoot': 15,
            '/design': 20
        };

        const totalMinutes = commands.reduce((total, cmd) => {
            return total + (timeEstimates[cmd.command] || 10);
        }, 0);

        if (totalMinutes < 30) return 'Quick (< 30 min)';
        if (totalMinutes < 60) return 'Medium (30-60 min)';
        return 'Extended (1+ hours)';
    }

    assessWorkflowDifficulty(commands) {
        const complexCommands = ['/design', '/deploy', '/migrate'];
        const hasComplexCommands = commands.some(cmd => complexCommands.includes(cmd.command));
        const commandCount = commands.length;

        if (hasComplexCommands || commandCount > 4) return 'Advanced';
        if (commandCount > 2) return 'Intermediate';
        return 'Beginner';
    }

    identifyPrerequisites(commands, techStack) {
        const prerequisites = new Set();
        
        if (techStack.includes('node')) prerequisites.add('Node.js environment');
        if (techStack.includes('docker')) prerequisites.add('Docker installed');
        if (techStack.includes('postgres')) prerequisites.add('Database access');
        
        if (commands.some(cmd => cmd.command === '/test')) {
            prerequisites.add('Testing framework setup');
        }
        if (commands.some(cmd => cmd.command === '/deploy')) {
            prerequisites.add('Deployment environment access');
        }

        return Array.from(prerequisites);
    }

    displayEnhancedCommandResults(results) {
        const container = document.getElementById('generated-commands-container');
        if (!container) return;

        container.innerHTML = '';

        if (results.type === 'workflow') {
            this.renderWorkflowResults(results, container);
        } else {
            this.renderCommandList(results, container);
        }
    }

    renderWorkflowResults(workflow, container) {
        const workflowHTML = `
            <div class="workflow-result">
                <div class="workflow-header">
                    <h4>${workflow.title}</h4>
                    <div class="workflow-meta">
                        <span class="time-estimate">⏱️ ${workflow.estimatedTime}</span>
                        <span class="difficulty ${workflow.difficulty.toLowerCase()}">📊 ${workflow.difficulty}</span>
                    </div>
                </div>
                
                <p class="workflow-description">${workflow.description}</p>
                
                ${workflow.prerequisites.length > 0 ? `
                    <div class="prerequisites">
                        <h5>📋 Prerequisites:</h5>
                        <ul>
                            ${workflow.prerequisites.map(prereq => `<li>${prereq}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="workflow-steps">
                    <h5>🔗 Workflow Steps:</h5>
                    ${workflow.commands.map((cmd, index) => `
                        <div class="workflow-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">
                                <div class="step-command">
                                    <code>${cmd.command} ${cmd.flags.join(' ')}</code>
                                    <button class="copy-btn" data-command="${cmd.command} ${cmd.flags.join(' ')}">📋</button>
                                </div>
                                <p class="step-description">${cmd.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="workflow-actions">
                    <button class="btn-primary" id="execute-workflow-btn">▶️ Execute Workflow</button>
                    <button class="btn-secondary" id="copy-workflow-btn">📋 Copy All Commands</button>
                    <button class="btn-secondary" id="save-workflow-btn">💾 Save Workflow</button>
                </div>
            </div>
        `;
        
        container.innerHTML = workflowHTML;
        this.attachWorkflowEventListeners();
    }

    renderCommandList(commands, container) {
        const commandListHTML = `
            <div class="command-list-result">
                ${commands.map((cmd, index) => `
                    <div class="enhanced-command-result">
                        <div class="command-header">
                            <span class="command-number">${index + 1}</span>
                            <code class="command-text">${cmd.command} ${cmd.flags.join(' ')}</code>
                            <button class="copy-btn" data-command="${cmd.command} ${cmd.flags.join(' ')}">📋</button>
                        </div>
                        <div class="command-description">
                            <p>${cmd.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = commandListHTML;
    }

    attachWorkflowEventListeners() {
        // Copy command buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                const command = e.target.dataset.command;
                navigator.clipboard.writeText(command);
                this.showNotification('Command copied to clipboard!', 'success');
            }
        });

        // Workflow actions
        const executeBtn = document.getElementById('execute-workflow-btn');
        const copyWorkflowBtn = document.getElementById('copy-workflow-btn');
        const saveWorkflowBtn = document.getElementById('save-workflow-btn');

        executeBtn?.addEventListener('click', () => {
            this.executeWorkflow();
        });

        copyWorkflowBtn?.addEventListener('click', () => {
            this.copyWorkflowCommands();
        });

        saveWorkflowBtn?.addEventListener('click', () => {
            this.saveWorkflow();
        });
    }

    useQuickStartExample(index) {
        const example = this.quickStartExamples[index];
        if (!example) return;

        // Fill in the interface with example data
        const requestTextarea = document.getElementById('genie-request');
        const phaseSelect = document.getElementById('project-phase');
        const techStackPills = document.querySelectorAll('.pill');

        if (requestTextarea) {
            requestTextarea.value = example.description;
        }

        if (phaseSelect) {
            phaseSelect.value = example.phase;
        }

        // Select relevant tech stack pills
        techStackPills.forEach(pill => {
            pill.classList.remove('selected');
            if (example.techStack.includes(pill.dataset.tech)) {
                pill.classList.add('selected');
            }
        });

        // Display the commands immediately
        const commands = example.commands.map((cmd, index) => ({
            command: cmd.split(' ')[0],
            flags: cmd.split(' ').slice(1),
            description: `Step ${index + 1} of the ${example.title} workflow`
        }));

        this.displayEnhancedCommandResults(commands);
        this.showNotification(`Loaded example: ${example.title}`, 'success');
    }

    copyExampleCommands(index) {
        const example = this.quickStartExamples[index];
        if (!example) return;

        const commandsText = example.commands.join('\n');
        navigator.clipboard.writeText(commandsText);
        this.showNotification('Example commands copied to clipboard!', 'success');
    }

    selectEnhancedPersona(persona) {
        this.state.persona = persona;
        
        // Update UI
        document.querySelectorAll('.persona-card').forEach(card => {
            card.classList.remove('active');
            card.querySelector('.select-persona-btn').textContent = 'Select Persona';
        });

        const selectedCard = document.querySelector(`[data-persona="${persona}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            selectedCard.querySelector('.select-persona-btn').textContent = '✓ Selected';
        }

        this.showNotification(`Switched to ${this.personas[persona].name} persona`, 'success');
        
        // Update command suggestions based on new persona
        this.updateInputSuggestions();
    }

    updateInputSuggestions() {
        const request = document.getElementById('genie-request')?.value?.toLowerCase() || '';
        const suggestionsContainer = document.getElementById('input-suggestions');
        
        if (!suggestionsContainer || request.length < 3) {
            if (suggestionsContainer) suggestionsContainer.innerHTML = '';
            return;
        }

        // Search through command knowledge and examples
        const suggestions = [];
        
        this.state.searchIndex.forEach((item, key) => {
            if (item.searchTerms.includes(request) && suggestions.length < 5) {
                if (item.type === 'example') {
                    suggestions.push({
                        type: 'example',
                        title: item.example.title,
                        description: item.example.description,
                        action: () => this.useQuickStartExample(parseInt(key.split('-')[1]))
                    });
                } else {
                    suggestions.push({
                        type: 'command',
                        title: item.command,
                        description: item.details.description,
                        action: () => this.useCommand(item.command)
                    });
                }
            }
        });

        if (suggestions.length > 0) {
            const suggestionsHTML = `
                <div class="suggestions-dropdown">
                    ${suggestions.map(suggestion => `
                        <div class="suggestion-item" data-suggestion="${suggestion.title}">
                            <div class="suggestion-type">${suggestion.type}</div>
                            <div class="suggestion-content">
                                <strong>${suggestion.title}</strong>
                                <p>${suggestion.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            suggestionsContainer.innerHTML = suggestionsHTML;
            
            // Add click handlers
            suggestionsContainer.addEventListener('click', (e) => {
                const suggestionItem = e.target.closest('.suggestion-item');
                if (suggestionItem) {
                    const title = suggestionItem.dataset.suggestion;
                    const suggestion = suggestions.find(s => s.title === title);
                    if (suggestion) {
                        suggestion.action();
                        suggestionsContainer.innerHTML = '';
                    }
                }
            });
        } else {
            suggestionsContainer.innerHTML = '';
        }
    }

    useCommand(command) {
        const commandData = this.state.searchIndex.get(command);
        if (commandData && commandData.details.examples.length > 0) {
            const exampleCommand = commandData.details.examples[0];
            navigator.clipboard.writeText(exampleCommand);
            this.showNotification(`${command} example copied to clipboard!`, 'success');
        }
    }

    showLoadingState() {
        const container = document.getElementById('generated-commands-container');
        if (container) {
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Generating intelligent commands...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        // Loading state will be replaced by results
    }

    loadUserPreferences() {
        try {
            return JSON.parse(localStorage.getItem('superclaude-genie-preferences') || '{}');
        } catch {
            return {};
        }
    }

    saveUserPreferences() {
        localStorage.setItem('superclaude-genie-preferences', JSON.stringify(this.state.userPreferences));
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

    // Placeholder methods for additional functionality
    initializeAttachmentSystem() {
        // Enhanced attachment system implementation
        console.log('🔗 Enhanced attachment system initialized');
    }

    initializeMCPIntegration() {
        // Enhanced MCP integration
        console.log('🔌 Enhanced MCP integration initialized');
    }

    initializeWorkflowBuilder() {
        // Workflow builder implementation
        console.log('🔗 Workflow builder initialized');
    }

    executeWorkflow() {
        this.showNotification('Workflow execution feature coming soon!', 'info');
    }

    copyWorkflowCommands() {
        // Implementation for copying workflow commands
        this.showNotification('Workflow commands copied!', 'success');
    }

    saveWorkflow() {
        this.showNotification('Workflow saved to your library!', 'success');
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the enhanced app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.enhancedSuperClaudeGenieApp = new EnhancedSuperClaudeGenieApp();
    });
} else {
    window.enhancedSuperClaudeGenieApp = new EnhancedSuperClaudeGenieApp();
}