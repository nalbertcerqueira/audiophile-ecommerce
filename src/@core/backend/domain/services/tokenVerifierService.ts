export type TokenPayload = Record<string, any>

export interface TokenVerifierService {
    verify(token: string, secretKey: string): Promise<TokenPayload | null>
}
