import { z } from 'zod';

// Command flag schemas
const CommonFlagsSchema = z.object({
  help: z.boolean().optional(),
  verbose: z.boolean().optional(),
  quiet: z.boolean().optional(),
  force: z.boolean().optional(),
  dryRun: z.boolean().optional(),
});

const BuildFlagsSchema = CommonFlagsSchema.extend({
  // Framework flags
  react: z.boolean().optional(),
  vue: z.boolean().optional(),
  angular: z.boolean().optional(),
  nextjs: z.boolean().optional(),
  
  // Backend flags
  api: z.boolean().optional(),
  express: z.boolean().optional(),
  fastify: z.boolean().optional(),
  nodejs: z.boolean().optional(),
  
  // Database flags
  postgres: z.boolean().optional(),
  mongodb: z.boolean().optional(),
  redis: z.boolean().optional(),
  sqlite: z.boolean().optional(),
  
  // Language flags
  typescript: z.boolean().optional(),
  javascript: z.boolean().optional(),
  
  // Testing flags
  jest: z.boolean().optional(),
  cypress: z.boolean().optional(),
  testing: z.boolean().optional(),
  
  // Deployment flags
  docker: z.boolean().optional(),
  kubernetes: z.boolean().optional(),
  vercel: z.boolean().optional(),
  aws: z.boolean().optional(),
  
  // Features
  auth: z.boolean().optional(),
  openai: z.boolean().optional(),
  streaming: z.boolean().optional(),
  rateLimiting: z.boolean().optional(),
  componentLibrary: z.boolean().optional(),
  shadcnUi: z.boolean().optional(),
  customTheme: z.boolean().optional(),
  darkMode: z.boolean().optional(),
  accessibility: z.boolean().optional(),
  storybook: z.boolean().optional(),
  docs: z.boolean().optional(),
  
  // Additional parameters
  name: z.string().optional(),
  output: z.string().optional(),
  template: z.string().optional(),
});

const TroubleshootFlagsSchema = CommonFlagsSchema.extend({
  performance: z.boolean().optional(),
  memory: z.boolean().optional(),
  cpu: z.boolean().optional(),
  network: z.boolean().optional(),
  database: z.boolean().optional(),
  logs: z.boolean().optional(),
  errors: z.boolean().optional(),
  dependencies: z.boolean().optional(),
});

const ScanFlagsSchema = CommonFlagsSchema.extend({
  security: z.boolean().optional(),
  vulnerabilities: z.boolean().optional(),
  dependencies: z.boolean().optional(),
  performance: z.boolean().optional(),
  quality: z.boolean().optional(),
  coverage: z.boolean().optional(),
  owasp: z.boolean().optional(),
  architecture: z.boolean().optional(),
});

const ImproveFlagsSchema = CommonFlagsSchema.extend({
  performance: z.boolean().optional(),
  security: z.boolean().optional(),
  refactor: z.boolean().optional(),
  cleanup: z.boolean().optional(),
  optimize: z.boolean().optional(),
  documentation: z.boolean().optional(),
  tests: z.boolean().optional(),
  accessibility: z.boolean().optional(),
});

// Parsed command interface
export interface ParsedCommand {
  command: string;
  subcommand?: string;
  flags: Record<string, boolean | string>;
  args: string[];
  raw: string;
  isValid: boolean;
  errors: string[];
}

export class CommandParser {
  private static readonly COMMAND_PATTERNS = {
    build: /^\/build\b/,
    'dev-setup': /^\/dev-setup\b/,
    troubleshoot: /^\/troubleshoot\b/,
    improve: /^\/improve\b/,
    deploy: /^\/deploy\b/,
    scan: /^\/scan\b/,
  };

  private static readonly FLAG_PATTERNS = {
    boolean: /--([a-z-]+)(?=\s|$)/g,
    keyValue: /--([a-z-]+)=([^\s]+)/g,
    shortFlag: /-([a-z])/g,
  };

  public static parse(commandString: string): ParsedCommand {
    const trimmed = commandString.trim();
    const result: ParsedCommand = {
      command: '',
      flags: {},
      args: [],
      raw: trimmed,
      isValid: false,
      errors: [],
    };

    try {
      // Extract main command
      const commandMatch = trimmed.match(/^\/([a-z-]+)/);
      if (!commandMatch) {
        result.errors.push('Invalid command format. Commands must start with /');
        return result;
      }

      result.command = commandMatch[1];

      // Validate command exists
      if (!this.isValidCommand(result.command)) {
        result.errors.push(`Unknown command: ${result.command}`);
        return result;
      }

      // Parse flags and arguments
      const flagsAndArgs = trimmed.slice(commandMatch[0].length).trim();
      this.parseFlags(flagsAndArgs, result);
      this.parseArguments(flagsAndArgs, result);

      // Validate flags for specific commands
      this.validateFlags(result);

      result.isValid = result.errors.length === 0;
      return result;
    } catch (error) {
      result.errors.push(`Parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return result;
    }
  }

  private static isValidCommand(command: string): boolean {
    return Object.keys(this.COMMAND_PATTERNS).includes(command);
  }

  private static parseFlags(input: string, result: ParsedCommand): void {
    // Parse boolean flags (--flag)
    const booleanMatches = input.matchAll(this.FLAG_PATTERNS.boolean);
    for (const match of booleanMatches) {
      const flagName = this.camelCase(match[1]);
      result.flags[flagName] = true;
    }

    // Parse key-value flags (--flag=value)
    const keyValueMatches = input.matchAll(this.FLAG_PATTERNS.keyValue);
    for (const match of keyValueMatches) {
      const flagName = this.camelCase(match[1]);
      result.flags[flagName] = match[2];
    }

    // Parse short flags (-f)
    const shortMatches = input.matchAll(this.FLAG_PATTERNS.shortFlag);
    for (const match of shortMatches) {
      const flagName = match[1];
      result.flags[flagName] = true;
    }
  }

  private static parseArguments(input: string, result: ParsedCommand): void {
    // Remove all flags to get remaining arguments
    const withoutFlags = input
      .replace(/--[a-z-]+(?:=[^\s]+)?/g, '')
      .replace(/-[a-z]/g, '')
      .trim();

    if (withoutFlags) {
      result.args = withoutFlags.split(/\s+/).filter(arg => arg.length > 0);
    }
  }

  private static validateFlags(result: ParsedCommand): void {
    let schema: z.ZodSchema;

    switch (result.command) {
      case 'build':
        schema = BuildFlagsSchema;
        break;
      case 'troubleshoot':
        schema = TroubleshootFlagsSchema;
        break;
      case 'scan':
        schema = ScanFlagsSchema;
        break;
      case 'improve':
        schema = ImproveFlagsSchema;
        break;
      default:
        schema = CommonFlagsSchema;
    }

    try {
      schema.parse(result.flags);
    } catch (error) {
      if (error instanceof z.ZodError) {
        result.errors.push(...error.errors.map(e => `Invalid flag: ${e.path.join('.')}`));
      }
    }
  }

  private static camelCase(str: string): string {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  public static generateHelp(command?: string): string {
    if (command) {
      return this.getCommandHelp(command);
    }

    return `SuperClaude Commands:

/build       - Create code and features
/dev-setup   - Environment setup
/troubleshoot- Debug issues
/improve     - Optimize code
/deploy      - Deployment magic
/scan        - Security analysis

Use --help with any command for detailed options.
Example: /build --help`;
  }

  private static getCommandHelp(command: string): string {
    const helpTexts: Record<string, string> = {
      build: `
/build - Create Code & Features

Usage: /build [options] [name]

Framework Options:
  --react              Use React framework
  --vue                Use Vue framework
  --nextjs             Use Next.js framework
  --api                Build API/backend
  --typescript         Use TypeScript

Database Options:
  --postgres           Use PostgreSQL
  --mongodb            Use MongoDB
  --redis              Use Redis
  --sqlite             Use SQLite

Features:
  --auth               Add authentication
  --openai             Add OpenAI integration
  --streaming          Add streaming capabilities
  --component-library  Build component library
  --storybook          Add Storybook documentation
  --dark-mode          Add dark mode support

Examples:
  /build --react --typescript --auth
  /build --api --nodejs --postgres --auth
  /build --component-library --storybook --dark-mode
      `,
      troubleshoot: `
/troubleshoot - Debug Issues

Usage: /troubleshoot [options]

Options:
  --performance        Debug performance issues
  --memory             Check memory usage
  --network            Debug network issues
  --database           Debug database issues
  --logs               Analyze logs
  --errors             Find and fix errors

Examples:
  /troubleshoot --performance --memory
  /troubleshoot --database --logs
      `,
      scan: `
/scan - Security Analysis

Usage: /scan [options]

Options:
  --security           Security vulnerability scan
  --dependencies       Check dependency vulnerabilities
  --owasp              OWASP security check
  --performance        Performance analysis
  --quality            Code quality analysis

Examples:
  /scan --security --owasp
  /scan --dependencies --vulnerabilities
      `,
    };

    return helpTexts[command] || `No help available for command: ${command}`;
  }

  public static extractTechStack(parsed: ParsedCommand): string[] {
    const techStack: string[] = [];

    // Frontend frameworks
    if (parsed.flags.react) techStack.push('React');
    if (parsed.flags.vue) techStack.push('Vue');
    if (parsed.flags.angular) techStack.push('Angular');
    if (parsed.flags.nextjs) techStack.push('Next.js');

    // Backend
    if (parsed.flags.api) techStack.push('API');
    if (parsed.flags.express) techStack.push('Express');
    if (parsed.flags.nodejs) techStack.push('Node.js');

    // Languages
    if (parsed.flags.typescript) techStack.push('TypeScript');
    if (parsed.flags.javascript) techStack.push('JavaScript');

    // Databases
    if (parsed.flags.postgres) techStack.push('PostgreSQL');
    if (parsed.flags.mongodb) techStack.push('MongoDB');
    if (parsed.flags.redis) techStack.push('Redis');

    return techStack;
  }

  public static suggestCorrections(commandString: string): string[] {
    const suggestions: string[] = [];
    const validCommands = Object.keys(this.COMMAND_PATTERNS);

    // Extract attempted command
    const match = commandString.match(/^\/([a-z-]+)/);
    if (match) {
      const attempted = match[1];
      
      // Find similar commands using Levenshtein distance
      const similar = validCommands.filter(cmd => 
        this.levenshteinDistance(attempted, cmd) <= 2
      );

      if (similar.length > 0) {
        suggestions.push(`Did you mean: ${similar.map(s => `/${s}`).join(', ')}`);
      }
    }

    // Common flag corrections
    if (commandString.includes('--help')) {
      suggestions.push('Use /help for general help or /command --help for specific command help');
    }

    return suggestions;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }
}