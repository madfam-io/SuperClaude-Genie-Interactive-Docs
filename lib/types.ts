import { z } from 'zod';
import { personas, commands } from './config';

// Persona schemas
export const PersonaSchema = z.enum([
  personas.ARCHITECT,
  personas.FRONTEND,
  personas.BACKEND,
  personas.SECURITY,
  personas.ANALYZER,
  personas.QA,
  personas.PERFORMANCE,
  personas.REFACTORER,
  personas.MENTOR,
]);

export const CommandSchema = z.enum([
  commands.BUILD,
  commands.DEV_SETUP,
  commands.TROUBLESHOOT,
  commands.IMPROVE,
  commands.DEPLOY,
  commands.SCAN,
]);

// Request schemas
export const GenerateCommandsRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  persona: PersonaSchema,
  techStack: z.array(z.string()).optional(),
  projectPhase: z.string().optional(),
  sessionId: z.string().uuid().optional(),
  maxCommands: z.number().min(1).max(10).default(3),
});

export const SessionCreateRequestSchema = z.object({
  userId: z.string().optional(),
  preferences: z.object({
    defaultPersona: PersonaSchema.optional(),
    techStack: z.array(z.string()).optional(),
  }).optional(),
});

export const ContextUpdateRequestSchema = z.object({
  sessionId: z.string().uuid(),
  context: z.object({
    projectPhase: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    recentCommands: z.array(z.string()).optional(),
    workingDirectory: z.string().optional(),
  }),
});

// Response types
export interface GeneratedCommand {
  id: string;
  command: string;
  description: string;
  explanation: string;
  expectedOutput: string;
  nextSteps: string[];
  persona: string;
  confidence: number;
}

export interface Session {
  id: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    defaultPersona?: string;
    techStack?: string[];
  };
  context: {
    projectPhase?: string;
    techStack?: string[];
    recentCommands?: string[];
    workingDirectory?: string;
  };
}

export interface PersonaContext {
  id: string;
  name: string;
  description: string;
  expertise: string[];
  systemPrompt: string;
  commandExamples: string[];
  capabilities: string[];
}

export interface StreamChunk {
  type: 'command' | 'explanation' | 'complete' | 'error';
  data: any;
  timestamp: number;
}

// Error types
export class APIError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string, public errors?: any) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

// Type exports
export type Persona = z.infer<typeof PersonaSchema>;
export type Command = z.infer<typeof CommandSchema>;
export type GenerateCommandsRequest = z.infer<typeof GenerateCommandsRequestSchema>;
export type SessionCreateRequest = z.infer<typeof SessionCreateRequestSchema>;
export type ContextUpdateRequest = z.infer<typeof ContextUpdateRequestSchema>;