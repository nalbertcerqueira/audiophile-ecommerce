import { JwtTokenService } from "@/@core/backend/infra/services/jwtTokenService"

const secretKey = process.env.SECRET_KEY as string
const duration = 3600 * 24

function createJwtTokenService(secretKey: string, duration: number) {
    return new JwtTokenService(secretKey, duration)
}

export const jwtTokenService = createJwtTokenService(secretKey, duration)
