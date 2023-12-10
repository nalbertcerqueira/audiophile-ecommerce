import { JwtTokenService } from "@/@core/backend/infra/services/jwtTokenService"

const duration = 3600 * 24
const secretKey = process.env.SECRET_KEY as string

function createJwtTokenService(duration: number, secretKey: string): JwtTokenService {
    return new JwtTokenService(duration, secretKey)
}

export const jwtTokenService = createJwtTokenService(duration, secretKey)
