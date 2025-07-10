import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { config } from './config';
import { RateLimitError, APIError } from './types';

// Rate limiter instance
const rateLimiter = new RateLimiterMemory({
  points: config.RATE_LIMIT_MAX_REQUESTS, // Number of requests
  duration: Math.floor(config.RATE_LIMIT_WINDOW_MS / 1000), // Per window in seconds
});

// Helper function to generate rate limiting key
function getRateLimitKey(req: NextRequest): string {
  // Use IP address or session ID for rate limiting
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown';
  return ip;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Security headers
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
};

export async function withRateLimit(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const key = getRateLimitKey(req);
    await rateLimiter.consume(key);
    return await handler(req);
  } catch (rateLimiterRes: any) {
    const response = NextResponse.json(
      {
        error: 'Rate limit exceeded',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: Math.round((rateLimiterRes?.msBeforeNext || 60000) / 1000),
      },
      { status: 429 }
    );

    // Add rate limit headers
    response.headers.set('Retry-After', String(Math.round((rateLimiterRes?.msBeforeNext || 60000) / 1000)));
    response.headers.set('X-RateLimit-Limit', String(config.RATE_LIMIT_MAX_REQUESTS));
    response.headers.set('X-RateLimit-Remaining', String(rateLimiterRes?.remainingHits || 0));
    response.headers.set('X-RateLimit-Reset', String(new Date(Date.now() + (rateLimiterRes?.msBeforeNext || 60000))));

    return response;
  }
}

export function withCors(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function withSecurity(response: NextResponse): NextResponse {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function handleOptions(): NextResponse {
  const response = new NextResponse(null, { status: 200 });
  return withCors(response);
}

export function createErrorResponse(error: Error, req?: NextRequest): NextResponse {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    const response = NextResponse.json(
      {
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString(),
      },
      { status: error.statusCode }
    );
    return withSecurity(withCors(response));
  }

  // Generic error response
  const response = NextResponse.json(
    {
      error: config.NODE_ENV === 'production' ? 'Internal server error' : error.message,
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  );

  return withSecurity(withCors(response));
}

export function createSuccessResponse(data: any, status: number = 200): NextResponse {
  const response = NextResponse.json({
    data,
    timestamp: new Date().toISOString(),
  }, { status });

  return withSecurity(withCors(response));
}

// Middleware wrapper for API routes
export function withMiddleware(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return handleOptions();
      }

      // Apply rate limiting
      return await withRateLimit(req, handler);
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  };
}

// Session middleware
export async function getSessionData(req: NextRequest): Promise<any> {
  try {
    const sessionCookie = req.cookies.get('session');
    if (!sessionCookie) {
      return null;
    }

    // Simple session parsing (in production, use proper session management)
    const sessionData = JSON.parse(atob(sessionCookie.value));
    return sessionData;
  } catch (error) {
    console.error('Session parsing error:', error);
    return null;
  }
}

export function setSessionData(response: NextResponse, sessionData: any): void {
  const sessionValue = btoa(JSON.stringify(sessionData));
  response.cookies.set('session', sessionValue, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
  });
}