import { GenerateCommandsRequest, GeneratedCommand, Session, PersonaContext } from './types';

class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class SuperClaudeAPIClient {
  private baseUrl: string;
  private sessionId: string | null = null;

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
    this.loadSessionFromStorage();
  }

  private loadSessionFromStorage(): void {
    if (typeof window !== 'undefined') {
      this.sessionId = localStorage.getItem('superclaude_session_id');
    }
  }

  private saveSessionToStorage(sessionId: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('superclaude_session_id', sessionId);
    }
    this.sessionId = sessionId;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new APIError(
        errorData.error || 'Request failed',
        response.status,
        errorData.code
      );
    }

    const data = await response.json();
    return data.data || data;
  }

  // Session Management
  async createSession(preferences?: any): Promise<Session> {
    const response = await this.request<{ session: Session }>('/sessions', {
      method: 'POST',
      body: JSON.stringify({ preferences }),
    });

    this.saveSessionToStorage(response.session.id);
    return response.session;
  }

  async getSession(sessionId?: string): Promise<Session | null> {
    const id = sessionId || this.sessionId;
    if (!id) return null;

    try {
      const response = await this.request<{ session: Session }>(`/sessions?sessionId=${id}`);
      return response.session;
    } catch (error) {
      if (error instanceof APIError && error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  async updateContext(context: any): Promise<Session | null> {
    if (!this.sessionId) return null;

    const response = await this.request<{ session: Session }>(`/sessions/${this.sessionId}`, {
      method: 'PUT',
      body: JSON.stringify({ context }),
    });

    return response.session;
  }

  // Command Generation
  async generateCommands(request: GenerateCommandsRequest): Promise<ReadableStream<Uint8Array> | null> {
    if (this.sessionId) {
      request.sessionId = this.sessionId;
    }

    const response = await fetch(`${this.baseUrl}/commands/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/stream',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new APIError(
        errorData.error || 'Request failed',
        response.status,
        errorData.code
      );
    }

    return response.body;
  }

  async generateCommandsAsJSON(request: GenerateCommandsRequest): Promise<GeneratedCommand[]> {
    if (this.sessionId) {
      request.sessionId = this.sessionId;
    }

    const response = await this.request<{ commands: GeneratedCommand[] }>('/commands/generate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.commands;
  }

  async getCommandExamples(persona?: string): Promise<{
    examples: string[];
    help: string;
    availableCommands: string[];
    supportedPersonas: string[];
  }> {
    const url = persona ? `/commands/generate?persona=${persona}` : '/commands/generate';
    return this.request(url);
  }

  // Command Simulation
  async simulateCommand(
    command: string,
    includeContext = true
  ): Promise<{
    command: string;
    isValid: boolean;
    simulation?: any;
    parseErrors?: string[];
    suggestions?: string[];
  }> {
    const body: any = { command, includeContext };
    if (this.sessionId) {
      body.sessionId = this.sessionId;
    }

    return this.request('/commands/simulate', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async validateCommand(command: string): Promise<{
    command: string;
    isValid: boolean;
    parseErrors?: string[];
    suggestions?: string[];
    parsedCommand?: any;
  }> {
    return this.request(`/commands/simulate?command=${encodeURIComponent(command)}`);
  }

  // Personas
  async getPersonas(): Promise<PersonaContext[]> {
    const response = await this.request<{ personas: PersonaContext[] }>('/personas');
    return response.personas;
  }

  async getPersona(personaId: string, includePrompt = false): Promise<PersonaContext> {
    const url = `/personas/${personaId}${includePrompt ? '?includePrompt=true' : ''}`;
    const response = await this.request<{ persona: PersonaContext }>(url);
    return response.persona;
  }

  // Health Check
  async getHealth(detailed = false): Promise<any> {
    const url = detailed ? '/health?detailed=true' : '/health';
    return this.request(url);
  }

  // Utility Methods
  getSessionId(): string | null {
    return this.sessionId;
  }

  clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('superclaude_session_id');
    }
    this.sessionId = null;
  }

  // Stream Processing Helper
  async processStream(
    stream: ReadableStream<Uint8Array>,
    onChunk: (chunk: string) => void,
    onComplete?: () => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          onComplete?.();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        onChunk(chunk);
      }
    } catch (error) {
      onError?.(error as Error);
    }
  }
}

// Export singleton instance
export const apiClient = new SuperClaudeAPIClient();

// React Hook for using the API client
export function useSupeClaudeAPI() {
  return {
    client: apiClient,
    
    // Session helpers
    async initializeSession(preferences?: any) {
      let session = await apiClient.getSession();
      if (!session) {
        session = await apiClient.createSession(preferences);
      }
      return session;
    },

    // Command generation helpers
    async generateCommandsStream(
      request: GenerateCommandsRequest,
      onChunk: (chunk: string) => void,
      onComplete?: () => void,
      onError?: (error: Error) => void
    ) {
      try {
        const stream = await apiClient.generateCommands(request);
        if (stream) {
          await apiClient.processStream(stream, onChunk, onComplete, onError);
        }
      } catch (error) {
        onError?.(error as Error);
      }
    },

    // Error handling
    isAPIError(error: unknown): error is APIError {
      return error instanceof APIError;
    },
  };
}