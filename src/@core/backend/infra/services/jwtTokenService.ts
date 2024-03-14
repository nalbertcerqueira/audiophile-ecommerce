import { TokenGeneratorService } from "../../domain/services/token/tokenGeneratorService"
import { TokenVerifierService } from "../../domain/services/token/tokenVerifierService"
import { TokenDecoderService } from "../../domain/services/token/tokenDecoderService"
import { TokenPayload } from "../../domain/services/token/protocols"
import { TextEncoder } from "util"
import { SignJWT, jwtVerify, decodeJwt } from "jose"

export class JwtTokenService
    implements TokenGeneratorService, TokenVerifierService, TokenDecoderService
{
    constructor(
        private readonly duration: number,
        private readonly secretKey: string
    ) {}

    public async generate(payload: TokenPayload): Promise<string> {
        const encodedKey = new TextEncoder().encode(this.secretKey)
        const iat = Math.floor(Date.now() / 1000)
        const exp = iat + this.duration

        const token = await new SignJWT({ ...payload })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setExpirationTime(exp)
            .setNotBefore(iat)
            .setIssuedAt(iat)
            .sign(encodedKey)

        return token
    }

    public async verify(token: string): Promise<TokenPayload | null> {
        try {
            const encodedKey = new TextEncoder().encode(this.secretKey)
            const { payload } = await jwtVerify<TokenPayload>(token, encodedKey, {
                algorithms: ["HS256"]
                //O algoritmo é definido como uma precaução para evitar ataques de remoção de assinatura
            })

            return { id: payload.id, sessionType: payload.sessionType }
        } catch {
            return null
        }
    }

    public decode(token: string): TokenPayload | null {
        try {
            const payload = decodeJwt<TokenPayload>(token)
            return payload
        } catch {
            return null
        }
    }
}
