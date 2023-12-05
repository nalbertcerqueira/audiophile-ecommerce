import { JwtTokenService } from "@/@core/backend/infra/services/jwtTokenService"

const duration = 3600 * 24

function createJwtTokenService(duration: number): JwtTokenService {
    return new JwtTokenService(duration)
}

export const jwtTokenService = createJwtTokenService(duration)
