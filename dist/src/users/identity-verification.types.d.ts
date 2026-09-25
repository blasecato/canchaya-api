export type IdentityVerificationOutcome = 'verified' | 'mismatch' | 'unreadable';
export type IdentityMatchQuality = 'exact' | 'fuzzy' | 'none';
export interface IdentityVerificationDetails {
    idNumberMatch: IdentityMatchQuality;
    birthDateMatch: IdentityMatchQuality;
    rotationDegrees: number | null;
    ocrConfidence: number | null;
    recognizedCharacters: number;
    failureReason?: string;
}
export interface IdentityVerificationResult {
    outcome: IdentityVerificationOutcome;
    verified: boolean;
    requiresManualReview: boolean;
    details: IdentityVerificationDetails;
}
