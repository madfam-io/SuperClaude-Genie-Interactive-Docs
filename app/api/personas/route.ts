import { NextRequest } from 'next/server';
import { withMiddleware, createErrorResponse, createSuccessResponse } from '@/lib/middleware';
import { getAllPersonas, getPersonaContext } from '@/lib/personas';

// Get all personas or specific persona
export async function GET(req: NextRequest) {
  return withMiddleware(async (req: NextRequest) => {
    try {
      const searchParams = req.nextUrl.searchParams;
      const personaId = searchParams.get('id');

      if (personaId) {
        // Get specific persona
        const persona = getPersonaContext(personaId);
        if (!persona) {
          return createErrorResponse(new Error(`Persona not found: ${personaId}`), req);
        }

        return createSuccessResponse({
          persona,
        });
      } else {
        // Get all personas
        const personas = getAllPersonas();
        
        // Create summary for list view
        const personasSummary = personas.map(persona => ({
          id: persona.id,
          name: persona.name,
          description: persona.description,
          expertise: persona.expertise.slice(0, 3), // First 3 expertise areas
          capabilities: persona.capabilities.slice(0, 3), // First 3 capabilities
          commandExamples: persona.commandExamples.slice(0, 2), // First 2 examples
        }));

        return createSuccessResponse({
          personas: personasSummary,
          totalPersonas: personas.length,
        });
      }
    } catch (error) {
      return createErrorResponse(error as Error, req);
    }
  })(req);
}