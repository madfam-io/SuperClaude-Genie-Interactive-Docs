// Advanced Syntax Highlighting Themes for Monaco Editor
// Cyberpunk-minimal aesthetic with premium developer tool feel

export interface MonacoThemeDefinition {
  base: 'vs' | 'vs-dark' | 'hc-black'
  inherit: boolean
  rules: Array<{
    token: string
    foreground?: string
    background?: string
    fontStyle?: string
  }>
  colors: Record<string, string>
}

// Cyberpunk Dark Theme - Electric blue and neon accents
export const cyberpunkDark: MonacoThemeDefinition = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // Comments
    { token: 'comment', foreground: '#6a9955', fontStyle: 'italic' },
    { token: 'comment.line', foreground: '#6a9955', fontStyle: 'italic' },
    { token: 'comment.block', foreground: '#6a9955', fontStyle: 'italic' },
    
    // Keywords and Language Constructs
    { token: 'keyword', foreground: '#00d4ff', fontStyle: 'bold' },
    { token: 'keyword.control', foreground: '#00d4ff', fontStyle: 'bold' },
    { token: 'keyword.operator', foreground: '#00d4ff' },
    { token: 'keyword.other', foreground: '#00d4ff' },
    { token: 'storage', foreground: '#00d4ff', fontStyle: 'bold' },
    { token: 'storage.type', foreground: '#00d4ff', fontStyle: 'bold' },
    { token: 'storage.modifier', foreground: '#00d4ff' },
    
    // Strings and Literals
    { token: 'string', foreground: '#22c55e' },
    { token: 'string.quoted', foreground: '#22c55e' },
    { token: 'string.template', foreground: '#22c55e' },
    { token: 'string.regexp', foreground: '#ff8c00' },
    { token: 'number', foreground: '#ff8c00' },
    { token: 'constant', foreground: '#ff8c00' },
    { token: 'constant.numeric', foreground: '#ff8c00' },
    { token: 'constant.language', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'constant.character', foreground: '#ff8c00' },
    
    // Types and Classes
    { token: 'type', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'type.primitive', foreground: '#a855f7' },
    { token: 'entity.name.type', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'entity.name.class', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'entity.name.interface', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'support.type', foreground: '#a855f7' },
    { token: 'support.class', foreground: '#a855f7' },
    
    // Functions and Methods
    { token: 'entity.name.function', foreground: '#f472b6', fontStyle: 'bold' },
    { token: 'support.function', foreground: '#f472b6' },
    { token: 'meta.function-call', foreground: '#f472b6' },
    { token: 'variable.function', foreground: '#f472b6' },
    
    // Variables and Parameters
    { token: 'variable', foreground: '#ffffff' },
    { token: 'variable.parameter', foreground: '#ffffff', fontStyle: 'italic' },
    { token: 'variable.other', foreground: '#ffffff' },
    { token: 'variable.language', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'entity.name.variable', foreground: '#ffffff' },
    
    // Operators and Punctuation
    { token: 'keyword.operator.arithmetic', foreground: '#00d4ff' },
    { token: 'keyword.operator.assignment', foreground: '#00d4ff' },
    { token: 'keyword.operator.comparison', foreground: '#00d4ff' },
    { token: 'keyword.operator.logical', foreground: '#00d4ff' },
    { token: 'punctuation', foreground: '#ffffff' },
    { token: 'punctuation.definition', foreground: '#ffffff' },
    { token: 'punctuation.separator', foreground: '#ffffff' },
    { token: 'punctuation.terminator', foreground: '#ffffff' },
    
    // Tags and Attributes (HTML/XML/JSX)
    { token: 'entity.name.tag', foreground: '#00d4ff', fontStyle: 'bold' },
    { token: 'entity.other.attribute-name', foreground: '#f472b6' },
    { token: 'punctuation.definition.tag', foreground: '#00d4ff' },
    
    // CSS Specific
    { token: 'entity.name.tag.css', foreground: '#00d4ff' },
    { token: 'entity.other.attribute-name.css', foreground: '#f472b6' },
    { token: 'support.type.property-name.css', foreground: '#a855f7' },
    { token: 'constant.other.color.rgb-value.css', foreground: '#ff8c00' },
    
    // JavaScript/TypeScript Specific
    { token: 'meta.import', foreground: '#a855f7' },
    { token: 'meta.export', foreground: '#a855f7' },
    { token: 'support.type.primitive.ts', foreground: '#a855f7' },
    { token: 'entity.name.type.ts', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'keyword.control.import.ts', foreground: '#a855f7' },
    { token: 'keyword.control.export.ts', foreground: '#a855f7' },
    
    // JSON
    { token: 'support.type.property-name.json', foreground: '#f472b6' },
    { token: 'string.quoted.double.json', foreground: '#22c55e' },
    
    // Markdown
    { token: 'markup.heading', foreground: '#00d4ff', fontStyle: 'bold' },
    { token: 'markup.bold', foreground: '#ffffff', fontStyle: 'bold' },
    { token: 'markup.italic', foreground: '#ffffff', fontStyle: 'italic' },
    { token: 'markup.strikethrough', fontStyle: 'strikethrough' },
    { token: 'markup.quote', foreground: '#6a9955', fontStyle: 'italic' },
    { token: 'markup.inline.raw', foreground: '#ff8c00' },
    { token: 'markup.fenced_code', foreground: '#22c55e' },
    
    // Invalid/Error
    { token: 'invalid', foreground: '#ff0040', background: '#ff004020' },
    { token: 'invalid.illegal', foreground: '#ff0040', background: '#ff004020' }
  ],
  colors: {
    // Editor colors
    'editor.background': '#000000',
    'editor.foreground': '#ffffff',
    'editorLineNumber.foreground': '#707070',
    'editorLineNumber.activeForeground': '#00d4ff',
    'editor.lineHighlightBackground': '#00d4ff0a',
    'editor.selectionBackground': '#00d4ff33',
    'editor.inactiveSelectionBackground': '#00d4ff1a',
    'editor.selectionHighlightBackground': '#00d4ff22',
    'editor.wordHighlightBackground': '#00d4ff22',
    'editor.wordHighlightStrongBackground': '#00d4ff33',
    'editor.findMatchBackground': '#ff8c0044',
    'editor.findMatchHighlightBackground': '#ff8c0022',
    'editor.rangeHighlightBackground': '#00d4ff11',
    'editorCursor.foreground': '#00d4ff',
    'editorWhitespace.foreground': '#404040',
    'editorIndentGuide.background': '#404040',
    'editorIndentGuide.activeBackground': '#00d4ff',
    'editor.border': '#262626',
    
    // Scrollbar
    'scrollbar.shadow': '#000000',
    'scrollbarSlider.background': '#404040',
    'scrollbarSlider.hoverBackground': '#525252',
    'scrollbarSlider.activeBackground': '#00d4ff',
    
    // Gutter
    'editorGutter.background': '#000000',
    'editorGutter.modifiedBackground': '#ff8c00',
    'editorGutter.addedBackground': '#22c55e',
    'editorGutter.deletedBackground': '#ff0040',
    
    // Bracket matching
    'editorBracketMatch.background': '#00d4ff22',
    'editorBracketMatch.border': '#00d4ff',
    
    // Overview ruler
    'editorOverviewRuler.border': '#262626',
    'editorOverviewRuler.findMatchForeground': '#ff8c00',
    'editorOverviewRuler.rangeHighlightForeground': '#00d4ff',
    'editorOverviewRuler.selectionHighlightForeground': '#00d4ff',
    'editorOverviewRuler.wordHighlightForeground': '#00d4ff',
    'editorOverviewRuler.wordHighlightStrongForeground': '#00d4ff',
    'editorOverviewRuler.modifiedForeground': '#ff8c00',
    'editorOverviewRuler.addedForeground': '#22c55e',
    'editorOverviewRuler.deletedForeground': '#ff0040',
    'editorOverviewRuler.errorForeground': '#ff0040',
    'editorOverviewRuler.warningForeground': '#ff8c00',
    'editorOverviewRuler.infoForeground': '#00d4ff',
    
    // Error/Warning squiggles
    'editorError.foreground': '#ff0040',
    'editorWarning.foreground': '#ff8c00',
    'editorInfo.foreground': '#00d4ff',
    'editorHint.foreground': '#a855f7',
    
    // Suggest widget
    'editorSuggestWidget.background': '#1a1a1a',
    'editorSuggestWidget.border': '#00d4ff33',
    'editorSuggestWidget.foreground': '#ffffff',
    'editorSuggestWidget.selectedBackground': '#00d4ff22',
    'editorSuggestWidget.highlightForeground': '#00d4ff',
    
    // Hover widget
    'editorHoverWidget.background': '#1a1a1a',
    'editorHoverWidget.border': '#00d4ff33',
    'editorHoverWidget.foreground': '#ffffff',
    
    // Parameter hints
    'editorParameterHint.background': '#1a1a1a',
    'editorParameterHint.border': '#00d4ff33',
    'editorParameterHint.foreground': '#ffffff',
    
    // Code lens
    'editorCodeLens.foreground': '#707070',
    
    // Lightbulb
    'editorLightBulb.foreground': '#ff8c00',
    'editorLightBulbAutoFix.foreground': '#22c55e'
  }
}

// Matrix Green Theme - Classic hacker aesthetic
export const matrixGreen: MonacoThemeDefinition = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '#6a9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '#00ff00', fontStyle: 'bold' },
    { token: 'string', foreground: '#22c55e' },
    { token: 'number', foreground: '#00ff88' },
    { token: 'type', foreground: '#88ff00' },
    { token: 'function', foreground: '#00ffff' },
    { token: 'variable', foreground: '#ffffff' },
    { token: 'operator', foreground: '#00ff00' },
    { token: 'delimiter', foreground: '#ffffff' },
    { token: 'invalid', foreground: '#ff0040', background: '#ff004020' }
  ],
  colors: {
    'editor.background': '#000000',
    'editor.foreground': '#00ff00',
    'editor.lineHighlightBackground': '#00ff000a',
    'editor.selectionBackground': '#00ff0033',
    'editorCursor.foreground': '#00ff00',
    'editorLineNumber.foreground': '#006600',
    'editorLineNumber.activeForeground': '#00ff00',
    'editor.border': '#00ff0033'
  }
}

// Neon Purple Theme - Synthwave aesthetic
export const neonPurple: MonacoThemeDefinition = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '#6a6a6a', fontStyle: 'italic' },
    { token: 'keyword', foreground: '#a855f7', fontStyle: 'bold' },
    { token: 'string', foreground: '#ff00ff' },
    { token: 'number', foreground: '#ff8c00' },
    { token: 'type', foreground: '#00d4ff' },
    { token: 'function', foreground: '#f472b6' },
    { token: 'variable', foreground: '#ffffff' },
    { token: 'operator', foreground: '#a855f7' },
    { token: 'delimiter', foreground: '#ffffff' },
    { token: 'invalid', foreground: '#ff0040', background: '#ff004020' }
  ],
  colors: {
    'editor.background': '#0a0a0a',
    'editor.foreground': '#a855f7',
    'editor.lineHighlightBackground': '#a855f70a',
    'editor.selectionBackground': '#a855f733',
    'editorCursor.foreground': '#a855f7',
    'editorLineNumber.foreground': '#707070',
    'editorLineNumber.activeForeground': '#a855f7',
    'editor.border': '#a855f733'
  }
}

// Terminal Green Theme - Classic terminal aesthetic
export const terminalGreen: MonacoThemeDefinition = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '#4a9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '#00ff00', fontStyle: 'bold' },
    { token: 'string', foreground: '#88ff88' },
    { token: 'number', foreground: '#ffff88' },
    { token: 'type', foreground: '#88ffff' },
    { token: 'function', foreground: '#ffffff', fontStyle: 'bold' },
    { token: 'variable', foreground: '#ccffcc' },
    { token: 'operator', foreground: '#00ff00' },
    { token: 'delimiter', foreground: '#ffffff' },
    { token: 'invalid', foreground: '#ff4444', background: '#ff444420' }
  ],
  colors: {
    'editor.background': '#001100',
    'editor.foreground': '#00ff00',
    'editor.lineHighlightBackground': '#00220008',
    'editor.selectionBackground': '#004400',
    'editorCursor.foreground': '#00ff00',
    'editorLineNumber.foreground': '#006600',
    'editorLineNumber.activeForeground': '#00ff00',
    'editor.border': '#004400'
  }
}

// Minimal Dark Theme - Clean and professional
export const minimalDark: MonacoThemeDefinition = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '#6a9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '#0070f3', fontStyle: 'bold' },
    { token: 'string', foreground: '#10b981' },
    { token: 'number', foreground: '#f59e0b' },
    { token: 'type', foreground: '#7c3aed' },
    { token: 'function', foreground: '#3b82f6' },
    { token: 'variable', foreground: '#ffffff' },
    { token: 'operator', foreground: '#0070f3' },
    { token: 'delimiter', foreground: '#ffffff' },
    { token: 'invalid', foreground: '#ef4444', background: '#ef444420' }
  ],
  colors: {
    'editor.background': '#0a0a0a',
    'editor.foreground': '#ffffff',
    'editor.lineHighlightBackground': '#0070f30a',
    'editor.selectionBackground': '#0070f333',
    'editorCursor.foreground': '#0070f3',
    'editorLineNumber.foreground': '#707070',
    'editorLineNumber.activeForeground': '#0070f3',
    'editor.border': '#262626'
  }
}

// High Contrast Theme - Maximum accessibility
export const highContrast: MonacoThemeDefinition = {
  base: 'hc-black',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '#7ca668', fontStyle: 'italic' },
    { token: 'keyword', foreground: '#569cd6', fontStyle: 'bold' },
    { token: 'string', foreground: '#ce9178' },
    { token: 'number', foreground: '#b5cea8' },
    { token: 'type', foreground: '#4ec9b0' },
    { token: 'function', foreground: '#dcdcaa' },
    { token: 'variable', foreground: '#ffffff' },
    { token: 'operator', foreground: '#d4d4d4' },
    { token: 'delimiter', foreground: '#ffffff' },
    { token: 'invalid', foreground: '#ff0000', background: '#ff000020' }
  ],
  colors: {
    'editor.background': '#000000',
    'editor.foreground': '#ffffff',
    'editor.lineHighlightBackground': '#ffffff20',
    'editor.selectionBackground': '#ffffff40',
    'editorCursor.foreground': '#ffffff',
    'editorLineNumber.foreground': '#cccccc',
    'editorLineNumber.activeForeground': '#ffffff',
    'editor.border': '#ffffff'
  }
}

// Export all themes
export const syntaxThemes = {
  'cyberpunk-dark': cyberpunkDark,
  'matrix-green': matrixGreen,
  'neon-purple': neonPurple,
  'terminal-green': terminalGreen,
  'minimal-dark': minimalDark,
  'high-contrast': highContrast
}

// Theme metadata for UI selection
export const themeMetadata = {
  'cyberpunk-dark': {
    name: 'Cyberpunk Dark',
    description: 'Electric blue and neon accents for a futuristic coding experience',
    category: 'Dark',
    accent: '#00d4ff'
  },
  'matrix-green': {
    name: 'Matrix Green',
    description: 'Classic hacker aesthetic with green-on-black terminal vibes',
    category: 'Dark',
    accent: '#00ff00'
  },
  'neon-purple': {
    name: 'Neon Purple',
    description: 'Synthwave-inspired theme with purple and magenta highlights',
    category: 'Dark',
    accent: '#a855f7'
  },
  'terminal-green': {
    name: 'Terminal Green',
    description: 'Classic terminal aesthetic with phosphor green glow',
    category: 'Dark',
    accent: '#00ff00'
  },
  'minimal-dark': {
    name: 'Minimal Dark',
    description: 'Clean and professional dark theme with subtle accents',
    category: 'Dark',
    accent: '#0070f3'
  },
  'high-contrast': {
    name: 'High Contrast',
    description: 'Maximum accessibility with high contrast colors',
    category: 'High Contrast',
    accent: '#ffffff'
  }
}