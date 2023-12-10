export type TokenPayload = Record<string, any>

export interface TokenVerifierService {
    verify(token: string): Promise<TokenPayload | null>
}
