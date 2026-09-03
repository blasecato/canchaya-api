import type { Request } from 'express';
export interface AuthenticatedSession {
    sessionId: bigint;
    userId: bigint;
    isBlocked?: boolean;
}
export interface AuthenticatedRequest extends Request {
    auth: AuthenticatedSession;
}
