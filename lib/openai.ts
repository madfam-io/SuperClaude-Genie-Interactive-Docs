import OpenAI from 'openai';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { config } from './config';
import { getPersonaContext } from './personas';
import { GenerateCommandsRequest, GeneratedCommand, StreamChunk } from './types';
import { v4 as uuidv4 } from 'uuid';

// Initialize OpenAI clients
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY || 'placeholder-key-for-build',
});

const vercelOpenAI = createOpenAI({
  apiKey: config.OPENAI_API_KEY || 'placeholder-key-for-build',
});

export class SuperClaudeAI {
  private static instance: SuperClaudeAI;

  private constructor() {}

  public static getInstance(): SuperClaudeAI {
    if (!SuperClaudeAI.instance) {
      SuperClaudeAI.instance = new SuperClaudeAI();
    }
    return SuperClaudeAI.instance;
  }

  public async generateCommands(request: GenerateCommandsRequest) {
    const persona = getPersonaContext(request.persona);
    if (!persona) {
      throw new Error(`Invalid persona: ${request.persona}`);
    }

    const systemPrompt = this.buildSystemPrompt(persona, request);
    const userPrompt = this.buildUserPrompt(request);

    if (!config.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required but not configured');
    }

    try {
      const result = await streamText({
        model: vercelOpenAI('gpt-4-turbo-preview'),
        system: systemPrompt,
        prompt: userPrompt,
        temperature: 0.7,
        maxTokens: 2000,
      });

      return result.toDataStreamResponse();
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate commands');
    }
  }

  public async generateCommandsAsJSON(request: GenerateCommandsRequest): Promise<GeneratedCommand[]> {
    const persona = getPersonaContext(request.persona);
    if (!persona) {
      throw new Error(`Invalid persona: ${request.persona}`);
    }

    const systemPrompt = this.buildJSONSystemPrompt(persona, request);
    const userPrompt = this.buildUserPrompt(request);

    if (!config.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required but not configured');
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const parsed = JSON.parse(content);
      return this.validateAndFormatCommands(parsed.commands, request.persona);
    } catch (error) {
      console.error('OpenAI JSON generation error:', error);
      throw new Error('Failed to generate commands as JSON');
    }
  }

  private buildSystemPrompt(persona: any, request: GenerateCommandsRequest): string {
    return `${persona.systemPrompt}

IMPORTANT INSTRUCTIONS:
1. Generate exactly ${request.maxCommands} SuperClaude commands based on the user's request
2. Each command should follow SuperClaude syntax (starting with /)
3. Provide detailed explanations for each command
4. Consider the user's tech stack: ${request.techStack?.join(', ') || 'not specified'}
5. Consider the project phase: ${request.projectPhase || 'not specified'}
6. Format your response as streaming text with clear command separations

Command Format:
🎯 **Command [N]:** \`/command --flags --options\`
📝 **Description:** Brief description of what this command does
💡 **Explanation:** Detailed explanation of the command and its purpose
🎯 **Expected Output:** What the user should expect to see
🔄 **Next Steps:** Recommended follow-up actions

Generate commands that are:
- Specific to the ${persona.name} persona expertise
- Relevant to the user's request and context
- Practical and actionable
- Well-explained with clear reasoning`;
  }

  private buildJSONSystemPrompt(persona: any, request: GenerateCommandsRequest): string {
    return `${persona.systemPrompt}

Generate exactly ${request.maxCommands} SuperClaude commands as JSON based on the user's request.

Consider:
- Tech stack: ${request.techStack?.join(', ') || 'not specified'}
- Project phase: ${request.projectPhase || 'not specified'}
- Persona expertise: ${persona.expertise.join(', ')}

Return a JSON object with this exact structure:
{
  "commands": [
    {
      "id": "unique-uuid",
      "command": "/build --flags --options",
      "description": "Brief description",
      "explanation": "Detailed explanation",
      "expectedOutput": "What user should expect",
      "nextSteps": ["step 1", "step 2"],
      "persona": "${persona.id}",
      "confidence": 0.95
    }
  ]
}

Commands should be:
- Specific to ${persona.name} expertise
- Relevant and actionable
- Following SuperClaude syntax
- Properly explained`;
  }

  private buildUserPrompt(request: GenerateCommandsRequest): string {
    let prompt = `User Request: ${request.prompt}`;
    
    if (request.techStack && request.techStack.length > 0) {
      prompt += `\n\nTech Stack: ${request.techStack.join(', ')}`;
    }
    
    if (request.projectPhase) {
      prompt += `\n\nProject Phase: ${request.projectPhase}`;
    }

    prompt += `\n\nGenerate ${request.maxCommands} relevant SuperClaude commands that would help accomplish this request.`;

    return prompt;
  }

  private async parseAndValidateCommands(completion: string, persona: string): Promise<void> {
    // Validate that the completion contains properly formatted commands
    const commandRegex = /\/\w+(?:\s+--[\w-]+)*(?:\s+[\w-]+)*/g;
    const commands = completion.match(commandRegex);
    
    if (!commands || commands.length === 0) {
      console.warn('No valid commands found in completion');
    } else {
      console.log(`Generated ${commands.length} commands for persona ${persona}`);
    }
  }

  private validateAndFormatCommands(commands: any[], persona: string): GeneratedCommand[] {
    if (!Array.isArray(commands)) {
      throw new Error('Invalid commands format');
    }

    return commands.map(cmd => ({
      id: cmd.id || uuidv4(),
      command: cmd.command || '',
      description: cmd.description || '',
      explanation: cmd.explanation || '',
      expectedOutput: cmd.expectedOutput || '',
      nextSteps: Array.isArray(cmd.nextSteps) ? cmd.nextSteps : [],
      persona: persona,
      confidence: typeof cmd.confidence === 'number' ? cmd.confidence : 0.8,
    }));
  }

  public async simulateCommand(command: string, context?: any): Promise<{
    command: string;
    explanation: string;
    expectedResults: string[];
    warnings: string[];
    nextSteps: string[];
  }> {
    const systemPrompt = `You are a SuperClaude command simulator. Analyze the given SuperClaude command and provide:
1. A detailed explanation of what the command would do
2. Expected results and outputs
3. Any warnings or considerations
4. Recommended next steps

Be specific and practical in your analysis.`;

    const userPrompt = `Simulate this SuperClaude command: ${command}

${context ? `Context: ${JSON.stringify(context)}` : ''}

Provide a detailed simulation of what would happen when this command is executed.`;

    if (!config.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required but not configured');
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const content = response.choices[0]?.message?.content || '';
      
      // Parse the response (simplified - in production, use structured parsing)
      return {
        command,
        explanation: content,
        expectedResults: ['Command simulation completed'],
        warnings: [],
        nextSteps: ['Review the results', 'Execute if appropriate'],
      };
    } catch (error) {
      console.error('Command simulation error:', error);
      throw new Error('Failed to simulate command');
    }
  }

  public async analyzeContext(context: any): Promise<{
    insights: string[];
    recommendations: string[];
    suggestedPersonas: string[];
  }> {
    const systemPrompt = `You are a SuperClaude context analyzer. Analyze the provided context and suggest:
1. Key insights about the current state
2. Recommendations for improvement
3. Which personas would be most helpful

Be concise and actionable.`;

    const userPrompt = `Analyze this context: ${JSON.stringify(context)}`;

    if (!config.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required but not configured');
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.5,
        max_tokens: 800,
      });

      const content = response.choices[0]?.message?.content || '';
      
      // Simplified parsing - in production, use structured output
      return {
        insights: [content],
        recommendations: ['Context analysis completed'],
        suggestedPersonas: ['architect', 'frontend', 'backend'],
      };
    } catch (error) {
      console.error('Context analysis error:', error);
      throw new Error('Failed to analyze context');
    }
  }
}

export const superClaudeAI = SuperClaudeAI.getInstance();