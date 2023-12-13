import { JwtTokenService } from "@/@core/backend/infra/services/jwtTokenService"

const duration = 3600 * 24
const authenticatedSessionSecretKey = process.env.AUTHENTICATED_SESSION_SECRET_KEY as string
const guestSessionSecretKey = process.env.GUEST_SESSION_SECRET_KEY as string

function createJwtTokenService(duration: number, secretKey: string): JwtTokenService {
    return new JwtTokenService(duration, secretKey)
}

export const guestJwtTokenService = createJwtTokenService(duration, guestSessionSecretKey)

export const authenticatedJwtTokenService = createJwtTokenService(
    duration,
    authenticatedSessionSecretKey
)
