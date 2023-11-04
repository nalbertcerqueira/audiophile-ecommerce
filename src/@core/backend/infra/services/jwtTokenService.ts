import { TextEncoder } from "util"
import { TokenGeneratorService } from "../../domain/services/tokenGeneratorService"
import { SignJWT } from "jose"

export class JwtTokenService implements TokenGeneratorService {
    constructor(private readonly key: string) {}

    public async generate(payload: Record<string, any>): Promise<string> {
        const encodedKey = new TextEncoder().encode(this.key)
        const iat = Math.floor(Date.now() / 1000)
        const exp = iat + 24 * 3600

        const token = await new SignJWT({ ...payload })
            .setProtectedHeader({ alg: "HS256", typ: "JWT", enc: undefined })
            .setExpirationTime(exp)
            .setNotBefore(iat)
            .setIssuedAt(iat)
            .sign(encodedKey)

        return token
    }
}
