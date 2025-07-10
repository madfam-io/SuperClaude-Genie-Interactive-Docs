import { NextRequest } from 'next/server';
import { withMiddleware, createErrorResponse, createSuccessResponse, setSessionData } from '@/lib/middleware';
import { SessionCreateRequestSchema, ValidationError } from '@/lib/types';
import { sessionManager } from '@/lib/session-manager';

// Create new session
export async function POST(req: NextRequest) {
  return withMiddleware(async (req: NextRequest) => {
    try {
      const body = await req.json();
      
      // Validate request
      const validationResult = SessionCreateRequestSchema.safeParse(body);
      if (!validationResult.success) {
        throw new ValidationError('Invalid session creation request', validationResult.error.errors);
      }

      const request = validationResult.data;

      // Create new session
      const session = sessionManager.createSession(request);

      // Create response with session data
      const response = createSuccessResponse({
        session: {
          id: session.id,
          createdAt: session.createdAt,
          preferences: session.preferences,
        },
        message: 'Session created successfully',
      }, 201);

      // Set session cookie
      setSessionData(response, { sessionId: session.id });

      return response;
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}

// Get session statistics
export async function GET(req: NextRequest) {
  return withMiddleware(async (req: NextRequest) => {
    try {
      const searchParams = req.nextUrl.searchParams;
      const sessionId = searchParams.get('sessionId');

      if (sessionId) {
        // Get specific session
        const session = sessionManager.getSession(sessionId);
        if (!session) {
          return createErrorResponse(new Error('Session not found'), req);
        }

        return createSuccessResponse({
          session: {
            id: session.id,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            preferences: session.preferences,
            context: session.context,
          },
        });
      } else {
        // Get session statistics
        const stats = sessionManager.getSessionStats();
        return createSuccessResponse({
          stats,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}