# MCP Server Setup - SuperClaude Genie Interactive Docs

## Overview

This project is configured with **Model Context Protocol (MCP)** servers to enhance AI capabilities for documentation, UI generation, browser automation, and code reasoning.

## Installed MCP Servers

### 1. Context7 MCP Server
- **Package**: `@upstash/context7-mcp`
- **Purpose**: Access to library documentation and contextual information
- **Command**: `context7-mcp`
- **Capabilities**:
  - Documentation lookup and search
  - Context-aware assistance
  - Library reference access
  - Redis-based caching for performance

### 2. Code Reasoning MCP Server
- **Package**: `@mettamatt/code-reasoning`
- **Purpose**: Multi-step reasoning and systematic thinking
- **Command**: `node /usr/local/lib/node_modules/@mettamatt/code-reasoning/dist/index.js`
- **Capabilities**:
  - Sequential thinking patterns
  - Code analysis and debugging
  - Problem-solving workflows
  - Systematic reasoning approaches
  - Reflective thinking processes

### 3. Magic UI Components MCP Server
- **Package**: `@21st-dev/magic`
- **Purpose**: AI-generated UI components for interactive documentation
- **Command**: `magic`
- **Capabilities**:
  - Dynamic UI component generation
  - Interactive element creation
  - Frontend automation
  - React/HTML output generation

### 4. Playwright Browser Automation MCP Server
- **Package**: `@playwright/mcp`
- **Purpose**: Browser testing and automation
- **Command**: `mcp-server-playwright`
- **Capabilities**:
  - Cross-browser automation (Chrome, Firefox, Safari, Edge)
  - End-to-end testing
  - Web scraping and data extraction
  - Screenshot and PDF generation
  - Performance testing and monitoring

### 5. Browser MCP Server
- **Package**: `@browsermcp/mcp`
- **Purpose**: Alternative browser control and automation
- **Command**: `mcp-server-browsermcp`
- **Capabilities**:
  - Browser control and manipulation
  - Web automation scripts
  - DOM interaction and manipulation

## Configuration Files

### Claude Desktop Configuration
- **Location**: `~/.config/claude-desktop/claude_desktop_config.json`
- **Purpose**: Global MCP server configuration for Claude Desktop
- **Content**: Server definitions with commands and environment variables

### Project-Specific Configuration
- **Location**: `.claude/settings.local.json`
- **Purpose**: Project-specific permissions for MCP server commands
- **Content**: Bash command permissions for all MCP executables

### MCP Configuration Reference
- **Location**: `.claude/mcp-config.json`
- **Purpose**: Documentation and reference for installed MCP servers
- **Content**: Server descriptions, capabilities, and status information

## Usage Examples

### Context7 - Documentation Access
```bash
# Start Context7 server for documentation lookup
context7-mcp --transport stdio

# Use in Claude for documentation queries
# Example: "Find documentation for React hooks"
```

### Code Reasoning - Sequential Processing
```bash
# Start Code Reasoning server
node /usr/local/lib/node_modules/@mettamatt/code-reasoning/dist/index.js

# Use in Claude for step-by-step problem solving
# Example: "Analyze this code bug using systematic reasoning"
```

### Magic UI - Component Generation
```bash
# Start Magic UI server
magic --server

# Use in Claude for UI generation
# Example: "Generate a responsive navigation component"
```

### Playwright - Browser Automation
```bash
# Start Playwright server with specific browser
mcp-server-playwright --browser chrome --headless

# Use in Claude for browser automation
# Example: "Test the documentation website navigation"
```

### Browser MCP - Web Automation
```bash
# Start Browser MCP server
mcp-server-browsermcp

# Use in Claude for web automation tasks
# Example: "Automate form submission testing"
```

## Environment Variables

### Context7 Configuration
- `UPSTASH_REDIS_REST_URL`: Redis connection URL (optional)
- `UPSTASH_REDIS_REST_TOKEN`: Redis authentication token (optional)

### Playwright Configuration
- `PLAYWRIGHT_BROWSERS_PATH`: Browser binaries location
- `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD`: Skip browser download on install

## Security Considerations

### Permissions
- All MCP servers run with limited permissions
- File system access is restricted to project directory
- Network access is controlled and monitored

### Browser Security
- Playwright runs in sandboxed mode by default
- Network requests are filtered and monitored
- File downloads are restricted to designated directories

### Code Execution
- Code reasoning server operates in analysis mode only
- No arbitrary code execution capabilities
- All operations are logged and monitored

## Troubleshooting

### Common Issues

1. **Node.js Version Compatibility**
   - Ensure Node.js v20.5.0 or higher is installed
   - Some packages require specific Node.js versions

2. **Permission Errors**
   - Check `.claude/settings.local.json` for proper permissions
   - Ensure MCP executables have proper file permissions

3. **Server Startup Issues**
   - Verify MCP servers are properly installed globally
   - Check environment variables are configured correctly

4. **Browser Automation Failures**
   - Ensure browsers are installed for Playwright
   - Check system permissions for browser automation

### Debugging Commands

```bash
# Check MCP server installations
ls -la /usr/local/bin/ | grep mcp

# Test individual server startup
context7-mcp --help
magic --help
mcp-server-playwright --help

# Check Node.js version compatibility
node --version
npm list -g | grep mcp
```

## Integration with SuperClaude Genie

The MCP servers are integrated with the SuperClaude Genie Interactive Docs project to provide:

1. **Enhanced Documentation**: Context7 provides intelligent documentation lookup
2. **UI Generation**: Magic generates interactive components for documentation
3. **Testing Automation**: Playwright enables comprehensive testing workflows
4. **Code Analysis**: Code reasoning provides systematic problem-solving assistance
5. **Browser Control**: Browser MCP enables web automation for documentation validation

## Future Enhancements

- **Custom MCP Servers**: Develop project-specific MCP servers
- **Advanced Integrations**: Integrate with project build and deployment pipelines
- **Performance Monitoring**: Add monitoring and analytics for MCP server usage
- **Extended Capabilities**: Add more specialized MCP servers for specific use cases

---

*Generated by SuperClaude Genie Interactive Docs - MCP Integration*