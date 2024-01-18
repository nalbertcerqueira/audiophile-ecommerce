import { TokenPayload } from "./protocols"

export interface TokenVerifierService {
    verify(token: string): Promise<TokenPayload | null>
}
