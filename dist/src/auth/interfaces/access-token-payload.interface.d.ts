export interface AccessTokenPayload {
    exp: number;
    iat: number;
    jti: string;
    sub: string;
    type: 'access';
}
