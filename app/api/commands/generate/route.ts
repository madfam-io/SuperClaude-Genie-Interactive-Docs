import { NextRequest } from "next/server";
import {
  withMiddleware,
  createErrorResponse,
  createSuccessResponse,
  getSessionData,
} from "@/lib/middleware";
import { GenerateCommandsRequestSchema, ValidationError } from "@/lib/types";
import { superClaudeAI } from "@/lib/openai";
import { sessionManager, ContextAnalyzer } from "@/lib/session-manager";
import { CommandParser } from "@/lib/command-parser";

async function generateCommandsHandler(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate request
    const validationResult = GenerateCommandsRequestSchema.safeParse(body);
    if (!validationResult.success) {
      throw new ValidationError(
        "Invalid request format",
        validationResult.error.errors,
      );
    }

    const request = validationResult.data;

    // Get or create session
    let session = null;
    if (request.sessionId) {
      session = sessionManager.getSession(request.sessionId);
    }

    // If no session provided or session not found, get from cookies
    if (!session) {
      const sessionData = await getSessionData(req);
      if (sessionData?.sessionId) {
        session = sessionManager.getSession(sessionData.sessionId);
      }
    }

    // Enhance request with session context
    let enhancedRequest = { ...request };
    if (session) {
      const contextPrompt = ContextAnalyzer.generateContextPrompt(session);
      if (contextPrompt) {
        enhancedRequest.prompt += `\n\nContext: ${contextPrompt}`;
      }

      // Use session preferences if not provided
      if (!enhancedRequest.techStack && session.context.techStack) {
        enhancedRequest.techStack = session.context.techStack;
      }
      if (!enhancedRequest.projectPhase && session.context.projectPhase) {
        enhancedRequest.projectPhase = session.context.projectPhase;
      }
    }

    // Generate commands using streaming
    const streamResponse =
      await superClaudeAI.generateCommands(enhancedRequest);

    // Update session with the command request
    if (session) {
      sessionManager.addCommandToHistory(
        session.id,
        `Generate: ${request.prompt}`,
      );
    }

    return streamResponse;
  } catch (error) {
    console.error("Command generation error:", error);
    return createErrorResponse(error as Error, req);
  }
}

async function generateCommandsJSONHandler(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate request
    const validationResult = GenerateCommandsRequestSchema.safeParse(body);
    if (!validationResult.success) {
      throw new ValidationError(
        "Invalid request format",
        validationResult.error.errors,
      );
    }

    const request = validationResult.data;

    // Get session context (same as streaming version)
    let session = null;
    if (request.sessionId) {
      session = sessionManager.getSession(request.sessionId);
    }

    if (!session) {
      const sessionData = await getSessionData(req);
      if (sessionData?.sessionId) {
        session = sessionManager.getSession(sessionData.sessionId);
      }
    }

    // Enhance request with session context
    let enhancedRequest = { ...request };
    if (session) {
      const contextPrompt = ContextAnalyzer.generateContextPrompt(session);
      if (contextPrompt) {
        enhancedRequest.prompt += `\n\nContext: ${contextPrompt}`;
      }

      if (!enhancedRequest.techStack && session.context.techStack) {
        enhancedRequest.techStack = session.context.techStack;
      }
      if (!enhancedRequest.projectPhase && session.context.projectPhase) {
        enhancedRequest.projectPhase = session.context.projectPhase;
      }
    }

    // Generate commands as JSON
    const commands =
      await superClaudeAI.generateCommandsAsJSON(enhancedRequest);

    // Validate generated commands
    const validatedCommands = commands.map((cmd) => {
      const parsed = CommandParser.parse(cmd.command);
      return {
        ...cmd,
        isValid: parsed.isValid,
        parseErrors: parsed.errors,
        extractedFlags: parsed.flags,
      };
    });

    // Update session with the command request
    if (session) {
      sessionManager.addCommandToHistory(
        session.id,
        `Generate: ${request.prompt}`,
      );
    }

    return createSuccessResponse({
      commands: validatedCommands,
      metadata: {
        persona: request.persona,
        sessionId: session?.id,
        timestamp: new Date().toISOString(),
        totalCommands: validatedCommands.length,
      },
    });
  } catch (error) {
    console.error("JSON command generation error:", error);
    return createErrorResponse(error as Error, req);
  }
}

// Main route handler
export async function POST(req: NextRequest) {
  // Check if client wants JSON response
  const acceptHeader = req.headers.get("accept");
  const wantsJSON =
    acceptHeader?.includes("application/json") &&
    !acceptHeader?.includes("text/stream");

  if (wantsJSON) {
    return withMiddleware(generateCommandsJSONHandler)(req);
  } else {
    // For streaming responses, don't use middleware wrapper
    return generateCommandsHandler(req);
  }
}

// Get available commands and examples
export async function GET(req: NextRequest) {
  return withMiddleware(async (req: NextRequest) => {
    try {
      const searchParams = req.nextUrl.searchParams;
      const persona = searchParams.get("persona");

      let examples: string[] = [];
      if (persona) {
        // Get persona-specific examples
        const { getPersonaContext } = await import("@/lib/personas");
        const personaContext = getPersonaContext(persona);
        if (personaContext) {
          examples = personaContext.commandExamples;
        }
      } else {
        // Get general examples
        examples = [
          "/build --react --typescript --component-library",
          "/scan --security --vulnerabilities --owasp",
          "/troubleshoot --performance --memory --database",
          "/improve --refactor --clean-code --documentation",
          "/deploy --aws --auto-scaling --monitoring",
          "/dev-setup --docker --testing --ci-cd",
        ];
      }

      const helpText = CommandParser.generateHelp();

      return createSuccessResponse({
        examples,
        help: helpText,
        availableCommands: [
          "build",
          "dev-setup",
          "troubleshoot",
          "improve",
          "deploy",
          "scan",
        ],
        supportedPersonas: [
          "architect",
          "frontend",
          "backend",
          "security",
          "analyzer",
          "qa",
          "performance",
          "refactorer",
          "mentor",
        ],
      });
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}
