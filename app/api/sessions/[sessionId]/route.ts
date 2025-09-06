import { NextRequest } from "next/server";
import {
  withMiddleware,
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/middleware";
import { ContextUpdateRequestSchema, ValidationError } from "@/lib/types";
import { sessionManager, ContextAnalyzer } from "@/lib/session-manager";

// Get specific session
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;
  return withMiddleware(async (req: NextRequest) => {
    try {
      const session = sessionManager.getSession(sessionId);
      if (!session) {
        return createErrorResponse(new Error("Session not found"), req);
      }

      // Analyze session context
      const analysis = ContextAnalyzer.analyzeContext(session);

      return createSuccessResponse({
        session: {
          id: session.id,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt,
          preferences: session.preferences,
          context: session.context,
        },
        analysis,
      });
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}

// Update session context
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;
  return withMiddleware(async (req: NextRequest) => {
    try {
      const body = await req.json();

      // Validate request
      const updateRequest = {
        sessionId: sessionId,
        ...body,
      };

      const validationResult =
        ContextUpdateRequestSchema.safeParse(updateRequest);
      if (!validationResult.success) {
        throw new ValidationError(
          "Invalid context update request",
          validationResult.error.errors,
        );
      }

      const request = validationResult.data;

      // Update session context
      const updatedSession = sessionManager.updateContext(request);
      if (!updatedSession) {
        return createErrorResponse(new Error("Session not found"), req);
      }

      // Analyze updated context
      const analysis = ContextAnalyzer.analyzeContext(updatedSession);

      return createSuccessResponse({
        session: {
          id: updatedSession.id,
          updatedAt: updatedSession.updatedAt,
          context: updatedSession.context,
        },
        analysis,
        message: "Session context updated successfully",
      });
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}

// Delete session
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;
  return withMiddleware(async (req: NextRequest) => {
    try {
      const deleted = sessionManager.deleteSession(sessionId);
      if (!deleted) {
        return createErrorResponse(new Error("Session not found"), req);
      }

      return createSuccessResponse({
        message: "Session deleted successfully",
        sessionId: sessionId,
      });
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}
