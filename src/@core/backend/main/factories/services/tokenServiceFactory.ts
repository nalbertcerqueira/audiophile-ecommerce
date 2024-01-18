import { JwtTokenService } from "@/@core/backend/infra/services/jwtTokenService"

const duration = 3600 * 24 * 7
const authenticatedSessionSecretKey = process.env.AUTHENTICATED_SESSION_SECRET_KEY as string
const externalSessionSecretKey = process.env.EXTERNAL_SESSION_SECRET_KEY as string
const guestSessionSecretKey = process.env.GUEST_SESSION_SECRET_KEY as string

function createJwtTokenService(duration: number, secretKey: string): JwtTokenService {
    return new JwtTokenService(duration, secretKey)
}

export const authenticatedJwtTokenService = createJwtTokenService(
    duration,
    authenticatedSessionSecretKey
)

export const externalJwtTokenService = createJwtTokenService(
    duration,
    externalSessionSecretKey
)

export const guestJwtTokenService = createJwtTokenService(duration, guestSessionSecretKey)
