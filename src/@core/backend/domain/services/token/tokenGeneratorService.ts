import { TokenPayload } from "./protocols"

export interface TokenGeneratorService {
    generate(payload: TokenPayload): Promise<string>
}
