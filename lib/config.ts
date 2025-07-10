import { z } from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
  SESSION_SECRET: z.string().min(32, 'Session secret must be at least 32 characters'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
});

function validateEnv() {
  try {
    return envSchema.parse({
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      SESSION_SECRET: process.env.SESSION_SECRET || 'dev-session-secret-change-in-production-minimum-32-chars',
      NODE_ENV: process.env.NODE_ENV,
      RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
      RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.errors.map(e => e.path.join('.')).join(', ');
      throw new Error(`Environment validation failed. Missing or invalid: ${missing}`);
    }
    throw error;
  }
}

export const config = validateEnv();

export const personas = {
  ARCHITECT: 'architect',
  FRONTEND: 'frontend', 
  BACKEND: 'backend',
  SECURITY: 'security',
  ANALYZER: 'analyzer',
  QA: 'qa',
  PERFORMANCE: 'performance',
  REFACTORER: 'refactorer',
  MENTOR: 'mentor',
} as const;

export type PersonaType = typeof personas[keyof typeof personas];

export const commands = {
  BUILD: 'build',
  DEV_SETUP: 'dev-setup',
  TROUBLESHOOT: 'troubleshoot',
  IMPROVE: 'improve',
  DEPLOY: 'deploy',
  SCAN: 'scan',
} as const;

export type CommandType = typeof commands[keyof typeof commands];