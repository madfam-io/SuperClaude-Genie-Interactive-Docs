import { NextRequest } from "next/server";
import {
  withMiddleware,
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/middleware";
import { getPersonaContext } from "@/lib/personas";

// Get detailed persona information
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ personaId: string }> },
) {
  const { personaId } = await params;
  return withMiddleware(async (req: NextRequest) => {
    try {
      const persona = getPersonaContext(personaId);
      if (!persona) {
        return createErrorResponse(
          new Error(`Persona not found: ${personaId}`),
          req,
        );
      }

      const searchParams = req.nextUrl.searchParams;
      const includePrompt = searchParams.get("includePrompt") === "true";

      const response: any = {
        persona: {
          id: persona.id,
          name: persona.name,
          description: persona.description,
          expertise: persona.expertise,
          capabilities: persona.capabilities,
          commandExamples: persona.commandExamples,
        },
      };

      // Only include system prompt if specifically requested (for security)
      if (includePrompt) {
        response.persona.systemPrompt = persona.systemPrompt;
      }

      return createSuccessResponse(response);
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}
