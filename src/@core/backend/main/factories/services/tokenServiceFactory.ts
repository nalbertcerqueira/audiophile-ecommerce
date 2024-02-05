import { JwtTokenService } from "@/@core/backend/infra/services/jwtTokenService"

//Cada tipo de usuário, comum, externo e convidado (ou anônimo se você preferir),
//tem o seu token assinado por uma chave específica para evitar ataques de escalação de privilégios
const duration = 3600 * 24 * 7
const authenticatedSessionSecretKey = process.env.AUTHENTICATED_SESSION_SECRET_KEY as string
const externalSessionSecretKey = process.env.EXTERNAL_SESSION_SECRET_KEY as string
const guestSessionSecretKey = process.env.GUEST_SESSION_SECRET_KEY as string

function createJwtTokenService(duration: number, secretKey: string): JwtTokenService {
    return new JwtTokenService(duration, secretKey)
}

//JwtTokenService para usuários comuns
export const authenticatedJwtTokenService = createJwtTokenService(
    duration,
    authenticatedSessionSecretKey
)

//JwtTokenService para usuários autenticados através de servidores de terceiros
export const externalJwtTokenService = createJwtTokenService(
    duration,
    externalSessionSecretKey
)

//JwtTokenService para usuários de sessões anônimas (usuários convidados)
export const guestJwtTokenService = createJwtTokenService(duration, guestSessionSecretKey)
