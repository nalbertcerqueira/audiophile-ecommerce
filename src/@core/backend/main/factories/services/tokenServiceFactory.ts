import { JwtTokenService } from "@/@core/backend/infra/services/jwtTokenService"

const secretKey = process.env.SECRET_KEY as string
function createJwtTokenService(secretKey: string) {
    return new JwtTokenService(secretKey)
}

export const jwtTokenService = createJwtTokenService(secretKey)
