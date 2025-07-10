import { v4 as uuidv4 } from 'uuid';
import { Session, SessionCreateRequest, ContextUpdateRequest } from './types';

// In-memory session store (in production, use Redis or database)
class SessionStore {
  private sessions = new Map<string, Session>();
  private userSessions = new Map<string, string[]>();

  public create(request: SessionCreateRequest): Session {
    const sessionId = uuidv4();
    const now = new Date();

    const session: Session = {
      id: sessionId,
      userId: request.userId,
      createdAt: now,
      updatedAt: now,
      preferences: request.preferences || {},
      context: {
        projectPhase: undefined,
        techStack: [],
        recentCommands: [],
        workingDirectory: undefined,
      },
    };

    this.sessions.set(sessionId, session);

    // Track user sessions
    if (request.userId) {
      const userSessionList = this.userSessions.get(request.userId) || [];
      userSessionList.push(sessionId);
      this.userSessions.set(request.userId, userSessionList);
    }

    return session;
  }

  public get(sessionId: string): Session | null {
    return this.sessions.get(sessionId) || null;
  }

  public update(sessionId: string, updates: Partial<Session>): Session | null {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return null;
    }

    const updatedSession: Session = {
      ...session,
      ...updates,
      id: sessionId, // Ensure ID doesn't change
      updatedAt: new Date(),
    };

    this.sessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  public delete(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return false;
    }

    // Remove from user sessions tracking
    if (session.userId) {
      const userSessionList = this.userSessions.get(session.userId) || [];
      const filtered = userSessionList.filter(id => id !== sessionId);
      if (filtered.length > 0) {
        this.userSessions.set(session.userId, filtered);
      } else {
        this.userSessions.delete(session.userId);
      }
    }

    return this.sessions.delete(sessionId);
  }

  public getUserSessions(userId: string): Session[] {
    const sessionIds = this.userSessions.get(userId) || [];
    return sessionIds.map(id => this.sessions.get(id)).filter(Boolean) as Session[];
  }

  public cleanup(olderThan: Date): number {
    let cleaned = 0;
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.updatedAt < olderThan) {
        this.delete(sessionId);
        cleaned++;
      }
    }
    return cleaned;
  }

  public size(): number {
    return this.sessions.size;
  }
}

export class SessionManager {
  private static instance: SessionManager;
  private store: SessionStore;

  private constructor() {
    this.store = new SessionStore();
    this.startCleanupTask();
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public createSession(request: SessionCreateRequest): Session {
    return this.store.create(request);
  }

  public getSession(sessionId: string): Session | null {
    return this.store.get(sessionId);
  }

  public updateSession(sessionId: string, updates: Partial<Session>): Session | null {
    return this.store.update(sessionId, updates);
  }

  public deleteSession(sessionId: string): boolean {
    return this.store.delete(sessionId);
  }

  public getUserSessions(userId: string): Session[] {
    return this.store.getUserSessions(userId);
  }

  public updateContext(request: ContextUpdateRequest): Session | null {
    const session = this.store.get(request.sessionId);
    if (!session) {
      return null;
    }

    const updatedContext = {
      ...session.context,
      ...request.context,
    };

    return this.store.update(request.sessionId, { context: updatedContext });
  }

  public addCommandToHistory(sessionId: string, command: string): Session | null {
    const session = this.store.get(sessionId);
    if (!session) {
      return null;
    }

    const recentCommands = [...(session.context.recentCommands || [])];
    recentCommands.unshift(command);

    // Keep only last 10 commands
    if (recentCommands.length > 10) {
      recentCommands.splice(10);
    }

    return this.store.update(sessionId, {
      context: {
        ...session.context,
        recentCommands,
      },
    });
  }

  public getSessionStats(): {
    totalSessions: number;
    activeSessions: number;
    uniqueUsers: number;
  } {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    let activeSessions = 0;
    const uniqueUsers = new Set<string>();

    for (const session of this.getAllSessions()) {
      if (session.updatedAt > oneHourAgo) {
        activeSessions++;
      }
      if (session.userId) {
        uniqueUsers.add(session.userId);
      }
    }

    return {
      totalSessions: this.store.size(),
      activeSessions,
      uniqueUsers: uniqueUsers.size,
    };
  }

  private getAllSessions(): Session[] {
    const sessions: Session[] = [];
    const allSessionIds = Array.from((this.store as any).sessions.keys()) as string[];
    
    for (const sessionId of allSessionIds) {
      const session = this.store.get(sessionId);
      if (session) {
        sessions.push(session);
      }
    }
    
    return sessions;
  }

  private startCleanupTask(): void {
    // Clean up sessions older than 24 hours every hour
    setInterval(() => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const cleaned = this.store.cleanup(oneDayAgo);
      if (cleaned > 0) {
        console.log(`Cleaned up ${cleaned} old sessions`);
      }
    }, 60 * 60 * 1000); // Run every hour
  }
}

export class ContextAnalyzer {
  public static analyzeContext(session: Session): {
    insights: string[];
    recommendations: string[];
    suggestedPersonas: string[];
    techStack: string[];
    projectPhase: string | null;
  } {
    const insights: string[] = [];
    const recommendations: string[] = [];
    const suggestedPersonas: string[] = [];

    // Analyze tech stack
    const techStack = session.context.techStack || [];
    if (techStack.length > 0) {
      insights.push(`Working with tech stack: ${techStack.join(', ')}`);
      
      // Suggest personas based on tech stack
      if (techStack.some(tech => ['React', 'Vue', 'Angular'].includes(tech))) {
        suggestedPersonas.push('frontend');
      }
      if (techStack.some(tech => ['Node.js', 'Express', 'API'].includes(tech))) {
        suggestedPersonas.push('backend');
      }
      if (techStack.includes('TypeScript')) {
        suggestedPersonas.push('architect');
      }
    } else {
      recommendations.push('Consider specifying your tech stack for more targeted suggestions');
    }

    // Analyze recent commands
    const recentCommands = session.context.recentCommands || [];
    if (recentCommands.length > 0) {
      const commandTypes = this.categorizeCommands(recentCommands);
      
      if (commandTypes.includes('build')) {
        insights.push('Recently focused on building features');
        suggestedPersonas.push('architect', 'frontend');
      }
      if (commandTypes.includes('troubleshoot')) {
        insights.push('Recently troubleshooting issues');
        suggestedPersonas.push('analyzer', 'performance');
      }
      if (commandTypes.includes('scan')) {
        insights.push('Recently focused on code analysis');
        suggestedPersonas.push('security', 'qa');
      }
      if (commandTypes.includes('improve')) {
        insights.push('Recently improving code quality');
        suggestedPersonas.push('refactorer', 'performance');
      }
    }

    // Analyze project phase
    const projectPhase = session.context.projectPhase;
    if (projectPhase) {
      insights.push(`Project phase: ${projectPhase}`);
      
      switch (projectPhase.toLowerCase()) {
        case 'planning':
        case 'design':
          suggestedPersonas.push('architect', 'mentor');
          break;
        case 'development':
        case 'implementation':
          suggestedPersonas.push('frontend', 'backend');
          break;
        case 'testing':
          suggestedPersonas.push('qa', 'analyzer');
          break;
        case 'deployment':
        case 'production':
          suggestedPersonas.push('security', 'performance');
          break;
        case 'maintenance':
          suggestedPersonas.push('refactorer', 'analyzer');
          break;
      }
    }

    // Remove duplicates and limit suggestions
    const uniquePersonas = [...new Set(suggestedPersonas)].slice(0, 3);

    // General recommendations
    if (session.context.recentCommands && session.context.recentCommands.length > 5) {
      recommendations.push('Consider using different personas for varied perspectives');
    }
    
    if (!session.preferences.defaultPersona) {
      recommendations.push('Set a default persona based on your primary role');
    }

    return {
      insights,
      recommendations,
      suggestedPersonas: uniquePersonas,
      techStack,
      projectPhase: projectPhase || null,
    };
  }

  private static categorizeCommands(commands: string[]): string[] {
    const categories: string[] = [];
    
    for (const command of commands) {
      if (command.startsWith('/build')) categories.push('build');
      else if (command.startsWith('/troubleshoot')) categories.push('troubleshoot');
      else if (command.startsWith('/scan')) categories.push('scan');
      else if (command.startsWith('/improve')) categories.push('improve');
      else if (command.startsWith('/deploy')) categories.push('deploy');
      else if (command.startsWith('/dev-setup')) categories.push('setup');
    }

    return [...new Set(categories)];
  }

  public static generateContextPrompt(session: Session): string {
    const analysis = this.analyzeContext(session);
    
    let contextPrompt = '';
    
    if (analysis.techStack.length > 0) {
      contextPrompt += `Current tech stack: ${analysis.techStack.join(', ')}\n`;
    }
    
    if (analysis.projectPhase) {
      contextPrompt += `Project phase: ${analysis.projectPhase}\n`;
    }
    
    if (session.context.recentCommands && session.context.recentCommands.length > 0) {
      contextPrompt += `Recent commands: ${session.context.recentCommands.slice(0, 3).join(', ')}\n`;
    }
    
    if (session.context.workingDirectory) {
      contextPrompt += `Working directory: ${session.context.workingDirectory}\n`;
    }

    return contextPrompt.trim();
  }
}

export const sessionManager = SessionManager.getInstance();