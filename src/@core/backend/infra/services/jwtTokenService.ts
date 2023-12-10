import { TextEncoder } from "util"
import { TokenGeneratorService } from "../../domain/services/tokenGeneratorService"
import { SignJWT, jwtVerify } from "jose"
import { TokenPayload, TokenVerifierService } from "../../domain/services/tokenVerifierService"

export class JwtTokenService implements TokenGeneratorService, TokenVerifierService {
    constructor(private readonly duration: number) {}

    public async generate(payload: Record<string, any>, secretKey: string): Promise<string> {
        const encodedKey = new TextEncoder().encode(secretKey)
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

    public async verify(token: string, secretKey: string): Promise<TokenPayload | null> {
        try {
            const encodedKey = new TextEncoder().encode(secretKey)
            const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] })

            return { id: payload.id }
        } catch {
            return null
        }
    }
}
