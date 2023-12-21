import { TokenPayload } from "./protocols"

export interface TokenDecoderService {
    decode(token: string): TokenPayload | null
}
