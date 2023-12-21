import { BcryptEncrypterService } from "@/@core/backend/infra/services/bcryptEncrypterService"

function createBcryptEncrypterService(saltRounds: number): BcryptEncrypterService {
    return new BcryptEncrypterService(saltRounds)
}

export const bcryptEncrypterService = createBcryptEncrypterService(12)
