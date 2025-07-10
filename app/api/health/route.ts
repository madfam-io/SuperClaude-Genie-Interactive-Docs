import { NextRequest } from 'next/server';
import { withMiddleware, createSuccessResponse, createErrorResponse } from '@/lib/middleware';
import { config } from '@/lib/config';
import { sessionManager } from '@/lib/session-manager';
import { getAllPersonas } from '@/lib/personas';

export async function GET(req: NextRequest) {
  return withMiddleware(async (req: NextRequest) => {
    try {
      const searchParams = req.nextUrl.searchParams;
      const detailed = searchParams.get('detailed') === 'true';

      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: config.NODE_ENV,
      };

      if (detailed) {
        // Get detailed system information
        const sessionStats = sessionManager.getSessionStats();
        const personas = getAllPersonas();

        const detailedHealth = {
          ...health,
          services: {
            openai: {
              status: config.OPENAI_API_KEY ? 'configured' : 'not_configured',
              hasApiKey: !!config.OPENAI_API_KEY,
            },
            sessions: {
              status: 'active',
              stats: sessionStats,
            },
            personas: {
              status: 'active',
              count: personas.length,
              available: personas.map(p => ({ id: p.id, name: p.name })),
            },
            rateLimiting: {
              status: 'active',
              windowMs: config.RATE_LIMIT_WINDOW_MS,
              maxRequests: config.RATE_LIMIT_MAX_REQUESTS,
            },
          },
          features: {
            commandGeneration: true,
            streaming: true,
            sessionManagement: true,
            contextAware: true,
            personaSystem: true,
            commandParsing: true,
            commandSimulation: true,
          },
          endpoints: {
            'POST /api/commands/generate': 'Generate SuperClaude commands with streaming',
            'GET /api/commands/generate': 'Get command examples and help',
            'POST /api/commands/simulate': 'Simulate command execution',
            'GET /api/commands/simulate': 'Validate commands and get help',
            'POST /api/sessions': 'Create new session',
            'GET /api/sessions': 'Get session stats or specific session',
            'PUT /api/sessions/[id]': 'Update session context',
            'DELETE /api/sessions/[id]': 'Delete session',
            'GET /api/personas': 'List all personas',
            'GET /api/personas/[id]': 'Get specific persona details',
            'GET /api/health': 'System health check',
          },
        };

        return createSuccessResponse(detailedHealth);
      }

      return createSuccessResponse(health);
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}