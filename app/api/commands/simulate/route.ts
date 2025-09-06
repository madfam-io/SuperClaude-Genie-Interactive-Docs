import { NextRequest } from "next/server";
import { z } from "zod";
import {
  withMiddleware,
  createErrorResponse,
  createSuccessResponse,
  getSessionData,
} from "@/lib/middleware";
import { ValidationError } from "@/lib/types";
import { superClaudeAI } from "@/lib/openai";
import { sessionManager, ContextAnalyzer } from "@/lib/session-manager";
import { CommandParser } from "@/lib/command-parser";

const SimulateCommandRequestSchema = z.object({
  command: z.string().min(1, "Command is required"),
  sessionId: z.string().uuid().optional(),
  includeContext: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  return withMiddleware(async (req: NextRequest) => {
    try {
      const body = await req.json();

      // Validate request
      const validationResult = SimulateCommandRequestSchema.safeParse(body);
      if (!validationResult.success) {
        throw new ValidationError(
          "Invalid simulation request",
          validationResult.error.errors,
        );
      }

      const request = validationResult.data;

      // Parse the command first
      const parsedCommand = CommandParser.parse(request.command);

      if (!parsedCommand.isValid) {
        return createSuccessResponse({
          command: request.command,
          isValid: false,
          parseErrors: parsedCommand.errors,
          suggestions: CommandParser.suggestCorrections(request.command),
          explanation: "Command parsing failed. Please check the syntax.",
          expectedResults: [],
          warnings: ["Invalid command syntax"],
          nextSteps: ["Fix command syntax", "Try again"],
        });
      }

      // Get session context if available
      let sessionContext = null;
      if (request.includeContext) {
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

        if (session) {
          sessionContext = {
            techStack: session.context.techStack,
            projectPhase: session.context.projectPhase,
            workingDirectory: session.context.workingDirectory,
            recentCommands: session.context.recentCommands?.slice(0, 3),
          };
        }
      }

      // Simulate the command using AI
      const simulation = await superClaudeAI.simulateCommand(
        request.command,
        sessionContext,
      );

      // Extract tech stack from parsed command
      const extractedTechStack = CommandParser.extractTechStack(parsedCommand);

      // Update session with simulated command
      if (request.sessionId) {
        sessionManager.addCommandToHistory(
          request.sessionId,
          `Simulate: ${request.command}`,
        );
      }

      return createSuccessResponse({
        command: request.command,
        isValid: true,
        parsedCommand: {
          command: parsedCommand.command,
          flags: parsedCommand.flags,
          args: parsedCommand.args,
        },
        extractedTechStack,
        simulation,
        sessionContext,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Command simulation error:", error);
      return createErrorResponse(error as Error, req);
    }
  })(req);
}

// Get command help and validation
export async function GET(req: NextRequest) {
  return withMiddleware(async (req: NextRequest) => {
    try {
      const searchParams = req.nextUrl.searchParams;
      const command = searchParams.get("command");

      if (command) {
        // Parse and validate specific command
        const parsed = CommandParser.parse(command);

        return createSuccessResponse({
          command,
          isValid: parsed.isValid,
          parseErrors: parsed.errors,
          suggestions: parsed.isValid
            ? []
            : CommandParser.suggestCorrections(command),
          parsedCommand: parsed.isValid
            ? {
                command: parsed.command,
                flags: parsed.flags,
                args: parsed.args,
              }
            : null,
          extractedTechStack: parsed.isValid
            ? CommandParser.extractTechStack(parsed)
            : [],
        });
      } else {
        // Return general help
        const helpText = CommandParser.generateHelp();

        return createSuccessResponse({
          help: helpText,
          supportedCommands: [
            "build",
            "dev-setup",
            "troubleshoot",
            "improve",
            "deploy",
            "scan",
          ],
          exampleCommands: [
            "/build --react --typescript --auth",
            "/scan --security --vulnerabilities",
            "/troubleshoot --performance --memory",
            "/improve --refactor --clean-code",
            "/deploy --aws --auto-scaling",
            "/dev-setup --docker --testing",
          ],
        });
      }
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}
